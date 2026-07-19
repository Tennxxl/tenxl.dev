import { css } from "@/lib/css";
import NotchNav from "@/components/NotchNav";
import Effects from "@/components/Effects";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Vfx from "@/components/Vfx";
import Gfx from "@/components/Gfx";
import About from "@/components/About";
import Contact from "@/components/Contact";
import DiscordCard from "@/components/DiscordCard";
import Footer from "@/components/Footer";
import Overlays from "@/components/Overlays";

export default function Home() {
  return (
    <div id="eu-root" style={css("position:relative; --accent:#478eff; background:#fff;")}>
      <NotchNav />
      <Overlays />
      <Hero />
      <Work />
      <Vfx />
      <Gfx />
      <About />
      <Contact />
      <DiscordCard />
      <Footer />
      <div style={css("height:150px;")} />
      <Effects />
    </div>
  );
}
