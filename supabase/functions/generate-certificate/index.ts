import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CertificateRequest {
  submissionId: string;
  userName: string;
  missionTitle: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { submissionId, userName, missionTitle }: CertificateRequest = await req.json();

    console.log('Generating certificate for:', { submissionId, userName, missionTitle });

    // Get the authenticated user
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    // Verify user is admin
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (!roleData) {
      throw new Error('Unauthorized: Admin access required');
    }

    // Get submission details
    const { data: submission, error: submissionError } = await supabase
      .from('mission_submissions')
      .select('user_id')
      .eq('id', submissionId)
      .single();

    if (submissionError || !submission) {
      throw new Error('Submission not found');
    }

    // Generate simple PDF certificate using SVG
    const certificateDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const svgCertificate = `
      <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="600" fill="#f8f9fa"/>
        <rect x="20" y="20" width="760" height="560" fill="white" stroke="#22c55e" stroke-width="4"/>
        <rect x="40" y="40" width="720" height="520" fill="white" stroke="#22c55e" stroke-width="2"/>
        
        <text x="400" y="100" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="#22c55e" text-anchor="middle">
          CERTIFICATE OF ACHIEVEMENT
        </text>
        
        <text x="400" y="180" font-family="Arial, sans-serif" font-size="20" fill="#666" text-anchor="middle">
          This is to certify that
        </text>
        
        <text x="400" y="250" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="#333" text-anchor="middle">
          ${userName}
        </text>
        
        <text x="400" y="320" font-family="Arial, sans-serif" font-size="20" fill="#666" text-anchor="middle">
          has successfully completed the climate action mission
        </text>
        
        <text x="400" y="380" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#22c55e" text-anchor="middle">
          ${missionTitle}
        </text>
        
        <text x="400" y="450" font-family="Arial, sans-serif" font-size="18" fill="#999" text-anchor="middle">
          Date: ${certificateDate}
        </text>
        
        <text x="400" y="520" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#333" text-anchor="middle">
          Planet Cred Climate Action
        </text>
      </svg>
    `;

    // Convert SVG to blob
    const svgBlob = new Blob([svgCertificate], { type: 'image/svg+xml' });
    
    // Upload certificate to storage
    const certificateFileName = `${submission.user_id}/${submissionId}.svg`;
    
    const { error: uploadError } = await supabase.storage
      .from('certificates')
      .upload(certificateFileName, svgBlob, {
        contentType: 'image/svg+xml',
        upsert: true,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw new Error('Failed to upload certificate');
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('certificates')
      .getPublicUrl(certificateFileName);

    // Update submission with approval and certificate URL
    const { error: updateError } = await supabase
      .from('mission_submissions')
      .update({
        status: 'approved',
        certificate_url: publicUrl,
        reviewed_at: new Date().toISOString(),
        reviewed_by: user.id,
      })
      .eq('id', submissionId);

    if (updateError) {
      console.error('Update error:', updateError);
      throw new Error('Failed to update submission');
    }

    console.log('Certificate generated successfully:', publicUrl);

    return new Response(
      JSON.stringify({ 
        success: true, 
        certificateUrl: publicUrl 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error('Error generating certificate:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});