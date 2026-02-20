import Link from 'next/link';
import Image from 'next/image';
import { formatCentsToEuros, simulateFiscalSaving } from '@/lib/fiscal';
import { ARTWORK_TYPE_LABELS, type MockArtwork } from '@/lib/mock-data';

interface ArtworkCardProps {
  artwork: MockArtwork;
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  const primaryImage = artwork.images.find((img) => img.is_primary) || artwork.images[0];
  const artistName = `${artwork.artist.profile.first_name} ${artwork.artist.profile.last_name}`;
  const simulation = simulateFiscalSaving({
    artworkPriceCents: artwork.display_price_cents,
    tmi: 30,
  });

  return (
    <Link href={`/galerie/${artwork.id}`} className="card group block overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-primary-50">
        {primaryImage && (
          <Image
            src={primaryImage.image_url}
            alt={artwork.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
        <div className="absolute top-3 left-3">
          <span className="badge-gold">
            {ARTWORK_TYPE_LABELS[artwork.artwork_type]}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-h4 font-serif text-primary-800 group-hover:text-gold transition-colors duration-300">
          {artwork.title}
        </h3>
        <p className="mt-1 text-sm text-primary-400">{artistName}</p>
        <div className="mt-4 flex items-end justify-between">
          <p className="text-lg font-serif font-bold text-primary-800">
            {formatCentsToEuros(artwork.display_price_cents)}
          </p>
          <p className="text-xs text-gold-600">
            Économie estimée : {formatCentsToEuros(Math.round(simulation.totalTaxSaving * 100))}
          </p>
        </div>
      </div>
    </Link>
  );
}
