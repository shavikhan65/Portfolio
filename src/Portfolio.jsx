import { useState, useEffect, useRef } from "react";

// ─── Tokens ──────────────────────────────────────────────────────────────────
const C = {
  bg0: "#080A0F",
  bg1: "#0D0F14",
  bg2: "#131720",
  card: "#1A1D24",
  border: "#252830",
  cyan: "#00D4FF",
  gold: "#F5A623",
  green: "#34D399",
  purple: "#A78BFA",
  pink: "#F472B6",
  text: "#E8EDF5",
  muted: "#9CA3AF",
  dim: "#6B7280",
};

const MONO = "'Space Mono', 'Courier New', monospace";
const SANS = "'Inter', system-ui, sans-serif";

// ─── Data ────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "Services", "Skills", "Projects", "Experience", "Contact"];

const STATS = [
  { value: "50+", label: "Clients Served" },
  { value: "99.9%", label: "Uptime Delivered" },
  { value: "8 Yrs", label: "Marketing Team" },
  { value: "3×", label: "Avg. Traffic Growth" },
];

const SERVICES = [
  {
    icon: "🚀",
    title: "Scale Your Infrastructure",
    sub: "Cloud & DevOps",
    desc: "Your app goes down during peak hours — you lose sales. We build infrastructure that handles 10× your current traffic without breaking a sweat.",
    outcomes: ["Zero-downtime deployments", "Auto-scaling under load", "Cut server costs by 40%"],
    accent: C.cyan,
  },
  {
    icon: "📈",
    title: "Grow Your Online Presence",
    sub: "Digital Marketing",
    desc: "An 8-year veteran marketing team drives your SEO, paid ads, and content strategy — turning visitors into paying customers.",
    outcomes: ["3× organic traffic in 90 days", "Targeted ad campaigns with ROI tracking", "Content that converts"],
    accent: C.gold,
  },
  {
    icon: "⚙️",
    title: "Automate Your Operations",
    sub: "CI/CD & Automation",
    desc: "Stop wasting engineering hours on manual work. We automate your entire deployment pipeline so your team ships features, not fires.",
    outcomes: ["Deploy in minutes, not days", "Automated testing & rollback", "Slack/email alerts built in"],
    accent: C.green,
  },
  {
    icon: "🔒",
    title: "Secure & Reliable Systems",
    sub: "Security & Monitoring",
    desc: "Real-time dashboards, SSL, firewall configs, and 24/7 uptime monitoring — so you sleep while we watch your stack.",
    outcomes: ["24/7 monitoring dashboards", "SSL, firewall & backup setup", "Instant incident alerts"],
    accent: C.purple,
  },
];

const WHY_US = [
  { icon: "🏗️", title: "Full-Stack Agency", desc: "We're not just developers. Our 8-year marketing team and DevOps engineers work together — one agency, complete solution." },
  { icon: "📊", title: "Results, Not Reports", desc: "Every engagement comes with measurable KPIs. We track uptime, traffic, conversions, and ROI — not just task completion." },
  { icon: "⚡", title: "Fast Turnaround", desc: "Containerized deployments and pre-built pipelines mean we ship faster than a traditional agency by 3×." },
  { icon: "🌍", title: "International Clients", desc: "We've worked with businesses across Europe, the US, and the Middle East through Fiverr and direct contracts." },
];

const SKILLS = [
  { category: "Cloud & DevOps", items: ["Docker", "Kubernetes", "CI/CD", "AWS", "Terraform", "Ansible", "Linux", "Nginx"] },
  { category: "Backend", items: ["Node.js", "Express.js", "REST APIs", "MongoDB", "PostgreSQL", "Redis"] },
  { category: "Frontend", items: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "HTML/CSS"] },
  { category: "Marketing", items: ["SEO", "Google Ads", "Meta Ads", "Content Strategy", "Analytics", "Email Funnels"] },
];

