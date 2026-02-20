-- ============================================
-- DEFISCART — Migration initiale
-- ============================================
-- À exécuter dans Supabase SQL Editor ou via supabase db push

-- ============================================
-- TYPES ENUM
-- ============================================

CREATE TYPE user_role AS ENUM ('artist', 'company', 'admin');
CREATE TYPE artwork_status AS ENUM ('draft', 'pending_review', 'published', 'sold', 'rejected');
CREATE TYPE artwork_type AS ENUM ('painting', 'sculpture', 'photography', 'engraving', 'tapestry', 'ceramic', 'other');
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'confirmed', 'exposition_active', 'completed', 'cancelled');
CREATE TYPE subscription_status AS ENUM ('active', 'expired', 'cancelled');
CREATE TYPE message_status AS ENUM ('unread', 'read');
CREATE TYPE venue_status AS ENUM ('active', 'inactive');

-- ============================================
-- TABLES
-- ============================================

-- Profils utilisateurs (extension de auth.users Supabase)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL,
    email TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profil spécifique artiste
CREATE TABLE artist_profiles (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    bio TEXT,
    website TEXT,
    city TEXT,
    region TEXT,
    art_types artwork_type[],
    portfolio_url TEXT,
    is_validated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profil spécifique entreprise
CREATE TABLE company_profiles (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    siret TEXT,
    address TEXT,
    city TEXT,
    postal_code TEXT,
    fiscal_regime TEXT,
    tmi INTEGER,
    annual_revenue NUMERIC,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Abonnements artistes
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    artist_id UUID NOT NULL REFERENCES artist_profiles(id) ON DELETE CASCADE,
    stripe_subscription_id TEXT,
    stripe_customer_id TEXT,
    status subscription_status DEFAULT 'active',
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    price_cents INTEGER DEFAULT 4900,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lieux d'exposition (créer AVANT artworks pour la FK)
CREATE TABLE exhibition_venues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    venue_type TEXT,
    address TEXT,
    city TEXT,
    postal_code TEXT,
    region TEXT,
    contact_name TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    capacity INTEGER,
    status venue_status DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Œuvres d'art
CREATE TABLE artworks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    artist_id UUID NOT NULL REFERENCES artist_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    artwork_type artwork_type NOT NULL,
    technique TEXT,
    dimensions TEXT,
    year_created INTEGER,
    artist_price_cents INTEGER NOT NULL,
    commission_rate NUMERIC NOT NULL,
    commission_cents INTEGER NOT NULL,
    display_price_cents INTEGER NOT NULL,
    status artwork_status DEFAULT 'draft',
    rejection_reason TEXT,
    is_eligible BOOLEAN DEFAULT TRUE,
    venue_id UUID REFERENCES exhibition_venues(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Images des œuvres
CREATE TABLE artwork_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    artwork_id UUID NOT NULL REFERENCES artworks(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Commandes / Transactions
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    artwork_id UUID NOT NULL REFERENCES artworks(id),
    buyer_id UUID NOT NULL REFERENCES company_profiles(id),
    artist_id UUID NOT NULL REFERENCES artist_profiles(id),
    artist_price_cents INTEGER NOT NULL,
    commission_cents INTEGER NOT NULL,
    total_price_cents INTEGER NOT NULL,
    stripe_payment_intent_id TEXT,
    stripe_charge_id TEXT,
    status order_status DEFAULT 'pending',
    venue_id UUID REFERENCES exhibition_venues(id),
    exposition_start_date DATE,
    exposition_end_date DATE,
    current_year INTEGER DEFAULT 1,
    annual_deduction_cents INTEGER,
    estimated_tax_saving_cents INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Factures
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id),
    invoice_number TEXT UNIQUE NOT NULL,
    invoice_type TEXT NOT NULL CHECK (invoice_type IN ('artist', 'platform')),
    issuer_name TEXT NOT NULL,
    issuer_siret TEXT,
    buyer_name TEXT NOT NULL,
    buyer_siret TEXT,
    amount_cents INTEGER NOT NULL,
    tax_rate NUMERIC DEFAULT 20,
    amount_ht_cents INTEGER NOT NULL,
    amount_ttc_cents INTEGER NOT NULL,
    description TEXT,
    pdf_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documents fiscaux
CREATE TABLE fiscal_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id),
    document_type TEXT NOT NULL,
    title TEXT NOT NULL,
    pdf_url TEXT,
    year INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages internes
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID NOT NULL REFERENCES profiles(id),
    receiver_id UUID NOT NULL REFERENCES profiles(id),
    artwork_id UUID REFERENCES artworks(id),
    subject TEXT,
    body TEXT NOT NULL,
    status message_status DEFAULT 'unread',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rappels automatiques
CREATE TABLE reminders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id),
    company_id UUID NOT NULL REFERENCES company_profiles(id),
    reminder_type TEXT NOT NULL,
    scheduled_date DATE NOT NULL,
    sent BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEX
-- ============================================

CREATE INDEX idx_artworks_status ON artworks(status);
CREATE INDEX idx_artworks_type ON artworks(artwork_type);
CREATE INDEX idx_artworks_price ON artworks(display_price_cents);
CREATE INDEX idx_artworks_artist ON artworks(artist_id);
CREATE INDEX idx_orders_buyer ON orders(buyer_id);
CREATE INDEX idx_orders_artist ON orders(artist_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_messages_receiver ON messages(receiver_id, status);
CREATE INDEX idx_subscriptions_artist ON subscriptions(artist_id);
CREATE INDEX idx_reminders_scheduled ON reminders(scheduled_date, sent);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE artist_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE artwork_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exhibition_venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE fiscal_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Profiles : lecture publique, modification par propriétaire
CREATE POLICY "profiles_select_all" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Artist profiles : lecture publique, modification par propriétaire
CREATE POLICY "artist_profiles_select_all" ON artist_profiles FOR SELECT USING (true);
CREATE POLICY "artist_profiles_update_own" ON artist_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "artist_profiles_insert_own" ON artist_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Company profiles : lecture par propriétaire + admin, modification par propriétaire
CREATE POLICY "company_profiles_select_own" ON company_profiles FOR SELECT USING (
  auth.uid() = id OR 
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "company_profiles_update_own" ON company_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "company_profiles_insert_own" ON company_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Artworks : lecture publique si publiée, gestion par artiste
CREATE POLICY "artworks_select_published" ON artworks FOR SELECT USING (
  status = 'published' OR 
  artist_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "artworks_insert_artist" ON artworks FOR INSERT WITH CHECK (artist_id = auth.uid());
CREATE POLICY "artworks_update_artist" ON artworks FOR UPDATE USING (
  artist_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "artworks_delete_artist" ON artworks FOR DELETE USING (artist_id = auth.uid());

-- Artwork images : mêmes règles que artworks
CREATE POLICY "artwork_images_select" ON artwork_images FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM artworks 
    WHERE artworks.id = artwork_images.artwork_id 
    AND (artworks.status = 'published' OR artworks.artist_id = auth.uid())
  ) OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "artwork_images_insert" ON artwork_images FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM artworks WHERE artworks.id = artwork_images.artwork_id AND artworks.artist_id = auth.uid())
);
CREATE POLICY "artwork_images_delete" ON artwork_images FOR DELETE USING (
  EXISTS (SELECT 1 FROM artworks WHERE artworks.id = artwork_images.artwork_id AND artworks.artist_id = auth.uid())
);

-- Orders : lecture par acheteur, artiste, ou admin
CREATE POLICY "orders_select_own" ON orders FOR SELECT USING (
  buyer_id = auth.uid() OR 
  artist_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Invoices : lecture par parties concernées
CREATE POLICY "invoices_select_own" ON invoices FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = invoices.order_id 
    AND (orders.buyer_id = auth.uid() OR orders.artist_id = auth.uid())
  ) OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Messages : lecture par sender/receiver
CREATE POLICY "messages_select_own" ON messages FOR SELECT USING (
  sender_id = auth.uid() OR receiver_id = auth.uid()
);
CREATE POLICY "messages_insert_own" ON messages FOR INSERT WITH CHECK (sender_id = auth.uid());
CREATE POLICY "messages_update_receiver" ON messages FOR UPDATE USING (receiver_id = auth.uid());

-- Subscriptions : lecture par propriétaire ou admin
CREATE POLICY "subscriptions_select_own" ON subscriptions FOR SELECT USING (
  artist_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Exhibition venues : lecture publique
CREATE POLICY "venues_select_all" ON exhibition_venues FOR SELECT USING (true);

-- Fiscal documents : lecture par acheteur ou admin
CREATE POLICY "fiscal_docs_select" ON fiscal_documents FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = fiscal_documents.order_id 
    AND (orders.buyer_id = auth.uid() OR orders.artist_id = auth.uid())
  ) OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Reminders : lecture par entreprise concernée ou admin
CREATE POLICY "reminders_select" ON reminders FOR SELECT USING (
  company_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================
-- STORAGE BUCKETS
-- ============================================

INSERT INTO storage.buckets (id, name, public) VALUES ('artworks', 'artworks', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);

-- Storage policies
CREATE POLICY "artworks_upload" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'artworks' AND auth.role() = 'authenticated');

CREATE POLICY "artworks_public_read" ON storage.objects FOR SELECT
  USING (bucket_id = 'artworks');

CREATE POLICY "avatars_upload" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

CREATE POLICY "avatars_public_read" ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "documents_upload" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'documents' AND auth.role() = 'authenticated');

CREATE POLICY "documents_private_read" ON storage.objects FOR SELECT
  USING (bucket_id = 'documents' AND auth.role() = 'authenticated');

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers updated_at
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER artworks_updated_at
  BEFORE UPDATE ON artworks FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Fonction pour créer automatiquement un profil après inscription
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, role, email, first_name, last_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'role', 'company')::user_role,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  
  -- Si artiste, créer le profil artiste
  IF NEW.raw_user_meta_data->>'role' = 'artist' THEN
    INSERT INTO artist_profiles (id) VALUES (NEW.id);
  END IF;
  
  -- Si entreprise, créer le profil entreprise
  IF NEW.raw_user_meta_data->>'role' = 'company' OR NEW.raw_user_meta_data->>'role' IS NULL THEN
    INSERT INTO company_profiles (id, company_name) 
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'company_name', ''));
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger sur inscription
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
