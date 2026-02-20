import Link from 'next/link';
import { ArrowRight, Users, TrendingUp, CreditCard, MapPin, HeadphonesIcon, Image, Palette, Check } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import FAQAccordion from '@/components/ui/FAQAccordion';

const benefits = [
  { icon: Users, title: 'Acheteurs qualifiés', desc: 'Accédez à un réseau d\'entreprises motivées par la défiscalisation, prêtes à investir dans l\'art.' },
  { icon: TrendingUp, title: 'Ventes facilitées', desc: 'L\'avantage fiscal incite les acheteurs : vos oeuvres se vendent plus facilement et à des prix justes.' },
  { icon: CreditCard, title: 'Paiement sécurisé', desc: 'Paiement garanti via Stripe. Vous recevez votre part directement sur votre compte bancaire.' },
  { icon: MapPin, title: 'Exposition garantie', desc: 'Chaque oeuvre vendue est exposée 5 ans dans un lieu public, offrant une visibilité durable.' },
  { icon: HeadphonesIcon, title: 'Accompagnement complet', desc: 'De la mise en ligne à la livraison, nous gérons la logistique et les formalités.' },
  { icon: Image, title: 'Mise en valeur', desc: 'Votre profil artiste et vos oeuvres sont présentés dans un cadre élégant et professionnel.' },
];

const steps = [
  { num: '01', title: 'Créez votre compte', desc: 'Inscrivez-vous en quelques minutes pour 49 €/an. Ajoutez votre bio, vos photos et vos spécialités.' },
  { num: '02', title: 'Ajoutez vos oeuvres', desc: 'Téléchargez des photos de qualité, décrivez vos oeuvres et fixez votre prix artiste. La commission est calculée automatiquement.' },
  { num: '03', title: 'Vendez et exposez', desc: 'Dès qu\'un acheteur acquiert votre oeuvre, vous êtes notifié. Nous gérons la livraison et l\'exposition pendant 5 ans.' },
];

const commissionTiers = [
  { range: '< 2 000 €', rate: '25 %', example: 'Oeuvre à 1 500 € → Prix affiché 1 875 €' },
  { range: '2 000 – 5 000 €', rate: '20 %', example: 'Oeuvre à 3 000 € → Prix affiché 3 600 €' },
  { range: '5 000 – 10 000 €', rate: '15 %', example: 'Oeuvre à 8 000 € → Prix affiché 9 200 €' },
  { range: '> 10 000 €', rate: '10 %', example: 'Oeuvre à 15 000 € → Prix affiché 16 500 €' },
];

const pricingInclusions = [
  'Nombre illimité d\'oeuvres en ligne',
  'Profil artiste personnalisé',
  'Mise en relation avec des acheteurs',
  'Gestion complète de la vente',
  'Exposition 5 ans en lieu public',
  'Paiements sécurisés via Stripe',
  'Support dédié par email',
];

const artistFaq = [
  {
    question: 'Quelles oeuvres puis-je vendre sur DefiscArt ?',
    answer: 'Vous pouvez vendre toute oeuvre d\'art originale dont vous êtes l\'auteur : peintures, sculptures, photographies (tirages limités signés), gravures, tapisseries, céramiques. L\'oeuvre doit être originale — les reproductions et copies ne sont pas éligibles.',
  },
  {
    question: 'Comment est fixé le prix de vente ?',
    answer: 'Vous fixez librement votre prix artiste (le montant que vous recevez). Notre commission est ajoutée automatiquement pour former le prix affiché à l\'acheteur. La commission est dégressive : plus votre oeuvre est chère, plus le taux est bas.',
  },
  {
    question: 'Quand suis-je payé après une vente ?',
    answer: 'Vous êtes payé sous 7 jours ouvrés après la confirmation de la vente et la réception de l\'oeuvre par le lieu d\'exposition. Le paiement est effectué directement sur votre compte bancaire via Stripe.',
  },
  {
    question: 'Puis-je résilier mon abonnement à tout moment ?',
    answer: 'Oui, vous pouvez résilier votre abonnement à tout moment depuis votre espace artiste. Vos oeuvres déjà en vente restent en ligne jusqu\'à la fin de la période payée. Les oeuvres vendues continuent d\'être exposées normalement.',
  },
];

