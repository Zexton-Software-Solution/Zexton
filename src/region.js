import { useSyncExternalStore } from 'react';

// Prices are authored in INR. Other regions use a pricing-parity factor (not the FX rate),
// rounded to charm prices. Add a country by adding one entry here.
export const regions = {
  IN: { code: 'IN', label: 'India', currency: 'INR', locale: 'en-IN', rate: 1, tax: 'Prices exclude 18% GST.' },
  US: { code: 'US', label: 'United States', currency: 'USD', locale: 'en-US', rate: 0.02, tax: 'Prices exclude applicable taxes.' },
  GB: { code: 'GB', label: 'United Kingdom', currency: 'GBP', locale: 'en-GB', rate: 0.016, tax: 'Prices exclude VAT.' },
  EU: { code: 'EU', label: 'Europe', currency: 'EUR', locale: 'en-IE', rate: 0.0185, tax: 'Prices exclude VAT.' },
  AE: { code: 'AE', label: 'UAE', currency: 'AED', locale: 'en-AE', rate: 0.075, tax: 'Prices exclude 5% VAT.' },
};

const EU_COUNTRIES = new Set(['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE']);
const STORAGE_KEY = 'zx-region';

export const regionForCountry = (country = '') => {
  const code = country.toUpperCase();
  if (regions[code]) return code;
  if (EU_COUNTRIES.has(code)) return 'EU';
  return 'US'; // everyone outside a listed region sees USD
};

const regionForTimezone = (zone = '') => {
  if (/^Asia\/(Kolkata|Calcutta)$/.test(zone)) return 'IN';
  if (zone === 'Europe/London') return 'GB';
  if (zone === 'Asia/Dubai') return 'AE';
  if (zone.startsWith('Europe/')) return 'EU';
  return 'US';
};

const detect = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (regions[saved]) return saved;
  } catch { /* storage blocked */ }
  const param = new URLSearchParams(window.location.search).get('region');
  if (param) return regionForCountry(param);
  // Set by server.mjs from the CDN's visitor-country header (Cloudflare, Vercel, CloudFront).
  const cookie = document.cookie.match(/(?:^|; )zx_country=([A-Z]{2})/);
  if (cookie) return regionForCountry(cookie[1]);
  return regionForTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
};

let current = typeof window === 'undefined' ? 'IN' : detect();
const listeners = new Set();

export const setRegion = (code) => {
  if (!regions[code]) return;
  current = code;
  try { localStorage.setItem(STORAGE_KEY, code); } catch { /* storage blocked */ }
  listeners.forEach((listener) => listener());
};

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const useRegion = () => regions[useSyncExternalStore(subscribe, () => current, () => 'IN')];

export const convert = (inrValue, region) => {
  if (region.rate === 1 || !inrValue) return inrValue;
  const value = inrValue * region.rate;
  return value < 100 ? Math.ceil(value) - 0.01 : Math.round(value / 10) * 10 - 1;
};

export const money = (inrValue, region) => {
  const value = convert(inrValue, region);
  return new Intl.NumberFormat(region.locale, {
    style: 'currency',
    currency: region.currency,
    minimumFractionDigits: value % 1 ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(value);
};

// Rewrites "₹12,999" inside authored copy into the visitor's currency.
export const localize = (text, region) => (region.rate === 1 || typeof text !== 'string'
  ? text
  : text.replace(/₹\s?([\d,]+(?:\.\d+)?)/g, (_, amount) => money(Number(amount.replace(/,/g, '')), region)));
