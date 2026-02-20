// @ts-nocheck — Supabase types need regeneration with `npm run db:types`
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Plus, Image, TrendingUp, MessageSquare, CreditCard } from 'lucide-react';

export const metadata = { title: 'Dashboard Artiste' };

export default async function ArtistDashboardPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/connexion');

  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name, last_name')
    .eq('id', user.id)
    .single();

  const { count: artworksCount } = await supabase
    .from('artworks')
    .select('*', { count: 'exact', head: true })
    .eq('artist_id', user.id);

  const { count: salesCount } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .eq('artist_id', user.id)
    .in('status', ['paid', 'confirmed', 'exposition_active', 'completed']);

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-h2 font-serif text-primary-800">
          Bonjour, {profile?.first_name || 'Artiste'}
        </h1>
        <p className="text-primary-500 mt-1">
          Gérez vos œuvres et suivez vos ventes.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Œuvres en ligne', value: artworksCount || 0, icon: Image },
          { label: 'Ventes réalisées', value: salesCount || 0, icon: TrendingUp },
          { label: 'Messages', value: 0, icon: MessageSquare },
        ].map((stat) => (
          <div key={stat.label} className="card p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-gold-50 text-gold-600">
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-primary-800">{stat.value}</p>
                <p className="text-xs text-primary-400">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Ajouter une œuvre', href: '/dashboard/artiste/oeuvres/nouvelle', icon: Plus },
          { label: 'Mes œuvres', href: '/dashboard/artiste/oeuvres', icon: Image },
          { label: 'Mes ventes', href: '/dashboard/artiste/ventes', icon: TrendingUp },
          { label: 'Mon abonnement', href: '/dashboard/artiste/abonnement', icon: CreditCard },
        ].map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="card p-5 flex items-center gap-3 hover:border-gold-300 border border-transparent transition-colors"
          >
            <action.icon size={20} className="text-primary-400" />
            <span className="text-sm font-medium text-primary-700">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
