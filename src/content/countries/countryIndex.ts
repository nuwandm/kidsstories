import { CountryIndexItem } from "@/lib/types";

/**
 * Lightweight country index for the countries listing page
 * Full country data is stored in individual JSON files
 */
export const countryIndex: CountryIndexItem[] = [
  {
    slug: "japan",
    name: "Japan",
    continent: "Asia",
    flag: "🇯🇵",
    flagImage: "/images/learn/country/flags/japan.webp",
    capital: "Tokyo",
  },
  {
    slug: "france",
    name: "France",
    continent: "Europe",
    flag: "🇫🇷",
    capital: "Paris",
  },
  {
    slug: "brazil",
    name: "Brazil",
    continent: "South America",
    flag: "🇧🇷",
    capital: "Brasilia",
  },
  {
    slug: "kenya",
    name: "Kenya",
    continent: "Africa",
    flag: "🇰🇪",
    capital: "Nairobi",
  },
  {
    slug: "australia",
    name: "Australia",
    continent: "Oceania",
    flag: "🇦🇺",
    capital: "Canberra",
  },
  {
    slug: "usa",
    name: "United States",
    continent: "North America",
    flag: "🇺🇸",
    capital: "Washington D.C.",
  },
  {
    slug: "india",
    name: "India",
    continent: "Asia",
    flag: "🇮🇳",
    capital: "New Delhi",
  },
  {
    slug: "egypt",
    name: "Egypt",
    continent: "Africa",
    flag: "🇪🇬",
    capital: "Cairo",
  },
  {
    slug: "mexico",
    name: "Mexico",
    continent: "North America",
    flag: "🇲🇽",
    capital: "Mexico City",
  },
  {
    slug: "italy",
    name: "Italy",
    continent: "Europe",
    flag: "🇮🇹",
    capital: "Rome",
  },
];

/**
 * Get all unique continents from the country index
 */
export const getContinents = (): string[] => {
  const continents = new Set(countryIndex.map((country) => country.continent));
  return Array.from(continents).sort();
};

/**
 * Get countries by continent
 */
export const getCountriesByContinent = (continent: string): CountryIndexItem[] => {
  return countryIndex.filter((country) => country.continent === continent);
};

/**
 * Get total country count
 */
export const getTotalCountryCount = (): number => countryIndex.length;
