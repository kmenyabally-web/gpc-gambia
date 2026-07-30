import { useState, useEffect, useRef } from "react";

// ─── COLOURS & TOKENS ───
const C = {
  darkGreen: "#0A3D2E",
  green: "#1B6B4A",
  gold: "#D4A843",
  goldDark: "#C49A30",
  cream: "#F9F6F0",
  white: "#FFFFFF",
  charcoal: "#060F0C",
  gray: "#777777",
  lightGray: "#F0EBE1",
  border: "#E8E2D8",
};

// ─── DATA ───
const PHARMACIES = [
  { name: "Banjul Pharmacy", type: "Retail", region: "Banjul", address: "14 Liberation Avenue, Banjul", status: "Active", x: 19, y: 62 },
  { name: "Atlantic Pharmacy", type: "Retail", region: "Banjul", address: "3 Independence Drive, Banjul", status: "Active", x: 22, y: 59 },
  { name: "Serrekunda Central Pharmacy", type: "Retail", region: "KMC", address: "Westfield Junction, Serrekunda", status: "Active", x: 26, y: 57 },
  { name: "Kairaba Pharmacy", type: "Wholesale", region: "KMC", address: "Kairaba Avenue, Fajara", status: "Active", x: 24, y: 60 },
  { name: "Brikama Pharmacy", type: "Retail", region: "West Coast", address: "Brikama Market Area", status: "Active", x: 30, y: 63 },
  { name: "Westcoast Wholesale", type: "Wholesale", region: "West Coast", address: "Brikama Highway", status: "Active", x: 32, y: 61 },
  { name: "Farafenni Pharmacy", type: "Retail", region: "North Bank", address: "Farafenni Town Centre", status: "Active", x: 55, y: 38 },
  { name: "Basse Pharmacy", type: "Retail", region: "Upper River", address: "Basse Santa Su", status: "Active", x: 87, y: 48 },
  { name: "Janjanbureh Pharmacy", type: "Drug Store", region: "Central River", address: "Janjanbureh Island", status: "Active", x: 68, y: 50 },
  { name: "Soma Pharmacy", type: "Retail", region: "Lower River", address: "Soma Town", status: "Active", x: 48, y: 55 },
  { name: "Kerewan Pharmacy", type: "Drug Store", region: "North Bank", address: "Kerewan", status: "Active", x: 38, y: 43 },
  { name: "Mansakonko Pharmacy", type: "Retail", region: "Lower River", address: "Mansakonko", status: "Active", x: 44, y: 58 },
];

const PRACTITIONERS = [
  { name: "Amie Touray", category: "Pharmacist", reg: "PCG/PH/0012", location: "Banjul", status: "Active" },
  { name: "Lamin Bojang", category: "Pharm. Technician", reg: "PCG/PT/0055", location: "Serrekunda", status: "Active" },
  { name: "Fatou Jallow", category: "Pharmacist", reg: "PCG/PH/0078", location: "Brikama", status: "Active" },
  { name: "Omar Ceesay", category: "Nurse Dispenser", reg: "PCG/ND/0134", location: "Farafenni", status: "Active" },
  { name: "Isatou Sanneh", category: "Pharmacist", reg: "PCG/PH/0091", location: "Banjul", status: "Active" },
  { name: "Modou Darboe", category: "Pharm. Technician", reg: "PCG/PT/0067", location: "Brikama", status: "Suspended" },
  { name: "Mariama Bah", category: "Pharmacist", reg: "PCG/PH/0103", location: "Serrekunda", status: "Active" },
  { name: "Ebrima Camara", category: "Nurse Dispenser", reg: "PCG/ND/0088", location: "Basse", status: "Active" },
];

const NEWS_ARTICLES = [
  {
    id: 1, date: "11 Dec 2024", category: "Exam Results",
    title: "Results of 30 November 2024 Pre-Registration Examinations",
    excerpt: "The Pharmacy Council of The Gambia is pleased to announce the results of the Pre-Registration Examinations held on 30 November 2024.",
    body: `The Pharmacy Council of The Gambia is pleased to announce the results of the Pre-Registration Pharmaceutical Examinations held on Saturday, 30th November 2024 at the University of The Gambia, Faraba Banta Campus.\n\nA total of 47 candidates sat for the examination across the following subjects: Pharmaceutics, Pharmacology, Pharmaceutical Chemistry, and Clinical Pharmacy Practice. The Council congratulates all candidates who successfully passed and reminds unsuccessful candidates that the next sitting will be announced in due course.\n\nCandidates are advised to visit the PCG secretariat at 112 Kairaba Avenue, Fajara, to collect their detailed results slips. Please bring a valid form of identification.\n\nThe Council wishes all successful candidates well in their future careers and encourages them to maintain the highest standards of pharmaceutical practice in The Gambia.`,
  },
  {
    id: 2, date: "15 Oct 2024", category: "Registration",
    title: "Notice: Annual Renewal of Practising Certificates – 2025",
    excerpt: "All registered pharmacists and pharmacy support personnel are hereby notified that the annual renewal period for 2025 practising certificates is now open.",
    body: `All registered pharmacists, pharmacy technicians, nurse dispensers, and dispensing assistants are hereby notified that the annual renewal period for 2025 practising certificates is now officially open.\n\nRenewal Period: 1st October 2024 to 31st January 2025\n\nPractitioners are strongly advised to renew their certificates before the deadline to avoid disruption to their practice. Practising without a valid annual certificate is an offence under the Pharmacy Council Act 2014 and may result in suspension or removal from the register.\n\nRenewal Requirements:\n- Completed Annual Renewal Form (available at the PCG secretariat or download from this website)\n- Evidence of payment of the renewal fee\n- Evidence of 10 CPD hours completed during 2024 (where applicable)\n\nFees remain unchanged from 2024. For enquiries, please contact the PCG secretariat at info@gpc.gm or call +220 4495572.`,
  },
  {
    id: 3, date: "3 Aug 2024", category: "Inspections",
    title: "PCG Inspection Exercise Across Greater Banjul Area",
    excerpt: "The Pharmacy Council has commenced a routine inspection exercise of all licensed retail pharmacies and drug stores across the Greater Banjul Area.",
    body: `The Pharmacy Council of The Gambia hereby notifies all pharmacy premises owners and superintendent pharmacists in the Greater Banjul Area that a routine inspection exercise is currently underway.\n\nThe exercise commenced on 1st August 2024 and is expected to cover all licensed retail pharmacies, drug stores, and wholesale outlets in Banjul, KMC, and the surrounding areas by 31st August 2024.\n\nInspections will verify compliance with the following:\n- Valid and current premises licence displayed prominently\n- Presence of a registered superintendent pharmacist\n- Proper storage conditions for medicines\n- Accurate record-keeping for controlled substances\n- Compliance with dispensing standards\n\nPremises found to be non-compliant will be issued with a notice to remedy the identified deficiencies within 14 days. Serious or repeat violations may result in suspension or revocation of the premises licence.\n\nThe Council reminds all premises owners of their obligations under the Pharmacy Council Act 2014 and associated regulations.`,
  },
];

const FAQS = [
  { q: "How do I register as a pharmacist in The Gambia?", a: "To register as a pharmacist, you must submit a completed Form SWR-P1 together with your degree certificate, internship completion letter, passport photographs, and the required registration fee. Applications are submitted in person at the PCG secretariat at 112 Kairaba Avenue, Fajara." },
  { q: "How long does the registration process take?", a: "Once a complete application is received, the Registrar will review it within 14 working days. You will be notified in writing of the outcome. If approved, your certificate will be ready for collection within 5 working days of approval." },
  { q: "When is the Pre-Registration Examination held?", a: "The Pre-Registration Pharmaceutical Examination is held twice per year, typically in May and November. Exact dates and venues are announced on this website and via circular to all registered practitioners at least 6 weeks before each sitting." },
  { q: "How do I renew my annual practising certificate?", a: "Annual renewal opens on 1st October each year and closes on 31st January of the following year. You must submit the Annual Renewal Form with evidence of payment of the renewal fee. CPD evidence may also be required." },
  { q: "What happens if I practise without a valid annual certificate?", a: "Practising pharmacy without a valid annual practising certificate is an offence under the Pharmacy Council Act 2014. You may be liable to a fine, suspension from the register, or both. The Council strongly advises all practitioners to renew on time." },
  { q: "How do I apply for a pharmacy premises licence?", a: "Submit a completed Premises Licence Application Form with your floor plan, lease agreement, and details of your superintendent pharmacist. An inspection will be conducted before the licence is issued. Applications are reviewed by the Premises Licensing Committee." },
  { q: "Can I verify whether a pharmacy is licensed?", a: "Yes. The public register on this website lists all currently licensed pharmacy premises in The Gambia. You can search by name, region, or licence number. The register is updated regularly." },
  { q: "How do I lodge a complaint about a pharmacy or pharmacist?", a: "Complaints should be submitted in writing to the Registrar at 112 Kairaba Avenue, Fajara, or by email to info@gpc.gm. All complaints are treated in confidence and investigated by the Professional Conduct Committee." },
  { q: "What CPD hours are required for annual renewal?", a: "A minimum of 10 CPD hours per year is currently required for pharmacists and pharmacy technicians. CPD evidence must be submitted with the annual renewal application. Acceptable CPD activities include seminars, workshops, online courses, and peer-reviewed study." },
  { q: "Where is the PCG secretariat located?", a: "The PCG secretariat is located at 112 Kairaba Avenue, Fajara, KMC, The Gambia. Office hours are Monday to Friday, 8:00am to 5:00pm. We are closed on public holidays." },
];

