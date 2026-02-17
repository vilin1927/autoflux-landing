"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Presentation,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Monitor,
  Type,
  Image,
  Layout,
  CheckCircle2,
  AlertTriangle,
  Maximize2,
  RotateCcw,
  Eye,
  Pencil,
  Wand2,
  FileText,
  ChevronDown,
  Layers,
  Palette,
  Lock,
  Grid3X3,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────
type View = "storyboard" | "wireframe" | "designed" | "generator";
type SlideVariant = "A" | "B" | "C";

interface SlideTemplate {
  id: string;
  name: string;
  type: string;
  constraints: {
    heading: { maxChars: number; font: string; size: string };
    subheading?: { maxChars: number; font: string; size: string };
    body?: { maxChars: number; font: string; size: string };
    image?: { position: string; size: string };
    logo?: { position: string };
  };
  wireframe: {
    heading: string;
    subheading?: string;
    body?: string;
    hasImage: boolean;
    hasLogo: boolean;
    hasChart: boolean;
    layout: "left-text" | "centered" | "two-column" | "full-image" | "title-only";
  };
  designed: {
    heading: string;
    subheading?: string;
    body?: string;
    accent: string;
    bgStyle: string;
  };
}

// ── Demo Data ──────────────────────────────────────────────────────────
const slideTemplates: SlideTemplate[] = [
  {
    id: "cover",
    name: "Cover Slide",
    type: "Title",
    constraints: {
      heading: { maxChars: 40, font: "Inter Bold", size: "44pt" },
      subheading: { maxChars: 60, font: "Inter Regular", size: "20pt" },
      logo: { position: "top-right" },
    },
    wireframe: {
      heading: "Company Name Here",
      subheading: "Your one-line value proposition goes here",
      hasImage: false,
      hasLogo: true,
      hasChart: false,
      layout: "centered",
    },
    designed: {
      heading: "NovaTech AI",
      subheading: "Making enterprise AI accessible to everyone",
      accent: "#2563EB",
      bgStyle: "gradient",
    },
  },
  {
    id: "problem",
    name: "Problem Slide",
    type: "Content",
    constraints: {
      heading: { maxChars: 35, font: "Inter Bold", size: "36pt" },
      body: { maxChars: 200, font: "Inter Regular", size: "18pt" },
      image: { position: "right-40%", size: "400x300" },
    },
    wireframe: {
      heading: "The Problem",
      body: "Describe the key pain point your target customers face. Keep it specific, measurable, and relatable.",
      hasImage: true,
      hasLogo: false,
      hasChart: false,
      layout: "left-text",
    },
    designed: {
      heading: "The Problem",
      body: "Enterprise teams waste 40+ hours/month on manual data processing. Legacy tools are slow, error-prone, and can't handle unstructured data at scale.",
      accent: "#DC2626",
      bgStyle: "clean",
    },
  },
  {
    id: "solution",
    name: "Solution Slide",
    type: "Content",
    constraints: {
      heading: { maxChars: 35, font: "Inter Bold", size: "36pt" },
      body: { maxChars: 180, font: "Inter Regular", size: "18pt" },
      image: { position: "right-50%", size: "500x350" },
    },
    wireframe: {
      heading: "Our Solution",
      body: "Explain your product/solution in plain language. What does it do? How does it solve the problem?",
      hasImage: true,
      hasLogo: false,
      hasChart: false,
      layout: "left-text",
    },
    designed: {
      heading: "Our Solution",
      body: "NovaTech AI automates data processing with fine-tuned models. Drop in any document — we extract, classify, and route data in seconds, not hours.",
      accent: "#16A34A",
      bgStyle: "clean",
    },
  },
  {
    id: "market",
    name: "Market Size",
    type: "Data",
    constraints: {
      heading: { maxChars: 30, font: "Inter Bold", size: "36pt" },
      body: { maxChars: 120, font: "Inter Regular", size: "16pt" },
    },
    wireframe: {
      heading: "Market Opportunity",
      body: "TAM / SAM / SOM breakdown with source citations",
      hasImage: false,
      hasLogo: false,
      hasChart: true,
      layout: "two-column",
    },
    designed: {
      heading: "Market Opportunity",
      body: "$47B TAM in enterprise automation. $8.2B SAM in document processing. $1.4B SOM in mid-market.",
      accent: "#7C3AED",
      bgStyle: "clean",
    },
  },
  {
    id: "traction",
    name: "Traction",
    type: "Data",
    constraints: {
      heading: { maxChars: 25, font: "Inter Bold", size: "36pt" },
      body: { maxChars: 150, font: "Inter Regular", size: "16pt" },
    },
    wireframe: {
      heading: "Traction",
      body: "Key metrics, customers, revenue milestones, growth rate",
      hasImage: false,
      hasLogo: false,
      hasChart: true,
      layout: "two-column",
    },
    designed: {
      heading: "Traction",
      body: "42 enterprise customers. $1.2M ARR. 3.4x YoY growth. 95% retention rate. Processing 2M+ documents/month.",
      accent: "#0891B2",
      bgStyle: "clean",
    },
  },
  {
    id: "ask",
    name: "The Ask",
    type: "Closing",
    constraints: {
      heading: { maxChars: 30, font: "Inter Bold", size: "40pt" },
      subheading: { maxChars: 80, font: "Inter Regular", size: "20pt" },
      body: { maxChars: 150, font: "Inter Regular", size: "16pt" },
      logo: { position: "bottom-right" },
    },
    wireframe: {
      heading: "The Ask",
      subheading: "What you're raising and what you'll do with it",
      body: "Use of funds breakdown: Engineering, Sales, Operations",
      hasImage: false,
      hasLogo: true,
      hasChart: false,
      layout: "centered",
    },
    designed: {
      heading: "Raising $3M Series A",
      subheading: "To scale engineering and go-to-market in North America",
      body: "60% Engineering & AI · 25% Sales & Marketing · 15% Operations",
      accent: "#2563EB",
      bgStyle: "gradient",
    },
  },
];

