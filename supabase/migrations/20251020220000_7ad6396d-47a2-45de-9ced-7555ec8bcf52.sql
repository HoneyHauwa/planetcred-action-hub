-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', '')
  );
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create user roles enum and table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create mission submissions table
CREATE TABLE public.mission_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  mission_title TEXT NOT NULL,
  mission_description TEXT NOT NULL,
  video_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_message TEXT,
  certificate_url TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES public.profiles(id)
);

ALTER TABLE public.mission_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own submissions"
  ON public.mission_submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own submissions"
  ON public.mission_submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all submissions"
  ON public.mission_submissions FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update submissions"
  ON public.mission_submissions FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for videos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'mission-videos',
  'mission-videos',
  false,
  314572800, -- 300MB limit (5 min video)
  ARRAY['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm']
);

-- Storage policies for videos
CREATE POLICY "Users can upload their own videos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'mission-videos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own videos"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'mission-videos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Admins can view all videos"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'mission-videos' AND
    public.has_role(auth.uid(), 'admin')
  );

-- Create storage bucket for certificates
INSERT INTO storage.buckets (id, name, public)
VALUES ('certificates', 'certificates', false);

-- Storage policies for certificates
CREATE POLICY "Users can view their own certificates"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'certificates' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "System can insert certificates"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'certificates');

-- Function to count active missions for a user
CREATE OR REPLACE FUNCTION public.get_active_mission_count(user_uuid UUID)
RETURNS INTEGER
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*)::INTEGER
  FROM public.mission_submissions
  WHERE user_id = user_uuid AND status = 'pending'
$$;

-- Create index for performance
CREATE INDEX idx_mission_submissions_user_status ON public.mission_submissions(user_id, status);
CREATE INDEX idx_mission_submissions_status ON public.mission_submissions(status);