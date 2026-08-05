import { useState, useEffect, useRef } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Contact"];

const SKILLS = [
  { category: "Cloud & DevOps", items: ["Docker", "Kubernetes", "CI/CD", "AWS", "Terraform", "Ansible", "Linux", "Nginx"] },
  { category: "Backend", items: ["Node.js", "Express.js", "REST APIs", "MongoDB", "PostgreSQL", "Redis"] },
  { category: "Frontend", items: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "HTML/CSS"] },
  { category: "Tools", items: ["Git", "GitHub Actions", "Jenkins", "Prometheus", "Grafana", "VS Code"] },
];

const PROJECTS = [
  {
    title: "Containerized MERN Deployment",
    desc: "Multi-container Docker Compose setup for a full-stack MERN application with Nginx reverse proxy, automated health checks, and zero-downtime restarts.",
    tags: ["Docker", "Nginx", "MongoDB", "Node.js"],
    type: "DevOps",
    link: "#",
  },
  {
    title: "Kubernetes Microservices Cluster",
    desc: "Production-grade K8s cluster on local bare-metal with Helm charts, horizontal pod autoscaling, and Prometheus/Grafana observability stack.",
    tags: ["Kubernetes", "Helm", "Prometheus", "Grafana"],
    type: "Infrastructure",
    link: "#",
  },
  {
    title: "CI/CD Pipeline Automation",
    desc: "GitHub Actions pipeline for a Node.js app: lint → test → Docker build → push to registry → deploy to staging with Slack notifications.",
    tags: ["GitHub Actions", "Docker", "Node.js", "CI/CD"],
    type: "Automation",
    link: "#",
  },
  {
    title: "MERN E-Commerce Platform",
    desc: "Full-stack e-commerce app with JWT auth, Stripe payments, admin dashboard, and Redis caching — deployed on a VPS with Docker.",
    tags: ["React", "Express", "MongoDB", "Redis"],
    type: "Full Stack",
    link: "#",
  },
  {
    title: "Fiverr Docker Consultation Gig",
    desc: "Freelance service helping clients containerize their applications — Dockerfiles, Compose configs, and deployment guides tailored to their stack.",
    tags: ["Docker", "Docker Compose", "Freelance"],
    type: "Freelance",
    link: "#",
  },
  {
    title: "Infrastructure Monitoring Dashboard",
    desc: "Custom Grafana dashboards pulling from Prometheus node exporter — CPU, memory, disk I/O, and container metrics across multiple hosts.",
    tags: ["Grafana", "Prometheus", "Linux", "Docker"],
    type: "Observability",
    link: "#",
  },
];

const EXPERIENCE = [
  {
    role: "Cloud & DevOps Engineer",
    company: "Freelance (Fiverr)",
    period: "2024 – Present",
    desc: "Delivering Docker containerization, CI/CD pipelines, and cloud deployment services to international clients.",
    bullets: [
      "Containerize client applications using Docker & Docker Compose",
      "Set up automated CI/CD pipelines with GitHub Actions",
      "Configure Nginx reverse proxies and SSL certificates",
    ],
  },
  {
    role: "Software Engineering Intern",
    company: "Systems Limited",
    period: "2023",
    desc: "Contributed to backend services and gained hands-on exposure to enterprise-scale development workflows.",
    bullets: [
      "Developed REST APIs with Node.js and Express",
      "Collaborated in Agile sprints using Jira and Git",
      "Wrote unit tests and participated in code reviews",
    ],
  },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useTypingEffect(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;
    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Cursor() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setOn((v) => !v), 530);
    return () => clearInterval(t);
  }, []);
  return <span style={{ opacity: on ? 1 : 0, color: "#00D4FF" }}>█</span>;
}

function Tag({ label }) {
  return (
    <span className="inline-block px-2 py-0.5 rounded text-xs font-mono border"
      style={{ borderColor: "#00D4FF33", color: "#00D4FF", background: "#00D4FF11" }}>
      {label}
    </span>
  );
}

function TypeBadge({ label }) {
  const colors = {
    DevOps: "#A78BFA",
    Infrastructure: "#34D399",
    Automation: "#FBBF24",
    "Full Stack": "#F472B6",
    Freelance: "#00D4FF",
    Observability: "#FB923C",
  };
  const c = colors[label] || "#9CA3AF";
  return (
    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full"
      style={{ color: c, background: c + "22" }}>
      {label}
    </span>
  );
}