const variantExamples: Record<string, { heading: string; body?: string }[]> = {
  problem: [
    {
      heading: "The Problem",
      body: "Enterprise teams waste 40+ hours/month on manual data processing. Legacy tools are slow, error-prone, and can't handle unstructured data at scale.",
    },
    {
      heading: "Why This Matters Now",
      body: "Data volume is growing 25% YoY but processing capacity hasn't kept up. Companies are drowning in unstructured documents they can't extract value from.",
    },
    {
      heading: "The $12B Pain Point",
      body: "Manual document processing costs enterprises $12B annually in lost productivity. Every day without automation is money left on the table.",
    },
  ],
};

// ── Business Context for Generator ─────────────────────────────────────
const sampleContext = {
  company: "NovaTech AI",
  industry: "Enterprise SaaS / AI",
  problem: "Manual data processing is slow and error-prone",
  solution: "AI-powered document processing automation",
  stage: "Series A",
  ask: "$3M",
};

// ── Component ──────────────────────────────────────────────────────────
export default function DeckBuilderDemoPage() {
  const [currentView, setCurrentView] = useState<View>("storyboard");
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<SlideVariant>("A");
  const [editingText, setEditingText] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [customTexts, setCustomTexts] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [showConstraints, setShowConstraints] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Generation animation
  useEffect(() => {
    if (isGenerating) {
      const steps = [
        "Analyzing business context...",
        "Selecting slide templates...",
        "Generating headlines (char limits enforced)...",
        "Creating content variants...",
        "Applying brand styles...",
        "Building storyboard...",
      ];
      let step = 0;
      const interval = setInterval(() => {
        step++;
        setGenerationStep(step);
        if (step >= steps.length) {
          clearInterval(interval);
          setTimeout(() => {
            setIsGenerating(false);
            setCurrentView("storyboard");
          }, 500);
        }
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const currentSlide = slideTemplates[selectedSlide];

  const getDisplayText = (slideId: string, field: string, defaultText: string) => {
    const key = `${slideId}-${field}`;
    return customTexts[key] || defaultText;
  };

  const handleEdit = (slideId: string, field: string, currentText: string, maxChars: number) => {
    setEditingText(`${slideId}-${field}`);
    setEditValue(currentText);
  };

  const handleSaveEdit = (maxChars: number) => {
    if (editingText) {
      setCustomTexts((prev) => ({
        ...prev,
        [editingText]: editValue.slice(0, maxChars),
      }));
      setEditingText(null);
    }
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center p-6">
        <div className="bg-[#151A2D] rounded-2xl p-8 max-w-sm text-center border border-white/10">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Monitor className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Best Viewed on Desktop</h1>
          <p className="text-gray-400 mb-6">
            This demo showcases a deck builder experience. Please view on a larger screen.
          </p>
          <Link
            href="/proposals/deck-builder"
            className="inline-flex items-center gap-2 text-blue-400 font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Proposal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] flex flex-col">
      {/* Top Bar */}
      <header className="h-14 bg-[#0B0F1A] border-b border-white/10 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <Link
            href="/proposals/deck-builder"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Proposal
          </Link>
          <div className="w-px h-6 bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center">
              <Presentation className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white">AI Deck Builder</span>
            <span className="text-xs text-gray-500 ml-2">Interactive Demo</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowConstraints(!showConstraints)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${
              showConstraints
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Constraints {showConstraints ? "ON" : "OFF"}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel — Storyboard Cards */}
        <aside className="w-72 bg-[#0E1225] border-r border-white/10 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              Storyboard
            </h2>
            <p className="text-xs text-gray-500 mt-1">6 slides · Investor Deck</p>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {slideTemplates.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => {
                  setSelectedSlide(i);
                  setSelectedVariant("A");
                }}
                className={`w-full text-left rounded-xl p-3 transition-all group ${
                  selectedSlide === i
                    ? "bg-blue-500/15 border border-blue-500/40 ring-1 ring-blue-500/20"
                    : "bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/15"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                    {i + 1} · {slide.type}
                  </span>
                  {slide.id === "problem" && (
                    <span className="text-[10px] bg-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded-full">
                      3 variants
                    </span>
                  )}
                </div>

                {/* Mini wireframe preview */}
                <div className="bg-white/5 rounded-lg aspect-[16/10] p-2 mb-2 relative overflow-hidden">
                  <MiniSlidePreview slide={slide} />
                </div>

                <p className={`text-xs font-medium ${selectedSlide === i ? "text-blue-300" : "text-gray-300"}`}>
                  {slide.name}
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  H: {slide.constraints.heading.maxChars} chars
                  {slide.constraints.body && ` · B: ${slide.constraints.body.maxChars}`}
                </p>
              </button>
            ))}
          </div>

          {/* Generate Button */}
          <div className="p-3 border-t border-white/10">
            <button
              onClick={() => {
                setIsGenerating(true);
                setGenerationStep(0);
                setCurrentView("generator");
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-xl text-sm font-medium transition-all"
            >
              <Wand2 className="w-4 h-4" />
              Generate Deck
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* View Tabs */}
          <div className="flex items-center gap-1 px-6 pt-4 pb-2">
            {(["storyboard", "wireframe", "designed"] as View[]).map((view) => (
              <button
                key={view}
                onClick={() => setCurrentView(view)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                  currentView === view
                    ? "bg-white/10 text-white font-medium"
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                }`}
              >
                {view === "storyboard" && <Grid3X3 className="w-4 h-4" />}
                {view === "wireframe" && <Layout className="w-4 h-4" />}
                {view === "designed" && <Palette className="w-4 h-4" />}
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <AnimatePresence mode="wait">
              {currentView === "generator" && isGenerating ? (
                <GeneratingView step={generationStep} />
              ) : currentView === "storyboard" ? (
                <StoryboardView
                  slides={slideTemplates}
                  selectedSlide={selectedSlide}
                  onSelectSlide={(i) => {
                    setSelectedSlide(i);
                    setSelectedVariant("A");
                  }}
                  showConstraints={showConstraints}
                />
              ) : currentView === "wireframe" ? (
                <SlideDetailView
                  slide={currentSlide}
                  mode="wireframe"
                  showConstraints={showConstraints}
                  selectedVariant={selectedVariant}
                  onVariantChange={setSelectedVariant}
                  editingText={editingText}
                  editValue={editValue}
                  onEditValueChange={setEditValue}
                  onEdit={handleEdit}
                  onSaveEdit={handleSaveEdit}
                  onCancelEdit={() => setEditingText(null)}
                  getDisplayText={getDisplayText}
                  customTexts={customTexts}
                />
              ) : (
                <SlideDetailView
                  slide={currentSlide}
                  mode="designed"
                  showConstraints={showConstraints}
                  selectedVariant={selectedVariant}
                  onVariantChange={setSelectedVariant}
                  editingText={editingText}
                  editValue={editValue}
                  onEditValueChange={setEditValue}
                  onEdit={handleEdit}
                  onSaveEdit={handleSaveEdit}
                  onCancelEdit={() => setEditingText(null)}
                  getDisplayText={getDisplayText}
                  customTexts={customTexts}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Navigation */}
          {currentView !== "generator" && (
            <div className="px-6 py-3 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => setSelectedSlide(Math.max(0, selectedSlide - 1))}
                disabled={selectedSlide === 0}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              <span className="text-sm text-gray-500">
                {selectedSlide + 1} / {slideTemplates.length}
              </span>
              <button
                onClick={() => setSelectedSlide(Math.min(slideTemplates.length - 1, selectedSlide + 1))}
                disabled={selectedSlide === slideTemplates.length - 1}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </main>

        {/* Right Panel — Constraints Inspector */}
        {showConstraints && currentView !== "generator" && (
          <aside className="w-72 bg-[#0E1225] border-l border-white/10 overflow-y-auto">
            <div className="p-4 border-b border-white/10">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                Constraint Inspector
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Template rules for &ldquo;{currentSlide.name}&rdquo;
              </p>
            </div>

            <div className="p-4 space-y-4">
              {/* Heading constraint */}
              <ConstraintBlock
                label="Heading"
                icon={<Type className="w-3.5 h-3.5" />}
                font={currentSlide.constraints.heading.font}
                size={currentSlide.constraints.heading.size}
                maxChars={currentSlide.constraints.heading.maxChars}
                currentText={getDisplayText(
                  currentSlide.id,
                  "heading",
                  currentView === "designed"
                    ? currentSlide.designed.heading
                    : currentSlide.wireframe.heading
                )}
              />

              {/* Subheading constraint */}
              {currentSlide.constraints.subheading && (
                <ConstraintBlock
                  label="Subheading"
                  icon={<Type className="w-3.5 h-3.5" />}
                  font={currentSlide.constraints.subheading.font}
                  size={currentSlide.constraints.subheading.size}
                  maxChars={currentSlide.constraints.subheading.maxChars}
                  currentText={getDisplayText(
                    currentSlide.id,
                    "subheading",
                    currentView === "designed"
                      ? currentSlide.designed.subheading || ""
                      : currentSlide.wireframe.subheading || ""
                  )}
                />
              )}

              {/* Body constraint */}
              {currentSlide.constraints.body && (
                <ConstraintBlock
                  label="Body Text"
                  icon={<FileText className="w-3.5 h-3.5" />}
                  font={currentSlide.constraints.body.font}
                  size={currentSlide.constraints.body.size}
                  maxChars={currentSlide.constraints.body.maxChars}
                  currentText={getDisplayText(
                    currentSlide.id,
                    "body",
                    currentView === "designed"
                      ? currentSlide.designed.body || ""
                      : currentSlide.wireframe.body || ""
                  )}
                />
              )}

              {/* Image constraint */}
              {currentSlide.constraints.image && (
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Image className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-xs font-medium text-gray-300">Image</span>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-gray-500">
                    <div className="flex justify-between">
                      <span>Position</span>
                      <span className="text-gray-400">{currentSlide.constraints.image.position}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size</span>
                      <span className="text-gray-400">{currentSlide.constraints.image.size}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Logo constraint */}
              {currentSlide.constraints.logo && (
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Maximize2 className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-xs font-medium text-gray-300">Logo</span>
                  </div>
                  <div className="text-[11px] text-gray-500 flex justify-between">
                    <span>Position</span>
                    <span className="text-gray-400">{currentSlide.constraints.logo.position}</span>
                  </div>
                </div>
              )}

              {/* Template spec */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-[10px] uppercase tracking-wider text-gray-600 mb-2">Template Spec (JSON)</p>
                <pre className="bg-black/30 rounded-lg p-3 text-[10px] text-gray-400 overflow-x-auto font-mono leading-relaxed">
{JSON.stringify(currentSlide.constraints, null, 2)}
                </pre>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

// ── Sub Components ─────────────────────────────────────────────────────

function MiniSlidePreview({ slide }: { slide: SlideTemplate }) {
  if (slide.wireframe.layout === "centered") {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-1">
        {slide.wireframe.hasLogo && (
          <div className="w-4 h-4 rounded bg-white/10 absolute top-1.5 right-1.5" />
        )}
        <div className="w-3/4 h-1.5 bg-white/20 rounded-full" />
        <div className="w-1/2 h-1 bg-white/10 rounded-full" />
      </div>
    );
  }
  if (slide.wireframe.layout === "left-text") {
    return (
      <div className="h-full flex gap-1.5">
        <div className="flex-1 flex flex-col justify-center gap-1">
          <div className="w-full h-1.5 bg-white/20 rounded-full" />
          <div className="w-3/4 h-1 bg-white/10 rounded-full" />
          <div className="w-full h-1 bg-white/10 rounded-full" />
        </div>
        <div className="w-2/5 bg-white/5 rounded border border-dashed border-white/10 flex items-center justify-center">
          <Image className="w-3 h-3 text-white/20" />
        </div>
      </div>
    );
  }
  if (slide.wireframe.layout === "two-column") {
    return (
      <div className="h-full flex flex-col gap-1">
        <div className="w-2/3 h-1.5 bg-white/20 rounded-full" />
        <div className="flex-1 flex gap-1">
          <div className="flex-1 bg-white/5 rounded border border-white/10" />
          <div className="flex-1 bg-white/5 rounded border border-white/10" />
          <div className="flex-1 bg-white/5 rounded border border-white/10" />
        </div>
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col justify-center gap-1">
      <div className="w-2/3 h-1.5 bg-white/20 rounded-full" />
      <div className="w-full h-1 bg-white/10 rounded-full" />
    </div>
  );
}

function ConstraintBlock({
  label,
  icon,
  font,
  size,
  maxChars,
  currentText,
}: {
  label: string;
  icon: React.ReactNode;
  font: string;
  size: string;
  maxChars: number;
  currentText: string;
}) {
  const charCount = currentText.length;
  const isOver = charCount > maxChars;
  const percentage = Math.min((charCount / maxChars) * 100, 100);

  return (
    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-blue-400">{icon}</span>
          <span className="text-xs font-medium text-gray-300">{label}</span>
        </div>
        <span className={`text-[11px] font-mono ${isOver ? "text-red-400" : "text-gray-500"}`}>
          {charCount}/{maxChars}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-2">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            isOver ? "bg-red-500" : percentage > 80 ? "bg-amber-500" : "bg-blue-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="space-y-1.5 text-[11px] text-gray-500">
        <div className="flex justify-between">
          <span>Font</span>
          <span className="text-gray-400">{font}</span>
        </div>
        <div className="flex justify-between">
          <span>Size</span>
          <span className="text-gray-400">{size}</span>
        </div>
      </div>
    </div>
  );
}

function StoryboardView({
  slides,
  selectedSlide,
  onSelectSlide,
  showConstraints,
}: {
  slides: SlideTemplate[];
  selectedSlide: number;
  onSelectSlide: (i: number) => void;
  showConstraints: boolean;
}) {
  return (
    <motion.div
      key="storyboard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-2"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">Storyboard Overview</h2>
        <p className="text-sm text-gray-500">Click any slide to view wireframe or designed version</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {slides.map((slide, i) => (
          <motion.button
            key={slide.id}
            onClick={() => onSelectSlide(i)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`text-left rounded-2xl overflow-hidden border transition-all ${
              selectedSlide === i
                ? "border-blue-500/50 ring-2 ring-blue-500/20"
                : "border-white/10 hover:border-white/20"
            }`}
          >
            {/* Slide Preview */}
            <div className="aspect-[16/10] bg-white relative p-6 flex flex-col">
              {/* Slide number badge */}
              <div className="absolute top-2 left-2 text-[10px] font-mono bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                {i + 1}
              </div>

              {slide.wireframe.hasLogo && (
                <div className="absolute top-3 right-3 w-8 h-8 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <span className="text-[8px] text-gray-400">LOGO</span>
                </div>
              )}

              {slide.wireframe.layout === "centered" ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-2">
                  <div className="w-3/4 h-4 bg-gray-800 rounded" />
                  {slide.wireframe.subheading && <div className="w-1/2 h-2.5 bg-gray-300 rounded" />}
                </div>
              ) : slide.wireframe.layout === "left-text" ? (
                <div className="flex-1 flex gap-4">
                  <div className="flex-1 flex flex-col justify-center gap-2">
                    <div className="w-4/5 h-3.5 bg-gray-800 rounded" />
                    <div className="w-full h-2 bg-gray-200 rounded" />
                    <div className="w-3/4 h-2 bg-gray-200 rounded" />
                    <div className="w-full h-2 bg-gray-200 rounded" />
                  </div>
                  <div className="w-2/5 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <Image className="w-6 h-6 text-gray-300" />
                  </div>
                </div>
              ) : slide.wireframe.layout === "two-column" ? (
                <div className="flex-1 flex flex-col gap-2">
                  <div className="w-2/3 h-3.5 bg-gray-800 rounded" />
                  <div className="flex-1 flex gap-2 mt-1">
                    <div className="flex-1 bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center justify-center gap-1 p-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200" />
                      <div className="w-3/4 h-2 bg-gray-300 rounded" />
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center justify-center gap-1 p-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200" />
                      <div className="w-3/4 h-2 bg-gray-300 rounded" />
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center justify-center gap-1 p-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200" />
                      <div className="w-3/4 h-2 bg-gray-300 rounded" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col justify-center gap-2">
                  <div className="w-3/4 h-3.5 bg-gray-800 rounded" />
                  <div className="w-full h-2 bg-gray-200 rounded" />
                </div>
              )}

              {/* Char limit indicators */}
              {showConstraints && (
                <div className="absolute bottom-2 left-2 right-2 flex gap-1">
                  <span className="text-[8px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full font-mono">
                    H:{slide.constraints.heading.maxChars}
                  </span>
                  {slide.constraints.body && (
                    <span className="text-[8px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full font-mono">
                      B:{slide.constraints.body.maxChars}
                    </span>
                  )}
                  {slide.constraints.image && (
                    <span className="text-[8px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full font-mono">
                      IMG
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Slide info */}
            <div className="bg-[#151A2D] p-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-gray-300">{slide.name}</p>
                <span className="text-[10px] text-gray-600 uppercase">{slide.type}</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

function SlideDetailView({
  slide,
  mode,
  showConstraints,
  selectedVariant,
  onVariantChange,
  editingText,
  editValue,
  onEditValueChange,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  getDisplayText,
  customTexts,
}: {
  slide: SlideTemplate;
  mode: "wireframe" | "designed";
  showConstraints: boolean;
  selectedVariant: SlideVariant;
  onVariantChange: (v: SlideVariant) => void;
  editingText: string | null;
  editValue: string;
  onEditValueChange: (v: string) => void;
  onEdit: (slideId: string, field: string, text: string, maxChars: number) => void;
  onSaveEdit: (maxChars: number) => void;
  onCancelEdit: () => void;
  getDisplayText: (slideId: string, field: string, defaultText: string) => string;
  customTexts: Record<string, string>;
}) {
  const isWireframe = mode === "wireframe";
  const data = isWireframe ? slide.wireframe : slide.designed;
  const hasVariants = slide.id === "problem";
  const variants = variantExamples[slide.id];

  const currentVariant = hasVariants && variants
    ? variants[selectedVariant === "A" ? 0 : selectedVariant === "B" ? 1 : 2]
    : null;

  const heading = currentVariant
    ? currentVariant.heading
    : getDisplayText(slide.id, "heading", data.heading);
  const body = currentVariant
    ? currentVariant.body
    : data.body
    ? getDisplayText(slide.id, "body", data.body)
    : undefined;

  return (
    <motion.div
      key={`${slide.id}-${mode}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-2"
    >
      {/* Variant selector */}
      {hasVariants && (
        <div className="mb-4 flex items-center gap-3">
          <span className="text-sm text-gray-400">Variants:</span>
          {(["A", "B", "C"] as SlideVariant[]).map((v) => (
            <button
              key={v}
              onClick={() => onVariantChange(v)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedVariant === v
                  ? "bg-violet-500/20 text-violet-300 border border-violet-500/40"
                  : "bg-white/5 text-gray-500 border border-white/10 hover:bg-white/10"
              }`}
            >
              Variant {v}
            </button>
          ))}
          <span className="text-[11px] text-gray-600 ml-2">
            User picks 1 of 3 options per storyboard item
          </span>
        </div>
      )}

      {/* Main Slide Canvas */}
      <div
        className={`aspect-[16/10] rounded-2xl overflow-hidden border relative ${
          isWireframe
            ? "bg-white border-gray-200"
            : slide.designed.bgStyle === "gradient"
            ? "border-white/10"
            : "bg-white border-gray-100"
        }`}
        style={
          !isWireframe && slide.designed.bgStyle === "gradient"
            ? {
                background: `linear-gradient(135deg, ${slide.designed.accent}, ${slide.designed.accent}dd, #0B0F1A)`,
              }
            : undefined
        }
      >
        {/* Wireframe grid overlay */}
        {isWireframe && showConstraints && (
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "repeating-linear-gradient(0deg, #000 0px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, #000 0px, transparent 1px, transparent 20px)",
          }} />
        )}

        {/* Logo placeholder */}
        {slide.wireframe.hasLogo && (
          <div
            className={`absolute ${
              slide.constraints.logo?.position === "top-right" ? "top-6 right-6" : "bottom-6 right-6"
            }`}
          >
            {isWireframe ? (
              <div className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                <span className="text-xs text-gray-400 font-mono">LOGO</span>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <span className="text-sm font-bold text-white/80">NT</span>
              </div>
            )}
          </div>
        )}

        {/* Slide Content */}
        <div className={`h-full p-12 flex ${
          slide.wireframe.layout === "centered"
            ? "flex-col items-center justify-center text-center"
            : slide.wireframe.layout === "left-text"
            ? "items-center gap-8"
            : slide.wireframe.layout === "two-column"
            ? "flex-col"
            : "flex-col justify-center"
        }`}>
          {slide.wireframe.layout === "left-text" ? (
            <>
              <div className="flex-1 flex flex-col justify-center">
                <EditableText
                  text={heading}
                  isWireframe={isWireframe}
                  isEditing={editingText === `${slide.id}-heading`}
                  editValue={editValue}
                  maxChars={slide.constraints.heading.maxChars}
                  showConstraints={showConstraints}
                  onEdit={() =>
                    onEdit(slide.id, "heading", heading, slide.constraints.heading.maxChars)
                  }
                  onEditValueChange={onEditValueChange}
                  onSave={() => onSaveEdit(slide.constraints.heading.maxChars)}
                  onCancel={onCancelEdit}
                  className={
                    isWireframe
                      ? "text-3xl font-bold text-gray-800 mb-4"
                      : `text-3xl font-bold mb-4 ${
                          slide.designed.bgStyle === "gradient" ? "text-white" : "text-gray-900"
                        }`
                  }
                />
                {body && (
                  <EditableText
                    text={body}
                    isWireframe={isWireframe}
                    isEditing={editingText === `${slide.id}-body`}
                    editValue={editValue}
                    maxChars={slide.constraints.body?.maxChars || 200}
                    showConstraints={showConstraints}
                    onEdit={() =>
                      onEdit(slide.id, "body", body, slide.constraints.body?.maxChars || 200)
                    }
                    onEditValueChange={onEditValueChange}
                    onSave={() => onSaveEdit(slide.constraints.body?.maxChars || 200)}
                    onCancel={onCancelEdit}
                    className={
                      isWireframe
                        ? "text-base text-gray-500 leading-relaxed"
                        : `text-base leading-relaxed ${
                            slide.designed.bgStyle === "gradient" ? "text-white/80" : "text-gray-600"
                          }`
                    }
                  />
                )}
              </div>
              {/* Image area */}
              <div className="w-2/5 shrink-0">
                {isWireframe ? (
                  <div className="aspect-[4/3] rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 bg-gray-50">
                    <Image className="w-10 h-10 text-gray-300" />
                    <span className="text-xs text-gray-400 font-mono">
                      {slide.constraints.image?.size}
                    </span>
                    {showConstraints && (
                      <span className="text-[10px] bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
                        {slide.constraints.image?.position}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-violet-500 mx-auto mb-3 flex items-center justify-center">
                        <Sparkles className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-xs text-gray-400">Product Screenshot</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : slide.wireframe.layout === "two-column" ? (
            <>
              <EditableText
                text={heading}
                isWireframe={isWireframe}
                isEditing={editingText === `${slide.id}-heading`}
                editValue={editValue}
                maxChars={slide.constraints.heading.maxChars}
                showConstraints={showConstraints}
                onEdit={() =>
                  onEdit(slide.id, "heading", heading, slide.constraints.heading.maxChars)
                }
                onEditValueChange={onEditValueChange}
                onSave={() => onSaveEdit(slide.constraints.heading.maxChars)}
                onCancel={onCancelEdit}
                className={`text-3xl font-bold mb-6 ${isWireframe ? "text-gray-800" : "text-gray-900"}`}
              />
              {slide.wireframe.hasChart ? (
                <div className="flex-1 flex gap-4">
                  {isWireframe ? (
                    <>
                      <div className="flex-1 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 bg-gray-50">
                        <div className="flex items-end gap-1 h-16">
                          <div className="w-6 bg-gray-300 rounded-t h-8" />
                          <div className="w-6 bg-gray-300 rounded-t h-12" />
                          <div className="w-6 bg-gray-300 rounded-t h-16" />
                        </div>
                        <span className="text-xs text-gray-400">Chart / Visual</span>
                      </div>
                      <div className="flex-1 flex flex-col gap-3 justify-center">
                        <div className="w-full h-3 bg-gray-200 rounded" />
                        <div className="w-3/4 h-3 bg-gray-200 rounded" />
                        <div className="w-full h-3 bg-gray-200 rounded" />
                        <div className="w-1/2 h-3 bg-gray-200 rounded" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                        <div className="flex items-end gap-3 h-32">
                          {[40, 65, 100, 85, 45].map((h, i) => (
                            <div
                              key={i}
                              className="w-10 rounded-t-lg"
                              style={{
                                height: `${h}%`,
                                background: `linear-gradient(to top, ${slide.designed.accent}, ${slide.designed.accent}88)`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-center gap-4">
                        {(body || "").split(". ").map((line, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div
                              className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-white text-sm font-bold mt-0.5"
                              style={{ background: slide.designed.accent }}
                            >
                              {["$", "#", "%"][i] || "·"}
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">{line}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  {body && (
                    <p className={`text-lg text-center max-w-lg ${isWireframe ? "text-gray-500" : "text-gray-600"}`}>
                      {body}
                    </p>
                  )}
                </div>
              )}
            </>
          ) : (
            /* centered layout */
            <>
              <EditableText
                text={heading}
                isWireframe={isWireframe}
                isEditing={editingText === `${slide.id}-heading`}
                editValue={editValue}
                maxChars={slide.constraints.heading.maxChars}
                showConstraints={showConstraints}
                onEdit={() =>
                  onEdit(slide.id, "heading", heading, slide.constraints.heading.maxChars)
                }
                onEditValueChange={onEditValueChange}
                onSave={() => onSaveEdit(slide.constraints.heading.maxChars)}
                onCancel={onCancelEdit}
                className={`text-4xl font-bold mb-4 ${
                  isWireframe
                    ? "text-gray-800"
                    : slide.designed.bgStyle === "gradient"
                    ? "text-white"
                    : "text-gray-900"
                }`}
              />
              {"subheading" in data && data.subheading && (
                <EditableText
                  text={data.subheading}
                  isWireframe={isWireframe}
                  isEditing={editingText === `${slide.id}-subheading`}
                  editValue={editValue}
                  maxChars={slide.constraints.subheading?.maxChars || 60}
                  showConstraints={showConstraints}
                  onEdit={() =>
                    onEdit(
                      slide.id,
                      "subheading",
                      data.subheading!,
                      slide.constraints.subheading?.maxChars || 60
                    )
                  }
                  onEditValueChange={onEditValueChange}
                  onSave={() => onSaveEdit(slide.constraints.subheading?.maxChars || 60)}
                  onCancel={onCancelEdit}
                  className={`text-xl mb-4 ${
                    isWireframe
                      ? "text-gray-500"
                      : slide.designed.bgStyle === "gradient"
                      ? "text-white/70"
                      : "text-gray-500"
                  }`}
                />
              )}
              {body && (
                <EditableText
                  text={body}
                  isWireframe={isWireframe}
                  isEditing={editingText === `${slide.id}-body`}
                  editValue={editValue}
                  maxChars={slide.constraints.body?.maxChars || 150}
                  showConstraints={showConstraints}
                  onEdit={() =>
                    onEdit(slide.id, "body", body, slide.constraints.body?.maxChars || 150)
                  }
                  onEditValueChange={onEditValueChange}
                  onSave={() => onSaveEdit(slide.constraints.body?.maxChars || 150)}
                  onCancel={onCancelEdit}
                  className={`text-base max-w-lg ${
                    isWireframe
                      ? "text-gray-400"
                      : slide.designed.bgStyle === "gradient"
                      ? "text-white/60"
                      : "text-gray-500"
                  }`}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* Constraint summary bar below slide */}
      {showConstraints && (
        <div className="mt-4 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-center gap-4">
          <Lock className="w-4 h-4 text-amber-400 shrink-0" />
          <div className="flex items-center gap-4 text-xs text-amber-300/80 flex-wrap">
            <span>
              <strong className="text-amber-300">Font:</strong> {slide.constraints.heading.font}
            </span>
            <span>
              <strong className="text-amber-300">Size:</strong> {slide.constraints.heading.size}
            </span>
            <span>
              <strong className="text-amber-300">Heading limit:</strong>{" "}
              {slide.constraints.heading.maxChars} chars
            </span>
            {slide.constraints.body && (
              <span>
                <strong className="text-amber-300">Body limit:</strong>{" "}
                {slide.constraints.body.maxChars} chars
              </span>
            )}
            {slide.constraints.image && (
              <span>
                <strong className="text-amber-300">Image:</strong>{" "}
                {slide.constraints.image.size} @ {slide.constraints.image.position}
              </span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function EditableText({
  text,
  isWireframe,
  isEditing,
  editValue,
  maxChars,
  showConstraints,
  onEdit,
  onEditValueChange,
  onSave,
  onCancel,
  className,
}: {
  text: string;
  isWireframe: boolean;
  isEditing: boolean;
  editValue: string;
  maxChars: number;
  showConstraints: boolean;
  onEdit: () => void;
  onEditValueChange: (v: string) => void;
  onSave: () => void;
  onCancel: () => void;
  className: string;
}) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isOver = editValue.length > maxChars;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  if (isEditing) {
    return (
      <div className="relative w-full max-w-xl">
        <textarea
          ref={inputRef}
          value={editValue}
          onChange={(e) => onEditValueChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSave();
            }
            if (e.key === "Escape") onCancel();
          }}
          className={`w-full bg-white/10 border rounded-lg p-3 text-white resize-none outline-none ${
            isOver ? "border-red-500" : "border-blue-500"
          }`}
          rows={2}
        />
        <div className="flex items-center justify-between mt-1.5">
          <span className={`text-xs font-mono ${isOver ? "text-red-400" : "text-gray-500"}`}>
            {editValue.length}/{maxChars}
            {isOver && " — over limit!"}
          </span>
          <div className="flex gap-2">
            <button onClick={onCancel} className="text-xs text-gray-500 hover:text-gray-300">
              Esc
            </button>
            <button
              onClick={onSave}
              className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative cursor-pointer" onClick={onEdit}>
      <p className={className}>
        {isWireframe ? (
          <span className="border-b-2 border-dashed border-gray-300">{text}</span>
        ) : (
          text
        )}
      </p>
      <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Pencil className="w-3.5 h-3.5 text-blue-400" />
      </div>
      {showConstraints && (
        <span className="absolute -bottom-4 left-0 text-[9px] font-mono text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
          {text.length}/{maxChars} chars
        </span>
      )}
    </div>
  );
}

function GeneratingView({ step }: { step: number }) {
  const steps = [
    "Analyzing business context...",
    "Selecting slide templates...",
    "Generating headlines (char limits enforced)...",
    "Creating content variants...",
    "Applying brand styles...",
    "Building storyboard...",
  ];

  return (
    <motion.div
      key="generating"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center h-full min-h-[400px]"
    >
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4"
          >
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Wand2 className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          <h2 className="text-xl font-bold text-white mb-2">Generating Your Deck</h2>
          <p className="text-sm text-gray-500">AI is building your investor pitch deck...</p>
        </div>

        <div className="space-y-3">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: i <= step ? 1 : 0.3, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3"
            >
              {i < step ? (
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
              ) : i === step ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <RotateCcw className="w-5 h-5 text-blue-400 shrink-0" />
                </motion.div>
              ) : (
                <div className="w-5 h-5 rounded-full border border-white/20 shrink-0" />
              )}
              <span className={`text-sm ${i <= step ? "text-gray-300" : "text-gray-600"}`}>
                {s}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-8 h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(step / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
