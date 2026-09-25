/**
 * SKULPARTNERS Core Financial Computation Engine
 * Based on the approved PRD specification
 */

export interface FinancialCalculationResult {
  annualFees: number;
  term1Fee: number;
  term2Fee: number;
  term3Fee: number;
  principalAmount: number; // 70%
  insuranceFee: number; // 1.5% of principal
  maintenanceFee: number; // ₦4,500 or ₦500
  totalUpfront: number;
  dailyRoiRate: number; // e.g. 0.008
  dailyProfit: number;
  cycleDays: number; // e.g. 123
  totalCycleProfit: number;
  payoutCommissionRate: number; // 0.10
  payoutCommission: number;
  netCycleBalance: number;
  surplusAfterTerm1: number;
  
  // Platform Allocation breakdown (41.9% of platform yield share)
  schoolFeeSharePercentage: number; // 58.1%
  platformSharePercentage: number; // 41.9%
  platformShareAmount: number;
  platformSplit: {
    leadPartner: number; // 15%
    consultantPartner: number; // 10%
    investmentPartner: number; // 10%
    managingPartners: number; // 25%
    salariesAndRunning: number; // 20%
    liquidityCosts: number; // 20%
  };
}

export function computeInvestmentPlan(
  term1: number,
  term2: number,
  term3: number,
  dailyRoi: number = 0.008,
  cycleDays: number = 123,
  maintenanceFeeOption: number = 4500
): FinancialCalculationResult {
  const annualFees = Math.max(0, term1 + term2 + term3);
  const principalAmount = annualFees * 0.70;
  const insuranceFee = principalAmount * 0.015;
  const maintenanceFee = maintenanceFeeOption;
  const totalUpfront = principalAmount + insuranceFee + maintenanceFee;

  const dailyProfit = principalAmount * dailyRoi;
  const totalCycleProfit = dailyProfit * cycleDays;
  const payoutCommissionRate = 0.10;
  const payoutCommission = totalCycleProfit * payoutCommissionRate;
  const netCycleBalance = totalCycleProfit - payoutCommission;
  const surplusAfterTerm1 = netCycleBalance - term1;

  // Waterfall distribution
  const platformSharePercentage = 41.9;
  const schoolFeeSharePercentage = 58.1;
  const platformShareAmount = (totalCycleProfit * platformSharePercentage) / 100;

  const platformSplit = {
    leadPartner: platformShareAmount * 0.15,
    consultantPartner: platformShareAmount * 0.10,
    investmentPartner: platformShareAmount * 0.10,
    managingPartners: platformShareAmount * 0.25,
    salariesAndRunning: platformShareAmount * 0.20,
    liquidityCosts: platformShareAmount * 0.20
  };

  return {
    annualFees,
    term1Fee: term1,
    term2Fee: term2,
    term3Fee: term3,
    principalAmount,
    insuranceFee,
    maintenanceFee,
    totalUpfront,
    dailyRoiRate: dailyRoi,
    dailyProfit,
    cycleDays,
    totalCycleProfit,
    payoutCommissionRate,
    payoutCommission,
    netCycleBalance,
    surplusAfterTerm1,
    schoolFeeSharePercentage,
    platformSharePercentage,
    platformShareAmount,
    platformSplit
  };
}

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount).replace('NGN', '₦');
}

export function formatCompactNaira(amount: number): string {
  if (amount >= 1_000_000) {
    return `₦${(amount / 1_000_000).toFixed(2)}M`;
  }
  if (amount >= 1_000) {
    return `₦${(amount / 1_000).toFixed(1)}k`;
  }
  return `₦${amount.toLocaleString()}`;
}
