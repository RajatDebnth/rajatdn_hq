"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { ProjectModal } from "@/components/works/project-modal";
import worksData from "@/content/works/works.json";
import type { WorkCategory, WorkItem } from "@/types/works";

type ActiveTab = "all" | WorkCategory;

const projects = worksData as WorkItem[];

function CardPreviewMedia({ type }: { type?: WorkItem["previewType"] }) {
  if (type === "landingvault" || type === "swish") {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-[#0f172a] via-[#0369a1] to-[#0284c7] flex flex-col items-center justify-center p-4 text-white shadow-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-xl font-black text-sky-300">✦</span>
          <span className="text-2xl sm:text-3xl font-black tracking-tight">landingvault</span>
        </div>
        <p className="mt-1 text-[0.625rem] sm:text-xs font-medium text-sky-100 uppercase tracking-widest">
          Reference Showcase Platform
        </p>
        <div className="mt-2.5 flex items-center gap-1.5">
          <span className="rounded-full bg-white/20 backdrop-blur-xs px-2 py-0.5 text-[0.5625rem] font-mono text-white">
            Hero Sections
          </span>
          <span className="rounded-full bg-white/20 backdrop-blur-xs px-2 py-0.5 text-[0.5625rem] font-mono text-white">
            Pricing Grids
          </span>
        </div>
      </div>
    );
  }

  if (type === "pencil-club" || type === "gravity") {
    return (
      <div className="relative w-full h-full bg-[#fefce8] border border-amber-200/70 flex flex-col items-center justify-center p-4 text-center shadow-xs">
        <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-widest text-amber-900/80">
          Tools for beautiful beginnings
        </span>
        <h4 className="mt-1 text-2xl sm:text-3xl font-black tracking-tight text-gray-900 leading-none">
          PENCIL CLUB
        </h4>
        <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-amber-100/90 border border-amber-300/60 px-2 py-0.5 font-mono text-[0.625rem] font-semibold text-amber-950">
          ✏️ No battery. Just ideas.
        </span>
      </div>
    );
  }

  if (type === "forma") {
    return (
      <div className="relative w-full h-full bg-[#121214] border border-zinc-800 flex flex-col items-center justify-center p-4 text-center shadow-xs">
        <span className="font-mono text-[0.625rem] font-medium tracking-widest text-zinc-400 uppercase">
          Asset Library Template
        </span>
        <h4 className="mt-1 text-2xl sm:text-3xl font-black tracking-widest text-zinc-100 uppercase">
          FORMA
        </h4>
        <div className="mt-2.5 flex items-center gap-1.5 flex-wrap justify-center">
          <span className="rounded-full bg-zinc-800/90 border border-zinc-700/80 px-2 py-0.5 font-mono text-[0.5625rem] text-zinc-300">
            3D &amp; Textures
          </span>
          <span className="rounded-full bg-zinc-800/90 border border-zinc-700/80 px-2 py-0.5 font-mono text-[0.5625rem] text-zinc-300">
            2,400+ Visuals
          </span>
        </div>
      </div>
    );
  }

  if (type === "goodfit") {
    return (
      <div className="relative w-full h-full bg-[#f8fafc] border border-slate-200/80 flex flex-col items-center justify-center p-3.5 text-center shadow-xs">
        <span className="font-mono text-[0.625rem] font-bold text-slate-500 uppercase tracking-wider">
          Talent Matching Template
        </span>
        <div className="mt-1.5 w-full max-w-[210px] rounded-md border border-slate-200 bg-white p-2 shadow-2xs text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 leading-tight">Aarav Mehta</span>
            <span className="rounded-full bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.2 text-[0.5625rem] font-mono font-bold text-emerald-700">
              98% Fit
            </span>
          </div>
          <span className="text-[0.625rem] text-slate-500 font-mono">Product Designer · Berlin</span>
        </div>
        <span className="mt-2 text-[0.625rem] font-medium text-slate-600">
          &ldquo;Build a team that clicks&rdquo;
        </span>
      </div>
    );
  }

  if (type === "signal-social") {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-[#1a0b2e] via-[#2d1254] to-[#4c1d95] p-4 flex flex-col items-center justify-center text-center text-white shadow-xs">
        <span className="font-mono text-[0.625rem] font-semibold text-violet-300 uppercase tracking-widest">
          Agency Template
        </span>
        <h4 className="mt-1 text-2xl sm:text-3xl font-black tracking-tight text-white leading-none">
          SIGNAL SOCIAL
        </h4>
        <div className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-white/10 backdrop-blur-xs border border-violet-400/30 px-2 py-0.5 font-mono text-[0.5625rem] text-violet-200">
          ⚡ 3.4x ROAS · +186% Growth
        </div>
      </div>
    );
  }

  if (type === "tonerd") {
    return (
      <div className="relative w-full h-full bg-[#0a0a0c] border border-zinc-800 p-3.5 flex flex-col items-center justify-center text-center text-white shadow-xs">
        <span className="font-mono text-[0.5625rem] font-semibold text-zinc-400 uppercase tracking-widest">
          Tailwind Micro-Animations
        </span>
        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="text-sm font-black tracking-tight text-white">ToneRD</span>
          <span className="rounded-full bg-zinc-800 border border-zinc-700 px-1.5 py-0.2 font-mono text-[0.5rem] text-zinc-300">
            npm i tonerd
          </span>
        </div>
        <div className="mt-2 inline-flex items-center gap-1 rounded border border-cyan-500/40 bg-cyan-950/40 px-2.5 py-1 text-[0.625rem] font-mono text-cyan-300 shadow-sm">
          <span>Button Animation</span>
          <span className="text-[0.6875rem]">✨</span>
        </div>
      </div>
    );
  }

  if (type === "taskflow") {
    return (
      <div className="relative w-full h-full bg-[#090d16] border border-blue-950/60 p-3.5 flex flex-col justify-center text-left text-white shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-blue-500" />
            <span className="text-xs font-bold tracking-tight text-white">TaskFlow</span>
          </div>
          <span className="font-mono text-[0.5625rem] text-blue-400 font-medium">3 of 4 Done</span>
        </div>
        <div className="mt-2 space-y-1 font-mono text-[0.625rem]">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span>✓</span>
            <span className="text-slate-300 line-through">Sprint Roadmap Setup</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span>✓</span>
            <span className="text-slate-300 line-through">Workflow Review</span>
          </div>
          <div className="flex items-center gap-1.5 text-blue-400">
            <span>●</span>
            <span className="text-white font-medium">Production Launch</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "news-assistant") {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-[#0c1824] via-[#102436] to-[#1e3a5f] p-3.5 flex flex-col justify-center text-left text-white shadow-xs">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.5625rem] font-semibold text-cyan-300 uppercase tracking-widest">
            Telegram AI Feed
          </span>
          <span className="rounded-full bg-cyan-950/80 border border-cyan-500/40 px-1.5 py-0.2 font-mono text-[0.5rem] text-cyan-300">
            Daily Cron
          </span>
        </div>
        <h4 className="mt-1 text-base sm:text-lg font-black tracking-tight text-white leading-tight">
          AI News Assistant
        </h4>
        <div className="mt-2 flex items-center gap-1.5 flex-wrap">
          <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.5625rem] text-slate-200">
            Google News RSS
          </span>
          <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.5625rem] text-slate-200">
            Gemini Flash
          </span>
        </div>
      </div>
    );
  }

  if (type === "rag-chatbot") {
    return (
      <div className="relative w-full h-full bg-[#0d1117] border border-indigo-950/70 p-3.5 flex flex-col justify-center text-left text-white shadow-xs">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.5625rem] font-semibold text-indigo-300 uppercase tracking-widest">
            Vector Retrieval RAG
          </span>
          <span className="rounded-full bg-emerald-950/70 border border-emerald-500/40 px-1.5 py-0.2 font-mono text-[0.5rem] font-bold text-emerald-400">
            0% Hallucination
          </span>
        </div>
        <h4 className="mt-1 text-base sm:text-lg font-black tracking-tight text-white leading-tight">
          Website Enquiry Bot
        </h4>
        <div className="mt-2 flex items-center gap-1.5 flex-wrap">
          <span className="rounded bg-indigo-950/80 border border-indigo-800/60 px-1.5 py-0.5 font-mono text-[0.5625rem] text-indigo-200">
            ChromaDB
          </span>
          <span className="rounded bg-indigo-950/80 border border-indigo-800/60 px-1.5 py-0.5 font-mono text-[0.5625rem] text-indigo-200">
            Domain Grounded
          </span>
        </div>
      </div>
    );
  }

  if (type === "excel-analyst") {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-[#062419] via-[#0d3829] to-[#124d38] p-3.5 flex flex-col justify-center text-left text-white shadow-xs">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.5625rem] font-semibold text-emerald-300 uppercase tracking-widest">
            Data Engineering + LLM
          </span>
          <span className="rounded-full bg-emerald-900/60 border border-emerald-400/40 px-1.5 py-0.2 font-mono text-[0.5rem] text-emerald-200">
            &lt;800 Tokens
          </span>
        </div>
        <h4 className="mt-1 text-base sm:text-lg font-black tracking-tight text-white leading-tight">
          AI Excel Analyst
        </h4>
        <div className="mt-2 flex items-center gap-1.5 flex-wrap">
          <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.5625rem] text-emerald-100">
            Pandas Cleaning
          </span>
          <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.5625rem] text-emerald-100">
            JSON Profiler
          </span>
        </div>
      </div>
    );
  }

  if (type === "fit") {
    return (
      <div className="relative w-full h-full bg-[#18181b] flex flex-col items-center justify-center p-4 text-white">
        <div className="rounded-lg border border-zinc-700 bg-zinc-900/90 px-3.5 py-2 text-center shadow-sm">
          <div className="flex items-center justify-center gap-1.5">
            <span className="size-2 rounded-full bg-pink-500" />
            <span className="font-mono text-xs font-bold text-pink-300">@yupcha/ui</span>
          </div>
          <p className="mt-1 text-[0.6875rem] text-zinc-300 font-medium">
            Accessible Design System
          </p>
        </div>
        <span className="mt-2.5 font-mono text-[0.5625rem] text-zinc-400 tracking-wider uppercase">
          Published to NPM Registry
        </span>
      </div>
    );
  }

  if (type === "checklist") {
    return (
      <div className="relative w-full h-full bg-white border border-gray-200/80 p-3.5 flex flex-col justify-center text-left">
        <span className="font-mono text-[0.625rem] font-bold text-gray-400 uppercase tracking-wider">
          Production RAG Pipeline
        </span>
        <ul className="mt-1.5 space-y-1 font-mono text-[0.625rem] text-gray-700">
          <li className="flex items-center gap-1.5">
            <span className="text-emerald-500 font-bold">✓</span> Vector Chunking &amp; Embeddings
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-emerald-500 font-bold">✓</span> Low-latency Context Retrieval
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-emerald-500 font-bold">✓</span> Grounded Citation Synthesis
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-emerald-500 font-bold">✓</span> FastAPI Container Deployment
          </li>
        </ul>
      </div>
    );
  }

  if (type === "stream") {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] p-3.5 flex flex-col justify-between text-left">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.625rem] font-bold text-emerald-400">
            ● Stream Active
          </span>
          <span className="font-mono text-[0.5625rem] text-gray-400">
            42.8k events/s
          </span>
        </div>
        <div className="flex items-end gap-1.5 h-10 px-1">
          <div className="w-1/6 bg-cyan-400/80 rounded-t h-[40%]" />
          <div className="w-1/6 bg-cyan-400/90 rounded-t h-[65%]" />
          <div className="w-1/6 bg-emerald-400 rounded-t h-[95%]" />
          <div className="w-1/6 bg-cyan-400 rounded-t h-[75%]" />
          <div className="w-1/6 bg-cyan-300 rounded-t h-[100%]" />
          <div className="w-1/6 bg-emerald-400/90 rounded-t h-[80%]" />
        </div>
        <span className="font-mono text-[0.5625rem] text-gray-300">
          Techno Electric Industrial Telemetry
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#1e1b4b] to-[#312e81] p-4 flex flex-col items-center justify-center text-center text-white">
      <span className="text-xl">🌐</span>
      <h5 className="mt-1 text-sm font-bold tracking-tight text-indigo-100">
        3,500+ Network Members
      </h5>
      <p className="mt-0.5 text-[0.625rem] text-indigo-300">
        Automated Daily Opportunity Feed
      </p>
      <span className="mt-2 rounded-full bg-indigo-500/30 px-2 py-0.5 font-mono text-[0.5625rem] text-indigo-200 border border-indigo-400/30">
        LinkedIn &amp; WhatsApp Pipelines
      </span>
    </div>
  );
}

