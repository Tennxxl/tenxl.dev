"use client";

import Link from "next/link";
import SmallCTAButton from "./small-cta-button";
import { Atom, Webhook, Menu, X, Github } from "lucide-react";
import { useState } from "react";

import reigLogoDark from "@/../public/reig_logo_dark.png";
import wallpaper from "@/../public/websites/wallpaper.png";

import Image from "next/image";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: "center" });
            setIsMenuOpen(false);
        }
    };

    return (
        <>
            {/* Desktop Navbar */}
            <div className="fixed top-0 left-0 w-full h-12 z-50 hidden lg:flex justify-center items-center pt-8">
                <div className="max-w-5xl w-full bg-gradient-to-b from-black/40 via-black/30 to-black/20 backdrop-blur-[60px] border border-white/5 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex justify-between items-center py-2 px-3 pl-6" style={{ backdropFilter: 'blur(60px) saturate(200%)', WebkitBackdropFilter: 'blur(60px) saturate(200%)' }}>
                    <div onClick={() => {
                        const body = document.body;
                        if (body) {
                            body.scrollIntoView({ behavior: 'smooth', block: "start" });
                        }
                    }} className="cursor-pointer transition-colors">
                        <Image src={wallpaper} alt="Logo" width={40} height={40} className="rounded-full w-10 h-10 object-cover" />
                    </div>
                    <div className="flex gap-6 text-white/90 font-semibold tracking-text select-none">
                        <span className="cursor-pointer hover:text-white transition-colors" onClick={() => scrollToSection('benefits')}>Szolgáltatások</span>
                        <span className="cursor-pointer hover:text-white transition-colors" onClick={() => scrollToSection('projects')}>Munkáim</span>
                        <span className="cursor-pointer hover:text-white transition-colors" onClick={() => scrollToSection('gfx')}>Árak</span>
                        <span className="cursor-pointer hover:text-white transition-colors" onClick={() => scrollToSection('faq')}>Kapcsolat</span>
                        <span className="cursor-pointer hover:text-white transition-colors" onClick={() => scrollToSection('faq')}>Kérdések</span>
                    </div>
                    <div>
                        <SmallCTAButton />
                    </div>
                </div>
            </div>

            {/* Mobile Navbar */}
            <div className="fixed top-4 left-4 right-4 z-50 lg:hidden">
                <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-lg flex justify-between items-center py-2 px-4" style={{ backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}>
                    <div onClick={() => {
                        const body = document.body;
                        if (body) {
                            body.scrollIntoView({ behavior: 'smooth', block: "start" });
                        }
                    }} className="cursor-pointer flex-shrink-0 mr-2">
                        <Image src={wallpaper} alt="Logo" width={32} height={32} className="rounded-full w-8 h-8 object-cover" />
                    </div>
                    
                    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar flex-1 justify-center">
                        <span className="text-white/90 font-semibold text-xs sm:text-sm cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => scrollToSection('benefits')}>Szolgáltatások</span>
                        <span className="text-white/90 font-semibold text-xs sm:text-sm cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => scrollToSection('projects')}>Munkáim</span>
                        <span className="text-white/90 font-semibold text-xs sm:text-sm cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => scrollToSection('gfx')}>Árak</span>
                    </div>

                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white p-1 rounded-full hover:bg-white/10 transition-colors ml-2 flex-shrink-0"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="absolute top-16 left-0 right-0 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl flex flex-col gap-4 animate-in slide-in-from-top-5 duration-200" style={{ backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}>
                        <span className="text-white font-semibold text-center py-2 border-b border-white/10 cursor-pointer" onClick={() => scrollToSection('faq')}>Kapcsolat</span>
                        <span className="text-white font-semibold text-center py-2 cursor-pointer" onClick={() => scrollToSection('faq')}>Kérdések</span>
                        <div className="flex justify-center pt-2">
                            <SmallCTAButton />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
