// Centralized product & category data.
// This file is structured so it can later be swapped for an API/database call
// without changing any component code — every component consumes these types.

export type CategoryId =
  | "namkeen"
  | "chips"
  | "traditional"
  | "roasted";

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
  image: string;
  items: string[];
}

export interface ProductSize {
  label: string;
  weight: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategoryId;
  description: string;
  longDescription?: string;
  image: string;
  sizes: string[];
  /** Indicative price (in INR) for the 100g reference size. Used to derive
   * per-size pricing via `sizeMultipliers`. Placeholder pricing structured so
   * it can be swapped for live pricing from a backend/API later. */
  basePrice: number;
  featured?: boolean;
}

/**
 * Multiplier applied to a product's `basePrice` (100g reference) to derive
 * the price of every other pack size. Reflects the typical per-gram discount
 * seen on larger packs. Rounded to the nearest ₹5 for realistic MRP-style
 * pricing — replace with real pricing data when available.
 */
export const sizeMultipliers: Record<string, number> = {
  "20g": 0.32,
  "50g": 0.58,
  "100g": 1,
  "200g": 1.85,
  "500g": 4.2,
  "1kg": 7.8,
};

export const getPriceForSize = (product: Product, size: string): number => {
  const multiplier = sizeMultipliers[size] ?? 1;
  const raw = product.basePrice * multiplier;
  return Math.max(5, Math.round(raw / 5) * 5);
};

export const categories: Category[] = [
  {
    id: "namkeen",
    name: "Namkeen Range",
    tagline: "Crunchy, savoury, everyday favourites.",
    image: "/images/category-namkeen.png",
    items: [
      "Buddha Special Mix",
      "Khatta Meetha Mix",
      "Aloo Bhujia",
      "Navratan Mix",
      "Moong Dal Namkeen",
      "Chana Dal Namkeen",
      "Masala Peanuts",
      "Mixture Namkeen",
    ],
  },
  {
    id: "chips",
    name: "Chips Collection",
    tagline: "Thin, crisp and packed with flavour.",
    image: "/images/category-chips.png",
    items: [
      "Classic Salted Potato Chips",
      "Masala Potato Chips",
      "Cream & Onion Chips",
      "Tomato Tangy Chips",
    ],
  },
  {
    id: "traditional",
    name: "Traditional Indian Snacks",
    tagline: "Recipes passed down through generations.",
    image: "/images/category-traditional.png",
    items: ["Sev", "Gathiya", "Murmura Mix", "Corn Chivda"],
  },
  {
    id: "roasted",
    name: "Roasted & Healthy Snacks",
    tagline: "Lighter bites without compromising on taste.",
    image: "/images/category-roasted.png",
    items: [
      "Roasted Chana",
      "Roasted Peanuts",
      "Multigrain Snack Mix",
    ],
  },
];

export const packSizes: ProductSize[] = [
  { label: "Trial Pack", weight: "20g" },
  { label: "Family Snack Pack", weight: "50g" },
  { label: "Regular Pack", weight: "100g" },
  { label: "Value Pack", weight: "200g" },
  { label: "Family Pack", weight: "500g" },
  { label: "Bulk Pack", weight: "1kg" },
];

const defaultSizes = ["20g", "50g", "100g", "200g", "500g", "1kg"];

