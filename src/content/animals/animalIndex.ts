import { AnimalIndexItem } from "@/lib/types";

/**
 * Lightweight animal index for the animals listing page
 * Full animal data is stored in individual JSON files
 */
export const animalIndex: AnimalIndexItem[] = [
  {
    slug: "lion",
    name: "Lion",
    type: "Mammal",
    image: "🦁",
    habitat: ["Savanna", "Grassland"],
  },
  {
    slug: "elephant",
    name: "Elephant",
    type: "Mammal",
    image: "🐘",
    habitat: ["Savanna", "Forest"],
  },
  {
    slug: "penguin",
    name: "Penguin",
    type: "Bird",
    image: "🐧",
    habitat: ["Antarctic", "Coastal"],
  },
  {
    slug: "dolphin",
    name: "Dolphin",
    type: "Mammal",
    image: "🐬",
    habitat: ["Ocean"],
  },
  {
    slug: "butterfly",
    name: "Butterfly",
    type: "Insect",
    image: "🦋",
    coverImage: "animals/butterfly/cover.webp",
    habitat: ["Garden", "Forest", "Meadow"],
  },
  {
    slug: "eagle",
    name: "Eagle",
    type: "Bird",
    image: "🦅",
    habitat: ["Mountain", "Forest"],
  },
  {
    slug: "frog",
    name: "Frog",
    type: "Amphibian",
    image: "🐸",
    habitat: ["Pond", "Rainforest"],
  },
  {
    slug: "tiger",
    name: "Tiger",
    type: "Mammal",
    image: "🐯",
    habitat: ["Forest", "Jungle"],
  },
  {
    slug: "giraffe",
    name: "Giraffe",
    type: "Mammal",
    image: "🦒",
    habitat: ["Savanna"],
  },
  {
    slug: "owl",
    name: "Owl",
    type: "Bird",
    image: "🦉",
    habitat: ["Forest", "Desert"],
  },
  {
    slug: "shark",
    name: "Shark",
    type: "Fish",
    image: "🦈",
    habitat: ["Ocean"],
  },
  {
    slug: "bee",
    name: "Bee",
    type: "Insect",
    image: "🐝",
    habitat: ["Garden", "Meadow", "Forest"],
  },
];

/**
 * Get all unique animal types from the index
 */
export const getAnimalTypes = (): string[] => {
  const types = new Set(animalIndex.map((animal) => animal.type));
  return Array.from(types).sort();
};

/**
 * Get animals by type
 */
export const getAnimalsByType = (type: string): AnimalIndexItem[] => {
  return animalIndex.filter((animal) => animal.type === type);
};

/**
 * Get total animal count
 */
export const getTotalAnimalCount = (): number => animalIndex.length;
