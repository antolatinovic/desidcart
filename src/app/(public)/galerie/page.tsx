'use client';

import { useState, useMemo } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import ArtworkCard from '@/components/artworks/ArtworkCard';
import { getPublishedArtworks, ARTWORK_TYPE_LABELS } from '@/lib/mock-data';
import type { ArtworkType } from '@/types/database';

const artworks = getPublishedArtworks();

const typeFilters: { value: ArtworkType | 'all'; label: string }[] = [
  { value: 'all', label: 'Toutes' },
  { value: 'painting', label: 'Peinture' },
  { value: 'sculpture', label: 'Sculpture' },
  { value: 'photography', label: 'Photographie' },
  { value: 'engraving', label: 'Gravure' },
  { value: 'tapestry', label: 'Tapisserie' },
  { value: 'ceramic', label: 'Céramique' },
];

const priceFilters = [
  { value: 'all', label: 'Tous les prix' },
  { value: '0-200000', label: '< 2 000 €' },
  { value: '200000-500000', label: '2 000 – 5 000 €' },
  { value: '500000-1000000', label: '5 000 – 10 000 €' },
  { value: '1000000+', label: '> 10 000 €' },
];

export default function GaleriePage() {
  const [selectedType, setSelectedType] = useState<ArtworkType | 'all'>('all');
  const [selectedPrice, setSelectedPrice] = useState('all');

  const filtered = useMemo(() => {
    return artworks.filter((aw) => {
      if (selectedType !== 'all' && aw.artwork_type !== selectedType) return false;
      if (selectedPrice !== 'all') {
        const price = aw.display_price_cents;
        if (selectedPrice === '1000000+') return price >= 1000000;
        const [min, max] = selectedPrice.split('-').map(Number);
        if (price < min || price >= max) return false;
      }
      return true;
    });
  }, [selectedType, selectedPrice]);

  return (
    <>
      <PageHero
        title="Galerie d'oeuvres"
        highlight="éligibles"
        description="Découvrez notre sélection d'oeuvres d'art originales, vérifiées et éligibles à la défiscalisation. Chaque acquisition réduit votre résultat imposable."
      />

      {/* Filtres */}
      <section className="section pb-0">
        <div className="flex items-center gap-2 mb-4 text-sm text-primary-400">
          <SlidersHorizontal size={16} />
          <span>Filtrer par</span>
        </div>

        {/* Type */}
        <div className="flex flex-wrap gap-2 mb-4">
          {typeFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setSelectedType(f.value)}
              className={`px-4 py-2 text-xs font-medium rounded-full border transition-colors duration-200 ${
                selectedType === f.value
                  ? 'bg-primary-800 text-white border-primary-800'
                  : 'bg-white text-primary-600 border-primary-200 hover:border-primary-400'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Prix */}
        <div className="flex flex-wrap gap-2">
          {priceFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setSelectedPrice(f.value)}
              className={`px-4 py-2 text-xs font-medium rounded-full border transition-colors duration-200 ${
                selectedPrice === f.value
                  ? 'bg-gold text-white border-gold'
                  : 'bg-white text-primary-600 border-primary-200 hover:border-gold-400'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <p className="mt-6 text-sm text-primary-400">
          {filtered.length} oeuvre{filtered.length > 1 ? 's' : ''} trouvée{filtered.length > 1 ? 's' : ''}
        </p>
      </section>

      {/* Grille */}
      <section className="section">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-primary-400 text-sm">
              Aucune oeuvre ne correspond à vos critères.
            </p>
            <button
              onClick={() => { setSelectedType('all'); setSelectedPrice('all'); }}
              className="btn-outline mt-4"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </section>
    </>
  );
}
