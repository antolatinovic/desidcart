import Link from 'next/link';
import { ArrowRight, Search, FileText, Building, CalendarCheck, TrendingDown, Palette, ShieldCheck, Eye, Award, Handshake } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import FAQAccordion from '@/components/ui/FAQAccordion';

const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Choisissez une oeuvre éligible',
    desc: 'Parcourez notre galerie d\'oeuvres vérifiées. Chaque pièce est une création originale d\'un artiste vivant, condition essentielle pour bénéficier de la défiscalisation. Peintures, sculptures, photographies, gravures, tapisseries, céramiques — trouvez l\'oeuvre qui correspond à votre sensibilité et à votre budget.',
  },
  {
    num: '02',
    icon: FileText,
    title: 'Achetez et inscrivez à l\'actif',
    desc: 'Effectuez votre achat en toute sécurité via notre plateforme. Nous générons automatiquement les documents nécessaires : facture conforme, modèle d\'inscription à l\'actif immobilisé et modèle de réserve spéciale de l\'article 238 bis AB. Votre expert-comptable n\'a plus qu\'à valider.',
  },
  {
    num: '03',
    icon: Building,
    title: 'Exposez dans un lieu public partenaire',
    desc: 'La loi impose que l\'oeuvre soit exposée dans un lieu accessible au public pendant 5 ans. Nous trouvons pour vous un lieu partenaire (mairie, médiathèque, espace culturel, hall d\'entreprise ouvert au public) et gérons le transport et l\'installation. Vous n\'avez rien à faire.',
  },
  {
    num: '04',
    icon: CalendarCheck,
    title: 'Déduisez 1/5 du prix pendant 5 ans',
    desc: 'Chaque année pendant 5 exercices, vous déduisez 1/5 du prix de l\'oeuvre de votre résultat imposable. Nous vous envoyons un rappel annuel avec les montants exacts à reporter dans votre déclaration. Après 5 ans, l\'oeuvre vous appartient pleinement, et vous pouvez la revendre sans plus-value.',
  },
];

const benefits = [
  { icon: TrendingDown, title: 'Réduction d\'impôt', desc: 'Jusqu\'à 45 % du prix de l\'oeuvre récupéré en économie d\'impôt sur 5 ans.' },
  { icon: Palette, title: 'Valorisation culturelle', desc: 'Associez votre marque à la création artistique et à la culture française.' },
  { icon: ShieldCheck, title: 'Sécurité juridique', desc: 'Oeuvres vérifiées, documents conformes, accompagnement fiscal complet.' },
  { icon: Eye, title: 'Visibilité locale', desc: 'Votre nom associé à l\'exposition dans un lieu public de votre région.' },
  { icon: Award, title: 'Patrimoine valorisable', desc: 'Après 5 ans, revendez l\'oeuvre au prix d\'achat sans plus-value imposable.' },
  { icon: Handshake, title: 'Simplicité totale', desc: 'De l\'achat à l\'exposition, nous gérons toutes les démarches pour vous.' },
];

const faqItems = [
  {
    question: 'Quelles entreprises peuvent bénéficier de cette défiscalisation ?',
    answer: 'Toutes les entreprises soumises à l\'impôt sur les sociétés (IS) ou à l\'impôt sur le revenu dans la catégorie des bénéfices industriels et commerciaux (BIC) peuvent bénéficier du dispositif. Cela inclut les SARL, SAS, SA, EURL, entreprises individuelles au réel, professions libérales en BNC (sous certaines conditions).',
  },
  {
    question: 'Quelles oeuvres sont éligibles à la défiscalisation ?',
    answer: 'L\'oeuvre doit être originale, créée par un artiste vivant, et acquise directement auprès de l\'artiste ou d\'un intermédiaire agréé. Sont éligibles : peintures, dessins, gravures, sculptures, tapisseries, céramiques, photographies d\'art (tirages limités et signés), et toute oeuvre d\'art plastique originale.',
  },
  {
    question: 'Quel est le plafond de déduction ?',
    answer: 'La déduction annuelle (1/5 du prix) est plafonnée au plus élevé de deux montants : 5‰ (cinq pour mille) du chiffre d\'affaires annuel de l\'entreprise, ou 20 000 €. Pour une entreprise avec un CA de 2 millions d\'euros, le plafond est donc de 20 000 € (car 5‰ × 2M = 10 000 € < 20 000 €).',
  },
  {
    question: 'Où l\'oeuvre doit-elle être exposée ?',
    answer: 'L\'oeuvre doit être exposée dans un lieu accessible au public ou aux salariés de l\'entreprise (hors bureaux individuels) pendant toute la durée de déduction, soit 5 ans. DefiscArt trouve pour vous un lieu partenaire adapté : mairie, médiathèque, espace culturel, hall d\'accueil ouvert au public.',
  },
  {
    question: 'Que se passe-t-il après les 5 ans ?',
    answer: 'Après la période de 5 ans, l\'oeuvre est entièrement amortie fiscalement et vous appartient pleinement. Vous pouvez la conserver, l\'exposer dans vos locaux, ou la revendre. Si vous la revendez au prix d\'acquisition, il n\'y a aucune plus-value imposable puisque l\'oeuvre a été intégralement déduite.',
  },
  {
    question: 'Comment fonctionne la commission DefiscArt ?',
    answer: 'Notre commission est dégressive selon le prix de l\'oeuvre : 25 % pour les oeuvres de moins de 2 000 €, 20 % entre 2 000 et 5 000 €, 15 % entre 5 000 et 10 000 €, et 10 % au-delà de 10 000 €. La commission est incluse dans le prix affiché et est elle-même déductible.',
  },
  {
    question: 'Quels documents sont fournis pour ma comptabilité ?',
    answer: 'Nous fournissons : la facture d\'achat conforme, le certificat d\'authenticité de l\'oeuvre, le modèle d\'inscription à l\'actif immobilisé, le modèle de réserve spéciale (article 238 bis AB), l\'attestation d\'exposition annuelle, et un récapitulatif des déductions pour chaque exercice.',
  },
  {
    question: 'Puis-je choisir le lieu d\'exposition ?',
    answer: 'Vous pouvez exprimer des préférences géographiques ou thématiques. Nous vous proposerons plusieurs lieux partenaires correspondant à vos critères. Vous pouvez également proposer un lieu si celui-ci remplit les conditions légales d\'accessibilité au public.',
  },
];

