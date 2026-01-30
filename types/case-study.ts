// Media types for case studies
export interface CaseMedia {
  // Primary video (YouTube, Vimeo, or self-hosted)
  video?: {
    url: string; // YouTube/Vimeo URL or direct video URL
    thumbnail?: string; // Custom thumbnail image
    title?: string;
    duration?: string; // e.g., "2:45"
  };
  // Image gallery
  images?: {
    src: string;
    alt: string;
    caption?: string;
    type?: "screenshot" | "diagram" | "before-after" | "result";
  }[];
  // Before/After comparison
  beforeAfter?: {
    before: { src: string; label: string };
    after: { src: string; label: string };
  };
}

export interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  heroGradient: string;
  eyebrow: string;
  description: string;
  cardDescription: string;
  challenge: string[];
  solution: {
    intro: string;
    steps: {
      title: string;
      details: string[];
    }[];
    techStack: {
      name: string;
      description?: string;
    }[];
  };
  results: {
    stats: {
      value: string;
      label: string;
    }[];
    quote: {
      text: string;
      author: string;
      role: string;
    };
  };
  takeaways: string[];
  // New media fields
  media?: CaseMedia;
  // Legacy placeholder (kept for backwards compatibility)
  videoPlaceholder: {
    icon: string;
    title: string;
    description: string;
  };
  cta: {
    eyebrow: string;
    headline: string;
    description: string;
  };
  cardMetric: {
    number: string;
    label: string;
  };
  tools: string[];
}

export interface CaseCategory {
  slug: string;
  label: string;
}
