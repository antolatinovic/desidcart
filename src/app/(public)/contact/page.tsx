'use client';

import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';

const subjects = [
  { value: '', label: 'Sélectionnez un sujet' },
  { value: 'general', label: 'Question générale' },
  { value: 'entreprise', label: 'Je suis une entreprise' },
  { value: 'artiste', label: 'Je suis un artiste' },
  { value: 'technique', label: 'Problème technique' },
  { value: 'autre', label: 'Autre' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Veuillez entrer votre nom';
    if (!form.email.trim()) newErrors.email = 'Veuillez entrer votre email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Email invalide';
    if (!form.subject) newErrors.subject = 'Veuillez sélectionner un sujet';
    if (!form.message.trim()) newErrors.message = 'Veuillez entrer votre message';
    return newErrors;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);
    }
  }

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
    }
  }

  return (
    <>
      <PageHero
        title="Contactez-nous"
        description="Une question sur la défiscalisation, notre plateforme ou un projet d'achat ? Notre équipe vous répond sous 24h."
      />

      <section className="section-lg">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            {isSubmitted ? (
              <div className="card p-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mb-5">
                  <CheckCircle size={32} />
                </div>
                <h2 className="text-h3 font-serif text-primary-800 mb-3">
                  Message envoyé !
                </h2>
                <p className="text-sm text-primary-500 max-w-md mx-auto">
                  Merci pour votre message. Notre équipe vous répondra dans les meilleurs délais,
                  généralement sous 24 heures ouvrées.
                </p>
                <button
                  onClick={() => { setIsSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="btn-outline mt-8"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-8" noValidate>
                <h2 className="text-h3 font-serif text-primary-800 mb-6">
                  Envoyez-nous un message
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="name" className="label">Nom complet</label>
                    <input
                      id="name"
                      type="text"
                      className={`input ${errors.name ? 'border-red-400 focus:ring-red-300' : ''}`}
                      placeholder="Jean Dupont"
                      value={form.name}
                      onChange={(e) => updateField('name', e.target.value)}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="label">Email</label>
                    <input
                      id="email"
                      type="email"
                      className={`input ${errors.email ? 'border-red-400 focus:ring-red-300' : ''}`}
                      placeholder="jean@entreprise.fr"
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>
                <div className="mb-5">
                  <label htmlFor="subject" className="label">Sujet</label>
                  <select
                    id="subject"
                    className={`input ${errors.subject ? 'border-red-400 focus:ring-red-300' : ''}`}
                    value={form.subject}
                    onChange={(e) => updateField('subject', e.target.value)}
                  >
                    {subjects.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                  {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="label">Message</label>
                  <textarea
                    id="message"
                    rows={6}
                    className={`input resize-none ${errors.message ? 'border-red-400 focus:ring-red-300' : ''}`}
                    placeholder="Décrivez votre demande..."
                    value={form.message}
                    onChange={(e) => updateField('message', e.target.value)}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>
                <button type="submit" className="btn-primary btn-lg w-full sm:w-auto">
                  Envoyer le message
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-h4 font-serif text-primary-800 mb-5">
                Nos coordonnées
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-primary-700">Email</p>
                    <p className="text-sm text-primary-500">contact@defiscart.fr</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-primary-700">Téléphone</p>
                    <p className="text-sm text-primary-500">01 23 45 67 89</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-primary-700">Adresse</p>
                    <p className="text-sm text-primary-500">15 rue de l&apos;Art<br />75001 Paris</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-primary-700">Horaires</p>
                    <p className="text-sm text-primary-500">Lun – Ven : 9h – 18h</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6 bg-gold-50 border border-gold-200">
              <h3 className="text-sm font-medium text-primary-800 mb-2">
                Besoin d&apos;un conseil personnalisé ?
              </h3>
              <p className="text-xs text-primary-500 leading-relaxed">
                Notre équipe peut vous accompagner dans le choix d&apos;une oeuvre adaptée à votre
                budget et à vos objectifs fiscaux. Décrivez votre situation dans le formulaire
                et nous vous recontacterons.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