const PROJECTS = [
  { title: "Containerized MERN Deployment", desc: "Multi-container Docker Compose setup with Nginx reverse proxy, automated health checks, and zero-downtime restarts.", tags: ["Docker", "Nginx", "MongoDB", "Node.js"], type: "DevOps", link: "#" },
  { title: "Kubernetes Microservices Cluster", desc: "Production-grade K8s cluster with Helm charts, horizontal pod autoscaling, and Prometheus/Grafana observability.", tags: ["Kubernetes", "Helm", "Prometheus", "Grafana"], type: "Infrastructure", link: "#" },
  { title: "CI/CD Pipeline Automation", desc: "GitHub Actions pipeline: lint → test → Docker build → push → deploy to staging with Slack notifications.", tags: ["GitHub Actions", "Docker", "Node.js", "CI/CD"], type: "Automation", link: "#" },
  { title: "MERN E-Commerce Platform", desc: "Full-stack e-commerce with JWT auth, Stripe payments, admin dashboard, and Redis caching — on VPS with Docker.", tags: ["React", "Express", "MongoDB", "Redis"], type: "Full Stack", link: "#" },
  { title: "Fiverr Docker Consultation", desc: "Freelance service containerizing client applications — Dockerfiles, Compose configs, and deployment guides.", tags: ["Docker", "Docker Compose", "Freelance"], type: "Freelance", link: "#" },
  { title: "Infrastructure Monitoring", desc: "Custom Grafana dashboards from Prometheus node exporter — CPU, memory, disk I/O, and container metrics.", tags: ["Grafana", "Prometheus", "Linux", "Docker"], type: "Observability", link: "#" },
];

const EXPERIENCE = [
  {
    role: "Cloud & DevOps Engineer",
    company: "Freelance (Fiverr)",
    period: "2024 – Present",
    desc: "Delivering Docker containerization, CI/CD pipelines, and cloud deployments to international clients.",
    bullets: ["Containerize apps using Docker & Docker Compose", "Set up automated CI/CD pipelines with GitHub Actions", "Configure Nginx reverse proxies and SSL certificates"],
  },
  {
    role: "Software Engineering Intern",
    company: "Systems Limited",
    period: "2023",
    desc: "Contributed to backend services with enterprise-scale development workflows.",
    bullets: ["Developed REST APIs with Node.js and Express", "Collaborated in Agile sprints using Jira and Git", "Wrote unit tests and participated in code reviews"],
  },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useTyping(words, speed = 75, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[wi];
    let t;
    if (!del && ci <= w.length) { t = setTimeout(() => { setDisplay(w.slice(0, ci)); setCi(c => c + 1); }, speed); }
    else if (!del) { t = setTimeout(() => setDel(true), pause); }
    else if (del && ci > 0) { t = setTimeout(() => { setDisplay(w.slice(0, ci - 1)); setCi(c => c - 1); }, speed / 2); }
    else { setDel(false); setWi(w => (w + 1) % words.length); }
    return () => clearTimeout(t);
  }, [ci, del, wi, words, speed, pause]);
  return display;
}

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCount(target, duration = 1800, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ""));
    const suffix = target.replace(/[0-9.]/g, "");
    if (isNaN(numeric)) { setVal(target); return; }
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - prog, 3);
      setVal((eased * numeric).toFixed(numeric % 1 !== 0 ? 1 : 0) + suffix);
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val || "0";
}

// ─── Micro components ─────────────────────────────────────────────────────────
function Cursor() {
  const [on, setOn] = useState(true);
  useEffect(() => { const t = setInterval(() => setOn(v => !v), 530); return () => clearInterval(t); }, []);
  return <span style={{ opacity: on ? 1 : 0, color: C.cyan }}>█</span>;
}

function Tag({ label }) {
  return <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 4, fontSize: 11, fontFamily: MONO, border: `1px solid ${C.cyan}33`, color: C.cyan, background: `${C.cyan}11` }}>{label}</span>;
}

function Pill({ label, accent = C.cyan }) {
  return <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontFamily: MONO, fontWeight: 700, color: accent, background: accent + "22" }}>{label}</span>;
}

