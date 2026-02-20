import Stripe from 'stripe';

let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-02-24.acacia',
      typescript: true,
    });
  }
  return _stripe;
}

export { getStripe };

/**
 * Crée une session Stripe Checkout pour l'abonnement artiste (49€/an)
 */
export async function createArtistSubscriptionCheckout(params: {
  customerId?: string;
  customerEmail: string;
  userId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const session = await getStripe().checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer: params.customerId || undefined,
    customer_email: params.customerId ? undefined : params.customerEmail,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID_ARTIST_ANNUAL!,
        quantity: 1,
      },
    ],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: {
      userId: params.userId,
      type: 'artist_subscription',
    },
    subscription_data: {
      metadata: {
        userId: params.userId,
        type: 'artist_subscription',
      },
    },
  });

  return session;
}

/**
 * Crée un Payment Intent pour l'achat d'une œuvre
 */
export async function createArtworkPaymentIntent(params: {
  amountCents: number;
  customerEmail: string;
  artworkId: string;
  buyerId: string;
  artistId: string;
  description: string;
}) {
  const paymentIntent = await getStripe().paymentIntents.create({
    amount: params.amountCents,
    currency: 'eur',
    receipt_email: params.customerEmail,
    description: params.description,
    metadata: {
      type: 'artwork_purchase',
      artworkId: params.artworkId,
      buyerId: params.buyerId,
      artistId: params.artistId,
    },
  });

  return paymentIntent;
}
