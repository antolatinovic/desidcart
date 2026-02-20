// @ts-nocheck — Supabase types need regeneration with `npm run db:types`
import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { createArtistSubscriptionCheckout } from '@/lib/stripe';

export async function POST() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    // Vérifier si un abonnement actif existe déjà
    const { data: existingSub } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('artist_id', user.id)
      .eq('status', 'active')
      .single();

    if (existingSub) {
      return NextResponse.json(
        { error: 'Vous avez déjà un abonnement actif.' },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const session = await createArtistSubscriptionCheckout({
      customerEmail: user.email!,
      userId: user.id,
      customerId: undefined,
      successUrl: `${appUrl}/dashboard/artiste?subscription=success`,
      cancelUrl: `${appUrl}/inscription/artiste?subscription=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du paiement.' },
      { status: 500 }
    );
  }
}
