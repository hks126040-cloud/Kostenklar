import { CalculatorInput, CalculatorInputSchema } from './schema';
import { PRICING_CONFIG, PricingConfig } from './pricing-config';

export interface CostBreakdown {
  baseAreaCost: number;
  floorCost: number;
  accessCost: number;
  hazardousWasteCost: number;
  besenreinCost: number;
  subtotalRaw: number;
  regionalFactor: number;
  regionalDelta: number;
  subtotalWithRegion: number;
  finalRealistic: number;
  isMinimumPriceApplied: boolean;
}

export interface PricingResult {
  min: number;
  realistic: number;
  max: number;
  breakdown: CostBreakdown;
}

/**
 * Pure calculation function for German Entrümpelung costs.
 * Guaranteed to never return NaN or undefined.
 */
export function calculateEntruempelungPrice(
  rawInput: unknown,
  customConfig: PricingConfig = PRICING_CONFIG
): PricingResult {
  // 1. Zod Input Validation
  const input: CalculatorInput = CalculatorInputSchema.parse(rawInput);

  // 2. Base Cost from Area & Fill Level
  const baseRate = customConfig.basePricePerSquareMeter[input.fillLevel];
  const baseAreaCost = Math.round(input.area * baseRate);

  // 3. Floor Surcharge
  let floorCost = 0;
  if (input.hasElevator) {
    floorCost = customConfig.floorSurchargeElevatorFlat;
  } else {
    const effectiveFloorLevels = Math.abs(input.floor);
    floorCost = effectiveFloorLevels * customConfig.floorSurchargePerLevelWithoutElevator;
  }

  // 4. Access & Parking Surcharge
  const accessCost = customConfig.accessSurcharge[input.accessDistance];

  // 5. Hazardous Waste / Special Disposal
  let hazardousWasteCost = 0;
  for (const wasteItem of input.hazardousWaste) {
    hazardousWasteCost += customConfig.hazardousWasteFlatFees[wasteItem] ?? 0;
  }

  // 6. Besenreine Endreinigung
  const besenreinCost = input.besenrein
    ? Math.round(input.area * customConfig.besenreinPricePerSquareMeter)
    : 0;

  // 7. Unadjusted Subtotal
  const subtotalRaw = baseAreaCost + floorCost + accessCost + hazardousWasteCost + besenreinCost;

  // 8. Regional Factor by 2-digit PLZ prefix
  const plzPrefix = input.postalCode.slice(0, 2);
  const regionalFactor =
    customConfig.plzRegionalFactors[plzPrefix] ?? customConfig.defaultRegionalFactor;

  const subtotalWithRegion = Math.round(subtotalRaw * regionalFactor);
  const regionalDelta = subtotalWithRegion - subtotalRaw;

  // 9. Minimum Price Check
  const isMinimumPriceApplied = subtotalWithRegion < customConfig.minimumJobPrice;
  const finalRealistic = isMinimumPriceApplied
    ? customConfig.minimumJobPrice
    : subtotalWithRegion;

  // 10. Spread Multipliers (Min / Max Bandwidth)
  const min = isMinimumPriceApplied
    ? customConfig.minimumJobPrice
    : Math.round(finalRealistic * customConfig.spreadFactors.min);

  const max = Math.round(finalRealistic * customConfig.spreadFactors.max);

  return {
    min,
    realistic: finalRealistic,
    max,
    breakdown: {
      baseAreaCost,
      floorCost,
      accessCost,
      hazardousWasteCost,
      besenreinCost,
      subtotalRaw,
      regionalFactor,
      regionalDelta,
      subtotalWithRegion,
      finalRealistic,
      isMinimumPriceApplied,
    },
  };
}

