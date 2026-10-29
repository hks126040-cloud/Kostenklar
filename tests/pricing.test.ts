import { describe, it, expect } from 'vitest';
import { calculateEntruempelungPrice } from '../lib/pricing';
import { PRICING_CONFIG } from '../lib/pricing-config';

describe('Entrümpelung Pricing Engine', () => {
  it('Scenario 1: calculates 1-room apartment (35m², normal, 2nd floor with elevator in Berlin)', () => {
    const result = calculateEntruempelungPrice({
      area: 35,
      rooms: 1,
      floor: 2,
      hasElevator: true,
      accessDistance: 'direkt',
      fillLevel: 'normal',
      hazardousWaste: [],
      besenrein: true,
      postalCode: '10115', // Berlin: factor 1.12
    });

    expect(result.breakdown.baseAreaCost).toBe(35 * 28);
    expect(result.breakdown.floorCost).toBe(PRICING_CONFIG.floorSurchargeElevatorFlat);
    expect(result.breakdown.regionalFactor).toBe(1.12);
    expect(result.min).toBeLessThan(result.realistic);
    expect(result.max).toBeGreaterThan(result.realistic);
    expect(result.breakdown.isMinimumPriceApplied).toBe(false);
  });

  it('Scenario 2: calculates 3-room apartment without elevator (75m², 4th floor)', () => {
    const result = calculateEntruempelungPrice({
      area: 75,
      rooms: 3,
      floor: 4,
      hasElevator: false,
      accessDistance: 'direkt',
      fillLevel: 'normal',
      hazardousWaste: [],
      besenrein: false,
      postalCode: '50667', // Köln: factor 1.16
    });

    expect(result.breakdown.floorCost).toBe(4 * 45);
    expect(result.breakdown.besenreinCost).toBe(0);
    expect(result.realistic).toBeGreaterThan(2000);
  });

  it('Scenario 3: calculates entire house (160m², normal, multi-level)', () => {
    const result = calculateEntruempelungPrice({
      area: 160,
      rooms: 6,
      floor: 0,
      hasElevator: false,
      accessDistance: 'mittel',
      fillLevel: 'normal',
      hazardousWaste: [],
      besenrein: true,
      postalCode: '30159', // Hannover: factor 1.04
    });

    expect(result.breakdown.baseAreaCost).toBe(160 * 28);
    expect(result.breakdown.accessCost).toBe(60);
    expect(result.realistic).toBeGreaterThan(4000);
  });

  it('Scenario 4: calculates Keller only (15m², stark gefüllt, basement level -1)', () => {
    const result = calculateEntruempelungPrice({
      area: 15,
      rooms: 1,
      floor: -1,
      hasElevator: false,
      accessDistance: 'direkt',
      fillLevel: 'stark',
      hazardousWaste: [],
      besenrein: false,
      postalCode: '90403', // Nürnberg: factor 1.08
    });

    expect(result.breakdown.floorCost).toBe(45);
    expect(result.breakdown.baseAreaCost).toBe(15 * 42);
    expect(result.breakdown.isMinimumPriceApplied).toBe(false);
  });

  it('Scenario 5: calculates Messie apartment with hazardous waste', () => {
    const result = calculateEntruempelungPrice({
      area: 55,
      rooms: 2,
      floor: 3,
      hasElevator: false,
      accessDistance: 'schwer',
      fillLevel: 'messie',
      hazardousWaste: ['farben_lacke', 'altol_chemie'],
      besenrein: true,
      postalCode: '60311', // Frankfurt: factor 1.20
    });

    expect(result.breakdown.baseAreaCost).toBe(55 * 85);
    expect(result.breakdown.accessCost).toBe(140);
    expect(result.breakdown.hazardousWasteCost).toBe(75 + 90);
    expect(result.breakdown.regionalFactor).toBe(1.2);
    expect(result.realistic).toBeGreaterThan(5000);
  });

  it('Scenario 6: triggers minimum price for tiny 5m² room with low fill', () => {
    const result = calculateEntruempelungPrice({
      area: 5,
      rooms: 1,
      floor: 0,
      hasElevator: true,
      accessDistance: 'direkt',
      fillLevel: 'wenig',
      hazardousWaste: [],
      besenrein: false,
      postalCode: '01067', // Dresden: factor 0.90
    });

    expect(result.breakdown.isMinimumPriceApplied).toBe(true);
    expect(result.realistic).toBe(PRICING_CONFIG.minimumJobPrice);
    expect(result.min).toBe(PRICING_CONFIG.minimumJobPrice);
  });

  it('Scenario 7: correctly applies regional differences between Munich (80) and Rural East (03)', () => {
    const baseParams = {
      area: 50,
      rooms: 2,
      floor: 1,
      hasElevator: false,
      accessDistance: 'direkt' as const,
      fillLevel: 'normal' as const,
      hazardousWaste: [],
      besenrein: true,
    };

    const munichResult = calculateEntruempelungPrice({
      ...baseParams,
      postalCode: '80331',
    });

    const cottbusResult = calculateEntruempelungPrice({
      ...baseParams,
      postalCode: '03046',
    });

    expect(munichResult.breakdown.regionalFactor).toBe(1.25);
    expect(cottbusResult.breakdown.regionalFactor).toBe(0.88);
    expect(munichResult.realistic).toBeGreaterThan(cottbusResult.realistic * 1.35);
  });

  it('Scenario 8: falls back to default regional factor for unmatched PLZ prefix', () => {
    const result = calculateEntruempelungPrice({
      area: 60,
      rooms: 2,
      floor: 0,
      hasElevator: false,
      accessDistance: 'direkt',
      fillLevel: 'normal',
      hazardousWaste: [],
      besenrein: false,
      postalCode: '99999',
    });

    expect(result.breakdown.regionalFactor).toBeDefined();
    expect(result.realistic).toBeGreaterThan(0);
  });

  it('Scenario 9: throws ZodError on negative area or invalid PLZ string', () => {
    expect(() => {
      calculateEntruempelungPrice({
        area: -10,
        rooms: 1,
        postalCode: '10115',
      });
    }).toThrow();

    expect(() => {
      calculateEntruempelungPrice({
        area: 50,
        rooms: 1,
        postalCode: 'ABCD',
      });
    }).toThrow();
  });

  it('Scenario 10: guarantees mathematical integrity (min <= realistic <= max)', () => {
    const result = calculateEntruempelungPrice({
      area: 80,
      rooms: 3,
      floor: 2,
      hasElevator: true,
      accessDistance: 'mittel',
      fillLevel: 'stark',
      hazardousWaste: ['elektrogrossgeraete'],
      besenrein: true,
      postalCode: '20095',
    });

    expect(result.min).toBeLessThanOrEqual(result.realistic);
    expect(result.realistic).toBeLessThanOrEqual(result.max);
    expect(result.breakdown.subtotalWithRegion).toBeGreaterThan(0);
  });
});

