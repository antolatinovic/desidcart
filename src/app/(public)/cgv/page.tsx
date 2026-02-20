import PageHero from '@/components/ui/PageHero';

export default function CGVPage() {
  return (
    <>
      <PageHero title="Conditions Générales de Vente" />

      <section className="section">
        <div className="max-w-3xl mx-auto prose-sm">
          <p className="text-sm text-primary-400 mb-10">
            Dernière mise à jour : février 2026
          </p>

          <div className="space-y-10">

            <div>
              <h2 className="text-h3 font-serif text-primary-800 mb-3">1. Objet</h2>
              <p className="text-sm text-primary-500 leading-relaxed">
                Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles
                entre DefiscArt SAS (ci-après « la Plateforme ») et toute personne physique ou morale
                (ci-après « l&apos;Utilisateur ») utilisant les services proposés sur le site defiscart.fr.
                Elles s&apos;appliquent à l&apos;ensemble des transactions réalisées via la Plateforme,
                notamment la vente et l&apos;achat d&apos;oeuvres d&apos;art originales.
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-serif text-primary-800 mb-3">2. Services proposés</h2>
              <p className="text-sm text-primary-500 leading-relaxed mb-3">
                La Plateforme met en relation des artistes (« Vendeurs ») et des entreprises (« Acheteurs »)
                pour la vente d&apos;oeuvres d&apos;art originales éligibles à la défiscalisation prévue par
                l&apos;article 238 bis AB du Code Général des Impôts. Les services incluent :
              </p>
              <ul className="space-y-1 text-sm text-primary-500">
                <li className="flex items-start gap-2"><span className="text-gold mt-1">&#x2022;</span>La mise en ligne et la présentation des oeuvres</li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">&#x2022;</span>La gestion des transactions de paiement</li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">&#x2022;</span>La recherche de lieux d&apos;exposition partenaires</li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">&#x2022;</span>La fourniture de documents fiscaux</li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">&#x2022;</span>L&apos;accompagnement administratif</li>
              </ul>
            </div>

            <div>
              <h2 className="text-h3 font-serif text-primary-800 mb-3">3. Inscription et comptes</h2>
              <p className="text-sm text-primary-500 leading-relaxed">
                L&apos;utilisation des services nécessite la création d&apos;un compte. L&apos;Utilisateur
                s&apos;engage à fournir des informations exactes et à jour. Les artistes doivent souscrire
                un abonnement annuel de 49 € TTC pour accéder aux fonctionnalités de vente.
                L&apos;inscription en tant qu&apos;acheteur (entreprise) est gratuite.
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-serif text-primary-800 mb-3">4. Prix et paiement</h2>
              <p className="text-sm text-primary-500 leading-relaxed mb-3">
                Les prix des oeuvres sont affichés en euros toutes taxes comprises. Ils comprennent
                le prix fixé par l&apos;artiste et la commission de la Plateforme. La grille de
                commission est la suivante :
              </p>
              <ul className="space-y-1 text-sm text-primary-500">
                <li className="flex items-start gap-2"><span className="text-gold mt-1">&#x2022;</span>Oeuvres de moins de 2 000 € : commission de 25 %</li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">&#x2022;</span>Oeuvres de 2 000 à 5 000 € : commission de 20 %</li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">&#x2022;</span>Oeuvres de 5 000 à 10 000 € : commission de 15 %</li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">&#x2022;</span>Oeuvres de plus de 10 000 € : commission de 10 %</li>
              </ul>
              <p className="text-sm text-primary-500 leading-relaxed mt-3">
                Le paiement est effectué par carte bancaire via la plateforme sécurisée Stripe.
                L&apos;artiste est rémunéré sous 7 jours ouvrés après confirmation de la vente.
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-serif text-primary-800 mb-3">5. Livraison et exposition</h2>
              <p className="text-sm text-primary-500 leading-relaxed">
                Après l&apos;achat, la Plateforme organise la livraison de l&apos;oeuvre vers le lieu
                d&apos;exposition désigné. Les frais de transport sont à la charge de l&apos;acheteur sauf
                mention contraire. L&apos;oeuvre est exposée pendant une durée minimale de 5 ans dans
                un lieu accessible au public, conformément aux exigences de l&apos;article 238 bis AB du CGI.
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-serif text-primary-800 mb-3">6. Droit de rétractation</h2>
              <p className="text-sm text-primary-500 leading-relaxed">
                Conformément à l&apos;article L221-28 du Code de la consommation, le droit de rétractation
                ne s&apos;applique pas aux contrats de fourniture de biens confectionnés selon les
                spécifications du consommateur ou nettement personnalisés. Les oeuvres d&apos;art étant
                des pièces uniques, elles ne sont pas soumises au droit de rétractation. Toutefois,
                pour les achats réalisés par des professionnels, un délai de vérification de 48 heures
                après réception est accordé pour signaler tout défaut de conformité.
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-serif text-primary-800 mb-3">7. Garanties</h2>
              <p className="text-sm text-primary-500 leading-relaxed">
                La Plateforme garantit l&apos;authenticité des oeuvres proposées. Chaque oeuvre est
                accompagnée d&apos;un certificat d&apos;authenticité signé par l&apos;artiste. En cas de
                contestation de l&apos;authenticité, la Plateforme s&apos;engage à procéder à une
                vérification et, le cas échéant, au remboursement intégral de l&apos;acheteur.
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-serif text-primary-800 mb-3">8. Responsabilités</h2>
              <p className="text-sm text-primary-500 leading-relaxed">
                La Plateforme agit en qualité d&apos;intermédiaire entre l&apos;artiste et l&apos;acheteur.
                Elle s&apos;engage à vérifier l&apos;éligibilité des oeuvres à la défiscalisation et à
                fournir les documents nécessaires. Toutefois, elle ne peut être tenue responsable
                d&apos;un refus de l&apos;administration fiscale lié à la situation particulière de
                l&apos;acheteur. Les simulations fiscales sont fournies à titre indicatif.
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-serif text-primary-800 mb-3">9. Protection des données personnelles</h2>
              <p className="text-sm text-primary-500 leading-relaxed">
                Les données personnelles collectées sont traitées conformément au RGPD et à la loi
                Informatique et Libertés. Elles sont utilisées pour la gestion des comptes, le
                traitement des transactions, l&apos;envoi de communications commerciales (avec
                consentement) et les obligations légales. Les données sont conservées pendant la
                durée de la relation contractuelle, puis pendant les délais légaux de conservation.
                Pour plus de détails, consultez notre politique de confidentialité.
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-serif text-primary-800 mb-3">10. Droit applicable et litiges</h2>
              <p className="text-sm text-primary-500 leading-relaxed">
                Les présentes CGV sont soumises au droit français. En cas de litige, les parties
                s&apos;engagent à rechercher une solution amiable avant toute action judiciaire.
                À défaut d&apos;accord amiable, les tribunaux compétents de Paris seront seuls
                compétents pour connaître du litige. Conformément à l&apos;article L612-1 du Code
                de la consommation, le consommateur peut recourir gratuitement au service de
                médiation auquel la Plateforme est adhérente.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
