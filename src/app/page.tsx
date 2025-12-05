"use client"

import Image from "next/image";
import CTAButton from "@/components/cta-button";
import Navbar from "@/components/navbar";
import ShinyText from "@/components/ShinyText";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

import ccWebsite from "@/../public/websites/cloudclient_new_ws.png";
import mvWebsite from "@/../public/websites/minevote_ws.png";
import pizzataxiWebsite from "@/../public/websites/pizzataxi.webp";
import christmasMasolorejtek from "@/../public/websites/christmas_masolorejtek.webp";
import wallpaper from "@/../public/websites/wallpaper.png";
import zetsuImage from "@/../public/websites/zetsu.webp";
import leakImage from "@/../public/websites/leak.png";

import discordBanner from "@/../public/websites/discordbanner.png";
import loadingScreen from "@/../public/websites/loadingscreen.png";

import azurlatvanyImage from "@/../public/websites/azurlatvany.webp";
import SmallCTAButton from "@/components/small-cta-button";

import iMessageIcon from "@/../public/app_icons/IMessage_logo.svg";
import photoshopIcon from "@/../public/app_icons/photoshop.png";
import packageIcon from "@/../public/app_icons/package.png";
import FullWidthCTAButton from "@/components/full-width-cta-button";
import WhiteCTAButton from "@/components/white-cta-button";
import FullWidthBuyButton from "@/components/full-width-buy-button";
import { ChevronDown, MessageSquare, Instagram, ChevronRight, Mail, Check, X, Globe, Bot, Box } from "lucide-react";
import { useEffect, useState, ReactNode } from "react";
import Lenis from "lenis";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

type SectionProps = { children: ReactNode; className?: string; id?: string };
type MotionDivProps = { children: ReactNode; className?: string; delay?: number; style?: React.CSSProperties };
type FAQItemProps = {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
};

const Section = ({ children, className, id }: SectionProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.section>
  );
};

const MotionDiv = ({ children, className, delay = 0, style }: MotionDivProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay } },
      }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

