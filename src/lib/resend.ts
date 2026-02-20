import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY || '');

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'contact@defiscart.fr';
const APP_NAME = 'DefiscArt';

// ============================================
// Types
// ============================================

interface EmailParams {
  to: string;
  subject: string;
  html: string;
}

// ============================================
// Envoi générique
// ============================================

async function sendEmail(params: EmailParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: `${APP_NAME} <${FROM_EMAIL}>`,
      to: params.to,
      subject: params.subject,
      html: params.html,
    });

    if (error) {
      console.error('Resend error:', error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error('Failed to send email:', err);
    throw err;
  }
}

// ============================================
// Template wrapper
// ============================================

function wrapInTemplate(content: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;padding:0;background-color:#FAFAF8;font-family:'Helvetica Neue',Arial,sans-serif;color:#2D2D2D;">
      <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <!-- Header -->
        <div style="text-align:center;margin-bottom:40px;">
          <h1 style="font-size:28px;font-weight:700;color:#1A1A1A;margin:0;">
            Defisc<span style="color:#C9A96E;">Art</span>
          </h1>
        </div>
        
        <!-- Content -->
        <div style="background:white;border-radius:8px;padding:32px;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
          ${content}
        </div>
        
        <!-- Footer -->
        <div style="text-align:center;margin-top:32px;font-size:12px;color:#6B6B6B;">
          <p style="margin:0;">© ${new Date().getFullYear()} ${APP_NAME}. Tous droits réservés.</p>
          <p style="margin:8px 0 0;">L'art au service de votre fiscalité.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// ============================================
// Emails spécifiques
// ============================================

export async function sendWelcomeArtistEmail(to: string, firstName: string) {
  return sendEmail({
    to,
    subject: `Bienvenue sur ${APP_NAME}, ${firstName} !`,
    html: wrapInTemplate(`
      <h2 style="font-size:22px;color:#1A1A1A;margin:0 0 16px;">Bienvenue, ${firstName} !</h2>
      <p style="color:#4A4A4A;line-height:1.6;">
        Votre compte artiste est maintenant actif. Vos œuvres seront visibles par des professionnels
        cherchant à optimiser leur fiscalité grâce à l'art.
      </p>
      <h3 style="font-size:16px;color:#1A1A1A;margin:24px 0 12px;">Prochaines étapes :</h3>
      <ol style="color:#4A4A4A;line-height:1.8;padding-left:20px;">
        <li>Complétez votre profil avec une bio et une photo</li>
        <li>Ajoutez vos premières œuvres (photos HD + description)</li>
        <li>Notre équipe validera leur éligibilité fiscale</li>
      </ol>
      <div style="text-align:center;margin-top:32px;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/artiste" 
           style="display:inline-block;padding:14px 28px;background:#1A1A1A;color:white;text-decoration:none;border-radius:6px;font-weight:500;">
          Accéder à mon espace
        </a>
      </div>
    `),
  });
}

export async function sendWelcomeCompanyEmail(to: string, firstName: string) {
  return sendEmail({
    to,
    subject: `Bienvenue sur ${APP_NAME} !`,
    html: wrapInTemplate(`
      <h2 style="font-size:22px;color:#1A1A1A;margin:0 0 16px;">Bienvenue, ${firstName} !</h2>
      <p style="color:#4A4A4A;line-height:1.6;">
        Votre compte entreprise est prêt. Découvrez notre sélection d'œuvres éligibles 
        à la déduction fiscale (article 238 bis AB du CGI) et commencez à optimiser vos impôts.
      </p>
      <div style="text-align:center;margin-top:32px;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/galerie" 
           style="display:inline-block;padding:14px 28px;background:#C9A96E;color:white;text-decoration:none;border-radius:6px;font-weight:500;">
          Découvrir les œuvres
        </a>
      </div>
    `),
  });
}

export async function sendArtworkValidatedEmail(to: string, artworkTitle: string) {
  return sendEmail({
    to,
    subject: `Votre œuvre "${artworkTitle}" est en ligne !`,
    html: wrapInTemplate(`
      <h2 style="font-size:22px;color:#1A1A1A;margin:0 0 16px;">Bonne nouvelle !</h2>
      <p style="color:#4A4A4A;line-height:1.6;">
        Votre œuvre <strong>"${artworkTitle}"</strong> a été validée par notre équipe 
        et est désormais visible sur la galerie ${APP_NAME}.
      </p>
      <div style="text-align:center;margin-top:32px;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/artiste/oeuvres" 
           style="display:inline-block;padding:14px 28px;background:#1A1A1A;color:white;text-decoration:none;border-radius:6px;font-weight:500;">
          Voir mes œuvres
        </a>
      </div>
    `),
  });
}

export async function sendPurchaseConfirmationEmail(to: string, params: {
  buyerName: string;
  artworkTitle: string;
  artistName: string;
  totalPrice: string;
  annualDeduction: string;
  annualSaving: string;
}) {
  return sendEmail({
    to,
    subject: `Confirmation d'achat — ${params.artworkTitle}`,
    html: wrapInTemplate(`
      <h2 style="font-size:22px;color:#1A1A1A;margin:0 0 16px;">Achat confirmé !</h2>
      <p style="color:#4A4A4A;line-height:1.6;">
        Bonjour ${params.buyerName}, votre acquisition est finalisée.
      </p>
      <div style="background:#FAFAF8;border-radius:6px;padding:20px;margin:24px 0;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#4A4A4A;">
          <tr><td style="padding:8px 0;"><strong>Œuvre</strong></td><td style="text-align:right;">${params.artworkTitle}</td></tr>
          <tr><td style="padding:8px 0;"><strong>Artiste</strong></td><td style="text-align:right;">${params.artistName}</td></tr>
          <tr style="border-top:1px solid #E5E4E1;"><td style="padding:8px 0;"><strong>Montant total</strong></td><td style="text-align:right;font-weight:700;">${params.totalPrice}</td></tr>
          <tr><td style="padding:8px 0;color:#C9A96E;"><strong>Déduction annuelle</strong></td><td style="text-align:right;color:#C9A96E;">${params.annualDeduction} / an</td></tr>
          <tr><td style="padding:8px 0;color:#C9A96E;"><strong>Économie d'impôt estimée</strong></td><td style="text-align:right;color:#C9A96E;">${params.annualSaving} / an</td></tr>
        </table>
      </div>
      <p style="color:#4A4A4A;line-height:1.6;">
        Vos documents fiscaux (factures, modèle de réserve spéciale) sont disponibles 
        dans votre espace.
      </p>
      <div style="text-align:center;margin-top:32px;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/entreprise/documents" 
           style="display:inline-block;padding:14px 28px;background:#1A1A1A;color:white;text-decoration:none;border-radius:6px;font-weight:500;">
          Accéder à mes documents
        </a>
      </div>
    `),
  });
}

export async function sendSaleNotificationEmail(to: string, params: {
  artistName: string;
  artworkTitle: string;
  artistAmount: string;
}) {
  return sendEmail({
    to,
    subject: `Votre œuvre "${params.artworkTitle}" a été vendue !`,
    html: wrapInTemplate(`
      <h2 style="font-size:22px;color:#1A1A1A;margin:0 0 16px;">Félicitations, ${params.artistName} !</h2>
      <p style="color:#4A4A4A;line-height:1.6;">
        Votre œuvre <strong>"${params.artworkTitle}"</strong> vient d'être achetée par une entreprise.
      </p>
      <div style="background:#FAFAF8;border-radius:6px;padding:20px;margin:24px 0;text-align:center;">
        <p style="font-size:14px;color:#6B6B6B;margin:0 0 8px;">Montant qui vous revient</p>
        <p style="font-size:28px;font-weight:700;color:#C9A96E;margin:0;">${params.artistAmount}</p>
      </div>
      <div style="text-align:center;margin-top:32px;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/artiste/ventes" 
           style="display:inline-block;padding:14px 28px;background:#1A1A1A;color:white;text-decoration:none;border-radius:6px;font-weight:500;">
          Voir mes ventes
        </a>
      </div>
    `),
  });
}

export async function sendReminderReserveSpecialeEmail(to: string, params: {
  companyName: string;
  artworkTitle: string;
  year: number;
  amount: string;
}) {
  return sendEmail({
    to,
    subject: `Rappel : Réserve spéciale année ${params.year}/5 — ${params.artworkTitle}`,
    html: wrapInTemplate(`
      <h2 style="font-size:22px;color:#1A1A1A;margin:0 0 16px;">Rappel fiscal annuel</h2>
      <p style="color:#4A4A4A;line-height:1.6;">
        Bonjour, ceci est un rappel pour la constitution de votre réserve spéciale 
        (article 238 bis AB du CGI) pour l'exercice en cours.
      </p>
      <div style="background:#FAFAF8;border-radius:6px;padding:20px;margin:24px 0;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#4A4A4A;">
          <tr><td style="padding:8px 0;"><strong>Œuvre</strong></td><td style="text-align:right;">${params.artworkTitle}</td></tr>
          <tr><td style="padding:8px 0;"><strong>Année</strong></td><td style="text-align:right;">${params.year} / 5</td></tr>
          <tr><td style="padding:8px 0;"><strong>Montant à inscrire en réserve</strong></td><td style="text-align:right;font-weight:700;color:#C9A96E;">${params.amount}</td></tr>
        </table>
      </div>
      <p style="color:#4A4A4A;line-height:1.6;font-size:13px;">
        Pensez à transmettre cette information à votre expert-comptable avant la clôture de votre exercice.
        Le modèle de document pré-rempli est disponible dans votre espace.
      </p>
      <div style="text-align:center;margin-top:32px;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/entreprise/documents" 
           style="display:inline-block;padding:14px 28px;background:#1A1A1A;color:white;text-decoration:none;border-radius:6px;font-weight:500;">
          Voir mes documents
        </a>
      </div>
    `),
  });
}

export async function sendContactFormEmail(params: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: string;
}) {
  return sendEmail({
    to: FROM_EMAIL,
    subject: `[Contact] Nouvelle demande de ${params.name}`,
    html: wrapInTemplate(`
      <h2 style="font-size:22px;color:#1A1A1A;margin:0 0 16px;">Nouveau message</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#4A4A4A;">
        <tr><td style="padding:8px 0;font-weight:600;">Nom</td><td>${params.name}</td></tr>
        <tr><td style="padding:8px 0;font-weight:600;">Email</td><td>${params.email}</td></tr>
        <tr><td style="padding:8px 0;font-weight:600;">Téléphone</td><td>${params.phone || '—'}</td></tr>
        <tr><td style="padding:8px 0;font-weight:600;">Type</td><td>${params.type}</td></tr>
      </table>
      <div style="background:#FAFAF8;border-radius:6px;padding:20px;margin:24px 0;">
        <p style="color:#4A4A4A;line-height:1.6;margin:0;">${params.message}</p>
      </div>
    `),
  });
}
