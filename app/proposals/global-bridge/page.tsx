"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Database,
  FolderOpen,
  Calendar,
  AlertTriangle,
  Lock,
  LayoutDashboard,
  Bell,
  Shield,
  Smartphone,
  Clock,
  FileText,
  Headphones,
  ExternalLink,
  ChevronRight,
  ArrowDown,
  Zap,
  Eye,
  Package,
  DollarSign,
  Settings,
  Building2,
  Mail,
  MessageCircle,
  Server,
  Cloud,
  Palette,
  Layout,
  CheckCircle,
  Layers,
  File,
} from "lucide-react";
import { proposalData } from "@/data/proposals/global-bridge-proposal";

const sections = [
  { id: "hero", label: "Обзор" },
  { id: "problem", label: "Проблема" },
  { id: "capabilities", label: "Возможности" },
  { id: "architecture", label: "Архитектура" },
  { id: "notifications", label: "Уведомления" },
  { id: "data-flow", label: "Как работает" },
  { id: "milestone-1", label: "Milestone 1" },
  { id: "milestone-2", label: "Milestone 2" },
  { id: "pricing", label: "Стоимость" },
  { id: "timeline", label: "Сроки" },
  { id: "call-notes", label: "Заметки" },
];

const iconMap: Record<string, React.ElementType> = {
  "folder-open": FolderOpen,
  calendar: Calendar,
  "alert-triangle": AlertTriangle,
  lock: Lock,
  "layout-dashboard": LayoutDashboard,
  bell: Bell,
  shield: Shield,
  smartphone: Smartphone,
  database: Database,
  clock: Clock,
  "file-text": FileText,
  settings: Settings,
  building: Building2,
  mail: Mail,
  "message-circle": MessageCircle,
  layout: Layout,
  palette: Palette,
  file: File,
};

const STORAGE_KEY = "global-bridge-call-notes";

