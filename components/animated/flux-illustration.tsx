"use client";

import { useEffect, useRef } from "react";

export function FluxIllustration({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={`flux-illustration relative w-full max-w-[500px] aspect-square ${className}`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[70%] h-[70%] rounded-full bg-[var(--bg-light)] opacity-60" />
      </div>

      {/* Orbital rings */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        {/* Outer orbit path */}
        <ellipse
          cx="200"
          cy="200"
          rx="170"
          ry="170"
          fill="none"
          stroke="var(--border-light)"
          strokeWidth="1"
          strokeDasharray="8 8"
          className="animate-spin-slow"
          style={{ transformOrigin: "center" }}
        />
        {/* Middle orbit path */}
        <ellipse
          cx="200"
          cy="200"
          rx="130"
          ry="130"
          fill="none"
          stroke="var(--border-light)"
          strokeWidth="1"
          strokeDasharray="4 6"
          className="animate-spin-reverse"
          style={{ transformOrigin: "center" }}
        />
        {/* Inner orbit path */}
        <ellipse
          cx="200"
          cy="200"
          rx="90"
          ry="90"
          fill="none"
          stroke="var(--border-medium)"
          strokeWidth="1"
          className="animate-spin-slow"
          style={{ transformOrigin: "center" }}
        />
      </svg>

      {/* Orbiting icons */}
      <div className="absolute inset-0">
        {/* Icon 1 - Top right orbit */}
        <div
          className="absolute w-12 h-12 animate-orbit-1"
          style={{ top: "10%", left: "50%" }}
        >
          <div className="w-full h-full bg-[var(--accent)] rounded-xl shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-[var(--primary)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>

        {/* Icon 2 - Left orbit */}
        <div
          className="absolute w-10 h-10 animate-orbit-2"
          style={{ top: "45%", left: "5%" }}
        >
          <div className="w-full h-full bg-white border-2 border-[var(--secondary)] rounded-xl shadow-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-[var(--secondary)]" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>

        {/* Icon 3 - Bottom orbit */}
        <div
          className="absolute w-11 h-11 animate-orbit-3"
          style={{ top: "75%", left: "70%" }}
        >
          <div className="w-full h-full bg-[var(--primary)] rounded-xl shadow-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M9 9h6M9 13h6M9 17h4"/>
            </svg>
          </div>
        </div>

        {/* Icon 4 - Right orbit */}
        <div
          className="absolute w-9 h-9 animate-orbit-4"
          style={{ top: "30%", left: "85%" }}
        >
          <div className="w-full h-full bg-white border-2 border-[var(--accent-dark)] rounded-full shadow-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-[var(--primary)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
        </div>

        {/* Icon 5 - Bottom left */}
        <div
          className="absolute w-8 h-8 animate-orbit-5"
          style={{ top: "80%", left: "20%" }}
        >
          <div className="w-full h-full bg-[var(--secondary)] rounded-lg shadow-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />
        <div className="particle particle-4" />
        <div className="particle particle-5" />
        <div className="particle particle-6" />
      </div>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.3"/>
          </linearGradient>
        </defs>
        <path
          d="M 80 160 Q 140 200 200 200"
          fill="none"
          stroke="url(#lineGradient1)"
          strokeWidth="2"
          strokeDasharray="6 4"
          className="animate-dash"
        />
        <path
          d="M 320 240 Q 260 200 200 200"
          fill="none"
          stroke="url(#lineGradient1)"
          strokeWidth="2"
          strokeDasharray="6 4"
          className="animate-dash-reverse"
        />
      </svg>

      {/* Central Flux Symbol */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-32 h-32 animate-pulse-subtle">
          {/* Glow behind symbol */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] rounded-full blur-xl opacity-30 animate-pulse-glow" />

          {/* Flux symbol container */}
          <div className="relative w-full h-full bg-white rounded-3xl shadow-2xl flex items-center justify-center border border-[var(--border-light)]">
            {/* Exact Flux logo SVG - two interlocking arrows */}
            <svg
              viewBox="0 0 100 100"
              className="w-[84px] h-[84px]"
            >
              {/* Top arrow pointing RIGHT */}
              <path
                d="M 43 0
                   L 43 20
                   L 75 20
                   L 75 10
                   L 101 27
                   L 75 44
                   L 75 34
                   L 61 34
                   Q 51 34, 47 44
                   L 47 52
                   L 33 52
                   L 33 42
                   Q 33 20, 57 20
                   L 43 20
                   Z"
                fill="#215CEC"
                className="flux-arrow-right"
              />
              {/* Bottom arrow pointing LEFT */}
              <path
                d="M 57 90
                   L 57 70
                   L 25 70
                   L 25 80
                   L -1 63
                   L 25 46
                   L 25 56
                   L 39 56
                   Q 49 56, 53 46
                   L 53 38
                   L 67 38
                   L 67 48
                   Q 67 70, 43 70
                   L 57 70
                   Z"
                fill="#215CEC"
                className="flux-arrow-left"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .flux-illustration {
          --orbit-duration: 20s;
        }

        @keyframes orbit-1 {
          0% { transform: rotate(0deg) translateX(150px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(150px) rotate(-360deg); }
        }
        @keyframes orbit-2 {
          0% { transform: rotate(90deg) translateX(130px) rotate(-90deg); }
          100% { transform: rotate(450deg) translateX(130px) rotate(-450deg); }
        }
        @keyframes orbit-3 {
          0% { transform: rotate(180deg) translateX(140px) rotate(-180deg); }
          100% { transform: rotate(540deg) translateX(140px) rotate(-540deg); }
        }
        @keyframes orbit-4 {
          0% { transform: rotate(270deg) translateX(120px) rotate(-270deg); }
          100% { transform: rotate(630deg) translateX(120px) rotate(-630deg); }
        }
        @keyframes orbit-5 {
          0% { transform: rotate(45deg) translateX(160px) rotate(-45deg); }
          100% { transform: rotate(405deg) translateX(160px) rotate(-405deg); }
        }

        .animate-orbit-1 {
          animation: orbit-1 25s linear infinite;
          transform-origin: 200px 200px;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -24px;
          margin-left: -24px;
        }
        .animate-orbit-2 {
          animation: orbit-2 30s linear infinite reverse;
          transform-origin: 200px 200px;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -20px;
          margin-left: -20px;
        }
        .animate-orbit-3 {
          animation: orbit-3 22s linear infinite;
          transform-origin: 200px 200px;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -22px;
          margin-left: -22px;
        }
        .animate-orbit-4 {
          animation: orbit-4 28s linear infinite reverse;
          transform-origin: 200px 200px;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -18px;
          margin-left: -18px;
        }
        .animate-orbit-5 {
          animation: orbit-5 35s linear infinite;
          transform-origin: 200px 200px;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -16px;
          margin-left: -16px;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 45s linear infinite;
        }

        @keyframes dash {
          to { stroke-dashoffset: -20; }
        }
        .animate-dash {
          animation: dash 1s linear infinite;
        }
        .animate-dash-reverse {
          animation: dash 1s linear infinite reverse;
        }

        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 4s ease-in-out infinite;
        }

        /* Flux arrows alternating fade */
        @keyframes flux-fade-1 {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes flux-fade-2 {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .flux-arrow-right {
          animation: flux-fade-1 3s ease-in-out infinite;
        }
        .flux-arrow-left {
          animation: flux-fade-2 3s ease-in-out infinite;
        }

        /* Particles */
        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.6;
        }
        .particle-1 {
          top: 20%;
          left: 30%;
          animation: float-1 8s ease-in-out infinite;
        }
        .particle-2 {
          top: 70%;
          left: 25%;
          width: 4px;
          height: 4px;
          background: var(--secondary);
          animation: float-2 10s ease-in-out infinite;
        }
        .particle-3 {
          top: 15%;
          left: 65%;
          width: 5px;
          height: 5px;
          animation: float-3 7s ease-in-out infinite;
        }
        .particle-4 {
          top: 60%;
          left: 80%;
          width: 4px;
          height: 4px;
          background: var(--secondary);
          animation: float-4 9s ease-in-out infinite;
        }
        .particle-5 {
          top: 85%;
          left: 50%;
          width: 3px;
          height: 3px;
          animation: float-5 11s ease-in-out infinite;
        }
        .particle-6 {
          top: 40%;
          left: 10%;
          width: 5px;
          height: 5px;
          background: var(--accent-dark);
          animation: float-6 12s ease-in-out infinite;
        }

        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(20px, 30px); }
          50% { transform: translate(-10px, 50px); }
          75% { transform: translate(30px, 20px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(40px, -20px); }
          66% { transform: translate(-20px, -40px); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 40px); }
        }
        @keyframes float-4 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-25px, 15px); }
          75% { transform: translate(15px, -25px); }
        }
        @keyframes float-5 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(20px, -30px); }
          66% { transform: translate(-30px, -10px); }
        }
        @keyframes float-6 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(35px, 25px); }
        }
      `}</style>
    </div>
  );
}