const DOWNLOADS = [
  { name: "Registration Form – Pharmacist", size: "245 KB", type: "PDF", cat: "Registration" },
  { name: "Registration Form – Pharmacy Technician", size: "238 KB", type: "PDF", cat: "Registration" },
  { name: "Registration Form – Nurse Dispenser", size: "201 KB", type: "PDF", cat: "Registration" },
  { name: "Premises Licence Application Form", size: "312 KB", type: "PDF", cat: "Licensing" },
  { name: "Annual Renewal Form", size: "189 KB", type: "PDF", cat: "Registration" },
  { name: "Internship Application Form", size: "175 KB", type: "PDF", cat: "Registration" },
  { name: "Pharmacy Council Act 2014", size: "1.2 MB", type: "PDF", cat: "Legislation" },
  { name: "Retail Pharmacies Register – 2024", size: "540 KB", type: "PDF", cat: "Registers" },
  { name: "Wholesale Pharmacies Register – 2024", size: "320 KB", type: "PDF", cat: "Registers" },
  { name: "CPD Guidelines 2024", size: "410 KB", type: "PDF", cat: "CPD" },
  { name: "Code of Ethics for Pharmacists", size: "280 KB", type: "PDF", cat: "Legislation" },
  { name: "Dispensing Standards Guidelines", size: "390 KB", type: "PDF", cat: "Legislation" },
];

const COUNCIL = [
  { name: "Prof. Ousman Jallow", role: "Chairperson", bg: C.darkGreen },
  { name: "Mr. Ebrima Sowe", role: "Registrar", bg: C.green },
  { name: "Dr. Fatou Sallah", role: "Deputy Registrar", bg: C.green },
  { name: "Mr. Lamin Touray", role: "Finance Officer", bg: C.darkGreen },
  { name: "Dr. Amie Jobe", role: "Council Member", bg: C.green },
  { name: "Mr. Modou Ceesay", role: "Council Member", bg: C.green },
];

// ─── HOOKS ───
function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const numeric = parseInt(target.replace(/\D/g, ""));
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * numeric));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  const suffix = target.replace(/[\d]/g, "");
  return count.toLocaleString() + suffix;
}

// ─── GLOBAL STYLES ───
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Outfit', sans-serif; background: ${C.cream}; color: #1a1a1a; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: ${C.cream}; }
  ::-webkit-scrollbar-thumb { background: ${C.green}; border-radius: 3px; }
  a { text-decoration: none; color: inherit; }
  input, textarea, select, button { font-family: 'Outfit', sans-serif; }

  .nav-link { color: rgba(255,255,255,0.85); font-size: 0.8rem; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; padding: 6px 0; position: relative; transition: color 0.2s; cursor: pointer; background: none; border: none; }
  .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1.5px; background: ${C.gold}; transition: width 0.3s; }
  .nav-link:hover { color: ${C.gold}; }
  .nav-link:hover::after, .nav-link.active::after { width: 100%; }
  .nav-link.active { color: ${C.gold}; }

  .btn-gold { background: ${C.gold}; color: ${C.darkGreen}; border: none; padding: 13px 28px; font-weight: 700; font-size: 0.85rem; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; transition: background 0.2s, transform 0.15s; }
  .btn-gold:hover { background: ${C.goldDark}; transform: translateY(-1px); }
  .btn-green { background: ${C.darkGreen}; color: #fff; border: none; padding: 13px 28px; font-weight: 600; font-size: 0.85rem; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; transition: background 0.2s, transform 0.15s; }
  .btn-green:hover { background: #062618; transform: translateY(-1px); }
  .btn-outline-white { background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,0.55); padding: 12px 26px; font-weight: 500; font-size: 0.85rem; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
  .btn-outline-white:hover { border-color: ${C.gold}; color: ${C.gold}; }
  .btn-outline-green { background: transparent; color: ${C.darkGreen}; border: 1.5px solid ${C.darkGreen}; padding: 11px 24px; font-weight: 600; font-size: 0.82rem; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
  .btn-outline-green:hover { background: ${C.darkGreen}; color: #fff; }

  .card { background: #fff; transition: transform 0.28s ease, box-shadow 0.28s ease; }
  .card:hover { transform: translateY(-5px); box-shadow: 0 16px 50px rgba(0,0,0,0.1); }

  .section-label { font-size: 0.68rem; color: ${C.green}; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 700; margin-bottom: 14px; }
  .section-label-light { font-size: 0.68rem; color: ${C.gold}; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 700; margin-bottom: 14px; }
  .section-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; color: ${C.darkGreen}; line-height: 1.1; }
  .section-title-light { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; color: #fff; line-height: 1.1; }
  .tag { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 10px; }

  .fade-in { opacity: 0; transform: translateY(28px); transition: opacity 0.65s ease, transform 0.65s ease; }
  .fade-in.visible { opacity: 1; transform: translateY(0); }

  .download-row:hover { background: ${C.lightGray}; }
  .faq-item { border-bottom: 1px solid ${C.border}; }

  .mobile-menu { position: fixed; inset: 0; background: ${C.charcoal}; z-index: 999; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 32px; transform: translateX(100%); transition: transform 0.35s ease; }
  .mobile-menu.open { transform: translateX(0); }
  .mobile-nav-link { font-size: 1.5rem; font-family: 'Cormorant Garamond', serif; font-weight: 700; color: #fff; cursor: pointer; transition: color 0.2s; }
  .mobile-nav-link:hover { color: ${C.gold}; }

  .map-pin { cursor: pointer; transition: transform 0.2s; }
  .map-pin:hover { transform: scale(1.3); }

  .cookie-bar { position: fixed; bottom: 0; left: 0; right: 0; background: ${C.charcoal}; border-top: 1px solid rgba(255,255,255,0.08); z-index: 900; padding: 16px 40px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; }

  @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.5} }
  @keyframes slideDown { from{opacity:0;transform:translateY(-24px)}to{opacity:1;transform:translateY(0)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)} }
  @keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)} }

  @media(max-width:900px){
    .desktop-nav{display:none!important;}
    .mobile-toggle{display:flex!important;}
    .hero-grid{grid-template-columns:1fr!important;}
    .hero-right-panel{display:none!important;}
    .section-pad{padding:60px 24px!important;}
    .three-col{grid-template-columns:1fr!important;}
    .two-col{grid-template-columns:1fr!important;}
    .four-col{grid-template-columns:1fr 1fr!important;}
    .footer-grid{grid-template-columns:1fr 1fr!important;}
    .cta-flex{flex-direction:column!important;gap:24px!important;}
    .table-wrap{overflow-x:auto!important;}
    .stats-row{gap:20px!important;flex-wrap:wrap!important;}
  }
