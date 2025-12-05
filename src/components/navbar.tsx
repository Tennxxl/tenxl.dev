import Link from "next/link";
import SmallCTAButton from "./small-cta-button";
import { Atom, Webhook } from "lucide-react";

import reigLogoDark from "@/../public/reig_logo_dark.png";
import wallpaper from "@/../public/websites/wallpaper.png";

import Image from "next/image";

export default function Navbar() {
    return (
        <div className="fixed top-0 left-0 w-full h-12 z-50 hidden lg:flex justify-center items-center pt-8">
            <div className="max-w-5xl w-full bg-gradient-to-b from-black/40 via-black/30 to-black/20 backdrop-blur-[60px] border border-white/5 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex justify-between items-center py-2 px-3 pl-6" style={{ backdropFilter: 'blur(60px) saturate(200%)', WebkitBackdropFilter: 'blur(60px) saturate(200%)' }}>
                <div onClick={() => {
                    event?.preventDefault();
                    const body = document.body;
                    if (body) {
                        body.scrollIntoView({ behavior: 'smooth', block: "start" });
                    }
                }} className="cursor-pointer transition-colors">
                    <Image src={wallpaper} alt="Logo" width={40} height={40} className="rounded-full w-10 h-10 object-cover" />
                </div>
                <div className="flex gap-6 text-white/90 font-semibold tracking-text select-none">
                    <span className="cursor-pointer hover:text-white transition-colors" onClick={() => {
                        event?.preventDefault();
                        const benefitsSection = document.getElementById('benefits');
                        if (benefitsSection) {
                            benefitsSection.scrollIntoView({ behavior: 'smooth', block: "center" });
                        }
                    }}>Miben vagyunk mások?</span>
                    <span className="cursor-pointer hover:text-white transition-colors" onClick={() => {
                        event?.preventDefault();
                        const benefitsSection = document.getElementById('projects');
                        if (benefitsSection) {
                            benefitsSection.scrollIntoView({ behavior: 'smooth', block: "center" });
                        }
                    }}>Munkáim</span>
                    <span className="cursor-pointer hover:text-white transition-colors" onClick={() => {
                        event?.preventDefault();
                        const contactSection = document.getElementById('faq');
                        if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth', block: "center" });
                        }
                    }}>Kapcsolat</span>
                    <span className="cursor-pointer hover:text-white transition-colors" onClick={() => {
                        event?.preventDefault();
                        const benefitsSection = document.getElementById('faq');
                        if (benefitsSection) {
                            benefitsSection.scrollIntoView({ behavior: 'smooth', block: "center" });
                        }
                    }}>Kérdések</span>
                </div>
                <div>
                    <SmallCTAButton />
                </div>
            </div>
        </div>
    )
}
