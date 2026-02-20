# DefiscArt — Marketplace Art & Défiscalisation

> Marketplace de mise en relation artistes / entreprises autour du dispositif fiscal 238 bis AB du CGI.

## Stack technique

- **Next.js 14** (App Router, TypeScript)
- **Supabase** (PostgreSQL, Auth, Storage)
- **Stripe** (Abonnements artistes 49€/an + Paiements œuvres)
- **Resend** (Emails transactionnels)
- **Tailwind CSS** (Design élégant galerie d'art)
- **Vercel** (Déploiement)

## Setup rapide

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer les variables d'environnement

```bash
cp .env.example .env.local
```

Puis remplir les valeurs dans `.env.local` :

- **Supabase** : Créer un projet sur [supabase.com](https://supabase.com), récupérer l'URL et les clés
- **Stripe** : Créer un compte [stripe.com](https://stripe.com), récupérer les clés API + créer un produit "Abonnement Artiste" à 49€/an
- **Resend** : Créer un compte [resend.com](https://resend.com), récupérer la clé API

### 3. Créer la base de données

Exécuter le fichier SQL dans l'éditeur SQL de Supabase :

```
supabase/migrations/001_initial_schema.sql
```

Ce fichier crée toutes les tables, index, policies RLS, storage buckets, et triggers.

### 4. Configurer Stripe

1. Créer un produit "Abonnement Artiste" avec un prix récurrent de 49€/an
2. Copier le `price_id` dans `STRIPE_PRICE_ID_ARTIST_ANNUAL`
3. Configurer le webhook Stripe vers `https://votre-domaine.com/api/stripe/webhook`
   - Events à écouter : `checkout.session.completed`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.deleted`, `payment_intent.succeeded`

### 5. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Architecture

```
src/
├── app/                          # Pages Next.js (App Router)
│   ├── (public)/                 # Pages publiques (accueil, galerie, etc.)
│   ├── (auth)/                   # Authentification
│   ├── dashboard/                # Espaces connectés
│   │   ├── artiste/              # Dashboard artiste
│   │   ├── entreprise/           # Dashboard entreprise
│   │   └── admin/                # Back-office admin
│   └── api/                      # API Routes
│       ├── auth/callback/        # Callback Supabase Auth
│       ├── stripe/               # Webhook + Checkout + Payment
│       ├── contact/              # Formulaire contact
│       ├── artworks/             # CRUD œuvres
│       └── orders/               # Gestion commandes
├── components/
│   ├── ui/                       # Composants réutilisables
│   ├── layout/                   # Header, Footer, Sidebar
│   └── forms/                    # Formulaires
├── lib/
│   ├── supabase/                 # Clients Supabase (browser, server, middleware)
│   ├── stripe.ts                 # Utilitaires Stripe
│   ├── resend.ts                 # Templates emails
│   ├── fiscal.ts                 # Calcul commissions + simulateur fiscal
│   └── utils.ts                  # Utilitaires généraux
├── types/
│   └── database.ts               # Types TypeScript (DB)
└── middleware.ts                  # Auth middleware
```

## Commission dégressive

| Prix artiste | Taux | Exemple |
|---|---|---|
| < 2 000 € | 25% | 1 600 € → affiché 2 000 € |
| 2 000 – 5 000 € | 20% | 4 000 € → affiché 4 800 € |
| 5 000 – 10 000 € | 15% | 8 000 € → affiché 9 200 € |
| > 10 000 € | 10% | 15 000 € → affiché 16 500 € |

## Rôles

- **Artiste** : Upload œuvres, abonnement 49€/an, suivi ventes
- **Entreprise** : Navigation gratuite, achat, documents fiscaux
- **Admin** : Modération, gestion utilisateurs, statistiques

## Déploiement Vercel

```bash
vercel --prod
```

Ajouter les variables d'environnement dans les settings Vercel.