export default function CommentCaMarchePage() {
  return (
    <>
      <PageHero
        title="Comment ça marche"
        description="De la sélection de l'oeuvre à l'économie d'impôt : tout le processus expliqué simplement."
      />

      {/* 4 étapes */}
      <section className="section-lg">
        <h2 className="text-h2 font-serif text-primary-800 text-center mb-16">
          Le processus en 4 étapes
        </h2>
        <div className="max-w-3xl mx-auto space-y-16">
          {steps.map((step) => (
            <div key={step.num} className="flex gap-8">
              <div className="flex-shrink-0">
                <span className="text-6xl font-serif font-bold text-gold-100">
                  {step.num}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded bg-gold-50 text-gold-600">
                    <step.icon size={20} />
                  </div>
                  <h3 className="text-h3 font-serif text-primary-800">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-primary-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Avantages */}
      <section className="bg-white">
        <div className="section">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-serif text-primary-800">
              Les avantages pour votre entreprise
            </h2>
            <p className="mt-3 text-primary-500 max-w-lg mx-auto">
              Bien plus qu&apos;une optimisation fiscale : un investissement culturel et patrimonial.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold-50 text-gold-600 mb-5">
                  <b.icon size={28} />
                </div>
                <h3 className="text-h4 font-serif text-primary-800">{b.title}</h3>
                <p className="mt-3 text-sm text-primary-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cadre juridique */}
      <section className="section">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-h2 font-serif text-primary-800 text-center mb-8">
            Le cadre juridique
          </h2>
          <div className="card p-8">
            <h3 className="text-h4 font-serif text-primary-800 mb-4">
              Article 238 bis AB du Code Général des Impôts
            </h3>
            <p className="text-sm text-primary-500 leading-relaxed mb-6">
              Ce dispositif permet aux entreprises de déduire de leur résultat imposable le prix
              d&apos;acquisition d&apos;oeuvres originales d&apos;artistes vivants inscrites à l&apos;actif
              immobilisé. La déduction s&apos;effectue par fractions égales sur cinq exercices.
            </p>
            <h4 className="text-sm font-medium text-primary-700 mb-3">Conditions d&apos;éligibilité :</h4>
            <ul className="space-y-2 text-sm text-primary-500">
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">&#x2022;</span>
                L&apos;entreprise est soumise à l&apos;IS ou à l&apos;IR (catégorie BIC)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">&#x2022;</span>
                L&apos;oeuvre est originale et créée par un artiste vivant
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">&#x2022;</span>
                L&apos;oeuvre est inscrite à un compte d&apos;actif immobilisé
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">&#x2022;</span>
                Une réserve spéciale est constituée au passif du bilan
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">&#x2022;</span>
                L&apos;oeuvre est exposée dans un lieu accessible au public pendant 5 ans
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="section">
          <h2 className="text-h2 font-serif text-primary-800 text-center mb-10">
            Questions fréquentes
          </h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* Double CTA */}
      <section className="section-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="card p-8 text-center">
            <h3 className="text-h3 font-serif text-primary-800 mb-3">
              Prêt à investir ?
            </h3>
            <p className="text-sm text-primary-500 mb-6">
              Parcourez notre galerie d&apos;oeuvres éligibles et trouvez la pièce idéale.
            </p>
            <Link href="/galerie" className="btn-primary w-full">
              Voir les oeuvres
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="card p-8 text-center">
            <h3 className="text-h3 font-serif text-primary-800 mb-3">
              Estimez votre économie
            </h3>
            <p className="text-sm text-primary-500 mb-6">
              Utilisez notre simulateur pour calculer votre économie d&apos;impôt personnalisée.
            </p>
            <Link href="/simulateur" className="btn-gold w-full">
              Simuler maintenant
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
