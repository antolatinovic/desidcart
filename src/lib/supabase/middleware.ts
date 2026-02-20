// @ts-nocheck — Supabase types need regeneration with `npm run db:types`
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import type { Database } from '@/types/database';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return supabaseResponse;
  }

  const supabase = createServerClient<Database>(
    url,
    key,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Routes protégées : /dashboard/*
  if (pathname.startsWith('/dashboard') && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/connexion';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // Si connecté, rediriger /connexion vers le dashboard approprié
  if (user && (pathname === '/connexion' || pathname.startsWith('/inscription'))) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile) {
      const url = request.nextUrl.clone();
      switch (profile.role) {
        case 'artist':
          url.pathname = '/dashboard/artiste';
          break;
        case 'company':
          url.pathname = '/dashboard/entreprise';
          break;
        case 'admin':
          url.pathname = '/dashboard/admin';
          break;
        default:
          url.pathname = '/';
      }
      return NextResponse.redirect(url);
    }
  }

  // Vérifier l'accès aux dashboards spécifiques
  if (user && pathname.startsWith('/dashboard')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile) {
      const rolePathMap: Record<string, string> = {
        artist: '/dashboard/artiste',
        company: '/dashboard/entreprise',
        admin: '/dashboard/admin',
      };

      const allowedPath = rolePathMap[profile.role];
      if (allowedPath && !pathname.startsWith(allowedPath)) {
        // Admin peut accéder partout
        if (profile.role !== 'admin') {
          const url = request.nextUrl.clone();
          url.pathname = allowedPath;
          return NextResponse.redirect(url);
        }
      }
    }
  }

  return supabaseResponse;
}
