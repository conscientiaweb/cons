'use html';
'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function FinancePage() {
  const [activeTier, setActiveTier] = useState('title');
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // References for handling mouse movement ring and text intersection reveal effects
  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);
  const revealsRef = useRef([]);

  useEffect(() => {
    // 1. Scroll tracking logic
    const handleScroll = () => {
      const totalScroll = document.body.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // 2. Custom fluid cursor followers
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${mouseX}px`;
        cursorRef.current.style.top = `${mouseY}px`;
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = `${ringX - 18}px`;
        cursorRingRef.current.style.top = `${ringY - 18}px`;
      }
      requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const ringAnimFrame = requestAnimationFrame(animateRing);

    // 3. Scroll Reveal intersection logic
    const observerOptions = { threshold: 0.12 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(ringAnimFrame);
      observer.disconnect();
    };
  }, []);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('financeteam.conscientia@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const addToReveals = (el) => {
    if (el && !revealsRef.current.includes(el)) {
      revealsRef.current.push(el);
    }
  };

  return (
    <>
      {/* Dynamic styling tags loaded securely into the document scope */}
      <style jsx global>{`
        :root {
          --bg: #060a10;
          --surface: #0d1420;
          --surface2: #111a2a;
          --ink: #f0ede6;
          --ink-dim: rgba(240,237,230,0.55);
          --gold: #c8a84b;
          --gold-dim: rgba(200,168,75,0.18);
          --gold-glow: rgba(200,168,75,0.35);
          --blue: #2A3F6B;
          --rule: rgba(30,42,61,0.9);
          --rule-bright: rgba(200,168,75,0.25);
          --muted: #6B7A94;
          --ff-display: 'Syne', sans-serif;
          --ff-body: 'EB Garamond', serif;
          --ff-mono: 'IBM Plex Mono', monospace;
        }

        html { scroll-behavior: smooth; }
        body { background: var(--bg); color: var(--ink); font-family: var(--ff-body); overflow-x: hidden; }

        @media (min-width: 769px) {
          body { cursor: none; }
        }

        /* Hover expansion interactions */
        body:has(a:hover) .cursor-dot, body:has(button:hover) .cursor-dot { transform: scale(2.5); }
        body:has(a:hover) .cursor-ring, body:has(button:hover) .cursor-ring { width: 56px; height: 56px; opacity: 0.4; }

        .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.8s cubic-bezier(0.23,1,0.32,1), transform 0.8s cubic-bezier(0.23,1,0.32,1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes marqLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes bobble { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(8px); } }
      `}</style>

      {/* Interactive Micro-elements */}
      <div ref={cursorRef} className="cursor-dot fixed w-[10px] height-[10px] bg-[var(--gold)] rounded-full pointer-events-none z-[9999] transition-transform duration-150 ease-out opacity-0 md:opacity-100 mix-blend-screen" style={{ position: 'fixed', transform: 'translate(-50%, -50%)' }}></div>
      <div ref={cursorRingRef} className="cursor-ring fixed w-[36px] height-[36px] border border-[rgba(200,168,75,0.5)] rounded-full pointer-events-none z-[9998] transition-[width,height,opacity] duration-300 hidden md:block" style={{ position: 'fixed' }}></div>
      <div className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[var(--gold)] to-[#e8c870] z-[600] transition-[width] duration-100 ease-linear" style={{ width: `${scrollProgress}%` }}></div>

      {/* Copy Notification Toast */}
      <div className={`fixed bottom-8 right-8 z-[1000] bg-[var(--gold)] color-[var(--bg)] font-[var(--ff-mono)] text-[0.65rem] tracking-[0.12em] px-6 py-3 transition-all duration-500 pointer-events-none ${copied ? 'translate-y-0 opacity-100' : 'translate-y-[80px] opacity-0'}`} style={{ color: '#060a10' }}>
        COPIED TO CLIPBOARD
      </div>

      {/* Navigation */}
      <nav id="nav" className="fixed top-0 left-0 right-0 z-[500] h-[56px] flex items-center justify-between px-6 md:px-12 border-b border-[var(--rule)] bg-[rgba(6,10,16,0.75)] backdrop-blur-[20px]">
        <div className="flex items-center gap-3 font-[var(--ff-display)] text-[0.8rem] font-bold tracking-[0.3em] color-[var(--gold)] text-transform uppercase" style={{ color: 'var(--gold)' }}>
          <img src="https://upload.wikimedia.org/wikipedia/en/e/ec/Indian_Institute_of_Space_Science_and_Technology_Logo.svg" alt="IIST" className="h-[50px] w-auto object-contain" />
          <div className="h-[20px] w-[1px] bg-[var(--rule-bright)] opacity-50 mx-1"></div>
          <img src="https://media.licdn.com/dms/image/v2/D5603AQEIgCfyJRaDQQ/profile-displayphoto-scale_400_400/B56Z4RtIGIH8Ag-/0/1778413504054?e=1781740800&v=beta&t=Lwo8KFCM8mjhEXzHqzkRINunM6TN_cg-YRK7qdJAB2M" alt="C" className="h-[50px] w-auto object-contain" />
          <span className="hidden sm:inline">Conscientia 2026</span>
        </div>
        <ul className="hidden md:flex gap-8 list-none">
          <li><a href="#institution" className="font-[var(--ff-mono)] text-[0.58rem] text-[var(--muted)] hover:text-[var(--gold)] transition-colors duration-250 tracking-[0.12em] uppercase">Institute</a></li>
          <li><a href="#stats" className="font-[var(--ff-mono)] text-[0.58rem] text-[var(--muted)] hover:text-[var(--gold)] transition-colors duration-250 tracking-[0.12em] uppercase">Numbers</a></li>
          <li><a href="#why" className="font-[var(--ff-mono)] text-[0.58rem] text-[var(--muted)] hover:text-[var(--gold)] transition-colors duration-250 tracking-[0.12em] uppercase">Opportunity</a></li>
          <li><a href="#tiers" className="font-[var(--ff-mono)] text-[0.58rem] text-[var(--muted)] hover:text-[var(--gold)] transition-colors duration-250 tracking-[0.12em] uppercase">Tiers</a></li>
          <li><a href="#contact" className="font-[var(--ff-mono)] text-[0.58rem] text-[var(--muted)] hover:text-[var(--gold)] transition-colors duration-250 tracking-[0.12em] uppercase">Contact</a></li>
        </ul>
        <a href="mailto:financeteam.conscientia@gmail.com" className="font-[var(--ff-mono)] text-[0.55rem] text-[var(--bg)] bg-[var(--gold)] px-4 py-1.5 tracking-[0.12em] uppercase transition-opacity duration-200 hover:opacity-80" style={{ color: '#060a10' }}>Get in Touch</a>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 min-h-screen flex flex-col justify-end pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_30%,rgba(200,168,75,0.06)_0%,transparent_70%),radial-gradient(ellipse_40%_60%_at_20%_80%,rgba(42,63,107,0.15)_0%,transparent_60%)]"></div>
        <div className="absolute rounded-full border border-[rgba(200,168,75,0.06)] w-[900px] h-[900px] top-[-300px] right-[-200px]" style={{ animation: 'spin 80s linear infinite' }}></div>
        <div className="absolute rounded-full border border-[rgba(200,168,75,0.04)] w-[600px] h-[600px] top-[-100px] right-[50px]" style={{ animation: 'spin 50s linear infinite reverse' }}></div>
        <div className="absolute top-0 bottom-0 w-[0.5px] bg-[var(--rule)] z-1 left-6 md:left-12"></div>
        
        <div className="max-w-[1080px] mx-auto px-6 md:px-12 w-full pt-14">
          <p ref={addToReveals} className="reveal font-[var(--ff-mono)] text-[0.6rem] text-[var(--muted)] tracking-[0.3em] uppercase mb-5">
            17th Edition &nbsp;·&nbsp; Indian Institute of Space Science & Technology &nbsp;·&nbsp; Dept. of Space, Govt. of India
          </p>
          <div ref={addToReveals} className="reveal reveal-delay-1 font-[var(--ff-display)] text-[clamp(4.5rem,12vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.04em] mb-6 overflow-hidden">
            <span className="block">CON</span>
            <span className="block" style={{ color: 'var(--gold)' }}>SCIEN</span>
            <span className="block">TIA</span>
          </div>
          <p ref={addToReveals} className="reveal reveal-delay-2 font-[var(--ff-display)] text-[1rem] tracking-[0.4em] text-[var(--muted)] uppercase mb-10">Finance Brochure &nbsp;—&nbsp; 2026</p>
          
          <div ref={addToReveals} className="reveal reveal-delay-3 flex flex-col md:flex-row md:items-end justify-between gap-10 mt-10">
            <div>
              <p className="font-[var(--ff-body)] text-[1rem] text-[var(--ink-dim)]Safe line-height-[1.7] max-w-[380px]">
                India's only space-dedicated technical festival. Your brand, in the orbit of the future.
              </p>
              <a href="#tiers" className="group relative inline-flex items-center gap-3 mt-8 font-[var(--ff-mono)] text-[0.65rem] tracking-[0.15em] uppercase text-[var(--gold)] border border-[var(--gold-dim)] px-7 py-3.5 overflow-hidden transition-all duration-250 hover:text-[#060a10] hover:border-[var(--gold)]">
                <span className="absolute inset-0 bg-[var(--gold)] scale-x-0 origin-left transition-transform duration-350 ease-out group-hover:scale-x-100 z-0"></span>
                <span className="relative z-10">View Sponsorship Tiers</span>
                <span className="relative z-10 transform transition-transform duration-250 group-hover:translate-x-1.5">→</span>
              </a>
            </div>
            <div ref={addToReveals} className="reveal reveal-delay-4 font-[var(--ff-mono)] text-[0.55rem] text-[var(--muted)] tracking-[0.15em] text-left md:text-right line-height-[2] uppercase">
              NAAC A++ Accredited<br />First Space Uni in Asia<br />Third in the World<br />
              <span style={{ color: 'var(--gold)' }}>8.5°N 76.9°E — Thiruvananthapuram</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2" style={{ animation: 'bobble 2s ease-in-out infinite' }}>
          <div className="w-[0.5px] h-10 bg-gradient-to-b from-[var(--gold)] to-transparent"></div>
          <div className="font-[var(--ff-mono)] text-[0.5rem] text-[var(--muted)] tracking-[0.2em] uppercase">Scroll</div>
        </div>
      </section>

      {/* Infinite Ticker Belt */}
      <div className="bg-[var(--gold)] overflow-hidden h-10 flex items-center relative z-20">
        <div className="flex white-space-nowrap" style={{ animation: 'ticker 25s linear infinite' }}>
          {Array(2).fill([
            "6,000+ Footfall", "30+ Events", "50K+ Social Reach", "10+ Workshops", "100+ Colleges", "15 States", "17th Edition", "IIST · Dept. of Space"
          ]).flat().map((text, idx) => (
            <React.Fragment key={idx}>
              <span className="font-[var(--ff-mono)] text-[0.6rem] font-medium tracking-[0.15em] text-[#060a10] px-8 uppercase">{text}</span>
              <span className="text-[#060a10] opacity-40">◆</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Institution Info Profile */}
      <section id="institution" className="relative z-10 min-h-screen flex flex-col justify-center overflow-hidden py-28">
        <div className="max-w-[1080px] mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <p ref={addToReveals} className="reveal font-[var(--ff-mono)] text-[0.6rem] text-[var(--gold)] tracking-[0.2em] uppercase mb-4">01 — Institution</p>
              <h2 ref={addToReveals} className="reveal reveal-delay-1 font-[var(--ff-display)] text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-[-0.03em] text-[var(--ink)] leading-[1.05] mb-6">India's only<br />space university.</h2>
              <div ref={addToReveals} className="reveal reveal-delay-2 w-full h-[0.5px] bg-[var(--rule)] my-6"></div>
              <p ref={addToReveals} className="reveal reveal-delay-2 font-[var(--ff-body)] text-[1.05rem] text-[var(--ink-dim)] leading-[1.75] mb-8">Established in 2007 by the Department of Space, Government of India, with full support from ISRO. IIST is India's premier institute dedicated entirely to space science and technology.</p>
              <div ref={addToReveals} className="reveal reveal-delay-3 grid grid-cols-2 gap-x-2 gap-y-4">
                {["Dr. APJ Abdul Kalam", "Dr. S. Somanath", "Dr. V. Narayanan", "Dr. BN Suresh", "Dr. S. Unnikrishnan Nair", "Dr. Dipankar Banerjee"].map((name, i) => (
                  <div key={i} className="font-[var(--ff-body)] text-[0.88rem] text-[var(--ink)] py-2 border-b border-[var(--rule)] flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[var(--gold)] flex-shrink-0"></span>{name}
                  </div>
                ))}
              </div>
            </div>
            <div ref={addToReveals} className="reveal reveal-delay-2 flex flex-col gap-3">
              {[
                { num: "2007", desc: "Founded by Dept. of Space, Govt. of India" },
                { num: "A++", desc: "NAAC Accredited — Highest Grade" },
                { num: "#1", desc: "First space-dedicated university in Asia" },
                { num: "#3", desc: "Third space university in the world" },
                { num: "17th", desc: "Edition of Conscientia — Annual Tech Fest" }
              ].map((fact, idx) => (
                <div key={idx} className="bg-[var(--surface)] border border-[var(--rule)] border-l-2 border-l-[var(--gold)] px-5 py-4 flex items-center gap-5 transform transition-all duration-250 hover:bg-[var(--surface2)] hover:translate-x-1">
                  <div className="font-[var(--ff-display)] text-[1.8rem] font-extrabold text-[var(--gold)] tracking-[-0.04em] min-width-[72px] line-height-[1]">{fact.num}</div>
                  <div className="font-[var(--ff-mono)] text-[0.62rem] text-[var(--muted)] tracking-[0.08em] uppercase leading-[1.5]">{fact.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Counter Section */}
      <section id="stats" className="relative z-10 flex flex-col justify-center overflow-hidden py-24 bg-gradient-to-b from-transparent via-[rgba(13,20,32,0.8)] to-transparent">
        <div className="max-w-[1080px] mx-auto px-6 md:px-12 w-full">
          <p ref={addToReveals} className="reveal font-[var(--ff-mono)] text-[0.6rem] text-[var(--gold)] tracking-[0.2em] uppercase mb-4">04 — By the Numbers</p>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { num: "6K+", label: "Footfall", delay: "reveal" },
              { num: "30+", label: "Events", delay: "reveal reveal-delay-1" },
              { num: "50K+", label: "Social Media Reach", delay: "reveal reveal-delay-2" },
              { num: "10+", label: "Workshops", delay: "reveal reveal-delay-3" }
            ].map((stat, i) => (
              <div key={i} ref={addToReveals} className={`${stat.delay} group relative px-8 py-12 border-t border-r border-[var(--rule)] ${i === 0 ? 'border-l' : ''} transition-colors duration-300 hover:bg-[var(--surface)]`}>
                <div className="font-[var(--ff-display)] text-[clamp(3rem,5vw,5rem)] font-extrabold text-[var(--gold)] tracking-[-0.05em] leading-[0.9] mb-3">{stat.num}</div>
                <div className="font-[var(--ff-mono)] text-[0.58rem] text-[var(--muted)] tracking-[0.15em] uppercase">{stat.label}</div>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--gold)] scale-x-0 origin-left transition-transform duration-400 ease-out group-hover:scale-x-100"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiered Sponsorship Matrices Section */}
      <section id="tiers" className="relative z-10 min-h-screen flex flex-col justify-center overflow-hidden py-28">
        <div className="max-w-[1080px] mx-auto px-6 md:px-12 w-full">
          <h2 className="font-[var(--ff-display)] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-[-0.04em] text-[var(--ink)] mb-3">Sponsorship Tiers</h2>
          
          {/* Custom Tabs Navigation Menu */}
          <div className="flex border border-[var(--rule)] my-8 overflow-x-auto">
            {['title', 'platinum', 'gold', 'silver'].map((tier) => (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
                className={`flex-1 min-w-[120px] px-5 py-3.5 font-[var(--ff-mono)] text-[0.58rem] tracking-[0.12em] uppercase transition-all duration-200 ${activeTier === tier ? 'bg-[var(--gold)] text-[#060a10] font-semibold' : 'text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--ink)]'}`}
              >
                {tier} Tier
              </button>
            ))}
          </div>

          {/* Active Sponsorship Matrices Content Panel */}
          <div className="min-h-[400px]">
            {activeTier === 'title' && (
              <div className="animate-[fadeUp_0.4s_ease]">
                <div className="flex items-baseline justify-between flex-wrap gap-4 mb-8 pb-6 border-b border-[var(--rule-bright)]">
                  <h3 className="font-[var(--ff-display)] text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-[-0.04em]">Title Sponsor</h3>
                  <div className="font-[var(--ff-mono)] text-2xl text-[var(--gold)] tracking-[-0.02em]">₹2,500,000</div>
                </div>
                <p className="font-[var(--ff-mono)] text-[0.6rem] text-[var(--muted)] tracking-[0.15em] uppercase mb-6">Exclusive Slot — 1 Available</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-[var(--surface)] border border-[var(--rule)] border-l-2 border-l-[var(--gold)] p-4 hover:bg-[var(--surface2)] transition-all">
                    <div className="font-[var(--ff-display)] text-[0.82rem] text-[var(--ink)] mb-1">Conscientia '26 Branding Omnipresence</div>
                    <div className="font-[var(--ff-body)] text-[0.78rem] italic text-[var(--muted)]">Highest priority logo sizing and strategic layout visibility matching fest title branding structures everywhere.</div>
                  </div>
                  <div className="bg-[var(--surface)] border border-[var(--rule)] border-l-2 border-l-[var(--gold)] p-4 hover:bg-[var(--surface2)] transition-all">
                    <div className="font-[var(--ff-display)] text-[0.82rem] text-[var(--ink)] mb-1">Premium Keynote Slots & Tech Spaces</div>
                    <div className="font-[var(--ff-body)] text-[0.78rem] italic text-[var(--muted)]">Exclusive access paths during main event sessions to outline corporate technical milestones.</div>
                  </div>
                </div>
              </div>
            )}

            {activeTier === 'platinum' && (
              <div className="animate-[fadeUp_0.4s_ease]">
                <div className="flex items-baseline justify-between flex-wrap gap-4 mb-8 pb-6 border-b border-[var(--rule-bright)]">
                  <h3 className="font-[var(--ff-display)] text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-[-0.04em]">Platinum Sponsor</h3>
                  <div className="font-[var(--ff-mono)] text-2xl text-[var(--gold)] tracking-[-0.02em]">₹1,500,000</div>
                </div>
                <p className="font-[var(--ff-mono)] text-[0.6rem] text-[var(--muted)] tracking-[0.15em] uppercase mb-6">Limited Slots — 2 Available</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-[var(--surface)] border border-[var(--rule)] border-l-2 border-l-[var(--gold)] p-4 hover:bg-[var(--surface2)] transition-all">
                    <div className="font-[var(--ff-display)] text-[0.82rem] text-[var(--ink)] mb-1">High-Impact Exhibition Arenas</div>
                    <div className="font-[var(--ff-body)] text-[0.78rem] italic text-[var(--muted)]">Prominent custom physical pavilions centered directly within center stage high-traffic student hubs.</div>
                  </div>
                </div>
              </div>
            )}

            {activeTier === 'gold' && (
              <div className="animate-[fadeUp_0.4s_ease]">
                <div className="flex items-baseline justify-between flex-wrap gap-4 mb-8 pb-6 border-b border-[var(--rule-bright)]">
                  <h3 className="font-[var(--ff-display)] text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-[-0.04em]">Gold Partner</h3>
                  <div className="font-[var(--ff-mono)] text-2xl text-[var(--gold)] tracking-[-0.02em]">₹800,000</div>
                </div>
                <p className="font-[var(--ff-mono)] text-[0.6rem] text-[var(--muted)] tracking-[0.15em] uppercase mb-6">Open Allocation</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-[var(--surface)] border border-[var(--rule)] border-l-2 border-l-[var(--gold)] p-4 hover:bg-[var(--surface2)] transition-all">
                    <div className="font-[var(--ff-display)] text-[0.82rem] text-[var(--ink)] mb-1">Targeted Main Stage Panels</div>
                    <div className="font-[var(--ff-body)] text-[0.78rem] italic text-[var(--muted)]">Strategic integration points across specialized multi-state digital tech brackets.</div>
                  </div>
                </div>
              </div>
            )}

            {activeTier === 'silver' && (
              <div className="animate-[fadeUp_0.4s_ease]">
                <div className="flex items-baseline justify-between flex-wrap gap-4 mb-8 pb-6 border-b border-[var(--rule-bright)]">
                  <h3 className="font-[var(--ff-display)] text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-[-0.04em]">Silver Partner</h3>
                  <div className="font-[var(--ff-mono)] text-2xl text-[var(--gold)] tracking-[-0.02em]">₹400,000</div>
                </div>
                <p className="font-[var(--ff-mono)] text-[0.6rem] text-[var(--muted)] tracking-[0.15em] uppercase mb-6">Open Brackets</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-[var(--surface)] border border-[var(--rule)] border-l-2 border-l-[var(--gold)] p-4 hover:bg-[var(--surface2)] transition-all">
                    <div className="font-[var(--ff-display)] text-[0.82rem] text-[var(--ink)] mb-1">General Cluster Banner Displays</div>
                    <div className="font-[var(--ff-body)] text-[0.78rem] italic text-[var(--muted)]">Standard layout logotype additions inside generic promotional materials.</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick-Glance Benefits Overview Matrix Table */}
          <div className="mt-14 overflow-x-auto border border-[var(--rule)]">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[var(--gold)]">
                  <th className="font-[var(--ff-mono)] text-[0.62rem] font-bold tracking-[0.1em] uppercase text-[#060a10] px-4 py-3">Sponsorship Scope Deliverables</th>
                  <th className="font-[var(--ff-mono)] text-[0.62rem] font-bold tracking-[0.1em] uppercase text-[#060a10] px-4 py-3 text-right">Title</th>
                  <th className="font-[var(--ff-mono)] text-[0.62rem] font-bold tracking-[0.1em] uppercase text-[#060a10] px-4 py-3 text-right">Plat</th>
                  <th className="font-[var(--ff-mono)] text-[0.62rem] font-bold tracking-[0.1em] uppercase text-[#060a10] px-4 py-3 text-right">Gold</th>
                  <th className="font-[var(--ff-mono)] text-[0.62rem] font-bold tracking-[0.1em] uppercase text-[#060a10] px-4 py-3 text-right">Silv</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { item: "Fest Naming Rights Integration", values: ["✓ Exclusive", "✓", "—", "—"], style: "t1" },
                  { item: "Dedicated Workshop Bracketing", values: ["✓ Multiple", "✓ Single", "✓ Single", "—"], style: "t2" },
                  { item: "Recruitment Pipeline Branding Space", values: ["✓ Custom Space", "✓ Pavilion", "✓ Booth", "✓ Desk"], style: "t3" },
                  { item: "Digital Brochure Directory Priority", values: ["Tier Max", "Tier 2", "Tier 3", "Tier 4"], style: "t4" }
                ].map((row, idx) => (
                  <tr key={idx} className={`border-b border-[var(--rule)] transition-colors duration-200 ${idx % 2 === 0 ? '' : 'bg-[var(--surface)]'} hover:bg-[rgba(200,168,75,0.05)]`}>
                    <td className={`font-[var(--ff-mono)] text-[0.65rem] px-4 py-3 border-l-2 ${row.style}`}>{row.item}</td>
                    {row.values.map((val, vIdx) => (
                      <td key={vIdx} className="font-[var(--ff-mono)] text-[0.65rem] px-4 py-3 text-right" style={vIdx === 0 ? { color: 'var(--gold)' } : {}}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Communications Matrix Interface */}
      <section id="contact" className="relative z-10 min-h-screen flex flex-col justify-center overflow-hidden py-28">
        <div className="max-w-[1080px] mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            <div>
              <p ref={addToReveals} className="label reveal">06 — Connect</p>
              <h2 ref={addToReveals} className="reveal reveal-delay-1 font-[var(--ff-display)] text-[clamp(3rem,6vw,5.5rem)] font-extrabold tracking-[-0.05em] leading-[0.88] mb-8">
                Form an<br />alliance with<br /><span style={{ color: 'var(--gold)' }}>the future.</span>
              </h2>
              <p ref={addToReveals} className="reveal reveal-delay-2 font-[var(--ff-body)] text-[1rem] text-[var(--ink-dim)] leading-[1.7] mb-8">
                Reach out to our core operations desk to structure specific contract variables or customize modular visibility scopes.
              </p>
              <div ref={addToReveals} className="reveal reveal-delay-2 group border-t border-b border-[var(--rule-bright)] py-4 mt-2 flex justify-between items-center cursor-pointer" onClick={copyEmailToClipboard}>
                <span className="font-[var(--ff-mono)] text-[0.75rem] text-[var(--gold)] tracking-[0.08em]">
                  financeteam.conscientia@gmail.com
                </span>
                <span className="font-[var(--ff-mono)] text-[0.55rem] text-[var(--muted)] uppercase group-hover:text-[var(--gold)] transition-colors">
                  [Click to Copy]
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { role: "Finance Head", name: "Ananthakshethra S", phone: "+91 88487 40051" },
                { role: "Finance Head", name: "Mukund Agrawal", phone: "+91 93028 92083" },
                { role: "Fest Coordinator", name: "M Shreyas", phone: "+91 94814 18641" }
              ].map((contact, index) => (
                <div key={index} className="bg-[var(--surface)] border border-[var(--rule)] p-6 relative overflow-hidden pl-7 transition-all duration-250 hover:bg-[var(--surface2)] hover:translate-x-1 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-[var(--gold)]">
                  <div className="font-[var(--ff-mono)] text-[0.55rem] text-[var(--gold)] tracking-[0.2em] uppercase mb-2">{contact.role}</div>
                  <div className="font-[var(--ff-display)] text-[1.1rem] font-bold text-[var(--ink)] mb-1.5">{contact.name}</div>
                  <div className="font-[var(--ff-mono)] text-[0.78rem] text-[var(--muted)] tracking-[0.05em]">{contact.phone}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Branding Area */}
      <footer className="relative z-10 px-6 md:px-12 py-16 border-t border-[var(--rule)] bg-[var(--surface)]">
        <div className="flex justify-between items-start gap-10 flex-wrap mb-10">
          <div className="font-[var(--ff-display)] text-[3rem] font-extrabold tracking-[-0.05em] text-[var(--ink)] opacity-10 leading-[1]">CONSCIENTIA '26</div>
          <div className="flex flex-col gap-2">
            <a href="#institution" className="font-[var(--ff-mono)] text-[0.62rem] text-[var(--muted)] hover:text-[var(--gold)] tracking-[0.08em] uppercase transition-colors">Institute Profile</a>
            <a href="#stats" className="font-[var(--ff-mono)] text-[0.62rem] text-[var(--muted)] hover:text-[var(--gold)] tracking-[0.08em] uppercase transition-colors">Fest Statistics</a>
            <a href="#tiers" className="font-[var(--ff-mono)] text-[0.62rem] text-[var(--muted)] hover:text-[var(--gold)] tracking-[0.08em] uppercase transition-colors">Sponsorship Tiers</a>
          </div>
        </div>
        <div className="flex justify-between items-center pt-6 border-t border-[var(--rule)] font-[var(--ff-mono)] text-[0.55rem] text-[var(--muted)] tracking-[0.1em] flex-wrap gap-2">
          <span>© 2026 CONSCIENTIA IIST. ALL RIGHTS RESERVED.</span>
          <span>DEPARTMENT OF SPACE — GOVERNMENT OF INDIA</span>
        </div>
      </footer>
    </>
  );
}