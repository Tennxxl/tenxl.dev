import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const buttonContentVariants = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function CTAButton() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
        <Link ref={ref} href="https://github.com/tennxl" target="_blank" className="select-none cursor-pointer w-fit relative bg-gradient-to-b from-[#059669] to-[#047857] rounded-[47.86px] px-[6.5px] pt-[5px] pb-[6.5px] hover:p-0 shadow-slight hover:opacity-80 active:scale-[0.975] group transition-all duration-300 overflow-hidden will-change-transform">
            <motion.div 
              variants={buttonContentVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="[background:radial-gradient(35%_63%_at_50%_50%,rgb(5,150,105)_0%,rgb(4,120,87)_100%)] rounded-[41px] tracking-text text-[18px] font-semibold text-white px-[20px] py-[6px] group-hover:px-[26.5px] group-hover:pt-[11.5px] group-hover:pb-[12.5px] transition-all duration-300"
            >
                Nézd Meg a Munkáim
            </motion.div>
        </Link>
  );
}