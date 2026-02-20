'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calculator, MapPin, Lock } from 'lucide-react';
import ImageGallery from '@/components/artworks/ImageGallery';
import ArtworkCard from '@/components/artworks/ArtworkCard';
import { getArtworkById, getRelatedArtworks, ARTWORK_TYPE_LABELS } from '@/lib/mock-data';
import { formatCentsToEuros, formatEuros, simulateFiscalSaving } from '@/lib/fiscal';
import { notFound } from 'next/navigation';

export default function ArtworkDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const artwork = getArtworkById(id);

  if (!artwork) {
    notFound();
  }

  const artist = artwork.artist;
  const artistName = `${artist.profile.first_name} ${artist.profile.last_name}`;
  const simulation = simulateFiscalSaving({
    artworkPriceCents: artwork.display_price_cents,
    tmi: 30,
  });
  const related = getRelatedArtworks(id, 3);

  return (
    <>
      {/* Navigation */}
      <div className="section pb-0 pt-8">
        <Link href="/galerie" className="inline-flex items-center gap-2 text-sm text-primary-400 hover:text-primary-700 transition-colors">
          <ArrowLeft size={16} />
          Retour à la galerie
        </Link>
      </div>

      {/* Contenu principal */}
      <section className="section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <ImageGallery images={artwork.images} title={artwork.title} />

          {/* Informations */}
          <div>
            <span className="badge-gold">
              {ARTWORK_TYPE_LABELS[artwork.artwork_type]}
            </span>
            <h1 className="mt-3 text-h1 font-serif text-primary-800">
              {artwork.title}
            </h1>
            <p className="mt-2 text-sm text-primary-400">
              par{' '}
              <span className="text-primary-700 font-medium">{artistName}</span>
            </p>

            {/* Détails */}
            <div className="mt-6 space-y-2 text-sm">
              {artwork.technique && (
                <div className="flex gap-3">
                  <span className="text-primary-400 w-24 flex-shrink-0">Technique</span>
                  <span className="text-primary-700">{artwork.technique}</span>
                </div>
              )}
              {artwork.dimensions && (
                <div className="flex gap-3">
                  <span className="text-primary-400 w-24 flex-shrink-0">Dimensions</span>
                  <span className="text-primary-700">{artwork.dimensions}</span>
                </div>
              )}
              {artwork.year_created && (
                <div className="flex gap-3">
                  <span className="text-primary-400 w-24 flex-shrink-0">Année</span>
                  <span className="text-primary-700">{artwork.year_created}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 text-sm text-primary-500 leading-relaxed">
              {artwork.description}
            </p>

            {/* Prix */}
            <div className="mt-8 p-6 bg-cream-200 rounded-lg">
              <p className="text-sm text-primary-400">Prix de l&apos;oeuvre</p>
              <p className="text-h2 font-serif font-bold text-primary-800">
                {formatCentsToEuros(artwork.display_price_cents)}
              </p>
            </div>

            {/* Calcul fiscal */}
            <div className="mt-4 card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calculator size={18} className="text-gold" />
                <h3 className="text-sm font-medium text-primary-800">
                  Estimation de votre économie d&apos;impôt
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-primary-400">Déduction annuelle</p>
                  <p className="text-lg font-serif font-bold text-primary-800">
                    {formatEuros(simulation.annualDeduction)}
                  </p>
                  <p className="text-xs text-primary-300">pendant 5 ans</p>
                </div>
                <div>
                  <p className="text-xs text-primary-400">Économie / an</p>
                  <p className="text-lg font-serif font-bold text-gold">
                    {formatEuros(simulation.annualTaxSaving)}
                  </p>
                  <p className="text-xs text-primary-300">TMI 30 %</p>
                </div>
                <div>
                  <p className="text-xs text-primary-400">Économie totale</p>
                  <p className="text-lg font-serif font-bold text-bordeaux">
                    {formatEuros(simulation.totalTaxSaving)}
                  </p>
                  <p className="text-xs text-primary-300">sur 5 ans</p>
                </div>
                <div>
                  <p className="text-xs text-primary-400">Coût net réel</p>
                  <p className="text-lg font-serif font-bold text-primary-800">
                    {formatEuros(simulation.netCost)}
                  </p>
                  <p className="text-xs text-primary-300">après déductions</p>
                </div>
              </div>
              <p className="mt-4 text-xs text-primary-300">
                Estimation basée sur une TMI de 30 %.{' '}
                <Link href="/simulateur" className="text-gold hover:underline">
                  Simuler avec votre TMI →
                </Link>
              </p>
            </div>

            {/* CTA */}
            <button
              disabled
              className="btn-gold btn-lg w-full mt-6 relative"
              title="Bientôt disponible"
            >
              <Lock size={18} />
              Acquérir cette oeuvre
              <span className="absolute -top-2 -right-2 badge-pending text-[10px]">Bientôt</span>
            </button>
          </div>
        </div>
      </section>

      {/* Artiste */}
      <section className="bg-white">
        <div className="section">
          <h2 className="text-h3 font-serif text-primary-800 mb-6">L&apos;artiste</h2>
          <div className="flex items-start gap-6">
            {artist.profile.avatar_url && (
              <Image
                src={artist.profile.avatar_url}
                alt={artistName}
                width={80}
                height={80}
                className="rounded-full object-cover flex-shrink-0"
              />
            )}
            <div>
              <h3 className="text-h4 font-serif text-primary-800">{artistName}</h3>
              {artist.artistProfile.city && (
                <p className="mt-1 flex items-center gap-1 text-sm text-primary-400">
                  <MapPin size={14} />
                  {artist.artistProfile.city}, {artist.artistProfile.region}
                </p>
              )}
              <p className="mt-3 text-sm text-primary-500 leading-relaxed">
                {artist.artistProfile.bio}
              </p>
              {artist.artistProfile.art_types && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {artist.artistProfile.art_types.map((type) => (
                    <span key={type} className="badge-gold">{ARTWORK_TYPE_LABELS[type]}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Oeuvres similaires */}
      {related.length > 0 && (
        <section className="section-lg">
          <h2 className="text-h2 font-serif text-primary-800 text-center mb-10">
            Oeuvres similaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map((aw) => (
              <ArtworkCard key={aw.id} artwork={aw} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
