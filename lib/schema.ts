import { z } from 'zod';

export const FillLevelEnum = z.enum(['wenig', 'normal', 'stark', 'messie']);
export type FillLevel = z.infer<typeof FillLevelEnum>;

export const AccessDistanceEnum = z.enum(['direkt', 'mittel', 'schwer']);
export type AccessDistance = z.infer<typeof AccessDistanceEnum>;

export const HazardousWasteItemEnum = z.enum([
  'farben_lacke',
  'altol_chemie',
  'asbest_mineralwolle',
  'autoreifen',
  'elektrogrossgeraete',
]);
export type HazardousWasteItem = z.infer<typeof HazardousWasteItemEnum>;

export const CalculatorInputSchema = z.object({
  // Wohnfläche in Quadratmetern (m²)
  area: z
    .number()
    .min(5, 'Mindestfläche beträgt 5 m².')
    .max(1000, 'Fläche darf maximal 1000 m² betragen.'),

  // Zimmeranzahl
  rooms: z
    .number()
    .int('Zimmeranzahl muss eine ganze Zahl sein.')
    .min(1, 'Mindestens 1 Zimmer angeben.')
    .max(25, 'Maximal 25 Zimmer erlaubt.')
    .default(1),

  // Etage: Keller = -1, EG = 0, 1. OG = 1, etc.
  floor: z
    .number()
    .int()
    .min(-2, 'Tiefgarage/Keller max. 2. UG (-2).')
    .max(30, 'Maximal 30. Stockwerk.')
    .default(0),

  // Fahrstuhl / Lastenaufzug vorhanden und nutzbar
  hasElevator: z.boolean().default(false),

  // Zugangsweg / Parkplatzsituation für Lkw/Transporter
  accessDistance: AccessDistanceEnum.default('direkt'),

  // Füllgrad des Objekts
  fillLevel: FillLevelEnum.default('normal'),

  // Ausgewählte Sondermüll-Kategorien
  hazardousWaste: z.array(HazardousWasteItemEnum).default([]),

  // Wunsch nach besenreiner Übergabe
  besenrein: z.boolean().default(true),

  // Deutsche Postleitzahl (5 Ziffern)
  postalCode: z
    .string()
    .regex(/^[0-9]{5}$/, 'Bitte eine gültige 5-stellige deutsche PLZ eingeben.')
    .default('10115'),
});

export type CalculatorInput = z.infer<typeof CalculatorInputSchema>;
