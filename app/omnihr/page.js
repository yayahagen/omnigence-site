"use client";

import { useState, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Users, UserPlus, FileText, CheckSquare, ArrowRight } from "lucide-react";
import Nav from "../components/Nav";

const accent = {
  from: "#54B3CA",
  to: "#3FBC95",
};

// Animation variants for hero only
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2, delay: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const titleReveal = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
  },
};

const Orb = ({ className = "", style = {} }) => (
  <div
    className={`pointer-events-none absolute -z-10 rounded-full blur-3xl ${className}`}
    style={style}
  />
);

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-6 ${className}`}>{children}</div>
);

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="rounded-2xl border border-white/15 bg-white/[0.05] p-6 backdrop-blur-sm">
    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
      <Icon className="h-5 w-5 text-emerald-300" />
    </div>
    <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
    <p className="text-sm leading-relaxed text-white/65">{desc}</p>
  </div>
);

export default function OmniHRPage() {
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen">
      <Nav />
      <div className="relative overflow-hidden">
        <Orb
          className="left-[-180px] top-[-140px] h-[520px] w-[520px] opacity-70"
          style={{ background: "rgba(84,179,202,0.22)" }}
        />
        <Orb
          className="right-[-220px] top-[120px] h-[640px] w-[640px] opacity-60"
          style={{ background: "rgba(63,188,149,0.18)" }}
        />
        <div className="absolute inset-0 -z-20 bg-grid opacity-60" />

        <section className="pb-16 pt-36 md:pb-24 md:pt-40">
          <Container>
            {/* Hero - Animated */}
            <motion.div
              variants={container}
              initial="hidden"
              animate={mounted ? "show" : "hidden"}
            >
              <motion.div variants={item} className="flex items-center gap-4 mb-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <Users className="h-7 w-7 text-emerald-300" />
                </div>
                <div>
                  <div className="text-xs font-semibold tracking-wide text-white/60 uppercase">
                    HR Automation
                  </div>
                  <motion.h1
                    variants={titleReveal}
                    style={{ viewTransitionName: "page-title" }}
                    className="text-3xl font-semibold text-white md:text-4xl"
                  >
                    OmniHR
                  </motion.h1>
                </div>
              </motion.div>

              <motion.p
                variants={item}
                className="max-w-2xl text-lg text-white/70 mb-12"
              >
                Streamline onboarding, forms, approvals, and employee workflows—while keeping <span className="font-semibold text-emerald-300">humans in control</span>.
              </motion.p>
            </motion.div>

            {/* Feature Cards - Static */}
            <div className="grid gap-5 md:grid-cols-3 mb-16">
              <FeatureCard
                icon={UserPlus}
                title="Hire-to-Start"
                desc="Automate the entire onboarding journey from offer letter to first day, with smart checklists and reminders."
              />
              <FeatureCard
                icon={FileText}
                title="DocIQ"
                desc="Process employee documents, contracts, and forms with intelligent extraction and validation."
              />
              <FeatureCard
                icon={CheckSquare}
                title="Approvals Autopilot"
                desc="Route requests to the right approvers, track status, and escalate when needed—automatically."
              />
            </div>

            {/* CTA Card - Static */}
            <div className="rounded-3xl border border-white/15 bg-white/[0.05] p-8 text-center backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-emerald-300 mb-3">
                Coming Soon
              </h2>
              <p className="text-white/60 mb-6">
                OmniHR is currently in development. Request early access to be notified when it launches.
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
                }}
              >
                Request early access <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Container>
        </section>
      </div>
    </main>
  );
}
