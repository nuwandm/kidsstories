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
    flagImage: "/countries/japan/flag.webp",
    capital: "Tokyo",
  },
  {
    slug: "france",
    name: "France",
    continent: "Europe",
    flag: "🇫🇷",
    flagImage: "/countries/france/flag.webp",
    capital: "Paris",
  },
  {
    slug: "brazil",
    name: "Brazil",
    continent: "South America",
    flag: "🇧🇷",
    flagImage: "/countries/brazil/flag.webp",
    capital: "Brasilia",
  },
  {
    slug: "kenya",
    name: "Kenya",
    continent: "Africa",
    flag: "🇰🇪",
    flagImage: "/countries/kenya/flag.webp",
    capital: "Nairobi",
  },
  {
    slug: "australia",
    name: "Australia",
    continent: "Oceania",
    flag: "🇦🇺",
    flagImage: "/countries/australia/flag.webp",
    capital: "Canberra",
  },
  {
    slug: "usa",
    name: "United States",
    continent: "North America",
    flag: "🇺🇸",
    flagImage: "/countries/usa/flag.webp",
    capital: "Washington D.C.",
  },
  {
    slug: "india",
    name: "India",
    continent: "Asia",
    flag: "🇮🇳",
    flagImage: "/countries/india/flag.webp",
    capital: "New Delhi",
  },
  {
    slug: "egypt",
    name: "Egypt",
    continent: "Africa",
    flag: "🇪🇬",
    flagImage: "/countries/egypt/flag.webp",
    capital: "Cairo",
  },
  {
    slug: "mexico",
    name: "Mexico",
    continent: "North America",
    flag: "🇲🇽",
    flagImage: "/countries/mexico/flag.webp",
    capital: "Mexico City",
  },
  {
    slug: "italy",
    name: "Italy",
    continent: "Europe",
    flag: "🇮🇹",
    flagImage: "/countries/italy/flag.webp",
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