export default function ArtistesPage() {
  return (
    <>
      <PageHero
        title="Rejoignez DefiscArt en tant"
        highlight="qu'artiste"
        description="Vendez vos oeuvres à des entreprises motivées par la défiscalisation. Exposition garantie 5 ans dans un lieu public."
      />

      {/* Avantages */}
      <section className="section-lg">
        <div className="text-center mb-12">
          <h2 className="text-h2 font-serif text-primary-800">
            Pourquoi vendre sur DefiscArt ?
          </h2>
          <p className="mt-3 text-primary-500 max-w-lg mx-auto">
            Un canal de vente unique qui valorise votre travail et vous connecte à des acheteurs sérieux.
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
      </section>

      {/* 3 étapes */}
      <section className="bg-white">
        <div className="section">
          <h2 className="text-h2 font-serif text-primary-800 text-center mb-14">
            Comment ça fonctionne
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.num}>
                <span className="text-6xl font-serif font-bold text-gold-100">{s.num}</span>
                <h3 className="mt-2 text-h4 font-serif text-primary-800">{s.title}</h3>
                <p className="mt-3 text-sm text-primary-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing + Commission */}
      <section className="section-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Carte tarif */}
          <div className="card p-8 border-2 border-gold-200 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold-50 text-gold-600 mb-4">
              <Palette size={28} />
            </div>
            <h3 className="text-h3 font-serif text-primary-800">
              Abonnement Artiste
            </h3>
            <div className="mt-4">
              <span className="text-display font-serif font-bold text-primary-800">49 €</span>
              <span className="text-primary-400 text-sm">/an</span>
            </div>
            <ul className="mt-6 space-y-3 text-left max-w-xs mx-auto">
              {pricingInclusions.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-primary-600">
                  <Check size={16} className="text-gold mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/inscription/artiste" className="btn-gold btn-lg w-full mt-8">
              S&apos;inscrire maintenant
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Grille commissions */}
          <div>
            <h3 className="text-h3 font-serif text-primary-800 mb-6">
              Grille de commissions
            </h3>
            <p className="text-sm text-primary-500 mb-6 leading-relaxed">
              Notre commission est dégressive : plus votre oeuvre a de la valeur, plus le taux est avantageux.
              La commission est ajoutée à votre prix artiste pour former le prix affiché.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-primary-100">
                    <th className="py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wider">Prix artiste</th>
                    <th className="py-3 text-center text-xs font-medium text-primary-400 uppercase tracking-wider">Commission</th>
                    <th className="py-3 text-right text-xs font-medium text-primary-400 uppercase tracking-wider">Exemple</th>
                  </tr>
                </thead>
                <tbody>
                  {commissionTiers.map((tier) => (
                    <tr key={tier.range} className="border-b border-cream-200">
                      <td className="py-3 text-primary-700 font-medium">{tier.range}</td>
                      <td className="py-3 text-center text-gold-600 font-bold">{tier.rate}</td>
                      <td className="py-3 text-right text-primary-500 text-xs">{tier.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignage */}
      <section className="bg-bordeaux">
        <div className="section text-center">
          <blockquote className="max-w-2xl mx-auto">
            <p className="text-xl text-white font-serif italic leading-relaxed">
              &quot;DefiscArt m&apos;a permis de vendre trois sculptures en six mois à des entreprises
              que je n&apos;aurais jamais touchées autrement. Mes oeuvres sont exposées dans des
              lieux magnifiques, et je suis payée rapidement. Un vrai tremplin.&quot;
            </p>
            <footer className="mt-6">
              <p className="text-gold font-medium">Amina B.</p>
              <p className="text-bordeaux-100 text-sm">Sculptrice et céramiste, Toulouse</p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* FAQ Artiste */}
      <section className="section">
        <h2 className="text-h2 font-serif text-primary-800 text-center mb-10">
          Questions fréquentes
        </h2>
        <FAQAccordion items={artistFaq} />
      </section>

      {/* CTA final */}
      <section className="bg-primary-800">
        <div className="section text-center">
          <h2 className="text-h2 font-serif text-white mb-4">
            Prêt à rejoindre la communauté ?
          </h2>
          <p className="text-primary-300 max-w-lg mx-auto mb-8">
            Créez votre compte artiste en quelques minutes et commencez à vendre
            vos oeuvres à des acheteurs engagés.
          </p>
          <Link href="/inscription/artiste" className="btn-gold btn-lg">
            Créer mon compte artiste
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