export const products: Product[] = [
  {
    slug: "buddha-special-mix",
    name: "Buddha Special Mix",
    category: "namkeen",
    description:
      "A flavorful combination of crunchy ingredients crafted for a delicious everyday snack.",
    image: "/images/product-buddha-mix.png",
    sizes: defaultSizes,
    basePrice: 40,
    featured: true,
  },
  {
    slug: "khatta-meetha-mix",
    name: "Khatta Meetha Mix",
    category: "namkeen",
    description: "A perfect balance of sweet, tangy and savoury flavours.",
    image: "/images/product-khatta-meetha.png",
    sizes: defaultSizes,
    basePrice: 35,
    featured: true,
  },
  {
    slug: "aloo-bhujia",
    name: "Aloo Bhujia",
    category: "namkeen",
    description:
      "Classic crispy sev-style snack with authentic Indian masala flavour.",
    image: "/images/product-aloo-bhujia.png",
    sizes: defaultSizes,
    basePrice: 45,
    featured: true,
  },
  {
    slug: "navratan-mix",
    name: "Navratan Mix",
    category: "namkeen",
    description:
      "Nine delightful ingredients come together in this classic, wholesome namkeen mix.",
    image: "/images/category-namkeen.png",
    sizes: defaultSizes,
    basePrice: 40,
  },
  {
    slug: "moong-dal-namkeen",
    name: "Moong Dal Namkeen",
    category: "namkeen",
    description:
      "Lightly spiced and perfectly crunchy moong dal, roasted to golden perfection.",
    image: "/images/category-namkeen.png",
    sizes: defaultSizes,
    basePrice: 35,
  },
  {
    slug: "chana-dal-namkeen",
    name: "Chana Dal Namkeen",
    category: "namkeen",
    description:
      "Crispy split-gram namkeen with a mild, homely masala touch.",
    image: "/images/category-namkeen.png",
    sizes: defaultSizes,
    basePrice: 35,
  },
  {
    slug: "masala-peanuts",
    name: "Masala Peanuts",
    category: "namkeen",
    description:
      "Crunchy roasted peanuts with a delicious spicy masala coating.",
    image: "/images/product-masala-peanuts.png",
    sizes: defaultSizes,
    basePrice: 45,
    featured: true,
  },
  {
    slug: "mixture-namkeen",
    name: "Mixture Namkeen",
    category: "namkeen",
    description:
      "Our signature blend of sev, dal, peanuts and spices — a snack box favourite.",
    image: "/images/category-namkeen.png",
    sizes: defaultSizes,
    basePrice: 35,
  },
  {
    slug: "classic-salted-potato-chips",
    name: "Classic Salted Potato Chips",
    category: "chips",
    description:
      "Thin, crispy potato chips finished with a simple, satisfying touch of salt.",
    image: "/images/category-chips.png",
    sizes: defaultSizes,
    basePrice: 30,
  },
  {
    slug: "masala-potato-chips",
    name: "Masala Potato Chips",
    category: "chips",
    description:
      "Golden potato chips tossed in a bold, tangy Indian masala blend.",
    image: "/images/category-chips.png",
    sizes: defaultSizes,
    basePrice: 35,
  },
  {
    slug: "cream-and-onion-chips",
    name: "Cream & Onion Chips",
    category: "chips",
    description: "A cool, creamy onion flavour layered over crunchy chips.",
    image: "/images/category-chips.png",
    sizes: defaultSizes,
    basePrice: 35,
  },
  {
    slug: "tomato-tangy-chips",
    name: "Tomato Tangy Chips",
    category: "chips",
    description: "Zesty tomato-seasoned chips with a tangy finish in every bite.",
    image: "/images/category-chips.png",
    sizes: defaultSizes,
    basePrice: 35,
  },
  {
    slug: "sev",
    name: "Sev",
    category: "traditional",
    description:
      "Fine, crispy gram-flour strands — a timeless staple of Indian snacking.",
    image: "/images/category-traditional.png",
    sizes: defaultSizes,
    basePrice: 35,
  },
  {
    slug: "gathiya",
    name: "Gathiya",
    category: "traditional",
    description:
      "Thick, savoury gram-flour sticks made using a traditional recipe.",
    image: "/images/category-traditional.png",
    sizes: defaultSizes,
    basePrice: 35,
  },
  {
    slug: "murmura-mix",
    name: "Murmura Mix",
    category: "traditional",
    description:
      "Light, puffed rice mixed with peanuts, sev and spices for a breezy snack.",
    image: "/images/category-traditional.png",
    sizes: defaultSizes,
    basePrice: 30,
  },
  {
    slug: "corn-chivda",
    name: "Corn Chivda",
    category: "traditional",
    description:
      "Crunchy corn flakes tossed with peanuts, curry leaves and mild spice.",
    image: "/images/category-traditional.png",
    sizes: defaultSizes,
    basePrice: 35,
  },
  {
    slug: "roasted-chana",
    name: "Roasted Chana",
    category: "roasted",
    description:
      "Wholesome roasted chickpeas — a protein-rich, guilt-free snacking option.",
    image: "/images/category-roasted.png",
    sizes: defaultSizes,
    basePrice: 30,
  },
  {
    slug: "roasted-peanuts",
    name: "Roasted Peanuts",
    category: "roasted",
    description:
      "Simply roasted peanuts, kept light on oil and big on crunch.",
    image: "/images/category-roasted.png",
    sizes: defaultSizes,
    basePrice: 40,
  },
  {
    slug: "multigrain-snack-mix",
    name: "Multigrain Snack Mix",
    category: "roasted",
    description:
      "A wholesome mix of roasted grains and lentils for a healthier everyday bite.",
    image: "/images/category-roasted.png",
    sizes: defaultSizes,
    basePrice: 45,
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getCategoryById = (id: CategoryId) =>
  categories.find((c) => c.id === id);

export const featuredProducts = products.filter((p) => p.featured);
