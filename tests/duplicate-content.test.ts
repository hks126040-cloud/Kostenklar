import { describe, it, expect } from 'vitest';
import { CITIES_DATA } from '../lib/cities/data';

function getJaccardSimilarity(str1: string, str2: string): number {
  const set1 = new Set(str1.toLowerCase().split(/\s+/));
  const set2 = new Set(str2.toLowerCase().split(/\s+/));

  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  return intersection.size / union.size;
}

describe('Anti-Doorway Page Duplicate Content Audit', () => {
  const cityKeys = Object.keys(CITIES_DATA);

  it('guarantees that all city profiles have unique architectural and logistical descriptions', () => {
    for (let i = 0; i < cityKeys.length; i++) {
      for (let j = i + 1; j < cityKeys.length; j++) {
        const cityA = CITIES_DATA[cityKeys[i]];
        const cityB = CITIES_DATA[cityKeys[j]];

        const textA = `${cityA.typicalHousingChallenge.headline} ${cityA.typicalHousingChallenge.description}`;
        const textB = `${cityB.typicalHousingChallenge.headline} ${cityB.typicalHousingChallenge.description}`;

        const similarity = getJaccardSimilarity(textA, textB);
        expect(similarity).toBeLessThan(0.4);
      }
    }
  });

  it('guarantees that Berlin is indexed with distinct metropolitan specifics', () => {
    const berlin = CITIES_DATA['berlin'];
    expect(berlin.disposal.authorityName).toContain('BSR');
    expect(berlin.typicalHousingChallenge.description).toContain('Quergebäude');
  });
});

