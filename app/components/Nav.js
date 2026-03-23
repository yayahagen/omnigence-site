"use client";

import Link from "next/link";
import OmnigenceLogo from "./OmnigenceLogo";
import { useEffect, useState } from "react";

const navLinkClass = "text-sm font-medium text-gray-700 transition-colors hover:text-[#2B5BC8]";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 bg-white/90 backdrop-blur-md transition-shadow ${
        isScrolled ? "shadow-[0_6px_24px_rgba(0,0,0,0.06)]" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-3 items-center py-4">
          <Link href="/" className="flex items-center gap-3 justify-self-start">
            <OmnigenceLogo size={32} decorative />
            <span className="text-sm font-semibold tracking-wide text-gray-900">
              Omnigence
            </span>
          </Link>

          <div className="hidden md:flex items-center justify-center gap-8">
            <Link href="/#product" className={navLinkClass}>
              Product
            </Link>
            <Link href="/#how" className={navLinkClass}>
              How it works
            </Link>
            <Link href="/#governance" className={navLinkClass}>
              Security
            </Link>
          </div>

          <div className="flex items-center justify-self-end">
            <span className="nav-cta-glow inline-flex">
              <Link
                href="/#contact"
                className="relative z-[1] inline-flex h-[38px] items-center justify-center rounded-full bg-[#2B5BC8] px-5 text-sm font-medium text-white transition-colors hover:bg-[#4C7BEA] transform transition-transform hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B5BC8]/50 focus-visible:ring-offset-2"
              >
                Book a Demo
              </Link>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
