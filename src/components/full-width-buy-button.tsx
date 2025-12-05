import Link from "next/link";

export default function FullWidthBuyButton() {
    return (
          <Link href="https://github.com/tennxl" target="_blank" className="select-none cursor-pointer w-full relative bg-gradient-to-b from-[#059669] to-[#047857] rounded-[47.86px] px-[6.5px] pt-[5px] pb-[6.5px] hover:p-0 shadow-slight hover:opacity-80 active:scale-[0.975] group transition-all duration-300">
              <div className="[background:radial-gradient(35%_63%_at_50%_50%,rgb(5,150,105)_0%,rgb(4,120,87)_100%)] rounded-[54.69px] tracking-text text-[18px] font-semibold text-white px-[20px] py-[6px] group-hover:px-[26.5px] group-hover:pt-[11.5px] group-hover:pb-[12.5px] transition-all duration-300">
                  Kapcsolatfelvétel
              </div>
          </Link>
    );
  }