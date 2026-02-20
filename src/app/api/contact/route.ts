import { NextResponse } from 'next/server';
import { sendContactFormEmail } from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, type } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nom, email et message sont requis.' },
        { status: 400 }
      );
    }

    await sendContactFormEmail({ name, email, phone, message, type: type || 'general' });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message.' },
      { status: 500 }
    );
  }
}