const TiltCard = ({ children, className }: { children: ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const DelaylessMotionDiv = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

const FAQItem = ({ faq, isOpen, onToggle }: FAQItemProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl px-8 py-6 w-full cursor-pointer transition-all duration-500 ease-in-out shadow-[0px_0px_16px_3px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
      onClick={onToggle}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      style={{ backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)' }}
    >
      <div className="flex flex-row justify-between items-center">
        <span className="text-fancy">{faq.question}</span>
        <ChevronDown
          size={30}
          className={`transform transition-transform duration-500 ease-in-out ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        <p className="text-gray text-lg text-left tracking-pill [line-height:24px] font-semibold max-w-md">
          {faq.answer}
        </p>
      </div>
    </motion.div>
  );
};


export default function Home() {
  const [openFAQs, setOpenFAQs] = useState<Set<number>>(new Set());
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const toggleContactModal = () => setIsContactModalOpen(!isContactModalOpen);

  const faqData = [
    {
      question: "Milyen projekteket vállalsz?",
      answer: "Discord botokat, weboldalakat, Minecraft pluginokat és grafikai tervezéseket (AeroGFX). Nyitott vagyok minden egyedi projekt ötletre."
    },
    {
      question: "Mennyi idő alatt készül el egy projekt?",
      answer: "A projekt időtartama függ a komplexitástól. Discord botok általában 1-2 hét, weboldalak 2-4 hét, Minecraft pluginok 1-3 hét, grafikai munkák pedig 3-7 nap alatt készülnek el."
    },
    {
      question: "Hogyan lehet veled kapcsolatba lépni?",
      answer: "Discord-on, Instagram-on vagy email-ben is kereshetsz. A leggyorsabban Discord-on és Instagram-on érsz el, de email-ekre is igyekszem mihamarabb válaszolni."
    },
    {
      question: "Milyen technológiákat használsz?",
      answer: "Discord botokhoz Node.js-t, weboldalakhoz React/Next.js-t, Minecraft pluginokhoz Java-t, grafikai munkákhoz pedig Blender-t, Cinema 4D-t és Photoshop-ot."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
      orientation: 'vertical',
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])




  return (

    
    <main className="container min-h-screen mx-auto flex flex-col justify-start items-center relative">
      {/* Animated blur blobs background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-green-500/8 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-80 h-80 bg-emerald-400/6 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-green-400/6 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-64 h-64 bg-emerald-300/5 rounded-full blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      <div className="relative z-10 w-full">
      <Navbar />
      <Section className="flex flex-col gap-10 mt-40 px-4 md:px-0">
        <MotionDiv className="flex flex-col justify-center items-center gap-2">
          <motion.div variants={itemVariants} className="bg-gradient-to-b from-black/40 via-black/30 to-black/20 backdrop-blur-[60px] border border-white/5 w-fit tracking-pill font-bold flex justify-center items-center px-4 py-1 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]" style={{ backdropFilter: 'blur(60px) saturate(200%)', WebkitBackdropFilter: 'blur(60px) saturate(200%)' }}><div className="w-4 h-4 rounded-full [background:radial-gradient(35%_63%_at_50%_50%,rgb(16,185,129)_0%,rgb(5,150,105)_100%)] inline-block mr-2 animate-pulse duration-1000"></div><span className="text-sm md:text-[18px] text-white">Available for work</span></motion.div>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-[-0.04em] text-fancy max-w-2xl text-center [line-height:1.1em]">
            Tennxl
          </motion.h1>
          <motion.h2 variants={itemVariants} className="mt-4 mb-6 text-base md:text-[18px] [line-height:27px] font-semibold tracking-text text-gray-300 max-w-2xl text-center">
            Világszintű design, ami meggyőz és forgalmat növel, amikor számít.
          </motion.h2>
          <CTAButton />
        </MotionDiv>
        <div className="flex flex-col md:flex-row justify-center items-center -mt-12 gap-8 md:gap-16">
          <MotionDiv className="w-full md:w-[25%] flex flex-col justify-center items-center gap-4 scale-[0.8]" delay={0.1}>
            <TiltCard className="w-full relative group">
              <div style={{ transform: "translateZ(50px)" }} className="top-0 left-0 w-[50%] md:w-full min-h-54 relative">
                <Image src={christmasMasolorejtek} alt="CloudClient" className="absolute bottom-0 left-10 w-48 aspect-video object-cover z-10 rotate-[7deg] rounded-2xl border-4 border-white shadow-slight transition-transform duration-500 group-hover:scale-110" />
                <Image src={pizzataxiWebsite} alt="PizzaTaxi" className="absolute bottom-0 right-10 w-48 aspect-video object-cover rotate-[-7deg] rounded-2xl border-4 border-white -translate-y-10 shadow-slight transition-transform duration-500 group-hover:scale-110" />
            </div>
            </TiltCard>
            <h3 className="text-3xl md:text-5xl text-fancy font-bold tracking-subtitle pr-1 mt-4 pb-2 relative z-20">Weboldalak</h3>
          </MotionDiv>
          
          <MotionDiv className="w-full md:w-[25%] flex flex-col justify-center items-center gap-4 scale-[0.8]" delay={0.2}>
            <TiltCard className="w-full relative group">
              <div style={{ transform: "translateZ(50px)" }} className="top-0 left-0 w-[50%] md:w-full min-h-54 relative">
                <Image src={zetsuImage} alt="Discord Bot" className="absolute bottom-0 left-10 w-48 aspect-video object-cover rotate-[-7deg] rounded-2xl border-4 border-white shadow-slight transition-transform duration-500 group-hover:scale-110" />
                <Image src={azurlatvanyImage} alt="Discord Bot" className="absolute bottom-0 right-10 w-48 aspect-video object-cover z-10 rotate-[7deg] rounded-2xl border-4 border-white -translate-y-10 shadow-slight transition-transform duration-500 group-hover:scale-110" />
            </div>
            </TiltCard>
            <h3 className="text-3xl md:text-5xl text-fancy font-bold tracking-subtitle pr-1 pb-2 mt-4 relative z-20">Programozás</h3>
          </MotionDiv>

          <MotionDiv className="w-full md:w-[25%] flex flex-col justify-center items-center gap-4 scale-[0.8]" delay={0.3}>
            <TiltCard className="w-full relative group">
              <div style={{ transform: "translateZ(50px)" }} className="top-0 left-0 w-[50%] md:w-full min-h-54 relative">
                <Image src={discordBanner} alt="Grafika" className="absolute bottom-0 left-10 w-48 aspect-video object-cover z-10 md:rotate-[-17deg] rotate-[27deg] rounded-2xl border-4 border-white -translate-y-10 shadow-slight transition-transform duration-500 group-hover:scale-110" />
                <Image src={loadingScreen} alt="Grafika" className="absolute bottom-0 right-10 w-48 aspect-video object-cover rotate-[-7deg] rounded-2xl border-4 border-white shadow-slight transition-transform duration-500 group-hover:scale-110" />
            </div>
            </TiltCard>
            <h3 className="text-3xl md:text-5xl text-fancy font-bold tracking-subtitle pr-1 mt-4 pb-2 relative z-20">Grafika</h3>
          </MotionDiv>
        </div>
      </Section>

      <Section id="benefits" className="mt-20 flex flex-col justify-center items-center gap-10 font-bold text-4xl md:text-[56px] tracking-subtitle w-full text-center [line-height:1.1em] md:[line-height:60px] px-4 md:px-0">
        <MotionDiv>
          <h2 className="mb-5 flex flex-col items-center">
            <span>
              <span className="text-emerald-400 italic font-serif" style={{ textShadow: '0 0 10px rgba(16, 185, 129, 0.4)' }}>Szolgáltatások</span>{" "}
              <ShinyText text="ami miatt" speed={20} />
            </span>
            <ShinyText text="többen válaszottak minket" speed={20} />
          </h2>
        </MotionDiv>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-10 w-full max-w-7xl mx-auto">
          <MotionDiv className="relative group overflow-hidden w-full md:w-96 h-96 p-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-[42px] shadow-[0px_0px_16px_3px_rgba(0,0,0,0.2)] flex flex-col justify-end items-start" delay={0.1} style={{ backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)' }}>
            <div className="absolute top-4 left-4 right-4 bottom-20 rounded-lg border border-white/5 p-4 overflow-hidden cursor-pointer transition-all duration-300 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] bg-[#0d1117] opacity-100" style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)' }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray text-xs ml-2 font-semibold tracking-text">bot.js</span>
              </div>
              <div className="relative h-full">
                <pre className="text-[16px] font-semibold text-gray tracking-text [line-height:1.4em] text-left overflow-x-auto" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                  <code className="block">
                    const client = new Client();{'\n'}
                    {'\n'}
                    client.on('ready', () ={'>'} {'{'}{'\n'}
                    {'  '}console.log('Bot online!');{'\n'}
                    {'}'});{'\n'}
                    {'\n'}
                    client.login(process.env.TOKEN);
                  </code>
                </pre>
              </div>
            </div>
            <h3 className="text-[32px] font-bold tracking-subtitle text-fancy text-left z-10 mt-auto">Programozás</h3>
            <p className="font-semibold text-gray text-[16px] tracking-text [line-height:1.4em] text-left z-10">Discord botok, weboldalak és Minecraft pluginok fejlesztése modern technológiákkal.</p>
          </MotionDiv>
          <MotionDiv className="relative group w-full md:w-96 h-96 px-8 py-5 overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 rounded-[42px] shadow-[0px_0px_16px_3px_rgba(0,0,0,0.2)] flex flex-col justify-start items-start" delay={0.2} style={{ backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)' }}>

            <div className="absolute -bottom-40 left-0 w-full h-full">

              <div className="absolute -bottom-28 left-0 w-full h-full flex justify-center items-end">
                <div className="absolute -left-20 bottom-0 bg-black/40 w-36 h-36 z-20 -translate-y-56 blur-lg"></div>
                <div className="absolute -right-20 bottom-0 bg-black/40 w-36 h-36 z-20 -translate-y-56 blur-lg"></div>
                <div className="w-[120%] h-[120%] border-2 border-dashed border-emerald-500 rounded-full"></div>
              </div>
              <div className="absolute -top-[6.5rem] w-full h-full flex flex-row justify-between items-center px-8 z-10">
                <Image src={iMessageIcon} alt="iMessage" className="w-15 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all duration-300" />
                <Image src={photoshopIcon} alt="Photoshop" className="w-15 -translate-y-12 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all duration-300" />
                <Image src={packageIcon} alt="Package" className="w-15 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all duration-300" />
              </div>
              <div className="absolute -top-[6.5rem] w-full h-full flex flex-row justify-between items-center px-8 opacity-50">
                <Image src={iMessageIcon} alt="iMessage" className="w-15 group-hover:animate-ping group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <Image src={photoshopIcon} alt="Photoshop" className="w-15 -translate-y-12 group-hover:animate-ping group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <Image src={packageIcon} alt="Package" className="w-15 group-hover:animate-ping group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              </div>
            </div>
            <div className="absolute -bottom-22 left-0 w-full h-full flex justify-center items-end">
              <div className="absolute w-48 h-48 rounded-full translate-y-5 z-10 p-8" style={{ background: 'radial-gradient(circle at 50% -90%, rgba(5, 150, 105, 0.3) 0px, rgba(4, 120, 87, 0) 60%) no-repeat, linear-gradient(rgba(4, 120, 87, 0.4), rgba(2, 6, 23, 0.6))' }}>
                <div className="w-full h-full bg-black/60 rounded-full shadow-[inset_0_0_30px_0px_#00000044]"></div>
              </div>
              <div className="w-40 h-40 bg-emerald-500/60 rounded-full blur-sm hidden group-hover:block group-hover:animate-ping -translate-y-5 opacity-60"></div>


            </div>
            <h3 className="text-[32px] font-bold z-10 tracking-subtitle text-fancy text-left">Grafikai Tervezés</h3>
            <p className="font-semibold text-gray text-[16px] tracking-text [line-height:1.4em] text-left">Te elképzeled, mi megvalósítjuk. Egyedi grafikai megoldások hihetetlen gyorsasággal és precizitással, hogy a projekted tökéletes legyen.</p>
          </MotionDiv>
          <MotionDiv className="w-full md:w-96 group overflow-hidden relative h-96 px-8 py-5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-[42px] shadow-[0px_0px_16px_3px_rgba(0,0,0,0.2)] flex flex-col justify-start items-start" delay={0.3} style={{ backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)' }}>
            <h3 className="text-[32px] font-bold tracking-subtitle text-fancy text-left">Rugalmas Munka</h3>
            <p className="font-semibold text-gray text-[16px] tracking-text [line-height:1.4em] text-left">Gyors válaszidő, egyedi megoldások és folyamatos kommunikáció a projektek során.</p>
            <div className="absolute bottom-0 left-0 w-full h-full">
              <Image src={discordBanner} alt="CloudClient" className="group-hover:rotate-[5deg] absolute bottom-0 left-0 aspect-video object-cove rounded-3xl -translate-x-[20%] translate-y-[0.5rem] transition-all duration-300 ease-in-out" />
              <Image src={zetsuImage} alt="MineVote" className="group-hover:rotate-[-5deg] absolute bottom-0 right-0 w-[85%] aspect-video object-cove rounded-3xl translate-x-[20%] translate-y-[2rem] border-8 border-white transition-all duration-300 ease-in-out" />
            </div>
          </MotionDiv>
        </div>
      </Section>
      <Section id="projects" className="mt-28 flex flex-col justify-center items-center gap-10 font-bold text-4xl md:text-[56px] tracking-subtitle w-full text-center [line-height:1.1em] md:[line-height:60px] px-4 md:px-0">
        <MotionDiv>
          <h2 className="mb-5 pr-1 pb-2 flex flex-col items-center">
            <span>
              <span className="text-emerald-400 italic font-serif" style={{ textShadow: '0 0 10px rgba(16, 185, 129, 0.4)' }}>Ügyfeleink</span>,{" "}
              <ShinyText text="akikkel már együtt" speed={20} />
            </span>
            <ShinyText text="dolgoztunk." speed={20} />
          </h2>
        </MotionDiv>
        <div className="flex flex-col justify-center items-center gap-10 w-full max-w-7xl mx-auto">
          <MotionDiv className="relative group overflow-hidden w-full gap-8 h-auto lg:h-96 p-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-[42px] shadow-[0px_0px_16px_3px_rgba(0,0,0,0.2)] flex flex-col lg:flex-row justify-between items-start" delay={0.1} style={{ backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)' }}>
            <Image src={christmasMasolorejtek} alt="Zetsu" className="h-auto lg:h-full w-full lg:w-1/2 bg-black/20 rounded-[24px] object-cover mb-4 lg:mb-0" />
            <div className="w-full lg:w-[50%]">
              <h3 className="text-[32px] font-bold tracking-subtitle text-fancy text-left z-10">Másolórejtek</h3>
              <div className="flex flex-row flex-wrap justify-start gap-2 items-center text-base tracking-tight text-gray">
                <div className="rounded-full bg-black/40 border border-white/10 px-3 py-1">Grafikus Design</div>
                <div className="rounded-full bg-black/40 border border-white/10 px-3 py-1">Discord Rendszer</div>
                <div className="rounded-full bg-black/40 border border-white/10 px-3 py-1">RP és RPG</div>
              </div>
              <p className="font-semibold text-gray text-[16px] tracking-text [line-height:1.4em] text-left z-10 mt-8">Zetsu Bot egy kifinomult RPG és RP Discord bot, amely teljes körű dashboardot és ingame currency rendszert tartalmaz. Modern technológiákkal készült, hogy gazdag játékélményt nyújtson a felhasználóknak. A Másolórejtek Magyarország egyik legnagyobb anime közössége, amely híres az egyedi RP és RPG rendszeréről, amit a Zetsu Bottal valósítottunk meg a szerver számára.</p>
            </div>
          </MotionDiv>
          <MotionDiv className="relative group overflow-hidden w-full gap-8 h-auto lg:h-96 p-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-[42px] shadow-[0px_0px_16px_3px_rgba(0,0,0,0.2)] flex flex-col lg:flex-row justify-between items-start" delay={0.2} style={{ backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)' }}>
            <div className="w-full lg:w-[50%] order-2 lg:order-1">
              <h3 className="text-[32px] font-bold tracking-subtitle text-fancy text-left lg:text-right z-10 pr-1">Zetsu Bot</h3>
              <div className="flex flex-row flex-wrap justify-start lg:justify-end gap-2 items-center text-base tracking-tight text-gray">
                <div className="rounded-full bg-black/40 border border-white/10 px-3 py-1">React</div>
                <div className="rounded-full bg-black/40 border border-white/10 px-3 py-1">Next.js</div>
                <div className="rounded-full bg-black/40 border border-white/10 px-3 py-1">Tailwind CSS</div>
                <div className="rounded-full bg-black/40 border border-white/10 px-3 py-1">TypeScript</div>
              </div>
              <p className="font-semibold text-gray text-[16px] tracking-text [line-height:1.4em] text-left lg:text-right z-10 mt-8">Modern, reszponzív weboldalak fejlesztése React és Next.js technológiákkal. Gyors, optimalizált és felhasználóbarát megoldások, amelyek kiválóan működnek minden eszközön.</p>
            </div>
            <Image src={zetsuImage} alt="Zetsu Bot" className="h-auto lg:h-full w-full lg:w-1/2 bg-black/20 rounded-[24px] object-cover order-1 lg:order-2 mb-4 lg:mb-0"></Image>

          </MotionDiv>
          <MotionDiv className="relative group overflow-hidden w-full gap-8 h-auto lg:h-96 p-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-[42px] shadow-[0px_0px_16px_3px_rgba(0,0,0,0.2)] flex flex-col lg:flex-row justify-between items-start" delay={0.3} style={{ backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)' }}>
            <Image src={leakImage} alt="Leak" className="h-auto lg:h-full w-full lg:w-1/2 bg-black/20 rounded-[24px] object-cover mb-4 lg:mb-0"></Image>
            <div className="w-full lg:w-[50%]">
              <h3 className="text-[32px] font-bold tracking-subtitle text-fancy text-left z-10">Aquatic SMP</h3>
              <div className="flex flex-row flex-wrap justify-start gap-2 items-center text-base tracking-tight text-gray">
                <div className="rounded-full bg-black/40 border border-white/10 px-3 py-1">Minecraft Pluginok</div>
                <div className="rounded-full bg-black/40 border border-white/10 px-3 py-1">GFX</div>
              </div>
              <p className="font-semibold text-gray text-[16px] tracking-text [line-height:1.4em] text-left z-10 mt-8">Egyedi, új generációs pluginok készültek kifejezetten a szerver számára, modern technológiákkal és innovatív megoldásokkal, hogy a lehető legjobb játékélményt nyújthassuk.</p>
            </div>
          </MotionDiv>
        </div>
      </Section>

      <Section id="gfx" className="mt-28 flex flex-col justify-center items-center gap-10 font-bold text-4xl md:text-[56px] tracking-subtitle w-full text-center [line-height:1.1em] md:[line-height:60px] px-4 md:px-0">
        <MotionDiv>
          <h2 className="mb-5 pr-1 pb-2 flex flex-col items-center">
            <ShinyText text="Weboldal ajánlatok" speed={20} />
          </h2>
        </MotionDiv>
  
        <MotionDiv className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0">
          {/* Card 1: Landing */}
          <div className="relative bg-[#0d1117] border border-emerald-500/20 rounded-3xl p-8 shadow-2xl flex flex-col hover:border-emerald-500/40 transition-all group h-full">
             <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-600 to-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-2xl shadow-lg shadow-emerald-500/20">
                <ShinyText text="Legnépszerűbb" speed={20} className="tracking-widest" />
                </div>
             <h3 className="text-white font-bold text-2xl mb-2 text-left tracking-wide"><ShinyText text="Landing Page" speed={20} /></h3>
             <div className="text-4xl font-bold text-white mb-8 text-left flex items-end gap-2">
               25.999 FT
               <span className="text-lg text-gray-500 font-normal mb-1 tracking-wide">/projekt</span>
              </div>

             <ul className="flex flex-col gap-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-gray-300 text-base text-left font-medium leading-relaxed tracking-wide">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 flex-shrink-0"><Check size={14} /></div>
                  Koncepció
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-base text-left font-medium leading-relaxed tracking-wide">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 flex-shrink-0"><Check size={14} /></div>
                  1 Főoldal (Akárcsak ez az oldal)
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-base text-left font-medium leading-relaxed tracking-wide">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 flex-shrink-0"><Check size={14} /></div>
                  14 Napos Határidő
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-base text-left font-medium leading-relaxed tracking-wide">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 flex-shrink-0"><Check size={14} /></div>
                  Animációk és Letisztult Design
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-base text-left font-medium leading-relaxed tracking-wide">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 flex-shrink-0"><Check size={14} /></div>
                  NextJS/ReactJS/VueJS Forráskód
                </li>
             </ul>
             
             <button onClick={toggleContactModal} className="w-fit self-start select-none cursor-pointer relative bg-gradient-to-b from-[#059669] to-[#047857] rounded-[47.86px] px-[6.5px] pt-[5px] pb-[6.5px] hover:p-0 shadow-slight active:scale-[0.975] group transition-all duration-300 overflow-hidden">
                <div className="w-full flex justify-center items-center [background:radial-gradient(35%_63%_at_50%_50%,rgb(5,150,105)_0%,rgb(4,120,87)_100%)] rounded-[41px] tracking-text text-[16px] font-semibold text-white px-[20px] py-[4px] group-hover:px-[26.5px] group-hover:pt-[9.5px] group-hover:pb-[10.5px] transition-all duration-300">
                  Érdeklődés
                </div>
             </button>
                  </div>

          {/* Card 2: Multipage */}
          <div className="relative bg-[#0d1117] border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col hover:border-emerald-500/20 transition-all h-full">
             <h3 className="text-white font-bold text-2xl mb-2 text-left tracking-wide"><ShinyText text="Multipage Weboldal" speed={20} /></h3>
             <div className="text-4xl font-bold text-white mb-8 text-left flex items-end gap-2">
               55.000 FT<span className="text-lg text-gray-500 font-normal mb-1 tracking-wide">/tól</span>
                </div>
             
             <ul className="flex flex-col gap-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-gray-300 text-base text-left font-medium leading-relaxed tracking-wide">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 flex-shrink-0"><Check size={14} /></div>
                  Design Koncepció
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-base text-left font-medium leading-relaxed tracking-wide">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 flex-shrink-0"><Check size={14} /></div>
                  Hosszútávú támogatás
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-base text-left font-medium leading-relaxed tracking-wide">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 flex-shrink-0"><Check size={14} /></div>
                  3 Oldal az Árban (Kezdő oldal, Rólunk oldal, Kapcsolat oldal)
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-base text-left font-medium leading-relaxed tracking-wide">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 flex-shrink-0"><Check size={14} /></div>
                  Kiváló Animációk
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-base text-left font-medium leading-relaxed tracking-wide">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 flex-shrink-0"><Check size={14} /></div>
                  Modern Design & Animációk
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-base text-left font-medium leading-relaxed tracking-wide">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 flex-shrink-0"><Check size={14} /></div>
                  ReactJS/NextJS/VueJS Forráskód
                </li>
             </ul>
             
             <button onClick={toggleContactModal} className="w-fit self-start select-none cursor-pointer relative bg-gradient-to-b from-[#059669] to-[#047857] rounded-[47.86px] px-[6.5px] pt-[5px] pb-[6.5px] hover:p-0 shadow-slight active:scale-[0.975] group transition-all duration-300 overflow-hidden">
                <div className="w-full flex justify-center items-center [background:radial-gradient(35%_63%_at_50%_50%,rgb(5,150,105)_0%,rgb(4,120,87)_100%)] rounded-[41px] tracking-text text-[16px] font-semibold text-white px-[20px] py-[4px] group-hover:px-[26.5px] group-hover:pt-[9.5px] group-hover:pb-[10.5px] transition-all duration-300">
                  Érdeklődés
                </div>
             </button>
                  </div>
        </MotionDiv>

        <MotionDiv className="mt-4 flex flex-col items-center gap-4">
          <div className="flex items-center gap-6 p-4 bg-[#0d1117] border border-white/5 rounded-2xl mb-4">
             <a
              href="mailto:tenxl@pm.me"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <Mail size={18} className="text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold tracking-text">tenxl@pm.me</span>
            </a>
                </div>

          <div className="flex items-center gap-6 p-4 bg-[#0d1117] border border-white/5 rounded-2xl">
            <a
              href="https://discord.com/users/1081084405260496937"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#5865F2] group-hover:scale-110 transition-transform">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 14.114 14.114 0 0 0-.623 1.282 18.358 18.358 0 0 0-5.46 0 14.28 14.28 0 0 0-.622-1.282.072.072 0 0 0-.079-.037A19.736 19.736 0 0 0 3.679 4.37a.069.069 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.083.083 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <span className="text-sm font-semibold tracking-text">Discord</span>
            </a>
            <div className="w-px h-4 bg-white/10"></div>
            <a
              href="https://instagram.com/baaaliiint"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <Instagram size={18} className="text-[#E1306C] group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold tracking-text">Instagram</span>
            </a>
                  </div>
        </MotionDiv>
      </Section>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={toggleContactModal}
          ></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-[#0d1117] border border-white/10 rounded-3xl p-8 shadow-2xl w-full max-w-md overflow-hidden"
          >
             <button 
              onClick={toggleContactModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
            >
              <X size={24} />
            </button>
            
            <h3 className="text-2xl font-bold text-white mb-2 text-center tracking-wide"><ShinyText text="Kapcsolat" speed={20} /></h3>
            <p className="text-gray-400 text-center mb-8 text-sm">Válassz az alábbi lehetőségek közül a kapcsolatfelvételhez</p>
            
            <div className="flex flex-col gap-4">
              <a
                href="mailto:tenxl@pm.me"
                className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-emerald-500/30 transition-all group"
              >
                <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400 font-medium">Email</span>
                  <span className="text-white font-semibold">tenxl@pm.me</span>
                </div>
              </a>

              <a
                href="https://discord.com/users/1081084405260496937"
                target="_blank"
                rel="noopener noreferrer" 
                className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-[#5865F2]/30 transition-all group"
              >
                <div className="p-3 rounded-full bg-[#5865F2]/20 text-[#5865F2] group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#5865F2]">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 14.114 14.114 0 0 0-.623 1.282 18.358 18.358 0 0 0-5.46 0 14.28 14.28 0 0 0-.622-1.282.072.072 0 0 0-.079-.037A19.736 19.736 0 0 0 3.679 4.37a.069.069 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.083.083 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400 font-medium">Discord</span>
                  <span className="text-white font-semibold">tennxl</span>
                </div>
              </a>

              <a
                href="https://instagram.com/baaaliiint"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-[#E1306C]/30 transition-all group"
              >
                <div className="p-3 rounded-full bg-[#E1306C]/20 text-[#E1306C] group-hover:scale-110 transition-transform">
                  <Instagram size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400 font-medium">Instagram</span>
                  <span className="text-white font-semibold">baaaliiint</span>
                </div>
              </a>
                </div>
            
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-xs text-gray-500">Általában 24 órán belül válaszolok minden megkeresésre.</p>
            </div>
            </motion.div>
        </div>
      )}

      <Section id="faq" className="mt-28 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start gap-10 font-bold text-4xl md:text-[56px] tracking-subtitle w-full lg:w-6xl text-center md:text-left [line-height:1.1em] md:[line-height:60px] px-4 md:px-0">
        <MotionDiv className="flex flex-col justify-center items-center lg:items-start lg:justify-start">
          <motion.h2 variants={itemVariants} className="font-semibold text-6xl md:text-[85px] [line-height:1.1em] md:[line-height:85px]">
            <ShinyText text="Kérdések?" speed={20} />
          </motion.h2>
          <motion.h2 variants={itemVariants} className="font-semibold text-6xl md:text-[85px] [line-height:1.1em] md:[line-height:85px]">
            <ShinyText text="Válaszolunk." speed={20} />
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray text-lg md:text-xl text-center lg:text-left tracking-pill [line-height:25px] font-medium mt-5 max-w-md">Van kérdésed? Lépj velem kapcsolatba Discord-on, Instagram-on vagy Email-ben.</motion.p>
        </MotionDiv>
        <div className="flex flex-col gap-4 justify-start items-center text-2xl font-medium tracking-pill w-full md:w-[50%] text-left">
          {faqData.map((faq, index) => {
            const isOpen = openFAQs.has(index);
            return (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={isOpen}
                onToggle={() => toggleFAQ(index)}
              />
            );
          })}
        </div>
      </Section>
          </div>
    </main>
  );
}
