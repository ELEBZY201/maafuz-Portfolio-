"use client";
import { useState, useEffect, useRef } from "react";
import { ProjectCard } from "../ProjectCard";

const SKILLS = [
  { name: "React.js", level: 92 }, { name: "Node.js", level: 90 },
  { name: "TypeScript", level: 85 }, { name: "AWS (EC2/S3/Lambda)", level: 88 },
  { name: "Docker & Kubernetes", level: 82 }, { name: "PostgreSQL", level: 85 },
  { name: "GraphQL", level: 80 }, { name: "Terraform & Ansible", level: 83 },
  { name: "Python", level: 78 }, { name: "CI/CD (GitHub Actions)", level: 87 },
];

type Project = {
  name: string;
  desc: string;
  techStack: string[];
  live: string;
  github: string;
  metric: string;
  highlight?: boolean;
  stats?: { value: string; label: string }[];
  features?: string[];
};

const PROJECTS: Project[] = [
  {
    name: "Kimera-AI",
    desc: "AI-powered LinkedIn post generator with viral scoring, voice cloning, content calendar, and 3-tier subscription system. Built with Claude API and deployed on Vercel.",
    techStack: ["Next.js", "Claude API", "Node.js", "Vercel"],
    live: "https://kimera-ai.vercel.app",
    github: "https://github.com/ELEBZY201/kimera-ai",
    metric: "Live · $9/mo SaaS",
    highlight: true,
  },
  {
    name: "Eazitool",
    desc: "Online file conversion, image enhancement, and CV optimization toolkit built for speed and zero-friction usage in the browser.",
    techStack: ["Next.js", "TypeScript", "Node.js", "AI APIs", "Vercel"],
    live: "https://eazitool.vercel.app",
    github: "https://github.com/ELEBZY201",
    metric: "10K Daily · 50 Tools",
    stats: [
      { value: "10K", label: "Daily" },
      { value: "50", label: "Tools" },
      { value: "<30s", label: "Avg Time" },
    ],
    features: [
      "PDF converter for quick document format workflows",
      "AI image upscaler that improves quality with minimal blur",
      "ATS CV tool for screening-ready resume formatting",
    ],
  },
  {
    name: "WazobiaMail",
    desc: "Nigerian-focused email platform serving local users with reliable, fast web mail. Contributed to frontend and API integration across the platform.",
    techStack: ["React.js", "Node.js", "REST APIs"],
    live: "https://www.wazobiamail.com",
    github: "https://github.com/ELEBZY201",
    metric: "Production · Live",
  },
  {
    name: "Revv — Car Auction",
    desc: "Full frontend for a high-end classic car auction platform with live listings, bid management, real-time status updates, and a premium results dashboard.",
    techStack: ["React.js", "Node.js", "REST APIs"],
    live: "#",
    github: "https://github.com/ELEBZY201",
    metric: "Premium UI · Built",
  },
  {
    name: "Kalvox AI",
    desc: "Autonomous AI cold-calling platform targeting Nigerian bank executives. Built full frontend and API integration layer with voice cloning and prospect enrichment.",
    techStack: ["React.js", "Node.js", "AI Integration"],
    live: "#",
    github: "https://github.com/ELEBZY201",
    metric: "AI-Powered · Sales",
  },
];

const EXPERIENCE = [
  {
    role: "Software Engineer",
    company: "Analogue Shifts",
    period: "April 2024 – Present",
    points: [
      "Supported infrastructure of a $200M company managing AWS EC2, RDS, ELB, S3, Route53, and CloudFront CDN",
      "Automated deployment of 13 servers using Ansible + Terraform — 92% reduction in manual effort",
      "Reduced server downtime by 67% through improved monitoring and 24/7 maintenance",
      "Led migration of legacy Java app to modern Python system — full refactor, data migration, optimisation",
      "Reduced security incidents by 82% by guiding 30+ clients on endpoint security best practices",
    ],
  },
  {
    role: "Software Engineer",
    company: "GoldenOx Partners Ltd.",
    period: "July 2022 – March 2024",
    points: [
      "Delivered technical solutions across multiple clients and diverse technology stacks",
      "Implemented Jenkins CI/CD pipelines, automating build, test, and deployment workflows",
      "Improved server uptime by 43.5% through enhanced monitoring and round-the-clock maintenance",
      "Built AWS Lambda functions to automate CSV-to-RDF data conversion at scale",
      "Managed Docker containerization and Kubernetes cluster deployments in production",
    ],
  },
];

