# CLAUDE.md — Instructions pour Claude Code

## Contexte

DefiscArt est une marketplace française mettant en relation des artistes et des entreprises (BIC/IS) pour la défiscalisation via l'art (article 238 bis AB du CGI).

## Ce qui est déjà en place

### Configuré et prêt :
- ✅ Next.js 14 (App Router) + TypeScript + Tailwind CSS
- ✅ Supabase : clients browser/server/middleware + types complets
- ✅ Stripe : utilitaires checkout (abonnement artiste) + payment intent (achat œuvre) + webhook handler
- ✅ Resend : 7 templates email (bienvenue, confirmation achat, vente, rappel fiscal, contact...)
- ✅ Middleware d'authentification avec redirection par rôle
- ✅ Schema SQL complet (13 tables, RLS, triggers, storage buckets)
- ✅ Design system Tailwind (couleurs, typos, composants CSS)
- ✅ Layout public (Header + Footer) + layout dashboard (sidebar)
- ✅ Page d'accueil complète (hero, arguments, étapes, exemple chiffré, témoignage, CTA)
- ✅ Dashboard artiste (page principale avec stats)
- ✅ API routes : auth callback, stripe webhook, stripe checkout, contact
- ✅ Logique métier : calcul commissions (grille dégressive) + simulateur fiscal

### À développer (par ordre de priorité) :

#### Phase 1 — Pages publiques restantes
1. Page galerie `/galerie` : grille d'œuvres avec filtres (type, prix), requête Supabase artworks status=published
2. Page fiche œuvre `/galerie/[id]` : photos, description, artiste, prix, économie estimée, CTA achat
3. Page simulateur `/simulateur` : composant interactif utilisant `simulateFiscalSaving()` de `lib/fiscal.ts`
4. Page "Comment ça marche" `/comment-ca-marche` : contenu statique + FAQ accordion
5. Page contact `/contact` : formulaire → API `/api/contact`
6. Pages légales : mentions légales, CGV (contenu statique)

#### Phase 2 — Authentification
1. Page connexion `/connexion` : email + password via Supabase Auth
2. Page inscription artiste `/inscription/artiste` : formulaire → création compte (role=artist) → redirect Stripe checkout
3. Page inscription entreprise `/inscription/entreprise` : formulaire → création compte (role=company)
4. Page mot de passe oublié

#### Phase 3 — Espace Artiste complet
1. CRUD œuvres `/dashboard/artiste/oeuvres` : liste, ajout (avec upload images Supabase Storage), édition, suppression
2. Calcul auto commission dans le formulaire d'ajout (utiliser `calculateCommission()` de `lib/fiscal.ts`)
3. Profil artiste `/dashboard/artiste/profil` : édition bio, photo, etc.
4. Gestion abonnement `/dashboard/artiste/abonnement` : statut, portail Stripe
5. Page ventes `/dashboard/artiste/ventes` : historique

#### Phase 4 — Espace Entreprise
1. Dashboard entreprise `/dashboard/entreprise` : achats, économie cumulative
2. Processus d'achat complet : sélection œuvre → récapitulatif → Stripe Payment Intent → confirmation
3. Documents fiscaux `/dashboard/entreprise/documents` : factures, modèle réserve spéciale
4. Profil entreprise `/dashboard/entreprise/profil`

#### Phase 5 — Admin + Messagerie
1. Back-office admin complet (utilisateurs, modération œuvres, commandes, lieux, stats)
2. Messagerie interne (messages entre artiste et entreprise)
3. Système de rappels automatiques (cron ou Supabase edge functions)

## Conventions de code

- **Français** pour le contenu utilisateur, **anglais** pour le code (noms de variables, fonctions)
- Composants serveur par défaut, `'use client'` uniquement si nécessaire
- Utiliser `createServerSupabaseClient()` côté serveur, `createClient()` côté client
- Tous les montants en **centimes** (integer) dans la DB, formatter avec `formatCentsToEuros()` ou `formatEuros()`
- Utiliser les classes CSS pré-définies : `btn-primary`, `btn-gold`, `btn-outline`, `card`, `input`, `label`, `badge-*`, `section`
- Design sobre et élégant : beaucoup d'espace blanc, animations subtiles, Playfair Display pour les titres

## Fichiers clés à connaître

- `src/lib/fiscal.ts` — Calcul commissions + simulateur fiscal (DÉJÀ COMPLET)
- `src/lib/stripe.ts` — Checkout + PaymentIntent (DÉJÀ COMPLET)
- `src/lib/resend.ts` — Tous les emails (DÉJÀ COMPLET)
- `src/lib/supabase/` — Clients Supabase (DÉJÀ COMPLET)
- `src/types/database.ts` — Types TypeScript complets (DÉJÀ COMPLET)
- `supabase/migrations/001_initial_schema.sql` — Schema SQL complet (DÉJÀ COMPLET)
- `src/app/globals.css` — Design system CSS (DÉJÀ COMPLET)

## Commandes utiles

```bash
npm run dev          # Serveur de dev
npm run build        # Build production
npm run db:types     # Régénérer types depuis Supabase
```
