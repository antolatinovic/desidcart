// ============================================
// Types de base de données DefiscArt
// ============================================
// Ce fichier sera remplacé par `npm run db:types` une fois Supabase configuré.
// En attendant, il sert de référence typée.

export type UserRole = 'artist' | 'company' | 'admin';
export type ArtworkStatus = 'draft' | 'pending_review' | 'published' | 'sold' | 'rejected';
export type ArtworkType = 'painting' | 'sculpture' | 'photography' | 'engraving' | 'tapestry' | 'ceramic' | 'other';
export type OrderStatus = 'pending' | 'paid' | 'confirmed' | 'exposition_active' | 'completed' | 'cancelled';
export type SubscriptionStatus = 'active' | 'expired' | 'cancelled';
export type MessageStatus = 'unread' | 'read';
export type VenueStatus = 'active' | 'inactive';

// ============================================
// Tables
// ============================================

export interface Profile {
  id: string;
  role: UserRole;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ArtistProfile {
  id: string;
  bio: string | null;
  website: string | null;
  city: string | null;
  region: string | null;
  art_types: ArtworkType[] | null;
  portfolio_url: string | null;
  is_validated: boolean;
  created_at: string;
}

export interface CompanyProfile {
  id: string;
  company_name: string;
  siret: string | null;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  fiscal_regime: string | null;
  tmi: number | null;
  annual_revenue: number | null;
  created_at: string;
}

export interface Subscription {
  id: string;
  artist_id: string;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  status: SubscriptionStatus;
  current_period_start: string | null;
  current_period_end: string | null;
  price_cents: number;
  created_at: string;
  updated_at: string;
}

export interface Artwork {
  id: string;
  artist_id: string;
  title: string;
  description: string | null;
  artwork_type: ArtworkType;
  technique: string | null;
  dimensions: string | null;
  year_created: number | null;
  artist_price_cents: number;
  commission_rate: number;
  commission_cents: number;
  display_price_cents: number;
  status: ArtworkStatus;
  rejection_reason: string | null;
  is_eligible: boolean;
  venue_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ArtworkImage {
  id: string;
  artwork_id: string;
  image_url: string;
  is_primary: boolean;
  sort_order: number;
  created_at: string;
}

export interface ExhibitionVenue {
  id: string;
  name: string;
  venue_type: string | null;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  region: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  capacity: number | null;
  status: VenueStatus;
  notes: string | null;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  artwork_id: string;
  buyer_id: string;
  artist_id: string;
  artist_price_cents: number;
  commission_cents: number;
  total_price_cents: number;
  stripe_payment_intent_id: string | null;
  stripe_charge_id: string | null;
  status: OrderStatus;
  venue_id: string | null;
  exposition_start_date: string | null;
  exposition_end_date: string | null;
  current_year: number;
  annual_deduction_cents: number | null;
  estimated_tax_saving_cents: number | null;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: string;
  order_id: string;
  invoice_number: string;
  invoice_type: 'artist' | 'platform';
  issuer_name: string;
  issuer_siret: string | null;
  buyer_name: string;
  buyer_siret: string | null;
  amount_cents: number;
  tax_rate: number;
  amount_ht_cents: number;
  amount_ttc_cents: number;
  description: string | null;
  pdf_url: string | null;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  artwork_id: string | null;
  subject: string | null;
  body: string;
  status: MessageStatus;
  created_at: string;
}

export interface Reminder {
  id: string;
  order_id: string;
  company_id: string;
  reminder_type: string;
  scheduled_date: string;
  sent: boolean;
  sent_at: string | null;
  created_at: string;
}

// ============================================
// Supabase Database type (pour le client typé)
// ============================================

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string; role: UserRole; email: string };
        Update: Partial<Profile>;
        Relationships: [];
      };
      artist_profiles: {
        Row: ArtistProfile;
        Insert: Partial<ArtistProfile> & { id: string };
        Update: Partial<ArtistProfile>;
        Relationships: [];
      };
      company_profiles: {
        Row: CompanyProfile;
        Insert: Partial<CompanyProfile> & { id: string; company_name: string };
        Update: Partial<CompanyProfile>;
        Relationships: [];
      };
      subscriptions: {
        Row: Subscription;
        Insert: Partial<Subscription> & { artist_id: string };
        Update: Partial<Subscription>;
        Relationships: [];
      };
      artworks: {
        Row: Artwork;
        Insert: Partial<Artwork> & {
          artist_id: string;
          title: string;
          artwork_type: ArtworkType;
          artist_price_cents: number;
          commission_rate: number;
          commission_cents: number;
          display_price_cents: number;
        };
        Update: Partial<Artwork>;
        Relationships: [];
      };
      artwork_images: {
        Row: ArtworkImage;
        Insert: Partial<ArtworkImage> & { artwork_id: string; image_url: string };
        Update: Partial<ArtworkImage>;
        Relationships: [];
      };
      exhibition_venues: {
        Row: ExhibitionVenue;
        Insert: Partial<ExhibitionVenue> & { name: string };
        Update: Partial<ExhibitionVenue>;
        Relationships: [];
      };
      orders: {
        Row: Order;
        Insert: Partial<Order> & {
          order_number: string;
          artwork_id: string;
          buyer_id: string;
          artist_id: string;
          artist_price_cents: number;
          commission_cents: number;
          total_price_cents: number;
        };
        Update: Partial<Order>;
        Relationships: [];
      };
      invoices: {
        Row: Invoice;
        Insert: Partial<Invoice> & {
          order_id: string;
          invoice_number: string;
          invoice_type: 'artist' | 'platform';
          issuer_name: string;
          buyer_name: string;
          amount_cents: number;
          amount_ht_cents: number;
          amount_ttc_cents: number;
        };
        Update: Partial<Invoice>;
        Relationships: [];
      };
      messages: {
        Row: Message;
        Insert: Partial<Message> & { sender_id: string; receiver_id: string; body: string };
        Update: Partial<Message>;
        Relationships: [];
      };
      reminders: {
        Row: Reminder;
        Insert: Partial<Reminder> & {
          order_id: string;
          company_id: string;
          reminder_type: string;
          scheduled_date: string;
        };
        Update: Partial<Reminder>;
        Relationships: [];
      };
      fiscal_documents: {
        Row: {
          id: string;
          order_id: string;
          document_type: string;
          title: string;
          pdf_url: string | null;
          year: number | null;
          created_at: string;
        };
        Insert: {
          order_id: string;
          document_type: string;
          title: string;
          pdf_url?: string | null;
          year?: number | null;
        };
        Update: Partial<{
          document_type: string;
          title: string;
          pdf_url: string | null;
          year: number | null;
        }>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: UserRole;
      artwork_status: ArtworkStatus;
      artwork_type: ArtworkType;
      order_status: OrderStatus;
      subscription_status: SubscriptionStatus;
      message_status: MessageStatus;
      venue_status: VenueStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}