`;

// ─── SHARED COMPONENTS ───
function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Home", "About", "Registration", "Register", "Licensing", "Examinations", "News", "Downloads", "Contact"];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(10,61,46,0.98)" : "rgba(10,61,46,0.88)",
        backdropFilter: "blur(14px)",
        borderBottom: scrolled ? `1px solid rgba(212,168,67,0.25)` : "none",
        padding: scrolled ? "10px 40px" : "16px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.3s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => setPage("Home")}>
          <div style={{ width: 42, height: 42, background: C.gold, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", color: C.darkGreen, fontWeight: 800, fontFamily: "'Cormorant Garamond', serif", flexShrink: 0 }}>⚕</div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1rem", color: "#fff", lineHeight: 1.1 }}>Pharmacy Council</div>
            <div style={{ fontSize: "0.6rem", color: C.gold, letterSpacing: "0.16em", textTransform: "uppercase" }}>The Gambia</div>
          </div>
        </div>

        <div className="desktop-nav" style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {links.map(l => (
            <button key={l} className={`nav-link${page === l ? " active" : ""}`} onClick={() => setPage(l)}>
              {l === "Register" ? "Public Register" : l}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="btn-gold" style={{ padding: "9px 20px", fontSize: "0.75rem" }} onClick={() => setPage("Portal")}>
            Practitioner Portal
          </button>
          <button className="mobile-toggle" onClick={() => setMenuOpen(true)} style={{
            display: "none", background: "transparent", border: "none", color: "#fff", cursor: "pointer", padding: 4, flexDirection: "column", gap: 5,
          }}>
            {[0,1,2].map(i => <div key={i} style={{ width: 22, height: 2, background: "#fff", borderRadius: 2 }} />)}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 24, right: 24, background: "transparent", border: "none", color: "#fff", fontSize: "1.8rem", cursor: "pointer" }}>✕</button>
        {links.map(l => (
          <div key={l} className="mobile-nav-link" onClick={() => { setPage(l); setMenuOpen(false); }}>
            {l === "Register" ? "Public Register" : l}
          </div>
        ))}
        <button className="btn-gold" style={{ marginTop: 16 }} onClick={() => { setPage("Portal"); setMenuOpen(false); }}>Practitioner Portal</button>
      </div>
    </>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: C.charcoal, padding: "64px 80px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, cursor: "pointer" }} onClick={() => setPage("Home")}>
              <div style={{ width: 38, height: 38, background: C.gold, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", color: C.darkGreen, fontWeight: 800 }}>⚕</div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "0.95rem", color: "#fff" }}>Pharmacy Council of The Gambia</div>
                <div style={{ fontSize: "0.58rem", color: C.gold, letterSpacing: "0.15em", textTransform: "uppercase" }}>Established 2014</div>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.83rem", lineHeight: 1.8, maxWidth: 300 }}>
              A statutory regulatory body established under the Pharmacy Council Act 2014 to regulate pharmacy practice and protect public health in The Gambia.
            </p>
            <div style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["Facebook", "Twitter", "LinkedIn"].map(s => (
                <div key={s} style={{ padding: "7px 14px", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)", fontSize: "0.72rem", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.color = C.gold; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
                >{s}</div>
              ))}
            </div>
          </div>

          {[
            { title: "Services", links: [["Registration","Registration"],["Licensing","Licensing"],["Examinations","Examinations"],["CPD Portal","Portal"],["Annual Renewal","Portal"]] },
            { title: "Resources", links: [["Public Register","Register"],["Downloads","Downloads"],["Legislation","Downloads"],["FAQs","Contact"],["News","News"]] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: "0.67rem", color: C.gold, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, marginBottom: 18 }}>{col.title}</div>
              {col.links.map(([l, p]) => (
                <div key={l} style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.83rem", marginBottom: 11, cursor: "pointer", transition: "color 0.15s" }}
                  onClick={() => setPage(p)}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.42)"}
                >{l}</div>
              ))}
            </div>
          ))}

          <div>
            <div style={{ fontSize: "0.67rem", color: C.gold, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, marginBottom: 18 }}>Contact</div>
            {["112 Kairaba Avenue", "Fajara, KMC", "The Gambia", "+220 4495572", "info@gpc.gm", "Mon–Fri, 8am–5pm"].map(l => (
              <div key={l} style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.83rem", marginBottom: 11 }}>{l}</div>
            ))}
          </div>
        </div>
        <div style={{ paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem" }}>© 2025 Pharmacy Council of The Gambia. All rights reserved.</span>
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem" }}>Privacy Policy · Terms of Use · Accessibility</span>
        </div>
      </div>
    </footer>
  );
}

function PageWrapper({ children, setPage }) {
  return (
    <div style={{ paddingTop: 80 }}>
      {children}
      <Footer setPage={setPage} />
    </div>
  );
}

function FadeSection({ children, style = {} }) {
  const ref = useRef();
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`fade-in${vis ? " visible" : ""}`} style={style}>{children}</div>;
}

// ─── STAT COUNTER ───
function StatCard({ value, label, delay = 0, started }) {
  const displayed = useCountUp(value, 1800, started);
  return (
    <div style={{ opacity: started ? 1 : 0, transition: `opacity 0.5s ease ${delay}ms`, minWidth: 80 }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, color: C.gold, lineHeight: 1 }}>{displayed}</div>
      <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 5 }}>{label}</div>
    </div>
  );
}

// ─── HOME PAGE ───
function HomePage({ setPage }) {
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef();
  const [registerTab, setRegisterTab] = useState("practitioners");
  const [search, setSearch] = useState("");
  const [dlFilter, setDlFilter] = useState("All");

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsStarted(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const filteredPract = PRACTITIONERS.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.reg.toLowerCase().includes(search.toLowerCase()) ||
    r.location.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPrem = PHARMACIES.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.region.toLowerCase().includes(search.toLowerCase())
  );

  const dlCats = ["All", ...Array.from(new Set(DOWNLOADS.map(d => d.cat)))];
  const filteredDl = dlFilter === "All" ? DOWNLOADS : DOWNLOADS.filter(d => d.cat === dlFilter);

  return (
    <div style={{ paddingTop: 80 }}>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", background: `linear-gradient(135deg, ${C.darkGreen} 0%, ${C.green} 55%, ${C.darkGreen} 100%)`,
        position: "relative", display: "flex", alignItems: "center", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 72% 48%, rgba(212,168,67,0.07) 0%, transparent 62%), repeating-linear-gradient(45deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 52px)` }} />
        <div style={{ position: "absolute", right: "-80px", top: "50%", transform: "translateY(-50%)", width: 550, height: 550, border: "1px solid rgba(212,168,67,0.12)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", right: "-30px", top: "50%", transform: "translateY(-50%)", width: 400, height: 400, border: "1px solid rgba(212,168,67,0.08)", borderRadius: "50%" }} />

        <div className="section-pad" style={{ position: "relative", zIndex: 1, padding: "0 80px", maxWidth: 1200, margin: "0 auto", width: "100%", animation: "fadeUp 0.9s ease both" }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(212,168,67,0.14)", border: "1px solid rgba(212,168,67,0.28)", padding: "5px 14px", marginBottom: 28, fontSize: "0.68rem", color: C.gold, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700 }}>
                <span style={{ width: 6, height: 6, background: C.gold, borderRadius: "50%", animation: "pulse 2s infinite" }} />
                Official Regulatory Authority · Est. 2014
              </div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.6rem,4.5vw,4rem)", fontWeight: 700, color: "#fff", lineHeight: 1.08, marginBottom: 22 }}>
                Safeguarding<br /><span style={{ color: C.gold }}>Pharmaceutical</span><br />Excellence
              </h1>
              <p style={{ color: "rgba(255,255,255,0.68)", fontSize: "1rem", lineHeight: 1.8, marginBottom: 38, maxWidth: 460 }}>
                The Pharmacy Council of The Gambia — regulating pharmacy practice, protecting public health, and upholding professional standards across The Gambia since 2014.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <button className="btn-gold" onClick={() => setPage("Portal")}>Register / Renew</button>
                <button className="btn-outline-white" onClick={() => setPage("Register")}>Search Public Register</button>
              </div>

              <div ref={statsRef} className="stats-row" style={{ display: "flex", gap: 36, marginTop: 52 }}>
                {[
                  { value: "1200+", label: "Licensed Pharmacists" },
                  { value: "380+", label: "Registered Premises" },
                  { value: "46+", label: "Wholesale Pharmacies" },
                  { value: "7+", label: "Regions Covered" },
                ].map((s, i) => <StatCard key={s.label} value={s.value} label={s.label} delay={i * 150} started={statsStarted} />)}
              </div>
            </div>

            <div className="hero-right-panel" style={{ animation: "fadeUp 1.1s ease both" }}>
              <div style={{ background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", padding: "32px" }}>
                <div style={{ fontSize: "0.67rem", color: C.gold, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, marginBottom: 18 }}>Quick Services</div>
                {[
                  { label: "Check Practitioner Registration Status", page: "Register", badge: null },
                  { label: "Apply for Pharmacy Premises Licence", page: "Licensing", badge: "Online" },
                  { label: "Download Registration Forms", page: "Downloads", badge: null },
                  { label: "Pre-Registration Exam Portal", page: "Examinations", badge: "Open" },
                  { label: "Find a Licensed Pharmacy", page: "Register", badge: null },
                  { label: "Lodge a Complaint", page: "Contact", badge: null },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.07)" : "none", cursor: "pointer", transition: "padding-left 0.2s" }}
                    onClick={() => setPage(item.page)}
                    onMouseEnter={e => e.currentTarget.style.paddingLeft = "8px"}
                    onMouseLeave={e => e.currentTarget.style.paddingLeft = "0"}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ color: C.gold, fontSize: "0.55rem" }}>✦</span>
                      <span style={{ color: "rgba(255,255,255,0.82)", fontSize: "0.85rem" }}>{item.label}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {item.badge && <span className="tag" style={{ background: "rgba(212,168,67,0.18)", color: C.gold }}>{item.badge}</span>}
                      <span style={{ color: "rgba(255,255,255,0.25)" }}>→</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, background: C.gold, padding: "15px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }} onClick={() => setPage("Portal")}>
                <div>
                  <div style={{ fontWeight: 700, color: C.darkGreen, fontSize: "0.86rem" }}>Practitioner Login Portal</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(10,61,46,0.65)", marginTop: 2 }}>Manage registration, CPD & certificates</div>
                </div>
                <span style={{ fontSize: "1.3rem", color: C.darkGreen }}>→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-pad" style={{ padding: "88px 80px", background: C.cream }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeSection style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52, flexWrap: "wrap", gap: 24 }}>
            <div>
              <div className="section-label">Our Services</div>
              <h2 className="section-title">Everything You Need,<br />Now Online</h2>
            </div>
            <p style={{ maxWidth: 340, color: C.gray, fontSize: "0.92rem", lineHeight: 1.78 }}>From first registration to annual renewal and CPD — all PCG services are now available digitally.</p>
          </FadeSection>

          <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { icon: "⚕️", title: "Practitioner Registration", desc: "Register as a Pharmacist, Technician, Nurse Dispenser or Dispensing Assistant online.", color: C.green, tag: "Online", page: "Registration" },
              { icon: "🏥", title: "Premises Licensing", desc: "Apply for a new pharmacy licence, renew an existing one, or update your premises details.", color: C.gold, tag: "Online", page: "Licensing" },
              { icon: "📋", title: "Pre-Registration Exams", desc: "Register for upcoming examinations, access study materials, and check your results.", color: C.darkGreen, tag: "Portal", page: "Examinations" },
              { icon: "🔄", title: "Annual Renewal", desc: "Renew your annual practising certificate and pay registration fees securely online.", color: C.green, tag: "Online", page: "Portal" },
              { icon: "📚", title: "CPD Tracking", desc: "Log your Continuing Professional Development hours, upload evidence, and track your progress.", color: "#8B5E3C", tag: "New", page: "Portal" },
              { icon: "🔍", title: "Public Register", desc: "Search the live register of all licensed pharmacists and premises across The Gambia.", color: C.gold, tag: "Public", page: "Register" },
            ].map((s, i) => (
              <FadeSection key={i} style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="card" style={{ padding: "32px", borderTop: `3px solid ${s.color}`, cursor: "pointer" }} onClick={() => setPage(s.page)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                    <span style={{ fontSize: "1.8rem" }}>{s.icon}</span>
                    <span className="tag" style={{ background: s.color === C.gold ? "rgba(212,168,67,0.13)" : "rgba(27,107,74,0.1)", color: s.color }}>{s.tag}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.28rem", fontWeight: 700, color: C.darkGreen, marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ color: C.gray, fontSize: "0.85rem", lineHeight: 1.72 }}>{s.desc}</p>
                  <div style={{ marginTop: 22, color: s.color, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6 }}>
                    Access Service <span>→</span>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* PUBLIC REGISTER */}
      <section style={{ padding: "88px 80px", background: C.darkGreen }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeSection style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="section-label-light">Public Register</div>
            <h2 className="section-title-light" style={{ marginBottom: 14 }}>Verify a Practitioner or Premises</h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.92rem", maxWidth: 520, margin: "0 auto" }}>The public register is updated as registrations are approved. Search and verify any licensed pharmacist or pharmacy in The Gambia.</p>
          </FadeSection>

          <div style={{ display: "flex", gap: 4, marginBottom: 28, justifyContent: "center" }}>
            {["practitioners", "premises"].map(tab => (
              <button key={tab} onClick={() => { setRegisterTab(tab); setSearch(""); }} style={{ padding: "9px 24px", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", background: registerTab === tab ? C.gold : "rgba(255,255,255,0.07)", color: registerTab === tab ? C.darkGreen : "rgba(255,255,255,0.55)", transition: "all 0.2s" }}>
                {tab === "practitioners" ? "Practitioners" : "Pharmacy Premises"}
              </button>
            ))}
          </div>

          <div style={{ position: "relative", maxWidth: 580, margin: "0 auto 28px" }}>
            <input type="text" placeholder={registerTab === "practitioners" ? "Search by name, reg. number or location..." : "Search by name or region..."} value={search} onChange={e => setSearch(e.target.value)}
              style={{ width: "100%", padding: "16px 52px 16px 22px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "0.92rem", outline: "none" }} />
            <span style={{ position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", color: C.gold, fontSize: "1.1rem" }}>⌕</span>
          </div>

          <FadeSection>
            <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}>
              <div className="table-wrap" style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
                  <thead>
                    <tr style={{ background: "rgba(212,168,67,0.1)", borderBottom: "1px solid rgba(212,168,67,0.18)" }}>
                      {registerTab === "practitioners"
                        ? ["Full Name", "Category", "Reg. Number", "Location", "Status"].map(h => <th key={h} style={{ padding: "13px 18px", textAlign: "left", fontSize: "0.67rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.gold }}>{h}</th>)
                        : ["Premises Name", "Type", "Region", "Address", "Status"].map(h => <th key={h} style={{ padding: "13px 18px", textAlign: "left", fontSize: "0.67rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.gold }}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {registerTab === "practitioners"
                      ? filteredPract.map((r, i) => (
                        <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.045)", cursor: "pointer" }}
                          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.035)"}
                          onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                          <td style={{ padding: "15px 18px", color: "#fff", fontWeight: 500, fontSize: "0.88rem" }}>{r.name}</td>
                          <td style={{ padding: "15px 18px", color: "rgba(255,255,255,0.6)", fontSize: "0.83rem" }}>{r.category}</td>
                          <td style={{ padding: "15px 18px", color: C.gold, fontSize: "0.8rem", fontFamily: "monospace" }}>{r.reg}</td>
                          <td style={{ padding: "15px 18px", color: "rgba(255,255,255,0.6)", fontSize: "0.83rem" }}>{r.location}</td>
                          <td style={{ padding: "15px 18px" }}>
                            <span style={{ padding: "3px 10px", fontSize: "0.67rem", fontWeight: 700, background: r.status === "Active" ? "rgba(27,107,74,0.28)" : "rgba(200,60,60,0.22)", color: r.status === "Active" ? "#5DD99B" : "#FF8A80", border: `1px solid ${r.status === "Active" ? "rgba(93,217,155,0.25)" : "rgba(255,138,128,0.25)"}` }}>{r.status}</span>
                          </td>
                        </tr>
                      ))
                      : filteredPrem.map((r, i) => (
                        <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.045)", cursor: "pointer" }}
                          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.035)"}
                          onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                          <td style={{ padding: "15px 18px", color: "#fff", fontWeight: 500, fontSize: "0.88rem" }}>{r.name}</td>
                          <td style={{ padding: "15px 18px", color: "rgba(255,255,255,0.6)", fontSize: "0.83rem" }}>{r.type}</td>
                          <td style={{ padding: "15px 18px", color: C.gold, fontSize: "0.83rem" }}>{r.region}</td>
                          <td style={{ padding: "15px 18px", color: "rgba(255,255,255,0.6)", fontSize: "0.83rem" }}>{r.address}</td>
                          <td style={{ padding: "15px 18px" }}>
                            <span style={{ padding: "3px 10px", fontSize: "0.67rem", fontWeight: 700, background: "rgba(27,107,74,0.28)", color: "#5DD99B", border: "1px solid rgba(93,217,155,0.25)" }}>Active</span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div style={{ padding: "13px 18px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem" }}>
                  {registerTab === "practitioners" ? `Showing ${filteredPract.length} of 1,247 records` : `Showing ${filteredPrem.length} of 380 premises`}
                </span>
                <button style={{ background: "transparent", border: `1px solid rgba(212,168,67,0.35)`, color: C.gold, padding: "7px 18px", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }} onClick={() => setPage("Register")}>
                  View Full Register →
                </button>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* NEWS */}
      <section className="section-pad" style={{ padding: "88px 80px", background: C.cream }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeSection style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
            <div>
              <div className="section-label">Latest News</div>
              <h2 className="section-title">Announcements &<br />Updates</h2>
            </div>
            <button className="btn-green" onClick={() => setPage("News")}>View All News</button>
          </FadeSection>
          <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {NEWS_ARTICLES.map((n, i) => (
              <FadeSection key={i} style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="card" style={{ padding: "32px", borderBottom: "3px solid transparent", cursor: "pointer", transition: "border-color 0.2s, transform 0.28s, box-shadow 0.28s" }}
                  onClick={() => setPage(`news-${n.id}`)}
                  onMouseEnter={e => e.currentTarget.style.borderBottomColor = C.green}
                  onMouseLeave={e => e.currentTarget.style.borderBottomColor = "transparent"}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                    <span className="tag" style={{ background: "rgba(27,107,74,0.09)", color: C.green }}>{n.category}</span>
                    <span style={{ fontSize: "0.75rem", color: "#aaa" }}>{n.date}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 700, color: C.darkGreen, marginBottom: 10, lineHeight: 1.35 }}>{n.title}</h3>
                  <p style={{ color: C.gray, fontSize: "0.83rem", lineHeight: 1.72 }}>{n.excerpt}</p>
                  <div style={{ marginTop: 22, color: C.green, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6 }}>Read More <span>→</span></div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOADS */}
      <section className="section-pad" style={{ padding: "88px 80px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeSection style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 20 }}>
            <div>
              <div className="section-label">Document Library</div>
              <h2 className="section-title">Forms & Downloads</h2>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {dlCats.map(c => (
                <button key={c} onClick={() => setDlFilter(c)} style={{ padding: "7px 16px", border: `1px solid ${dlFilter === c ? C.darkGreen : C.border}`, background: dlFilter === c ? C.darkGreen : "transparent", color: dlFilter === c ? "#fff" : C.gray, fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", cursor: "pointer", textTransform: "uppercase", transition: "all 0.2s" }}>{c}</button>
              ))}
            </div>
          </FadeSection>
          <FadeSection>
            <div style={{ border: `1px solid ${C.border}` }}>
              {filteredDl.map((d, i) => (
                <div key={i} className="download-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 26px", borderBottom: i < filteredDl.length - 1 ? `1px solid ${C.border}` : "none", flexWrap: "wrap", gap: 12, cursor: "pointer", transition: "background 0.15s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 36, height: 36, background: "rgba(10,61,46,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 800, color: C.darkGreen, flexShrink: 0 }}>{d.type}</div>
                    <div>
                      <div style={{ fontWeight: 500, color: "#1a1a1a", fontSize: "0.9rem" }}>{d.name}</div>
                      <div style={{ fontSize: "0.72rem", color: "#aaa", marginTop: 2 }}>{d.cat}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <span style={{ color: "#bbb", fontSize: "0.8rem" }}>{d.size}</span>
                    <button className="btn-outline-green" style={{ padding: "7px 18px", fontSize: "0.72rem" }}>Download</button>
                  </div>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "72px 80px", background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldDark} 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -50, top: "50%", transform: "translateY(-50%)", width: 380, height: 380, border: "1px solid rgba(10,61,46,0.08)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="cta-flex" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1 }}>
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem,3.5vw,2.5rem)", fontWeight: 700, color: C.darkGreen, marginBottom: 10 }}>Ready to Register or Renew?</h2>
            <p style={{ color: "rgba(10,61,46,0.65)", fontSize: "0.95rem" }}>The new digital portal makes registration faster, easier, and paperless.</p>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button className="btn-green" onClick={() => setPage("Portal")}>Create Account</button>
            <button style={{ background: "transparent", color: C.darkGreen, border: `2px solid ${C.darkGreen}`, padding: "12px 28px", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s" }} onClick={() => setPage("About")}>Learn More</button>
          </div>
        </div>
      </section>

      <Footer setPage={setPage} />
    </div>
  );
}

// ─── ABOUT PAGE ───
function AboutPage({ setPage }) {
  return (
    <PageWrapper setPage={setPage}>
      <div style={{ background: C.darkGreen, padding: "72px 80px 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-label-light">About PCG</div>
          <h1 className="section-title-light" style={{ maxWidth: 600 }}>Regulating Pharmacy Practice in The Gambia</h1>
        </div>
      </div>

      <section className="section-pad" style={{ padding: "72px 80px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
            <FadeSection>
              <div className="section-label">Our Mandate</div>
              <h2 className="section-title" style={{ marginBottom: 24 }}>Who We Are</h2>
              <p style={{ color: C.gray, fontSize: "0.95rem", lineHeight: 1.85, marginBottom: 18 }}>
                The Pharmacy Council of The Gambia (PCG) is the statutory body responsible for regulating the practice of pharmacy throughout The Gambia. We were established under the Pharmacy Council Act 2014, enacted by the National Assembly of The Gambia.
              </p>
              <p style={{ color: C.gray, fontSize: "0.95rem", lineHeight: 1.85, marginBottom: 18 }}>
                Our primary mandate is to protect and promote public health by ensuring that pharmaceutical services across The Gambia are provided to the highest standards of safety, quality, and professionalism.
              </p>
              <p style={{ color: C.gray, fontSize: "0.95rem", lineHeight: 1.85 }}>
                We regulate all categories of pharmacy professionals — including pharmacists, pharmacy technicians, nurse dispensers, and dispensing assistants — as well as all pharmacy premises including retail pharmacies, wholesale outlets, drug stores, and hospital pharmacies.
              </p>
            </FadeSection>
            <FadeSection>
              <div style={{ background: C.cream, padding: "36px", borderLeft: `4px solid ${C.gold}` }}>
                <div className="section-label">Our Functions</div>
                {[
                  "Register and regulate all pharmacy professionals in The Gambia",
                  "License and inspect all pharmacy premises",
                  "Set and enforce standards for pharmaceutical education and practice",
                  "Conduct pre-registration examinations",
                  "Investigate complaints and take disciplinary action",
                  "Advise the Government on pharmaceutical matters",
                  "Promote Continuing Professional Development (CPD)",
                  "Maintain and publish the public register of practitioners and premises",
                ].map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
                    <span style={{ color: C.gold, fontWeight: 700, marginTop: 2, flexShrink: 0 }}>✦</span>
                    <span style={{ color: C.gray, fontSize: "0.9rem", lineHeight: 1.7 }}>{f}</span>
                  </div>
                ))}
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ padding: "72px 80px", background: C.cream }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeSection style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="section-label">Leadership</div>
            <h2 className="section-title">The PCG Council</h2>
          </FadeSection>
          <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {COUNCIL.map((m, i) => (
              <FadeSection key={i} style={{ transitionDelay: `${i * 70}ms` }}>
                <div style={{ background: "#fff", padding: "28px", display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 52, height: 52, background: m.bg, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 700, color: "#fff" }}>
                    {m.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.92rem", color: C.darkGreen }}>{m.name}</div>
                    <div style={{ fontSize: "0.78rem", color: C.gray, marginTop: 3 }}>{m.role}</div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ padding: "72px 80px", background: C.darkGreen }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="four-col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
            {[
              { value: "2014", label: "Year Established" },
              { value: "1,200+", label: "Registered Practitioners" },
              { value: "380+", label: "Licensed Premises" },
              { value: "7", label: "Regions Covered" },
            ].map(s => (
              <FadeSection key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.4rem", fontWeight: 700, color: C.gold }}>{s.value}</div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 6 }}>{s.label}</div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

// ─── REGISTRATION PAGE ───
function RegistrationPage({ setPage }) {
  return (
    <PageWrapper setPage={setPage}>
      <div style={{ background: C.darkGreen, padding: "72px 80px 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-label-light">Registration</div>
          <h1 className="section-title-light">Register with the Pharmacy Council</h1>
        </div>
      </div>

      <section className="section-pad" style={{ padding: "72px 80px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeSection style={{ marginBottom: 52 }}>
            <div className="section-label">Categories</div>
            <h2 className="section-title" style={{ marginBottom: 16 }}>Who Can Register?</h2>
            <p style={{ color: C.gray, fontSize: "0.95rem", maxWidth: 620, lineHeight: 1.8 }}>The Pharmacy Council registers the following categories of professionals. All applicants must meet the eligibility requirements for their category before applying.</p>
          </FadeSection>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {[
              { title: "Pharmacist", req: ["Bachelor of Pharmacy (B.Pharm) degree from a recognised institution", "Completion of the pre-registration internship period", "Pass in the PCG Pre-Registration Examination", "Valid registration with home country authority (foreign applicants)"], fee: "To be confirmed" },
              { title: "Pharmacy Technician", req: ["Diploma in Pharmacy Technology from a recognised institution", "Completion of supervised practice period", "Pass in the relevant competency assessment", "Two professional references"], fee: "To be confirmed" },
              { title: "Nurse Dispenser", req: ["Valid nursing registration with the Nurses & Midwives Council", "Certificate in dispensing from a recognised institution", "Letter of employment from a licensed healthcare facility"], fee: "To be confirmed" },
              { title: "Dispensing Assistant", req: ["Secondary school certificate (minimum Grade C in science subjects)", "Certificate in dispensing assistance from a recognised institution", "Letter of employment from a licensed pharmacist"], fee: "To be confirmed" },
            ].map((c, i) => (
              <FadeSection key={i} style={{ transitionDelay: `${i * 70}ms` }}>
                <div style={{ background: C.cream, padding: "32px", borderTop: `3px solid ${C.green}` }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: C.darkGreen, marginBottom: 18 }}>{c.title}</h3>
                  <div style={{ fontSize: "0.72rem", color: C.gold, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Requirements</div>
                  {c.req.map((r, j) => (
                    <div key={j} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                      <span style={{ color: C.green, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span style={{ color: C.gray, fontSize: "0.87rem", lineHeight: 1.65 }}>{r}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.78rem", color: C.gray }}>Registration Fee</span>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: C.darkGreen }}>{c.fee}</span>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ padding: "72px 80px", background: C.cream }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeSection style={{ marginBottom: 40 }}>
            <div className="section-label">How to Apply</div>
            <h2 className="section-title">Step-by-Step Process</h2>
          </FadeSection>
          {[
            { step: "01", title: "Download the Application Form", desc: "Download the relevant registration form from the Downloads section of this website, or collect a form in person at the PCG secretariat." },
            { step: "02", title: "Complete the Application", desc: "Fill in all sections of the form clearly and accurately. Incomplete applications will be returned and will delay your registration." },
            { step: "03", title: "Gather Supporting Documents", desc: "Assemble all required supporting documents including your degree/diploma certificate, ID, passport photographs, and any other documents specified for your category." },
            { step: "04", title: "Pay the Registration Fee", desc: "Pay the applicable registration fee at the PCG secretariat and obtain an official receipt. Keep this receipt as it must accompany your application." },
            { step: "05", title: "Submit Your Application", desc: "Submit your completed form, supporting documents, and fee receipt to the PCG secretariat at 112 Kairaba Avenue, Fajara, KMC." },
            { step: "06", title: "Await Decision", desc: "Your application will be reviewed within 14 working days. You will be notified in writing of the outcome. If approved, collect your certificate from the secretariat." },
          ].map((s, i) => (
            <FadeSection key={i} style={{ transitionDelay: `${i * 60}ms` }}>
              <div style={{ display: "flex", gap: 24, marginBottom: 28, padding: "24px", background: "#fff", borderLeft: `4px solid ${i % 2 === 0 ? C.green : C.gold}` }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 700, color: i % 2 === 0 ? C.green : C.gold, flexShrink: 0, lineHeight: 1 }}>{s.step}</div>
                <div>
                  <div style={{ fontWeight: 600, color: C.darkGreen, fontSize: "1rem", marginBottom: 6 }}>{s.title}</div>
                  <div style={{ color: C.gray, fontSize: "0.88rem", lineHeight: 1.72 }}>{s.desc}</div>
                </div>
              </div>
            </FadeSection>
          ))}
          <FadeSection>
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <button className="btn-gold" onClick={() => setPage("Portal")} style={{ fontSize: "0.9rem", padding: "15px 36px" }}>
                Apply Online via Portal
              </button>
            </div>
          </FadeSection>
        </div>
      </section>
    </PageWrapper>
  );
}

// ─── LICENSING PAGE ───
function LicensingPage({ setPage }) {
  return (
    <PageWrapper setPage={setPage}>
      <div style={{ background: C.darkGreen, padding: "72px 80px 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-label-light">Premises Licensing</div>
          <h1 className="section-title-light">Pharmacy Premises Licensing</h1>
        </div>
      </div>

      <section className="section-pad" style={{ padding: "72px 80px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeSection style={{ marginBottom: 48 }}>
            <div className="section-label">Premises Types</div>
            <h2 className="section-title" style={{ marginBottom: 16 }}>Types of Licensed Premises</h2>
            <p style={{ color: C.gray, fontSize: "0.95rem", maxWidth: 600, lineHeight: 1.8 }}>All premises that supply, dispense, or store medicines in The Gambia must hold a valid licence issued by the Pharmacy Council. Unlicensed operation is a criminal offence.</p>
          </FadeSection>
          <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { icon: "🏪", title: "Retail Pharmacy", desc: "A premises that dispenses prescription and over-the-counter medicines directly to patients. Must be supervised by a registered pharmacist at all times during operating hours.", fee: "To be confirmed" },
              { icon: "🏭", title: "Wholesale Pharmacy", desc: "A premises that supplies medicines in bulk to other licensed premises. Must maintain strict storage standards and full records of all transactions.", fee: "To be confirmed" },
              { icon: "💊", title: "Drug Store / Dispensary", desc: "A premises attached to a healthcare facility that dispenses medicines to patients under the facility's care. Must be under the supervision of a qualified person.", fee: "To be confirmed" },
              { icon: "🏥", title: "Hospital Pharmacy", desc: "A pharmacy operating within a hospital or clinic setting, serving inpatients and outpatients. Subject to enhanced inspection standards.", fee: "To be confirmed" },
              { icon: "🔬", title: "Manufacturing Facility", desc: "A premises that manufactures medicinal products for supply within The Gambia. Subject to Good Manufacturing Practice (GMP) standards.", fee: "To be confirmed" },
              { icon: "📦", title: "Import / Export Agent", desc: "A registered entity authorised to import or export pharmaceutical products. Subject to additional NAFDAC and customs compliance requirements.", fee: "To be confirmed" },
            ].map((t, i) => (
              <FadeSection key={i} style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="card" style={{ padding: "28px", borderTop: `3px solid ${C.gold}` }}>
                  <div style={{ fontSize: "2rem", marginBottom: 14 }}>{t.icon}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 700, color: C.darkGreen, marginBottom: 10 }}>{t.title}</h3>
                  <p style={{ color: C.gray, fontSize: "0.85rem", lineHeight: 1.72, marginBottom: 14 }}>{t.desc}</p>
                  <div style={{ paddingTop: 14, borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.75rem", color: C.gray }}>Annual Licence Fee</span>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: C.darkGreen }}>{t.fee}</span>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ padding: "72px 80px", background: C.cream }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeSection style={{ marginBottom: 40 }}>
            <div className="section-label">Inspection Process</div>
            <h2 className="section-title">How Licensing Works</h2>
          </FadeSection>
          {[
            { step: "01", title: "Submit Application", desc: "Complete the Premises Licence Application Form and submit it with your floor plan, lease agreement, superintendent pharmacist details, and the application fee." },
            { step: "02", title: "Application Review", desc: "The Premises Licensing Committee reviews your application for completeness and compliance with the minimum requirements for your premises type." },
            { step: "03", title: "Inspection Scheduled", desc: "An inspection visit is arranged by PCG inspectors. You will receive at least 7 days notice before the inspection date." },
            { step: "04", title: "Inspection Conducted", desc: "PCG inspectors visit the premises to verify compliance with storage, safety, staffing, and operational standards." },
            { step: "05", title: "Decision Issued", desc: "Following the inspection, the Committee issues a decision. If approved, your licence is issued. If not, you will receive a notice identifying deficiencies to be remedied." },
            { step: "06", title: "Annual Renewal", desc: "Premises licences must be renewed annually. Renewal opens 3 months before expiry. Continued operation after expiry without renewal is a criminal offence." },
          ].map((s, i) => (
            <FadeSection key={i} style={{ transitionDelay: `${i * 60}ms` }}>
              <div style={{ display: "flex", gap: 24, marginBottom: 24, padding: "22px", background: "#fff", borderLeft: `4px solid ${i % 2 === 0 ? C.gold : C.green}` }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 700, color: i % 2 === 0 ? C.gold : C.green, flexShrink: 0, lineHeight: 1 }}>{s.step}</div>
                <div>
                  <div style={{ fontWeight: 600, color: C.darkGreen, fontSize: "0.97rem", marginBottom: 6 }}>{s.title}</div>
                  <div style={{ color: C.gray, fontSize: "0.87rem", lineHeight: 1.72 }}>{s.desc}</div>
                </div>
              </div>
            </FadeSection>
          ))}
          <FadeSection>
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <button className="btn-gold" onClick={() => setPage("Portal")} style={{ fontSize: "0.9rem", padding: "15px 36px" }}>Apply for Premises Licence</button>
            </div>
          </FadeSection>
        </div>
      </section>
    </PageWrapper>
  );
}

// ─── EXAMINATIONS PAGE ───
function ExaminationsPage({ setPage }) {
  return (
    <PageWrapper setPage={setPage}>
      <div style={{ background: C.darkGreen, padding: "72px 80px 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-label-light">Examinations</div>
          <h1 className="section-title-light">Pre-Registration Examinations</h1>
        </div>
      </div>

      <section className="section-pad" style={{ padding: "72px 80px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52 }}>
            <FadeSection>
              <div className="section-label">About the Exam</div>
              <h2 className="section-title" style={{ marginBottom: 22 }}>Overview</h2>
              <p style={{ color: C.gray, fontSize: "0.95rem", lineHeight: 1.85, marginBottom: 18 }}>
                The Pre-Registration Pharmaceutical Examination is a mandatory assessment that all pharmacy graduates must pass before they can be registered as pharmacists in The Gambia.
              </p>
              <p style={{ color: C.gray, fontSize: "0.95rem", lineHeight: 1.85, marginBottom: 18 }}>
                The examination is held twice per year — typically in May and November — at the University of The Gambia, Faraba Banta Campus.
              </p>
              <p style={{ color: C.gray, fontSize: "0.95rem", lineHeight: 1.85 }}>
                Candidates must have completed their required internship period before sitting the examination. Results are published on this website and communicated to candidates in writing.
              </p>
            </FadeSection>
            <FadeSection>
              <div style={{ background: C.cream, padding: "32px" }}>
                <div className="section-label">Exam Schedule</div>
                <div style={{ marginBottom: 28 }}>
                  {[
                    { sitting: "May 2025 Sitting", date: "To be announced", status: "Upcoming" },
                    { sitting: "November 2025 Sitting", date: "To be announced", status: "Upcoming" },
                    { sitting: "November 2024 Sitting", date: "30 November 2024", status: "Completed" },
                    { sitting: "May 2024 Sitting", date: "25 May 2024", status: "Completed" },
                  ].map((e, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
                      <div>
                        <div style={{ fontWeight: 600, color: C.darkGreen, fontSize: "0.9rem" }}>{e.sitting}</div>
                        <div style={{ fontSize: "0.78rem", color: C.gray, marginTop: 3 }}>{e.date}</div>
                      </div>
                      <span className="tag" style={{ background: e.status === "Upcoming" ? "rgba(212,168,67,0.13)" : "rgba(27,107,74,0.1)", color: e.status === "Upcoming" ? C.gold : C.green }}>{e.status}</span>
                    </div>
                  ))}
                </div>
                <button className="btn-gold" style={{ width: "100%" }} onClick={() => setPage("Portal")}>Register for Next Sitting</button>
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ padding: "72px 80px", background: C.cream }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeSection style={{ marginBottom: 40 }}>
            <div className="section-label">Syllabus</div>
            <h2 className="section-title">Examination Subjects</h2>
          </FadeSection>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {[
              { title: "Pharmaceutics", topics: ["Dosage form design", "Drug delivery systems", "Biopharmaceutics and pharmacokinetics", "Pharmaceutical calculations", "Sterile product preparation"] },
              { title: "Pharmacology", topics: ["Mechanism of drug action", "Adverse drug reactions", "Drug interactions", "Pharmacotherapy of major disease groups", "Controlled substances"] },
              { title: "Pharmaceutical Chemistry", topics: ["Drug synthesis and structure", "Quality control and assay methods", "Pharmacopoeial standards", "Stability of pharmaceutical preparations", "Analytical techniques"] },
              { title: "Clinical Pharmacy Practice", topics: ["Patient counselling", "Prescription interpretation", "Clinical pharmacokinetics", "Evidence-based pharmacy practice", "Ethics and professional standards"] },
            ].map((s, i) => (
              <FadeSection key={i} style={{ transitionDelay: `${i * 70}ms` }}>
                <div style={{ background: "#fff", padding: "28px", borderLeft: `4px solid ${i % 2 === 0 ? C.green : C.gold}` }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 700, color: C.darkGreen, marginBottom: 16 }}>{s.title}</h3>
                  {s.topics.map((t, j) => (
                    <div key={j} style={{ display: "flex", gap: 10, marginBottom: 9 }}>
                      <span style={{ color: i % 2 === 0 ? C.green : C.gold, fontWeight: 700, flexShrink: 0 }}>—</span>
                      <span style={{ color: C.gray, fontSize: "0.87rem" }}>{t}</span>
                    </div>
                  ))}
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ padding: "72px 80px", background: C.darkGreen }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <FadeSection>
            <div className="section-label-light">Results</div>
            <h2 className="section-title-light" style={{ marginBottom: 16 }}>Check Your Results</h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", marginBottom: 36, lineHeight: 1.8 }}>
              Results for recent examination sittings are published below. Candidates can also view their individual results by logging into the Practitioner Portal.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn-gold" onClick={() => setPage("News")}>View Published Results</button>
              <button className="btn-outline-white" onClick={() => setPage("Portal")}>Login to View My Results</button>
            </div>
          </FadeSection>
        </div>
      </section>
    </PageWrapper>
  );
}

// ─── NEWS PAGE ───
function NewsPage({ setPage }) {
  return (
    <PageWrapper setPage={setPage}>
      <div style={{ background: C.darkGreen, padding: "72px 80px 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-label-light">News & Notices</div>
          <h1 className="section-title-light">Announcements & Updates</h1>
        </div>
      </div>
      <section className="section-pad" style={{ padding: "72px 80px", background: C.cream }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {NEWS_ARTICLES.map((n, i) => (
              <FadeSection key={i} style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="card" style={{ padding: "32px", borderBottom: "3px solid transparent", cursor: "pointer", transition: "border-color 0.2s, transform 0.28s, box-shadow 0.28s" }}
                  onClick={() => setPage(`news-${n.id}`)}
                  onMouseEnter={e => e.currentTarget.style.borderBottomColor = C.green}
                  onMouseLeave={e => e.currentTarget.style.borderBottomColor = "transparent"}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                    <span className="tag" style={{ background: "rgba(27,107,74,0.09)", color: C.green }}>{n.category}</span>
                    <span style={{ fontSize: "0.75rem", color: "#aaa" }}>{n.date}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 700, color: C.darkGreen, marginBottom: 10, lineHeight: 1.35 }}>{n.title}</h3>
                  <p style={{ color: C.gray, fontSize: "0.83rem", lineHeight: 1.72 }}>{n.excerpt}</p>
                  <div style={{ marginTop: 22, color: C.green, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6 }}>Read More <span>→</span></div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

// ─── NEWS ARTICLE PAGE ───
function NewsArticlePage({ id, setPage }) {
  const article = NEWS_ARTICLES.find(n => n.id === id);
  if (!article) return null;
  return (
    <PageWrapper setPage={setPage}>
      <section className="section-pad" style={{ padding: "72px 80px", background: "#fff" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <button onClick={() => setPage("News")} style={{ background: "transparent", border: "none", color: C.green, cursor: "pointer", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 36, display: "flex", alignItems: "center", gap: 6 }}>← Back to News</button>
          <FadeSection>
            <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
              <span className="tag" style={{ background: "rgba(27,107,74,0.09)", color: C.green }}>{article.category}</span>
              <span style={{ fontSize: "0.82rem", color: "#aaa", alignSelf: "center" }}>{article.date}</span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 700, color: C.darkGreen, lineHeight: 1.2, marginBottom: 36 }}>{article.title}</h1>
            <div style={{ width: 60, height: 4, background: C.gold, marginBottom: 36 }} />
            {article.body.split("\n\n").map((para, i) => (
              <p key={i} style={{ color: C.gray, fontSize: "0.97rem", lineHeight: 1.9, marginBottom: 24 }}>{para}</p>
            ))}
          </FadeSection>
          <FadeSection style={{ marginTop: 52, paddingTop: 36, borderTop: `1px solid ${C.border}` }}>
            <div style={{ background: C.cream, padding: "28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ fontWeight: 600, color: C.darkGreen, fontSize: "0.92rem" }}>Have a question about this notice?</div>
                <div style={{ color: C.gray, fontSize: "0.83rem", marginTop: 4 }}>Contact the PCG secretariat at info@gpc.gm or call +220 4495572</div>
              </div>
              <button className="btn-gold" onClick={() => setPage("Contact")}>Contact PCG</button>
            </div>
          </FadeSection>
        </div>
      </section>
    </PageWrapper>
  );
}

// ─── DOWNLOADS PAGE ───
function DownloadsPage({ setPage }) {
  const [filter, setFilter] = useState("All");
  const cats = ["All", ...Array.from(new Set(DOWNLOADS.map(d => d.cat)))];
  const filtered = filter === "All" ? DOWNLOADS : DOWNLOADS.filter(d => d.cat === filter);
  return (
    <PageWrapper setPage={setPage}>
      <div style={{ background: C.darkGreen, padding: "72px 80px 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-label-light">Document Library</div>
          <h1 className="section-title-light">Forms & Downloads</h1>
        </div>
      </div>
      <section className="section-pad" style={{ padding: "72px 80px", background: C.cream }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeSection style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)} style={{ padding: "8px 18px", border: `1px solid ${filter === c ? C.darkGreen : C.border}`, background: filter === c ? C.darkGreen : "#fff", color: filter === c ? "#fff" : C.gray, fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.06em", cursor: "pointer", textTransform: "uppercase", transition: "all 0.2s" }}>{c}</button>
            ))}
          </FadeSection>
          <FadeSection>
            <div style={{ border: `1px solid ${C.border}`, background: "#fff" }}>
              {filtered.map((d, i) => (
                <div key={i} className="download-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 28px", borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : "none", flexWrap: "wrap", gap: 12, cursor: "pointer", transition: "background 0.15s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 40, height: 40, background: "rgba(10,61,46,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontWeight: 800, color: C.darkGreen, flexShrink: 0 }}>{d.type}</div>
                    <div>
                      <div style={{ fontWeight: 500, color: "#1a1a1a", fontSize: "0.92rem" }}>{d.name}</div>
                      <div style={{ fontSize: "0.73rem", color: "#bbb", marginTop: 2 }}>{d.cat} · {d.size}</div>
                    </div>
                  </div>
                  <button className="btn-outline-green" style={{ padding: "8px 22px" }}>Download</button>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>
    </PageWrapper>
  );
}

// ─── PUBLIC REGISTER PAGE ───
function RegisterPage({ setPage }) {
  const [tab, setTab] = useState("practitioners");
  const [search, setSearch] = useState("");
  const [mapPin, setMapPin] = useState(null);

  const filteredPract = PRACTITIONERS.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.reg.toLowerCase().includes(search.toLowerCase()) ||
    r.location.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPrem = PHARMACIES.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.region.toLowerCase().includes(search.toLowerCase()) ||
    r.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageWrapper setPage={setPage}>
      <div style={{ background: C.darkGreen, padding: "72px 80px 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-label-light">Public Register</div>
          <h1 className="section-title-light">Verify a Practitioner or Premises</h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", marginTop: 16, maxWidth: 560, lineHeight: 1.8 }}>
            The public register is updated as registrations are approved. Anyone can search and verify the status of a licensed pharmacist or pharmacy in The Gambia.
          </p>
        </div>
      </div>

      <section className="section-pad" style={{ padding: "64px 80px", background: C.cream }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 4, marginBottom: 32 }}>
            {["practitioners", "premises", "map"].map(t => (
              <button key={t} onClick={() => { setTab(t); setSearch(""); }} style={{ padding: "10px 24px", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", background: tab === t ? C.darkGreen : "#fff", color: tab === t ? "#fff" : C.gray, transition: "all 0.2s", borderBottom: tab === t ? `3px solid ${C.gold}` : "3px solid transparent" }}>
                {t === "practitioners" ? "Practitioners" : t === "premises" ? "Pharmacy Premises" : "Pharmacy Map"}
              </button>
            ))}
          </div>

          {tab !== "map" && (
            <div style={{ position: "relative", maxWidth: 560, marginBottom: 28 }}>
              <input type="text" placeholder={tab === "practitioners" ? "Search by name, reg. number or location..." : "Search by name, region or address..."} value={search} onChange={e => setSearch(e.target.value)}
                style={{ width: "100%", padding: "15px 50px 15px 20px", border: `1px solid ${C.border}`, background: "#fff", fontSize: "0.92rem", outline: "none" }} />
              <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: C.green, fontSize: "1.1rem" }}>⌕</span>
            </div>
          )}

          {tab === "practitioners" && (
            <FadeSection>
              <div style={{ border: `1px solid ${C.border}`, background: "#fff" }}>
                <div className="table-wrap" style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
                    <thead>
                      <tr style={{ background: C.darkGreen }}>
                        {["Full Name", "Category", "Reg. Number", "Location", "Status"].map(h => <th key={h} style={{ padding: "13px 18px", textAlign: "left", fontSize: "0.67rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff" }}>{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPract.map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? "#fff" : C.cream }}>
                          <td style={{ padding: "15px 18px", fontWeight: 500, color: "#1a1a1a", fontSize: "0.9rem" }}>{r.name}</td>
                          <td style={{ padding: "15px 18px", color: C.gray, fontSize: "0.85rem" }}>{r.category}</td>
                          <td style={{ padding: "15px 18px", color: C.green, fontSize: "0.82rem", fontFamily: "monospace" }}>{r.reg}</td>
                          <td style={{ padding: "15px 18px", color: C.gray, fontSize: "0.85rem" }}>{r.location}</td>
                          <td style={{ padding: "15px 18px" }}>
                            <span style={{ padding: "3px 10px", fontSize: "0.67rem", fontWeight: 700, background: r.status === "Active" ? "rgba(27,107,74,0.1)" : "rgba(200,60,60,0.08)", color: r.status === "Active" ? C.green : "#C0392B" }}>{r.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ padding: "13px 18px", borderTop: `1px solid ${C.border}`, color: C.gray, fontSize: "0.75rem" }}>Showing {filteredPract.length} of 1,247 registered practitioners. This is a sample — the full register will be loaded from PCG's official data.</div>
              </div>
            </FadeSection>
          )}

          {tab === "premises" && (
            <FadeSection>
              <div style={{ border: `1px solid ${C.border}`, background: "#fff" }}>
                <div className="table-wrap" style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
                    <thead>
                      <tr style={{ background: C.darkGreen }}>
                        {["Premises Name", "Type", "Region", "Address", "Status"].map(h => <th key={h} style={{ padding: "13px 18px", textAlign: "left", fontSize: "0.67rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff" }}>{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPrem.map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? "#fff" : C.cream, cursor: "pointer" }} onClick={() => { setTab("map"); setMapPin(r); }}>
                          <td style={{ padding: "15px 18px", fontWeight: 500, color: "#1a1a1a", fontSize: "0.9rem" }}>{r.name}</td>
                          <td style={{ padding: "15px 18px", color: C.gray, fontSize: "0.85rem" }}>{r.type}</td>
                          <td style={{ padding: "15px 18px", color: C.green, fontSize: "0.85rem" }}>{r.region}</td>
                          <td style={{ padding: "15px 18px", color: C.gray, fontSize: "0.83rem" }}>{r.address}</td>
                          <td style={{ padding: "15px 18px" }}>
                            <span style={{ padding: "3px 10px", fontSize: "0.67rem", fontWeight: 700, background: "rgba(27,107,74,0.1)", color: C.green }}>Active</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ padding: "13px 18px", borderTop: `1px solid ${C.border}`, color: C.gray, fontSize: "0.75rem" }}>Showing {filteredPrem.length} of 380 licensed premises. Click any row to view on the map.</div>
              </div>
            </FadeSection>
          )}

          {tab === "map" && (
            <FadeSection>
              <div style={{ position: "relative" }}>
                {mapPin && (
                  <div style={{ background: "#fff", border: `1px solid ${C.border}`, padding: "16px 20px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <div style={{ fontWeight: 600, color: C.darkGreen, fontSize: "0.95rem" }}>{mapPin.name}</div>
                      <div style={{ color: C.gray, fontSize: "0.82rem", marginTop: 3 }}>{mapPin.type} · {mapPin.address}</div>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <span style={{ padding: "3px 10px", fontSize: "0.67rem", fontWeight: 700, background: "rgba(27,107,74,0.1)", color: C.green }}>Active</span>
                      <button onClick={() => setMapPin(null)} style={{ background: "transparent", border: "none", color: "#bbb", cursor: "pointer", fontSize: "1.1rem" }}>✕</button>
                    </div>
                  </div>
                )}
                <div style={{ background: "#fff", border: `1px solid ${C.border}`, padding: "24px", position: "relative" }}>
                  <div style={{ fontSize: "0.72rem", color: C.gray, marginBottom: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Licensed Pharmacies — The Gambia</div>
                  <svg viewBox="0 0 100 80" style={{ width: "100%", maxHeight: 420, display: "block" }}>
                    {/* Gambia river shape */}
                    <path d="M5,55 Q15,48 25,50 Q35,52 45,50 Q55,48 65,46 Q75,44 85,42 Q90,41 95,40" stroke="rgba(27,107,74,0.25)" strokeWidth="6" fill="none" />
                    {/* Country outline approximation */}
                    <path d="M5,45 Q10,38 18,36 Q30,33 40,35 Q55,35 65,33 Q78,30 90,30 L92,38 L95,42 L90,50 Q75,52 60,54 Q45,56 30,58 Q18,60 10,62 Z" fill="rgba(27,107,74,0.06)" stroke="rgba(27,107,74,0.2)" strokeWidth="0.5" />
                    {/* River */}
                    <path d="M5,52 Q20,47 35,49 Q50,47 65,45 Q80,43 95,41" stroke="rgba(100,180,255,0.4)" strokeWidth="3" fill="none" strokeLinecap="round" />

                    {/* Region labels */}
                    {[["Banjul", 21, 64], ["KMC", 26, 68], ["W.Coast", 33, 70], ["N.Bank", 45, 37], ["L.River", 48, 62], ["C.River", 68, 57], ["U.River", 87, 56]].map(([label, x, y]) => (
                      <text key={label} x={x} y={y} fontSize="3" fill="rgba(10,61,46,0.35)" textAnchor="middle" fontFamily="Arial">{label}</text>
                    ))}

                    {/* Pharmacy pins */}
                    {PHARMACIES.map((p, i) => {
                      const isSelected = mapPin?.name === p.name;
                      return (
                        <g key={i} className="map-pin" onClick={() => setMapPin(p)} style={{ cursor: "pointer" }}>
                          <circle cx={p.x} cy={p.y} r={isSelected ? 3.5 : 2.5} fill={p.type === "Wholesale" ? C.gold : C.green} stroke="#fff" strokeWidth="0.8" style={{ filter: isSelected ? `drop-shadow(0 0 3px ${C.gold})` : "none", transition: "all 0.2s" }} />
                          {isSelected && <circle cx={p.x} cy={p.y} r={5} fill="none" stroke={C.gold} strokeWidth="0.8" opacity="0.6" />}
                        </g>
                      );
                    })}
                  </svg>
                  <div style={{ display: "flex", gap: 20, marginTop: 14, flexWrap: "wrap" }}>
                    {[["Retail Pharmacy", C.green], ["Wholesale Pharmacy", C.gold]].map(([label, color]) => (
                      <div key={label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />
                        <span style={{ fontSize: "0.75rem", color: C.gray }}>{label}</span>
                      </div>
                    ))}
                    <div style={{ fontSize: "0.75rem", color: "#bbb", marginLeft: "auto" }}>{PHARMACIES.length} licensed premises shown · Click a pin for details</div>
                  </div>
                </div>
              </div>
            </FadeSection>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}

// ─── CONTACT PAGE ───
function ContactPage({ setPage }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  return (
    <PageWrapper setPage={setPage}>
      <div style={{ background: C.darkGreen, padding: "72px 80px 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-label-light">Contact</div>
          <h1 className="section-title-light">Get in Touch</h1>
        </div>
      </div>

      <section className="section-pad" style={{ padding: "72px 80px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64, alignItems: "start" }}>
            <FadeSection>
              <div className="section-label">Our Office</div>
              <h2 className="section-title" style={{ marginBottom: 32 }}>Contact Information</h2>
              {[
                { icon: "📍", label: "Address", value: "112 Kairaba Avenue, Fajara, KMC, The Gambia" },
                { icon: "📞", label: "Telephone", value: "+220 4495572" },
                { icon: "📧", label: "Email", value: "info@gpc.gm" },
                { icon: "🕐", label: "Office Hours", value: "Monday – Friday, 8:00am – 5:00pm\nClosed on public holidays" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 16, marginBottom: 28, padding: "20px", background: C.cream }}>
                  <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: "0.7rem", color: C.gold, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>{c.label}</div>
                    <div style={{ color: C.darkGreen, fontSize: "0.92rem", fontWeight: 500, lineHeight: 1.6, whiteSpace: "pre-line" }}>{c.value}</div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 8, padding: "18px 20px", background: C.darkGreen }}>
                <div style={{ fontSize: "0.7rem", color: C.gold, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>Directions</div>
                <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.88rem", lineHeight: 1.7 }}>We are located on Kairaba Avenue, Fajara. From the Westfield roundabout, head south on Kairaba Avenue. Our office is on the right-hand side, opposite the Fajara Police Station.</div>
              </div>
            </FadeSection>

            <FadeSection>
              {submitted ? (
                <div style={{ background: C.cream, padding: "48px", textAlign: "center" }}>
                  <div style={{ fontSize: "3rem", marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 700, color: C.darkGreen, marginBottom: 12 }}>Message Sent</h3>
                  <p style={{ color: C.gray, fontSize: "0.92rem", lineHeight: 1.8 }}>Thank you for contacting the Pharmacy Council of The Gambia. We will respond to your enquiry within 3 working days.</p>
                  <button className="btn-gold" style={{ marginTop: 24 }} onClick={() => setSubmitted(false)}>Send Another Message</button>
                </div>
              ) : (
                <div>
                  <div className="section-label">Send a Message</div>
                  <h2 className="section-title" style={{ marginBottom: 32 }}>Enquiry Form</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    {[["Full Name", "name", "text"], ["Email Address", "email", "email"]].map(([label, key, type]) => (
                      <div key={key}>
                        <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: C.darkGreen, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{label}</label>
                        <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                          style={{ width: "100%", padding: "12px 16px", border: `1px solid ${C.border}`, fontSize: "0.92rem", outline: "none", transition: "border-color 0.2s" }}
                          onFocus={e => e.target.style.borderColor = C.green}
                          onBlur={e => e.target.style.borderColor = C.border} />
                      </div>
                    ))}
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: C.darkGreen, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Subject</label>
                    <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      style={{ width: "100%", padding: "12px 16px", border: `1px solid ${C.border}`, fontSize: "0.92rem", outline: "none", background: "#fff" }}>
                      <option value="">Select a subject</option>
                      <option>Registration Enquiry</option>
                      <option>Premises Licensing</option>
                      <option>Examination Enquiry</option>
                      <option>Annual Renewal</option>
                      <option>Lodge a Complaint</option>
                      <option>General Enquiry</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: C.darkGreen, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Message</label>
                    <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={6}
                      placeholder="Please describe your enquiry in detail..."
                      style={{ width: "100%", padding: "12px 16px", border: `1px solid ${C.border}`, fontSize: "0.92rem", outline: "none", resize: "vertical", transition: "border-color 0.2s" }}
                      onFocus={e => e.target.style.borderColor = C.green}
                      onBlur={e => e.target.style.borderColor = C.border} />
                  </div>
                  <button className="btn-gold" style={{ width: "100%", padding: "15px", fontSize: "0.9rem" }} onClick={() => setSubmitted(true)}>
                    Send Message →
                  </button>
                </div>
              )}
            </FadeSection>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

// ─── PORTAL PAGE (Phase 2 Preview) ───
function PortalPage({ setPage }) {
  const [authMode, setAuthMode] = useState("login");
  return (
    <div style={{ paddingTop: 80, minHeight: "100vh", background: C.cream, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 24px" }}>
        <div style={{ maxWidth: 440, width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ width: 56, height: 56, background: C.darkGreen, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "1.5rem" }}>⚕</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 700, color: C.darkGreen, marginBottom: 6 }}>Practitioner Portal</h1>
            <p style={{ color: C.gray, fontSize: "0.88rem" }}>Pharmacy Council of The Gambia</p>
          </div>

          <div style={{ background: "rgba(212,168,67,0.12)", border: "1px solid rgba(212,168,67,0.3)", padding: "14px 18px", marginBottom: 28, display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: "1rem", flexShrink: 0 }}>🚀</span>
            <div>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: C.darkGreen, marginBottom: 3 }}>Phase 2 Feature — Coming Soon</div>
              <div style={{ fontSize: "0.75rem", color: C.gray, lineHeight: 1.6 }}>The full practitioner portal will be available once Phase 2 development is complete. It will allow online registration, renewal, CPD tracking, and certificate downloads.</div>
            </div>
          </div>

          <div style={{ background: "#fff", padding: "36px", border: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", gap: 4, marginBottom: 28 }}>
              {["login", "register"].map(m => (
                <button key={m} onClick={() => setAuthMode(m)} style={{ flex: 1, padding: "10px", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase", background: authMode === m ? C.darkGreen : C.cream, color: authMode === m ? "#fff" : C.gray, transition: "all 0.2s" }}>
                  {m === "login" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>

            {authMode === "login" ? (
              <div>
                {[["Registration Number or Email", "text"], ["Password", "password"]].map(([label, type], i) => (
                  <div key={i} style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: C.darkGreen, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 7 }}>{label}</label>
                    <input type={type} disabled placeholder={type === "password" ? "••••••••" : "PCG/PH/0001 or email"}
                      style={{ width: "100%", padding: "12px 14px", border: `1px solid ${C.border}`, fontSize: "0.9rem", background: C.cream, cursor: "not-allowed", color: C.gray }} />
                  </div>
                ))}
                <button disabled style={{ width: "100%", padding: "13px", background: C.green, color: "#fff", border: "none", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.5, cursor: "not-allowed", marginTop: 8 }}>Sign In — Available in Phase 2</button>
              </div>
            ) : (
              <div>
                {[["Full Name", "text"], ["Registration Number", "text"], ["Email Address", "email"], ["Create Password", "password"]].map(([label, type], i) => (
                  <div key={i} style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: C.darkGreen, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 7 }}>{label}</label>
                    <input type={type} disabled style={{ width: "100%", padding: "12px 14px", border: `1px solid ${C.border}`, fontSize: "0.9rem", background: C.cream, cursor: "not-allowed" }} />
                  </div>
                ))}
                <button disabled style={{ width: "100%", padding: "13px", background: C.green, color: "#fff", border: "none", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.5, cursor: "not-allowed", marginTop: 8 }}>Create Account — Available in Phase 2</button>
              </div>
            )}
          </div>

          <div style={{ marginTop: 24, background: "#fff", padding: "20px", border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: C.darkGreen, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Phase 2 Portal Features</div>
            {[
              "Online registration & renewal applications",
              "Upload documents and track application status",
              "Pay fees via mobile money or bank card",
              "Download practising certificates as PDF",
              "Log and track CPD hours",
              "Register for pre-registration examinations",
              "View your exam results",
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 9 }}>
                <span style={{ color: C.gold, fontWeight: 700, fontSize: "0.8rem", flexShrink: 0 }}>✦</span>
                <span style={{ color: C.gray, fontSize: "0.83rem" }}>{f}</span>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button onClick={() => setPage("Contact")} style={{ background: "transparent", border: "none", color: C.green, fontSize: "0.82rem", cursor: "pointer", fontWeight: 600 }}>Need help? Contact PCG →</button>
          </div>
        </div>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}

// ─── COOKIE NOTICE ───
function CookieNotice() {
  const [accepted, setAccepted] = useState(false);
  if (accepted) return null;
  return (
    <div className="cookie-bar">
      <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.82rem", lineHeight: 1.6, maxWidth: 700 }}>
        This website uses cookies to ensure you get the best experience. By continuing to use this site you agree to our use of cookies in accordance with our Privacy Policy.
      </p>
      <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
        <button className="btn-gold" style={{ padding: "9px 22px", fontSize: "0.78rem" }} onClick={() => setAccepted(true)}>Accept</button>
        <button onClick={() => setAccepted(true)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.55)", padding: "9px 18px", fontSize: "0.78rem", cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>Decline</button>
      </div>
    </div>
  );
}

// ─── ROOT APP ───
export default function App() {
  const [page, setPage] = useState("Home");

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  const renderPage = () => {
    if (page === "Home") return <HomePage setPage={setPage} />;
    if (page === "About") return <AboutPage setPage={setPage} />;
    if (page === "Registration") return <RegistrationPage setPage={setPage} />;
    if (page === "Register") return <RegisterPage setPage={setPage} />;
    if (page === "Licensing") return <LicensingPage setPage={setPage} />;
    if (page === "Examinations") return <ExaminationsPage setPage={setPage} />;
    if (page === "News") return <NewsPage setPage={setPage} />;
    if (page === "Downloads") return <DownloadsPage setPage={setPage} />;
    if (page === "Contact") return <ContactPage setPage={setPage} />;
    if (page === "Portal") return <PortalPage setPage={setPage} />;
    if (page.startsWith("news-")) return <NewsArticlePage id={parseInt(page.split("-")[1])} setPage={setPage} />;
    return <HomePage setPage={setPage} />;
  };

  return (
    <>
      <style>{STYLES}</style>
      <Navbar page={page} setPage={setPage} />
      {renderPage()}
      <CookieNotice />
    </>
  );
}
