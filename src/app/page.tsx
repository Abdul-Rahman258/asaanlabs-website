"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowRight, Bot, Cpu, LineChart, Mail, Sparkles, Smartphone, Globe, MonitorSmartphone } from "lucide-react";
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
  
  // Hero text fading out
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Sphere transformations
  const sphereX = useTransform(scrollYProgress, [0, 0.4, 0.9], ["25vw", "0vw", "-35vw"]);
  const sphereScale = useTransform(scrollYProgress, [0, 0.4, 0.9], [1, 5, 0.8]);
  const sphereGlowOpacity = useTransform(scrollYProgress, [0, 0.7, 0.9], [0, 0, 1]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background relative overflow-hidden">
      <NeuralBackground />

      {/* Fixed Global Neural Sphere */}
      <motion.div 
        style={{ x: sphereX, y: "-50%" }}
        className="fixed top-1/2 left-0 w-[100vw] h-[100vh] z-0 pointer-events-none hidden lg:block"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            style={{ 
              opacity: sphereGlowOpacity,
              background: 'radial-gradient(circle, rgba(39,176,166,0.35) 0%, transparent 70%)'
            }} 
            className="w-[800px] h-[800px] rounded-full mix-blend-screen animate-pulse" 
          />
        </div>
        <div className="absolute inset-0 w-full h-full">
          <NeuralSphere scrollYProgress={scrollYProgress} />
        </div>
      </motion.div>

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
          <div className="flex items-center gap-3 relative z-10">
            <Image src="/AsaanLabsLogoOnly.svg" alt="Asaan Labs Logo" width={40} height={40} className="rounded-md" />
            <span className="text-xl font-black tracking-widest text-foreground">
              ASAAN <span className="font-light text-slate-400">LABS</span>
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300 absolute left-1/2 -translate-x-1/2 z-0">
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
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
          className="relative pt-20 pb-32 min-h-[80vh] flex items-center"
        >
          <div className="max-w-7xl mx-auto px-6 w-full">
            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-2xl">
              <motion.div variants={textReveal} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-primary mb-8 backdrop-blur-md">
                <Sparkles className="w-4 h-4" />
                <span>Next-Generation Enterprise AI</span>
              </motion.div>
              
              <motion.h1 variants={textReveal} className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 leading-[1.1] perspective-1000">
                Simplifying<br />life 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 ml-4">
                  with AI.
                </span>
              </motion.h1>
              
              <motion.p variants={textReveal} className="text-xl text-slate-400 mb-10 leading-relaxed">
                Asaan Labs engineers intelligent, end-to-end applications designed to automate workflows, accelerate analytics, and propel your business into the future.
              </motion.p>
              
              <motion.div variants={textReveal} className="flex flex-col sm:flex-row gap-4">
                <motion.a 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(39,176,166,0.8)" }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact" 
                  className="inline-flex justify-center items-center px-8 py-4 bg-primary text-white font-bold rounded-full shadow-[0_0_30px_rgba(39,176,166,0.3)] transition-colors"
                >
                  Partner with Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  href="#services" 
                  className="inline-flex justify-center items-center px-8 py-4 bg-white/5 border border-white/10 text-slate-200 font-semibold rounded-full backdrop-blur-md"
                >
                  Explore Solutions
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Services Section */}
        <section id="services" className="py-20 md:py-40 relative z-10 bg-transparent border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, margin: "-100px" }}
              className="text-center mb-12 md:mb-24 relative z-20"
            >
              <motion.h2 variants={textReveal} className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-xl">
                Intelligent <span className="text-primary">Solutions</span>
              </motion.h2>
              <motion.p variants={textReveal} className="text-slate-300 max-w-2xl mx-auto text-xl font-medium drop-shadow-lg">
                We bridge the gap between complex machine learning theory and practical, scalable enterprise architecture across all platforms.
              </motion.p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-20"
            >
              {[
                { icon: Smartphone, title: "Android AI Apps", desc: "Native, high-performance Android applications powered by on-device ML models and cloud AI APIs." },
                { icon: Globe, title: "Web AI Tools", desc: "Scalable web applications seamlessly integrating large language models, computer vision, and dynamic data streams." },
                { icon: MonitorSmartphone, title: "Desktop AI Software", desc: "Robust cross-platform desktop solutions for heavy localized AI workloads and enterprise automation." },
                { icon: Bot, title: "Agentic Workflows", desc: "Autonomous AI systems that reason, plan, and execute multi-step tasks across your existing infrastructure." },
                { icon: Cpu, title: "Custom LLM Integration", desc: "Fine-tuned language models deployed securely within your VPC to analyze proprietary data without leaks." },
                { icon: LineChart, title: "Predictive Analytics", desc: "Advanced forecasting engines utilizing structured and unstructured data to drive proactive business decisions." }
              ].map((service, i) => (
                <motion.div 
                  key={i} 
                  variants={cardVariant}
                  whileHover={{ scale: 1.05, y: -10, borderColor: "rgba(39,176,166,0.5)" }}
                  className="p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/10 transition-colors group relative overflow-hidden shadow-2xl"
                >
                  <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-[radial-gradient(circle,rgba(39,176,166,0.15)_0%,transparent_70%)] group-hover:bg-[radial-gradient(circle,rgba(39,176,166,0.3)_0%,transparent_70%)] transition-colors pointer-events-none" />
                  <div className="w-16 h-16 rounded-2xl bg-[#101a2f] border border-primary/30 text-primary flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(39,176,166,0.2)]">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-100 mb-4">{service.title}</h3>
                  <p className="text-slate-300 text-lg leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 md:py-40 relative z-10 bg-transparent">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="relative z-20"
            >
              <motion.h2 variants={textReveal} className="text-4xl md:text-5xl font-extrabold mb-8 drop-shadow-xl text-white">
                About <span className="text-primary">Us</span>
              </motion.h2>
              <motion.p variants={textReveal} className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed drop-shadow-lg text-left md:text-center">
                Asaan Labs was founded by <strong className="text-white">Abdul Rahman</strong> with a simple yet powerful mission: to make life easier by harnessing the true potential of Artificial Intelligence. 
                <br /><br />
                We believe that complex AI shouldn't be complicated to use. Our goal is to empower individuals and businesses by building seamless, intelligent solutions that automate tedious workflows, solve complex problems, and ultimately give you your time back.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="py-20 md:py-40 relative z-10 overflow-visible">
          <div className="max-w-5xl mx-auto px-6 relative">
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, margin: "-100px" }}
              className="p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-[#101a2f]/90 to-[#1a2f4c]/90 backdrop-blur-2xl border border-primary/20 text-center relative overflow-hidden shadow-[0_0_80px_rgba(16,26,47,0.9)] ml-auto lg:w-2/3"
            >
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(39,176,166,0.08)_0%,transparent_70%)] pointer-events-none" />
               <motion.h2 variants={textReveal} className="text-4xl md:text-5xl font-extrabold mb-8 text-white relative z-10">
                 Ready to automate your future?
               </motion.h2>
               <motion.p variants={textReveal} className="text-slate-300 mb-12 max-w-2xl mx-auto relative z-10 text-xl leading-relaxed">
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
                   className="w-full px-6 py-4 bg-[#0a0f1c]/50 backdrop-blur-sm border border-primary/30 rounded-2xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-slate-500 transition-all"
                 />
                 <input 
                   type="email" 
                   name="email" 
                   placeholder="Your Email" 
                   required 
                   className="w-full px-6 py-4 bg-[#0a0f1c]/50 backdrop-blur-sm border border-primary/30 rounded-2xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-slate-500 transition-all"
                 />
                 <textarea 
                   name="message" 
                   placeholder="How can we automate your workflow?" 
                   required 
                   rows={4}
                   className="w-full px-6 py-4 bg-[#0a0f1c]/50 backdrop-blur-sm border border-primary/30 rounded-2xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-slate-500 transition-all resize-none"
                 />
                 <motion.button 
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   type="submit"
                   className="w-full py-4 mt-2 bg-primary text-white font-bold text-lg rounded-2xl shadow-[0_0_20px_rgba(39,176,166,0.3)] hover:shadow-[0_0_30px_rgba(39,176,166,0.5)] transition-all flex items-center justify-center gap-2"
                 >
                   <Mail className="w-5 h-5" />
                   Send Message
                 </motion.button>
               </motion.form>
            </motion.div>
          </div>
        </section>
      </main>
      <FloatingContact />
    </div>
  );
}
