"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Satellite, Zap, Rocket, Cpu, ChevronRight } from "lucide-react";
import Nav from "./components/Navbar";

export default function Home() {
  const targetRef = useRef(null);
  const expoTransition = { duration: 1.2, ease: [0.85, 0, 0.15, 1] };

  // --- FANTASY SCROLL LOGIC ---
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const rotate1 = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const yMove = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const scaleEffect = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.9]);

  // Swapping the static archive images for a slider variable
  const xSlide = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  const workshops = [
    { title: "Propulsion Systems", icon: <Rocket size={20} />, code: "MN-AERO-01", details: "Solid & Liquid Engine Mechanics" },
    { title: "Avionics & Comm", icon: <Satellite size={20} />, code: "MN-COMM-02", details: "MAVLink Protocols & Satellite Linkage" },
    { title: "Data Intelligence", icon: <Cpu size={20} />, code: "MN-DATA-03", details: "Neural Networks for Space Data" },
    { title: "Autonomous Robotics", icon: <Zap size={20} />, code: "MN-ROBO-04", details: "ROS2 Integration & LiDAR Mapping" },
  ];

  return (
    <main className="bg-[#050505] min-h-screen text-white selection:bg-cyan-500/30 overflow-x-hidden relative">

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex flex-col items-center justify-center z-10 px-6">
        <div className="absolute inset-0 bg-black" />

        <div className="relative text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, letterSpacing: "1.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.8em" }}
            transition={{ duration: 1.5 }}
            className="font-syncopate text-cyan-500 text-[10px] md:text-xs uppercase font-bold"
          >
            Mission Protocol 2026
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%", rotateX: 50 }}
              animate={{ y: 0, rotateX: 0 }}
              transition={expoTransition}
              className="text-[14vw] md:text-[10vw] font-syncopate font-bold leading-[0.75] tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40"
            >
              CONSCIENTIA
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.8 }}
            className="text-center max-w-xl mx-auto font-light text-xs md:text-sm tracking-[0.2em] uppercase leading-loose"
          >
            Asia&apos;s premier space-tech confluence. <br /> Directed by IIST.
          </motion.p>

          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="pt-12 flex flex-col items-center gap-6"
          >
            <Link href="/events" className="group flex flex-col items-center gap-6">
              <div className="h-16 w-[1px] bg-cyan-500 group-hover:h-24 group-hover:bg-white transition-all duration-700 relative">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full blur-[2px]" />
              </div>
              <span className="font-syncopate text-[9px] tracking-[0.5em] text-white/40 group-hover:text-cyan-400 transition-colors uppercase">Enter Archives</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- WORKSHOP CARTEL --- */}
      {/* --- WORKSHOP CARTEL --- */}
      <section className="py-48 relative z-10">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff18_1px,transparent_1px),linear-gradient(to_bottom,#ffffff18_1px,transparent_1px)] bg-[size:50px_50px] blur-[1px] opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#06b6d410_1px,transparent_1px)] bg-[size:100px_100px] blur-[2px]" />
        </div>

        <div className="container mx-auto px-6 md:px-20 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-28 gap-12">
            <motion.div
              initial={{ x: -80, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }} // Ensures it stays visible once triggered
              transition={expoTransition}
              className="space-y-4"
            >
              <span className="font-mono text-[10px] text-cyan-500 tracking-[0.6em] uppercase font-black">// CLASSIFIED MODULES</span>
              <h2 className="font-syncopate text-5xl md:text-7xl tracking-tighter uppercase leading-none">Workshop<br /><span className="text-white/10 italic">Cartel</span></h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/register" className="group relative flex items-center gap-6 bg-white px-10 py-6 rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                <span className="relative z-10 font-syncopate text-[11px] tracking-widest text-black font-black">MASTER REGISTRATION</span>
                <div className="relative z-10 w-8 h-8 rounded-full bg-black flex items-center justify-center text-white group-hover:rotate-45 transition-transform duration-500">
                  <ChevronRight size={18} />
                </div>
                <div className="absolute inset-0 bg-cyan-400 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-[0.85,0,0.15,1]" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workshops.map((w, index) => (
              <motion.div
                key={index}
                // Removing initial hidden state to ensure immediate visibility on fast scrolls
                whileHover={{ y: -20, rotateZ: 1 }}
                transition={{ ...expoTransition }}
                className="group relative h-[380px] bg-[#0A0A0A]/80 border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden backdrop-blur-xl hover:border-cyan-500/50 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/40 group-hover:text-cyan-400 group-hover:rotate-[360deg] transition-all duration-1000">
                      {w.icon}
                    </div>
                    <span className="font-mono text-[9px] text-white/20 font-bold uppercase tracking-widest">{w.code}</span>
                  </div>
                  <h3 className="font-syncopate text-xl tracking-tight leading-tight uppercase group-hover:text-cyan-400 transition-colors duration-500">
                    {w.title.split(" ").map((word, i) => (<span key={i} className="block">{word}</span>))}
                  </h3>
                </div>
                <div className="relative z-10 space-y-4 pt-6 border-t border-white/10">
                  <p className="text-[9px] font-syncopate text-white/30 leading-relaxed tracking-widest uppercase">{w.details}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-syncopate tracking-[0.3em] text-cyan-500/40 group-hover:text-cyan-500 transition-colors font-bold">SECURE_LINK</span>
                    <ArrowUpRight size={16} className="text-white/20 group-hover:text-cyan-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FANTASY PHOTO GALLERY (SLIDER ADAPTATION) --- */}
      <section ref={targetRef} className="py-56 relative z-10 border-t border-white/5 bg-[#030303]/50 backdrop-blur-3xl overflow-hidden">
        <div className="container mx-auto px-6 text-center mb-32">
          <motion.span style={{ opacity: scrollYProgress }} className="font-mono text-[10px] text-cyan-500 tracking-[1em] uppercase block mb-4">Visual Archives</motion.span>
          <h2 className="font-syncopate text-4xl md:text-6xl tracking-tighter uppercase leading-none">The <span className="text-white/10 italic">Time</span> Fall</h2>
        </div>

        <div className="flex items-center">
          <motion.div style={{ x: xSlide }} className="flex gap-12 px-[10vw]">
            {["/assets/iist.png", "/assets/image1.png", "/assets/image3.png", "/assets/iist.png"].map((src, i) => (
              <motion.div
                key={i}
                style={{ rotate: i % 2 === 0 ? rotate1 : rotate2, scale: scaleEffect }}
                className="relative w-[70vw] md:w-[450px] aspect-[4/5] md:aspect-video rounded-[3rem] overflow-hidden border border-white/10 shrink-0"
              >
                <Image
                  src={src}
                  fill
                  alt={`Archive ${i}`}
                  sizes="(max-width: 768px) 70vw, 450px"
                  className="object-cover transition-all duration-700"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- INSTITUTION: THE NEXUS --- */}
      <section className="py-48 px-6 md:px-20 bg-[#070707] border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={expoTransition}
            className="flex-1 space-y-14"
          >
            <div className="space-y-6">
              <div className="w-12 h-[2px] bg-cyan-500" />
              <h2 className="font-syncopate text-4xl md:text-6xl tracking-tighter leading-tight uppercase font-black">The IIST <br /><span className="text-cyan-500">Nexus</span></h2>
            </div>
            <p className="text-white/40 font-light leading-relaxed text-lg md:text-xl max-w-xl">
              As Asia&apos;s first dedicated space university, the Indian Institute of Space Science and Technology serves as the strategic intellectual backbone for ISRO&apos;s interplanetary missions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10">
              {[{ label: "Affiliation", val: "Dept. of Space" }, { label: "Coordinates", val: "8.6253° N, 77.0374° E" }].map((stat, i) => (
                <div key={i} className="border-l-2 border-cyan-500/40 pl-8 py-3 bg-white/[0.02] rounded-r-xl">
                  <p className="text-[10px] font-syncopate text-cyan-500/50 tracking-[0.4em] mb-3 uppercase font-black">{stat.label}</p>
                  <p className="font-syncopate text-sm tracking-widest text-white">{stat.val}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex-1 w-full aspect-[4/5] relative border border-white/10 group overflow-hidden rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.5)]"
          >
            <Image
              src="/assets/iist.png"
              alt="Campus"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-30 group-hover:opacity-60 transition-all duration-1000 scale-110 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-80" />
            <div className="absolute bottom-12 left-12 right-12 flex flex-col gap-2">
              <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.5em]">Valiamala, Kerala</span>
              <span className="font-syncopate text-cyan-400 text-xs tracking-[0.3em] uppercase">Core Research Facility</span>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}