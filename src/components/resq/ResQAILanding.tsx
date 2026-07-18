import { motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Activity, Radar, Ambulance, Bot, Route, HeartPulse,
  Shield, Users, Sparkles, Zap, MapPin, AlertTriangle,
  ArrowRight, Play, Building2, Stethoscope, Brain, Globe2,
  Languages, X, Check, Clock,
} from "lucide-react";
import Globe3D from "@/components/resq/Globe3D";
import TechOrb from "@/components/resq/TechOrb";
import ParticleField from "@/components/resq/ParticleField";
import { useCountUp, useInView } from "@/components/resq/hooks";

// ---------- Small building blocks ----------

function Chip({ children, tone = "cyan" }: { children: ReactNode; tone?: "cyan" | "alert" | "safe" }) {
  const color =
    tone === "alert" ? "text-destructive border-destructive/40 bg-destructive/10" :
    tone === "safe" ? "text-accent border-accent/40 bg-accent/10" :
    "text-primary border-primary/40 bg-primary/10";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-widest ${color}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${tone === "alert" ? "bg-destructive" : tone === "safe" ? "bg-accent" : "bg-primary"} animate-pulse`} />
      {children}
    </span>
  );
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Chip>{eyebrow}</Chip>
      <h2 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">{title}</h2>
      {sub && <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{sub}</p>}
    </div>
  );
}

// ---------- Nav ----------

function Nav({ onDemo }: { onDemo: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border" : ""}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg panel-cyan">
            <Shield className="h-4 w-4 text-primary" />
            <span className="absolute inset-0 rounded-lg glow-cyan opacity-60" />
          </div>
          <span className="font-display text-lg font-bold tracking-widest">RESQ<span className="text-primary">AI</span></span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#problem" className="hover:text-foreground transition">Problem</a>
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#users" className="hover:text-foreground transition">Who it serves</a>
          <a href="#tech" className="hover:text-foreground transition">Tech</a>
          <a href="#impact" className="hover:text-foreground transition">Impact</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="hidden items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground md:inline-flex">
            <Languages className="h-3.5 w-3.5" /> EN
          </button>
          <button onClick={onDemo} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground glow-cyan transition hover:brightness-110">
            Launch App
          </button>
        </div>
      </div>
    </header>
  );
}

// ---------- Hero ----------

function Hero({ onDemo }: { onDemo: () => void }) {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-24">
      <div className="absolute inset-0 grid-lines opacity-40" />
      <div className="pointer-events-none absolute inset-0">
        <ParticleField />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-20 pt-6 lg:grid-cols-2 lg:gap-6">
        <div>
          <Chip tone="alert">LIVE • Global Threat Grid</Chip>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
          >
            Predict earlier.
            <br />
            Respond faster.
            <br />
            <span className="text-primary text-glow">Save more lives.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            ResQAI is the AI-driven command layer for crisis management —
            unifying prediction, dispatch, evacuation and care across every
            second of an emergency.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <button onClick={onDemo} className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-cyan transition hover:brightness-110">
              Launch App <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={onDemo} className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary">
              <Play className="h-4 w-4" /> Watch Demo
            </button>
            <a href="#users" className="inline-flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-6 py-3 text-sm font-semibold text-accent transition hover:bg-accent/20">
              For Governments <Building2 className="h-4 w-4" />
            </a>
          </motion.div>

          <div className="mt-10 grid grid-cols-3 gap-3 max-w-xl">
            <StatMini label="Cities" value="120+" />
            <StatMini label="Avg. ETA cut" value="-38%" tone="safe" />
            <StatMini label="Live signals/s" value="24K" tone="alert" />
          </div>
        </div>

        <div className="relative h-[560px] w-full lg:h-[640px]">
          <Globe3D />
          {/* Floating holo panels */}
          <div className="pointer-events-none absolute inset-0">
            <HoloPanel
              className="left-2 top-6 md:left-6"
              title="AI Risk Prediction"
              tone="cyan"
              lines={["Seismic anomaly · Tokyo", "Confidence 94.2%", "ETA to breach: 08m 12s"]}
            />
            <HoloPanel
              className="right-2 top-24 md:right-4"
              title="Active Alerts"
              tone="alert"
              lines={["Flood · Mumbai zone 3", "Wildfire · N. California", "Grid instability · Lagos"]}
            />
            <HoloPanel
              className="left-4 bottom-8"
              title="Dispatch Status"
              tone="safe"
              lines={["Units en route: 42", "Hospitals ready: 18", "Shelters online: 91"]}
            />
          </div>
        </div>
      </div>

      {/* Alert ticker */}
      <div className="relative overflow-hidden border-y border-border/80 bg-background/40 backdrop-blur">
        <div className="animate-ticker flex gap-16 whitespace-nowrap py-3 text-xs uppercase tracking-widest text-muted-foreground">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-16">
              <span className="flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5 text-destructive" /> Flood warning — Jakarta</span>
              <span className="flex items-center gap-2"><Activity className="h-3.5 w-3.5 text-primary" /> Seismic drift +0.4 — Tokyo</span>
              <span className="flex items-center gap-2"><HeartPulse className="h-3.5 w-3.5 text-accent" /> 42 units dispatched — Delhi</span>
              <span className="flex items-center gap-2"><Radar className="h-3.5 w-3.5 text-primary" /> Storm cell forming — Manila</span>
              <span className="flex items-center gap-2"><Zap className="h-3.5 w-3.5 text-destructive" /> Grid overload — Cairo</span>
              <span className="flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-accent" /> Evac routes stabilized — Lima</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatMini({ label, value, tone = "cyan" }: { label: string; value: string; tone?: "cyan" | "alert" | "safe" }) {
  const color = tone === "alert" ? "text-destructive" : tone === "safe" ? "text-accent" : "text-primary";
  return (
    <div className="panel rounded-lg px-3 py-2.5">
      <div className={`font-display text-lg font-bold ${color}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

function HoloPanel({
  className, title, lines, tone = "cyan",
}: { className?: string; title: string; lines: string[]; tone?: "cyan" | "alert" | "safe" }) {
  const border =
    tone === "alert" ? "border-destructive/40 shadow-[0_0_30px_oklch(0.68_0.22_27/0.25)]" :
    tone === "safe" ? "border-accent/40 shadow-[0_0_30px_oklch(0.78_0.15_170/0.25)]" :
    "border-primary/40 shadow-[0_0_30px_oklch(0.85_0.16_210/0.25)]";
  const dot = tone === "alert" ? "bg-destructive" : tone === "safe" ? "bg-accent" : "bg-primary";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className={`pointer-events-auto absolute w-56 rounded-lg border bg-card/70 p-3 backdrop-blur-xl animate-float-y ${border} ${className}`}
      style={{ animationDelay: `${Math.random() * 2}s` }}
    >
      <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className={`h-1.5 w-1.5 rounded-full ${dot} animate-pulse`} /> {title}</span>
        <span>LIVE</span>
      </div>
      <ul className="space-y-1 text-xs text-foreground/90">
        {lines.map((l, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className={`h-1 w-1 rounded-full ${dot}`} /> {l}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ---------- Problem ----------

function ProblemSection() {
  return (
    <section id="problem" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="The problem"
          title={<>Every second of chaos <span className="text-destructive text-glow-alert">costs lives.</span></>}
          sub="Emergencies unfold faster than legacy systems can react. Fragmented data, delayed dispatch, blocked routes, overwhelmed hospitals. ResQAI turns chaos into coordinated response."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="panel relative overflow-hidden rounded-2xl p-8 border-destructive/30">
            <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 30% 30%, oklch(0.68 0.22 27 / 0.5), transparent 60%)" }} />
            <div className="relative">
              <Chip tone="alert">Before ResQAI</Chip>
              <h3 className="mt-4 font-display text-2xl font-bold">Fragmented. Reactive. Overwhelmed.</h3>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {[
                  ["Delayed detection", "Sensors and reports stay in silos. Warning signs missed."],
                  ["Slow dispatch", "Manual triage. Wrong resources in the wrong place."],
                  ["Blocked routes", "Ambulances stuck. Evacuees confused."],
                  ["Overloaded hospitals", "No live view of capacity or specialists."],
                ].map(([t, d]) => (
                  <li key={t} className="flex gap-3">
                    <X className="mt-0.5 h-4 w-4 flex-none text-destructive" />
                    <div><span className="font-semibold text-foreground">{t}. </span>{d}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="panel-cyan relative overflow-hidden rounded-2xl p-8">
            <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at 70% 30%, oklch(0.85 0.16 210 / 0.35), transparent 60%)" }} />
            <div className="relative">
              <Chip tone="safe">With ResQAI</Chip>
              <h3 className="mt-4 font-display text-2xl font-bold">Predictive. Coordinated. Human.</h3>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {[
                  ["Multi-signal prediction", "Fuses weather, seismic, IoT, social — flags risk before impact."],
                  ["Autonomous dispatch", "Right unit, right route, right hospital — in seconds."],
                  ["Live evacuation graph", "Adaptive routes citizens actually follow."],
                  ["Care continuity", "Telemedicine + mental health, from first alert to recovery."],
                ].map(([t, d]) => (
                  <li key={t} className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-accent" />
                    <div><span className="font-semibold text-foreground">{t}. </span>{d}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Vision cards ----------

const VISION_CARDS = [
  { icon: Radar, title: "Predict", desc: "Detect risk hours or days before impact using multi-modal AI on live sensor and satellite feeds." },
  { icon: Zap, title: "Alert", desc: "Hyper-local, multilingual alerts delivered through every channel citizens actually use." },
  { icon: Ambulance, title: "Dispatch", desc: "Autonomous coordination of ambulances, fire, police, drones and hospital capacity." },
  { icon: Route, title: "Evacuate", desc: "Adaptive evacuation routes and shelter guidance that respond to live traffic and hazards." },
  { icon: Stethoscope, title: "Treat", desc: "Instant telemedicine triage, on-scene AR guidance and hospital pre-alert." },
  { icon: Brain, title: "Recover", desc: "Mental health support, community coordination and post-event learning loops." },
];

function VisionSection() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Product vision"
          title={<>Six objectives. <span className="text-primary text-glow">One command layer.</span></>}
          sub="A single AI-native platform spanning the entire arc of an emergency — from earliest signal to full recovery."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VISION_CARDS.map((c, i) => (
            <TiltCard key={c.title} index={i}>
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg panel-cyan">
                  <c.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-widest text-primary/70">
                  Layer 0{i + 1} <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ children, index }: { children: ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(0)`;
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (el) el.style.transform = "perspective(900px) rotateY(0) rotateX(0)";
      }}
    >
      <div
        ref={ref}
        className="panel group relative h-full overflow-hidden rounded-2xl p-6 transition-transform duration-200 hover:border-primary/50"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition group-hover:bg-primary/20" />
        {children}
      </div>
    </motion.div>
  );
}

// ---------- Features ----------

const FEATURES = [
  {
    icon: Radar, tone: "cyan",
    title: "AI Risk Prediction",
    sub: "Multi-modal foresight",
    body: "A geospatial AI continuously fuses weather, seismic, IoT and social signals to surface risk zones before they escalate — with confidence intervals and time-to-impact.",
    metrics: [["Signals/s", "24,102"], ["Lead time", "6h avg"], ["Precision", "94.2%"]],
  },
  {
    icon: Bot, tone: "cyan",
    title: "Citizen Emergency Assistant",
    sub: "Talk to ResQ, 24/7",
    body: "A conversational AI in 60+ languages guides citizens through first aid, evacuation, mental health support and case reporting — voice or text, on any device.",
    metrics: [["Languages", "60+"], ["Median reply", "0.4s"], ["Modalities", "Voice · Text · Image"]],
  },
  {
    icon: Route, tone: "safe",
    title: "Smart Evacuation",
    sub: "Routes that actually work",
    body: "Live routing to the nearest safe shelter, adapting to hazards, road closures and crowd density in real time. Integrates with maps, sirens and SMS.",
    metrics: [["Routes/min", "12K"], ["Shelter match", "97%"], ["Avg. detour", "-31%"]],
  },
  {
    icon: Ambulance, tone: "alert",
    title: "Smart Resource Allocation",
    sub: "Right unit, right place",
    body: "AI dispatch orchestrates ambulances, fire, police and drones against live hospital capacity — pre-alerting ORs and specialists.",
    metrics: [["ETA reduction", "-38%"], ["Hospital match", "Real-time"], ["Units tracked", "Fleet-wide"]],
  },
  {
    icon: Stethoscope, tone: "safe",
    title: "Telemedicine & Mental Health",
    sub: "Care from first minute",
    body: "Instant video triage with clinicians, AR guidance for bystanders, and integrated mental health follow-up for survivors and responders.",
    metrics: [["Time-to-clinician", "< 45s"], ["Follow-ups", "Automated"], ["Coverage", "Rural + Urban"]],
  },
  {
    icon: Building2, tone: "cyan",
    title: "Government Command Center",
    sub: "One pane of glass",
    body: "A cinematic 3D command console for civil defense: live incidents, heatmaps, resource maps, analytics and AI recommendations — with full audit trail.",
    metrics: [["Roles", "Multi-agency"], ["Compliance", "SOC2 · ISO27001"], ["Latency", "< 200ms"]],
  },
] as const;

function FeaturesSection() {
  return (
    <section id="features" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Capabilities"
          title={<>A full stack of <span className="text-primary text-glow">life-saving intelligence.</span></>}
          sub="Every module is production-hardened and interoperates through a shared real-time graph of people, places and hazards."
        />

        <div className="mt-16 space-y-24">
          {FEATURES.map((f, i) => (
            <FeatureRow key={f.title} feature={f} reversed={i % 2 === 1} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureRow({ feature, reversed, index }: { feature: typeof FEATURES[number]; reversed: boolean; index: number }) {
  const Icon = feature.icon;
  const toneColor =
    feature.tone === "alert" ? "text-destructive" :
    feature.tone === "safe" ? "text-accent" : "text-primary";
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className={`grid items-center gap-10 lg:grid-cols-2 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}
    >
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg panel-cyan">
            <Icon className={`h-5 w-5 ${toneColor}`} />
          </div>
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Module 0{index + 1}</span>
        </div>
        <h3 className="mt-5 font-display text-3xl font-bold leading-tight md:text-4xl">{feature.title}</h3>
        <p className="mt-1 text-sm uppercase tracking-widest text-primary/80">{feature.sub}</p>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">{feature.body}</p>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {feature.metrics.map(([k, v]) => (
            <div key={k} className="panel rounded-lg px-3 py-2.5">
              <div className={`font-display text-sm font-bold ${toneColor}`}>{v}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</div>
            </div>
          ))}
        </div>
      </div>

      <FeatureVisual feature={feature} />
    </motion.div>
  );
}

function FeatureVisual({ feature }: { feature: typeof FEATURES[number] }) {
  // Distinct 2.5D holographic scenes per feature — pure SVG/CSS for perf
  switch (feature.title) {
    case "AI Risk Prediction":
      return <RiskTerrain />;
    case "Citizen Emergency Assistant":
      return <ChatHolo />;
    case "Smart Evacuation":
      return <EvacMap />;
    case "Smart Resource Allocation":
      return <ResourceDash />;
    case "Telemedicine & Mental Health":
      return <TelemedRoom />;
    case "Government Command Center":
      return <CommandCenter />;
    default:
      return null;
  }
}

// ----- Feature visuals -----

function HoloFrame({ children, tone = "cyan" }: { children: ReactNode; tone?: "cyan" | "alert" | "safe" }) {
  const border = tone === "alert" ? "border-destructive/40" : tone === "safe" ? "border-accent/40" : "border-primary/40";
  return (
    <div className={`panel relative aspect-[4/3] w-full overflow-hidden rounded-2xl ${border}`}>
      <div className="absolute inset-0 grid-lines opacity-30" />
      <div className="absolute inset-0">{children}</div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-primary/10 to-transparent animate-scan" />
      <div className="absolute left-3 top-3 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-primary/80">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> holo · live
      </div>
    </div>
  );
}

function RiskTerrain() {
  return (
    <HoloFrame>
      <svg viewBox="0 0 400 300" className="h-full w-full">
        <defs>
          <linearGradient id="ridge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00F5FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: 14 }).map((_, i) => {
          const y = 40 + i * 18;
          const d = `M0 ${y} ${Array.from({ length: 20 })
            .map((_, k) => `L ${k * 21} ${y - Math.sin((k + i) * 0.6) * (10 + i * 0.6)}`)
            .join(" ")}`;
          return <path key={i} d={d} fill="none" stroke="url(#ridge)" strokeWidth="1" opacity={0.5 + i * 0.03} />;
        })}
        {[
          { x: 90, y: 130, r: 22, c: "#FF3B30" },
          { x: 210, y: 170, r: 30, c: "#FFA500" },
          { x: 300, y: 100, r: 18, c: "#00D4A5" },
        ].map((z, i) => (
          <g key={i}>
            <circle cx={z.x} cy={z.y} r={z.r} fill={z.c} opacity="0.15" />
            <circle cx={z.x} cy={z.y} r={z.r * 0.5} fill={z.c} opacity="0.35" />
            <circle cx={z.x} cy={z.y} r={4} fill={z.c}>
              <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>
      <div className="absolute right-3 top-3 panel rounded-md px-2 py-1 text-[10px] uppercase tracking-widest text-destructive">Risk 0.87</div>
    </HoloFrame>
  );
}

function ChatHolo() {
  return (
    <HoloFrame>
      <div className="flex h-full flex-col justify-end gap-2 p-4">
        <div className="self-start max-w-[75%] rounded-2xl rounded-bl-sm panel-cyan px-3 py-2 text-xs">
          I smell smoke near me. What do I do?
        </div>
        <div className="self-end max-w-[80%] rounded-2xl rounded-br-sm panel px-3 py-2 text-xs">
          Stay low. Nearest safe exit: <span className="text-primary">West stairwell, 40m</span>. I've alerted fire response · ETA 4m.
        </div>
        <div className="self-start max-w-[70%] rounded-2xl rounded-bl-sm panel-cyan px-3 py-2 text-xs">
          I have someone injured with me.
        </div>
        <div className="self-end max-w-[80%] rounded-2xl rounded-br-sm panel px-3 py-2 text-xs">
          Connecting a paramedic on video now. Keep them still. Breathing normal? <span className="animate-pulse">▍</span>
        </div>
      </div>
      <div className="absolute left-3 top-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full panel-cyan">
          <Bot className="h-4 w-4 text-primary" />
        </div>
        <div className="text-[11px] uppercase tracking-widest text-primary/80">ResQ Assistant</div>
      </div>
    </HoloFrame>
  );
}

function EvacMap() {
  return (
    <HoloFrame tone="safe">
      <svg viewBox="0 0 400 300" className="h-full w-full">
        <g stroke="oklch(0.85 0.16 210 / 0.25)" strokeWidth="1">
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={"h" + i} x1="0" x2="400" y1={i * 40 + 20} y2={i * 40 + 20} />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={"v" + i} y1="0" y2="300" x1={i * 40 + 20} x2={i * 40 + 20} />
          ))}
        </g>
        {/* Danger */}
        <circle cx="120" cy="90" r="55" fill="#FF3B30" opacity="0.15" />
        <circle cx="120" cy="90" r="30" fill="#FF3B30" opacity="0.3" />
        <text x="120" y="94" textAnchor="middle" fontSize="10" fill="#FF3B30">HAZARD</text>
        {/* Safe route */}
        <path d="M60 260 Q 180 260 220 180 T 340 90" fill="none" stroke="#00D4A5" strokeWidth="3" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1s" repeatCount="indefinite" />
        </path>
        <circle cx="60" cy="260" r="6" fill="#00F5FF" />
        <circle cx="340" cy="90" r="8" fill="#00D4A5" />
        <text x="340" y="72" textAnchor="middle" fontSize="10" fill="#00D4A5">SHELTER</text>
      </svg>
    </HoloFrame>
  );
}

function ResourceDash() {
  return (
    <HoloFrame tone="alert">
      <div className="grid h-full grid-cols-3 gap-3 p-4 text-xs">
        <div className="panel col-span-2 rounded-lg p-3">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Fleet</div>
          <svg viewBox="0 0 300 140" className="mt-1 h-[calc(100%-16px)] w-full">
            <path d="M20 100 L 280 100" stroke="oklch(1 0 0 / 0.15)" />
            {[30, 80, 140, 200, 240].map((x, i) => (
              <g key={i}>
                <rect x={x} y={72} width="18" height="10" rx="2" fill="#00F5FF">
                  <animate attributeName="x" values={`${x};${x + 40};${x}`} dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
                </rect>
                <circle cx={x + 4} cy={84} r="2.5" fill="#0A1428" />
                <circle cx={x + 14} cy={84} r="2.5" fill="#0A1428" />
              </g>
            ))}
          </svg>
        </div>
        <div className="panel rounded-lg p-3">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Hospital load</div>
          <svg viewBox="0 0 100 100" className="mx-auto mt-1 h-24">
            <circle cx="50" cy="50" r="38" fill="none" stroke="oklch(1 0 0 / 0.1)" strokeWidth="8" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="#FF3B30" strokeWidth="8"
              strokeDasharray="180 300" strokeLinecap="round" transform="rotate(-90 50 50)" />
            <text x="50" y="55" textAnchor="middle" fontSize="16" fill="white" fontWeight="700">76%</text>
          </svg>
        </div>
        <div className="panel col-span-3 rounded-lg p-3">
          <div className="mb-2 text-[10px] uppercase tracking-widest text-muted-foreground">AI recommendations</div>
          <ul className="space-y-1">
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent" /> Reroute Unit-14 → St. Mercy (ETA -3m)</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Pre-alert OR-3 for trauma inbound</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-destructive" /> Redirect Unit-22 — bridge closure</li>
          </ul>
        </div>
      </div>
    </HoloFrame>
  );
}

function TelemedRoom() {
  return (
    <HoloFrame tone="safe">
      <div className="grid h-full grid-cols-5 gap-3 p-4 text-xs">
        <div className="col-span-3 rounded-lg panel-cyan flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 40%, oklch(0.78 0.15 170 / 0.35), transparent 70%)" }} />
          <div className="relative flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/30 border border-accent/60">
              <Stethoscope className="h-7 w-7 text-accent" />
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-widest text-accent/80">Dr. Alvarez · Live</div>
          </div>
          <div className="absolute bottom-2 right-2 rounded-md bg-destructive/20 px-2 py-1 text-[10px] text-destructive">REC ●</div>
        </div>
        <div className="col-span-2 space-y-2">
          <div className="panel rounded-lg p-2">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Heart rate</div>
            <div className="font-display text-base text-accent">92 bpm</div>
          </div>
          <div className="panel rounded-lg p-2">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">SpO₂</div>
            <div className="font-display text-base text-primary">97%</div>
          </div>
          <div className="panel rounded-lg p-2">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Triage</div>
            <div className="font-display text-base text-destructive">Priority 2</div>
          </div>
        </div>
      </div>
    </HoloFrame>
  );
}

function CommandCenter() {
  return (
    <HoloFrame>
      <div className="grid h-full grid-cols-6 grid-rows-4 gap-2 p-3 text-[10px]">
        <div className="col-span-4 row-span-3 panel rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 grid-lines opacity-30" />
          <svg viewBox="0 0 400 240" className="absolute inset-0 h-full w-full">
            {[[80, 60, "#FF3B30"], [180, 130, "#FFA500"], [280, 80, "#00F5FF"], [320, 180, "#00D4A5"], [140, 190, "#FF3B30"]].map(([x, y, c], i) => (
              <g key={i}>
                <circle cx={x as number} cy={y as number} r="24" fill={c as string} opacity="0.15" />
                <circle cx={x as number} cy={y as number} r="4" fill={c as string} />
              </g>
            ))}
          </svg>
          <div className="absolute left-2 top-2 uppercase tracking-widest text-primary/80">Incident map</div>
        </div>
        <div className="col-span-2 panel rounded-lg p-2">
          <div className="uppercase tracking-widest text-muted-foreground">Active</div>
          <div className="mt-1 font-display text-xl text-destructive">37</div>
        </div>
        <div className="col-span-2 panel rounded-lg p-2">
          <div className="uppercase tracking-widest text-muted-foreground">Resolved 24h</div>
          <div className="mt-1 font-display text-xl text-accent">214</div>
        </div>
        <div className="col-span-2 panel rounded-lg p-2">
          <div className="uppercase tracking-widest text-muted-foreground">AI ops</div>
          <div className="mt-1 font-display text-xl text-primary">Nominal</div>
        </div>
        <div className="col-span-6 panel rounded-lg p-2 flex items-center justify-between">
          <span>Load</span>
          <div className="flex-1 mx-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary via-accent to-destructive" style={{ width: "68%" }} />
          </div>
          <span className="text-primary">68%</span>
        </div>
      </div>
    </HoloFrame>
  );
}

// ---------- Users ----------

const USERS = [
  { icon: Users, title: "Citizens", desc: "Alerts, guidance and one-tap access to help — in their language, on any device." },
  { icon: Ambulance, title: "First Responders", desc: "AI-optimized routes, live scene intel, and hospital pre-alerting." },
  { icon: Stethoscope, title: "Doctors & Hospitals", desc: "Live capacity, incoming triage and specialist matching." },
  { icon: Building2, title: "Governments & NGOs", desc: "Command center, analytics, cross-agency coordination and compliance." },
];

function UsersSection() {
  return (
    <section id="users" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Built for everyone in the chain"
          title={<>One platform. <span className="text-accent">Every role.</span></>}
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {USERS.map((u, i) => (
            <motion.div
              key={u.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="panel group relative overflow-hidden rounded-2xl p-6 hover:border-primary/50 transition"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl panel-cyan">
                <u.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{u.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{u.desc}</p>
              <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- User flow ----------

const FLOW = [
  { icon: Radar, title: "Signal", desc: "Anomaly detected across sensors, satellites and social." },
  { icon: AlertTriangle, title: "Predict", desc: "AI classifies risk, forecasts impact and confidence." },
  { icon: Zap, title: "Alert", desc: "Hyper-local, multilingual alerts to citizens and agencies." },
  { icon: Ambulance, title: "Dispatch", desc: "Autonomous coordination of units, routes and hospitals." },
  { icon: Stethoscope, title: "Care", desc: "Live triage, telemedicine and on-scene AR guidance." },
  { icon: HeartPulse, title: "Recover", desc: "Follow-up, mental health, community and learning." },
];

function FlowSection() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="The user flow"
          title={<>From <span className="text-primary text-glow">first signal</span> to full recovery.</>}
          sub="Every second is accounted for. Every actor is in sync."
        />
        <div className="relative mt-16">
          <div className="pointer-events-none absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-destructive md:left-1/2" />
          <div className="space-y-10">
            {FLOW.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className={`relative flex flex-col gap-4 md:grid md:grid-cols-2 md:items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div className={`md:${i % 2 ? "pl-14" : "pr-14"} pl-14`}>
                  <div className="panel rounded-2xl p-6 hover:border-primary/40 transition">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg panel-cyan">
                        <s.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-xs uppercase tracking-widest text-muted-foreground">Stage 0{i + 1}</span>
                    </div>
                    <h3 className="mt-3 font-display text-xl font-bold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
                <div className="absolute left-6 flex h-3 w-3 -translate-x-1/2 items-center justify-center md:left-1/2">
                  <span className="absolute h-3 w-3 rounded-full bg-primary animate-pulse-ring" />
                  <span className="relative h-3 w-3 rounded-full bg-primary glow-cyan" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Tech ----------

function TechSection() {
  return (
    <section id="tech" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Under the hood"
          title={<>An AI-native stack, <span className="text-primary text-glow">built to scale.</span></>}
          sub="Engineered for global scale, edge latency and rigorous safety — from model training to citizen-facing UI."
        />
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          <div className="relative h-[440px]">
            <TechOrb />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { t: "Models", d: "Transformer + geospatial CNN + graph AI ensembles." },
              { t: "Data", d: "Weather · seismic · IoT · social · imagery · telemetry." },
              { t: "Edge", d: "Sub-200ms alerts via regional inference clusters." },
              { t: "Safety", d: "Human-in-the-loop, red-team eval, full audit trail." },
              { t: "Cloud", d: "Multi-cloud, GDPR/HIPAA aware, sovereign options." },
              { t: "APIs", d: "Open interop with agency, hospital and telco systems." },
            ].map((x) => (
              <div key={x.t} className="panel rounded-xl p-4">
                <div className="font-display text-sm text-primary">{x.t}</div>
                <div className="mt-1 text-sm text-muted-foreground">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Impact ----------

const IMPACT = [
  { value: 128000, suffix: "+", label: "Alerts delivered", tone: "cyan" as const, icon: Zap },
  { value: 42, suffix: "%", label: "Faster response time", tone: "safe" as const, icon: Clock },
  { value: 9400, suffix: "+", label: "Lives supported", tone: "alert" as const, icon: HeartPulse },
  { value: 120, suffix: "+", label: "Cities piloted", tone: "cyan" as const, icon: Globe2 },
];

function ImpactSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <section id="impact" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Impact"
          title={<>Numbers, not narratives. <span className="text-accent">Lives, not logs.</span></>}
        />
        <div ref={ref} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {IMPACT.map((m, i) => (
            <Counter key={m.label} m={m} start={inView} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ m, start, delay }: { m: typeof IMPACT[number]; start: boolean; delay: number }) {
  const v = useCountUp(m.value, 1800 + delay, start);
  const color = m.tone === "alert" ? "text-destructive" : m.tone === "safe" ? "text-accent" : "text-primary";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="panel relative overflow-hidden rounded-2xl p-6"
    >
      <m.icon className={`h-6 w-6 ${color}`} />
      <div className={`mt-4 font-display text-4xl font-bold ${color}`}>
        {v.toLocaleString()}
        {m.suffix}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{m.label}</div>
      <div className="pointer-events-none absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
    </motion.div>
  );
}

// ---------- Humanity / Footer ----------

function HumanitySection({ onDemo }: { onDemo: () => void }) {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="panel-cyan relative overflow-hidden rounded-3xl p-10 md:p-16">
          <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at 30% 20%, oklch(0.85 0.16 210 / 0.35), transparent 60%), radial-gradient(circle at 80% 80%, oklch(0.78 0.15 170 / 0.3), transparent 60%)" }} />
          <div className="relative text-center">
            <Chip tone="safe">Built with ❤️ for humanity</Chip>
            <h2 className="mt-6 font-display text-4xl font-bold leading-tight md:text-5xl">
              The future of emergency response<br />
              <span className="text-primary text-glow">has arrived.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              ResQAI exists for one reason: to give every person on earth a
              faster, safer, kinder path through the worst moments of their life.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button onClick={onDemo} className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-cyan hover:brightness-110">
                Try the demo <ArrowRight className="h-4 w-4" />
              </button>
              <a href="mailto:hello@resqai.example" className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary">
                Partner with us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border py-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg panel-cyan">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <span className="font-display text-lg font-bold tracking-widest">RESQ<span className="text-primary">AI</span></span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            AI-driven crisis management. Predict earlier, respond faster, save more lives.
          </p>
        </div>
        <FooterCol title="Product" links={["Features", "Government", "Hospitals", "Citizens"]} />
        <FooterCol title="Company" links={["Vision", "Partners", "Press", "Contact"]} />
        <FooterCol title="Trust" links={["Security", "Privacy", "Compliance", "Ethics"]} />
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-border px-6 pt-6 text-xs text-muted-foreground md:flex-row">
        <div>© {new Date().getFullYear()} ResQAI · Built with ❤️ for humanity</div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" /> All systems nominal</span>
          <span>v1.0 · Global</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-primary/80">{title}</div>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l}><a href="#" className="hover:text-foreground transition">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}

// ---------- Demo modal + floating button ----------

function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const on = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="panel-cyan relative w-full max-w-3xl overflow-hidden rounded-2xl"
      >
        <div className="flex items-center justify-between border-b border-primary/30 px-5 py-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary/90">
            <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" /> Live · ResQAI Demo Scenario
          </div>
          <button onClick={onClose} className="rounded p-1 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="grid gap-4 p-6 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="font-display text-2xl font-bold">Simulated 6.4 earthquake · Tokyo</h3>
            <p className="text-sm text-muted-foreground">
              Watch how ResQAI moves from signal to coordinated response in under a minute.
            </p>
            <ol className="mt-2 space-y-2 text-sm">
              {[
                ["00:00", "Seismic anomaly detected — confidence 94%", "text-primary"],
                ["00:08", "Alerts pushed to 4.2M devices in 12 languages", "text-primary"],
                ["00:19", "Fleet reroute · 214 units dispatched", "text-accent"],
                ["00:34", "Hospitals pre-alerted · ORs opened", "text-accent"],
                ["00:52", "Evacuation graph stabilized · 91 shelters online", "text-destructive"],
              ].map(([t, l, c]) => (
                <li key={t} className="flex gap-3">
                  <span className={`font-display text-xs ${c}`}>{t}</span>
                  <span className="text-muted-foreground">{l}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-xl border border-primary/30 panel-cyan overflow-hidden">
            <CommandCenter />
          </div>
        </div>
        <div className="flex justify-end gap-3 border-t border-primary/30 px-5 py-3">
          <button onClick={onClose} className="rounded-md border border-border px-4 py-2 text-sm text-foreground hover:bg-secondary">Close</button>
          <a href="mailto:hello@resqai.example" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground glow-cyan hover:brightness-110">Request access</a>
        </div>
      </motion.div>
    </div>
  );
}

function EmergencyButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-destructive px-5 py-3 text-sm font-bold uppercase tracking-widest text-destructive-foreground glow-alert hover:brightness-110"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inset-0 rounded-full bg-white/70 animate-ping" />
        <span className="relative h-2.5 w-2.5 rounded-full bg-white" />
      </span>
      Emergency Demo
    </button>
  );
}

// ---------- Boot loader ----------

function BootLoader({ done }: { done: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      style={{ pointerEvents: done ? "none" : "auto" }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
    >
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl panel-cyan glow-cyan">
          <Shield className="h-7 w-7 text-primary" />
        </div>
        <div className="mt-6 font-display text-lg tracking-widest text-primary">RESQ<span className="text-foreground">AI</span></div>
        <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">Booting neural core…</div>
        <div className="mx-auto mt-6 h-1 w-56 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-primary to-accent"
          />
        </div>
      </div>
    </motion.div>
  );
}

// ---------- Page ----------

export default function ResQAILanding() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [booted, setBooted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 1300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen">
      <BootLoader done={booted} />
      <Nav onDemo={() => setDemoOpen(true)} />
      <Hero onDemo={() => setDemoOpen(true)} />
      <ProblemSection />
      <VisionSection />
      <FeaturesSection />
      <UsersSection />
      <FlowSection />
      <TechSection />
      <ImpactSection />
      <HumanitySection onDemo={() => setDemoOpen(true)} />
      <Footer />
      <EmergencyButton onClick={() => setDemoOpen(true)} />
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}
