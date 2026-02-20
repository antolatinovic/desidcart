import Link from 'next/link';

const footerLinks = {
  plateforme: [
    { name: 'Galerie', href: '/galerie' },
    { name: 'Comment ça marche', href: '/comment-ca-marche' },
    { name: 'Simulateur fiscal', href: '/simulateur' },
    { name: 'Pour les artistes', href: '/artistes' },
  ],
  ressources: [
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/comment-ca-marche#faq' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'CGV', href: '/cgv' },
    { name: 'Politique de confidentialité', href: '/cgv#confidentialite' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-serif font-bold">
              Defisc<span className="text-gold">Art</span>
            </Link>
            <p className="mt-4 text-sm text-primary-300 leading-relaxed">
              L'art au service de votre fiscalité. Marketplace d'œuvres éligibles 
              à la déduction fiscale, avec accompagnement clé en main.
            </p>
          </div>

          {/* Plateforme */}
          <div>
            <h3 className="text-sm font-semibold text-gold uppercase tracking-wider">
              Plateforme
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.plateforme.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="text-sm font-semibold text-gold uppercase tracking-wider">
              Ressources
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.ressources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="text-sm font-semibold text-gold uppercase tracking-wider">
              Légal
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-700">
          <p className="text-center text-xs text-primary-400">
            © {new Date().getFullYear()} DefiscArt. Tous droits réservés. 
            Dispositif fiscal article 238 bis AB du CGI.
          </p>
        </div>
      </div>
    </footer>
  );
}