function Divider({ color = C.cyan, width = 48 }) {
  return <div style={{ marginTop: 16, height: 2, width, background: `linear-gradient(90deg, ${color}, transparent)`, borderRadius: 2 }} />;
}

function SectionLabel({ text, color = C.cyan }) {
  return <p style={{ fontFamily: MONO, fontSize: 11, color, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>{text}</p>;
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav({ active, onNav }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? `${C.bg1}f0` : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "none",
      transition: "all 0.3s",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo */}
        <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 700 }}>
          <span style={{ color: C.cyan }}>Shahid</span>
          <span style={{ color: C.text }}>@devops</span>
          <span style={{ color: C.dim }}>:~$</span>
        </span>

        {/* Desktop */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="desk-nav">
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => onNav(l)} style={{
              fontFamily: MONO, fontSize: 12, background: "none", border: "none", cursor: "pointer",
              color: active === l ? C.cyan : C.muted, transition: "color 0.2s", padding: "4px 0",
              borderBottom: active === l ? `1px solid ${C.cyan}` : "1px solid transparent",
            }}>{l}</button>
          ))}
          <a href="mailto:shahidssds65@gmail.com" style={{
            fontFamily: MONO, fontSize: 12, padding: "8px 18px", borderRadius: 6,
            border: `1px solid ${C.gold}`, color: C.gold, textDecoration: "none",
            background: `${C.gold}11`, transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.color = C.bg0; }}
            onMouseLeave={e => { e.currentTarget.style.background = `${C.gold}11`; e.currentTarget.style.color = C.gold; }}>
            Hire Us →
          </a>
        </div>

        {/* Burger */}
        <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", display: "none", flexDirection: "column", gap: 5, padding: 8 }} className="burger">
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block", width: 22, height: 2, background: C.text, borderRadius: 2, transition: "all 0.25s",
              transform: open && i === 0 ? "rotate(45deg) translate(5px,5px)" : open && i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "none",
              opacity: open && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", overflow: "hidden", maxHeight: open ? 400 : 0, transition: "max-height 0.3s" }} className="mobile-menu">
        {NAV_LINKS.map(l => (
          <button key={l} onClick={() => { onNav(l); setOpen(false); }} style={{
            display: "block", width: "100%", textAlign: "left", fontFamily: MONO, fontSize: 13,
            padding: "12px 0", background: "none", border: "none", cursor: "pointer",
            color: active === l ? C.cyan : C.muted, borderBottom: `1px solid ${C.border}`,
          }}>{l}</button>
        ))}
        <a href="mailto:shahidssds65@gmail.com" style={{ display: "block", fontFamily: MONO, fontSize: 12, padding: "12px 0", color: C.gold, textDecoration: "none" }}>Hire Us →</a>
      </div>

      <style>{`
        @media (max-width: 768px) { .desk-nav { display: none !important; } .burger { display: flex !important; } }
      `}</style>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const typed = useTyping(["Grow Your Business Online", "Scale Without the Stress", "Ship Faster. Convert More.", "Tech + Marketing = Results"]);
  const [statsRef, statsInView] = useInView(0.3);

  return (
    <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "100px 24px 60px", overflow: "hidden" }}>
      {/* Animated grid */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${C.card}28 1px,transparent 1px),linear-gradient(90deg,${C.card}28 1px,transparent 1px)`, backgroundSize: "56px 56px" }} />

      {/* Gold glow top-right */}
      <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}14 0%, transparent 65%)`, pointerEvents: "none" }} />
      {/* Cyan glow bottom-left */}
      <div style={{ position: "absolute", bottom: "5%", left: "-10%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.cyan}10 0%, transparent 65%)`, pointerEvents: "none" }} />

      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", width: "100%" }}>
        {/* Agency badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 99, border: `1px solid ${C.gold}44`, background: `${C.gold}0d`, marginBottom: 32 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.gold, display: "inline-block", animation: "pulse 2s infinite" }} />
          <span style={{ fontFamily: MONO, fontSize: 11, color: C.gold, letterSpacing: "0.1em" }}>FULL-SERVICE TECH + MARKETING AGENCY</span>
        </div>

        {/* Main headline */}
        <h1 style={{ fontSize: "clamp(36px, 6vw, 80px)", fontWeight: 800, lineHeight: 1.05, color: C.text, marginBottom: 0, letterSpacing: "-0.02em" }}>
          We Build Systems<br />
          <span style={{ color: C.cyan }}>That</span>{" "}
          <span style={{ color: C.gold }}>Make You Money.</span>
        </h1>

        {/* Typing sub */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 24, marginBottom: 24 }}>
          <span style={{ fontFamily: MONO, fontSize: "clamp(14px, 2vw, 20px)", color: C.dim }}>→&nbsp;</span>
          <span style={{ fontFamily: MONO, fontSize: "clamp(14px, 2vw, 20px)", color: C.muted }}>{typed}</span>
          <Cursor />
        </div>

        <p style={{ maxWidth: 580, fontSize: "clamp(15px, 1.5vw, 18px)", lineHeight: 1.75, color: C.muted, marginBottom: 40 }}>
          We're a Lahore-based agency combining <span style={{ color: C.cyan, fontWeight: 600 }}>cloud infrastructure & DevOps</span> with an{" "}
          <span style={{ color: C.gold, fontWeight: 600 }}>8-year marketing team</span> — giving your business the tech backbone and audience growth it needs to scale.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 64 }}>
          <a href="#contact" style={{
            fontFamily: MONO, fontSize: 13, fontWeight: 700, padding: "14px 32px", borderRadius: 8,
            background: C.gold, color: C.bg0, textDecoration: "none", display: "inline-block",
            boxShadow: `0 0 32px ${C.gold}44`, transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#e8941a"; e.currentTarget.style.boxShadow = `0 0 48px ${C.gold}66`; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.boxShadow = `0 0 32px ${C.gold}44`; }}>
            Get a Free Consultation →
          </a>
          <a href="#services" style={{
            fontFamily: MONO, fontSize: 13, padding: "14px 32px", borderRadius: 8,
            border: `1px solid ${C.border}`, color: C.text, textDecoration: "none", display: "inline-block", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.cyan; e.currentTarget.style.color = C.cyan; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text; }}>
            See Our Services
          </a>
        </div>

        {/* Stats counter row */}
        <div ref={statsRef} style={{ display: "flex", flexWrap: "wrap", gap: 0, borderTop: `1px solid ${C.border}` }}>
          {STATS.map(({ value, label }, i) => (
            <StatCounter key={label} value={value} label={label} active={statsInView} delay={i * 150} isLast={i === STATS.length - 1} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </section>
  );
}

function StatCounter({ value, label, active, delay, isLast }) {
  const counted = useCount(value, 1600, active);
  return (
    <div style={{
      flex: "1 1 140px", padding: "24px 24px 24px 0", borderRight: isLast ? "none" : `1px solid ${C.border}`,
      marginRight: isLast ? 0 : 0, opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(16px)",
      transition: `all 0.5s ease ${delay}ms`,
    }}>
      <p style={{ fontFamily: MONO, fontSize: "clamp(20px, 2.5vw, 30px)", fontWeight: 700, color: C.gold, marginBottom: 4 }}>{active ? counted : "—"}</p>
      <p style={{ fontSize: 12, color: C.dim, letterSpacing: "0.05em" }}>{label}</p>
    </div>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
function Services() {
  const [ref, inView] = useInView(0.05);
  return (
    <section id="services" style={{ background: C.bg2, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionLabel text="// How We Help" color={C.gold} />
        <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: C.text, marginBottom: 16, letterSpacing: "-0.02em" }}>
          Your Business, Our Expertise
        </h2>
        <p style={{ fontSize: 16, color: C.muted, maxWidth: 520, lineHeight: 1.7, marginBottom: 60 }}>
          We don't sell technology — we sell outcomes. Every service maps directly to a business result you can measure.
        </p>
        <Divider color={C.gold} width={60} />
        <div style={{ height: 48 }} />

        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} s={s} inView={inView} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s, inView, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? C.card : `${C.card}99`,
        border: `1px solid ${hov ? s.accent + "66" : C.border}`,
        borderRadius: 16, padding: 32, cursor: "default",
        opacity: inView ? 1 : 0,
        transform: inView ? (hov ? "translateY(-6px)" : "translateY(0)") : "translateY(28px)",
        transition: `all 0.4s ease ${delay}ms`,
        boxShadow: hov ? `0 16px 48px ${s.accent}22` : "none",
      }}>
      <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
      <div style={{ fontFamily: MONO, fontSize: 10, color: s.accent, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>{s.sub}</div>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 12, lineHeight: 1.3 }}>{s.title}</h3>
      <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 20 }}>{s.desc}</p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        {s.outcomes.map(o => (
          <li key={o} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: C.dim }}>
            <span style={{ color: s.accent, flexShrink: 0, marginTop: 1 }}>✓</span>
            {o}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── WHY US ───────────────────────────────────────────────────────────────────
function WhyUs() {
  const [ref, inView] = useInView(0.1);
  return (
    <section style={{ background: C.bg1, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="why-grid">
          {/* Left */}
          <div>
            <SectionLabel text="// Why Choose Us" color={C.cyan} />
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 800, color: C.text, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 24 }}>
              Tech Team{" "}<span style={{ color: C.cyan }}>+</span>{" "}Marketing Team{" "}<span style={{ color: C.gold }}>= Growth</span>
            </h2>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.8, marginBottom: 32 }}>
              Most agencies are either good at tech OR marketing. We have both under one roof — engineers who understand
              conversion and marketers who understand infrastructure. That's rare, and it's why our clients grow faster.
            </p>
            <a href="#contact" style={{
              display: "inline-block", fontFamily: MONO, fontSize: 12, padding: "12px 24px", borderRadius: 8,
              background: C.cyan, color: C.bg0, fontWeight: 700, textDecoration: "none", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#00b8d9"; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.cyan; }}>
              Let's Talk →
            </a>
          </div>
          {/* Right grid */}
          <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {WHY_US.map((w, i) => (
              <div key={w.title} style={{
                background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24,
                opacity: inView ? 1 : 0, transform: inView ? "scale(1)" : "scale(0.92)",
                transition: `all 0.45s ease ${i * 80}ms`,
              }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{w.icon}</div>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 8 }}>{w.title}</h4>
                <p style={{ fontSize: 12, color: C.dim, lineHeight: 1.6 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .why-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
      `}</style>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────
function Skills() {
  const [ref, inView] = useInView();
  return (
    <section id="skills" style={{ background: C.bg0, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionLabel text="// Our Stack" color={C.cyan} />
        <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: C.text, marginBottom: 12, letterSpacing: "-0.02em" }}>Skills & Stack</h2>
        <Divider color={C.cyan} />
        <div style={{ height: 48 }} />

        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {SKILLS.map((group, gi) => {
            const accent = [C.cyan, C.green, C.purple, C.gold][gi];
            return (
              <div key={group.category} style={{
                background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 28,
                opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `all 0.5s ease ${gi * 80}ms`,
              }}>
                <p style={{ fontFamily: MONO, fontSize: 10, color: accent, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 16 }}>{group.category}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {group.items.map(item => <Tag key={item} label={item} />)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function Projects() {
  const [ref, inView] = useInView(0.05);
  const [filter, setFilter] = useState("All");
  const types = ["All", ...Array.from(new Set(PROJECTS.map(p => p.type)))];
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.type === filter);
  const typeColors = { DevOps: C.purple, Infrastructure: C.green, Automation: "#FBBF24", "Full Stack": C.pink, Freelance: C.cyan, Observability: "#FB923C" };

  return (
    <section id="projects" style={{ background: C.bg2, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionLabel text="// Portfolio" color={C.cyan} />
        <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: C.text, marginBottom: 12, letterSpacing: "-0.02em" }}>Projects</h2>
        <Divider color={C.cyan} />
        <div style={{ height: 36 }} />

        {/* Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{
              fontFamily: MONO, fontSize: 11, padding: "6px 14px", borderRadius: 99, cursor: "pointer",
              border: `1px solid ${filter === t ? C.cyan : C.border}`,
              color: filter === t ? C.cyan : C.dim,
              background: filter === t ? `${C.cyan}11` : "transparent",
              transition: "all 0.2s",
            }}>{t}</button>
          ))}
        </div>

        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {filtered.map((p, i) => {
            const acc = typeColors[p.type] || C.dim;
            return (
              <ProjectCard key={p.title} p={p} acc={acc} inView={inView} delay={i * 60} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, acc, inView, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: C.card, border: `1px solid ${hov ? acc + "55" : C.border}`, borderRadius: 14,
      padding: 28, display: "flex", flexDirection: "column", gap: 14, cursor: "default",
      opacity: inView ? 1 : 0, transform: inView ? (hov ? "translateY(-4px)" : "translateY(0)") : "translateY(32px)",
      transition: `all 0.4s ease ${delay}ms`, boxShadow: hov ? `0 8px 32px ${acc}18` : "none",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, lineHeight: 1.35, margin: 0 }}>{p.title}</h3>
        <Pill label={p.type} accent={acc} />
      </div>
      <p style={{ fontSize: 13, color: C.dim, lineHeight: 1.65, margin: 0, flex: 1 }}>{p.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {p.tags.map(t => <Tag key={t} label={t} />)}
      </div>
      <a href={p.link} style={{ fontFamily: MONO, fontSize: 11, color: acc, textDecoration: "none", marginTop: 4, transition: "opacity 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
        onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
        View Project →
      </a>
    </div>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
function Experience() {
  const [ref, inView] = useInView();
  return (
    <section id="experience" style={{ background: C.bg1, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionLabel text="// Track Record" color={C.gold} />
        <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: C.text, marginBottom: 12, letterSpacing: "-0.02em" }}>Experience</h2>
        <Divider color={C.gold} />
        <div style={{ height: 56 }} />

        <div ref={ref} style={{ position: "relative", maxWidth: 720 }}>
          <div style={{ position: "absolute", left: 11, top: 8, bottom: 8, width: 1, background: C.border }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {EXPERIENCE.map((exp, i) => (
              <div key={exp.role} style={{
                paddingLeft: 48, position: "relative",
                opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-24px)",
                transition: `all 0.5s ease ${i * 150}ms`,
              }}>
                <div style={{ position: "absolute", left: 0, top: 6, width: 24, height: 24, borderRadius: "50%", background: C.bg1, border: `2px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.gold }} />
                </div>
                <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 28 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 4 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, margin: 0 }}>{exp.role}</h3>
                    <span style={{ fontFamily: MONO, fontSize: 11, padding: "3px 10px", borderRadius: 4, background: C.bg0, color: C.dim }}>{exp.period}</span>
                  </div>
                  <p style={{ fontFamily: MONO, fontSize: 12, color: C.gold, marginBottom: 12 }}>{exp.company}</p>
                  <p style={{ fontSize: 14, color: C.muted, marginBottom: 16, lineHeight: 1.6 }}>{exp.desc}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                    {exp.bullets.map(b => (
                      <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: C.dim }}>
                        <span style={{ color: C.gold, flexShrink: 0 }}>›</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA BAND ─────────────────────────────────────────────────────────────────
function CTABand() {
  const [ref, inView] = useInView(0.2);
  return (
    <section style={{ background: C.bg0, padding: "80px 24px" }}>
      <div ref={ref} style={{
        maxWidth: 900, margin: "0 auto", textAlign: "center",
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.6s ease",
      }}>
        <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 99, border: `1px solid ${C.gold}44`, background: `${C.gold}0d`, marginBottom: 24 }}>
          <span style={{ fontFamily: MONO, fontSize: 11, color: C.gold, letterSpacing: "0.1em" }}>LIMITED SLOTS AVAILABLE</span>
        </div>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: C.text, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 20 }}>
          Ready to Scale Your Business?
        </h2>
        <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.75, maxWidth: 560, margin: "0 auto 40px" }}>
          Book a free 30-minute strategy call. We'll audit your current setup and show you exactly where you're leaving money on the table.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
          <a href="#contact" style={{
            fontFamily: MONO, fontSize: 13, fontWeight: 700, padding: "16px 36px", borderRadius: 8,
            background: C.gold, color: C.bg0, textDecoration: "none",
            boxShadow: `0 0 40px ${C.gold}44`, transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#e8941a"; e.currentTarget.style.boxShadow = `0 0 60px ${C.gold}66`; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.boxShadow = `0 0 40px ${C.gold}44`; }}>
            Book Free Strategy Call →
          </a>
          <a href="mailto:shahidssds65@gmail.com" style={{
            fontFamily: MONO, fontSize: 13, padding: "16px 36px", borderRadius: 8,
            border: `1px solid ${C.border}`, color: C.muted, textDecoration: "none", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.cyan; e.currentTarget.style.color = C.cyan; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}>
            Email Us Directly
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const handle = (e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); setForm({ name: "", email: "", company: "", service: "", message: "" }); };

  const inp = {
    background: C.card, border: `1px solid ${C.border}`, color: C.text,
    borderRadius: 8, padding: "11px 14px", width: "100%", fontFamily: SANS,
    fontSize: 14, outline: "none", transition: "border-color 0.2s", boxSizing: "border-box",
  };

  return (
    <section id="contact" style={{ background: C.bg2, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionLabel text="// Get In Touch" color={C.cyan} />
        <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: C.text, marginBottom: 12, letterSpacing: "-0.02em" }}>Let's Work Together</h2>
        <Divider color={C.cyan} />
        <div style={{ height: 56 }} />

        <div ref={ref} style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease",
        }} className="contact-grid">
          {/* Left */}
          <div>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.8, marginBottom: 40 }}>
              Whether you need to containerize your app, launch a marketing campaign, or both — we're ready. Fill in the form and we'll get back to you within 24 hours.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
              {[
                { label: "Email", val: "shahidssds65@gmail.com", href: "mailto:shahidssds65@gmail.com" },
                { label: "Location", val: "Lahore, Pakistan", href: null },
                { label: "GitHub", val: "github.com/iamshahid65", href: "#" },
                { label: "LinkedIn", val: "linkedin.com/in/Shahid", href: "#" },
                { label: "Fiverr", val: "fiverr.com/shahid_devops", href: "#" },
              ].map(({ label, val, href }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ fontFamily: MONO, fontSize: 10, color: C.dim, letterSpacing: "0.1em", textTransform: "uppercase", width: 68, flexShrink: 0 }}>{label}</span>
                  {href
                    ? <a href={href} style={{ fontSize: 14, color: C.text, textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.color = C.cyan}
                        onMouseLeave={e => e.currentTarget.style.color = C.text}>{val}</a>
                    : <span style={{ fontSize: 14, color: C.text }}>{val}</span>}
                </div>
              ))}
            </div>
            {/* Trust badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["✓ 50+ Clients Served", "✓ 8-Year Marketing Team", "✓ Reply Within 24h"].map(b => (
                <span key={b} style={{ fontFamily: MONO, fontSize: 11, color: C.green, background: `${C.green}11`, border: `1px solid ${C.green}33`, padding: "4px 12px", borderRadius: 99 }}>{b}</span>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handle} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[["Name", "name", "text", "Your name"], ["Email", "email", "email", "your@email.com"]].map(([label, field, type, ph]) => (
                <div key={field}>
                  <label style={{ fontFamily: MONO, fontSize: 10, color: C.dim, display: "block", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</label>
                  <input required type={type} value={form[field]} placeholder={ph} onChange={e => setForm({ ...form, [field]: e.target.value })} style={inp}
                    onFocus={e => e.target.style.borderColor = C.cyan} onBlur={e => e.target.style.borderColor = C.border} />
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ fontFamily: MONO, fontSize: 10, color: C.dim, display: "block", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>Company</label>
                <input value={form.company} placeholder="Your company" onChange={e => setForm({ ...form, company: e.target.value })} style={inp}
                  onFocus={e => e.target.style.borderColor = C.cyan} onBlur={e => e.target.style.borderColor = C.border} />
              </div>
              <div>
                <label style={{ fontFamily: MONO, fontSize: 10, color: C.dim, display: "block", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>Service Needed</label>
                <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} style={{ ...inp, appearance: "none" }}>
                  <option value="">Select service…</option>
                  <option>DevOps / Cloud</option>
                  <option>Digital Marketing</option>
                  <option>CI/CD Pipeline</option>
                  <option>Full Agency Package</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div>
              <label style={{ fontFamily: MONO, fontSize: 10, color: C.dim, display: "block", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>Message</label>
              <textarea required rows={5} value={form.message} placeholder="Tell us about your project or business challenge…" onChange={e => setForm({ ...form, message: e.target.value })}
                style={{ ...inp, resize: "vertical" }}
                onFocus={e => e.target.style.borderColor = C.cyan} onBlur={e => e.target.style.borderColor = C.border} />
            </div>
            <button type="submit" style={{
              fontFamily: MONO, fontSize: 13, fontWeight: 700, padding: "14px", borderRadius: 8, border: "none", cursor: "pointer",
              background: sent ? C.green : C.gold, color: C.bg0, transition: "all 0.2s",
              boxShadow: sent ? `0 0 24px ${C.green}44` : `0 0 24px ${C.gold}33`,
            }}
              onMouseEnter={e => { if (!sent) { e.currentTarget.style.background = "#e8941a"; } }}
              onMouseLeave={e => { if (!sent) { e.currentTarget.style.background = C.gold; } }}>
              {sent ? "✓ Message Sent! We'll reply within 24h" : "Send Message →"}
            </button>
          </form>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
      `}</style>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: C.bg1, borderTop: `1px solid ${C.border}`, padding: "32px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 700 }}>
          <span style={{ color: C.cyan }}>Shahid</span>
          <span style={{ color: C.text }}>@devops</span>
          <span style={{ color: C.dim }}>:~$</span>
        </span>
        <p style={{ fontFamily: MONO, fontSize: 11, color: C.dim }}>
          © {new Date().getFullYear()} · Built with React · Lahore, Pakistan
        </p>
        <div style={{ display: "flex", gap: 20 }}>
          {["GitHub", "LinkedIn", "Fiverr"].map(l => (
            <a key={l} href="#" style={{ fontFamily: MONO, fontSize: 11, color: C.dim, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = C.cyan}
              onMouseLeave={e => e.currentTarget.style.color = C.dim}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("Home");

  const handleNav = (section) => {
    setActiveNav(section);
    const id = section === "Home" ? "home" : section.toLowerCase();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const ids = [["home","Home"],["services","Services"],["skills","Skills"],["projects","Projects"],["experience","Experience"],["contact","Contact"]];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { const found = ids.find(([id]) => id === e.target.id); if (found) setActiveNav(found[1]); } });
    }, { threshold: 0.35 });
    ids.forEach(([id]) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: C.bg1, minHeight: "100vh", fontFamily: SANS, color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.bg1}; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${C.bg0}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${C.cyan}55; }
        input, textarea, select { font-family: inherit; }
        select option { background: ${C.card}; color: ${C.text}; }
        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Nav active={activeNav} onNav={handleNav} />
      <Hero />
      <Services />
      <WhyUs />
      <Skills />
      <Projects />
      <Experience />
      <CTABand />
      <Contact />
      <Footer />
    </div>
  );
}