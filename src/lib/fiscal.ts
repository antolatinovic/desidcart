// ============================================
// CALCUL DES COMMISSIONS
// ============================================

export interface CommissionResult {
  rate: number;             // ex: 0.20 pour 20%
  ratePercent: number;      // ex: 20
  commissionCents: number;
  displayPriceCents: number;
}

/**
 * Calcule la commission DefiscArt en fonction du prix artiste.
 * Grille dégressive :
 *   < 2 000 €  → 25%
 *   2 000 – 5 000 €  → 20%
 *   5 000 – 10 000 € → 15%
 *   > 10 000 €  → 10%
 */
export function calculateCommission(artistPriceCents: number): CommissionResult {
  const artistPriceEuros = artistPriceCents / 100;

  let rate: number;
  if (artistPriceEuros < 2000) {
    rate = 0.25;
  } else if (artistPriceEuros <= 5000) {
    rate = 0.20;
  } else if (artistPriceEuros <= 10000) {
    rate = 0.15;
  } else {
    rate = 0.10;
  }

  const commissionCents = Math.round(artistPriceCents * rate);
  const displayPriceCents = artistPriceCents + commissionCents;

  return {
    rate,
    ratePercent: rate * 100,
    commissionCents,
    displayPriceCents,
  };
}

// ============================================
// SIMULATEUR FISCAL
// ============================================

export type TMI = 0 | 11 | 30 | 41 | 45;

export interface SimulationInput {
  artworkPriceCents: number;
  tmi: TMI;
  annualRevenueCents?: number; // chiffre d'affaires annuel
}

export interface YearDetail {
  year: number;             // 1 à 5
  deduction: number;        // en euros
  taxSaving: number;
  cumulativeSaving: number;
}

export interface SimulationResult {
  artworkPrice: number;             // prix en euros
  annualDeduction: number;          // prix / 5
  deductionCap: number;             // max(20 000, CA × 0.005)
  effectiveAnnualDeduction: number; // min(annualDeduction, cap)
  isWithinCap: boolean;
  annualTaxSaving: number;
  totalTaxSaving: number;
  yearByYear: YearDetail[];
  netCost: number;                  // prix - économie totale
  effectiveDiscountPercent: number; // économie / prix × 100
  tmi: TMI;
}

/**
 * Simule l'économie d'impôt liée à l'acquisition d'une œuvre d'art
 * dans le cadre de l'article 238 bis AB du CGI.
 */
export function simulateFiscalSaving(input: SimulationInput): SimulationResult {
  const artworkPrice = input.artworkPriceCents / 100;
  const annualRevenue = input.annualRevenueCents ? input.annualRevenueCents / 100 : 0;

  // Déduction annuelle = 1/5 du prix
  const annualDeduction = artworkPrice / 5;

  // Plafond = max(20 000 €, 5‰ du CA)
  const capFromRevenue = annualRevenue * 0.005;
  const deductionCap = Math.max(20000, capFromRevenue);

  // Déduction effective (plafonnée)
  const effectiveAnnualDeduction = Math.min(annualDeduction, deductionCap);
  const isWithinCap = annualDeduction <= deductionCap;

  // Économie d'impôt
  const annualTaxSaving = effectiveAnnualDeduction * (input.tmi / 100);
  const totalTaxSaving = annualTaxSaving * 5;

  // Détail année par année
  const yearByYear: YearDetail[] = Array.from({ length: 5 }, (_, i) => ({
    year: i + 1,
    deduction: effectiveAnnualDeduction,
    taxSaving: annualTaxSaving,
    cumulativeSaving: annualTaxSaving * (i + 1),
  }));

  // Coût net et réduction effective
  const netCost = artworkPrice - totalTaxSaving;
  const effectiveDiscountPercent = artworkPrice > 0
    ? (totalTaxSaving / artworkPrice) * 100
    : 0;

  return {
    artworkPrice,
    annualDeduction,
    deductionCap,
    effectiveAnnualDeduction,
    isWithinCap,
    annualTaxSaving,
    totalTaxSaving,
    yearByYear,
    netCost,
    effectiveDiscountPercent,
    tmi: input.tmi,
  };
}

// ============================================
// FORMATAGE
// ============================================

/**
 * Formate un montant en centimes vers euros (ex: 1000000 → "10 000 €")
 */
export function formatCentsToEuros(cents: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

/**
 * Formate un montant en euros (ex: 10000 → "10 000 €")
 */
export function formatEuros(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formate un pourcentage (ex: 20 → "20 %")
 */
export function formatPercent(value: number): string {
  return `${value} %`;
}
