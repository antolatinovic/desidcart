import PageHero from '@/components/ui/PageHero';

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero title="Mentions légales" />

      <section className="section">
        <div className="max-w-3xl mx-auto prose-sm">
          <div className="space-y-10">

            <div>
              <h2 className="text-h3 font-serif text-primary-800 mb-3">1. Éditeur du site</h2>
              <div className="text-sm text-primary-500 leading-relaxed space-y-1">
                <p>DefiscArt SAS</p>
                <p>Capital social : 10 000 €</p>
                <p>Siège social : 15 rue de l&apos;Art, 75001 Paris</p>
                <p>RCS Paris : XXX XXX XXX</p>
                <p>N° TVA intracommunautaire : FR XX XXX XXX XXX</p>
                <p>Email : contact@defiscart.fr</p>
                <p>Téléphone : 01 23 45 67 89</p>
              </div>
            </div>

            <div>
              <h2 className="text-h3 font-serif text-primary-800 mb-3">2. Directeur de la publication</h2>
              <p className="text-sm text-primary-500">
                Le directeur de la publication est le représentant légal de la société DefiscArt SAS.
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-serif text-primary-800 mb-3">3. Hébergeur</h2>
              <div className="text-sm text-primary-500 leading-relaxed space-y-1">
                <p>Vercel Inc.</p>
                <p>340 S Lemon Ave #4133</p>
                <p>Walnut, CA 91789, États-Unis</p>
                <p>Site web : vercel.com</p>
              </div>
            </div>

            <div>
              <h2 className="text-h3 font-serif text-primary-800 mb-3">4. Propriété intellectuelle</h2>
              <p className="text-sm text-primary-500 leading-relaxed">
                L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, sons, logiciels)
                est la propriété exclusive de DefiscArt SAS ou de ses partenaires et est protégé par les lois
                françaises et internationales relatives à la propriété intellectuelle. Toute reproduction,
                représentation, modification, publication, adaptation de tout ou partie des éléments du site,
                quel que soit le moyen ou le procédé utilisé, est interdite sauf autorisation écrite préalable
                de DefiscArt SAS.
              </p>
              <p className="text-sm text-primary-500 leading-relaxed mt-2">
                Les oeuvres d&apos;art présentées sur le site restent la propriété intellectuelle de leurs
                auteurs respectifs. Leur reproduction est strictement interdite sans l&apos;accord de l&apos;artiste.
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-serif text-primary-800 mb-3">5. Données personnelles</h2>
              <p className="text-sm text-primary-500 leading-relaxed">
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
                Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez d&apos;un droit d&apos;accès,
                de rectification, de suppression et d&apos;opposition aux données personnelles vous concernant.
              </p>
              <p className="text-sm text-primary-500 leading-relaxed mt-2">
                Les données personnelles collectées sur ce site (formulaires de contact, inscription,
                achat) sont traitées par DefiscArt SAS en qualité de responsable de traitement. Elles
                sont nécessaires à la gestion de votre compte, au traitement de vos commandes et à
                la communication commerciale (avec votre consentement).
              </p>
              <p className="text-sm text-primary-500 leading-relaxed mt-2">
                Pour exercer vos droits, contactez-nous à : dpo@defiscart.fr
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-serif text-primary-800 mb-3">6. Cookies</h2>
              <p className="text-sm text-primary-500 leading-relaxed">
                Ce site utilise des cookies strictement nécessaires au fonctionnement du service
                (authentification, préférences de session). Des cookies analytiques peuvent être
                utilisés avec votre consentement pour améliorer l&apos;expérience utilisateur.
                Vous pouvez gérer vos préférences de cookies à tout moment via les paramètres
                de votre navigateur.
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-serif text-primary-800 mb-3">7. Limitation de responsabilité</h2>
              <p className="text-sm text-primary-500 leading-relaxed">
                DefiscArt SAS s&apos;efforce de fournir des informations aussi précises que possible.
                Toutefois, elle ne pourra être tenue responsable des omissions, des inexactitudes
                ou des carences dans la mise à jour. Les simulations fiscales proposées sur le site
                sont données à titre indicatif et ne constituent pas un conseil fiscal. Nous vous
                recommandons de consulter votre expert-comptable pour toute décision d&apos;investissement.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
