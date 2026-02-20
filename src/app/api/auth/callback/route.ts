// @ts-nocheck — Supabase types need regeneration with `npm run db:types`
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Récupérer le profil pour rediriger vers le bon dashboard
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profile) {
          const dashboardMap: Record<string, string> = {
            artist: '/dashboard/artiste',
            company: '/dashboard/entreprise',
            admin: '/dashboard/admin',
          };
          const redirectTo = dashboardMap[profile.role] || next;
          return NextResponse.redirect(`${origin}${redirectTo}`);
        }
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Erreur : rediriger vers la page de connexion
  return NextResponse.redirect(`${origin}/connexion?error=auth`);
}
