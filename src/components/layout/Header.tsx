'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Galerie', href: '/galerie' },
  { name: 'Comment ça marche', href: '/comment-ca-marche' },
  { name: 'Simulateur', href: '/simulateur' },
  { name: 'Pour les artistes', href: '/artistes' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-cream-300">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="text-xl font-serif font-bold text-primary-800">
              Defisc<span className="text-gold">Art</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-primary-500 hover:text-primary-800 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            <Link href="/connexion" className="btn-ghost btn-sm">
              Se connecter
            </Link>
            <Link href="/inscription/artiste" className="btn-primary btn-sm">
              Espace artiste
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-primary-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300',
            mobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
          )}
        >
          <div className="space-y-1 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-sm text-primary-500 hover:text-primary-800 hover:bg-cream-200 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2 px-3">
              <Link href="/connexion" className="btn-outline btn-sm text-center">
                Se connecter
              </Link>
              <Link href="/inscription/artiste" className="btn-primary btn-sm text-center">
                Espace artiste
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
