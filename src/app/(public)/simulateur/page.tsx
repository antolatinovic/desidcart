'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Info } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import { simulateFiscalSaving, formatEuros, formatPercent, type TMI } from '@/lib/fiscal';

const TMI_OPTIONS: TMI[] = [0, 11, 30, 41, 45];

export default function SimulateurPage() {
  const [priceCents, setPriceCents] = useState(1000000); // 10 000 €
  const [tmi, setTmi] = useState<TMI>(30);
  const [revenueCents, setRevenueCents] = useState<number | undefined>(undefined);

  const simulation = useMemo(
    () => simulateFiscalSaving({ artworkPriceCents: priceCents, tmi, annualRevenueCents: revenueCents }),
    [priceCents, tmi, revenueCents],
  );

  const priceEuros = priceCents / 100;

  return (
    <>
      <PageHero
        title="Simulateur d'économie"
        highlight="fiscale"
        description="Estimez votre économie d'impôt en quelques clics. Article 238 bis AB du CGI : déduisez le prix d'une oeuvre d'art de votre résultat imposable sur 5 ans."
      />

      <section className="section-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Formulaire */}
          <div className="card p-8">
            <h2 className="text-h3 font-serif text-primary-800 mb-6">
              Vos paramètres
            </h2>

            {/* Prix */}
            <div className="mb-8">
              <label className="label">Prix de l&apos;oeuvre</label>
              <div className="flex items-center gap-4 mb-3">
                <input
                  type="range"
                  min={100000}
                  max={5000000}
                  step={50000}
                  value={priceCents}
                  onChange={(e) => setPriceCents(Number(e.target.value))}
                  className="flex-1 h-2 rounded-full appearance-none bg-primary-100 accent-gold cursor-pointer"
                />
                <span className="text-lg font-serif font-bold text-primary-800 w-32 text-right">
                  {formatEuros(priceEuros)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-primary-300">
                <span>1 000 €</span>
                <span>50 000 €</span>
              </div>
            </div>

            {/* TMI */}
            <div className="mb-8">
              <label className="label">Votre tranche marginale d&apos;imposition (TMI)</label>
              <div className="flex flex-wrap gap-2">
                {TMI_OPTIONS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTmi(t)}
                    className={`px-5 py-2.5 text-sm font-medium rounded border transition-colors duration-200 ${
                      tmi === t
                        ? 'bg-primary-800 text-white border-primary-800'
                        : 'bg-white text-primary-600 border-primary-200 hover:border-primary-400'
                    }`}
                  >
                    {t} %
                  </button>
                ))}
              </div>
            </div>

            {/* CA annuel (optionnel) */}
            <div>
              <label className="label">
                Chiffre d&apos;affaires annuel (optionnel)
              </label>
              <input
                type="number"
                className="input"
                placeholder="Ex : 500 000"
                value={revenueCents !== undefined ? revenueCents / 100 : ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setRevenueCents(val ? Number(val) * 100 : undefined);
                }}
              />
              <p className="mt-1.5 text-xs text-primary-300 flex items-center gap-1">
                <Info size={12} />
                Permet de vérifier le plafond de déduction (5‰ du CA ou 20 000 €)
              </p>
            </div>
          </div>

          {/* Résultats */}
          <div>
            <div className="card p-8">
              <h2 className="text-h3 font-serif text-primary-800 mb-6">
                Votre économie
              </h2>

              <div className="space-y-6">
                <div className="flex justify-between items-end pb-4 border-b border-cream-200">
                  <div>
                    <p className="text-xs text-primary-400">Déduction annuelle</p>
                    <p className="text-xs text-primary-300">1/5 du prix chaque année</p>
                  </div>
                  <p className="text-2xl font-serif font-bold text-primary-800">
                    {formatEuros(simulation.effectiveAnnualDeduction)}
                  </p>
                </div>

                <div className="flex justify-between items-end pb-4 border-b border-cream-200">
                  <div>
                    <p className="text-xs text-primary-400">Économie d&apos;impôt par an</p>
                    <p className="text-xs text-primary-300">TMI {formatPercent(tmi)}</p>
                  </div>
                  <p className="text-2xl font-serif font-bold text-gold">
                    {formatEuros(simulation.annualTaxSaving)}
                  </p>
                </div>

                <div className="flex justify-between items-end pb-4 border-b border-cream-200">
                  <div>
                    <p className="text-xs text-primary-400">Économie totale sur 5 ans</p>
                  </div>
                  <p className="text-3xl font-serif font-bold text-gold">
                    {formatEuros(simulation.totalTaxSaving)}
                  </p>
                </div>

                <div className="flex justify-between items-end pb-4 border-b border-cream-200">
                  <div>
                    <p className="text-xs text-primary-400">Coût net réel</p>
                    <p className="text-xs text-primary-300">Prix − économie</p>
                  </div>
                  <p className="text-2xl font-serif font-bold text-primary-800">
                    {formatEuros(simulation.netCost)}
                  </p>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-primary-400">Réduction effective</p>
                  </div>
                  <p className="text-2xl font-serif font-bold text-bordeaux">
                    {simulation.effectiveDiscountPercent.toFixed(1)} %
                  </p>
                </div>
              </div>

              {!simulation.isWithinCap && (
                <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-700">
                  La déduction est plafonnée à {formatEuros(simulation.deductionCap)} par an
                  (5‰ de votre CA ou 20 000 €).
                </div>
              )}
            </div>

            {/* CTA */}
            <Link href="/galerie" className="btn-gold btn-lg w-full mt-6">
              Découvrir les oeuvres
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Tableau année par année */}
      <section className="bg-white">
        <div className="section">
          <h2 className="text-h2 font-serif text-primary-800 text-center mb-10">
            Détail année par année
          </h2>
          <div className="max-w-2xl mx-auto overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-primary-100">
                  <th className="py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wider">Année</th>
                  <th className="py-3 text-right text-xs font-medium text-primary-400 uppercase tracking-wider">Déduction</th>
                  <th className="py-3 text-right text-xs font-medium text-primary-400 uppercase tracking-wider">Économie d&apos;impôt</th>
                  <th className="py-3 text-right text-xs font-medium text-primary-400 uppercase tracking-wider">Cumul</th>
                </tr>
              </thead>
              <tbody>
                {simulation.yearByYear.map((year) => (
                  <tr key={year.year} className="border-b border-cream-200">
                    <td className="py-3 font-medium text-primary-700">Année {year.year}</td>
                    <td className="py-3 text-right text-primary-600">{formatEuros(year.deduction)}</td>
                    <td className="py-3 text-right text-gold-600 font-medium">{formatEuros(year.taxSaving)}</td>
                    <td className="py-3 text-right text-primary-800 font-bold">{formatEuros(year.cumulativeSaving)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-primary-200">
                  <td className="py-3 font-bold text-primary-800">Total</td>
                  <td className="py-3 text-right font-bold text-primary-800">{formatEuros(simulation.artworkPrice)}</td>
                  <td className="py-3 text-right font-bold text-gold">{formatEuros(simulation.totalTaxSaving)}</td>
                  <td className="py-3 text-right font-bold text-gold">{formatEuros(simulation.totalTaxSaving)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* Note légale */}
      <section className="section">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-h3 font-serif text-primary-800 mb-4">
            Le cadre légal
          </h3>
          <p className="text-sm text-primary-500 leading-relaxed">
            L&apos;article 238 bis AB du Code Général des Impôts permet aux entreprises soumises à l&apos;impôt
            sur les sociétés (IS) ou à l&apos;impôt sur le revenu (BIC) de déduire le prix d&apos;acquisition
            d&apos;oeuvres originales d&apos;artistes vivants de leur résultat imposable. La déduction est
            étalée sur 5 exercices, par fractions égales de 1/5 du prix. L&apos;oeuvre doit être exposée
            dans un lieu accessible au public ou aux salariés pendant toute la durée de l&apos;amortissement.
          </p>
          <p className="mt-4 text-xs text-primary-300">
            Ce simulateur fournit une estimation indicative. Consultez votre expert-comptable pour une analyse personnalisée.
          </p>
        </div>
      </section>
    </>
  );
}
