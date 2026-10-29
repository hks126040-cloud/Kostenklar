'use client';

import React, { useReducer, useEffect } from 'react';
import { calculateEntruempelungPrice, PricingResult } from '@/lib/pricing';
import { CalculatorInput, FillLevel, AccessDistance, HazardousWasteItem } from '@/lib/schema';
import { ResultRange } from './ResultRange';

type WizardState = {
  step: number; // 0 to 4 (questions), 5 (result)
  input: CalculatorInput;
  result: PricingResult | null;
  error: string | null;
};

type WizardAction =
  | { type: 'SET_AREA_AND_ROOMS'; area: number; rooms: number }
  | { type: 'SET_FLOOR_ACCESS'; floor: number; hasElevator: boolean; accessDistance: AccessDistance }
  | { type: 'SET_FILL_LEVEL'; fillLevel: FillLevel }
  | { type: 'SET_EXTRAS'; besenrein: boolean; hazardousWaste: HazardousWasteItem[] }
  | { type: 'SET_POSTAL_CODE'; postalCode: string }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; step: number }
  | { type: 'CALCULATE' }
  | { type: 'RESET' }
  | { type: 'LOAD_FROM_PARAMS'; input: Partial<CalculatorInput> };

const initialInput: CalculatorInput = {
  area: 60,
  rooms: 2,
  floor: 1,
  hasElevator: false,
  accessDistance: 'direkt',
  fillLevel: 'normal',
  hazardousWaste: [],
  besenrein: true,
  postalCode: '10115',
};

const initialState: WizardState = {
  step: 0,
  input: initialInput,
  result: null,
  error: null,
};

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'SET_AREA_AND_ROOMS':
      return {
        ...state,
        input: { ...state.input, area: action.area, rooms: action.rooms },
        step: 1,
        error: null,
      };
    case 'SET_FLOOR_ACCESS':
      return {
        ...state,
        input: {
          ...state.input,
          floor: action.floor,
          hasElevator: action.hasElevator,
          accessDistance: action.accessDistance,
        },
        step: 2,
        error: null,
      };
    case 'SET_FILL_LEVEL':
      return {
        ...state,
        input: { ...state.input, fillLevel: action.fillLevel },
        step: 3,
        error: null,
      };
    case 'SET_EXTRAS':
      return {
        ...state,
        input: {
          ...state.input,
          besenrein: action.besenrein,
          hazardousWaste: action.hazardousWaste,
        },
        step: 4,
        error: null,
      };
    case 'SET_POSTAL_CODE': {
      const updatedInput = { ...state.input, postalCode: action.postalCode };
      try {
        const calculatedResult = calculateEntruempelungPrice(updatedInput);
        return {
          ...state,
          input: updatedInput,
          result: calculatedResult,
          step: 5,
          error: null,
        };
      } catch (err: any) {
        return { ...state, error: err.message || 'Ungültige Postleitzahl' };
      }
    }
    case 'PREV_STEP':
      return {
        ...state,
        step: Math.max(0, state.step - 1),
        error: null,
      };
    case 'GO_TO_STEP':
      return {
        ...state,
        step: action.step,
        error: null,
      };
    case 'RESET':
      return initialState;
    case 'LOAD_FROM_PARAMS': {
      const mergedInput = { ...state.input, ...action.input };
      try {
        const calculatedResult = calculateEntruempelungPrice(mergedInput);
        return {
          ...state,
          input: mergedInput,
          result: calculatedResult,
          step: 5,
          error: null,
        };
      } catch {
        return { ...state, input: mergedInput };
      }
    }
    default:
      return state;
  }
}