export default function GlobalBridgeProposalPage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Load answers from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setAnswers(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved answers", e);
      }
    }
  }, []);

  // Save answers to localStorage on change
  const handleAnswerChange = useCallback((questionId: string, value: string) => {
    setAnswers((prev) => {
      const updated = { ...prev, [questionId]: value };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(section.id);
              }
            });
          },
          { threshold: 0.3, rootMargin: "-10% 0px -10% 0px" }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF9] relative">
      {/* Navigation Sidebar */}
      <motion.nav
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-3"
      >
        {sections.map((section) => (
          <button
            type="button"
            key={section.id}
            onClick={() => handleNavigate(section.id)}
            className="group relative flex items-center gap-3"
          >
            <span
              className={`text-xs font-medium transition-all ${
                activeSection === section.id
                  ? "text-[#1a1a1a] opacity-100"
                  : "text-gray-400 opacity-0 group-hover:opacity-100"
              }`}
            >
              {section.label}
            </span>
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-[#2563EB] scale-125 ring-2 ring-[#2563EB]/30 ring-offset-2"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          </button>
        ))}
      </motion.nav>

      <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Link
            href="/"
            className="text-xl font-bold text-[#1a1a1a] hover:text-[#2563EB] transition-colors"
          >
            AutoFlux
          </Link>
          <span className="text-sm text-gray-500">
            for {proposalData.client.name} &middot; {proposalData.client.location}
          </span>
        </motion.header>

        {/* Hero Section */}
        <motion.section
          id="hero"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-3xl p-8 md:p-12 mb-8 text-white relative overflow-hidden scroll-mt-8"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB] opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-[#10B981] opacity-15 rounded-full blur-3xl translate-y-1/2" />

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-white/10 px-4 py-2 rounded-full">
              <Building2 className="w-3.5 h-3.5" />
              {proposalData.client.name}
            </span>
            <span className="inline-block text-xs font-bold uppercase tracking-widest bg-[#2563EB] px-4 py-2 rounded-full">
              Фикс-прайс MVP
            </span>
            <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest bg-[#10B981] px-4 py-2 rounded-full">
              ${proposalData.pricing.total.toLocaleString()}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 max-w-2xl">
            {proposalData.project.title}
          </h1>

          <p className="text-xl text-white/60 font-medium mb-2">
            {proposalData.project.subtitle}
          </p>

          <p className="text-lg text-white/80 max-w-xl mb-8">
            {proposalData.project.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleNavigate("pricing")}
              className="inline-flex items-center gap-2 bg-white text-[#1a1a1a] px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
            >
              Смотреть стоимость
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/proposals/global-bridge/demo"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors"
            >
              Интерактивное демо
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

        </motion.section>

        {/* The Problem Section */}
        <motion.section
          id="problem"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 scroll-mt-8"
        >
          <div className="bg-red-50 border border-red-100 rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#1a1a1a]">Проблема сегодня</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {proposalData.painPoints.map((point, index) => {
                const Icon = iconMap[point.icon] || AlertTriangle;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-5 border border-red-100"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1a1a1a] mb-1">{point.title}</h3>
                        <p className="text-sm text-gray-600">{point.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Arrow Down */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <ArrowDown className="w-5 h-5 text-gray-400" />
          </div>
        </motion.div>

        {/* Capabilities Section */}
        <motion.section
          id="capabilities"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 scroll-mt-8"
        >
          <div className="bg-green-50 border border-green-100 rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#1a1a1a]">{proposalData.capabilities.title}</h2>
                <p className="text-sm text-gray-600">{proposalData.capabilities.subtitle}</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* For Clients */}
              <div className="bg-white rounded-2xl p-6 border border-green-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <LayoutDashboard className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-[#1a1a1a]">{proposalData.capabilities.forClients.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {proposalData.capabilities.forClients.items.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-2.5 text-sm text-gray-700"
                    >
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* For Admin */}
              <div className="bg-white rounded-2xl p-6 border border-green-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Settings className="w-4 h-4 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-[#1a1a1a]">{proposalData.capabilities.forAdmin.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {proposalData.capabilities.forAdmin.items.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-2.5 text-sm text-gray-700"
                    >
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Security */}
            <div className="mt-6 bg-white rounded-2xl p-6 border border-green-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="font-bold text-[#1a1a1a]">{proposalData.capabilities.security.title}</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-2.5">
                {proposalData.capabilities.security.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-2.5 text-sm text-gray-700"
                  >
                    <Lock className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Security Highlight */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 opacity-10 rounded-full blur-3xl" />
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">{proposalData.securityHighlight.title}</h3>
                <p className="text-white/80 leading-relaxed">
                  {proposalData.securityHighlight.message}
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Architecture Section */}
        <motion.section
          id="architecture"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 scroll-mt-8"
        >
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#2563EB]/10 rounded-xl flex items-center justify-center">
                <Layers className="w-5 h-5 text-[#2563EB]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#1a1a1a]">Техническая архитектура</h2>
                <p className="text-sm text-gray-500">Почему каждый слой важен</p>
              </div>
            </div>

            {/* Architecture Diagram */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 md:p-8 mb-8">
              <div className="flex flex-col gap-4">
                {/* Top Layer - User Interfaces */}
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex-1 max-w-[200px] mx-auto md:mx-0"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <LayoutDashboard className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-semibold text-sm">Портал клиента</span>
                    </div>
                    <p className="text-xs text-gray-500">Объекты, документы, дедлайны</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex-1 max-w-[200px] mx-auto md:mx-0"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Settings className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="font-semibold text-sm">Админ-панель</span>
                    </div>
                    <p className="text-xs text-gray-500">Управление клиентами, загрузка документов</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex-1 max-w-[200px] mx-auto md:mx-0"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-semibold text-sm">Мобильное PWA</span>
                    </div>
                    <p className="text-xs text-gray-500">Установка на главный экран</p>
                  </motion.div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-slate-300" />
                </div>

                {/* Middle Layer - Next.js App */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] rounded-2xl p-6 text-white max-w-[400px] mx-auto w-full"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold">Приложение Next.js 14</h3>
                      <p className="text-xs text-white/70">React + Server Components</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-white/10 px-2 py-1 rounded">Tailwind CSS</span>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded">shadcn/ui</span>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded">TypeScript</span>
                  </div>
                </motion.div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-slate-300" />
                </div>

                {/* Bottom Layer - Supabase */}
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 text-white flex-1 max-w-[150px] mx-auto md:mx-0"
                  >
                    <Lock className="w-5 h-5 mb-2" />
                    <p className="font-semibold text-sm">Авторизация</p>
                    <p className="text-xs text-white/70">Supabase Auth</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 text-white flex-1 max-w-[150px] mx-auto md:mx-0"
                  >
                    <Database className="w-5 h-5 mb-2" />
                    <p className="font-semibold text-sm">База данных</p>
                    <p className="text-xs text-white/70">PostgreSQL</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 text-white flex-1 max-w-[150px] mx-auto md:mx-0"
                  >
                    <FileText className="w-5 h-5 mb-2" />
                    <p className="font-semibold text-sm">Хранилище</p>
                    <p className="text-xs text-white/70">PDF-документы</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-4 text-white flex-1 max-w-[150px] mx-auto md:mx-0"
                  >
                    <Clock className="w-5 h-5 mb-2" />
                    <p className="font-semibold text-sm">Cron-задачи</p>
                    <p className="text-xs text-white/70">Движок дедлайнов</p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Tech Stack Details */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {proposalData.architecture.layers.map((layer, index) => {
                const Icon = iconMap[layer.icon] || Database;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-slate-50 rounded-xl p-5 border border-slate-100"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#2563EB]/10 rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#2563EB]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1a1a1a]">{layer.name}</h3>
                        <p className="text-xs text-[#2563EB] font-medium">{layer.tech}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{layer.description}</p>
                    <p className="text-xs text-gray-400">
                      <span className="font-medium text-gray-500">Почему:</span> {layer.why}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Notifications Section */}
        <motion.section
          id="notifications"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 scroll-mt-8"
        >
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#1a1a1a]">Notification Channels</h2>
                <p className="text-sm text-gray-500">Webhook-based — plug in any channel later</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 font-semibold text-gray-500">Канал</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-500">Сервис</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-500">Статус</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-500">Стоимость</th>
                  </tr>
                </thead>
                <tbody>
                  {proposalData.architecture.notifications.options.map((option, index) => {
                    const Icon = iconMap[option.icon] || Mail;
                    const isPhase1 = option.status.includes("MVP");
                    return (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-gray-50 hover:bg-gray-50"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{option.channel}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{option.service}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                              isPhase1
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {isPhase1 && <Check className="w-3 h-3" />}
                            {option.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{option.cost}</td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#1a1a1a] mb-1">Опции WhatsApp</h4>
                  <p className="text-sm text-gray-600">
                    <strong>Twilio WhatsApp API:</strong> Не требует одобрения Meta, работает за 1-2 дня.
                    <br />
                    <strong>Meta Business API:</strong> Официальный API, требует верификацию бизнеса (1-2 недели).
                    <br />
                    Оба варианта можно добавить в Фазе 2 без перестройки системы уведомлений.
                  </p>
                </div>
              </div>
            </div>

            {/* Hosting Options */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="font-semibold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Server className="w-4 h-4 text-gray-400" />
                Варианты хостинга
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {proposalData.architecture.hosting.options.map((option, index) => (
                  <div
                    key={index}
                    className={`rounded-xl p-5 border ${
                      index === 0
                        ? "bg-blue-50 border-blue-100"
                        : "bg-gray-50 border-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {index === 0 ? (
                        <Cloud className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Server className="w-5 h-5 text-gray-600" />
                      )}
                      <h4 className="font-semibold text-[#1a1a1a]">{option.name}</h4>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{option.services}</p>
                    <p className="text-lg font-bold text-[#1a1a1a] mb-3">{option.cost}</p>
                    <div className="space-y-1">
                      {option.pros.map((pro, i) => (
                        <p key={i} className="text-xs text-green-600 flex items-center gap-1">
                          <Check className="w-3 h-3" /> {pro}
                        </p>
                      ))}
                      {option.cons.map((con, i) => (
                        <p key={i} className="text-xs text-gray-400">
                          — {con}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4 text-center">
                <strong>Рекомендация:</strong> {proposalData.architecture.hosting.recommendation}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Data Flow Section */}
        <motion.section
          id="data-flow"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 scroll-mt-8"
        >
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#2563EB]/10 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#2563EB]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1a1a1a]">Как это работает</h2>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-4">
              {/* Admin Inputs */}
              <div className="flex-1 w-full">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 text-center lg:text-left">
                  Ввод админа
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {proposalData.dataFlow.sources.map((source, index) => {
                    const Icon = iconMap[source.icon] || Database;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                      >
                        <Icon className="w-5 h-5 text-[#2563EB] mb-2" />
                        <p className="font-semibold text-sm text-[#1a1a1a]">{source.name}</p>
                        <p className="text-xs text-gray-500">{source.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="w-16 h-16 bg-[#2563EB] rounded-2xl flex items-center justify-center rotate-90 lg:rotate-0"
                >
                  <ArrowRight className="w-6 h-6 text-white" />
                </motion.div>
              </div>

              {/* Central DB */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex-shrink-0"
              >
                <div className="w-28 h-28 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-2xl flex flex-col items-center justify-center text-white shadow-lg shadow-[#2563EB]/20">
                  <Database className="w-8 h-8 mb-1" />
                  <p className="text-xs font-semibold">PostgreSQL</p>
                  <p className="text-[10px] opacity-70">+ RLS</p>
                </div>
              </motion.div>

              {/* Arrow */}
              <div className="flex-shrink-0">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="w-16 h-16 bg-[#10B981] rounded-2xl flex items-center justify-center rotate-90 lg:rotate-0"
                >
                  <ArrowRight className="w-6 h-6 text-white" />
                </motion.div>
              </div>

              {/* Client Outputs */}
              <div className="flex-1 w-full">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 text-center lg:text-right">
                  Клиент видит
                </p>
                <div className="space-y-2">
                  {proposalData.dataFlow.outputs.map((output, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      className="bg-green-50 rounded-xl px-4 py-2.5 border border-green-100 flex items-center gap-3"
                    >
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm text-[#1a1a1a]">{output.name}</p>
                        <p className="text-xs text-gray-500">{output.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Milestones */}
        {proposalData.milestones.map((milestone) => (
          <motion.section
            key={milestone.number}
            id={`milestone-${milestone.number}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 scroll-mt-8"
          >
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
              {/* Milestone Header */}
              <div className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] p-6 text-white">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl font-bold">
                      {milestone.number}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{milestone.title}</h2>
                      <p className="text-white/70 text-sm">{milestone.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold">${milestone.price}</p>
                      <p className="text-white/70 text-sm">{milestone.duration}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                {/* Pain Solved */}
                <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Решённая проблема:</span>
                    <span>{milestone.painSolved}</span>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Deliverables */}
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a] mb-4 flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#2563EB]" />
                      Что будет сделано
                    </h3>
                    <ul className="space-y-2">
                      {milestone.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What You See */}
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a] mb-4 flex items-center gap-2">
                      <Eye className="w-4 h-4 text-[#2563EB]" />
                      Что вы увидите
                    </h3>
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                      <h4 className="font-semibold text-[#1a1a1a] mb-2">
                        {milestone.whatYouSee.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        {milestone.whatYouSee.description}
                      </p>
                      <ul className="space-y-2">
                        {milestone.whatYouSee.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm text-gray-700"
                          >
                            <ChevronRight className="w-3 h-3 text-[#2563EB]" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Definition of Done */}
                <div className="mt-6 bg-[#2563EB]/5 border border-[#2563EB]/10 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-[#1a1a1a] mb-1">Критерий готовности</h4>
                      <p className="text-sm text-gray-600">{milestone.definitionOfDone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        ))}

        {/* Pricing Summary */}
        <motion.section
          id="pricing"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 scroll-mt-8"
        >
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-3xl p-8 md:p-10 text-white">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold">Стоимость</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {proposalData.pricing.milestones.map((m) => (
                <div
                  key={m.number}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center text-sm font-bold">
                      {m.number}
                    </div>
                    <span className="font-semibold">{m.name}</span>
                  </div>
                  <p className="text-2xl font-bold mb-1">${m.price}</p>
                  <p className="text-sm text-white/60">{m.duration}</p>
                  <p className="text-xs text-white/40 mt-2">{m.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#10B981] rounded-2xl p-6 flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm font-medium text-white/80 mb-1">Итого фикс-прайс</p>
                <p className="text-4xl font-bold">${proposalData.pricing.total.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/80">Срок: {proposalData.pricing.totalDuration}</p>
                <p className="text-sm text-white/80">Оплата по milestones</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Monthly Costs */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="bg-amber-50 border border-amber-100 rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#1a1a1a]">Текущие расходы (После сдачи)</h2>
                <p className="text-sm text-gray-600">Вы платите напрямую провайдерам</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {proposalData.monthlyCosts.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-5 border border-amber-100"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2">
                    {item.provider}
                  </p>
                  <h3 className="font-semibold text-[#1a1a1a] mb-1">{item.name}</h3>
                  <p className="text-2xl font-bold text-[#1a1a1a] mb-2">{item.cost}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-4 border border-amber-100 flex items-center justify-between">
              <span className="font-medium text-gray-600">Примерная сумма в месяц</span>
              <span className="text-xl font-bold text-[#1a1a1a]">{proposalData.monthlyCosts.total}</span>
            </div>
          </div>
        </motion.section>

        {/* Phase 2 Options */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="bg-purple-50 border border-purple-100 rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#1a1a1a]">{proposalData.niceToHave.title}</h2>
                <p className="text-sm text-gray-600">Можно добавить после запуска MVP</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {proposalData.niceToHave.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-5 border border-purple-100 flex items-start justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a] mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <span className="text-sm font-bold text-purple-600 whitespace-nowrap ml-4">
                    {item.estimate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section
          id="timeline"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 scroll-mt-8"
        >
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#2563EB]/10 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#2563EB]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#1a1a1a]">Сроки: {proposalData.timeline.total}</h2>
                <p className="text-sm text-gray-500">Конкретные сроки, не расплывчатые оценки</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {proposalData.timeline.breakdown.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="relative"
                >
                  <div
                    className={`rounded-xl p-3 border h-full ${
                      phase.milestone === 1
                        ? "bg-blue-50 border-blue-100"
                        : "bg-green-50 border-green-100"
                    }`}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                      {phase.days}
                    </p>
                    <p className="font-semibold text-xs text-[#1a1a1a] mb-0.5">{phase.focus}</p>
                    <p className="text-[10px] text-gray-500">{phase.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Support */}
            <div className="mt-8 bg-green-50 border border-green-100 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Headphones className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a1a1a] mb-2">
                    {proposalData.support.included}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                        Включено
                      </p>
                      <ul className="space-y-1">
                        {proposalData.support.covers.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <Check className="w-3 h-3 text-green-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                        Не включено (оценивается отдельно)
                      </p>
                      <ul className="space-y-1">
                        {proposalData.support.notIncluded.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="w-3 h-3 flex items-center justify-center">—</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Call Notes Section */}
        <motion.section
          id="call-notes"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 scroll-mt-8"
        >
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#1a1a1a]">Вопросы для звонка</h2>
                <p className="text-sm text-gray-500">Заметки сохраняются автоматически</p>
              </div>
            </div>

            {(() => {
              const categories = [...new Set(proposalData.callQuestions.map(q => q.category))];
              return categories.map((category, catIndex) => (
                <div key={category} className={catIndex > 0 ? "mt-8 pt-8 border-t border-gray-100" : ""}>
                  <h3 className="font-semibold text-[#1a1a1a] mb-4 text-sm uppercase tracking-wider">
                    {category}
                  </h3>
                  <div className="space-y-4">
                    {proposalData.callQuestions
                      .filter(q => q.category === category)
                      .map((q, index) => (
                        <div key={q.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                          <label className="block">
                            <span className="text-sm font-medium text-[#1a1a1a] block mb-1">
                              {index + 1}. {q.question}
                            </span>
                            {q.hint && (
                              <span className="text-xs text-gray-400 block mb-2">{q.hint}</span>
                            )}
                            <textarea
                              value={answers[q.id] || ""}
                              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                              placeholder="Ответ..."
                              className="w-full mt-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] resize-none min-h-[60px]"
                              rows={2}
                            />
                          </label>
                        </div>
                      ))}
                  </div>
                </div>
              ));
            })()}

            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="font-semibold text-[#1a1a1a] mb-4 text-sm uppercase tracking-wider">
                Дополнительные заметки
              </h3>
              <textarea
                value={answers["additional-notes"] || ""}
                onChange={(e) => handleAnswerChange("additional-notes", e.target.value)}
                placeholder="Любые другие заметки со звонка..."
                className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] resize-none min-h-[120px]"
                rows={4}
              />
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="text-center py-8 text-sm text-gray-400">
          <p>
            Подготовлено{" "}
            <Link href="/" className="text-[#2563EB] hover:underline">
              AutoFlux
            </Link>{" "}
            для {proposalData.client.name}
          </p>
          <p className="mt-1">Март 2026</p>
        </footer>
      </div>
    </div>
  );
}
