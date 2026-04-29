// Dawson Wells Gallery — design concept demo
// Mock data for /proposals/dawson-wells-gallery and /demo
// Aesthetic: high-end contemporary art gallery (white/black/minimal, generous whitespace)

export type ArtworkCategory =
  | "Photography"
  | "Paintings"
  | "Drawings"
  | "Ceramics"
  | "Prints";

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  category: ArtworkCategory;
  medium: string;
  dimensions: string;
  imageUrl: string;
  description?: string;
  featured?: boolean;
}

export interface NewsPost {
  id: string;
  title: string;
  date: string;
  category: "Exhibition" | "Acquisition" | "Artist" | "Gallery";
  excerpt: string;
  imageUrl: string;
}

export interface SitemapNode {
  label: string;
  description: string;
  children?: SitemapNode[];
}

export const categories: ArtworkCategory[] = [
  "Photography",
  "Paintings",
  "Drawings",
  "Ceramics",
  "Prints",
];

const img = (seed: string) =>
  `https://picsum.photos/seed/dwg-${seed}/800/1000`;

export const artworks: Artwork[] = [
  // Photography
  {
    id: "p1",
    title: "Quiet Coast",
    artist: "Mariana Reyes",
    year: 2024,
    category: "Photography",
    medium: "Silver gelatin print",
    dimensions: "60 × 80 cm",
    imageUrl: img("photo-1"),
    description:
      "From a four-month residency on the Atlantic edge. Printed by the artist in a limited edition of seven.",
    featured: true,
  },
  {
    id: "p2",
    title: "After Rain",
    artist: "Henry Tao",
    year: 2023,
    category: "Photography",
    medium: "Archival pigment print",
    dimensions: "70 × 100 cm",
    imageUrl: img("photo-2"),
  },
  {
    id: "p3",
    title: "Subway, 7 AM",
    artist: "Léa Dupont",
    year: 2022,
    category: "Photography",
    medium: "Silver gelatin print",
    dimensions: "50 × 70 cm",
    imageUrl: img("photo-3"),
  },
  {
    id: "p4",
    title: "Glacier Field",
    artist: "Anders Holm",
    year: 2024,
    category: "Photography",
    medium: "Archival pigment print",
    dimensions: "90 × 120 cm",
    imageUrl: img("photo-4"),
  },

  // Paintings
  {
    id: "pn1",
    title: "Untitled Composition No. 14",
    artist: "Olivia Penn",
    year: 2024,
    category: "Paintings",
    medium: "Oil on linen",
    dimensions: "120 × 100 cm",
    imageUrl: img("paint-1"),
    description:
      "Part of the Composition series begun in 2021. The artist's first work to include cobalt as a structural colour.",
    featured: true,
  },
  {
    id: "pn2",
    title: "Window in Lisbon",
    artist: "Pedro Costa",
    year: 2023,
    category: "Paintings",
    medium: "Oil on canvas",
    dimensions: "80 × 100 cm",
    imageUrl: img("paint-2"),
  },
  {
    id: "pn3",
    title: "Red Interior",
    artist: "Sofia Marini",
    year: 2024,
    category: "Paintings",
    medium: "Acrylic on canvas",
    dimensions: "150 × 130 cm",
    imageUrl: img("paint-3"),
  },
  {
    id: "pn4",
    title: "Field Study, March",
    artist: "Jakob Werner",
    year: 2022,
    category: "Paintings",
    medium: "Oil on board",
    dimensions: "40 × 50 cm",
    imageUrl: img("paint-4"),
  },

  // Drawings
  {
    id: "d1",
    title: "Hands at Rest",
    artist: "Mariana Reyes",
    year: 2023,
    category: "Drawings",
    medium: "Graphite on paper",
    dimensions: "35 × 50 cm",
    imageUrl: img("draw-1"),
  },
  {
    id: "d2",
    title: "Garden Plan",
    artist: "Eleanor Voss",
    year: 2024,
    category: "Drawings",
    medium: "Ink and watercolour on paper",
    dimensions: "42 × 60 cm",
    imageUrl: img("draw-2"),
  },
  {
    id: "d3",
    title: "Two Figures",
    artist: "Henry Tao",
    year: 2024,
    category: "Drawings",
    medium: "Charcoal on paper",
    dimensions: "70 × 50 cm",
    imageUrl: img("draw-3"),
  },

  // Ceramics
  {
    id: "c1",
    title: "Earthenware Vessel No. 3",
    artist: "Ines Carvalho",
    year: 2023,
    category: "Ceramics",
    medium: "Hand-thrown earthenware, ash glaze",
    dimensions: "32 × 24 × 24 cm",
    imageUrl: img("ceramic-1"),
    featured: true,
  },
  {
    id: "c2",
    title: "Salt-Fired Bowl",
    artist: "Yuki Tanaka",
    year: 2024,
    category: "Ceramics",
    medium: "Stoneware, salt fired",
    dimensions: "12 × 28 × 28 cm",
    imageUrl: img("ceramic-2"),
  },
  {
    id: "c3",
    title: "Coil Form",
    artist: "Ines Carvalho",
    year: 2024,
    category: "Ceramics",
    medium: "Coiled stoneware, unglazed",
    dimensions: "45 × 30 × 30 cm",
    imageUrl: img("ceramic-3"),
  },

  // Prints
  {
    id: "pr1",
    title: "City Plan",
    artist: "Olivia Penn",
    year: 2023,
    category: "Prints",
    medium: "Screenprint, edition of 30",
    dimensions: "60 × 80 cm",
    imageUrl: img("print-1"),
  },
  {
    id: "pr2",
    title: "Portrait of Light",
    artist: "Anders Holm",
    year: 2024,
    category: "Prints",
    medium: "Etching, edition of 25",
    dimensions: "50 × 70 cm",
    imageUrl: img("print-2"),
  },
  {
    id: "pr3",
    title: "Seven Stones",
    artist: "Eleanor Voss",
    year: 2023,
    category: "Prints",
    medium: "Lithograph, edition of 50",
    dimensions: "45 × 60 cm",
    imageUrl: img("print-3"),
  },
];

