import Link from 'next/link';
import { ArrowRight, Palette, Building2, ShieldCheck, Calculator } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-primary-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(201,169,110,0.15),transparent_60%)]" />
        <div className="relative section-lg py-28 lg:py-36 text-center">
          <h1 className="text-display text-white font-serif max-w-4xl mx-auto text-balance">
            Optimisez vos impôts en soutenant{' '}
            <span className="text-gold">l'art vivant</span>
          </h1>
          <p className="mt-6 text-lg text-primary-300 max-w-2xl mx-auto leading-relaxed">
            Acquérez une œuvre d'art originale, exposez-la, et déduisez jusqu'à 45 %
            de votre résultat imposable. Nous gérons tout, de l'achat à l'exposition.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/galerie" className="btn-gold btn-lg">
              Découvrir les œuvres
              <ArrowRight size={18} />
            </Link>
            <Link href="/simulateur" className="btn group px-6 py-4 text-sm border border-primary-500 text-white hover:bg-primary-700">
              <Calculator size={18} />
              Simuler mon économie
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 3 ARGUMENTS ===== */}
      <section className="section">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {[
            {
              icon: ShieldCheck,
              title: 'Économie d\u2019impôt garantie',
              desc: 'Jusqu\u2019à 45 % du prix de l\u2019œuvre déductible de votre résultat imposable, étalé sur 5 ans.',
            },
            {
              icon: Palette,
              title: 'Soutien aux artistes vivants',
              desc: 'Achetez directement auprès d\u2019artistes et valorisez la création française contemporaine.',
            },
            {
              icon: Building2,
              title: 'Exposition clé en main',
              desc: 'Nous trouvons un lieu public partenaire pour exposer votre œuvre et respecter la loi.',
            },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold-50 text-gold-600 mb-5">
                <item.icon size={28} />
              </div>
              <h3 className="text-h4 font-serif text-primary-800">{item.title}</h3>
              <p className="mt-3 text-sm text-primary-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== COMMENT ÇA MARCHE ===== */}
      <section className="bg-white">
        <div className="section">
          <div className="text-center mb-14">
            <h2 className="text-h2 font-serif text-primary-800">
              Comment ça marche
            </h2>
            <p className="mt-3 text-primary-500 max-w-lg mx-auto">
              En 3 étapes simples, réduisez vos impôts tout en soutenant l'art.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Choisissez une œuvre',
                desc: 'Parcourez notre galerie d\u2019œuvres éligibles, vérifiées par notre équipe. Peintures, sculptures, photographies signées.',
              },
              {
                step: '02',
                title: 'Achetez et déduisez',
                desc: 'Nous gérons les formalités : inscription à l\u2019actif, réserve spéciale, déclaration fiscale. Vous déduisez 1/5 du prix chaque année.',
              },
              {
                step: '03',
                title: 'Exposez et revendez',
                desc: 'Votre œuvre est exposée 5 ans dans un lieu public partenaire. Après 5 ans, revendez au prix d\u2019achat sans plus-value.',
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <span className="text-6xl font-serif font-bold text-gold-100">
                  {item.step}
                </span>
                <h3 className="mt-2 text-h4 font-serif text-primary-800">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-primary-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/comment-ca-marche" className="btn-outline">
              En savoir plus
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== EXEMPLE CHIFFRÉ ===== */}
      <section className="section">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-h2 font-serif text-primary-800">
              Exemple concret
            </h2>
            <p className="mt-3 text-primary-500">
              Pour une œuvre acquise à 10 000 € avec une TMI de 45 %
            </p>
          </div>

          <div className="card p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-sm text-primary-400 mb-1">Déduction annuelle</p>
                <p className="text-2xl font-serif font-bold text-primary-800">2 000 €</p>
                <p className="text-xs text-primary-400 mt-1">pendant 5 ans</p>
              </div>
              <div>
                <p className="text-sm text-primary-400 mb-1">Économie d'impôt / an</p>
                <p className="text-2xl font-serif font-bold text-gold">900 €</p>
                <p className="text-xs text-primary-400 mt-1">TMI 45 %</p>
              </div>
              <div>
                <p className="text-sm text-primary-400 mb-1">Économie totale</p>
                <p className="text-2xl font-serif font-bold text-bordeaux">4 500 €</p>
                <p className="text-xs text-primary-400 mt-1">sur 5 ans</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-cream-200 text-center">
              <p className="text-sm text-primary-500">
                Revente à 10 000 € après 5 ans = <strong>aucune plus-value imposable</strong>.
                Vous avez économisé <span className="text-gold font-semibold">4 500 €</span> et récupéré votre investissement.
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/simulateur" className="btn-primary">
              <Calculator size={18} />
              Calculer mon économie
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TÉMOIGNAGE ===== */}
      <section className="bg-primary-800">
        <div className="section text-center">
          <blockquote className="max-w-2xl mx-auto">
            <p className="text-xl text-white font-serif italic leading-relaxed">
              "Grâce à DefiscArt, j'ai économisé 3 500 € d'impôt en achetant une 
              sculpture exposée dans une mairie. Simple, sécurisé, et valorisant."
            </p>
            <footer className="mt-6">
              <p className="text-gold font-medium">Jean-Philippe T.</p>
              <p className="text-primary-400 text-sm">Entrepreneur en BIC</p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ===== DOUBLE CTA ===== */}
      <section className="section-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* CTA Entreprise */}
          <div className="card p-8 text-center">
            <Building2 size={36} className="mx-auto text-gold mb-4" />
            <h3 className="text-h3 font-serif text-primary-800">
              Vous êtes professionnel
            </h3>
            <p className="mt-3 text-sm text-primary-500 leading-relaxed">
              Réduisez vos impôts jusqu'à 45 % en acquérant une œuvre d'art. 
              Nous gérons l'exposition et les formalités.
            </p>
            <Link href="/galerie" className="btn-primary mt-6 w-full">
              Voir les œuvres
            </Link>
          </div>

          {/* CTA Artiste */}
          <div className="card p-8 text-center border-2 border-gold-200">
            <Palette size={36} className="mx-auto text-gold mb-4" />
            <h3 className="text-h3 font-serif text-primary-800">
              Vous êtes artiste
            </h3>
            <p className="mt-3 text-sm text-primary-500 leading-relaxed">
              Vendez vos œuvres à des acheteurs sérieux et exposez-les 5 ans 
              dans des lieux publics. À partir de 49 €/an.
            </p>
            <Link href="/inscription/artiste" className="btn-gold mt-6 w-full">
              Rejoindre DefiscArt
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
