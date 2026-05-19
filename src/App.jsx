import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Registration", href: "#registration" },
  { label: "Public Register", href: "#register" },
  { label: "Licensing", href: "#licensing" },
  { label: "Examinations", href: "#exams" },
  { label: "News", href: "#news" },
  { label: "Downloads", href: "#downloads" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { value: "1,200+", label: "Licensed Pharmacists" },
  { value: "380+", label: "Registered Premises" },
  { value: "46+", label: "Wholesale Pharmacies" },
  { value: "2014", label: "Established by Act" },
];

const SERVICES = [
  {
    icon: "⚕️",
    title: "Practitioner Registration",
    desc: "Register as a Pharmacist, Pharmacy Technician, Nurse Dispenser or Dispensing Assistant.",
    color: "#1B6B4A",
    tag: "Online",
  },
  {
    icon: "🏥",
    title: "Premises Licensing",
    desc: "Apply for a new pharmacy licence, renew an existing one, or manage your premises details.",
    color: "#D4A843",
    tag: "Online",
  },
  {
    icon: "📋",
    title: "Pre-Registration Exams",
    desc: "Register for upcoming examinations, download study materials and check your results.",
    color: "#0A3D2E",
    tag: "Portal",
  },
  {
    icon: "🔄",
    title: "Annual Renewal",
    desc: "Renew your annual practising certificate and pay registration fees online securely.",
    color: "#1B6B4A",
    tag: "Online",
  },
  {
    icon: "📚",
    title: "CPD Tracking",
    desc: "Log your Continuing Professional Development hours, upload evidence and track progress.",
    color: "#8B5E3C",
    tag: "New",
  },
  {
    icon: "🔍",
    title: "Public Register",
    desc: "Search the live register of all licensed pharmacists and premises in The Gambia.",
    color: "#D4A843",
    tag: "Public",
  },
];

const NEWS = [
  {
    date: "11 Dec 2024",
    title: "Results of 30 November 2024 Pre-Registration Examinations",
    category: "Exam Results",
    excerpt:
      "The Pharmacy Council of The Gambia is pleased to announce the results of the Pre-Registration Examinations held on 30 November 2024.",
  },
  {
    date: "15 Oct 2024",
    title: "Notice: Annual Renewal of Practising Certificates – 2025",
    category: "Registration",
    excerpt:
      "All registered pharmacists and pharmacy support personnel are hereby notified that the annual renewal period for 2025 practising certificates is now open.",
  },
  {
    date: "3 Aug 2024",
    title: "PCG Inspection Exercise Across Greater Banjul Area",
    category: "Inspections",
    excerpt:
      "The Pharmacy Council has commenced a routine inspection exercise of all licensed retail pharmacies and drug stores across the Greater Banjul Area.",
  },
];

const REGISTER_DATA = [
  { name: "Amie Touray", category: "Pharmacist", reg: "PCG/PH/0012", location: "Banjul", status: "Active" },
  { name: "Lamin Bojang", category: "Pharm. Technician", reg: "PCG/PT/0055", location: "Serrekunda", status: "Active" },
  { name: "Fatou Jallow", category: "Pharmacist", reg: "PCG/PH/0078", location: "Brikama", status: "Active" },
  { name: "Omar Ceesay", category: "Nurse Dispenser", reg: "PCG/ND/0134", location: "Farafenni", status: "Active" },
  { name: "Isatou Sanneh", category: "Pharmacist", reg: "PCG/PH/0091", location: "Banjul", status: "Active" },
  { name: "Modou Darboe", category: "Pharm. Technician", reg: "PCG/PT/0067", location: "Brikama", status: "Suspended" },
];

