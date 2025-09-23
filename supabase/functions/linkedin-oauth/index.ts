import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface LinkedInTokenResponse {
  access_token: string
  expires_in: number
  refresh_token?: string
  scope: string
}

interface LinkedInProfile {
  sub: string
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: boolean
  locale: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { code, state } = await req.json()

    if (!code) {
      throw new Error('Authorization code is required')
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${Deno.env.get('SUPABASE_URL')}/functions/v1/linkedin-oauth/callback`,
        client_id: Deno.env.get('LINKEDIN_CLIENT_ID') ?? '',
        client_secret: Deno.env.get('LINKEDIN_CLIENT_SECRET') ?? '',
      }),
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error('LinkedIn token exchange failed:', errorText)
      throw new Error(`Failed to exchange code for token: ${errorText}`)
    }

    const tokenData: LinkedInTokenResponse = await tokenResponse.json()
    console.log('Token exchange successful')

    // Get LinkedIn profile information
    const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    })

    if (!profileResponse.ok) {
      const errorText = await profileResponse.text()
      console.error('LinkedIn profile fetch failed:', errorText)
      throw new Error(`Failed to fetch profile: ${errorText}`)
    }

    const profile: LinkedInProfile = await profileResponse.json()
    console.log('Profile fetch successful:', profile.sub)

    // Get the current user
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      throw new Error('Authorization header is required')
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token)

    if (userError || !user) {
      throw new Error('User not authenticated')
    }

    // Check if workspace already exists for this LinkedIn account
    const { data: existingWorkspace, error: workspaceError } = await supabaseClient
      .from('workspaces')
      .select('*')
      .eq('linkedin_profile_id', profile.sub)
      .eq('user_id', user.id)
      .single()

    let workspace
    
    if (existingWorkspace) {
      // Update existing workspace with new token
      const { data: updatedWorkspace, error: updateError } = await supabaseClient
        .from('workspaces')
        .update({
          linkedin_access_token: tokenData.access_token,
          linkedin_token_expires_at: new Date(Date.now() + tokenData.expires_in * 1000).toISOString(),
          linkedin_refresh_token: tokenData.refresh_token,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingWorkspace.id)
        .select()
        .single()

      if (updateError) {
        throw new Error(`Failed to update workspace: ${updateError.message}`)
      }

      workspace = updatedWorkspace
      console.log('Workspace updated successfully')
    } else {
      // Create new workspace
      const { data: newWorkspace, error: createError } = await supabaseClient
        .from('workspaces')
        .insert({
          user_id: user.id,
          name: `${profile.name}'s LinkedIn Workspace`,
          linkedin_profile_id: profile.sub,
          linkedin_profile_name: profile.name,
          linkedin_profile_email: profile.email,
          linkedin_profile_picture: profile.picture,
          linkedin_access_token: tokenData.access_token,
          linkedin_token_expires_at: new Date(Date.now() + tokenData.expires_in * 1000).toISOString(),
          linkedin_refresh_token: tokenData.refresh_token,
        })
        .select()
        .single()

      if (createError) {
        throw new Error(`Failed to create workspace: ${createError.message}`)
      }

      workspace = newWorkspace
      console.log('Workspace created successfully')
    }

    return new Response(
      JSON.stringify({
        success: true,
        workspace,
        profile,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('LinkedIn OAuth error:', error)
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})