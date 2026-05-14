export const CURRENCIES = {
  USD: { code: "USD", symbol: "$", flag: "🇺🇸", label: "US Dollar", rate: 1 },
  NGN: { code: "NGN", symbol: "₦", flag: "🇳🇬", label: "Nigerian Naira", rate: 1550 },
  GBP: { code: "GBP", symbol: "£", flag: "🇬🇧", label: "British Pound", rate: 0.79 },
  EUR: { code: "EUR", symbol: "€", flag: "🇪🇺", label: "Euro", rate: 0.92 },
};

const COUNTRY_CURRENCY_MAP = {
  NG: "NGN",
  GB: "GBP",
  IE: "GBP",
  US: "USD",
  CA: "USD",
  AU: "USD",
  NZ: "USD",
  FR: "EUR",
  DE: "EUR",
  IT: "EUR",
  ES: "EUR",
  NL: "EUR",
  BE: "EUR",
  AT: "EUR",
  CH: "EUR",
  PT: "EUR",
  GR: "EUR",
  PL: "EUR",
  SE: "EUR",
  DK: "EUR",
  NO: "EUR",
  FI: "EUR",
};

export function getCurrencyFromCountry(countryCode) {
  return COUNTRY_CURRENCY_MAP[countryCode] || "USD";
}

/**
 * @param {number} amountUSD - Price in USD
 * @param {string} currencyCode - Target currency code
 * @param {Object} liveRates - Live rates map { NGN: 1550, GBP: 0.79, ... }
 */
export function formatInCurrency(amountUSD, currencyCode = "USD", liveRates = {}) {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const rate = liveRates[currencyCode] ?? currency.rate;
  const converted = amountUSD * rate;

  if (currencyCode === "NGN") {
    return `₦${Math.round(converted).toLocaleString()}`;
  }

  return `${currency.symbol}${converted.toFixed(2)}`;
}
