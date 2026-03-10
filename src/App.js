import emailjs from '@emailjs/browser';

import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Projects", "Skills", "Contact"];

const PROJECTS = [
  {
    id: 1,
    title: "NHS vs Private Decision Engine",
    description: "A live web application built with Python and Flask helping UK residents make informed healthcare decisions. Deployed and used by real users.",
    tech: ["Python", "Flask", "HTML", "CSS"],
    emoji: "🏥",
    color: "#00ff88"
    live: "https://nhs-vs-private.onrender.com",
    link: "https://github.com/deva1611/nhs-vs-private"
  },
  {
    id: 2,
    title: "Face Recognition Security System",
    description: "Real-time face recognition using C++, OpenCV and ESP32 on Linux. Detects known and unknown individuals with a live video feed. (In Progress)",
    tech: ["C++", "OpenCV", "ESP32", "Linux"],
    emoji: "🔐",
    color: "#00c8ff",
    live: null,
    link: "https://github.com/deva1611"
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "This very portfolio — built with React and modern CSS. A full showcase of my skills and projects as a developer, deployed and live.",
    tech: ["React", "JavaScript", "CSS"],
    emoji: "🚀",
    color: "#ff6b6b",
    live: null,
    link: "https://github.com/deva1611"
  }
];

const SKILLS = [
  { name: "Python", level: 80, color: "#00ff88" },
  { name: "C++", level: 75, color: "#00c8ff" },
  { name: "C", level: 70, color: "#a78bfa" },
  { name: "HTML & CSS", level: 75, color: "#ff6b6b" },
  { name: "JavaScript", level: 55, color: "#ffd700" },
  { name: "React", level: 45, color: "#61dafb" },
  { name: "Flask", level: 70, color: "#fb923c" },
  { name: "ESP32 / Embedded", level: 72, color: "#f472b6" },
  { name: "Git & Linux", level: 68, color: "#34d399" },
];

function useTypewriter(words, speed = 80) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1500);
        } else {
          setCharIndex(c => c + 1);
        }
      } else {
        setDisplayed(current.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setWordIndex(i => (i + 1) % words.length);
          setCharIndex(0);
        } else {
          setCharIndex(c => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed]);

  return displayed;
}