const DOWNLOADS = [
  { name: "Registration Form – Pharmacist", size: "245 KB", type: "PDF" },
  { name: "Registration Form – Pharmacy Technician", size: "238 KB", type: "PDF" },
  { name: "Premises Licence Application Form", size: "312 KB", type: "PDF" },
  { name: "Internship Application Form", size: "189 KB", type: "PDF" },
  { name: "Pharmacy Council Act 2014", size: "1.2 MB", type: "PDF" },
  { name: "Retail Pharmacies Register – 2024", size: "540 KB", type: "PDF" },
  { name: "Wholesale Pharmacies Register – 2024", size: "320 KB", type: "PDF" },
  { name: "CPD Guidelines 2024", size: "410 KB", type: "PDF" },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("practitioners");
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  const filtered = REGISTER_DATA.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reg.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fadeIn = (id) => ({
    opacity: visibleSections[id] ? 1 : 0,
    transform: visibleSections[id] ? "translateY(0)" : "translateY(32px)",
    transition: "opacity 0.7s ease, transform 0.7s ease",
  });

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#F9F6F0", color: "#1a1a1a", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #F9F6F0; }
        ::-webkit-scrollbar-thumb { background: #1B6B4A; border-radius: 3px; }
        .nav-link { color: #fff; text-decoration: none; font-size: 0.82rem; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; padding: 6px 0; position: relative; transition: color 0.2s; }
        .nav-link::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1.5px; background: #D4A843; transition: width 0.3s; }
        .nav-link:hover::after { width: 100%; }
        .nav-link:hover { color: #D4A843; }
        .service-card { transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer; }
        .service-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.12); }
        .btn-primary { background: #1B6B4A; color: #fff; border: none; padding: 14px 32px; font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 0.9rem; letter-spacing: 0.05em; text-transform: uppercase; cursor: pointer; transition: background 0.2s, transform 0.1s; }
        .btn-primary:hover { background: #0A3D2E; transform: translateY(-1px); }
        .btn-gold { background: #D4A843; color: #0A3D2E; border: none; padding: 14px 32px; font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 0.9rem; letter-spacing: 0.05em; text-transform: uppercase; cursor: pointer; transition: background 0.2s, transform 0.1s; }
        .btn-gold:hover { background: #c49a35; transform: translateY(-1px); }
        .btn-outline { background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,0.6); padding: 13px 30px; font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 0.9rem; letter-spacing: 0.05em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
        .btn-outline:hover { background: rgba(255,255,255,0.1); border-color: #D4A843; color: #D4A843; }
        .news-card { background: #fff; border-bottom: 3px solid transparent; transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s; cursor: pointer; }
        .news-card:hover { border-color: #1B6B4A; transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.1); }
        .download-row { transition: background 0.15s; cursor: pointer; }
        .download-row:hover { background: #f0ebe1; }
        .tag { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 10px; border-radius: 2px; }
        input, select { font-family: 'Outfit', sans-serif; }
        @keyframes heroFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }

        /* Mobile responsive */
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-right { display: none !important; }
          .hero-pad { padding: 0 24px !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .news-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .cta-flex { flex-direction: column !important; gap: 24px !important; text-align: center; }
          .section-pad { padding: 60px 24px !important; }
          .section-header { flex-direction: column !important; gap: 20px !important; align-items: flex-start !important; }
          .stats-row { gap: 24px !important; flex-wrap: wrap; }
          table { font-size: 0.78rem; }
          td, th { padding: 12px 10px !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(10,61,46,0.98)" : "rgba(10,61,46,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(212,168,67,0.3)" : "none",
        transition: "all 0.3s ease",
        padding: scrolled ? "12px 40px" : "18px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{
            width: 44, height: 44, background: "#D4A843", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.3rem", fontWeight: 700, color: "#0A3D2E",
            fontFamily: "'Cormorant Garamond', serif", flexShrink: 0,
          }}>⚕</div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.05rem", color: "#fff", lineHeight: 1.1 }}>
              Pharmacy Council
            </div>
            <div style={{ fontSize: "0.65rem", color: "#D4A843", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500 }}>
              The Gambia
            </div>
          </div>
        </div>

        <div className="desktop-nav" style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          {NAV_LINKS.slice(0, 6).map((l) => (
            <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
          ))}
        </div>

        <button className="btn-gold" style={{ padding: "10px 22px", fontSize: "0.78rem" }}>
          Practitioner Portal
        </button>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0A3D2E 0%, #1B6B4A 50%, #0A3D2E 100%)",
        position: "relative", display: "flex", alignItems: "center",
        overflow: "hidden", paddingTop: 80,
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 70% 50%, rgba(212,168,67,0.08) 0%, transparent 60%), repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 50px)` }} />
        <div style={{ position: "absolute", right: "-100px", top: "50%", transform: "translateY(-50%)", width: 600, height: 600, border: "1px solid rgba(212,168,67,0.15)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", right: "-50px", top: "50%", transform: "translateY(-50%)", width: 450, height: 450, border: "1px solid rgba(212,168,67,0.1)", borderRadius: "50%" }} />

        <div className="hero-pad" style={{ position: "relative", zIndex: 1, padding: "0 80px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div style={{ animation: "slideDown 0.9s ease both" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(212,168,67,0.15)", border: "1px solid rgba(212,168,67,0.3)", padding: "6px 16px", marginBottom: 28, fontSize: "0.72rem", color: "#D4A843", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>
                <span style={{ width: 6, height: 6, background: "#D4A843", borderRadius: "50%", animation: "pulse 2s infinite" }} />
                Official Regulatory Authority
              </div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 5vw, 4.2rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 24 }}>
                Safeguarding<br /><span style={{ color: "#D4A843" }}>Pharmaceutical</span><br />Excellence
              </h1>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: 40, maxWidth: 480 }}>
                The Pharmacy Council of The Gambia — regulating pharmacy practice, protecting public health, and upholding the highest professional standards across The Gambia.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <button className="btn-gold">Register / Renew</button>
                <button className="btn-outline">Search Public Register</button>
              </div>
              <div className="stats-row" style={{ display: "flex", gap: 40, marginTop: 52 }}>
                {STATS.map((s) => (
                  <div key={s.label}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 700, color: "#D4A843", lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-right" style={{ animation: "slideDown 1.1s ease both" }}>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", padding: "36px" }}>
                <div style={{ fontSize: "0.7rem", color: "#D4A843", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: 20 }}>Quick Services</div>
                {[
                  { label: "Check Practitioner Registration Status", badge: null },
                  { label: "Apply for New Pharmacy Licence", badge: "Online" },
                  { label: "Download Registration Forms", badge: null },
                  { label: "Pre-Registration Exam Portal", badge: "Open" },
                  { label: "Lodge a Complaint", badge: null },
                  { label: "Verify a Pharmacy Premises", badge: null },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.07)" : "none", cursor: "pointer", transition: "padding-left 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = "8px")}
                    onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = "0")}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ color: "#D4A843", fontSize: "0.6rem" }}>✦</span>
                      <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.88rem" }}>{item.label}</span>
                    </div>
                    {item.badge && <span className="tag" style={{ background: "rgba(212,168,67,0.2)", color: "#D4A843" }}>{item.badge}</span>}
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", marginLeft: 8 }}>→</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, background: "#D4A843", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                <div>
                  <div style={{ fontWeight: 700, color: "#0A3D2E", fontSize: "0.88rem" }}>Practitioner Login Portal</div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(10,61,46,0.7)", marginTop: 2 }}>Manage your registration, CPD & certificates</div>
                </div>
                <span style={{ fontSize: "1.4rem", color: "#0A3D2E" }}>→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="registration" ref={setRef("registration")} className="section-pad" style={{ padding: "100px 80px", background: "#F9F6F0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-header" style={{ ...fadeIn("registration"), display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60 }}>
            <div>
              <div style={{ fontSize: "0.72rem", color: "#1B6B4A", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>Our Services</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 700, color: "#0A3D2E", lineHeight: 1.1 }}>Everything You Need,<br />Online</h2>
            </div>
            <p style={{ maxWidth: 360, color: "#666", fontSize: "0.95rem", lineHeight: 1.75 }}>From first-time registration to annual renewal and CPD tracking — all PCG services are now available digitally.</p>
          </div>
          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {SERVICES.map((s, i) => (
              <div key={i} className="service-card" style={{ background: "#fff", padding: "36px", borderTop: `3px solid ${s.color}`, ...fadeIn("registration"), transitionDelay: `${i * 0.08}s` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <span style={{ fontSize: "2rem" }}>{s.icon}</span>
                  <span className="tag" style={{ background: s.color === "#D4A843" ? "rgba(212,168,67,0.15)" : "rgba(27,107,74,0.1)", color: s.color }}>{s.tag}</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem", fontWeight: 700, color: "#0A3D2E", marginBottom: 12 }}>{s.title}</h3>
                <p style={{ color: "#777", fontSize: "0.88rem", lineHeight: 1.7 }}>{s.desc}</p>
                <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8, color: s.color, fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", cursor: "pointer" }}>
                  Access Service <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PUBLIC REGISTER */}
      <section id="register" ref={setRef("register")} className="section-pad" style={{ padding: "100px 80px", background: "#0A3D2E" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ ...fadeIn("register"), textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: "0.72rem", color: "#D4A843", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>Public Register</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 700, color: "#fff", marginBottom: 16 }}>Verify a Practitioner or Premises</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", maxWidth: 560, margin: "0 auto" }}>The public register is updated in real time as registrations are approved. Anyone can verify the status of a licensed pharmacist or pharmacy in The Gambia.</p>
          </div>

          <div style={{ display: "flex", gap: 4, marginBottom: 32, justifyContent: "center" }}>
            {["practitioners", "premises"].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "10px 28px", border: "none", cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.82rem", letterSpacing: "0.08em", textTransform: "uppercase", background: activeTab === tab ? "#D4A843" : "rgba(255,255,255,0.08)", color: activeTab === tab ? "#0A3D2E" : "rgba(255,255,255,0.6)", transition: "all 0.2s" }}>
                {tab === "practitioners" ? "Practitioners" : "Pharmacy Premises"}
              </button>
            ))}
          </div>

          <div style={{ position: "relative", marginBottom: 32, maxWidth: 640, margin: "0 auto 32px" }}>
            <input type="text" placeholder="Search by name, registration number or location..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%", padding: "18px 56px 18px 24px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "0.95rem", outline: "none" }} />
            <span style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", color: "#D4A843", fontSize: "1.1rem" }}>⌕</span>
          </div>

          <div style={{ ...fadeIn("register"), background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
              <thead>
                <tr style={{ background: "rgba(212,168,67,0.12)", borderBottom: "1px solid rgba(212,168,67,0.2)" }}>
                  {["Full Name", "Category", "Reg. Number", "Location", "Status"].map((h) => (
                    <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#D4A843" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(searchQuery ? filtered : REGISTER_DATA).map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", transition: "background 0.15s", cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "16px 20px", color: "#fff", fontWeight: 500, fontSize: "0.9rem" }}>{row.name}</td>
                    <td style={{ padding: "16px 20px", color: "rgba(255,255,255,0.65)", fontSize: "0.85rem" }}>{row.category}</td>
                    <td style={{ padding: "16px 20px", color: "#D4A843", fontSize: "0.82rem", fontFamily: "monospace", letterSpacing: "0.05em" }}>{row.reg}</td>
                    <td style={{ padding: "16px 20px", color: "rgba(255,255,255,0.65)", fontSize: "0.85rem" }}>{row.location}</td>
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{ padding: "4px 12px", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", background: row.status === "Active" ? "rgba(27,107,74,0.3)" : "rgba(200,60,60,0.25)", color: row.status === "Active" ? "#5DD99B" : "#FF8A80", border: `1px solid ${row.status === "Active" ? "rgba(93,217,155,0.3)" : "rgba(255,138,128,0.3)"}` }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding: "14px 20px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem" }}>Showing {(searchQuery ? filtered : REGISTER_DATA).length} of 1,247 records</span>
              <button style={{ background: "transparent", border: "1px solid rgba(212,168,67,0.4)", color: "#D4A843", padding: "8px 20px", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>
                View Full Register
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section id="news" ref={setRef("news")} className="section-pad" style={{ padding: "100px 80px", background: "#F9F6F0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-header" style={{ ...fadeIn("news"), display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56 }}>
            <div>
              <div style={{ fontSize: "0.72rem", color: "#1B6B4A", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>Latest News</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 700, color: "#0A3D2E" }}>Announcements &<br />Updates</h2>
            </div>
            <button className="btn-primary">View All News</button>
          </div>
          <div className="news-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {NEWS.map((n, i) => (
              <div key={i} className="news-card" style={{ padding: "36px", ...fadeIn("news"), transitionDelay: `${i * 0.1}s` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <span className="tag" style={{ background: "rgba(27,107,74,0.1)", color: "#1B6B4A" }}>{n.category}</span>
                  <span style={{ fontSize: "0.78rem", color: "#999" }}>{n.date}</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 700, color: "#0A3D2E", marginBottom: 12, lineHeight: 1.35 }}>{n.title}</h3>
                <p style={{ color: "#777", fontSize: "0.85rem", lineHeight: 1.7 }}>{n.excerpt}</p>
                <div style={{ marginTop: 24, color: "#1B6B4A", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                  Read More <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOADS */}
      <section id="downloads" ref={setRef("downloads")} className="section-pad" style={{ padding: "100px 80px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ ...fadeIn("downloads"), marginBottom: 56 }}>
            <div style={{ fontSize: "0.72rem", color: "#1B6B4A", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>Document Library</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 700, color: "#0A3D2E" }}>Forms & Downloads</h2>
          </div>
          <div style={{ ...fadeIn("downloads"), border: "1px solid #e8e2d8", overflow: "hidden" }}>
            {DOWNLOADS.map((d, i) => (
              <div key={i} className="download-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 28px", borderBottom: i < DOWNLOADS.length - 1 ? "1px solid #e8e2d8" : "none", flexWrap: "wrap", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 38, height: 38, background: "rgba(10,61,46,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 800, color: "#0A3D2E", letterSpacing: "0.05em", flexShrink: 0 }}>{d.type}</div>
                  <span style={{ fontWeight: 500, color: "#1a1a1a", fontSize: "0.92rem" }}>{d.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                  <span style={{ color: "#999", fontSize: "0.82rem" }}>{d.size}</span>
                  <button style={{ background: "transparent", border: "1px solid #0A3D2E", color: "#0A3D2E", padding: "8px 20px", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Outfit', sans-serif", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#0A3D2E"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#0A3D2E"; }}
                  >Download</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px", background: "linear-gradient(135deg, #D4A843 0%, #c49a35 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -60, top: "50%", transform: "translateY(-50%)", width: 400, height: 400, border: "1px solid rgba(10,61,46,0.1)", borderRadius: "50%" }} />
        <div className="cta-flex" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1 }}>
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.6rem", fontWeight: 700, color: "#0A3D2E", marginBottom: 12 }}>Ready to Register or Renew?</h2>
            <p style={{ color: "rgba(10,61,46,0.7)", fontSize: "1rem" }}>The new digital portal makes registration faster and paperless.</p>
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button style={{ background: "#0A3D2E", color: "#fff", border: "none", padding: "16px 36px", fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer" }}>Create Account</button>
            <button style={{ background: "transparent", color: "#0A3D2E", border: "2px solid #0A3D2E", padding: "16px 36px", fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.88rem", letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer" }}>Learn More</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" style={{ background: "#060F0C", padding: "72px 80px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 60, paddingBottom: 60, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 40, height: 40, background: "#D4A843", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", color: "#0A3D2E", fontWeight: 700 }}>⚕</div>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1rem", color: "#fff" }}>Pharmacy Council of The Gambia</div>
                  <div style={{ fontSize: "0.6rem", color: "#D4A843", letterSpacing: "0.15em", textTransform: "uppercase" }}>Established 2014</div>
                </div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", lineHeight: 1.8, maxWidth: 320 }}>
                A statutory regulatory body established by an Act of Parliament to regulate the practice of pharmacy in The Gambia and protect the health and safety of the general public.
              </p>
              <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
                {["Facebook", "Twitter", "LinkedIn"].map((s) => (
                  <div key={s} style={{ padding: "8px 16px", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#D4A843"; e.currentTarget.style.color = "#D4A843"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                  >{s}</div>
                ))}
              </div>
            </div>
            {[
              { title: "Services", links: ["Practitioner Registration", "Premises Licensing", "Exam Registration", "CPD Portal", "Annual Renewal"] },
              { title: "Resources", links: ["Public Register", "Downloads", "Legislation", "FAQs", "News & Notices"] },
              { title: "Contact", links: ["112 Kairaba Avenue", "Fajara, KMC", "Tel: +220 4495572", "info@gpc.gm", "Mon–Fri, 8am–5pm"] },
            ].map((col) => (
              <div key={col.title}>
                <div style={{ fontSize: "0.7rem", color: "#D4A843", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: 20 }}>{col.title}</div>
                {col.links.map((l, i) => (
                  <div key={i} style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", marginBottom: 12, cursor: "pointer", transition: "color 0.15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                  >{l}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.78rem" }}>© 2025 Pharmacy Council of The Gambia. All rights reserved.</span>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.78rem" }}>Privacy Policy · Terms of Use · Accessibility</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