export const news: NewsPost[] = [
  {
    id: "n1",
    title: "Spring Exhibition — New Voices in Photography",
    date: "12 April 2026",
    category: "Exhibition",
    excerpt:
      "Five photographers, all working under thirty-five, share the gallery for six weeks. Opening reception 12 April, 7pm. Bar open until late.",
    imageUrl: img("news-1"),
  },
  {
    id: "n2",
    title: "Five new acquisitions from the Tanaka studio",
    date: "28 March 2026",
    category: "Acquisition",
    excerpt:
      "After a long studio visit in Mashiko, we are showing five new salt-fired pieces by Yuki Tanaka. Available from 28 March.",
    imageUrl: img("news-2"),
  },
  {
    id: "n3",
    title: "Artist in conversation: Mariana Reyes",
    date: "15 March 2026",
    category: "Artist",
    excerpt:
      "On her four-month residency at the edge of the Atlantic, why she still prints in the darkroom, and what comes next.",
    imageUrl: img("news-3"),
  },
  {
    id: "n4",
    title: "Summer hours — Tuesday to Saturday",
    date: "1 March 2026",
    category: "Gallery",
    excerpt:
      "From May through August the gallery will be open Tuesday to Saturday, 11am to 6pm. By appointment on Monday.",
    imageUrl: img("news-4"),
  },
];

export const sitemap: SitemapNode[] = [
  {
    label: "Home",
    description:
      "Featured artwork carousel, two-line introduction to the gallery, latest news, and current exhibition card.",
  },
  {
    label: "Artworks",
    description:
      "Browsable grid across all categories, with filters and search. Each piece links to its detail page.",
    children: [
      {
        label: "Photography",
        description: "Filter view — all photographic work, sorted by year or artist.",
      },
      {
        label: "Paintings",
        description: "Filter view — paintings across media (oil, acrylic, mixed).",
      },
      {
        label: "Drawings",
        description: "Filter view — works on paper.",
      },
      {
        label: "Ceramics",
        description: "Filter view — three-dimensional work, with side and detail images.",
      },
      {
        label: "Prints",
        description: "Filter view — editions, with edition number and printer credit.",
      },
    ],
  },
  {
    label: "News",
    description:
      "Exhibition announcements, new acquisitions, artist interviews, gallery updates. Filterable by category.",
  },
  {
    label: "About Us",
    description: "Gallery history, the team, the space, opening hours.",
  },
  {
    label: "Mission & Vision",
    description: "What the gallery stands for and where it is going. Editable as a single page in the CMS.",
  },
  {
    label: "Company Overview",
    description: "Press, partners, exhibition history, downloadable press kit.",
  },
  {
    label: "Contact Us",
    description:
      "Inquiry form (routes to your inbox), gallery address with map, opening hours, social links.",
  },
];

export const galleryInfo = {
  name: "Dawson Wells Gallery",
  tagline: "Modern and Contemporary Art",
  intro:
    "An independent gallery showing photography, paintings, drawings, ceramics, and prints. Built on long relationships with artists, careful selection, and a programme that rewards return visits.",
  mission:
    "To present strong, considered work by contemporary artists — and to make it readable, available, and worth a return visit.",
  vision:
    "A gallery that operates internationally without losing the intimacy of the room. Online inquiries answered the same day. Every piece traceable from studio to wall.",
  hours: "Tuesday – Saturday · 11am – 6pm · Monday by appointment",
  email: "hello@dawsonwellsgallery.com",
};