function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setFilled(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 12, color: "#e2e8f0" }}>{name}</span>
        <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, color: "#00d4d4" }}>{level}%</span>
      </div>
      <div className="skill-bar">
        <div className="skill-fill" style={{ width: filled ? `${level}%` : "0%" }} />
      </div>
    </div>
  );
}

function TypeWriter({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i < text.length) {
      const t = setTimeout(() => { setDisplayed(text.slice(0, i + 1)); setI(i + 1); }, 60);
      return () => clearTimeout(t);
    }
  }, [i, text]);
  return (
    <span>
      {displayed}
      <span className="cursor-blink" style={{ color: "#00d4d4" }}>|</span>
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "experience", "contact"];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) { setActiveSection(s); break; }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(13,17,23,0.9)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,212,212,0.1)", padding: "0 24px",
        height: 64, display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, border: "1.5px solid #00d4d4", borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'JetBrains Mono'", fontSize: 14, color: "#00d4d4", fontWeight: 700
          }}>M</div>
          <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 14, color: "#e2e8f0", fontWeight: 500 }}>
            maafuz<span style={{ color: "#00d4d4" }}>.dev</span>
          </span>
        </div>
        <div className="hide-mobile" style={{ display: "flex", gap: 32 }}>
          {["home","about","skills","projects","experience","contact"].map(s => (
            <button key={s} onClick={() => scrollTo(s)} className="nav-link"
              style={{ background: "none", border: "none", color: activeSection === s ? "#00d4d4" : "#64748b", cursor: "pointer" }}>
              <span style={{ color: "#00d4d4", marginRight: 4 }}>//</span>{s}
            </button>
          ))}
        </div>
        <button className="btn-primary" style={{ fontSize: 12, padding: "8px 20px" }}
          onClick={() => window.open("https://github.com/ELEBZY201", "_blank")}>
          GitHub ↗
        </button>
      </nav>

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "80px 24px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ width: "100%" }}>
          <p className="section-label animate-fade-up" style={{ marginBottom: 20 }}>
            // hello, world
          </p>
          <h1 className="animate-fade-up" style={{ fontSize: "clamp(40px,7vw,80px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 20, animationDelay: "0.1s", opacity: 0 }}>
            Maafuz<br />
            <span style={{ color: "#00d4d4" }} className="cyan-glow">Ismail.</span>
          </h1>
          <h2 className="animate-fade-up" style={{ fontSize: "clamp(18px,3vw,28px)", color: "#64748b", fontWeight: 400, marginBottom: 24, animationDelay: "0.2s", opacity: 0, fontFamily: "'JetBrains Mono'", minHeight: 40 }}>
            <TypeWriter text="Full-Stack Engineer · Cloud Infrastructure · AI Systems" />
          </h2>
          <p className="animate-fade-up" style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.8, maxWidth: 560, marginBottom: 40, animationDelay: "0.3s", opacity: 0 }}>
            4+ years building scalable web applications and cloud infrastructure. 
            92% deployment automation, 67% downtime reduction. Currently building
            <span style={{ color: "#00d4d4" }}> Kimera-AI</span> and
            <span style={{ color: "#00d4d4" }}> Eazitool</span>.
          </p>
          <div className="animate-fade-up" style={{ display: "flex", gap: 16, flexWrap: "wrap", animationDelay: "0.4s", opacity: 0 }}>
            <button className="btn-primary" onClick={() => scrollTo("projects")}>View My Work</button>
            <button className="btn-secondary" onClick={() => scrollTo("contact")}>Get In Touch</button>
            <button className="btn-secondary" onClick={() => window.open("https://github.com/ELEBZY201","_blank")}>GitHub ↗</button>
          </div>

          {/* Stats */}
          <div className="animate-fade-up" style={{ display: "flex", gap: 40, marginTop: 60, flexWrap: "wrap", animationDelay: "0.5s", opacity: 0 }}>
            {[["92%","Deployment Automation"],["67%","Downtime Reduction"],["82%","Security Improvement"],["10K+","Daily Ops"],["4+","Years Experience"]].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#00d4d4", fontFamily: "'JetBrains Mono'" }}>{v}</div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" style={{ margin: "0 24px" }} />

      {/* ABOUT */}
      <section id="about" style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <p className="section-label" style={{ marginBottom: 16 }}>// about_me</p>
        <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, marginBottom: 48, color: "#e2e8f0" }}>
          Who I <span style={{ color: "#00d4d4" }}>Am</span>
        </h2>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          <div>
            <p style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.9, marginBottom: 20 }}>
              I'm a Full-Stack Software Engineer based in Abuja, Nigeria with 4+ years of experience 
              delivering production-grade web applications and cloud infrastructure for companies ranging 
              from startups to $200M enterprises.
            </p>
            <p style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.9, marginBottom: 20 }}>
              My stack spans React frontends, Node.js APIs, AWS cloud infrastructure, and DevOps automation. 
              I don't just write code — I architect systems that scale, reduce costs, and eliminate toil.
            </p>
            <p style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.9 }}>
              Outside client work, I build my own products. <span style={{ color: "#00d4d4" }}>Kimera-AI</span> is 
              my current SaaS — a LinkedIn post generator with AI viral scoring, live and growing.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "Location", value: "Abuja, Nigeria" },
              { label: "Email", value: "maafuzayodeji@gmail.com" },
              { label: "GitHub", value: "github.com/ELEBZY201" },
              { label: "Current Role", value: "Software Engineer @ Analogue Shifts" },
              { label: "Building", value: "Kimera-AI (kimera-ai.vercel.app)" },
              { label: "Available For", value: "Full-time · Freelance · Remote" },
            ].map(({ label, value }) => (
              <div key={label} className="card" style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, color: "#64748b", letterSpacing: "0.1em" }}>{label}</span>
                <span style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" style={{ margin: "0 24px" }} />

      {/* SKILLS */}
      <section id="skills" style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <p className="section-label" style={{ marginBottom: 16 }}>// tech_stack</p>
        <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, marginBottom: 48, color: "#e2e8f0" }}>
          Skills & <span style={{ color: "#00d4d4" }}>Tools</span>
        </h2>
        <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div>
            {SKILLS.slice(0, 5).map(s => <SkillBar key={s.name} {...s} />)}
          </div>
          <div>
            {SKILLS.slice(5).map(s => <SkillBar key={s.name} {...s} />)}
          </div>
        </div>
        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 48 }}>
          {["React.js","Next.js","Node.js","Express.js","TypeScript","Python","Java","GraphQL","PostgreSQL","AWS EC2","AWS S3","AWS Lambda","CloudFront","Route53","Docker","Kubernetes","Terraform","Ansible","GitHub Actions","Jenkins","Redis","REST APIs"].map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </section>

      <div className="divider" style={{ margin: "0 24px" }} />

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <p className="section-label" style={{ marginBottom: 16 }}>// featured_work</p>
        <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, marginBottom: 48, color: "#e2e8f0" }}>
          What I've <span style={{ color: "#00d4d4" }}>Built</span>
        </h2>
        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {PROJECTS.map((p) => (
            <ProjectCard
              key={p.name}
              title={p.name}
              description={p.desc}
              liveUrl={p.live}
              githubUrl={p.github}
              metric={p.metric}
              techStack={p.techStack}
              highlight={p.highlight}
              stats={p.stats}
              features={p.features}
            />
          ))}
        </div>
      </section>

      <div className="divider" style={{ margin: "0 24px" }} />

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <p className="section-label" style={{ marginBottom: 16 }}>// work_history</p>
        <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, marginBottom: 48, color: "#e2e8f0" }}>
          Experience
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {EXPERIENCE.map((e, i) => (
            <div key={i} className="card" style={{ padding: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#e2e8f0", marginBottom: 4 }}>{e.role}</h3>
                  <p style={{ color: "#00d4d4", fontFamily: "'JetBrains Mono'", fontSize: 13 }}>{e.company}</p>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 12, color: "#64748b", background: "rgba(0,212,212,0.05)", border: "1px solid rgba(0,212,212,0.1)", padding: "6px 14px", borderRadius: 4 }}>{e.period}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {e.points.map((pt, j) => (
                  <div key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ color: "#00d4d4", fontSize: 14, marginTop: 2, flexShrink: 0 }}>▸</span>
                    <span style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6 }}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" style={{ margin: "0 24px" }} />

      {/* CONTACT */}
      <section id="contact" style={{ padding: "80px 24px", maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <p className="section-label" style={{ marginBottom: 16 }}>// get_in_touch</p>
        <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, marginBottom: 16, color: "#e2e8f0" }}>
          Let's <span style={{ color: "#00d4d4" }}>Work Together</span>
        </h2>
        <p style={{ fontSize: 16, color: "#64748b", marginBottom: 48, lineHeight: 1.7 }}>
          Open to full-time roles, freelance projects, and interesting collaborations.
          Drop me a message and I'll get back within 24 hours.
        </p>
        {sent ? (
          <div className="card" style={{ padding: 32 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
            <p style={{ color: "#00d4d4", fontFamily: "'JetBrains Mono'", fontSize: 14 }}>Message sent! I'll reply within 24 hours.</p>
          </div>
        ) : (
          <div className="card" style={{ padding: 32, textAlign: "left" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="Your name" style={{
                  background: "rgba(0,212,212,0.03)", border: "1px solid #1e3a5f", borderRadius: 6,
                  padding: "12px 16px", color: "#e2e8f0", fontSize: 14, fontFamily: "inherit",
                  outline: "none", width: "100%"
                }} />
              <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                placeholder="your@email.com" style={{
                  background: "rgba(0,212,212,0.03)", border: "1px solid #1e3a5f", borderRadius: 6,
                  padding: "12px 16px", color: "#e2e8f0", fontSize: 14, fontFamily: "inherit",
                  outline: "none", width: "100%"
                }} />
              <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                placeholder="Tell me about the role or project..." rows={5} style={{
                  background: "rgba(0,212,212,0.03)", border: "1px solid #1e3a5f", borderRadius: 6,
                  padding: "12px 16px", color: "#e2e8f0", fontSize: 14, fontFamily: "inherit",
                  outline: "none", width: "100%", resize: "vertical"
                }} />
              {error && <p style={{ color: '#ff6b6b', fontSize: 14, marginTop: 8 }}>{error}</p>}
              <button className="btn-primary" style={{ width: "100%", padding: 14, fontSize: 13 }}
                onClick={async () => {
                  if (!formData.name || !formData.email || !formData.message) return;
                  setError("");
                  try {
                    const res = await fetch('/api/contact', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(formData)
                    });
                    if (res.ok) {
                      setSent(true);
                      setFormData({ name: "", email: "", message: "" });
                    } else {
                      setError("Failed to send message. Please try again.");
                    }
                  } catch (err) {
                    setError("Network error. Please try again.");
                  }
                }}>
                Send Message →
              </button>
            </div>
          </div>
        )}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 32 }}>
          <button className="btn-secondary" style={{ fontSize: 12 }}
            onClick={() => window.open("mailto:maafuzayodeji@gmail.com")}>
            maafuzayodeji@gmail.com
          </button>
          <button className="btn-secondary" style={{ fontSize: 12 }}
            onClick={() => window.open("https://github.com/ELEBZY201","_blank")}>
            GitHub ↗
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #1e3a5f", padding: "32px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "'JetBrains Mono'", fontSize: 12, color: "#64748b" }}>
          <span style={{ color: "#00d4d4" }}>maafuz.dev</span> · Built with Next.js · Deployed on Vercel · © 2026 Maafuz Ismail
        </p>
      </footer>
    </div>
  );
}
