'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ArtworkImage } from '@/types/database';

interface ImageGalleryProps {
  images: ArtworkImage[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const sorted = [...images].sort((a, b) => a.sort_order - b.sort_order);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentImage = sorted[selectedIndex];

  if (!currentImage) return null;

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-primary-50">
        <Image
          src={currentImage.image_url}
          alt={`${title} — vue ${selectedIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
      {sorted.length > 1 && (
        <div className="mt-3 flex gap-3">
          {sorted.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-20 h-20 rounded overflow-hidden border-2 transition-colors duration-200 ${
                idx === selectedIndex ? 'border-gold' : 'border-transparent hover:border-primary-200'
              }`}
            >
              <Image
                src={img.image_url}
                alt={`${title} — miniature ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