function SectionHeading({ number, title }) {
  return (
    <div className="mb-12 md:mb-16">
      <p className="font-mono text-sm mb-2" style={{ color: "#00D4FF" }}>
        <span style={{ opacity: 0.5 }}>// </span>{String(number).padStart(2, "0")}
      </p>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "#E8EDF5" }}>
        {title}
      </h2>
      <div className="mt-4 h-px w-16" style={{ background: "#00D4FF" }} />
    </div>
  );
}

// ─── Sections ────────────────────────────────────────────────────────────────

function Nav({ active, onNav }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: scrolled ? "#0D0F14ee" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid #1A1D2488" : "none" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <span className="font-mono text-lg font-bold" style={{ color: "#00D4FF" }}>
            Shahid<span style={{ color: "#E8EDF5" }}>@devops</span><span style={{ color: "#6B7280" }}>:~$</span>
          </span>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button key={l} onClick={() => onNav(l)}
                className="font-mono text-sm transition-colors duration-200"
                style={{ color: active === l ? "#00D4FF" : "#9CA3AF" }}>
                {l}
              </button>
            ))}
            <a href="mailto:shahidssds@email.com"
              className="font-mono text-sm px-4 py-1.5 rounded border transition-all duration-200 hover:bg-cyan-400 hover:text-black"
              style={{ borderColor: "#00D4FF", color: "#00D4FF" }}>
              Hire Me
            </a>
          </div>

          {/* Mobile burger */}
          <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)}>
            {[0, 1, 2].map((i) => (
              <span key={i} className="block w-6 h-0.5 transition-all duration-200"
                style={{ background: "#E8EDF5", transform: open && i === 0 ? "rotate(45deg) translate(4px,4px)" : open && i === 2 ? "rotate(-45deg) translate(4px,-4px)" : "none", opacity: open && i === 1 ? 0 : 1 }} />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-80 pb-4" : "max-h-0"}`}>
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => { onNav(l); setOpen(false); }}
              className="block w-full text-left font-mono text-sm py-2.5 px-2 transition-colors"
              style={{ color: active === l ? "#00D4FF" : "#9CA3AF" }}>
              {l}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const typed = useTypingEffect([
    "Cloud & DevOps Engineer",
    "Docker Specialist",
    "Kubernetes Enthusiast",
    "CI/CD Automation",
    "MERN Stack Developer",
  ]);

  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-12 overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(#1A1D2420 1px,transparent 1px),linear-gradient(90deg,#1A1D2420 1px,transparent 1px)",
        backgroundSize: "48px 48px",
      }} />
      {/* Cyan glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #00D4FF18 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto w-full">
        {/* Terminal prompt line */}
        <p className="font-mono text-sm sm:text-base mb-6" style={{ color: "#6B7280" }}>
          <span style={{ color: "#00D4FF" }}>Shahid@portfolio</span>
          <span>:</span>
          <span style={{ color: "#A78BFA" }}>~/</span>
          <span style={{ color: "#E8EDF5" }}> $ whoami</span>
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-none mb-4"
          style={{ color: "#E8EDF5" }}>
          Muhammad<br />
          <span style={{ color: "#00D4FF" }}>Shahid Afzal</span>
        </h1>

        <div className="flex items-center gap-2 mt-6 mb-8">
          <span className="font-mono text-base sm:text-lg md:text-xl" style={{ color: "#6B7280" }}>&gt;&nbsp;</span>
          <span className="font-mono text-base sm:text-lg md:text-xl" style={{ color: "#E8EDF5" }}>{typed}</span>
          <Cursor />
        </div>

        <p className="max-w-xl text-base sm:text-lg leading-relaxed mb-10" style={{ color: "#9CA3AF" }}>
          Cloud & DevOps engineer based in <span style={{ color: "#E8EDF5" }}>Lahore, Pakistan</span>,
          building reliable infrastructure and automating everything that can be automated.
          Currently deepening Kubernetes expertise and pursuing a BS in Software Engineering at Superior University.
        </p>

        <div className="flex flex-wrap gap-4">
          <a href="#projects" className="font-mono text-sm px-6 py-3 rounded transition-all duration-200 font-semibold"
            style={{ background: "#00D4FF", color: "#0D0F14" }}
            onMouseEnter={e => e.currentTarget.style.background = "#00b8d9"}
            onMouseLeave={e => e.currentTarget.style.background = "#00D4FF"}>
            View Projects →
          </a>
          <a href="#contact" className="font-mono text-sm px-6 py-3 rounded border transition-all duration-200"
            style={{ borderColor: "#1A1D24", color: "#E8EDF5" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#00D4FF"; e.currentTarget.style.color = "#00D4FF"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#1A1D24"; e.currentTarget.style.color = "#E8EDF5"; }}>
            Get In Touch
          </a>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-8 mt-16 pt-8" style={{ borderTop: "1px solid #1A1D24" }}>
          {[["1+", "Year DevOps"], ["6+", "Projects"], ["CKAD", "In Progress"], ["Systems Ltd", "Internship"]].map(([n, l]) => (
            <div key={l}>
              <p className="text-xl sm:text-2xl font-bold font-mono" style={{ color: "#00D4FF" }}>{n}</p>
              <p className="text-xs sm:text-sm mt-1" style={{ color: "#6B7280" }}>{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const [ref, inView] = useInView();
  return (
    <section id="skills" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8" style={{ background: "#0D0F14" }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeading number={1} title="Skills & Stack" />
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {SKILLS.map((group, gi) => (
            <div key={group.category}
              className="rounded-xl p-6 transition-all duration-500"
              style={{
                background: "#1A1D24",
                border: "1px solid #252830",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${gi * 80}ms`,
              }}>
              <p className="font-mono text-xs mb-4 uppercase tracking-widest" style={{ color: "#00D4FF" }}>
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Tag key={item} label={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [ref, inView] = useInView(0.05);
  const [filter, setFilter] = useState("All");
  const types = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.type)))];
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.type === filter);

  return (
    <section id="projects" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8" style={{ background: "#080A0F" }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeading number={2} title="Projects" />

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {types.map((t) => (
            <button key={t} onClick={() => setFilter(t)}
              className="font-mono text-xs px-3 py-1.5 rounded-full border transition-all duration-200"
              style={{
                borderColor: filter === t ? "#00D4FF" : "#252830",
                color: filter === t ? "#00D4FF" : "#6B7280",
                background: filter === t ? "#00D4FF11" : "transparent",
              }}>
              {t}
            </button>
          ))}
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <div key={p.title}
              className="group rounded-xl p-6 flex flex-col gap-4 transition-all duration-500 cursor-pointer"
              style={{
                background: "#1A1D24",
                border: "1px solid #252830",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(32px)",
                transitionDelay: `${i * 60}ms`,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#00D4FF44"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#252830"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-base leading-snug" style={{ color: "#E8EDF5" }}>{p.title}</h3>
                <TypeBadge label={p.type} />
              </div>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "#6B7280" }}>{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => <Tag key={t} label={t} />)}
              </div>
              <a href={p.link} className="font-mono text-xs mt-1 transition-colors"
                style={{ color: "#00D4FF" }}
                onMouseEnter={e => e.currentTarget.style.color = "#00b8d9"}
                onMouseLeave={e => e.currentTarget.style.color = "#00D4FF"}>
                View Project →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const [ref, inView] = useInView();
  return (
    <section id="experience" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8" style={{ background: "#0D0F14" }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeading number={3} title="Experience" />
        <div ref={ref} className="relative max-w-3xl">
          {/* vertical line */}
          <div className="absolute left-3 top-2 bottom-2 w-px" style={{ background: "#1A1D24" }} />
          <div className="flex flex-col gap-10">
            {EXPERIENCE.map((exp, i) => (
              <div key={exp.role}
                className="pl-12 relative transition-all duration-500"
                style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-20px)", transitionDelay: `${i * 150}ms` }}>
                {/* dot */}
                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: "#0D0F14", border: "2px solid #00D4FF" }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: "#00D4FF" }} />
                </div>

                <div className="rounded-xl p-6" style={{ background: "#1A1D24", border: "1px solid #252830" }}>
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-base" style={{ color: "#E8EDF5" }}>{exp.role}</h3>
                    <span className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: "#252830", color: "#6B7280" }}>{exp.period}</span>
                  </div>
                  <p className="font-mono text-sm mb-3" style={{ color: "#00D4FF" }}>{exp.company}</p>
                  <p className="text-sm mb-4" style={{ color: "#9CA3AF" }}>{exp.desc}</p>
                  <ul className="space-y-1.5">
                    {exp.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm" style={{ color: "#6B7280" }}>
                        <span style={{ color: "#00D4FF", flexShrink: 0 }}>›</span>
                        {b}
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

function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  const inputStyle = {
    background: "#1A1D24",
    border: "1px solid #252830",
    color: "#E8EDF5",
    borderRadius: "8px",
    padding: "10px 14px",
    width: "100%",
    fontFamily: "inherit",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8" style={{ background: "#080A0F" }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeading number={4} title="Get In Touch" />
        <div ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)" }}>

          {/* Left */}
          <div>
            <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: "#9CA3AF" }}>
              I'm open to entry-level DevOps roles, cloud engineering positions, and freelance DevOps/Docker work.
              If you have a project or opportunity, let's talk.
            </p>
            <div className="space-y-4">
              {[
                { label: "Email", value: "shahidssds65@email.com", href: "mailto:shahidssds65@email.com" },
                { label: "Location", value: "Lahore, Pakistan", href: null },
                { label: "GitHub", value: "github.com/iamshahid65", href: "#" },
                { label: "LinkedIn", value: "linkedin.com/in/Shahid", href: "#" },
              ].map(({ label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="font-mono text-xs w-20 flex-shrink-0" style={{ color: "#6B7280" }}>{label}</span>
                  {href
                    ? <a href={href} className="text-sm transition-colors" style={{ color: "#E8EDF5" }}
                        onMouseEnter={e => e.currentTarget.style.color = "#00D4FF"}
                        onMouseLeave={e => e.currentTarget.style.color = "#E8EDF5"}>{value}</a>
                    : <span className="text-sm" style={{ color: "#E8EDF5" }}>{value}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handle} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-xs mb-1.5 block" style={{ color: "#6B7280" }}>Name</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "#00D4FF"}
                  onBlur={e => e.target.style.borderColor = "#252830"} />
              </div>
              <div>
                <label className="font-mono text-xs mb-1.5 block" style={{ color: "#6B7280" }}>Email</label>
                <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "#00D4FF"}
                  onBlur={e => e.target.style.borderColor = "#252830"} />
              </div>
            </div>
            <div>
              <label className="font-mono text-xs mb-1.5 block" style={{ color: "#6B7280" }}>Message</label>
              <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about the opportunity or project…"
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={e => e.target.style.borderColor = "#00D4FF"}
                onBlur={e => e.target.style.borderColor = "#252830"} />
            </div>
            <button type="submit"
              className="w-full font-mono text-sm py-3 rounded-lg font-semibold transition-all duration-200"
              style={{ background: sent ? "#34D399" : "#00D4FF", color: "#0D0F14" }}
              onMouseEnter={e => { if (!sent) e.currentTarget.style.background = "#00b8d9"; }}
              onMouseLeave={e => { if (!sent) e.currentTarget.style.background = "#00D4FF"; }}>
              {sent ? "✓ Message Sent!" : "Send Message →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 text-center" style={{ background: "#0D0F14", borderTop: "1px solid #1A1D24" }}>
      <p className="font-mono text-xs" style={{ color: "#6B7280" }}>
        <span style={{ color: "#00D4FF" }}>Shahid@portfolio</span>:~$ Built with React + Tailwind CSS · {new Date().getFullYear()}
      </p>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("About");

  // Smooth scroll
  const handleNav = (section) => {
    setActiveNav(section);
    const el = document.getElementById(section.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Update active nav on scroll
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.toLowerCase());
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveNav(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1));
        });
      },
      { threshold: 0.4 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: "#0D0F14", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #080A0F; }
        ::-webkit-scrollbar-thumb { background: #252830; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #00D4FF44; }
        .font-mono { font-family: 'Space Mono', monospace; }
      `}</style>
      <Nav active={activeNav} onNav={handleNav} />
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
