import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white selection:bg-white selection:text-black">
      {/* Background Matrix Effect (Subtle radial gradient for visual depth) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_60%)] pointer-events-none" />

      <div className="container relative z-10 flex flex-col items-center justify-center gap-12 px-4 py-16 max-w-4xl">

        {/* SECTION 1: THE CORE BRAND ANCHOR */}
        <div className="flex flex-col items-center gap-3 select-none animate-fade-in">
          <svg
            className="h-10 w-10 text-white opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {/* The Aspis (Shield Perimeter) */}
            <circle cx="12" cy="12" r="8" />
            {/* The Sarissa (Executing Pike) */}
            <path d="M12 2v20" />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground/50 font-bold mt-1">
            System Node Alpha
          </span>
        </div>

        {/* SECTION 2: THE HERO CONTENT MATRIX */}
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="font-mono text-5xl font-black tracking-[0.25em] sm:text-7xl uppercase text-white drop-shadow-sm">
            Phalanx
          </h1>

          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-border to-transparent" />

          <p className="text-sm sm:text-base font-mono text-muted-foreground/80 max-w-2xl leading-relaxed tracking-wide">
            Orchestrate complex development cycles with zero-trust multi-tenant isolation,
            real-time workspace presence, and high-velocity process node telemetry. Built
            for engineering teams who treat execution as a single, unbroken frontline.
          </p>
        </div>

        {/* SECTION 3: SYSTEM INITIALIZATION TERMINAL CATCH */}
        <div className="flex flex-col items-center gap-3 mt-4">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="font-mono text-xs uppercase tracking-[0.2em] font-bold px-8 py-6 bg-white text-black hover:bg-neutral-200 border border-transparent rounded-none transition-all duration-300 hover:tracking-[0.25em] active:scale-[0.98]"
            >
              Initialize System Console
            </Button>
          </Link>
          {/* Live Monospace Terminal Status Flag */}
          <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] text-neutral-500 uppercase select-none pl-1">
            {/* Pulsing Status Core */}
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span>Status: Operational // Core_Ready</span>
          </div>
        </div>

        {/* SECTION 4: HORIZONTAL SYSTEM SPECIFICATION GRID */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-px bg-border/20 border border-border/20 mt-12 font-mono text-xs rounded-sm overflow-hidden bg-neutral-950/50 backdrop-blur-sm">

          {/* Pillar 1: Isolation */}
          <div className="p-6 flex flex-col gap-2">
            <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
              [ 01 // Isolation ]
            </div>
            <div className="font-bold text-neutral-200">Clerk Multi-Tenant Perimeters</div>
            <p className="text-[11px] text-muted-foreground/60 leading-normal">
              Strict organization workspace shielding hooks integrated directly into Next.js middleware router boundaries. Zero structural data leaks.
            </p>
          </div>

          {/* Pillar 2: Telemetry */}
          <div className="p-6 flex flex-col gap-2 border-t sm:border-t-0 sm:border-x border-border/20">
            <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
              [ 02 // Telemetry ]
            </div>
            <div className="font-bold text-neutral-200">Pusher Real-Time Streams</div>
            <p className="text-[11px] text-muted-foreground/60 leading-normal">
              Continuous live WebSocket synchronization driving distributed task card updates, workspace state variations, and active user grids instantly.
            </p>
          </div>

          {/* Pillar 3: Persistence */}
          <div className="p-6 flex flex-col gap-2 border-t sm:border-t-0">
            <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
              [ 03 // Persistence ]
            </div>
            <div className="font-bold text-neutral-200">Neon Serverless PostgreSQL</div>
            <p className="text-[11px] text-muted-foreground/60 leading-normal">
              Edge-accelerated database transactions executed through type-safe Drizzle ORM schema layers for ultra-low latency data pooling.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}