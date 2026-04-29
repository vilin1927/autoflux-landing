"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import {
  ArrowRight,
  Search,
  Plus,
  Image as ImageIcon,
  FileText,
  Newspaper,
  Settings,
  Check,
  Calendar,
  Globe,
  ChevronRight,
  X,
  Upload,
  Crop,
  Eye,
  Lock,
} from "lucide-react";
import {
  artworks,
  news,
  categories,
  sitemap,
  galleryInfo,
  type ArtworkCategory,
  type Artwork,
} from "@/data/proposals/dawson-wells-gallery";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playfair",
});

const sections = [
  { id: "preview", label: "The website", locked: false },
  { id: "artworks", label: "Artworks page", locked: true },
  { id: "piece", label: "A single piece", locked: true },
  { id: "news", label: "News", locked: true },
  { id: "pages", label: "The rest", locked: true },
  { id: "sitemap", label: "Structure", locked: true },
  { id: "cms", label: "Behind the scenes", locked: false },
  { id: "stack", label: "How it's built", locked: true },
];

export default function DawsonWellsDemoPage() {
  return (
    <main
      className={`${playfair.variable} min-h-screen bg-white text-[#0A0A0A]`}
    >
      <Header />
      <Hero />
      <SectionNav />
      <HomepagePreview />
      <LockedSection
        id="artworks"
        index="03"
        title="The artworks page"
        tease="Browsable grid with category filter — Photography, Paintings, Drawings, Ceramics, Prints. Designed for the full hundred pieces."
      />
      <LockedSection
        id="piece"
        index="04"
        title="A single piece"
        tease="Each artwork has its own page — full image, artist, medium, dimensions, and an inquiry button that lands in your inbox."
      />
      <LockedSection
        id="news"
        index="05"
        title="News"
        tease="List view for exhibitions, acquisitions, artist conversations. Each post is its own readable page."
      />
      <LockedSection
        id="pages"
        index="06"
        title="The rest of the site"
        tease="About, Mission & Vision, Company Overview, Contact. Each is editable as a single page in the CMS, on the same typographic system."
      />
      <LockedSection
        id="sitemap"
        index="07"
        title="Structure"
        tease="Sitemap of every page in your brief, mapped to where it lives in the CMS. Same nav across every page."
      />
      <CMSSection />
      <LockedSection
        id="stack"
        index="09"
        title="How it's built"
        tease="The four reasons this match the reference site — image performance, design ceiling, the CMS feel, and email inquiries."
      />
      <Footer />
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// Header
// ─────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="border-b border-black/5 bg-white/90 backdrop-blur sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href="/proposals/dawson-wells-gallery"
          style={{ fontFamily: "var(--font-playfair)" }}
          className="text-base tracking-[0.05em] font-medium"
        >
          Dawson Wells Gallery
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-[10px] uppercase tracking-[0.25em] text-black/45">
            Design concept
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-black/45">
            AutoFlux
          </span>
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-24 pb-20">
      <div className="text-[10px] uppercase tracking-[0.25em] text-black/45 mb-10">
        01 — Design concept
      </div>
      <h1
        style={{ fontFamily: "var(--font-playfair)" }}
        className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.95] max-w-5xl mb-12"
      >
        How the gallery looks on the web — and how you'll run it.
      </h1>
      <div className="grid md:grid-cols-2 gap-12 max-w-5xl">
        <p className="text-lg text-black/70 leading-relaxed">
          Below is a working preview of every page in your brief, mocked with
          seventeen sample pieces across the five categories. The aesthetic
          follows the reference you sent — generous whitespace, image-led,
          serif headlines, no template feel.
        </p>
        <p className="text-lg text-black/70 leading-relaxed">
          Past the website, you can click through the content management system
          and see exactly how an artwork goes from a folder on your computer to
          live on the site. Three steps. Five seconds. No plugins to fight.
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// In-page nav
// ─────────────────────────────────────────────────────────────

function SectionNav() {
  return (
    <div className="border-y border-black/5 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-x-6 gap-y-2 text-xs">
        {sections.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`flex items-center gap-1.5 transition-colors ${
              s.locked
                ? "text-black/35 hover:text-black/55"
                : "text-black/65 hover:text-black"
            }`}
          >
            <span className="text-black/25">
              {String(i + 2).padStart(2, "0")}
            </span>
            {s.label}
            {s.locked && <Lock className="w-2.5 h-2.5 text-black/30" />}
          </a>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 01 — Homepage preview (in browser frame)
// ─────────────────────────────────────────────────────────────

function BrowserFrame({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-black/10 shadow-2xl shadow-black/[0.08] overflow-hidden bg-white">
      <div className="flex items-center gap-3 px-5 py-3 border-b border-black/5 bg-[#F7F5F0]">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-black/15" />
          <span className="w-3 h-3 rounded-full bg-black/15" />
          <span className="w-3 h-3 rounded-full bg-black/15" />
        </div>
        <div className="flex-1 mx-4 px-4 py-1.5 rounded-md bg-white border border-black/5 text-xs text-black/50 truncate">
          {url}
        </div>
      </div>
      <div className="bg-white">{children}</div>
    </div>
  );
}

function HomepagePreview() {
  const featured = artworks.find((a) => a.featured) ?? artworks[0];
  const featuredList = artworks.filter((a) => a.featured).slice(0, 3);

  return (
    <section
      id="preview"
      className="max-w-7xl mx-auto px-6 py-24 scroll-mt-20"
    >
      <SectionLabel index="02" title="The homepage" />
      <p className="text-base text-black/65 max-w-2xl mb-12 leading-relaxed">
        First impression. A featured piece takes the room. Below it, a short
        introduction to the gallery and three current works. Quiet.
      </p>

      <BrowserFrame url="https://dawsonwellsgallery.com">
        <div className="bg-white">
          {/* Mock site nav */}
          <div className="flex items-center justify-between px-10 py-6 border-b border-black/5">
            <div
              style={{ fontFamily: "var(--font-playfair)" }}
              className="text-lg tracking-[0.05em] font-medium"
            >
              Dawson Wells Gallery
            </div>
            <nav className="flex gap-7 text-[13px] text-black/70">
              <span>Home</span>
              <span>Artworks</span>
              <span>News</span>
              <span>About</span>
              <span>Contact</span>
            </nav>
          </div>

          {/* Hero artwork */}
          <div className="grid md:grid-cols-12 gap-8 px-10 py-16">
            <div className="md:col-span-7">
              <img
                src={featured.imageUrl}
                alt={featured.title}
                className="w-full h-[480px] object-cover rounded-sm"
                loading="lazy"
              />
            </div>
            <div className="md:col-span-5 flex flex-col justify-end">
              <div className="text-[10px] uppercase tracking-[0.25em] text-black/45 mb-5">
                Currently showing
              </div>
              <h2
                style={{ fontFamily: "var(--font-playfair)" }}
                className="text-4xl md:text-5xl font-medium leading-[1.05] mb-4"
              >
                {featured.title}
              </h2>
              <div className="text-sm text-black/60 mb-6">
                {featured.artist} · {featured.year}
              </div>
              <p className="text-[15px] text-black/70 leading-relaxed mb-7 max-w-md">
                {featured.description ??
                  "A piece from the artist's most recent body of work, on view at the gallery this season."}
              </p>
              <div className="text-xs underline underline-offset-4 text-black/80">
                View piece
              </div>
            </div>
          </div>

          {/* Intro strip */}
          <div className="px-10 py-20 bg-[#FAFAF8] border-y border-black/5">
            <div className="max-w-3xl">
              <div className="text-[10px] uppercase tracking-[0.25em] text-black/45 mb-6">
                The gallery
              </div>
              <p
                style={{ fontFamily: "var(--font-playfair)" }}
                className="text-2xl md:text-3xl leading-snug font-normal text-black/85"
              >
                {galleryInfo.intro}
              </p>
            </div>
          </div>

          {/* Three featured works */}
          <div className="px-10 py-16">
            <div className="flex items-end justify-between mb-10">
              <h3
                style={{ fontFamily: "var(--font-playfair)" }}
                className="text-3xl font-medium"
              >
                On view this month
              </h3>
              <div className="text-xs underline underline-offset-4 text-black/60">
                See all artworks
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredList.map((a) => (
                <div key={a.id}>
                  <img
                    src={a.imageUrl}
                    alt={a.title}
                    className="w-full aspect-[4/5] object-cover rounded-sm mb-4"
                    loading="lazy"
                  />
                  <div
                    style={{ fontFamily: "var(--font-playfair)" }}
                    className="text-base font-medium mb-1"
                  >
                    {a.title}
                  </div>
                  <div className="text-xs text-black/55">
                    {a.artist} · {a.medium}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BrowserFrame>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 02 — Artworks page (interactive filter)
// ─────────────────────────────────────────────────────────────

function ArtworksSection() {
  const [activeCategory, setActiveCategory] = useState<ArtworkCategory | "All">(
    "All"
  );

  const filtered = useMemo(() => {
    if (activeCategory === "All") return artworks;
    return artworks.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="artworks"
      className="max-w-7xl mx-auto px-6 py-24 scroll-mt-20"
    >
      <SectionLabel index="03" title="The artworks page" />
      <p className="text-base text-black/65 max-w-2xl mb-12 leading-relaxed">
        Click a category. The grid filters instantly. With a hundred pieces,
        this is the page that earns its keep — fast, scrollable, generous to
        the work.
      </p>

      <BrowserFrame url="https://dawsonwellsgallery.com/artworks">
        <div className="bg-white">
          <div className="px-10 py-12 border-b border-black/5">
            <div className="text-[10px] uppercase tracking-[0.25em] text-black/45 mb-4">
              Collection
            </div>
            <h2
              style={{ fontFamily: "var(--font-playfair)" }}
              className="text-4xl md:text-5xl font-medium mb-8"
            >
              Artworks
            </h2>

            <div className="flex flex-wrap gap-2">
              <CategoryChip
                label="All"
                count={artworks.length}
                active={activeCategory === "All"}
                onClick={() => setActiveCategory("All")}
              />
              {categories.map((c) => (
                <CategoryChip
                  key={c}
                  label={c}
                  count={artworks.filter((a) => a.category === c).length}
                  active={activeCategory === c}
                  onClick={() => setActiveCategory(c)}
                />
              ))}
            </div>
          </div>

          <div className="px-10 py-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((a) => (
                <ArtworkCard key={a.id} artwork={a} />
              ))}
            </div>
          </div>
        </div>
      </BrowserFrame>
    </section>
  );
}

function CategoryChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-xs transition-colors ${
        active
          ? "bg-[#0A0A0A] text-white"
          : "bg-white border border-black/15 text-black/70 hover:bg-black/5"
      }`}
    >
      {label}
      <span
        className={`ml-2 ${active ? "text-white/55" : "text-black/35"}`}
      >
        {count}
      </span>
    </button>
  );
}

function ArtworkCard({ artwork }: { artwork: Artwork }) {
  return (
    <div className="group">
      <img
        src={artwork.imageUrl}
        alt={artwork.title}
        className="w-full aspect-[4/5] object-cover rounded-sm mb-3 transition-opacity group-hover:opacity-90"
        loading="lazy"
      />
      <div
        style={{ fontFamily: "var(--font-playfair)" }}
        className="text-sm font-medium leading-tight mb-1"
      >
        {artwork.title}
      </div>
      <div className="text-[11px] text-black/50">
        {artwork.artist} · {artwork.year}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 03 — Single piece detail
// ─────────────────────────────────────────────────────────────

function PieceSection() {
  const piece = artworks.find((a) => a.id === "p1") ?? artworks[0];

  return (
    <section id="piece" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-20">
      <SectionLabel index="04" title="A single piece" />
      <p className="text-base text-black/65 max-w-2xl mb-12 leading-relaxed">
        When a visitor clicks an artwork, they get the whole image with room to
        breathe. Title, artist, medium, dimensions. An inquiry button that
        sends an email straight to your inbox.
      </p>

      <BrowserFrame url="https://dawsonwellsgallery.com/artworks/quiet-coast">
        <div className="bg-white grid md:grid-cols-12 gap-0">
          <div className="md:col-span-8 bg-[#FAFAF8] p-12 flex items-center justify-center">
            <img
              src={piece.imageUrl}
              alt={piece.title}
              className="max-w-full max-h-[600px] object-contain shadow-xl shadow-black/10"
              loading="lazy"
            />
          </div>
          <div className="md:col-span-4 p-12 flex flex-col">
            <div className="text-[10px] uppercase tracking-[0.25em] text-black/45 mb-6">
              {piece.category}
            </div>
            <h2
              style={{ fontFamily: "var(--font-playfair)" }}
              className="text-4xl font-medium leading-[1.05] mb-3"
            >
              {piece.title}
            </h2>
            <div className="text-sm text-black/60 mb-8">
              {piece.artist} · {piece.year}
            </div>

            <dl className="space-y-5 text-sm border-t border-black/10 pt-6">
              <div className="grid grid-cols-3 gap-4">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-black/45 col-span-1 pt-0.5">
                  Medium
                </dt>
                <dd className="col-span-2 text-black/80">{piece.medium}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-black/45 col-span-1 pt-0.5">
                  Size
                </dt>
                <dd className="col-span-2 text-black/80">{piece.dimensions}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-black/45 col-span-1 pt-0.5">
                  Year
                </dt>
                <dd className="col-span-2 text-black/80">{piece.year}</dd>
              </div>
            </dl>

            {piece.description && (
              <p className="text-[14px] text-black/70 leading-relaxed mt-8 pt-6 border-t border-black/10">
                {piece.description}
              </p>
            )}

            <div className="mt-auto pt-10">
              <button className="w-full px-6 py-3.5 rounded-full bg-[#0A0A0A] text-white text-sm tracking-wide hover:bg-[#1A1A1A] transition-colors">
                Inquire about this piece
              </button>
              <div className="text-[11px] text-black/45 mt-3 text-center">
                Sends to {galleryInfo.email}
              </div>
            </div>
          </div>
        </div>
      </BrowserFrame>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 04 — News
// ─────────────────────────────────────────────────────────────

function NewsSection() {
  return (
    <section id="news" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-20">
      <SectionLabel index="05" title="News" />
      <p className="text-base text-black/65 max-w-2xl mb-12 leading-relaxed">
        Exhibition openings, new acquisitions, artist conversations. Each post
        gets its own page with full layout. List view here.
      </p>

      <BrowserFrame url="https://dawsonwellsgallery.com/news">
        <div className="bg-white px-10 py-12">
          <div className="text-[10px] uppercase tracking-[0.25em] text-black/45 mb-4">
            Journal
          </div>
          <h2
            style={{ fontFamily: "var(--font-playfair)" }}
            className="text-4xl md:text-5xl font-medium mb-12"
          >
            News
          </h2>

          <div className="divide-y divide-black/10">
            {news.map((post) => (
              <div
                key={post.id}
                className="grid md:grid-cols-12 gap-8 py-10 group"
              >
                <div className="md:col-span-4">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full aspect-[4/3] object-cover rounded-sm transition-opacity group-hover:opacity-90"
                    loading="lazy"
                  />
                </div>
                <div className="md:col-span-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-black/45 mb-3">
                    <span>{post.category}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>
                  <h3
                    style={{ fontFamily: "var(--font-playfair)" }}
                    className="text-2xl md:text-3xl font-medium leading-snug mb-3"
                  >
                    {post.title}
                  </h3>
                  <p className="text-[15px] text-black/65 leading-relaxed max-w-2xl">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BrowserFrame>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 05 — Other pages (About / Mission / Contact)
// ─────────────────────────────────────────────────────────────

function OtherPagesSection() {
  return (
    <section id="pages" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-20">
      <SectionLabel index="06" title="The rest of the site" />
      <p className="text-base text-black/65 max-w-2xl mb-12 leading-relaxed">
        About, Mission &amp; Vision, Company Overview, Contact. Each page is a
        single editable document in the CMS. Same typographic system as the
        rest of the site.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {/* About / Mission preview */}
        <div className="md:col-span-2 rounded-2xl border border-black/10 bg-[#FAFAF8] p-12 min-h-[440px] flex flex-col">
          <div className="text-[10px] uppercase tracking-[0.25em] text-black/45 mb-5">
            Mission &amp; Vision
          </div>
          <h3
            style={{ fontFamily: "var(--font-playfair)" }}
            className="text-3xl md:text-4xl font-medium leading-[1.15] mb-8"
          >
            {galleryInfo.mission}
          </h3>
          <div className="border-t border-black/10 pt-6">
            <div className="text-[10px] uppercase tracking-[0.25em] text-black/45 mb-3">
              Looking ahead
            </div>
            <p className="text-base text-black/70 leading-relaxed">
              {galleryInfo.vision}
            </p>
          </div>
        </div>

        {/* Contact preview */}
        <div className="rounded-2xl border border-black/10 bg-white p-10 min-h-[440px] flex flex-col">
          <div className="text-[10px] uppercase tracking-[0.25em] text-black/45 mb-5">
            Contact
          </div>
          <h3
            style={{ fontFamily: "var(--font-playfair)" }}
            className="text-3xl font-medium mb-7"
          >
            Visit or write
          </h3>
          <div className="space-y-5 text-sm">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-black/45 mb-1.5">
                Hours
              </div>
              <div className="text-black/80 leading-relaxed">
                {galleryInfo.hours}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-black/45 mb-1.5">
                Email
              </div>
              <div className="text-black/80">{galleryInfo.email}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-black/45 mb-1.5">
                Inquiry form
              </div>
              <div className="space-y-2 text-xs text-black/45">
                <div className="px-3 py-2 rounded border border-black/10">
                  Name
                </div>
                <div className="px-3 py-2 rounded border border-black/10">
                  Email
                </div>
                <div className="px-3 py-2 rounded border border-black/10 h-16">
                  Message
                </div>
                <div className="mt-3 px-4 py-2 rounded-full bg-[#0A0A0A] text-white text-center">
                  Send
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 06 — Sitemap
// ─────────────────────────────────────────────────────────────

function SitemapSection() {
  return (
    <section
      id="sitemap"
      className="bg-[#0A0A0A] text-white"
    >
      <div className="max-w-7xl mx-auto px-6 py-28 scroll-mt-20">
        <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-5">
          07 — Structure
        </div>
        <h2
          style={{ fontFamily: "var(--font-playfair)" }}
          className="text-4xl md:text-5xl font-medium mb-6 max-w-3xl"
        >
          Every page in your brief, where it lives, and what it does.
        </h2>
        <p className="text-base text-white/60 max-w-2xl mb-16 leading-relaxed">
          Same navigation across all pages, as you specified. Each page is
          editable independently in the CMS.
        </p>

        <div className="space-y-px">
          {sitemap.map((node, i) => (
            <SitemapRow key={node.label} node={node} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SitemapRow({ node, index }: { node: { label: string; description: string; children?: { label: string; description: string }[] }; index: number }) {
  return (
    <div className="border-t border-white/10 last:border-b">
      <div className="grid md:grid-cols-12 gap-8 py-7">
        <div className="md:col-span-1 text-xs text-white/35 pt-1">
          {String(index).padStart(2, "0")}
        </div>
        <div className="md:col-span-3">
          <div
            style={{ fontFamily: "var(--font-playfair)" }}
            className="text-2xl font-medium"
          >
            {node.label}
          </div>
          {node.children && (
            <div className="mt-2 text-[11px] text-white/40">
              {node.children.length} sub-pages
            </div>
          )}
        </div>
        <div className="md:col-span-8">
          <p className="text-[15px] text-white/70 leading-relaxed">
            {node.description}
          </p>
          {node.children && (
            <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
              {node.children.map((c) => (
                <div key={c.label} className="text-xs">
                  <span className="text-white/85">{c.label}</span>
                  <span className="text-white/35"> — {c.description.split(" — ")[0].split(".")[0]}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 07 — CMS demo (interactive 3-step)
// ─────────────────────────────────────────────────────────────

type CMSStep = "list" | "edit" | "publish";

function CMSSection() {
  const [step, setStep] = useState<CMSStep>("list");

  return (
    <section id="cms" className="max-w-7xl mx-auto px-6 py-28 scroll-mt-20">
      <SectionLabel index="08" title="Behind the scenes" />
      <h3
        style={{ fontFamily: "var(--font-playfair)" }}
        className="text-3xl md:text-4xl font-medium mb-5 max-w-3xl"
      >
        Adding an artwork — three steps, no plugins.
      </h3>
      <p className="text-base text-black/65 max-w-2xl mb-10 leading-relaxed">
        This is the content management system you'll use day to day. Step one
        is below — the list view, where every piece lives. Steps two and three
        are built; we'll walk through them together on our call.
      </p>

      {/* Step tabs */}
      <div className="flex flex-wrap gap-3 mb-10">
        <CMSTab
          number="1"
          label="Open the artworks list"
          active={step === "list"}
          onClick={() => setStep("list")}
          icon={<ImageIcon className="w-4 h-4" />}
        />
        <CMSTab
          number="2"
          label="Edit the new piece"
          active={step === "edit"}
          onClick={() => setStep("edit")}
          icon={<Crop className="w-4 h-4" />}
          locked
        />
        <CMSTab
          number="3"
          label="Publish"
          active={step === "publish"}
          onClick={() => setStep("publish")}
          icon={<Globe className="w-4 h-4" />}
          locked
        />
      </div>

      {/* Studio frame */}
      <div className="rounded-2xl border border-black/10 shadow-2xl shadow-black/[0.08] overflow-hidden bg-[#0F1115]">
        {/* Studio chrome */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#0F1115] text-white">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-white/15" />
              <span className="w-3 h-3 rounded-full bg-white/15" />
              <span className="w-3 h-3 rounded-full bg-white/15" />
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/45 ml-2">
              Studio · dawson-wells-gallery
            </div>
          </div>
          <div className="text-[10px] text-white/40">
            you@dawsonwellsgallery.com
          </div>
        </div>

        <div className="grid grid-cols-12 min-h-[640px]">
          {/* Sidebar */}
          <div className="col-span-3 border-r border-white/5 bg-[#0F1115] text-white p-5">
            <div className="text-[9px] uppercase tracking-[0.25em] text-white/35 mb-4">
              Content
            </div>
            <div className="space-y-1 text-[13px]">
              <SidebarItem
                icon={<ImageIcon className="w-3.5 h-3.5" />}
                label="Artworks"
                count={artworks.length}
                active
              />
              <SidebarItem
                icon={<Newspaper className="w-3.5 h-3.5" />}
                label="News"
                count={news.length}
              />
              <SidebarItem
                icon={<FileText className="w-3.5 h-3.5" />}
                label="Pages"
                count={6}
              />
              <SidebarItem
                icon={<Settings className="w-3.5 h-3.5" />}
                label="Settings"
              />
            </div>
          </div>

          {/* Main panel */}
          <div className="col-span-9 bg-white">
            {step === "list" && <CMSListView />}
            {(step === "edit" || step === "publish") && (
              <CMSLockedPanel step={step} />
            )}
          </div>
        </div>
      </div>

      {/* Caption under the frame */}
      <div className="mt-8 max-w-3xl text-sm text-black/60 leading-relaxed">
        {step === "list" && (
          <>
            <strong className="text-black/80">Step 1.</strong> The artworks
            list. Search, filter by category, drag to reorder. Click any piece
            to edit it. Hit "+" to add a new one — and that's where steps 2
            and 3 take over.
          </>
        )}
        {(step === "edit" || step === "publish") && (
          <>
            <strong className="text-black/80">
              Step {step === "edit" ? "2" : "3"} is built —
            </strong>{" "}
            kept off-screen here so we have something to walk through together.
          </>
        )}
      </div>
    </section>
  );
}

function CMSLockedPanel({ step }: { step: "edit" | "publish" }) {
  const copy =
    step === "edit"
      ? {
          title: "The edit form, with live preview",
          body: "Drop in the image, fill out the fields, see exactly how the piece will look on the site before anything goes live. We'll walk it through together on the call.",
        }
      : {
          title: "The publish flow",
          body: "Publish now, schedule for later, save as draft, roll back any change. Every revision is logged. We'll walk it through together on the call.",
        };
  return (
    <div className="bg-white p-12 flex items-center justify-center min-h-[640px]">
      <div className="text-center max-w-md">
        <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mx-auto mb-6">
          <Lock className="w-5 h-5 text-black/55" />
        </div>
        <div
          style={{ fontFamily: "var(--font-playfair)" }}
          className="text-2xl font-medium mb-3"
        >
          {copy.title}
        </div>
        <p className="text-sm text-black/60 leading-relaxed">{copy.body}</p>
      </div>
    </div>
  );
}

function CMSTab({
  number,
  label,
  active,
  onClick,
  icon,
  locked = false,
}: {
  number: string;
  label: string;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  locked?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-5 py-3 rounded-xl text-sm transition-all ${
        active
          ? "bg-[#0A0A0A] text-white shadow-lg shadow-black/15"
          : locked
          ? "bg-white border border-dashed border-black/15 text-black/45 hover:bg-black/[0.02]"
          : "bg-white border border-black/10 text-black/65 hover:bg-black/5"
      }`}
    >
      <span
        className={`flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-medium ${
          active
            ? "bg-white/15 text-white"
            : locked
            ? "bg-black/5 text-black/40"
            : "bg-black/5 text-black/55"
        }`}
      >
        {number}
      </span>
      <span
        className={
          active ? "text-white" : locked ? "text-black/35" : "text-black/65"
        }
      >
        {icon}
      </span>
      <span>{label}</span>
      {locked && !active && (
        <Lock className="w-3 h-3 text-black/35 ml-1" />
      )}
    </button>
  );
}

function SidebarItem({
  icon,
  label,
  count,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  count?: number;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between px-3 py-2 rounded-md ${
        active ? "bg-white/8 text-white" : "text-white/60"
      }`}
    >
      <span className="flex items-center gap-2.5">
        <span className={active ? "text-white" : "text-white/40"}>{icon}</span>
        {label}
      </span>
      {count !== undefined && (
        <span className="text-[10px] text-white/40">{count}</span>
      )}
    </div>
  );
}

function CMSListView() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div
            style={{ fontFamily: "var(--font-playfair)" }}
            className="text-2xl font-medium"
          >
            Artworks
          </div>
          <div className="text-xs text-black/45 mt-1">
            {artworks.length} pieces · all categories
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-md border border-black/10 text-xs text-black/50 w-56">
            <Search className="w-3.5 h-3.5" />
            Search by title, artist…
          </div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-[#0A0A0A] text-white text-xs">
            <Plus className="w-3.5 h-3.5" />
            New artwork
          </button>
        </div>
      </div>

      <div className="border-t border-black/10">
        {artworks.slice(0, 7).map((a) => (
          <div
            key={a.id}
            className="grid grid-cols-12 gap-4 py-3 border-b border-black/5 items-center"
          >
            <div className="col-span-1">
              <img
                src={a.imageUrl}
                alt={a.title}
                className="w-12 h-12 object-cover rounded"
                loading="lazy"
              />
            </div>
            <div className="col-span-4">
              <div className="text-sm font-medium text-black/85">
                {a.title}
              </div>
              <div className="text-[11px] text-black/50">{a.artist}</div>
            </div>
            <div className="col-span-2 text-xs text-black/55">{a.category}</div>
            <div className="col-span-2 text-xs text-black/55">{a.year}</div>
            <div className="col-span-2 text-xs text-black/55">{a.dimensions}</div>
            <div className="col-span-1 text-right">
              <span className="text-[10px] uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                Live
              </span>
            </div>
          </div>
        ))}
        <div className="text-center text-xs text-black/40 py-5">
          + {artworks.length - 7} more
        </div>
      </div>
    </div>
  );
}

function CMSEditView() {
  return (
    <div className="grid grid-cols-12 min-h-full">
      <div className="col-span-7 p-8 border-r border-black/5">
        <div className="flex items-center gap-2 text-xs text-black/45 mb-6">
          <span>Artworks</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black/85">New piece (untitled)</span>
        </div>

        <div className="space-y-5">
          <Field label="Title">
            <div className="text-sm">Quiet Coast</div>
          </Field>

          <Field label="Artist">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-black/10" />
              <div className="text-sm">Mariana Reyes</div>
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Year">
              <div className="text-sm">2024</div>
            </Field>
            <Field label="Category">
              <div className="text-sm flex items-center justify-between">
                Photography
                <ChevronRight className="w-3 h-3 rotate-90 text-black/40" />
              </div>
            </Field>
          </div>

          <Field label="Image">
            <div className="border-2 border-dashed border-black/15 rounded-md p-4 flex items-center gap-3 bg-[#FAFAF8]">
              <div className="w-12 h-12 rounded bg-white border border-black/10 flex items-center justify-center text-black/40">
                <Upload className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-black/75 mb-0.5">
                  quiet-coast.jpg uploaded · 4.2 MB
                </div>
                <div className="text-[11px] text-black/45">
                  Drag the corners to crop. We'll generate every size for you.
                </div>
              </div>
              <Check className="w-4 h-4 text-emerald-600" />
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Medium">
              <div className="text-sm">Silver gelatin print</div>
            </Field>
            <Field label="Dimensions">
              <div className="text-sm">60 × 80 cm</div>
            </Field>
          </div>

          <Field label="Description">
            <div className="text-xs text-black/65 leading-relaxed">
              From a four-month residency on the Atlantic edge. Printed by the
              artist in a limited edition of seven.
            </div>
          </Field>
        </div>
      </div>

      {/* Live preview */}
      <div className="col-span-5 bg-[#FAFAF8] p-8">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-black/45 mb-4">
          <Eye className="w-3.5 h-3.5" />
          Preview · how it'll look on the site
        </div>
        <div className="bg-white rounded shadow-sm overflow-hidden">
          <img
            src="https://picsum.photos/seed/dwg-photo-1/800/1000"
            alt="preview"
            className="w-full aspect-[4/5] object-cover"
            loading="lazy"
          />
          <div className="p-5">
            <div
              style={{ fontFamily: "var(--font-playfair)" }}
              className="text-base font-medium mb-1"
            >
              Quiet Coast
            </div>
            <div className="text-[11px] text-black/55 mb-3">
              Mariana Reyes · 2024
            </div>
            <div className="text-[11px] text-black/65 leading-relaxed">
              Silver gelatin print · 60 × 80 cm
            </div>
          </div>
        </div>
        <div className="text-[11px] text-black/45 mt-4 leading-relaxed">
          Updates as you type. Mobile and desktop look identical to what
          visitors will see.
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-black/45 mb-1.5">
        {label}
      </div>
      <div className="px-3 py-2.5 rounded-md border border-black/10 bg-white">
        {children}
      </div>
    </div>
  );
}

function CMSPublishView() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-2 text-xs text-black/45 mb-6">
        <span>Artworks</span>
        <ChevronRight className="w-3 h-3" />
        <span>Quiet Coast</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-black/85">Publish</span>
      </div>

      <div className="max-w-xl">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-medium text-emerald-950 mb-1">
                Ready to publish
              </div>
              <div className="text-xs text-emerald-900/75 leading-relaxed">
                All required fields are filled. Image processed in three sizes.
                The piece will be live in about five seconds.
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <PublishRow label="Live URL">
            <span className="text-black/60">
              dawsonwellsgallery.com/artworks/quiet-coast
            </span>
          </PublishRow>
          <PublishRow label="Visible on">
            <span className="text-black/85">
              Home (featured), Artworks, Photography
            </span>
          </PublishRow>
          <PublishRow label="History">
            <span className="text-black/60">
              4 revisions · last edited 2 minutes ago
            </span>
          </PublishRow>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-emerald-600 text-white text-sm">
            <Globe className="w-4 h-4" />
            Publish now
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-md border border-black/15 text-sm text-black/75">
            <Calendar className="w-4 h-4" />
            Schedule
          </button>
          <button className="px-5 py-2.5 rounded-md border border-black/15 text-sm text-black/55">
            Save as draft
          </button>
        </div>
      </div>
    </div>
  );
}

function PublishRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-3 gap-4 text-xs py-2 border-b border-black/5">
      <div className="text-[10px] uppercase tracking-[0.18em] text-black/45">
        {label}
      </div>
      <div className="col-span-2">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 08 — Stack explanation
// ─────────────────────────────────────────────────────────────

function StackSection() {
  const points = [
    {
      title: "It loads fast — even with a hundred images",
      body: "Galleries live and die on image quality. The site loads images progressively, generates the right size for every screen, and never jumps as things load in. The reference site hits these numbers because it's built this way; the pattern is the same here.",
    },
    {
      title: "The design is yours, not a theme",
      body: "Nothing is a stock template. Every layout, every spacing decision, every interaction is built specifically for the gallery. No theme settings to wrestle, no plugin updates that break the look.",
    },
    {
      title: "The CMS feels like Notion, not WordPress",
      body: "The system you saw above is what you'll actually use. Add an artwork, fill in the fields, drop the image. Publish. Done. No plugin configuration, no theme dashboard, nothing to maintain.",
    },
    {
      title: "Email inquiries arrive in your inbox",
      body: "A visitor clicks Inquire, the form lands as an email at hello@dawsonwellsgallery.com. No third-party form service, no spam, no signup walls.",
    },
  ];

  return (
    <section id="stack" className="max-w-7xl mx-auto px-6 py-28 scroll-mt-20">
      <SectionLabel index="09" title="How it's built" />
      <h3
        style={{ fontFamily: "var(--font-playfair)" }}
        className="text-3xl md:text-4xl font-medium mb-6 max-w-3xl"
      >
        Four things that matter for a gallery website.
      </h3>
      <p className="text-base text-black/65 max-w-2xl mb-14 leading-relaxed">
        The reference you sent (guidomauas.com) sets a quality bar. Below are
        the four reasons this build matches it — written for you, not for a
        developer.
      </p>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
        {points.map((p, i) => (
          <div key={p.title}>
            <div className="text-[10px] uppercase tracking-[0.25em] text-black/40 mb-4">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h4
              style={{ fontFamily: "var(--font-playfair)" }}
              className="text-2xl font-medium mb-4 leading-tight"
            >
              {p.title}
            </h4>
            <p className="text-[15px] text-black/65 leading-relaxed">
              {p.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-20 pt-10 border-t border-black/10 max-w-2xl">
        <div className="text-[10px] uppercase tracking-[0.25em] text-black/45 mb-3">
          What's coming next
        </div>
        <p className="text-base text-black/70 leading-relaxed">
          The full proposal — scope, timeline, pricing, what we'll need from
          you — lands in your inbox shortly. This page is for you to walk
          around in. Click anything. If something feels off or there's a piece
          missing from the brief, write back and it goes in before the
          proposal goes out.
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Reusable
// ─────────────────────────────────────────────────────────────

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-6">
      <div className="text-[10px] uppercase tracking-[0.25em] text-black/45 mb-3">
        {index} — {title}
      </div>
    </div>
  );
}

function LockedSection({
  id,
  index,
  title,
  tease,
}: {
  id: string;
  index: string;
  title: string;
  tease: string;
}) {
  return (
    <section
      id={id}
      className="max-w-7xl mx-auto px-6 py-16 scroll-mt-20"
    >
      <SectionLabel index={index} title={title} />
      <p className="text-base text-black/55 max-w-2xl mb-8 leading-relaxed">
        {tease}
      </p>
      <div className="rounded-2xl border border-dashed border-black/15 bg-[#FAFAF8] py-16 px-6 flex items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-black/55">
          <Lock className="w-4 h-4" />
          Walked through on our call.
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-black/10 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-wrap items-end justify-between gap-8">
        <div>
          <div
            style={{ fontFamily: "var(--font-playfair)" }}
            className="text-xl tracking-[0.05em] font-medium mb-2"
          >
            Dawson Wells Gallery
          </div>
          <div className="text-xs text-black/50">
            Design concept — interactive preview · April 2026
          </div>
        </div>
        <div className="text-xs text-black/50">
          Prepared by AutoFlux · autoflux.digital
        </div>
      </div>
    </footer>
  );
}
