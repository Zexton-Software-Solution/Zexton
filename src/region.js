import { useSyncExternalStore } from 'react';

export const regions = {
  IN: { code: 'IN', label: 'India', currency: 'INR', locale: 'en-IN', rate: 1, tax: 'Prices exclude 18% GST.' },
  US: { code: 'US', label: 'United States', currency: 'USD', locale: 'en-US', rate: 0.02, tax: 'Prices exclude applicable taxes.' },
};

const STORAGE_KEY = 'zx-region';

export const regionForCountry = (country = '') => {
  const code = country.toUpperCase();
  if (regions[code]) return code;
  return 'US';
};

export const detect = () => {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname.toLowerCase();
    // Rule: zexton.co ALWAYS serves INR
    if (host === 'zexton.co' || host.endsWith('.zexton.co')) return 'IN';
    // Rule: zexton.com ALWAYS serves USD
    if (host === 'zexton.com' || host.endsWith('.zexton.com')) return 'US';

    // Support local testing / query param override (?region=IN or ?region=US)
    const param = new URLSearchParams(window.location.search).get('region');
    if (param && regions[param.toUpperCase()]) return param.toUpperCase();

    // Check saved storage or cookie
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (regions[saved]) return saved;
    } catch { /* storage blocked */ }
    const cookie = document.cookie.match(/(?:^|; )zx_country=([A-Z]{2})/);
    if (cookie && regions[cookie[1]]) return cookie[1];
  }
  return 'US';
};

let current = typeof window === 'undefined' ? 'US' : detect();
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

export const useRegion = () => regions[useSyncExternalStore(subscribe, () => current, () => 'US')];

export const convert = (inrValue, region = regions.US) => {
  if (!inrValue) return 0;
  if (region?.rate === 1 || region?.currency === 'INR') return inrValue;
  const value = inrValue * (region?.rate || 0.02);
  return value < 100 ? Math.ceil(value) - 0.01 : Math.round(value / 10) * 10 - 1;
};

export const money = (inrValue, region = regions.US) => {
  const value = convert(inrValue, region);
  return new Intl.NumberFormat(region?.locale || 'en-US', {
    style: 'currency',
    currency: region?.currency || 'USD',
    minimumFractionDigits: value % 1 ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(value);
};

// Rewrites any authored copy into the visitor's currency.
export const localize = (text, region = regions.US) => {
  if (typeof text !== 'string') return text;
  if (region?.currency === 'INR') return text;
  return text.replace(/₹\s?([\d,]+(?:\.\d+)?)/g, (_, amount) => money(Number(amount.replace(/,/g, '')), region));
};
