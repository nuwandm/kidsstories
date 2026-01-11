import { FamousPersonIndexItem } from "@/lib/types";

/**
 * Lightweight famous people index for the listing page
 * Full person data is stored in individual JSON files
 */
export const peopleIndex: FamousPersonIndexItem[] = [
  {
    slug: "marie-curie",
    name: "Marie Curie",
    title: "Scientist",
    portrait: "👩‍🔬",
    category: "Scientist",
    famousFor: "Discovered radioactivity",
  },
  {
    slug: "albert-einstein",
    name: "Albert Einstein",
    title: "Physicist",
    portrait: "👨‍🔬",
    profileImage: "FamousPersons/albert-einstein/profile.webp",
    category: "Scientist",
    famousFor: "Theory of Relativity",
  },
  {
    slug: "leonardo-da-vinci",
    name: "Leonardo da Vinci",
    title: "Artist & Inventor",
    portrait: "🎨",
    category: "Artist",
    famousFor: "Painted the Mona Lisa",
  },
  {
    slug: "neil-armstrong",
    name: "Neil Armstrong",
    title: "Astronaut",
    portrait: "🧑‍🚀",
    category: "Explorer",
    famousFor: "First person on the Moon",
  },
  {
    slug: "jane-goodall",
    name: "Jane Goodall",
    title: "Primatologist",
    portrait: "👩‍🔬",
    category: "Scientist",
    famousFor: "Studied chimpanzees",
  },
  {
    slug: "thomas-edison",
    name: "Thomas Edison",
    title: "Inventor",
    portrait: "💡",
    category: "Inventor",
    famousFor: "Invented the light bulb",
  },
  {
    slug: "vincent-van-gogh",
    name: "Vincent van Gogh",
    title: "Artist",
    portrait: "🎨",
    category: "Artist",
    famousFor: "Painted Starry Night",
  },
  {
    slug: "mozart",
    name: "Wolfgang Amadeus Mozart",
    title: "Composer",
    portrait: "🎹",
    category: "Artist",
    famousFor: "Composed beautiful music",
  },
];

/**
 * Get all unique categories from the people index
 */
export const getCategories = (): string[] => {
  const categories = new Set(peopleIndex.map((person) => person.category));
  return Array.from(categories).sort();
};

/**
 * Get people by category
 */
export const getPeopleByCategory = (category: string): FamousPersonIndexItem[] => {
  return peopleIndex.filter((person) => person.category === category);
};

/**
 * Get total people count
 */
export const getTotalPeopleCount = (): number => peopleIndex.length;