function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "1rem 3rem",
      background: scrolled ? "rgba(5,5,20,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.4s ease"
    }}>
      <div style={{ fontFamily: "'Courier New', monospace", color: "#00ff88", fontSize: "1.2rem", fontWeight: "bold", letterSpacing: "2px" }}>
        &lt;DRK /&gt;
      </div>
      <div style={{ display: "flex", gap: "2rem" }}>
        {NAV_LINKS.map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} onClick={(e) => {
            e.preventDefault();
            setActive(link);
            const el = document.getElementById(link.toLowerCase());
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }} style={{
            color: active === link ? "#00ff88" : "rgba(255,255,255,0.6)",
            textDecoration: "none", fontSize: "0.85rem", letterSpacing: "1.5px",
            textTransform: "uppercase", fontFamily: "'Courier New', monospace",
            transition: "color 0.3s", cursor: "pointer",
            borderBottom: active === link ? "1px solid #00ff88" : "none", paddingBottom: "2px"
          }}>{link}</a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  const typed = useTypewriter(["Embedded Systems Engineer", "Python Developer", "C++ Programmer", "Graduate seeking UK roles", "Hardware meets Software"]);
  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", position: "relative", overflow: "hidden", padding: "2rem" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px)`, backgroundSize: "60px 60px", animation: "gridMove 20s linear infinite" }} />
      <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", top: "10%", left: "10%", background: "radial-gradient(circle, rgba(0,255,136,0.08) 0%, transparent 70%)", animation: "float 8s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", bottom: "10%", right: "10%", background: "radial-gradient(circle, rgba(0,200,255,0.08) 0%, transparent 70%)", animation: "float 10s ease-in-out infinite reverse" }} />

      <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
        <div style={{ display: "inline-block", border: "1px solid rgba(0,255,136,0.3)", borderRadius: "2rem", padding: "0.4rem 1.2rem", marginBottom: "2rem", color: "#00ff88", fontFamily: "'Courier New', monospace", fontSize: "0.8rem", letterSpacing: "2px", background: "rgba(0,255,136,0.06)" }}>
          📍 Liverpool, UK — Available Immediately
        </div>
        <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", fontFamily: "'Georgia', serif", fontWeight: "900", lineHeight: 1.05, margin: "0 0 0.5rem", color: "#fff", letterSpacing: "-2px" }}>
          Devendra Reddy<br />
          <span style={{ background: "linear-gradient(135deg, #00ff88, #00c8ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Keesara</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Georgia, serif", fontSize: "1rem", marginBottom: "0.8rem" }}>
          MSc Embedded Systems & IC Design · Liverpool John Moores University
        </p>
        <div style={{ height: "2.5rem", fontFamily: "'Courier New', monospace", fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", marginBottom: "2.5rem" }}>
          {typed}<span style={{ color: "#00ff88", animation: "blink 1s infinite" }}>|</span>
        </div>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#projects" onClick={e => { e.preventDefault(); document.getElementById("projects").scrollIntoView({ behavior: "smooth" }); }} style={{ padding: "0.9rem 2.2rem", background: "linear-gradient(135deg, #00ff88, #00c8ff)", color: "#050514", borderRadius: "0.5rem", textDecoration: "none", fontWeight: "700", fontFamily: "'Courier New', monospace", fontSize: "0.9rem", letterSpacing: "1px", cursor: "pointer" }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 30px rgba(0,255,136,0.4)"; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}>
            View My Work →
          </a>
          <a href="https://www.linkedin.com/in/devendra-reddy-keesara-a55912254" target="_blank" style={{ padding: "0.9rem 2.2rem", background: "transparent", color: "#fff", borderRadius: "0.5rem", textDecoration: "none", fontWeight: "600", fontFamily: "'Courier New', monospace", fontSize: "0.9rem", letterSpacing: "1px", border: "1px solid rgba(255,255,255,0.2)" }}
            onMouseEnter={e => { e.target.style.borderColor = "#00c8ff"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.2)"; e.target.style.transform = "translateY(0)"; }}>LinkedIn</a>
          <a href="https://github.com/deva1611" target="_blank" style={{ padding: "0.9rem 2.2rem", background: "transparent", color: "#fff", borderRadius: "0.5rem", textDecoration: "none", fontWeight: "600", fontFamily: "'Courier New', monospace", fontSize: "0.9rem", letterSpacing: "1px", border: "1px solid rgba(255,255,255,0.2)" }}
            onMouseEnter={e => { e.target.style.borderColor = "#00ff88"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.2)"; e.target.style.transform = "translateY(0)"; }}>GitHub</a>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", letterSpacing: "2px", fontFamily: "'Courier New', monospace", animation: "float 2s ease-in-out infinite" }}>
        SCROLL
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(0,255,136,0.6), transparent)" }} />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "6rem 3rem", maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center", width: "100%" }}>
        <div style={{ position: "relative" }}>
          <div style={{ width: "300px", height: "300px", borderRadius: "2rem", background: "linear-gradient(135deg, rgba(0,255,136,0.15), rgba(0,200,255,0.15))", border: "1px solid rgba(0,255,136,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8rem", position: "relative", overflow: "hidden" }}>
            👨‍💻
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, transparent 60%, rgba(0,255,136,0.1))" }} />
          </div>
          {[
            { label: "MSc Embedded Systems 🎓", color: "#00ff88", top: "-1rem", right: "-2rem" },
            { label: "Liverpool, UK 🇬🇧", color: "#00c8ff", bottom: "4rem", right: "-2rem" },
            { label: "Available Immediately ✅", color: "#ff6b6b", bottom: "-1rem", left: "1rem" },
          ].map(b => (
            <div key={b.label} style={{ position: "absolute", top: b.top, bottom: b.bottom, left: b.left, right: b.right, background: "rgba(5,5,20,0.9)", border: `1px solid ${b.color}`, borderRadius: "0.5rem", padding: "0.5rem 0.9rem", fontSize: "0.75rem", color: b.color, fontFamily: "'Courier New', monospace", whiteSpace: "nowrap", boxShadow: `0 4px 20px ${b.color}22` }}>{b.label}</div>
          ))}
        </div>
        <div>
          <p style={{ color: "#00ff88", fontFamily: "'Courier New', monospace", fontSize: "0.8rem", letterSpacing: "3px", marginBottom: "1rem" }}>// ABOUT ME</p>
          <h2 style={{ fontSize: "2.8rem", fontFamily: "'Georgia', serif", fontWeight: "900", color: "#fff", marginBottom: "1.5rem", lineHeight: 1.1, letterSpacing: "-1px" }}>
            Hardware meets<br />Software.<br /><span style={{ color: "#00ff88" }}>That's me.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: "1rem", fontFamily: "Georgia, serif", fontSize: "1rem" }}>
            I'm a graduate with an MSc in Embedded Systems & IC Design from Liverpool John Moores University. I combine strong hardware knowledge with practical software development — building real projects that bridge both worlds.
          </p>
          <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontFamily: "Georgia, serif", fontSize: "1rem", marginBottom: "1.5rem" }}>
            I'm particularly interested in roles at companies working on AI hardware, embedded vision systems, and IoT — where hardware and software truly meet.
          </p>
          <a href="mailto:kdevendra8187@gmail.com" style={{ color: "#00ff88", fontFamily: "'Courier New', monospace", fontSize: "0.85rem", letterSpacing: "1px", textDecoration: "none", border: "1px solid rgba(0,255,136,0.3)", padding: "0.5rem 1rem", borderRadius: "0.4rem" }}>
            📧 kdevendra8187@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [hovered, setHovered] = useState(null);
  return (
    <section id="projects" style={{ padding: "6rem 3rem", maxWidth: "1100px", margin: "0 auto" }}>
      <p style={{ color: "#00ff88", fontFamily: "'Courier New', monospace", fontSize: "0.8rem", letterSpacing: "3px", marginBottom: "1rem", textAlign: "center" }}>// MY WORK</p>
      <h2 style={{ textAlign: "center", fontSize: "3rem", fontFamily: "'Georgia', serif", fontWeight: "900", color: "#fff", marginBottom: "3.5rem", letterSpacing: "-1px" }}>Projects</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {PROJECTS.map(p => (
          <div key={p.id} onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)} style={{ background: hovered === p.id ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)", border: `1px solid ${hovered === p.id ? p.color : "rgba(255,255,255,0.08)"}`, borderRadius: "1rem", padding: "2rem", cursor: "pointer", transition: "all 0.3s ease", transform: hovered === p.id ? "translateY(-6px)" : "translateY(0)", boxShadow: hovered === p.id ? `0 20px 40px ${p.color}18` : "none" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{p.emoji}</div>
            <h3 style={{ color: "#fff", fontFamily: "'Georgia', serif", fontSize: "1.2rem", marginBottom: "0.8rem", fontWeight: "700" }}>{p.title}</h3>
            <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7, fontFamily: "Georgia, serif", fontSize: "0.9rem", marginBottom: "1.5rem" }}>{p.description}</p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
              {p.tech.map(t => (<span key={t} style={{ padding: "0.25rem 0.7rem", background: `${p.color}18`, border: `1px solid ${p.color}44`, borderRadius: "2rem", color: p.color, fontSize: "0.75rem", fontFamily: "'Courier New', monospace" }}>{t}</span>))}
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href={p.link} target="_blank" style={{ color: p.color, fontFamily: "'Courier New', monospace", fontSize: "0.8rem", letterSpacing: "1px", textDecoration: "none" }}>GitHub →</a>
              {p.live && <a href={p.live} target="_blank" style={{ color: "#ffd700", fontFamily: "'Courier New', monospace", fontSize: "0.8rem", letterSpacing: "1px", textDecoration: "none" }}>🌐 Live Demo →</a>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setAnimated(true); }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref} style={{ padding: "6rem 3rem", maxWidth: "800px", margin: "0 auto" }}>
      <p style={{ color: "#00ff88", fontFamily: "'Courier New', monospace", fontSize: "0.8rem", letterSpacing: "3px", marginBottom: "1rem", textAlign: "center" }}>// TECH STACK</p>
      <h2 style={{ textAlign: "center", fontSize: "3rem", fontFamily: "'Georgia', serif", fontWeight: "900", color: "#fff", marginBottom: "3rem", letterSpacing: "-1px" }}>Skills</h2>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
        {["Complete Modern C++ (C++11/14/17)", "C Programming"].map(cert => (
          <div key={cert} style={{ padding: "0.5rem 1rem", borderRadius: "2rem", background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.25)", color: "#00ff88", fontSize: "0.75rem", fontFamily: "'Courier New', monospace" }}>🏆 {cert}</div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {SKILLS.map(skill => (
          <div key={skill.name}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ color: "#fff", fontFamily: "'Courier New', monospace", fontSize: "0.9rem" }}>{skill.name}</span>
              <span style={{ color: skill.color, fontFamily: "'Courier New', monospace", fontSize: "0.85rem" }}>{skill.level}%</span>
            </div>
            <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: animated ? `${skill.level}%` : "0%", background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`, borderRadius: "3px", transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)", boxShadow: `0 0 10px ${skill.color}66` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => {
  e.preventDefault();
  emailjs.send(
    'service_6g3wiyi',
    'template_n4agjie',
    {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    },
    '-Fvr7RBR6_S0f4C0m'
  ).then(() => {
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  }).catch(() => {
    alert('Something went wrong. Please try again.');
  });
};
  const inputStyle = { width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.5rem", padding: "0.9rem 1rem", color: "#fff", fontSize: "0.95rem", fontFamily: "Georgia, serif", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" };

  return (
    <section id="contact" style={{ padding: "8rem 3rem 6rem", maxWidth: "600px", margin: "0 auto" }}>
      <p style={{ color: "#00ff88", fontFamily: "'Courier New', monospace", fontSize: "0.8rem", letterSpacing: "3px", marginBottom: "1.5rem", textAlign: "center" }}>// GET IN TOUCH</p>
      <h2 style={{ textAlign: "center", fontSize: "3rem", fontFamily: "'Georgia', serif", fontWeight: "900", color: "#fff", marginBottom: "0.8rem", letterSpacing: "-1px" }}>Contact Me</h2>
      <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", fontFamily: "Georgia, serif", marginBottom: "3rem", fontSize: "1rem" }}>Open to Graduate Software &amp; Embedded Engineer roles in the UK &#127468;&#127463;</p>
      {sent && <div style={{ background: "rgba(0,255,136,0.1)", border: "1px solid #00ff88", borderRadius: "0.5rem", padding: "1rem", textAlign: "center", color: "#00ff88", fontFamily: "'Courier New', monospace", fontSize: "0.9rem", marginBottom: "1.5rem" }}>✅ Message sent! I'll get back to you soon.</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} onFocus={e => e.target.style.borderColor = "#00ff88"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} style={inputStyle} />
        <input placeholder="Your Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} onFocus={e => e.target.style.borderColor = "#00ff88"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} style={inputStyle} />
        <textarea placeholder="Your Message" rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} onFocus={e => e.target.style.borderColor = "#00ff88"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} style={{ ...inputStyle, resize: "vertical" }} />
        <button onClick={handleSubmit} style={{ padding: "1rem", background: "linear-gradient(135deg, #00ff88, #00c8ff)", color: "#050514", border: "none", borderRadius: "0.5rem", fontWeight: "700", fontSize: "0.95rem", fontFamily: "'Courier New', monospace", cursor: "pointer", letterSpacing: "1px" }}
          onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 30px rgba(0,255,136,0.4)"; }}
          onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}>
          SEND MESSAGE →
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center", color: "rgba(255,255,255,0.3)", fontFamily: "'Courier New', monospace", fontSize: "0.8rem" }}>
      <span>Devendra Reddy Keesara — Built with React ⚛️</span>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <a href="https://github.com/deva1611" target="_blank" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }} onMouseEnter={e => e.target.style.color = "#00ff88"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}>GitHub</a>
        <a href="https://www.linkedin.com/in/devendra-reddy-keesara-a55912254" target="_blank" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }} onMouseEnter={e => e.target.style.color = "#00c8ff"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}>LinkedIn</a>
        <a href="mailto:kdevendra8187@gmail.com" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }} onMouseEnter={e => e.target.style.color = "#ff6b6b"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}>Email</a>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  return (
    <div style={{ background: "#050514", color: "#fff", minHeight: "100vh", fontFamily: "Georgia, serif" }}>
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes gridMove { 0% { transform: translateY(0); } 100% { transform: translateY(60px); } }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050514; }
        ::-webkit-scrollbar-thumb { background: #00ff88; border-radius: 2px; }
      `}</style>
      <Navbar active={active} setActive={setActive} />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}
