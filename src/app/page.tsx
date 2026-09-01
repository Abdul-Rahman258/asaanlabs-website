"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, Variants, AnimatePresence } from "framer-motion";
import { ArrowRight, Bot, Cpu, LineChart, Mail, Sparkles, Smartphone, Globe, MonitorSmartphone, Brain, LayoutTemplate, ChevronLeft, ChevronRight, Search, Lightbulb, PenTool, Code, Rocket, RefreshCw, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import NeuralBackground from "../components/NeuralBackground";
import NeuralSphere from "../components/NeuralSphere";
import FloatingContact from "../components/FloatingContact";

// Animation Variants
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const textReveal: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: -45 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

const cardVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  const servicesList = [
    {
      title: "AI & Machine Learning",
      desc: "We build intelligent systems that solve complex problems, automate complexity, and create meaningful new possibilities.",
      icon: Brain,
    },
    {
      title: "Data Analytics",
      desc: "We turn data into understanding—uncovering patterns, behaviours, and insights that lead to better product decisions.",
      icon: LineChart,
    },
    {
      title: "Product Design",
      desc: "We turn complex technology into simple, intuitive experiences through research, psychology, design, and continuous refinement.",
      icon: LayoutTemplate,
    }
  ];

  const processSteps = [
    { num: "01", title: "Understand", desc: "We study the problem, the people, and the need behind it.", icon: Search },
    { num: "02", title: "Think", desc: "We examine the problem through multiple disciplines and perspectives.", icon: Lightbulb },
    { num: "03", title: "Design", desc: "We shape an experience around what users genuinely need.", icon: PenTool },
    { num: "04", title: "Build", desc: "We combine AI, data, and engineering to bring the product to life.", icon: Code },
    { num: "05", title: "Launch", desc: "We introduce our products to the real world and the people they were built for.", icon: Rocket },
    { num: "06", title: "Learn", desc: "We listen, analyse, and continuously improve.", icon: RefreshCw },
  ];

  const whyUsPoints = [
    { title: "User First", desc: "We begin with people and their needs—not technology." },
    { title: "Need Over Want", desc: "We focus on solving what matters, rather than adding unnecessary complexity." },
    { title: "Multidisciplinary Thinking", desc: "We look beyond a single field to understand problems from multiple perspectives." },
    { title: "AI with Purpose", desc: "We use AI where it creates meaningful value—not simply because it's possible." },
    { title: "Design & Engineering Together", desc: "Our product and technical thinking work together from the beginning." },
    { title: "Beyond Launch", desc: "We don't stop when a product ships. We learn from real users and continuously improve." },
  ];

  const nextService = () => setCurrentServiceIndex((prev) => (prev + 1) % servicesList.length);
  const prevService = () => setCurrentServiceIndex((prev) => (prev - 1 + servicesList.length) % servicesList.length);
  
  // Hero text fading out
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Sphere transformations
  const sphereX = useTransform(scrollYProgress, [0, 0.3, 0.55, 0.9, 1], ["25vw", "25vw", "0vw", "0vw", "-25vw"]);
  const sphereScale = useTransform(scrollYProgress, [0, 0.3, 0.55, 0.9, 1], [1, 1, 5, 5, 1]);
  const sphereGlowOpacity = useTransform(scrollYProgress, [0, 0.55, 0.9, 1], [0, 0, 1, 1]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background relative overflow-hidden">
      <NeuralBackground />

      {/* Fixed Global Neural Sphere */}
      <motion.div 
        style={{ x: sphereX, y: "-50%" }}
        className="fixed top-1/2 -left-[50vw] w-[200vw] h-[200vh] z-0 pointer-events-none hidden lg:block"
      >
        <motion.div 
          animate={{ y: [0, -30, 0, 30, 0] }} 
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              style={{ 
                opacity: sphereGlowOpacity,
                background: 'radial-gradient(circle, rgba(39,176,166,0.15) 0%, transparent 70%)'
              }} 
              className="w-[800px] h-[800px] rounded-full mix-blend-screen animate-pulse" 
            />
          </div>
          <div className="absolute inset-0 w-full h-full">
            <NeuralSphere scrollYProgress={scrollYProgress} />
          </div>
        </motion.div>
      </motion.div>

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[#0a0f1c]/40 backdrop-blur-2xl [mask-image:linear-gradient(to_bottom,black_50%,transparent)]" />
        <div className="max-w-7xl mx-auto px-6 h-24 pt-4 flex items-center justify-between relative pointer-events-auto">
          <a href="#" className="flex items-center gap-3 relative z-10 hover:opacity-80 transition-opacity">
            <Image src="/AsaanLabsLogoOnly.svg" alt="Asaan Labs Logo" width={40} height={40} className="rounded-md" />
            <span className="text-xl font-black tracking-widest text-foreground">
              ASAAN <span className="font-light text-slate-400">LABS</span>
            </span>
          </a>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300 absolute left-1/2 -translate-x-1/2 z-0">
            <a href="#philosophy" className="hover:text-primary transition-colors drop-shadow-md">Philosophy</a>
            <a href="#services" className="hover:text-primary transition-colors drop-shadow-md">What We Do</a>
            <a href="#process" className="hover:text-primary transition-colors drop-shadow-md">Process</a>
            <a href="#team" className="hover:text-primary transition-colors drop-shadow-md">Team</a>
            <a href="#why-us" className="hover:text-primary transition-colors drop-shadow-md">Why Us</a>
          </div>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact" 
            className="px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-full shadow-[0_0_15px_rgba(39,176,166,0.3)] hover:shadow-[0_0_25px_rgba(39,176,166,0.5)] transition-all"
          >
            Get Started
          </motion.a>
        </div>
      </motion.nav>

      <main className="flex-1 pt-32 relative z-10">
        
        {/* Hero Section */}
        <motion.section 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative pt-20 pb-16 md:pb-32 min-h-[80vh] flex items-center"
        >
          <div className="max-w-7xl mx-auto px-6 w-full">
            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-2xl">
              <motion.h1 variants={textReveal} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-[1.1] perspective-1000">
                Simplifying<br />Life 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 ml-3">
                  with AI.
                </span>
              </motion.h1>
              
              <motion.p variants={textReveal} className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed">
                We build intelligent, user-centred products designed around what people truly need. By bringing together AI & Machine Learning, Data Analytics, and Product Design, we turn complex problems into simple, useful experiences that people can understand, trust, and use.
              </motion.p>
              
              <motion.div variants={textReveal} className="flex flex-col sm:flex-row gap-4">
                <motion.a 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  href="#services" 
                  className="inline-flex justify-center items-center px-6 py-3 bg-white/5 border border-white/10 text-slate-200 font-semibold rounded-full backdrop-blur-md"
                >
                  Explore Solutions
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(39,176,166,0.8)" }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact" 
                  className="inline-flex justify-center items-center px-6 py-3 bg-primary text-white font-bold rounded-full shadow-[0_0_30px_rgba(39,176,166,0.3)] transition-colors"
                >
                  Partner with Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Philosophy Section */}
        <section id="philosophy" className="pt-16 md:pt-24 pb-8 md:pb-12 relative z-10 bg-transparent border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
              <motion.h2 variants={textReveal} className="text-3xl md:text-5xl font-extrabold mb-6 drop-shadow-xl text-white">
                Our <span className="text-primary">Philosophy</span>
              </motion.h2>
              <motion.p variants={textReveal} className="text-slate-300 text-base md:text-lg font-medium leading-relaxed drop-shadow-lg text-left md:text-center">
                We start with the need, not the want. People can want countless things. But what they want isn't always what they need.
                <br /><br />
                At Asaan Labs, we look beyond the obvious. We study the problem, understand the people experiencing it, and identify the underlying need before deciding what to build. 
                <br /><br />
                We believe great technology isn't about adding more.<br />
                <span className="font-bold text-white text-xl">It's about making life simpler.</span>
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* How We Think */}
        <section className="pt-8 md:pt-12 pb-16 md:pb-24 relative z-10 bg-transparent">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
              <motion.h2 variants={textReveal} className="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow-xl text-white">
                How We <span className="text-primary">Think</span>
              </motion.h2>
              <motion.h3 variants={textReveal} className="text-xl md:text-2xl font-semibold text-primary mb-6">
                One problem. Multiple perspectives.
              </motion.h3>
              <motion.p variants={textReveal} className="text-slate-300 text-base md:text-lg font-medium leading-relaxed drop-shadow-lg text-left md:text-center">
                Meaningful problems rarely have a single dimension. We use a multidisciplinary approach to understand them through different lenses—including technology, psychology, philosophy, ethics, morality, history, literature, and design.
                <br /><br />
                Each perspective helps us see something the others may miss. We bring these insights together to understand the user more deeply and create products that are purposeful, intuitive, and meaningful.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* What We Do - CAROUSEL */}
        <section id="services" className="py-16 md:py-24 relative z-10 bg-transparent border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: false, margin: "-100px" }} className="text-center mb-10 relative z-20">
              <motion.h2 variants={textReveal} className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-xl">
                What We <span className="text-primary">Do</span>
              </motion.h2>
              <motion.p variants={textReveal} className="text-slate-300 max-w-2xl mx-auto text-lg md:text-xl font-medium drop-shadow-lg">
                Three disciplines. One product mindset. We bring together the expertise needed to turn an idea into a product people want to use.
              </motion.p>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="relative max-w-4xl mx-auto flex items-center justify-center min-h-[300px]">
              {/* Desktop Nav Left */}
              <button onClick={prevService} className="absolute left-0 md:-left-12 z-30 p-3 rounded-full bg-[#101a2f]/80 border border-primary/30 text-primary hover:bg-primary/20 hover:text-white transition-all backdrop-blur-md hidden sm:flex shadow-[0_0_20px_rgba(39,176,166,0.15)]">
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="w-full h-full relative flex items-center justify-center overflow-visible px-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentServiceIndex}
                    initial={{ opacity: 0, x: 100, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -100, scale: 0.9 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
                    className="w-full max-w-xl p-8 md:p-12 rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(255,255,255,0.02)] text-center relative group"
                  >
                    <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-[radial-gradient(circle,rgba(39,176,166,0.15)_0%,transparent_70%)] transition-colors pointer-events-none" />
                    
                    {(() => {
                      const IconComp = servicesList[currentServiceIndex].icon;
                      return (
                        <div className="mx-auto w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl bg-[#101a2f] border border-primary/30 text-primary mb-6 shadow-[0_0_30px_rgba(39,176,166,0.2)]">
                          <IconComp className="w-8 h-8 md:w-10 md:h-10" />
                        </div>
                      );
                    })()}
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-md">
                      {servicesList[currentServiceIndex].title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed font-light text-base md:text-lg mb-4">
                      {servicesList[currentServiceIndex].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Desktop Nav Right */}
              <button onClick={nextService} className="absolute right-0 md:-right-12 z-30 p-3 rounded-full bg-[#101a2f]/80 border border-primary/30 text-primary hover:bg-primary/20 hover:text-white transition-all backdrop-blur-md hidden sm:flex shadow-[0_0_20px_rgba(39,176,166,0.15)]">
                <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>

            {/* Mobile controls & Dots */}
            <div className="flex justify-center items-center gap-4 mt-8 relative z-30">
              <button onClick={prevService} className="p-2 sm:hidden text-primary bg-[#101a2f]/80 rounded-full border border-primary/30">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-3">
                {servicesList.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentServiceIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentServiceIndex ? "bg-primary w-10 shadow-[0_0_10px_rgba(39,176,166,0.6)]" : "bg-primary/30 hover:bg-primary/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <button onClick={nextService} className="p-3 sm:hidden text-primary bg-[#101a2f]/80 rounded-full border border-primary/30">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="mt-16 text-center">
              <div className="inline-block p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(255,255,255,0.05)]">
                <h4 className="text-xl font-bold text-white mb-3">Together</h4>
                <p className="text-slate-300 text-sm md:text-base font-medium flex flex-col md:flex-row gap-2 md:gap-6 justify-center">
                  <span><span className="text-primary font-bold">AI</span> gives intelligence.</span>
                  <span className="hidden md:inline text-white/30">•</span>
                  <span><span className="text-primary font-bold">Data</span> gives understanding.</span>
                  <span className="hidden md:inline text-white/30">•</span>
                  <span><span className="text-primary font-bold">Design</span> gives clarity.</span>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-16 md:py-24 relative z-10 bg-transparent border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-extrabold mb-12 text-center text-white drop-shadow-xl">
              Our <span className="text-primary">Process</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, i) => {
                const StepIcon = step.icon;
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(255,255,255,0.02)] hover:border-primary/30 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl font-black text-white/10 group-hover:text-primary/20 transition-colors">{step.num}</span>
                      <StepIcon className="w-8 h-8 text-primary/70 group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-slate-400 text-sm">{step.desc}</p>
                  </motion.div>
                );
              })}
            </div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 text-center text-slate-300 font-medium text-lg max-w-2xl mx-auto">
              Because launching a product isn't the finish line. <br/><span className="text-primary font-bold">It's where learning begins.</span>
            </motion.p>
          </div>
        </section>

        {/* Meet the Team (Bento Layout) */}
        <section id="team" className="py-16 md:py-24 relative z-10 bg-transparent border-b border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-12">
              <motion.h2 variants={textReveal} className="text-3xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-xl">
                Meet the <span className="text-primary">Team</span>
              </motion.h2>
              <motion.p variants={textReveal} className="text-slate-300 max-w-2xl mx-auto text-lg">
                We bring together AI, machine learning, engineering, data, and product design to build technology around people.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Big Block - Abdul Rehman Baig */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-[0_8px_32px_rgba(255,255,255,0.05)] flex flex-col justify-center h-full shadow-[0_0_30px_rgba(39,176,166,0.1)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <a href="https://www.linkedin.com/in/devarbaig" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity inline-block mb-2">
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white underline decoration-primary/30 underline-offset-4 hover:decoration-primary/80 transition-colors">Abdul Rehman Baig</h3>
                </a>
                <h4 className="text-primary font-semibold text-lg mb-6">Founder & CEO · Agentic AI Developer</h4>
                <p className="text-slate-300 leading-relaxed text-base md:text-lg">
                  Leads the technical and AI direction at Asaan Labs, focusing on machine learning, deep learning, computer vision, data science, and emerging Agentic AI.
                </p>
              </motion.div>

              {/* Right Stacked Blocks */}
              <div className="grid grid-rows-2 gap-6">
                {/* Ali Hassan Mirza */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/10 rounded-3xl p-8 border border-white/10 hover:border-primary/30 transition-all flex flex-col justify-center backdrop-blur-xl shadow-[0_8px_32px_rgba(255,255,255,0.02)]"
                >
                  <a href="https://www.linkedin.com/in/ali-hassan-mirza-34b8a428b/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity inline-block mb-1">
                    <h3 className="text-2xl font-bold text-white underline decoration-primary/30 underline-offset-4 hover:decoration-primary/80 transition-colors">Ali Hassan Mirza</h3>
                  </a>
                  <h4 className="text-primary/80 font-medium text-sm mb-4">Co-founder · Product Designer</h4>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    Leads product and experience, bringing together UX research, product design, usability, user psychology, data analysis, and user-centred design.
                  </p>
                </motion.div>

                {/* Tanzeel Adnan */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/10 rounded-3xl p-8 border border-white/10 hover:border-primary/30 transition-all flex flex-col justify-center backdrop-blur-xl shadow-[0_8px_32px_rgba(255,255,255,0.02)]"
                >
                  <a href="https://www.linkedin.com/in/tanzeel-adnan-952120228/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity inline-block mb-1">
                    <h3 className="text-2xl font-bold text-white underline decoration-primary/30 underline-offset-4 hover:decoration-primary/80 transition-colors">Tanzeel Adnan</h3>
                  </a>
                  <h4 className="text-primary/80 font-medium text-sm mb-4">Co-founder · AI Engineer</h4>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    Works across AI and product engineering, building AI-powered applications, full-stack systems, APIs, and practical digital solutions.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="why-us" className="py-16 md:py-24 relative z-10 bg-transparent border-b border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-12">
              <motion.h2 variants={textReveal} className="text-3xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-xl">
                Why Choose <span className="text-primary">Us</span>
              </motion.h2>
              <motion.p variants={textReveal} className="text-slate-300 max-w-2xl mx-auto text-lg">
                We focus on building technology people actually understand, trust, and use.
              </motion.p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyUsPoints.map((point, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(255,255,255,0.02)]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <h3 className="text-lg font-bold text-white">{point.title}</h3>
                  </div>
                  <p className="text-slate-400 text-sm pl-8">{point.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="py-16 md:py-24 relative z-10 overflow-visible">
          <div className="max-w-5xl mx-auto px-6 relative">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, margin: "-100px" }}
              className="p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-[#101a2f]/90 to-[#1a2f4c]/90 backdrop-blur-2xl border border-primary/20 text-center relative overflow-hidden shadow-[0_0_80px_rgba(16,26,47,0.9)] mx-auto lg:w-2/3"
            >
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(39,176,166,0.08)_0%,transparent_70%)] pointer-events-none" />
               <motion.h2 variants={textReveal} className="text-3xl md:text-4xl font-extrabold mb-4 text-white relative z-10">
                 Ready to automate your future?
               </motion.h2>
               <motion.p variants={textReveal} className="text-slate-300 mb-8 max-w-xl mx-auto relative z-10 text-base md:text-lg leading-relaxed">
                 Let's discuss how Asaan Labs can integrate tailored AI solutions to streamline your operations and exponentially increase your capabilities.
               </motion.p>
               <motion.form 
                 variants={textReveal} 
                 action="https://api.web3forms.com/submit" 
                 method="POST"
                 className="flex flex-col gap-4 max-w-md mx-auto relative z-10 text-left"
               >
                 <input type="hidden" name="access_key" value="d208c3a4-1e3f-4f94-a662-e99c4d038e37" />
                 <input 
                   type="text" 
                   name="name" 
                   placeholder="Your Name" 
                   required 
                   className="w-full px-5 py-3 bg-[#0a0f1c]/50 backdrop-blur-sm border border-primary/30 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm md:text-base text-white placeholder:text-slate-500 transition-all"
                 />
                 <input 
                   type="email" 
                   name="email" 
                   placeholder="Your Email" 
                   required 
                   className="w-full px-5 py-3 bg-[#0a0f1c]/50 backdrop-blur-sm border border-primary/30 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm md:text-base text-white placeholder:text-slate-500 transition-all"
                 />
                 <textarea 
                   name="message" 
                   placeholder="How can we automate your workflow?" 
                   required 
                   rows={3}
                   className="w-full px-5 py-3 bg-[#0a0f1c]/50 backdrop-blur-sm border border-primary/30 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm md:text-base text-white placeholder:text-slate-500 transition-all resize-none"
                 />
                 <motion.button 
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   type="submit"
                   className="w-full py-3 mt-2 bg-primary text-white font-bold text-base rounded-xl shadow-[0_0_20px_rgba(39,176,166,0.3)] hover:shadow-[0_0_30px_rgba(39,176,166,0.5)] transition-all flex items-center justify-center gap-2"
                 >
                   <Mail className="w-4 h-4" />
                   Send Message
                 </motion.button>
               </motion.form>
            </motion.div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 pt-16 pb-8 mt-12 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0f1c]/60 backdrop-blur-2xl [mask-image:linear-gradient(to_top,black_70%,transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative pointer-events-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="flex flex-col gap-4 md:col-span-2">
              <a href="#" className="flex items-center gap-3 w-fit hover:opacity-80 transition-opacity">
                <Image src="/AsaanLabsLogoOnly.svg" alt="Asaan Labs Logo" width={32} height={32} className="rounded-md opacity-90" />
                <span className="text-lg font-black tracking-widest text-slate-200">
                  ASAAN <span className="font-light text-slate-400">LABS</span>
                </span>
              </a>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Simplifying life through intelligent technology. We build products designed around what people truly need.
              </p>
            </div>
            
            {/* Quick Links */}
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-bold mb-2">Quick Links</h4>
              <a href="#philosophy" className="text-slate-400 hover:text-primary transition-colors text-sm w-fit">Philosophy</a>
              <a href="#services" className="text-slate-400 hover:text-primary transition-colors text-sm w-fit">What We Do</a>
              <a href="#team" className="text-slate-400 hover:text-primary transition-colors text-sm w-fit">Team</a>
              <a href="#contact" className="text-slate-400 hover:text-primary transition-colors text-sm w-fit">Contact Us</a>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-bold mb-2">Connect</h4>
              <a href="mailto:contact.asaanlabs@gmail.com" className="text-slate-400 hover:text-primary transition-colors text-sm w-fit flex items-center gap-2">
                <Mail className="w-4 h-4" />
                contact.asaanlabs@gmail.com
              </a>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-xs text-center md:text-left">
              &copy; {new Date().getFullYear()} Asaan Labs. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors text-xs">Privacy Policy</a>
              <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors text-xs">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <FloatingContact />
    </div>
  );
}

