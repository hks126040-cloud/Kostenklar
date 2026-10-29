export interface LocalDisposalInfo {
  authorityName: string;
  authorityUrl: string;
  freeSperrmuellQuota: string;
  wertstoffhofCount: number;
  tippingFeePerTonne: string;
}

export interface CityData {
  slug: string;
  cityName: string;
  postalCodePrefixes: string[];
  regionalFactor: number;
  averagePricePerSqm: string;
  typicalHousingChallenge: {
    headline: string;
    description: string;
  };
  parkingAndPermits: {
    authority: string;
    costRange: string;
    leadTimeDays: number;
  };
  disposal: LocalDisposalInfo;
  localFaqs: {
    question: string;
    answer: string;
  }[];
}