export function CalculatorWizard() {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

  // Load from URL search params on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const area = params.get('flaeche');
    const rooms = params.get('zimmer');
    const floor = params.get('etage');
    const aufzug = params.get('aufzug');
    const fill = params.get('fuellgrad') as FillLevel | null;
    const plz = params.get('plz');

    if (area || plz) {
      dispatch({
        type: 'LOAD_FROM_PARAMS',
        input: {
          ...(area ? { area: Number(area) } : {}),
          ...(rooms ? { rooms: Number(rooms) } : {}),
          ...(floor ? { floor: Number(floor) } : {}),
          ...(aufzug ? { hasElevator: aufzug === '1' || aufzug === 'true' } : {}),
          ...(fill ? { fillLevel: fill } : {}),
          ...(plz ? { postalCode: plz } : {}),
        },
      });
    }
  }, []);

  // Sync state to URL search params when in result view
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (state.step === 5 && state.result) {
      const params = new URLSearchParams();
      params.set('flaeche', String(state.input.area));
      params.set('zimmer', String(state.input.rooms));
      params.set('etage', String(state.input.floor));
      params.set('aufzug', String(state.input.hasElevator));
      params.set('fuellgrad', state.input.fillLevel);
      params.set('plz', state.input.postalCode);
      const newUrl = `${window.location.pathname}?${params.toString()}#rechner`;
      window.history.replaceState({}, '', newUrl);
    }
  }, [state.step, state.result, state.input]);

  const totalSteps = 5; // 0 to 4
  const progressPercent = state.step >= 5 ? 100 : Math.round(((state.step + 1) / totalSteps) * 100);

  return (
    <div className="mx-auto max-w-2xl rounded-2xl sm:rounded-3xl border border-brand-line bg-white p-4 sm:p-8 shadow-xl dark:border-brand-darkLine dark:bg-brand-ink">
      {/* Step Header & Progress Indicator */}
      {state.step < 5 && (
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-body-slate dark:text-gray-400 mb-2">
            <span>Schritt {state.step + 1} von {totalSteps}</span>
            <span>{progressPercent}% abgeschlossen</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-brand-line dark:bg-brand-darkLine">
            <div
              className="h-full bg-brand transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* STEP 0: Area & Rooms */}
      {state.step === 0 && (
        <div className="space-y-6">
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-brand-ink dark:text-white sm:text-2xl">
              Wie groß ist das zu entrümpelnde Objekt?
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-body-slate dark:text-gray-400">
              Geben Sie die ungefähre Quadratmeterzahl der Wohn- bzw. Nutzfläche an.
            </p>
          </div>

          <div>
            <label htmlFor="area-input" className="block text-xs font-medium text-body-slate dark:text-gray-300 mb-2">
              Wohnfläche in m²
            </label>
            <div className="relative">
              <input
                id="area-input"
                type="number"
                min={5}
                max={1000}
                value={state.input.area}
                onChange={(e) =>
                  dispatch({
                    type: 'SET_AREA_AND_ROOMS',
                    area: Math.max(5, Number(e.target.value) || 5),
                    rooms: state.input.rooms,
                  })
                }
                className="w-full rounded-xl border border-brand-line bg-brand-soft px-4 py-3.5 text-lg font-bold text-brand-ink focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-brand-darkLine dark:bg-brand-ink/50 dark:text-white"
              />
              <span className="absolute right-4 top-3.5 text-base font-medium text-gray-500">m²</span>
            </div>

            {/* Quick preset chips */}
            <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
              {[25, 45, 65, 85, 120, 160].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: 'SET_AREA_AND_ROOMS',
                      area: preset,
                      rooms: preset < 40 ? 1 : preset < 70 ? 2 : preset < 100 ? 3 : 5,
                    })
                  }
                  className={`rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-xs font-medium transition-all ${
                    state.input.area === preset
                      ? 'bg-brand text-white shadow-sm'
                      : 'border border-brand-line bg-white text-body-slate hover:border-brand dark:border-brand-darkLine dark:bg-brand-ink dark:text-gray-300'
                  }`}
                >
                  {preset} m²
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-body-slate dark:text-gray-300 mb-2">
              Zimmeranzahl
            </label>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {[1, 2, 3, 4, 5].map((rm) => (
                <button
                  key={rm}
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: 'SET_AREA_AND_ROOMS',
                      area: state.input.area,
                      rooms: rm,
                    })
                  }
                  className={`rounded-xl py-2.5 sm:py-3 text-center text-xs sm:text-sm font-bold transition-all ${
                    state.input.rooms === rm
                      ? 'border-2 border-brand bg-brand-soft text-brand dark:bg-brand/20 dark:text-white'
                      : 'border border-brand-line bg-white text-body-slate hover:border-brand dark:border-brand-darkLine dark:bg-brand-ink dark:text-gray-300'
                  }`}
                >
                  {rm === 5 ? '5+' : rm} {rm === 1 ? 'Zi.' : 'Zi.'}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => dispatch({ type: 'GO_TO_STEP', step: 1 })}
            className="w-full rounded-xl bg-cta py-3 sm:py-3.5 text-sm sm:text-base font-bold text-white shadow-md transition-all hover:bg-cta-hover"
          >
            Weiter zu Etage & Aufzug →
          </button>
        </div>
      )}

      {/* STEP 1: Floor, Elevator & Access */}
      {state.step === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-brand-ink dark:text-white sm:text-2xl">
              Stockwerk & Zugangssituation
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-body-slate dark:text-gray-400">
              Der Trageaufwand beeinflusst die benötigten Arbeitsstunden des Teams maßgeblich.
            </p>
          </div>

          {/* Floor selection */}
          <div>
            <label className="block text-xs font-medium text-body-slate dark:text-gray-300 mb-2">
              In welchem Stockwerk liegt das Objekt?
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2">
              {[
                { val: -1, label: 'Keller' },
                { val: 0, label: 'EG' },
                { val: 1, label: '1. OG' },
                { val: 2, label: '2. OG' },
                { val: 3, label: '3. OG' },
                { val: 4, label: '4. OG+' },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: 'SET_FLOOR_ACCESS',
                      floor: item.val,
                      hasElevator: state.input.hasElevator,
                      accessDistance: state.input.accessDistance,
                    })
                  }
                  className={`rounded-xl py-2.5 sm:py-3 text-center text-xs sm:text-sm font-bold transition-all ${
                    state.input.floor === item.val
                      ? 'border-2 border-brand bg-brand-soft text-brand dark:bg-brand/20 dark:text-white'
                      : 'border border-brand-line bg-white text-body-slate hover:border-brand dark:border-brand-darkLine dark:bg-brand-ink dark:text-gray-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Elevator toggle */}
          <div>
            <label className="block text-xs font-medium text-body-slate dark:text-gray-300 mb-2">
              Ist ein nutzbarer Fahrstuhl vorhanden?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: 'SET_FLOOR_ACCESS',
                    floor: state.input.floor,
                    hasElevator: true,
                    accessDistance: state.input.accessDistance,
                  })
                }
                className={`rounded-xl p-3 text-center text-sm font-bold transition-all ${
                  state.input.hasElevator
                    ? 'border-2 border-brand bg-brand-soft text-brand dark:bg-brand/20 dark:text-white'
                    : 'border border-brand-line bg-white text-body-slate hover:border-brand dark:border-brand-darkLine dark:bg-brand-ink dark:text-gray-300'
                }`}
              >
                ✓ Ja, Aufzug nutzbar
              </button>
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: 'SET_FLOOR_ACCESS',
                    floor: state.input.floor,
                    hasElevator: false,
                    accessDistance: state.input.accessDistance,
                  })
                }
                className={`rounded-xl p-3 text-center text-sm font-bold transition-all ${
                  !state.input.hasElevator
                    ? 'border-2 border-brand bg-brand-soft text-brand dark:bg-brand/20 dark:text-white'
                    : 'border border-brand-line bg-white text-body-slate hover:border-brand dark:border-brand-darkLine dark:bg-brand-ink dark:text-gray-300'
                }`}
              >
                ✗ Nein, nur Treppe
              </button>
            </div>
          </div>

          {/* Access Distance */}
          <div>
            <label className="block text-xs font-medium text-body-slate dark:text-gray-300 mb-2">
              Parksituation für Lkw vor dem Gebäude
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { key: 'direkt', title: 'Direkt (< 10m)', sub: 'Vor der Haustür' },
                { key: 'mittel', title: 'Mittel (15–30m)', sub: 'Kurzer Gehweg' },
                { key: 'schwer', title: 'Schwierig (> 30m)', sub: 'Hinterhof / Fußgängerzone' },
              ].map((acc) => (
                <button
                  key={acc.key}
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: 'SET_FLOOR_ACCESS',
                      floor: state.input.floor,
                      hasElevator: state.input.hasElevator,
                      accessDistance: acc.key as AccessDistance,
                    })
                  }
                  className={`rounded-xl p-3 text-left transition-all ${
                    state.input.accessDistance === acc.key
                      ? 'border-2 border-brand bg-brand-soft text-brand dark:bg-brand/20 dark:text-white'
                      : 'border border-brand-line bg-white text-body-slate hover:border-brand dark:border-brand-darkLine dark:bg-brand-ink dark:text-gray-300'
                  }`}
                >
                  <span className="block text-xs font-bold">{acc.title}</span>
                  <span className="block text-[11px] text-gray-500 dark:text-gray-400">{acc.sub}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => dispatch({ type: 'PREV_STEP' })}
              className="w-1/3 rounded-xl border border-brand-line py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-body-slate dark:border-brand-darkLine dark:text-gray-300"
            >
              ← Zurück
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: 'GO_TO_STEP', step: 2 })}
              className="w-2/3 rounded-xl bg-cta py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-cta-hover whitespace-nowrap"
            >
              Weiter zum Füllgrad →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Fill Level (SVG Cards) */}
      {state.step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-brand-ink dark:text-white sm:text-2xl">
              Wie voll ist das Objekt? (Füllgrad)
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-body-slate dark:text-gray-400">
              Wählen Sie den Einrichtungszustand, der Ihrer Situation am nächsten kommt.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Level: Wenig */}
            <button
              type="button"
              onClick={() => dispatch({ type: 'SET_FILL_LEVEL', fillLevel: 'wenig' })}
              className={`rounded-2xl p-4 text-left transition-all ${
                state.input.fillLevel === 'wenig'
                  ? 'border-2 border-brand bg-brand-soft shadow-sm dark:bg-brand/20 dark:border-brand'
                  : 'border border-brand-line bg-white hover:border-brand dark:border-brand-darkLine dark:bg-brand-ink'
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-brand dark:bg-blue-900/40 mb-3">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-brand-ink dark:text-white">Wenig / Spärlich</h3>
              <p className="mt-1 text-xs text-body-slate dark:text-gray-400 leading-normal">
                Wenige Restmöbel, Schränke bereits geleert, kein Schüttmüll.
              </p>
            </button>

            {/* Level: Normal */}
            <button
              type="button"
              onClick={() => dispatch({ type: 'SET_FILL_LEVEL', fillLevel: 'normal' })}
              className={`rounded-2xl p-4 text-left transition-all ${
                state.input.fillLevel === 'normal'
                  ? 'border-2 border-brand bg-brand-soft shadow-sm dark:bg-brand/20 dark:border-brand'
                  : 'border border-brand-line bg-white hover:border-brand dark:border-brand-darkLine dark:bg-brand-ink'
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-brand dark:bg-blue-900/40 mb-3">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-brand-ink dark:text-white">Normal bewohnt</h3>
              <p className="mt-1 text-xs text-body-slate dark:text-gray-400 leading-normal">
                Klassischer Haushalt: Schränke mit Inhalt, Sofa, Betten, Haushaltswaren.
              </p>
            </button>

            {/* Level: Stark */}
            <button
              type="button"
              onClick={() => dispatch({ type: 'SET_FILL_LEVEL', fillLevel: 'stark' })}
              className={`rounded-2xl p-4 text-left transition-all ${
                state.input.fillLevel === 'stark'
                  ? 'border-2 border-brand bg-brand-soft shadow-sm dark:bg-brand/20 dark:border-brand'
                  : 'border border-brand-line bg-white hover:border-brand dark:border-brand-darkLine dark:bg-brand-ink'
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-brand dark:bg-blue-900/40 mb-3">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-brand-ink dark:text-white">Sehr voll / Stark</h3>
              <p className="mt-1 text-xs text-body-slate dark:text-gray-400 leading-normal">
                Vollgestellt bis unter die Decke, viele Kartons, Keller & Dachboden voll.
              </p>
            </button>
          </div>

          {/* Separate Messie Option */}
          <div className="rounded-xl border border-red-200 bg-red-50/60 p-4 dark:border-red-900/50 dark:bg-red-950/20">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="messie-toggle"
                checked={state.input.fillLevel === 'messie'}
                onChange={() => dispatch({ type: 'SET_FILL_LEVEL', fillLevel: 'messie' })}
                className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500"
              />
              <div>
                <span className="text-xs font-bold text-red-900 dark:text-red-300">
                  ⚠️ Extremfall: Messie-Zustand / Hohe Verunreinigung
                </span>
                <p className="mt-0.5 text-xs text-red-700 dark:text-red-400">
                  Gänge verstellt, starke Müllablagerungen, Geruchsbildung oder Schädlingsbefall (erfordert Schutzbekleidung).
                </p>
              </div>
            </label>
          </div>

          <div className="flex gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => dispatch({ type: 'PREV_STEP' })}
              className="w-1/3 rounded-xl border border-brand-line py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-body-slate dark:border-brand-darkLine dark:text-gray-300"
            >
              ← Zurück
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: 'GO_TO_STEP', step: 3 })}
              className="w-2/3 rounded-xl bg-cta py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-cta-hover whitespace-nowrap"
            >
              Weiter zu Extras →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Extras & Hazardous Waste */}
      {state.step === 3 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-brand-ink dark:text-white sm:text-2xl">
              Zusatzleistungen & Problemstoffe
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-body-slate dark:text-gray-400">
              Geben Sie an, ob besenrein übergeben werden soll und ob Sondermüll anfällt.
            </p>
          </div>

          {/* Besenrein Toggle */}
          <div className="rounded-xl border border-brand-line p-4 dark:border-brand-darkLine bg-white dark:bg-brand-ink">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-sm font-bold text-brand-ink dark:text-white">
                  Besenreine Endreinigung gewünscht
                </span>
                <span className="block text-xs text-body-slate dark:text-gray-400 mt-0.5">
                  Gründliches Auskehren, Entfernung von Spinnweben & Grobreinigung.
                </span>
              </div>
              <input
                type="checkbox"
                checked={state.input.besenrein}
                onChange={(e) =>
                  dispatch({
                    type: 'SET_EXTRAS',
                    besenrein: e.target.checked,
                    hazardousWaste: state.input.hazardousWaste,
                  })
                }
                className="h-5 w-5 rounded border-gray-300 text-brand focus:ring-brand"
              />
            </label>
          </div>

          {/* Hazardous Waste checkboxes */}
          <div>
            <label className="block text-xs font-medium text-body-slate dark:text-gray-300 mb-2">
              Fallen besondere Abfallarten an? (Sondermüll)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { id: 'farben_lacke', label: 'Farben, Lacke & Chemikalien' },
                { id: 'altol_chemie', label: 'Altöl, Benzin & Autobatterien' },
                { id: 'elektrogrossgeraete', label: 'Elektrogroßgeräte (Kühlschränke etc.)' },
                { id: 'autoreifen', label: 'Altreifen (mit/ohne Felgen)' },
                { id: 'asbest_mineralwolle', label: 'Asbestverdacht / alte Glaswolle' },
              ].map((item) => {
                const isSelected = state.input.hazardousWaste.includes(item.id as HazardousWasteItem);
                return (
                  <label
                    key={item.id}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'border-brand bg-brand-soft font-semibold text-brand dark:bg-brand/20 dark:text-white'
                        : 'border-brand-line bg-white text-body-slate dark:border-brand-darkLine dark:bg-brand-ink dark:text-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...state.input.hazardousWaste, item.id as HazardousWasteItem]
                          : state.input.hazardousWaste.filter((w) => w !== item.id);
                        dispatch({
                          type: 'SET_EXTRAS',
                          besenrein: state.input.besenrein,
                          hazardousWaste: updated,
                        });
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
                    />
                    <span>{item.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => dispatch({ type: 'PREV_STEP' })}
              className="w-1/3 rounded-xl border border-brand-line py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-body-slate dark:border-brand-darkLine dark:text-gray-300"
            >
              ← Zurück
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: 'GO_TO_STEP', step: 4 })}
              className="w-2/3 rounded-xl bg-cta py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-cta-hover whitespace-nowrap"
            >
              Weiter zur PLZ →
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Postal Code (PLZ) */}
      {state.step === 4 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-brand-ink dark:text-white sm:text-2xl">
              Wo befindet sich das Objekt? (PLZ)
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-body-slate dark:text-gray-400">
              Über die Postleitzahl wird der regionale Lohn- und Deponiekostenfaktor berücksichtigt.
            </p>
          </div>

          <div>
            <label htmlFor="plz-input" className="block text-xs font-medium text-body-slate dark:text-gray-300 mb-2">
              Deutsche Postleitzahl (5 Ziffern)
            </label>
            <input
              id="plz-input"
              type="text"
              pattern="[0-9]{5}"
              maxLength={5}
              placeholder="z. B. 10115 oder 50667"
              value={state.input.postalCode}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 5);
                dispatch({
                  type: 'LOAD_FROM_PARAMS',
                  input: { postalCode: val },
                });
              }}
              className="w-full rounded-xl border border-brand-line bg-brand-soft px-4 py-3.5 text-xl font-bold tracking-widest text-brand-ink focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-brand-darkLine dark:bg-brand-ink/50 dark:text-white"
            />
            {state.error && (
              <p className="mt-2 text-xs text-red-600 dark:text-red-400">{state.error}</p>
            )}
            <p className="mt-2 text-xs text-gray-500">
              Beispiele: 10115 (Berlin), 50667 (Köln), 80331 (München), 60311 (Frankfurt)
            </p>
          </div>

          <div className="flex gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => dispatch({ type: 'PREV_STEP' })}
              className="w-1/3 rounded-xl border border-brand-line py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-body-slate dark:border-brand-darkLine dark:text-gray-300"
            >
              ← Zurück
            </button>
            <button
              type="button"
              disabled={state.input.postalCode.length !== 5}
              onClick={() => dispatch({ type: 'SET_POSTAL_CODE', postalCode: state.input.postalCode })}
              className="w-2/3 rounded-xl bg-cta py-2.5 sm:py-3.5 text-xs sm:text-base font-bold text-white shadow-md hover:bg-cta-hover disabled:opacity-50 whitespace-nowrap"
            >
              Ergebnis berechnen 🎉
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Result Screen */}
      {state.step === 5 && state.result && (
        <ResultRange
          input={state.input}
          result={state.result}
          onReset={() => dispatch({ type: 'RESET' })}
          onEditStep={(stepIdx) => dispatch({ type: 'GO_TO_STEP', step: stepIdx })}
        />
      )}
    </div>
  );
}

