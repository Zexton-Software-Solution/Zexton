export const regions = {
  US: { code: 'US', label: 'United States', currency: 'USD', locale: 'en-US', rate: 0.02, tax: 'Prices exclude applicable taxes.' },
};

export const regionForCountry = () => 'US';

export const useRegion = () => regions.US;

export const setRegion = () => {};

export const convert = (inrValue, region = regions.US) => {
  if (!inrValue) return 0;
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

// Rewrites any legacy "₹12,999" inside authored copy into USD "$259".
export const localize = (text, region = regions.US) => (typeof text !== 'string'
  ? text
  : text.replace(/₹\s?([\d,]+(?:\.\d+)?)/g, (_, amount) => money(Number(amount.replace(/,/g, '')), region)));
