import React, { useState, useEffect, useRef } from 'react';

export default function FinanceBrochure() {
  const [activeTier, setActiveTier] = useState('title');
  const [scrollY, setScrollY] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const starfieldRef = useRef(null);

  // Smooth scroll tracking for the progress bar
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute scroll progress width percentage
  const totalHeight = typeof document !== 'undefined' ? document.body.scrollHeight - window.innerHeight : 1;
  const scrollProgress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;

  // Starfield canvas effect
  useEffect(() => {
    const canvas = starfieldRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.2,
      opacity: Math.random(),
      speed: 0.005 + Math.random() * 0.01
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        star.opacity += star.speed;
        if (star.opacity > 1 || star.opacity < 0) {
          star.speed = -star.speed;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 237, 230, ${Math.max(0, star.opacity)})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('financeteam.conscientia@gmail.com');
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  return (
    <div className="bg-[#060a10] text-[#f0ede6] min-h-screen relative font-serif selection:bg-[#c8a84b]/30 selection:text-white overflow-x-hidden">
      
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#c8a84b] to-[#e8c870] z-[600] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Background Starfield Canvas */}
      <canvas ref={starfieldRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Toast Notification */}
      <div className={`fixed bottom-8 right-8 z-[1000] bg-[#c8a84b] text-[#060a10] font-mono text-[0.65rem] tracking-[0.12em] px-6 py-3 transition-all duration-400 transform ${toastVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} pointer-events-none`}>
        COPIED TO CLIPBOARD
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-[500] h-14 flex items-center justify-between px-6 md:px-12 border-b border-[#1e2a3d]/90 bg-[#060a10]/75 backdrop-blur-md">
        <div className="flex items-center gap-3 font-sans text-[0.8rem] font-bold tracking-[0.3em] text-[#c8a84b] uppercase">
          {/* IIST Logo */}
          <img 
            src="https://upload.wikimedia.org/wikipedia/en/e/ec/Indian_Institute_of_Space_Science_and_Technology_Logo.svg" 
            alt="IIST" 
            className="h-[50px] w-auto object-contain"
          />
          {/* Subtle Divider */}
          <div className="h-5 w-[1px] bg-[#c8a84b]/25 opacity-50 mx-1" />
          {/* Conscientia Logo */}
          <img 
            src="https://media.licdn.com/dms/image/v2/D5603AQEIgCfyJRaDQQ/profile-displayphoto-scale_400_400/B56Z4RtIGIH8Ag-/0/1778413504054?e=1781740800&v=beta&t=Lwo8KFCM8mjhEXzHqzkRINunM6TN_cg-YRK7qdJAB2M" 
            alt="C" 
            className="h-[50px] w-auto object-contain"
          />
          <span>Conscientia 2026</span>
        </div>
        
        <ul className="hidden md:flex gap-8 list-none">
          <li><a href="#institution" className="font-mono text-[0.58rem] text-[#6B7A94] hover:text-[#c8a84b] tracking-[0.12em] uppercase transition-colors duration-250">Institute</a></li>
          <li><a href="#stats" className="font-mono text-[0.58rem] text-[#6B7A94] hover:text-[#c8a84b] tracking-[0.12em] uppercase transition-colors duration-250">Numbers</a></li>
          <li><a href="#why" className="font-mono text-[0.58rem] text-[#6B7A94] hover:text-[#c8a84b] tracking-[0.12em] uppercase transition-colors duration-250">Opportunity</a></li>
          <li><a href="#tiers" className="font-mono text-[0.58rem] text-[#6B7A94] hover:text-[#c8a84b] tracking-[0.12em] uppercase transition-colors duration-250">Tiers</a></li>
          <li><a href="#sponsors" className="font-mono text-[0.58rem] text-[#6B7A94] hover:text-[#c8a84b] tracking-[0.12em] uppercase transition-colors duration-250">Past Sponsors</a></li>
          <li><a href="#contact" className="font-mono text-[0.58rem] text-[#6B7A94] hover:text-[#c8a84b] tracking-[0.12em] uppercase transition-colors duration-250">Contact</a></li>
        </ul>
        
        <a href="mailto:financeteam.conscientia@gmail.com" className="font-mono text-[0.55rem] text-[#060a10] bg-[#c8a84b] px-4 py-[6px] tracking-[0.12em] uppercase no-underline hover:opacity-80 transition-opacity duration-200">
          Get in Touch
        </a>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 min-h-screen flex flex-col justify-end pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_30%,rgba(200,168,75,0.06)_0%,transparent_70%),radial-gradient(ellipse_40%_60%_at_20%_80%,rgba(42,63,107,0.15)_0%,transparent_60%)] pointer-events-none" />
        
        {/* Decorative Orbit Lines */}
        <div className="absolute rounded-full border border-[#c8a84b]/6 w-[900px] h-[900px] -top-[300px] -right-[200px] animate-[spin_80s_linear_infinite] pointer-events-none" />
        <div className="absolute rounded-full border border-[#c8a84b]/4 w-[600px] h-[600px] -top-[100px] right-[50px] animate-[spin_50s_linear_reverse_infinite] pointer-events-none" />
        
        <div className="absolute top-0 bottom-0 w-[0.5px] bg-[#1e2a3d]/90 z-1 left-6 md:left-12 pointer-events-none" />
        
        <div className="max-width-[1080px] mx-auto px-6 md:px-12 w-full pt-14">
          <p className="font-mono text-[0.6rem] text-[#6B7A94] tracking-[0.3em] uppercase mb-5">
            17th Edition &nbsp;·&nbsp; Indian Institute of Space Science & Technology &nbsp;·&nbsp; Dept. of Space, Govt. of India
          </p>
          
          <div className="font-sans text-[clamp(4.5rem,12vw,9rem)] font-extrabold line-height-[0.85] tracking-[-0.04em] text-[#f0ede6] mb-6 overflow-hidden">
            <span className="block">CON</span>
            <span className="block text-[#c8a84b]">SCIEN</span>
            <span className="block">TIA</span>
          </div>
          
          <p className="font-sans text-4xl uppercase tracking-[0.4em] text-[#6B7A94] mb-10">
            Finance Brochure &nbsp;—&nbsp; 2026
          </p>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mt-10">
            <div>
              <p className="text-base text-[#f0ede6]/55 leading-relaxed max-w-[380px]">
                India's only space-dedicated technical festival. Your brand, in the orbit of the future.
              </p>
              <a href="#tiers" className="group inline-flex items-center gap-3 mt-8 font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#c8a84b] no-underline border border-[#c8a84b]/18 px-7 py-3.5 relative overflow-hidden transition-colors duration-250 hover:text-[#060a10] hover:border-[#c8a84b]">
                <span className="absolute inset-0 bg-[#c8a84b] scale-x-0 origin-left transition-transform duration-350 ease-out group-hover:scale-x-100 z-0" />
                <span className="relative z-1">View Sponsorship Tiers</span>
                <span className="relative z-1 transition-transform duration-250 group-hover:translate-x-[6px]">→</span>
              </a>
            </div>
            
            <div className="font-mono text-[0.55rem] text-[#6B7A94] tracking-[0.15em] md:text-right leading-loose uppercase">
              NAAC A++ Accredited<br />First Space Uni in Asia<br />Third in the World<br />
              <span className="text-[#c8a84b]">8.5°N 76.9°E — Thiruvananthapuram</span>
            </div>
          </div>
        </div>
        
        {/* Animated Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-[bobble_2s_ease-in-out_infinite]">
          <div className="w-[0.5px] h-10 bg-gradient-to-b from-[#c8a84b] to-transparent" />
          <div className="font-mono text-[0.5rem] text-[#6B7A94] tracking-[0.2em] uppercase">Scroll</div>
        </div>
      </section>

      {/* Infinite Ticker Bar */}
      <div className="bg-[#c8a84b] overflow-hidden h-10 flex items-center relative z-20">
        <div className="flex whitespace-nowrap animate-[ticker_25s_linear_infinite]">
          {Array.from({ length: 2 }).map((_, i) => (
            <React.Fragment key={i}>
              <span className="font-mono text-[0.6rem] font-medium tracking-[0.15em] text-[#060a10] px-8 uppercase">6,000+ Footfall</span><span className="text-[#060a10] opacity-40">◆</span>
              <span className="font-mono text-[0.6rem] font-medium tracking-[0.15em] text-[#060a10] px-8 uppercase">30+ Events</span><span className="text-[#060a10] opacity-40">◆</span>
              <span className="font-mono text-[0.6rem] font-medium tracking-[0.15em] text-[#060a10] px-8 uppercase">50K+ Social Reach</span><span className="text-[#060a10] opacity-40">◆</span>
              <span className="font-mono text-[0.6rem] font-medium tracking-[0.15em] text-[#060a10] px-8 uppercase">10+ Workshops</span><span className="text-[#060a10] opacity-40">◆</span>
              <span className="font-mono text-[0.6rem] font-medium tracking-[0.15em] text-[#060a10] px-8 uppercase">100+ Colleges</span><span className="text-[#060a10] opacity-40">◆</span>
              <span className="font-mono text-[0.6rem] font-medium tracking-[0.15em] text-[#060a10] px-8 uppercase">15 States</span><span className="text-[#060a10] opacity-40">◆</span>
              <span className="font-mono text-[0.6rem] font-medium tracking-[0.15em] text-[#060a10] px-8 uppercase">17th Edition</span><span className="text-[#060a10] opacity-40">◆</span>
              <span className="font-mono text-[0.6rem] font-medium tracking-[0.15em] text-[#060a10] px-8 uppercase">IIST · Dept. of Space</span><span className="text-[#060a10] opacity-40">◆</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Section 01 — Institution */}
      <section id="institution" className="relative z-10 py-24 md:py-[120px]">
        <div className="max-w-[1080px] mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
            <div>
              <p className="font-mono text-[0.6rem] text-[#c8a84b] tracking-[0.2em] uppercase mb-4">01 — Institution</p>
              <h2 className="font-sans text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-[-0.03em] text-[#f0ede6] leading-[1.05] mb-6">
                India's only<br />space university.
              </h2>
              <div className="w-full h-[0.5px] bg-[#1e2a3d]/90 my-6" />
              <p className="text-[1.05rem] text-[#f0ede6]/55 leading-relaxed mb-8">
                Established in 2007 by the Department of Space, Government of India, with full support from ISRO. IIST is India's premier institute dedicated entirely to space science and technology.
              </p>
              <div className="grid grid-cols-2 gap-x-2 gap-y-0 mt-6">
                {["Dr. APJ Abdul Kalam", "Dr. S. Somanath", "Dr. V. Narayanan", "Dr. BN Suresh", "Dr. S. Unnikrishnan Nair", "Dr. Dipankar Banerjee"].map((guide, idx) => (
                  <div key={idx} className="font-serif text-[0.88rem] text-[#f0ede6] py-2 border-b border-[#1e2a3d]/90 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#c8a84b] flex-shrink-0" />
                    {guide}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              {[
                { num: "2007", title: "Founded by Dept. of Space, Govt. of India" },
                { num: "A++", title: "NAAC Accredited — Highest Grade" },
                { num: "#1", title: "First space-dedicated university in Asia" },
                { num: "#3", title: "Third space university in the world" },
                { num: "17th", title: "Edition of Conscientia — Annual Tech Fest" }
              ].map((fact, idx) => (
                <div key={idx} className="bg-[#0d1420] border border-[#1e2a3d]/90 border-l-2 border-l-[#c8a84b] px-5 py-4 flex items-center gap-5 transition-all duration-250 hover:bg-[#111a2a] hover:translate-x-1">
                  <span className="font-sans text-3xl font-extrabold text-[#c8a84b] tracking-[-0.04em] min-w-[72px] (leading-none)">{fact.num}</span>
                  <span className="font-mono text-[0.62rem] text-[#6B7A94] tracking-[0.08em] uppercase leading-normal">{fact.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 04 — By the Numbers */}
      <section id="stats" className="relative z-10 py-[100px] bg-gradient-to-b from-transparent via-[#0d1420]/80 to-transparent">
        <div className="max-w-[1080px] mx-auto px-6 md:px-12 w-full">
          <p className="font-mono text-[0.6rem] text-[#c8a84b] tracking-[0.2em] uppercase mb-4">04 — By the Numbers</p>
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-[#1e2a3d]/90">
            {[
              { num: "6K+", label: "Footfall" },
              { num: "30+", label: "Events" },
              { num: "50K+", label: "Social Media Reach" },
              { num: "10+", label: "Workshops" }
            ].map((stat, idx) => (
              <div key={idx} className="p-8 border-r border-[#1e2a3d]/90 relative overflow-hidden group transition-colors duration-300 hover:bg-[#0d1420] first:border-l first:border-[#1e2a3d]/90">
                <div className="font-sans text-[clamp(3rem,5vw,5rem)] font-extrabold text-[#c8a84b] tracking-[-0.05em] line-height-[0.9] mb-3">{stat.num}</div>
                <div className="font-mono text-[0.58rem] text-[#6B7A94] tracking-[0.15em] uppercase">{stat.label}</div>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c8a84b] scale-x-0 origin-left transition-transform duration-400 ease-out group-hover:scale-x-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 02 — Legacy */}
      <section id="legacy" className="relative z-10 py-24 md:py-[120px]">
        <div className="max-w-[1080px] mx-auto px-6 md:px-12 w-full">
          <p className="font-mono text-[0.6rem] text-[#c8a84b] tracking-[0.2em] uppercase mb-4">02 — Legacy</p>
          <h2 className="font-sans text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-[#f0ede6] mb-2">India's Space Legacy</h2>
          <p className="font-serif italic text-[#6B7A94] mb-0">The shoulders on which India's space programme stands.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#1e2a3d]/90 mt-10">
            {[
              { role: "External Affairs Minister", name: "Dr. S. Jaishankar", desc: "India's Space Diplomacy — champion of international space cooperation", num: "01" },
              { role: "NASA Astronaut", name: "Sunita Williams", desc: "ISS Commander — Indian-origin pioneer of human spaceflight", num: "02" },
              { role: "India's First Astronaut", name: "Rakesh Sharma", desc: "Soyuz T-11, 1984 — first Indian citizen to travel to space", num: "03" },
              { role: "ISRO-Axiom Mission", name: "Shubhanshu Shukla", desc: "Ax-4, 2025 — India's newest face in human spaceflight", num: "04" }
            ].map((card, idx) => (
              <div key={idx} className="bg-[#060a10] p-9 relative overflow-hidden group transition-colors duration-300 hover:bg-[#0d1420]">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#c8a84b] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="font-mono text-[0.55rem] text-[#6B7A94] tracking-[0.15em] uppercase mb-2">{card.role}</div>
                <div className="font-sans text-[1.1rem] font-bold text-[#f0ede6] mb-1">{card.name}</div>
                <div className="font-serif text-[0.85rem] italic text-[#6B7A94] leading-relaxed">{card.desc}</div>
                <div className="absolute bottom-5 right-6 font-sans text-6xl font-extrabold text-[#f0ede6] opacity-5 line-height-none pointer-events-none">{card.num}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-24 md:py-[120px]">
        <div className="max-w-[1080px] mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-start">
            <div>
              <h2 className="font-sans text-[clamp(3rem,6vw,5.5rem)] font-extrabold tracking-[-0.05em] leading-[0.88] text-[#f0ede6] mb-8">
                Get in<br /><span className="text-[#c8a84b]">touch.</span>
              </h2>
              <p className="font-serif text-base text-[#f0ede6]/55 leading-relaxed mb-8">
                Let's discuss how we can position your brand prominently in front of India's next generation of space leaders.
              </p>
              <div 
                onClick={copyEmailToClipboard}
                className="font-mono text-[0.75rem] text-[#c8a84b] tracking-[0.08em] py-4 border-t border-b border-[#c8a84b]/25 mt-2 cursor-pointer hover:bg-[#c8a84b]/5 transition-colors"
              >
                financeteam.conscientia@gmail.com
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { role: "Sponsorship Lead", name: "Aaron Garfield", phone: "+91 80783 60591" },
                { role: "Sponsorship Lead", name: "Ananth S", phone: "+91 79940 37626" },
                { role: "Finance Head", name: "Nidheesh S K", phone: "+91 70125 15286" }
              ].map((contact, idx) => (
                <div key={idx} className="bg-[#0d1420] border border-[#1e2a3d]/90 p-6 relative overflow-hidden transition-all duration-250 hover:bg-[#111a2a] hover:translate-x-1 pl-7">
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#c8a84b]" />
                  <div className="font-mono text-[0.55rem] text-[#c8a84b] tracking-[0.2em] uppercase mb-2">{contact.role}</div>
                  <div className="font-sans text-[1.1rem] font-bold text-[#f0ede6] mb-[6px]">{contact.name}</div>
                  <div className="font-mono text-[0.78rem] text-[#6B7A94] tracking-[0.05em]">{contact.phone}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative z-10 bg-[#0d1420] border-t border-[#1e2a3d]/90 px-6 md:px-12 pt-16 pb-10">
        <div className="flex flex-wrap items-start justify-between gap-10 mb-10">
          <div className="font-sans text-5xl font-extrabold tracking-[-0.05em] text-[#f0ede6] opacity-8 leading-none">
            CONSCIENTIA
          </div>
          <div className="flex flex-col gap-2">
            <a href="#institution" className="font-mono text-[0.62rem] text-[#6B7A94] no-underline tracking-[0.08em] hover:text-[#c8a84b] transition-colors">Institute</a>
            <a href="#stats" className="font-mono text-[0.62rem] text-[#6B7A94] no-underline tracking-[0.08em] hover:text-[#c8a84b] transition-colors">Numbers</a>
            <a href="#why" className="font-mono text-[0.62rem] text-[#6B7A94] no-underline tracking-[0.08em] hover:text-[#c8a84b] transition-colors">Opportunity</a>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center justify-between border-t border-[#1e2a3d]/90 pt-6 font-mono text-[0.55rem] text-[#6B7A94] tracking-[0.1em] gap-2">
          <span>&copy; 2026 Conscientia IIST. All Rights Reserved.</span>
          <span>Designed with absolute cosmic precision.</span>
        </div>
      </footer>
    </div>
  );
}