export function WorksShowcase() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("all");
  const [selectedProject, setSelectedProject] = useState<WorkItem | null>(null);

  // Dynamically calculate category counts from works.json
  const tabs = useMemo(() => {
    return [
      { key: "all" as const, label: "All Works", count: projects.length },
      {
        key: "Design" as const,
        label: "Design",
        count: projects.filter((p) => p.category === "Design").length,
      },
      {
        key: "Solutions" as const,
        label: "Solutions",
        count: projects.filter((p) => p.category === "Solutions").length,
      },
      {
        key: "AI and Automation" as const,
        label: "AI and Automation",
        count: projects.filter((p) => p.category === "AI and Automation").length,
      },
    ];
  }, []);

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  return (
    <div className="w-full">
      {/* Top Dynamic Filter Tabs Bar */}
      <nav aria-label="Portfolio category filter" className="flex items-center justify-center">
        <ul className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <li key={tab.key}>
                <button
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "border border-pink-500 text-pink-600 bg-white shadow-xs"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/80"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[0.6875rem] font-bold ${
                      isActive
                        ? "bg-pink-500 text-white"
                        : "bg-gray-200/80 text-gray-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 3 Images in a Row Layout (Near in Width) with Click Popup Modal & Hover Blur */}
      <section aria-label="Featured Works" className="mt-8 sm:mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4 md:gap-4.5">
          {filteredProjects.map((project, index) => (
            <button
              type="button"
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative block w-full aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer shadow-xs hover:shadow-lg transition-all duration-300 border border-black/5 text-left p-0"
              aria-haspopup="dialog"
              aria-label={`View details for ${project.title}`}
            >
              {/* Preview Image: Real image or CSS fallback banner (blurs on hover) */}
              <div className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:scale-105 group-hover:blur-[2.5px]">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="object-cover object-top"
                    unoptimized
                    priority={index < 3}
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                ) : (
                  <CardPreviewMedia type={project.previewType} />
                )}
              </div>

              {/* Title & Quick View Overlay: Smoothly appears on hover */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                <h3 className="text-white font-bold text-base sm:text-lg leading-snug px-2 drop-shadow-sm">
                  {project.title}
                </h3>
                <span className="mt-1 text-[0.6875rem] font-mono text-white/80 uppercase tracking-wider">
                  {project.subtitle}
                </span>
                <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[0.6875rem] font-medium text-white backdrop-blur-xs transition-transform group-hover:scale-105">
                  View Breakdown ↗
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Accessible Project Breakdown Modal Popup */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
