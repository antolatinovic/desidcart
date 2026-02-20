import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { AuthProvider } from '@/components/providers/AuthProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'DefiscArt — Optimisez vos impôts en soutenant l\'art vivant',
    template: '%s | DefiscArt',
  },
  description:
    'Marketplace d\'œuvres d\'art éligibles à la déduction fiscale (article 238 bis AB du CGI). Achetez une œuvre, exposez-la, et déduisez jusqu\'à 45% de votre résultat imposable.',
  keywords: [
    'déduction fiscale',
    'œuvre d\'art',
    'défiscalisation',
    'BIC',
    'article 238 bis AB',
    'art vivant',
    'optimisation fiscale',
  ],
  openGraph: {
    title: 'DefiscArt — L\'art au service de votre fiscalité',
    description:
      'Achetez des œuvres d\'art éligibles et déduisez jusqu\'à 45% de votre résultat imposable.',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-cream-100 font-sans antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
