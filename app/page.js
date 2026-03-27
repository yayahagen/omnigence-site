"use client";

import OmnigenceLogo from "./components/OmnigenceLogo";
import { motion, AnimatePresence, useReducedMotion, useInView } from "motion/react";
import {
  ArrowRight,
  ArrowDown,
  FileText,
  FileSpreadsheet,
  BarChart3,
  Users,
  CheckCircle2,
  Check,
  Menu,
  X,
  RefreshCw,
  Unplug,
  AlertTriangle,
  Send,
  ScanSearch,
  UserCheck,
  KeyRound,
  ScrollText,
  Wallet,
  ShieldCheck,
  GitBranch,
  Layers,
  Clock,
  MousePointer2,
  Upload,
  Loader2,
  PenLine,
  ExternalLink,
} from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const smoothScrollTo = (targetY, duration = 1200) => {
  const startY = window.scrollY;
  const difference = targetY - startY;
  const startTime = performance.now();
  const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

  const animateScroll = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + difference * easeOutQuint(progress));
    if (progress < 1) requestAnimationFrame(animateScroll);
  };

  requestAnimationFrame(animateScroll);
};

const MultiAgentIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 6.5l4 2.3v4.4l-4 2.3-4-2.3V8.8l4-2.3z" />
    <path d="M12 1l2.5 1.4v2.8L12 6.6 9.5 5.2V2.4L12 1z" />
    <path d="M12 17.4l2.5 1.4v2.8L12 23l-2.5-1.4v-2.8l2.5-1.4z" />
    <path d="M4 9.2l2.5 1.4v2.8L4 14.8 1.5 13.4v-2.8L4 9.2z" />
    <path d="M20 9.2l2.5 1.4v2.8L20 14.8l-2.5-1.4v-2.8L20 9.2z" />
    <line x1="12" y1="6.5" x2="12" y2="5.2" />
    <line x1="12" y1="15.5" x2="12" y2="17.4" />
    <line x1="8" y1="8.8" x2="6.5" y2="10.6" />
    <line x1="16" y1="8.8" x2="17.5" y2="10.6" />
  </svg>
);

const btnBase = "inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B5BC8]/50 focus-visible:ring-offset-2";

const btnVariants = {
  primary: `${btnBase} h-[46px] rounded-full bg-[#2B5BC8] px-6 text-white hover:bg-[#4C7BEA]`,
  secondary: `${btnBase} h-[46px] rounded-full border border-gray-300 bg-transparent px-6 text-gray-800 hover:border-gray-400 hover:bg-gray-50`,
  ghost: `${btnBase} text-[#2B5BC8] hover:underline underline-offset-4 decoration-[#2B5BC8]/40`,
  navPrimary: `${btnBase} h-[38px] rounded-full bg-[#2B5BC8] px-5 text-white hover:bg-[#4C7BEA]`,
};

const Btn = ({ variant = "primary", href, children, className = "", ...props }) => {
  const cls = `${btnVariants[variant]} ${className}`;
  if (href) return <a href={href} className={cls} {...props}>{children}</a>;
  return <button className={cls} {...props}>{children}</button>;
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-[1280px] px-6 ${className}`}>{children}</div>
);

const Card = ({ icon: Icon, title, desc, tag, href }) => (
  <div className="relative flex h-full flex-col rounded-xl border border-gray-300 bg-white p-7 shadow-sm">
    {tag && (
      <div className="mb-3 text-[11px] font-medium uppercase tracking-wider text-gray-600">
        {tag}
      </div>
    )}
    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 bg-[#f0faf9]">
      <Icon className="h-5 w-5 text-[#2B5BC8]" />
    </div>
    <h3 className="mb-2 text-base font-semibold text-gray-900">{title}</h3>
    <p className="text-sm leading-relaxed text-gray-700">{desc}</p>
    {href && (
      <Btn variant="ghost" href={href} className="mt-auto pt-5 justify-start">
        Learn more <ArrowRight className="h-4 w-4" />
      </Btn>
    )}
  </div>
);

const workflowSteps = [
  {
    n: "1",
    icon: Send,
    title: "Request",
    desc: "Ask the system to perform operational work such as reconciling invoices or generating documents.",
  },
  {
    n: "2",
    icon: ScanSearch,
    title: "AI prepares the result",
    desc: "Your raw data and files are turned into a finished, formatted document—ready for you to review.",
  },
  {
    n: "3",
    icon: CheckCircle2,
    title: "Review & approve",
    desc: "Users review the result and approve critical actions.",
  },
];

/** Minimal upload UI + cursor animation → click → loading → uploaded (decorative only, not clickable) */
const UploadRequestDemo = () => {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState("idle");
  const timersRef = useRef([]);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const clearTimers = () => {
      timersRef.current.forEach((id) => clearTimeout(id));
      timersRef.current = [];
    };
    const schedule = () => {
      clearTimers();
      setPhase("idle");
      const t = (fn, ms) => {
        timersRef.current.push(
          setTimeout(() => {
            fn();
          }, ms)
        );
      };
      t(() => setPhase("move"), 650);
      t(() => setPhase("click"), 650 + 1350);
      t(() => setPhase("loading"), 650 + 1350 + 200);
      t(() => setPhase("uploaded"), 650 + 1350 + 200 + 2200);
      t(() => schedule(), 650 + 1350 + 200 + 2200 + 1800);
    };
    schedule();
    return () => {
      clearTimers();
    };
  }, [reduceMotion]);

  /* Cursor starts on the right, then moves left/down to the button (coords are translate from anchor) */
  const cursorAtButton = { x: -168, y: 102 };

  const buttonBlock = (
    <div className="relative mt-4 inline-flex min-h-[42px] min-w-[9rem] items-center justify-center">
      {phase === "click" && (
        <motion.span
          className="pointer-events-none absolute inset-0 -m-3 rounded-full bg-[#2B5BC8]/25"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1.25, opacity: 0.45 }}
          transition={{ duration: 0.35 }}
          aria-hidden
        />
      )}
      <motion.div
        className="relative flex min-h-[42px] min-w-[9rem] items-center justify-center rounded-lg bg-[#2B5BC8] px-5 py-2.5 text-[13px] font-medium text-white shadow-md shadow-[#2B5BC8]/30"
        animate={
          phase === "click"
            ? { scale: 0.93 }
            : { scale: 1 }
        }
        transition={{ duration: 0.12 }}
      >
        {phase === "loading" && (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} aria-hidden />
            <span>Uploading…</span>
          </span>
        )}
        {phase === "uploaded" && (
          <span className="flex items-center gap-2">
            <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            <span>Uploaded</span>
          </span>
        )}
        {(phase === "idle" || phase === "move" || phase === "click") && <span>Upload</span>}
      </motion.div>
    </div>
  );

  const card = (
    <div className="w-full max-w-[380px] rounded-xl border border-white/70 bg-white/90 p-5 shadow-sm backdrop-blur-sm">
      <div className="rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/60 px-4 py-7 text-center">
        <Upload className="mx-auto mb-2 h-8 w-8 text-[#2B5BC8]" strokeWidth={1.5} aria-hidden />
        <p className="text-[13px] text-gray-500">Drop a file or describe your request</p>
        {buttonBlock}
      </div>
    </div>
  );

  if (reduceMotion) {
    return (
      <div className="flex w-full cursor-default select-none items-center justify-center">{card}</div>
    );
  }

  return (
    <div className="pointer-events-none relative mx-auto flex min-h-[280px] w-full max-w-[400px] cursor-default select-none items-center justify-center">
      <div className="relative z-10 w-full">{card}</div>

      <motion.div
        className="absolute right-[6%] top-[18%] z-20 text-gray-900"
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.14))" }}
        initial={false}
        animate={
          phase === "idle"
            ? {
                x: 0,
                y: [0, -4, 0],
                scale: 1,
                opacity: 1,
              }
            : phase === "move"
              ? {
                  x: cursorAtButton.x,
                  y: cursorAtButton.y,
                  scale: 1,
                  opacity: 1,
                }
              : phase === "click"
                ? {
                    x: cursorAtButton.x,
                    y: cursorAtButton.y,
                    scale: 0.82,
                    opacity: 1,
                  }
                : phase === "loading"
                  ? {
                      x: cursorAtButton.x + 32,
                      y: cursorAtButton.y - 22,
                      scale: 0.95,
                      opacity: 0.3,
                    }
                  : {
                      x: 0,
                      y: 0,
                      scale: 1,
                      opacity: 0,
                    }
        }
        transition={
          phase === "idle"
            ? { y: { repeat: Infinity, duration: 2.2, ease: "easeInOut" } }
            : phase === "move"
              ? { duration: 1.35, ease: [0.16, 1, 0.3, 1] }
              : phase === "uploaded"
                ? { duration: 0.45, ease: "easeOut" }
                : { duration: 0.18 }
        }
      >
        <MousePointer2 className="h-7 w-7" strokeWidth={1.75} fill="currentColor" stroke="white" />
      </motion.div>
    </div>
  );
};

const howTransformEase = [0.22, 1, 0.36, 1];

/** Step 2 — raw data → transformation → finished document (one play per scroll into view, no loop) */
const DataToDocumentDemo = () => {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef(null);
  const inView = useInView(rootRef, { once: false, amount: 0.38, margin: "0px 0px -10% 0px" });
  const play = inView && !reduceMotion;
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    if (reduceMotion) return undefined;
    if (!inView) return undefined;

    // Give enough buffer so the next loop doesn't restart mid-animation.
    // Longest transition here is the right/outcome panel (delay 0.75s + duration 0.9s),
    // plus we also account for staggered inner element delays.
    const playDurationMs = 2200;
    const finalPauseMs = 1200; // ~0.8–1.5s pause on last state
    const totalMs = playDurationMs + finalPauseMs;

    let cancelled = false;
    let timeoutId = null;

    const schedule = () => {
      timeoutId = window.setTimeout(() => {
        if (cancelled) return;
        setCycleKey((k) => k + 1);
        schedule();
      }, totalMs);
    };

    schedule();

    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [inView, reduceMotion]);

  const staticThreeColumn = (
    <div
      className="mx-auto flex w-full max-w-[640px] flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-3"
      role="img"
      aria-label="Raw spreadsheet-style data on the left, a finished invoice document on the right."
    >
      <div className="flex flex-1 flex-col rounded-xl border border-gray-200/90 bg-white/85 p-4 shadow-sm backdrop-blur-sm">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">Your data</p>
        <div className="space-y-2 rounded-lg border border-gray-100 bg-gray-50/80 p-2.5">
          {[72, 48, 88, 55].map((w, i) => (
            <div key={i} className={`flex items-center gap-2 ${i % 2 ? "pl-1" : "-ml-0.5"}`}>
              <div className="h-2.5 rounded bg-gray-300/90" style={{ width: `${w}%` }} />
              <div
                className="h-2 w-10 shrink-0 rounded bg-gray-200/90"
                style={{ transform: `rotate(${i % 2 ? 2.5 : -2}deg)` }}
              />
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-end gap-1.5">
          <span className="inline-flex h-7 items-center rounded border border-gray-200 bg-white px-2 text-[10px] font-medium text-gray-500 shadow-sm rotate-[-2deg]">
            export_q1.csv
          </span>
          <span className="inline-flex h-7 items-center rounded border border-gray-200 bg-white px-2 text-[10px] font-medium text-gray-500 shadow-sm translate-y-0.5 rotate-[1.5deg]">
            Sheet2
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-center py-2 sm:w-11 sm:py-0" aria-hidden>
        <ArrowRight className="h-8 w-8 text-[#2B5BC8] rotate-90 sm:rotate-0" strokeWidth={2} />
      </div>

      <div className="flex flex-1 flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">Finished document</p>
        <p className="text-[11px] font-semibold text-gray-900">Invoice</p>
        <div className="mt-1 flex justify-between text-[10px] text-gray-500">
          <span>#INV-1042</span>
          <span>Mar 15, 2025</span>
        </div>
        <div className="mt-2 space-y-1 border-t border-gray-100 pt-2">
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-600">Professional services</span>
            <span className="tabular-nums text-gray-800">$3,200.00</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-600">Materials</span>
            <span className="tabular-nums text-gray-800">$1,080.00</span>
          </div>
        </div>
        <div className="mt-2.5 flex justify-between border-t border-gray-200 pt-2 text-[12px] font-semibold text-gray-900">
          <span>Total</span>
          <span className="tabular-nums text-[#2B5BC8]">$4,280.00</span>
        </div>
      </div>
    </div>
  );

  if (reduceMotion) {
    return (
      <div className="pointer-events-none flex w-full cursor-default select-none items-center justify-center px-1">
        {staticThreeColumn}
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className="pointer-events-none mx-auto w-full max-w-[640px] cursor-default select-none px-1"
      role="presentation"
    >
      <div
        key={cycleKey}
        className="flex w-full flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-3"
        role="img"
        aria-label="Animation: messy data moves inward and becomes a finished invoice document."
      >
        {/* Left — unstructured input */}
        <motion.div
          className="relative flex flex-1 flex-col overflow-visible rounded-xl border border-gray-200/90 bg-white/85 p-4 shadow-sm backdrop-blur-sm"
          initial={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  filter: "blur(0px)",
                }
          }
          animate={play ? { opacity: [1, 0.88], filter: ["blur(0px)", "blur(0.5px)"] } : { opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.15, delay: 0.2, ease: howTransformEase }}
        >
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">Your data</p>
          <div className="relative space-y-2 rounded-lg border border-gray-100 bg-gray-50/80 p-2.5">
            {[72, 48, 88, 55].map((w, i) => (
              <motion.div
                key={i}
                className={`flex items-center gap-2 ${i % 2 ? "pl-1" : "-ml-0.5"}`}
                initial={
                  reduceMotion
                    ? undefined
                    : {
                        x: 0,
                        opacity: 1,
                      }
                }
                animate={play ? { x: [0, 28 + i * 6], opacity: [1, 0.2] } : { x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.08 * i, ease: howTransformEase }}
              >
                <div className="h-2.5 rounded bg-gray-300/90" style={{ width: `${w}%` }} />
                <div
                  className="h-2 w-10 shrink-0 rounded bg-gray-200/90"
                  style={{ transform: `rotate(${i % 2 ? 2.5 : -2}deg)` }}
                />
              </motion.div>
            ))}
          </div>
          <div className="relative mt-3 flex flex-wrap items-end gap-1.5">
            <motion.span
              className="inline-flex h-7 items-center rounded border border-gray-200 bg-white px-2 text-[10px] font-medium text-gray-500 shadow-sm rotate-[-2deg]"
              initial={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      rotate: -2,
                    }
              }
              animate={play ? { x: [0, 36], y: [0, -4], opacity: [1, 0.15], rotate: [-2, 0] } : {}}
              transition={{ duration: 0.95, delay: 0.12, ease: howTransformEase }}
            >
              export_q1.csv
            </motion.span>
            <motion.span
              className="inline-flex h-7 items-center rounded border border-gray-200 bg-white px-2 text-[10px] font-medium text-gray-500 shadow-sm translate-y-0.5 rotate-[1.5deg]"
              initial={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      rotate: 1.5,
                    }
              }
              animate={play ? { x: [0, 32], y: [0, 2], opacity: [1, 0.12], rotate: [1.5, 0] } : {}}
              transition={{ duration: 0.95, delay: 0.22, ease: howTransformEase }}
            >
              Sheet2
            </motion.span>
          </div>
        </motion.div>

        {/* Middle — direction toward output */}
        <motion.div
          className="flex shrink-0 items-center justify-center py-2 sm:w-11 sm:py-0"
          initial={reduceMotion ? undefined : { opacity: 0.45 }}
          initial={false}
          animate={play ? { opacity: [0.45, 1] } : { opacity: 0.9 }}
          transition={{ duration: 0.5, delay: 0.35, ease: howTransformEase }}
          aria-hidden
        >
          <ArrowRight className="h-8 w-8 text-[#2B5BC8] rotate-90 sm:rotate-0" strokeWidth={2} />
        </motion.div>

        {/* Right — finished document (outcome) */}
        <motion.div
          className="flex flex-1 flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-[0_8px_28px_rgba(0,0,0,0.08)]"
          initial={false}
          initial={
            reduceMotion
              ? undefined
              : {
                  opacity: 0.25,
                  scale: 0.96,
                  y: 10,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                }
          }
          animate={
            play
              ? {
                  opacity: [0.25, 1],
                  scale: [0.96, 1],
                  y: [10, 0],
                  boxShadow: [
                    "0 4px 16px rgba(0,0,0,0.04)",
                    "0 12px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(79,143,247,0.12)",
                  ],
                }
              : { opacity: 0.35, scale: 0.97, y: 6 }
          }
          transition={{ duration: 0.9, delay: 0.75, ease: howTransformEase }}
        >
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">Finished document</p>
          <p className="text-[11px] font-semibold text-gray-900">Invoice</p>
          <div className="mt-1 flex justify-between text-[10px] text-gray-500">
            <span>#INV-1042</span>
            <span>Mar 15, 2025</span>
          </div>
          <div className="mt-2 space-y-1 border-t border-gray-100 pt-2">
            <div className="flex justify-between text-[11px]">
              <span className="text-gray-600">Professional services</span>
              <span className="tabular-nums text-gray-800">$3,200.00</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-gray-600">Materials</span>
              <span className="tabular-nums text-gray-800">$1,080.00</span>
            </div>
          </div>
          <div className="mt-2.5 flex justify-between border-t border-gray-200 pt-2 text-[12px] font-semibold text-gray-900">
            <span>Total</span>
            <span className="tabular-nums text-[#2B5BC8]">$4,280.00</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const howStepTitle = "text-[24px] md:text-[26px] lg:text-[28px] font-medium leading-[1.35] tracking-[-0.02em] text-gray-900";
const howStepBody = "mt-4 text-[16px] md:text-[17px] leading-relaxed text-gray-600 max-w-[440px]";
const howStepGap = "mt-20 md:mt-24 lg:mt-28"; /* ~80–112px between story beats */

const HowItWorks = () => {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef(null);
  const inView = useInView(rootRef, { once: false, amount: 0.34, margin: "0px 0px -10% 0px" });
  const queueShouldAnimate = inView && !reduceMotion;
  const queueHasLoaded = inView || reduceMotion;

  const [activeQueueIndex, setActiveQueueIndex] = useState(0);
  const [queueRunning, setQueueRunning] = useState(false);
  const [queueSweepKey, setQueueSweepKey] = useState(0);

  useEffect(() => {
    if (!queueShouldAnimate) {
      setQueueRunning(false);
      return undefined;
    }

    const revealStaggerS = 0.12;
    const revealDurationS = 0.52;
    const highlightStartMs = (3 - 1) * revealStaggerS * 1000 + revealDurationS * 1000 + 90;

    const stepMs = 1350; // calm, premium rhythm
    const finalPauseMs = 1100; // ~0.8–1.5s pause on last step

    const timers = [];
    let cancelled = false;

    const runCycle = () => {
      if (cancelled) return;

      setQueueRunning(true);
      setActiveQueueIndex(0);
      setQueueSweepKey((k) => k + 1);

      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          setActiveQueueIndex(1);
          setQueueSweepKey((k) => k + 1);
        }, stepMs)
      );

      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          setActiveQueueIndex(2);
          setQueueSweepKey((k) => k + 1);
        }, stepMs * 2)
      );

      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          runCycle();
        }, stepMs * 2 + finalPauseMs)
      );
    };

    timers.push(
      window.setTimeout(() => {
        if (cancelled) return;
        runCycle();
      }, highlightStartMs)
    );

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
      setQueueRunning(false);
    };
  }, [queueShouldAnimate]);

  return (
    <section
      ref={rootRef}
      id="how"
      className="relative overflow-hidden bg-white py-24 md:py-28 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6">
        <h2 className="sr-only">How it works</h2>

      {/* Step 1 — text left, visual right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="max-w-[480px] lg:py-4">
          <h3 className={howStepTitle}>Upload your request</h3>
          <p className={howStepBody}>
            Upload a document or describe what you need. We handle PDFs, images, and plain text.
          </p>
        </div>

        <div className="relative w-full max-w-[500px] lg:ml-auto lg:py-4">
          <div
            className="pointer-events-none relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl p-6 lg:min-h-[360px] lg:p-8"
            style={{ background: "linear-gradient(145deg, #e1eeff 0%, #c6dbff 38%, #aabfff 72%, #b39cff 100%)" }}
            aria-hidden="true"
          >
            <UploadRequestDemo />
          </div>
        </div>
      </div>

      {/* Step 2 — visual left, text right */}
      <div className={`${howStepGap} grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center`}>
        <div className="relative w-full max-w-[500px] order-2 lg:order-1 lg:py-4">
          <div
            className="pointer-events-none relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl p-6 lg:min-h-[360px] lg:p-8"
            style={{ background: "linear-gradient(145deg, #e1eeff 0%, #c6dbff 38%, #aabfff 72%, #b39cff 100%)" }}
            aria-hidden="true"
          >
            <DataToDocumentDemo />
          </div>
        </div>

        <div className="max-w-[480px] order-1 lg:order-2 lg:py-4">
          <h3 className={howStepTitle}>From raw data to a finished document</h3>
          <p className={howStepBody}>
            PDFs, Excel sheets, exports from Microsoft and Adobe—Omnigence turns them into one clean,
            formatted document, ready to review or send.
          </p>
        </div>
      </div>

      {/* Step 3 — text left, visual right */}
      <div className={`${howStepGap} grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center`}>
        <div className="max-w-[480px] lg:py-4">
          <h3 className={howStepTitle}>You approve what goes out</h3>
          <p className={howStepBody}>
            Review, tweak, or sign off. Nothing leaves your team until you say so.
          </p>
        </div>

        <div className="relative w-full max-w-[500px] lg:ml-auto lg:py-4">
          <div
            className="rounded-2xl p-6 min-h-[320px] lg:min-h-[360px] relative overflow-hidden flex flex-col justify-center gap-3"
            style={{ background: "linear-gradient(145deg, #e1eeff 0%, #c6dbff 38%, #aabfff 72%, #b39cff 100%)" }}
          >
            {/* Review queue cards — calm sequential approval flow */}
            <motion.div
              className={`rounded-xl bg-white/80 backdrop-blur-sm border border-white/60 shadow-sm p-4 flex items-start gap-3 relative ${
                queueRunning && activeQueueIndex === 0 ? "outline outline-1 outline-[#2B5BC8]/20" : ""
              }`}
              initial={
                queueShouldAnimate
                  ? { opacity: 0, y: 14 }
                  : queueHasLoaded
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 14 }
              }
              animate={
                queueHasLoaded
                  ? {
                      opacity: 1,
                      y: queueRunning && activeQueueIndex === 0 ? -2 : 0,
                      boxShadow:
                        queueRunning && activeQueueIndex === 0
                          ? "0 18px 52px rgba(2,6,23,0.08), 0 0 0 1px rgba(43,91,200,0.16)"
                          : "0 6px 18px rgba(2,6,23,0.05)",
                    }
                  : { opacity: 0, y: 14 }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.52,
                delay: queueShouldAnimate && !queueRunning ? 0 * 0.12 : 0,
                ease: howTransformEase,
              }}
            >
              {/* Active sweep (warning) */}
              {queueRunning && activeQueueIndex === 0 && (
                <motion.div
                  key={`sweep-${0}-${queueSweepKey}`}
                  aria-hidden
                  className="absolute -inset-0.5 rounded-xl pointer-events-none"
                  initial={{ x: "-120%", opacity: 0 }}
                  animate={{ x: "120%", opacity: 0.55 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.6, ease: howTransformEase }}
                  style={{
                    background:
                      "linear-gradient(110deg, rgba(245,158,11,0) 30%, rgba(245,158,11,0.22) 48%, rgba(245,158,11,0) 72%)",
                  }}
                />
              )}

              <motion.div
                className="relative h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0 mt-0.5"
                initial={false}
                animate={queueRunning && activeQueueIndex === 0 ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.65, ease: howTransformEase }}
              >
                {queueRunning && activeQueueIndex === 0 && (
                  <motion.div
                    aria-hidden
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: [0, 0.6, 0], scale: [0.94, 1.04, 1] }}
                    transition={{ duration: reduceMotion ? 0 : 0.75, ease: howTransformEase }}
                    style={{
                      boxShadow:
                        "0 0 0 1px rgba(245,158,11,0.25), 0 10px 26px rgba(245,158,11,0.12)",
                    }}
                  />
                )}
                <AlertTriangle className="h-4 w-4 text-amber-600" strokeWidth={1.5} />
              </motion.div>

              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-medium text-gray-800">Vendor agreement</div>
                <div className="text-[12px] text-gray-500 mt-1">Two items need a quick look</div>
              </div>
            </motion.div>

            <motion.div
              className={`rounded-xl bg-white/80 backdrop-blur-sm border border-white/60 shadow-sm p-4 flex items-start gap-3 relative ${
                queueRunning && activeQueueIndex === 1 ? "outline outline-1 outline-[#2B5BC8]/20" : ""
              }`}
              initial={
                queueShouldAnimate
                  ? { opacity: 0, y: 14 }
                  : queueHasLoaded
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 14 }
              }
              animate={
                queueHasLoaded
                  ? {
                      opacity: 1,
                      y: queueRunning && activeQueueIndex === 1 ? -2 : 0,
                      boxShadow:
                        queueRunning && activeQueueIndex === 1
                          ? "0 18px 52px rgba(2,6,23,0.08), 0 0 0 1px rgba(43,91,200,0.18)"
                          : "0 6px 18px rgba(2,6,23,0.05)",
                    }
                  : { opacity: 0, y: 14 }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.52,
                delay: queueShouldAnimate && !queueRunning ? 1 * 0.12 : 0,
                ease: howTransformEase,
              }}
            >
              {/* Active sweep (approved) */}
              {queueRunning && activeQueueIndex === 1 && (
                <motion.div
                  key={`sweep-${1}-${queueSweepKey}`}
                  aria-hidden
                  className="absolute -inset-0.5 rounded-xl pointer-events-none"
                  initial={{ x: "-120%", opacity: 0 }}
                  animate={{ x: "120%", opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.6, ease: howTransformEase }}
                  style={{
                    background:
                      "linear-gradient(110deg, rgba(43,91,200,0) 30%, rgba(43,91,200,0.25) 48%, rgba(43,91,200,0) 72%)",
                  }}
                />
              )}

              <motion.div
                className="relative h-8 w-8 rounded-lg bg-[#f0faf9] flex items-center justify-center shrink-0 mt-0.5"
                initial={false}
                animate={queueRunning && activeQueueIndex === 1 ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.65, ease: howTransformEase }}
              >
                {queueRunning && activeQueueIndex === 1 && (
                  <motion.div
                    aria-hidden
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: [0, 0.75, 0], scale: [0.92, 1.06, 1] }}
                    transition={{ duration: reduceMotion ? 0 : 0.75, ease: howTransformEase }}
                    style={{
                      boxShadow:
                        "0 0 0 1px rgba(43,91,200,0.28), 0 10px 26px rgba(43,91,200,0.16)",
                    }}
                  />
                )}
                <Check className="h-4 w-4 text-[#2B5BC8]" strokeWidth={2} />
              </motion.div>

              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-medium text-gray-800">March reconciliation</div>
                <div className="text-[12px] text-gray-500 mt-1">Matched and cleared</div>
              </div>
            </motion.div>

            <motion.div
              className={`rounded-xl bg-white/80 backdrop-blur-sm border border-white/60 shadow-sm p-4 flex items-start gap-3 relative ${
                queueRunning && activeQueueIndex === 2 ? "outline outline-1 outline-[#2B5BC8]/20" : ""
              }`}
              initial={
                queueShouldAnimate
                  ? { opacity: 0, y: 14 }
                  : queueHasLoaded
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 14 }
              }
              animate={
                queueHasLoaded
                  ? {
                      opacity: 1,
                      y: queueRunning && activeQueueIndex === 2 ? -2 : 0,
                      boxShadow:
                        queueRunning && activeQueueIndex === 2
                          ? "0 18px 52px rgba(2,6,23,0.08), 0 0 0 1px rgba(43,91,200,0.16)"
                          : "0 6px 18px rgba(2,6,23,0.05)",
                    }
                  : { opacity: 0, y: 14 }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.52,
                delay: queueShouldAnimate && !queueRunning ? 2 * 0.12 : 0,
                ease: howTransformEase,
              }}
            >
              {/* Active sweep (warning) */}
              {queueRunning && activeQueueIndex === 2 && (
                <motion.div
                  key={`sweep-${2}-${queueSweepKey}`}
                  aria-hidden
                  className="absolute -inset-0.5 rounded-xl pointer-events-none"
                  initial={{ x: "-120%", opacity: 0 }}
                  animate={{ x: "120%", opacity: 0.55 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.6, ease: howTransformEase }}
                  style={{
                    background:
                      "linear-gradient(110deg, rgba(248,113,113,0) 30%, rgba(248,113,113,0.18) 48%, rgba(248,113,113,0) 72%)",
                  }}
                />
              )}

              <motion.div
                className="relative h-8 w-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0 mt-0.5"
                initial={false}
                animate={queueRunning && activeQueueIndex === 2 ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.65, ease: howTransformEase }}
              >
                {queueRunning && activeQueueIndex === 2 && (
                  <motion.div
                    aria-hidden
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: [0, 0.6, 0], scale: [0.94, 1.04, 1] }}
                    transition={{ duration: reduceMotion ? 0 : 0.75, ease: howTransformEase }}
                    style={{
                      boxShadow:
                        "0 0 0 1px rgba(248,113,113,0.22), 0 10px 26px rgba(248,113,113,0.10)",
                    }}
                  />
                )}
                <AlertTriangle className="h-4 w-4 text-red-400" strokeWidth={1.5} />
              </motion.div>

              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-medium text-gray-800">Possible duplicate charge</div>
                <div className="text-[12px] text-gray-500 mt-1">Flagged before payout</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

const pillarTabs = [
  {
    id: "personalization",
    title: "Personalization",
    description: "Your format, learned from one document.",
  },
  {
    id: "automation",
    title: "Automation",
    description: "AI prepares the work—you review and approve.",
  },
  {
    id: "security",
    title: "Data Security",
    description: "Your data never leaves your control.",
  },
];

const pillarPersonalEase = [0.22, 1, 0.36, 1];

const PILLAR_PERSONAL_FIELDS = [
  { id: "vendor", label: "Vendor", value: "Acme Industrial Supply", mono: false },
  { id: "date", label: "Date", value: "Mar 15, 2025", mono: false },
  { id: "total", label: "Total", value: "$4,280.00", mono: true },
];

/** Sample doc UI — vendor, date, total as the important rows */
const PersonalizationDocCard = ({ ringStep = 3 }) => (
  <div className="pillar-content-card w-full max-w-[440px] p-6 sm:p-7">
    <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-gray-100">
      <span className="h-2.5 w-2.5 rounded-full bg-[#e85d5d]" aria-hidden />
      <span className="h-2.5 w-2.5 rounded-full bg-[#e8b35d]" aria-hidden />
      <span className="h-2.5 w-2.5 rounded-full bg-[#d1d5db]" aria-hidden />
    </div>
    <div className="space-y-4">
      {PILLAR_PERSONAL_FIELDS.map((row, i) => (
        <div key={row.id} className="relative rounded-xl px-3 py-3">
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-[#2B5BC8] ring-offset-2 ring-offset-white bg-[rgba(79,143,247,0.08)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: i < ringStep ? 1 : 0 }}
            transition={{ duration: 0.32, delay: i * 0.1, ease: pillarPersonalEase }}
          />
          <div
            className={`relative text-[14px] sm:text-[15px] text-gray-900 ${row.mono ? "font-semibold tabular-nums" : "font-medium"}`}
          >
            {row.value}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/**
 * Sample document ↔ structured data, loops while in view (no replay control).
 */
const PILLAR_PERSONAL_DOC_MS = 1050;
const PILLAR_PERSONAL_HOLD_MS = 2600;

const PillarPersonalizationVisual = () => {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef(null);
  const [phase, setPhase] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setPhase(1);
      return undefined;
    }
    const el = rootRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.28, rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    if (!inView) setPhase(0);
  }, [inView]);

  useEffect(() => {
    if (!inView || reduceMotion) return undefined;
    const delay = phase === 0 ? PILLAR_PERSONAL_DOC_MS : PILLAR_PERSONAL_HOLD_MS;
    const id = window.setTimeout(() => setPhase((p) => (p === 0 ? 1 : 0)), delay);
    return () => window.clearTimeout(id);
  }, [inView, reduceMotion, phase]);

  return (
    <div
      ref={rootRef}
      className="w-full flex justify-center"
      role="img"
      aria-label="Animation: sample document, then structured data with labeled fields."
    >
      <div className="relative w-full max-w-[440px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.div
              key="p-doc"
              className="w-full flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.38, ease: pillarPersonalEase }}
            >
              <PersonalizationDocCard ringStep={3} />
            </motion.div>
          )}

          {phase === 1 && (
            <motion.div
              key="p-out"
              className="w-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: pillarPersonalEase }}
            >
              <div className="pillar-content-card p-5 sm:p-6">
                {/* Chrome window controls (decorative) */}
                <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-gray-100">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e85d5d]" aria-hidden />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e8b35d]" aria-hidden />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#d1d5db]" aria-hidden />
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400 mb-3">
                  Structured data
                </p>
                <div className="space-y-3 sm:space-y-4">
                  {PILLAR_PERSONAL_FIELDS.map((row, i) => (
                    <motion.div
                      key={row.id}
                      className="flex items-baseline justify-between gap-4 rounded-xl border border-gray-100 bg-gray-50/95 px-4 py-3"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: i * 0.14,
                        duration: 0.36,
                        ease: pillarPersonalEase,
                      }}
                    >
                      <span className="text-[12px] font-medium text-gray-400 shrink-0">{row.label}</span>
                      <span
                        className={`text-[14px] sm:text-[15px] font-medium text-gray-900 text-right tabular-nums ${
                          row.mono ? "" : ""
                        }`}
                      >
                        {row.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const PILLAR_AUTO_STEP_MS = 1200;

const pillarAutoEase = [0.22, 1, 0.36, 1];

const automationFiles = [
  { name: "Vendor_agreement.pdf", sub: "PDF", Icon: FileText },
  { name: "Q1_close_March.xlsx", sub: "Sheet", Icon: FileSpreadsheet },
  { name: "Expense batch #428", sub: "Request", Icon: FileText },
];

/** Single-card workflow: input → working → approval (loops while visible). */
const PillarAutomationVisual = () => {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef(null);
  const [run, setRun] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setStep(2);
      setRun(false);
      return undefined;
    }

    const el = containerRef.current;
    if (!el) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        setRun(entry.isIntersecting);
      },
      { threshold: 0.28, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  // Whenever we re-enter view, restart the sequence from the first state.
  useEffect(() => {
    if (!reduceMotion && run) setStep(0);
  }, [run, reduceMotion]);

  useEffect(() => {
    if (!run || reduceMotion) return undefined;

    const finalPauseMs = 1100; // ~0.8–1.5s pause on the last step

    let t = 0;
    if (step === 0) {
      t = window.setTimeout(() => setStep(1), PILLAR_AUTO_STEP_MS);
    } else if (step === 1) {
      t = window.setTimeout(() => setStep(2), PILLAR_AUTO_STEP_MS);
    } else {
      t = window.setTimeout(() => setStep(0), finalPauseMs);
    }

    return () => {
      if (t) window.clearTimeout(t);
    };
  }, [run, step, reduceMotion]);

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.38, ease: pillarAutoEase };

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[480px] mx-auto"
      role="img"
      aria-label="Files arrive, work is prepared automatically, then you approve or request changes before anything is sent."
    >
      <motion.div
        className={`pillar-content-card overflow-hidden min-h-[300px] sm:min-h-[340px] flex flex-col ${
          step === 2 ? "ring-1 ring-[#2B5BC8]/20" : ""
        }`}
        animate={{
          borderColor:
            step === 2 ? "rgba(79, 143, 247, 0.5)" : "rgba(229, 231, 235, 0.95)",
        }}
        transition={{ duration: 0.45 }}
      >
        <div className="flex items-center gap-1.5 px-5 py-3 border-b border-gray-100 bg-gray-50/60 shrink-0">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e85d5d]" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e8b35d]" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-[#d1d5db]" aria-hidden />
        </div>

        <div
          className="relative flex-1 p-6 sm:p-7 flex flex-col justify-center min-h-[220px]"
          aria-live="polite"
        >
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="auto-in"
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={transition}
                className="space-y-2"
              >
                {automationFiles.map((row, i) => (
                  <motion.div
                    key={row.name}
                    initial={false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { delay: 0.06 * i, duration: 0.32, ease: pillarAutoEase }
                    }
                    className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/90 px-3 py-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white border border-gray-100 shadow-sm">
                      <row.Icon className="h-4 w-4 text-gray-500" aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-medium text-gray-900 truncate">{row.name}</div>
                      <div className="text-[11px] text-gray-400">{row.sub}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="auto-work"
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={transition}
                className="py-2"
              >
                <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-[#2B5BC8]/75"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={
                      reduceMotion ? { duration: 0 } : { duration: 0.9, ease: pillarAutoEase }
                    }
                    style={{ transformOrigin: "left" }}
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="auto-out"
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={transition}
                className="space-y-2"
              >
                <button
                  type="button"
                  tabIndex={-1}
                  className="w-full rounded-lg bg-[#2B5BC8] px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm"
                >
                  Approve
                </button>
                <button
                  type="button"
                  tabIndex={-1}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-medium text-gray-700"
                >
                  <PenLine className="h-3.5 w-3.5 text-gray-500" aria-hidden />
                  Request changes
                </button>
                <p className="pt-3 text-center text-[11px] leading-snug text-gray-500">
                  Nothing is sent without your approval
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

/**
 * Security comparison: local vs cloud deployment options.
 * Static, scan-friendly decision layout with minimal chrome.
 */
const PillarSecurityVisual = () => {
  const columns = [
    {
      title: "Local",
      items: [
        { icon: ShieldCheck, label: "You own your data" },
        { icon: Layers, label: "Runs on your machine" },
        { icon: Wallet, label: "No token usage or ongoing cost" },
      ],
    },
    {
      title: "Cloud / VPC",
      items: [
        { icon: KeyRound, label: "Zero data retention" },
        { icon: Unplug, label: "No infrastructure overhead" },
        { icon: ShieldCheck, label: "Fully managed deployment" },
      ],
    },
  ];

  return (
    <div className="pillar-content-card w-full max-w-[640px] mx-auto p-6 sm:p-8" role="img" aria-label="Comparison of local and cloud or VPC deployment options">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
        {columns.map((column, idx) => (
          <div
            key={column.title}
            className={idx === 1 ? "sm:border-l sm:border-gray-200 sm:pl-10" : "sm:pr-2"}
          >
            <h4 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-gray-900">
              {column.title}
            </h4>
            <ul className="mt-4 space-y-3.5">
              {column.items.map((item) => (
                <li key={item.label} className="flex items-start gap-2.5">
                  <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" aria-hidden />
                  <span className="text-[14px] leading-[1.45] text-gray-700">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

/** Time each pillar stays visible — enough to read headline + sub + scan the visual */
const PILLAR_ROTATE_MS = 7500;

const pillarPanelCopy = {
  personalization: {
    headline: "Your document becomes structured data",
    sub: "Show the model one sample—it learns your layout and maps the rest the same way.",
    Visual: PillarPersonalizationVisual,
  },
  automation: {
    headline: "AI works—you approve",
    sub: "Drafts and prep run automatically. You review, approve, or send back edits before anything ships.",
    Visual: PillarAutomationVisual,
  },
  security: {
    headline: "You control your data",
    sub: "Choose how your system runs. Your data stays where you decide.",
    Visual: PillarSecurityVisual,
  },
};

const WhoItsForSection = () => {
  const [selectedPillar, setSelectedPillar] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [hoverPause, setHoverPause] = useState(false);
  const reduceMotion = useReducedMotion();
  const pillar = pillarTabs[selectedPillar];
  const panel = pillarPanelCopy[pillar.id];
  const Visual = panel.Visual;

  const intervalActive = autoPlay && !hoverPause;

  useEffect(() => {
    if (!intervalActive) return;
    const id = window.setInterval(() => {
      setSelectedPillar((prev) => (prev + 1) % pillarTabs.length);
    }, PILLAR_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [intervalActive]);

  const handlePillarClick = (index) => {
    setSelectedPillar(index);
    setAutoPlay(false);
  };

  return (
    <section
      id="product"
      className="relative py-20 md:py-24 lg:py-28 bg-[#fafafa] overflow-hidden"
    >
      <Container>
        <div
          onMouseEnter={() => autoPlay && setHoverPause(true)}
          onMouseLeave={() => setHoverPause(false)}
        >
        <motion.div
          className="flex flex-col sm:flex-row flex-nowrap gap-3 md:gap-4"
          role="tablist"
          aria-label="Core product capabilities"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
        >
          {pillarTabs.map((p, i) => {
            const active = selectedPillar === i;
            const showProgress = active && autoPlay && !hoverPause && !reduceMotion;
            return (
              <motion.button
                key={p.id}
                type="button"
                role="tab"
                layout
                id={`pillar-label-${p.id}`}
                aria-selected={active}
                aria-controls={`pillar-panel-${p.id}`}
                tabIndex={active ? 0 : -1}
                onClick={() => handlePillarClick(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    const next =
                      e.key === "ArrowRight"
                        ? (i + 1) % pillarTabs.length
                        : (i - 1 + pillarTabs.length) % pillarTabs.length;
                    handlePillarClick(next);
                    queueMicrotask(() =>
                      document.getElementById(`pillar-label-${pillarTabs[next].id}`)?.focus()
                    );
                  }
                }}
                initial={false}
                animate={
                  reduceMotion
                    ? {}
                    : {
                        scale: active ? 1 : 0.985,
                        y: active ? 0 : 1,
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 32,
                  mass: 0.7,
                }}
                whileHover={
                  reduceMotion || active
                    ? undefined
                    : { scale: 1.01, y: -1, transition: { duration: 0.2 } }
                }
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className={`relative flex flex-col flex-1 min-w-0 text-left rounded-2xl overflow-hidden select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B5BC8]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafafa] ${
                  active
                    ? "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.07)] border border-black/[0.07] ring-1 ring-[#2B5BC8]/12"
                    : "bg-[#F9FAFB] border border-[rgba(0,0,0,0.06)] hover:bg-[#f4f5f7]"
                }`}
              >
                <div className="relative flex-1 px-4 py-4 md:px-5 md:py-4">
                  <div className="pl-1">
                    <div className={`text-[15px] md:text-base font-bold ${active ? "text-gray-900" : "text-gray-800"}`}>
                      {p.title}
                    </div>
                    <p className="mt-1 text-[13px] leading-snug text-gray-500 text-left line-clamp-2 sm:line-clamp-1">
                      {p.description}
                    </p>
                  </div>
                </div>
                {/* Progress strip removed to keep active card fully clean white */}
              </motion.button>
            );
          })}
        </motion.div>

        <div
          className="mt-8 md:mt-10 relative overflow-hidden rounded-[22px] shadow-[0_8px_40px_rgba(0,0,0,0.07)] ring-1 ring-black/[0.05]"
          role="tabpanel"
          aria-live="polite"
          aria-atomic="true"
          aria-labelledby={`pillar-label-${pillar.id}`}
          id={`pillar-panel-${pillar.id}`}
        >
          <div className="pillar-panel-gradient absolute inset-0 z-0 pointer-events-none" aria-hidden />
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#3D6BFF]/20 via-transparent to-[#7C3AED]/14 pointer-events-none" aria-hidden />
          <div
            className="absolute -right-20 -top-24 z-0 h-72 w-72 rounded-full bg-[#3D6BFF]/22 blur-[64px] pointer-events-none"
            aria-hidden
          />
          <div
            className="absolute -bottom-28 -left-16 z-0 h-64 w-64 rounded-full bg-[#7C3AED]/16 blur-[56px] pointer-events-none"
            aria-hidden
          />
          <div
            className="pillar-panel-dots pointer-events-none absolute inset-0 z-[1]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-1/2 top-0 z-[2] h-[210px] w-[72%] -translate-x-1/2"
            style={{
              background:
                "radial-gradient(ellipse 70% 62% at 50% 34%, rgba(13, 22, 48, 0.12) 0%, rgba(13, 22, 48, 0.06) 42%, rgba(13, 22, 48, 0) 78%)",
            }}
            aria-hidden
          />

          <div className="relative z-10 m-4 p-6 sm:m-5 sm:p-8 md:m-6 md:p-10 min-h-[380px] sm:min-h-[420px] flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={pillar.id}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col flex-1"
              >
                <div className="text-center max-w-xl mx-auto mb-5 md:mb-7">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight text-[#0B0F1A]">
                    {panel.headline}
                  </h3>
                  <p className="mt-2 text-sm text-[#4B5563] leading-relaxed">{panel.sub}</p>
                </div>
                <div className="flex-1 flex items-center justify-center w-full">
                  <div className="pillar-visual-stage w-full">
                    <Visual />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        </div>
      </Container>
    </section>
  );
};

const featuresData = [
  {
    id: "document",
    icon: FileText,
    eyebrow: "Document Workflow",
    headline: "Generate quotes, contracts, and internal docs from your data—faster, with fewer manual steps",
    body: "Turn client information into ready-to-review documents automatically. No more copying between spreadsheets and docs—the system uses your business data to fill templates and deliver drafts you can review in minutes.",
    panel: {
      userRequest: "Create a quote for Client A using our standard contract template.",
      workflowSteps: [
        "Loading template",
        "Pulling client and pricing data",
        "Generating the document draft",
        "Flagging fields that need confirmation",
      ],
      resultLines: ["Quote draft ready", "2 fields flagged for review"],
      buttons: ["Review document", "Send for approval"],
    },
  },
  {
    id: "reconciliation",
    icon: Wallet,
    eyebrow: "Financial Reconciliation",
    headline: "Reconcile financial records without manual work",
    body: "Automatic matching, discrepancy flags, and exportable reports. Your books stay clean without the manual grind.",
    panel: {
      userRequest: "Reconcile last month's bank statement with internal records.",
      workflowSteps: [
        "Scanning uploaded bank statement",
        "Matching transaction IDs",
        "Identifying unmatched entries",
      ],
      resultLines: ["92 transactions matched", "3 discrepancies flagged"],
      buttons: ["Review discrepancies", "Export report"],
    },
  },
  {
    id: "approvals",
    icon: UserCheck,
    eyebrow: "Approvals & Oversight",
    headline: "Stay in control with approvals and operational alerts",
    body: "Exception-based alerts, approval routing, and a full audit trail. You decide what gets executed.",
    panel: {
      userRequest: "Show what needs my approval today.",
      workflowSteps: [
        "Checking pending actions",
        "Summarizing alerts",
        "Prioritizing high-risk items",
      ],
      resultLines: ["3 approvals required", "1 anomaly detected"],
      buttons: ["Approve actions", "View details"],
    },
  },
];

const SolutionsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);
  const sectionRef = useRef(null);
  const blocksWrapperRef = useRef(null);
  const blockRefs = useRef([]);

  const updateActive = useCallback(() => {
    const blocks = blockRefs.current.filter(Boolean);
    const wrapper = blocksWrapperRef.current;
    if (blocks.length === 0 || !wrapper) return;

    const viewportCenter = window.innerHeight / 2;
    let closest = 0;
    let closestDist = Infinity;
    blocks.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      const blockCenter = rect.top + rect.height / 2;
      const dist = Math.abs(blockCenter - viewportCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);

    const wrapperRect = wrapper.getBoundingClientRect();
    const lineTop = wrapperRect.top;
    const lineHeight = wrapperRect.height;
    const progress = Math.max(0, Math.min(1, (viewportCenter - lineTop) / lineHeight));
    setLineProgress(progress);
  }, []);

  useLayoutEffect(() => {
    updateActive();
  }, [updateActive]);

  useEffect(() => {
    const onScroll = () => requestAnimationFrame(updateActive);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const timer = setTimeout(updateActive, 150);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(timer);
    };
  }, [updateActive]);

  const activeFeature = featuresData[activeIndex];

  return (
    <section id="solutions" ref={sectionRef} className="relative overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-20 md:py-28">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          {/* Left: progress line + scrollable feature blocks (words) */}
          <div className="relative pl-8 md:pl-10">
            {/* Scroll progress line — green fill + moving circle show scroll position */}
            <div className="absolute left-0 top-0 bottom-0 w-px flex flex-col items-center" aria-hidden>
              <div className="flex-1 min-h-0 w-full relative">
                <div className="absolute left-0 top-0 w-px h-full bg-gray-200" />
                <div
                  className="absolute left-0 top-0 w-px bg-[#2B5BC8] transition-[height] duration-200 ease-out"
                  style={{ height: `${lineProgress * 100}%` }}
                />
              </div>
            </div>
            <div ref={blocksWrapperRef} className="space-y-24 md:space-y-32">
            {featuresData.map((feature, i) => {
              const isActive = activeIndex === i;
              return (
                <div
                  key={feature.id}
                  ref={(el) => { blockRefs.current[i] = el; }}
                  className="scroll-feature-block relative min-h-[60vh] flex flex-col justify-start"
                >
                  {/* Mobile: show visual panel under content for this feature */}
                  <div className="lg:hidden order-2 mt-6">
                    <div className="relative w-full rounded-2xl border border-gray-300 overflow-hidden bg-white shadow-sm">
                      <div className="absolute inset-0 solutions-panel-dots pointer-events-none" aria-hidden />
                      <div className="relative p-6">
                        <div className="space-y-4">
                          <div>
                            <div className="text-[11px] font-medium uppercase tracking-wider text-gray-600 mb-1">User request</div>
                            <p className="text-gray-900 text-sm font-medium">&ldquo;{feature.panel.userRequest}&rdquo;</p>
                          </div>
                          <ul className="space-y-1.5">
                            {feature.panel.workflowSteps.map((step, j) => (
                              <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d8e7ff]">
                                  <Check className="h-3 w-3 text-[#2B5BC8]" />
                                </span>
                                {step}
                              </li>
                            ))}
                          </ul>
                          <p className="text-sm text-gray-600">{feature.panel.resultLines.join(" · ")}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Eyebrow + headline + body */}
                  <motion.div
                    className="order-1 relative space-y-4"
                    animate={{ opacity: isActive ? 1 : 0.55 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {/* Circle marker — every feature has one, aligned with top of content, on the line */}
                    <div
                      className={`absolute -left-8 md:-left-10 top-0 -translate-x-1/2 h-3 w-3 rounded-full shrink-0 z-10 transition-colors duration-300 ${
                        isActive ? "bg-[#2B5BC8]" : "bg-gray-300"
                      }`}
                      aria-hidden
                    />
                    <div className="flex items-center gap-2">
                      <feature.icon className={`h-4 w-4 shrink-0 ${isActive ? "text-[#2B5BC8]" : "text-gray-600"}`} />
                      <span className={`text-xs font-medium uppercase tracking-wider ${isActive ? "text-[#2B5BC8]" : "text-gray-600"}`}>
                        {feature.eyebrow}
                      </span>
                    </div>
                    <h2 className={`text-2xl font-normal leading-tight md:text-3xl lg:text-[2rem] transition-colors duration-300 ${isActive ? "text-gray-900" : "text-gray-500"}`}>
                      {feature.headline}
                    </h2>
                    <p className={`text-base leading-relaxed max-w-md transition-colors duration-300 ${isActive ? "text-gray-700" : "text-gray-600"}`}>
                      {feature.body}
                    </p>
                  </motion.div>
                </div>
              );
            })}
            </div>
          </div>

          {/* Right: sticky visual panel (desktop only) — consistent white card on green for all features */}
          <div className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
            <div className="relative w-full max-w-[480px] mx-auto">
              <div className="absolute -inset-4 overflow-hidden rounded-2xl" aria-hidden>
                <div className="absolute inset-0 bg-[#2B5BC8]" />
              </div>
              <div className="relative rounded-xl border border-gray-300/60 bg-white shadow-lg overflow-hidden">
                <div className="p-8 w-full max-w-[480px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFeature.id}
                      initial={false}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-0"
                    >
                        {/* 1. USER REQUEST — appears first, signals start of process */}
                        <motion.div
                          className="flex gap-4"
                          initial={false}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                          <div className="flex flex-col items-center shrink-0">
                            <div className="w-px h-6 bg-[#2B5BC8]" />
                            <FileText className="h-4 w-4 text-gray-500 mt-2 shrink-0" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[11px] font-medium uppercase tracking-wider text-gray-600 mb-2">User request</div>
                            <p className="text-gray-900 text-base font-medium leading-snug">&ldquo;{activeFeature.panel.userRequest}&rdquo;</p>
                          </div>
                        </motion.div>

                        {/* Quote → next section: 24-32px */}
                        <div className="h-6" aria-hidden />

                        {/* 2. AI WORKFLOW — appears second, shows processing */}
                        <motion.div
                          className="flex gap-4"
                          initial={false}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                          <div className="flex flex-col items-center shrink-0">
                            <Clock className="h-4 w-4 text-[#2B5BC8] shrink-0" />
                            <div className="w-px flex-1 min-h-0 mt-2 border-l border-[#2B5BC8]/60" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[11px] font-medium uppercase tracking-wider text-gray-600 mb-4">AI workflow</div>
                            <div className="space-y-5">
                              {activeFeature.panel.workflowSteps.map((step, i) => (
                                <motion.div
                                  key={i}
                                  className="flex items-start gap-4"
                                  initial={false}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.35, delay: 0.7 + i * 0.15, ease: "easeOut" }}
                                >
                                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2B5BC8] mt-0.5">
                                    <Check className="h-3 w-3 text-white" />
                                  </span>
                                  <span className="text-sm text-gray-700 leading-relaxed pt-0.5">{step}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>

                        {/* ~24px gap */}
                        <div className="h-6" aria-hidden />

                        {/* 3. RESULT — quote draft ready, appears last, waiting for YOUR approval */}
                        <motion.div
                          className="flex gap-4"
                          initial={false}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                          <div className="flex flex-col items-center shrink-0">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2B5BC8]">
                              <Check className="h-3 w-3 text-white" />
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-gray-900 mb-2">{activeFeature.panel.resultLines[0]}</div>
                            <p className="text-sm text-gray-700 leading-relaxed">{activeFeature.panel.resultLines[1]}</p>
                          </div>
                        </motion.div>

                        {/* ~24px gap above buttons */}
                        <div className="h-6" aria-hidden />

                        {/* 4. ACTION BUTTONS — appears with result, your approval awaits */}
                        <motion.div
                          className="flex flex-wrap gap-3"
                          initial={false}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: 1.7, ease: "easeOut" }}
                        >
                          <a
                            href="#contact"
                            className="inline-flex h-9 items-center justify-center rounded-lg bg-[#d8e7ff] px-4 text-sm font-medium text-[#2B5BC8] hover:bg-[#d0e0ff] transition-colors"
                          >
                            {activeFeature.panel.buttons[0]}
                          </a>
                          <button
                            type="button"
                            className="inline-flex h-9 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            {activeFeature.panel.buttons[1]}
                          </button>
                        </motion.div>
                      </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Btn href="#contact">
            Get started <ArrowRight className="h-4 w-4" />
          </Btn>
        </div>
      </div>
    </section>
  );
};

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed left-0 right-0 top-0 z-50 bg-white/90 backdrop-blur-md transition-shadow ${
        isScrolled ? "shadow-[0_6px_24px_rgba(0,0,0,0.06)]" : ""
      }`}
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-3 items-center py-3">
          <a href="#top" className="flex items-center gap-2 justify-self-start">
            <OmnigenceLogo size={40} decorative />
            <span className="text-sm font-semibold tracking-wide text-gray-900">Omnigence</span>
          </a>

          <div className="hidden md:flex items-center justify-center gap-8">
            <a href="#product" className="text-sm font-medium text-gray-700 transition-colors hover:text-[#2B5BC8]">
              Product
            </a>
            <a href="#how" className="text-sm font-medium text-gray-700 transition-colors hover:text-[#2B5BC8]">
              How it works
            </a>
            <a href="#governance" className="text-sm font-medium text-gray-700 transition-colors hover:text-[#2B5BC8]">
              Security
            </a>
          </div>

          <div className="flex items-center justify-self-end">
            <span className="nav-cta-glow inline-flex">
              <Btn variant="navPrimary" href="#contact" className="relative z-[1]">
                Book a Demo
              </Btn>
            </span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const HERO_FINANCE_METRICS = {
  revenue: 42580,
  expenses: 28340,
  profit: 14240,
};
const HERO_PANEL_TEXTURE = "https://www.figma.com/api/mcp/asset/42a5cee3-c627-4636-973a-1f2b6bb0ee1d";

const useCountUp = ({ target, durationMs, start }) => {
  const [value, setValue] = useState(start ? 0 : target);

  useEffect(() => {
    if (!start) {
      setValue(target);
      return undefined;
    }

    let rafId = null;
    const startAt = performance.now();
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const elapsed = now - startAt;
      const progress = Math.min(elapsed / durationMs, 1);
      setValue(Math.round(target * easeOutCubic(progress)));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [durationMs, start, target]);

  return value;
};

export default function Page() {
  const reduceMotion = useReducedMotion();
  const [heroNumbersStart, setHeroNumbersStart] = useState(false);
  const [heroMounted, setHeroMounted] = useState(false);
  const [governanceEnv, setGovernanceEnv] = useState("local");
  const [governanceUserControlled, setGovernanceUserControlled] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setHeroNumbersStart(true);
      return undefined;
    }
    const id = setTimeout(() => setHeroNumbersStart(true), 900);
    return () => clearTimeout(id);
  }, [reduceMotion]);

  // Avoid SSR "opacity: 0" rendering on the desktop hero: we reveal only after mount.
  useEffect(() => {
    setHeroMounted(true);
  }, []);

  useEffect(() => {
    if (reduceMotion) return undefined;
    if (governanceUserControlled) return undefined;
    const id = window.setInterval(() => {
      setGovernanceEnv((prev) => (prev === "local" ? "vpc" : "local"));
    }, 2200);
    return () => window.clearInterval(id);
  }, [reduceMotion, governanceUserControlled]);

  const shouldAnimateHeroNumbers = heroNumbersStart && !reduceMotion;
  const animatedRevenue = useCountUp({
    target: HERO_FINANCE_METRICS.revenue,
    durationMs: 1350,
    start: shouldAnimateHeroNumbers,
  });
  const animatedExpenses = useCountUp({
    target: HERO_FINANCE_METRICS.expenses,
    durationMs: 1350,
    start: shouldAnimateHeroNumbers,
  });
  const animatedProfit = useCountUp({
    target: HERO_FINANCE_METRICS.profit,
    durationMs: 1350,
    start: shouldAnimateHeroNumbers,
  });
  const heroEase = [0.22, 1, 0.36, 1];
  const heroReveal = heroMounted && !reduceMotion;
  const heroTextEnter = heroReveal ? { opacity: 0, y: 14 } : false;
  const heroVisualEnter = heroReveal ? { opacity: 0, y: 14 } : false;
  const heroCardEnter = heroReveal ? { opacity: 0, y: 12, scale: 0.988 } : false;

  useEffect(() => {
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const navHeight = 80;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
          const distance = Math.abs(targetPosition - window.scrollY);
          // Keep anchor jumps snappy so “Product” / “How it works” feel instant.
          const duration = Math.min(700, Math.max(320, distance * 0.35));
          smoothScrollTo(targetPosition, duration);
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => anchor.addEventListener("click", handleAnchorClick));
    return () => {
      anchors.forEach((anchor) => anchor.removeEventListener("click", handleAnchorClick));
    };
  }, []);

  return (
    <main id="top" className="min-h-screen bg-[#fafafa]">
      <Nav />

      {/* Hero — full viewport like Vercel */}
      <section className="relative min-h-screen bg-[#fafafa] overflow-hidden pb-20 md:pb-24 lg:pb-28">
        {/* Hero grid (Figma-accurate) - disabled; use legacy pixel-accurate block below */}
        <div className="hidden relative z-10 mx-auto max-w-[1510px] px-6 lg:px-[80px] h-full flex items-center">
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-[44px]">
            {/* Left */}
            <div className="max-w-[440px]">
              <h1 className="font-medium text-[48px] leading-[1.03] tracking-[-0.03em] text-gray-900 sm:text-[56px] lg:text-[64px]">
                An AI agent you can train to run your operations
              </h1>
              <p className="mt-6 text-[16px] leading-[24px] text-[#6B7280]">
                Turn documents, approvals, and company knowledge into automated workflows.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <a
                  href="#how"
                  className="inline-flex box-border h-[38px] w-[240px] items-center justify-center gap-2 rounded-full bg-[#2B5BC8] px-5 py-0 text-sm font-medium leading-none text-white hover:bg-[#4C7BEA] transition-colors"
                >
                  See How It Works <ArrowRight className="h-4 w-4" />
                </a>
                <Btn
                  href="/api"
                  variant="secondary"
                  className="box-border h-[38px] w-[240px] px-5 text-sm whitespace-nowrap leading-none"
                >
                  Explore API <ArrowRight className="h-4 w-4" />
                </Btn>
              </div>
            </div>

            {/* Right */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[520px] h-[520px] lg:max-w-[879px] lg:h-[810px] overflow-hidden rounded-[28px]">
                <div
                  className="absolute left-0 top-0 origin-top-left scale-[0.62] lg:scale-[0.9] lg:-translate-x-[28px] lg:translate-y-[18px]"
                  style={{
                    width: 879,
                    height: 810,
                    backgroundImage:
                      /* Soften the top-right highlight to avoid the "blue dot" look */
                      "radial-gradient(420px 420px at 86% 24%, rgba(61,107,255,0.62) 0%, rgba(60,59,255,0.34) 22%, rgba(124,58,237,0.22) 44%, rgba(13,22,48,0.10) 70%, rgba(0,0,0,0) 92%), linear-gradient(137.33937931403239deg, rgb(235, 238, 255) 20%, rgba(60, 59, 255, 0.52) 46%, rgb(124, 58, 237) 78%, rgb(43, 91, 200) 100%)",
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.02]"
                    style={{
                      backgroundImage: `url("${HERO_PANEL_TEXTURE}")`,
                      backgroundSize: "220px 220px",
                      mixBlendMode: "soft-light",
                    }}
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      /* Removed the extra big radial blotch.
                         We keep only the primary gradient + texture layers for a smoother premium look. */
                      background: "transparent",
                      filter: "none",
                    }}
                    aria-hidden
                  />
                  <motion.div
                    className="pointer-events-none absolute -left-[16%] top-[30%] h-[42%] w-[132%]"
                    aria-hidden
                    initial={reduceMotion ? false : { x: "-8%", opacity: 0 }}
                    animate={
                      reduceMotion ? { x: 0, opacity: 0 } : { x: "2%", opacity: 0.08 }
                    }
                    transition={
                      reduceMotion ? { duration: 0 } : { duration: 0.95, delay: 0.24, ease: heroEase }
                    }
                    style={{
                      background:
                        "linear-gradient(100deg, rgba(61,107,255,0) 0%, rgba(61,107,255,0.28) 32%, rgba(124,58,237,0.22) 56%, rgba(61,107,255,0) 100%)",
                      borderRadius: "9999px",
                      filter: "blur(20px)",
                    }}
                  />
                  {/* Approval card */}
                  <div className="absolute left-[270px] top-[98px] w-[313px] h-[200px] bg-white border border-[#f3f4f6] rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-[18px]">
                    <div className="flex flex-col gap-[3px]">
                      <div className="text-[14px] font-medium text-[#101828]">AI Task Completed</div>
                      <div className="text-[10px] font-normal text-[#6a7282]">Weekly Reconciliation</div>
                    </div>

                    <div className="mt-[14px] flex flex-col gap-[10px]">
                      <div className="flex items-center gap-[9px]">
                        <Check className="h-[14px] w-[14px] shrink-0 text-[#2B5BC8]" strokeWidth={2.5} aria-hidden />
                        <div className="text-[11px] font-normal text-[#364153]">48 transactions matched</div>
                      </div>
                      <div className="flex items-center gap-[9px]">
                        <Check className="h-[14px] w-[14px] shrink-0 text-[#2B5BC8]" strokeWidth={2.5} aria-hidden />
                        <div className="flex-1 text-[11px] font-normal text-[#364153]">
                          Bankbook vs statement reconciliation completed
                        </div>
                      </div>
                    </div>

                    <div className="mt-[14px] h-[1px] bg-[#f3f4f6]" />

                    <div className="mt-[10px] flex gap-[10px]">
                      <button
                        type="button"
                        className="flex-1 h-[26px] rounded-[6px] bg-[#2B5BC8] text-white text-[10px] font-medium"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        className="flex-1 h-[26px] rounded-[6px] bg-white border border-[#d1d5dc] text-[#364153] text-[10px] font-medium"
                      >
                        Request Changes
                      </button>
                    </div>
                  </div>

                  {/* Warning card */}
                  <div className="absolute left-[92px] top-[318px] w-[317px] h-[77px] bg-white rounded-[13px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center px-[14px] gap-[12px]">
                    <AlertTriangle className="h-10 w-10 shrink-0 text-amber-500" strokeWidth={1.75} aria-hidden />
                    <div className="flex-1">
                      <div className="text-[15px] font-medium text-[#343744] leading-[20px]">
                        2 discrepancies flagged
                      </div>
                      <div className="mt-[4px] text-[10px] font-normal text-[#696969] leading-[12px]">
                        Bankbook and statement mismatch detected
                      </div>
                      <div className="mt-[6px] text-[8px] font-normal text-[#2B5BC8]">
                        Review Discrepancies &rarr;
                      </div>
                    </div>
                  </div>

                  {/* Financial summary card */}
                  <div className="absolute left-[420px] top-[318px] w-[318px] h-[384px] bg-white border border-[#f3f4f6] rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-[19px] flex flex-col gap-[12px]">
                    <div className="flex justify-end">
                      <div className="bg-[#f3f4f6] rounded-[10px] px-[12px] py-[8px] text-[12px] font-normal text-[#101828] whitespace-nowrap">
                        Generate financial summary for March.
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-[#eff6ff] rounded-[10px] px-[12px] py-[8px] text-[12px] font-normal text-[#101828] whitespace-nowrap">
                        Financial summary ready.
                      </div>
                    </div>

                    <div className="flex-1 bg-[#f9fafb] border border-[#e5e7eb] rounded-[14px] p-[18px] relative overflow-hidden">
                      <div className="text-[14px] font-semibold tracking-[-0.2px] text-[#101828]">
                        March Financial Summary
                      </div>
                      <div className="mt-[18px] grid grid-cols-3 gap-[16px] tabular-nums">
                        <div className="space-y-[5px]">
                          <div className="text-[11px] font-normal uppercase tracking-wider text-[#6a7282]">Revenue</div>
                          <div className="text-[18px] font-semibold text-[#101828]">{CURRENCY_FORMATTER.format(animatedRevenue)}</div>
                        </div>
                        <div className="space-y-[5px]">
                          <div className="text-[11px] font-normal uppercase tracking-wider text-[#6a7282]">Expenses</div>
                          <div className="text-[18px] font-semibold text-[#101828]">{CURRENCY_FORMATTER.format(animatedExpenses)}</div>
                        </div>
                        <div className="space-y-[5px]">
                          <div className="text-[11px] font-normal uppercase tracking-wider text-[#6a7282]">Net Profit</div>
                          <div className="text-[18px] font-semibold text-[#00a63e]">{CURRENCY_FORMATTER.format(animatedProfit)}</div>
                        </div>
                      </div>
                      <div className="absolute left-[15px] right-[15px] bottom-[10px] h-[120px]">
                        <svg viewBox="0 0 240 100" className="h-full w-full" aria-hidden>
                          <path
                            d="M10 90 C 34 94, 50 92, 72 80 C 92 69, 112 72, 132 70 C 152 68, 170 58, 188 54 C 206 50, 220 40, 232 30"
                            fill="none"
                            stroke="#2B5BC8"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    <a
                      href="#solutions"
                      className="mt-[6px] pt-[6px] border-t border-gray-200 flex items-center gap-[10px] text-[11px] font-medium text-[#2B5BC8]"
                    >
                      <span>View full report</span>
                      <ExternalLink className="h-3 w-3 shrink-0 text-[#2B5BC8]" strokeWidth={2} aria-hidden />
                    </a>
                  </div>

                  {/* Upload */}
                  <div className="absolute left-[186px] top-[438px] w-[220px] h-[68px] bg-[#0e0c0c] rounded-[16px] shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)] flex items-center justify-center px-[24px]">
                    <p className="text-[14px] font-medium text-white leading-[normal] text-center">
                      Upload Files
                    </p>
                  </div>

                  {/* Structured Business Data */}
                  <div className="absolute left-[186px] top-[520px] w-[220px] h-[68px] bg-[#4C7BEA] rounded-[16px] shadow-[0_12px_18px_rgba(0,0,0,0.14),0_4px_8px_rgba(0,0,0,0.1)] flex items-center justify-center px-[24px]">
                    <p className="text-[14px] font-medium text-white leading-[normal] text-center">
                      Structured Business Data
                    </p>
                  </div>

                  {/* Arrow icon between cards */}
                  <div
                    className="absolute left-[280px] top-[496px] z-20 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white text-[#0e0c0c] shadow-[0_8px_14px_rgba(0,0,0,0.18)]"
                    aria-hidden
                  >
                    <ArrowDown className="h-5 w-5" strokeWidth={1.9} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop/Figma-accurate hero */}
        <div className="hidden lg:block">
          <div className="relative mx-auto w-full max-w-[1510px] h-[832px]">
            {/* Left headline + CTA — aligned with navbar via calc */}
            <div className="absolute left-[max(calc((100%-1280px)/2+24px),24px)] top-1/2 -translate-y-[55%] z-10 max-w-[400px]">
              <motion.h1
                className="font-medium text-[42px] leading-[1.1] tracking-[-0.02em] text-[#0e0c0c]"
                initial={heroTextEnter}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.02, ease: heroEase }}
              >
                An AI agent you can train to run your operations
              </motion.h1>
              <motion.p
                className="mt-6 text-[16px] leading-[1.6] text-[#0e0c0c]/60 max-w-[340px]"
                initial={heroTextEnter}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.48, delay: 0.1, ease: heroEase }}
              >
                Turn documents, approvals, and company knowledge into automated workflows.
              </motion.p>
              <motion.div
                className="mt-10 flex items-center gap-3"
                initial={heroTextEnter}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.48, delay: 0.18, ease: heroEase }}
              >
                <Btn
                  href="#how"
                  variant="navPrimary"
                  className="box-border w-[240px] whitespace-nowrap leading-none"
                >
                  See How It Works <ArrowRight className="h-4 w-4" />
                </Btn>
                <Btn
                  href="/api"
                  variant="secondary"
                  className="box-border h-[38px] w-[240px] px-5 text-sm whitespace-nowrap leading-none"
                >
                  Explore API <ArrowRight className="h-4 w-4" />
                </Btn>
              </motion.div>
            </div>

            {/* Gradient panel — height 750px so 82 + 750 = 832px; avoids overflow clip / angled edge at section bottom */}
            <motion.div
              className="absolute left-[633px] top-[82px] w-[879px] h-[750px] rounded-bl-[28px] rounded-tl-[28px] overflow-hidden"
              style={{
                backgroundImage:
                  /* Soften the top-right highlight to avoid the "blue dot" look */
                  "radial-gradient(420px 420px at 86% 24%, rgba(61,107,255,0.62) 0%, rgba(60,59,255,0.34) 22%, rgba(124,58,237,0.22) 44%, rgba(13,22,48,0.10) 70%, rgba(0,0,0,0) 92%), linear-gradient(137.33937931403239deg, rgb(235, 238, 255) 20%, rgba(60, 59, 255, 0.52) 46%, rgb(124, 58, 237) 78%, rgb(43, 91, 200) 100%)",
              }}
              initial={heroVisualEnter}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22, ease: heroEase }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `url("${HERO_PANEL_TEXTURE}")`,
                  backgroundSize: "220px 220px",
                  mixBlendMode: "soft-light",
                }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                      /* Removed the extra big radial blotch.
                         We keep only the primary gradient + texture layers for a smoother premium look. */
                      background: "transparent",
                      filter: "none",
                }}
                aria-hidden
              />
              <motion.div
                className="pointer-events-none absolute -left-[16%] top-[30%] h-[42%] w-[132%]"
                aria-hidden
                initial={reduceMotion ? false : { x: "-8%", opacity: 0 }}
                animate={reduceMotion ? { x: 0, opacity: 0 } : { x: "3%", opacity: 0.08 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.95, delay: 0.24, ease: heroEase }}
                style={{
                  background:
                    "linear-gradient(100deg, rgba(61,107,255,0) 0%, rgba(61,107,255,0.28) 32%, rgba(124,58,237,0.22) 56%, rgba(61,107,255,0) 100%)",
                  borderRadius: "9999px",
                  filter: "blur(20px)",
                }}
              />
            </motion.div>

            {/* Approval panel card */}
            <motion.div
              className="absolute left-[926px] top-[178px] w-[313px] h-[200px] bg-white border border-[#f3f4f6] rounded-[16px] shadow-[0px_10px_15px_rgba(0,0,0,0.1),0px_4px_6px_rgba(0,0,0,0.1)] p-[18px]"
              initial={heroCardEnter}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.48, delay: 0.34, ease: heroEase }}
            >
              <div className="flex flex-col gap-[3px]">
                <div className="text-[14px] font-medium text-[#101828]">AI Task Completed</div>
                <div className="text-[10px] font-normal text-[#6a7282]">Weekly Reconciliation</div>
              </div>

              <div className="mt-[14px] flex flex-col gap-[10px]">
                <div className="flex items-center gap-[9px]">
                  <Check className="h-[14px] w-[14px] shrink-0 text-[#2B5BC8]" strokeWidth={2.5} aria-hidden />
                  <div className="text-[11px] font-normal text-[#364153]">
                    48 transactions matched
                  </div>
                </div>
                <div className="flex items-center gap-[9px]">
                  <Check className="h-[14px] w-[14px] shrink-0 text-[#2B5BC8]" strokeWidth={2.5} aria-hidden />
                  <div className="flex-1 text-[11px] font-normal text-[#364153]">
                    Bankbook vs statement reconciliation completed
                  </div>
                </div>
              </div>

              <div className="mt-[14px] h-[1px] bg-[#f3f4f6]" />

              <div className="mt-[10px] flex gap-[10px]">
                <button
                  type="button"
                  className="flex-1 h-[26px] rounded-[6px] bg-[#2B5BC8] text-white text-[10px] font-medium"
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="flex-1 h-[26px] rounded-[6px] bg-white border border-[#d1d5dc] text-[#364153] text-[10px] font-medium"
                >
                  Request Changes
                </button>
              </div>
            </motion.div>

            {/* Warning card */}
            <motion.div
              className="absolute left-[747px] top-[400px] w-[317px] h-[77px] bg-white rounded-[13px] shadow-[0px_3px_11px_rgba(0,0,0,0.08)] flex items-center justify-center px-[14px] gap-[12px]"
              initial={heroCardEnter}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.46, delay: 0.5, ease: heroEase }}
            >
              <AlertTriangle className="h-10 w-10 shrink-0 text-amber-500" strokeWidth={1.75} aria-hidden />
              <div className="flex-1">
                <div className="text-[15px] font-medium text-[#343744] leading-[20px]">
                  2 discrepancies flagged
                </div>
                <div className="mt-[4px] text-[10px] font-normal text-[#696969] leading-[12px]">
                  Bankbook and statement mismatch detected
                </div>
                <div className="mt-[6px] text-[8px] font-normal text-[#2B5BC8]">
                  Review Discrepancies &rarr;
                </div>
              </div>
            </motion.div>

            {/* Financial summary panel */}
            <motion.div
              className="absolute left-[1082px] top-[400px] w-[318px] h-[384px] bg-white border border-[#f3f4f6] rounded-[16px] shadow-[0px_10px_15px_rgba(0,0,0,0.1),0px_4px_6px_rgba(0,0,0,0.1)] p-[19px] flex flex-col gap-[12px]"
              initial={heroCardEnter}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.52, delay: 0.78, ease: heroEase }}
            >
              <div className="flex justify-end">
                <div className="bg-[#f3f4f6] rounded-[10px] px-[12px] py-[8px] text-[12px] font-normal text-[#101828] whitespace-nowrap">
                  Generate financial summary for March.
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-[#eff6ff] rounded-[10px] px-[12px] py-[8px] text-[12px] font-normal text-[#101828] whitespace-nowrap">
                  Financial summary ready.
                </div>
              </div>

              <div className="flex-1 bg-[#f9fafb] border border-[#e5e7eb] rounded-[14px] p-[18px] relative overflow-hidden">
                <div className="text-[14px] font-semibold tracking-[-0.2px] text-[#101828]">
                  March Financial Summary
                </div>
                <div className="mt-[18px] grid grid-cols-3 gap-[16px] tabular-nums">
                  <div className="space-y-[5px]">
                    <div className="text-[11px] font-normal uppercase tracking-wider text-[#6a7282]">Revenue</div>
                    <div className="text-[18px] font-semibold text-[#101828]">{CURRENCY_FORMATTER.format(animatedRevenue)}</div>
                  </div>
                  <div className="space-y-[5px]">
                    <div className="text-[11px] font-normal uppercase tracking-wider text-[#6a7282]">Expenses</div>
                    <div className="text-[18px] font-semibold text-[#101828]">{CURRENCY_FORMATTER.format(animatedExpenses)}</div>
                  </div>
                  <div className="space-y-[5px]">
                    <div className="text-[11px] font-normal uppercase tracking-wider text-[#6a7282]">Net Profit</div>
                    <div className="text-[18px] font-semibold text-[#00a63e]">{CURRENCY_FORMATTER.format(animatedProfit)}</div>
                  </div>
                </div>
                <div className="absolute left-[15px] right-[15px] bottom-[10px] h-[120px]">
                  <svg viewBox="0 0 240 100" className="h-full w-full" aria-hidden>
                    <motion.path
                      d="M10 90 C 34 94, 50 92, 72 80 C 92 69, 112 72, 132 70 C 152 68, 170 58, 188 54 C 206 50, 220 40, 232 30"
                      fill="none"
                      stroke="#2B5BC8"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={shouldAnimateHeroNumbers ? { pathLength: 0 } : false}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.15, delay: reduceMotion ? 0 : 0.1, ease: heroEase }}
                    />
                  </svg>
                </div>
              </div>

              <a
                href="#solutions"
                className="mt-[6px] pt-[6px] border-t border-gray-200 flex items-center gap-[10px] text-[11px] font-medium text-[#2B5BC8]"
              >
                <span>View full report</span>
                <ExternalLink className="h-3 w-3 shrink-0 text-[#2B5BC8]" strokeWidth={2} aria-hidden />
              </a>
            </motion.div>

            {/* Upload / structured buttons */}
            <motion.div
              className="absolute left-[844px] top-[520px] w-[220px] h-[68px] bg-[#0e0c0c] rounded-[16px] shadow-[0px_10px_15px_rgba(0,0,0,0.1),0px_4px_6px_rgba(0,0,0,0.1)] flex items-center justify-center text-center px-[24px]"
              initial={heroCardEnter}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.62, ease: heroEase }}
            >
              <p className="text-[14px] font-medium text-white leading-[normal]">
                Upload Files
              </p>
            </motion.div>

            <motion.div
              className="absolute left-[844px] top-[602px] w-[220px] h-[68px] bg-[#4C7BEA] rounded-[16px] shadow-[0_12px_18px_rgba(0,0,0,0.14),0_4px_8px_rgba(0,0,0,0.1)] flex items-center justify-center text-center px-[24px]"
              initial={heroCardEnter}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.66, ease: heroEase }}
            >
              <p className="text-[14px] font-medium text-white leading-[normal]">
                Structured Business Data
              </p>
            </motion.div>

            <motion.div
              className="absolute left-[934px] top-[573px] z-20 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white text-[#0e0c0c] shadow-[0_8px_14px_rgba(0,0,0,0.18)]"
              initial={heroCardEnter}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.34, delay: 0.68, ease: heroEase }}
              aria-hidden
            >
              <ArrowDown className="h-5 w-5" strokeWidth={1.9} />
            </motion.div>
          </div>
        </div>

        {/* Mobile / tablet hero (large desktop uses the Figma-accurate block above) */}
        <div className="relative px-6 pb-16 lg:hidden">
          <div className="relative mx-auto max-w-[520px] pt-24 pb-8">
            <h1 className="text-[40px] font-semibold leading-[1.05] tracking-[-0.04em] text-gray-900">
              An AI agent you can train to run your operations
            </h1>
            <p className="mt-6 text-[16px] leading-[1.7] text-[#6B7280]">
              Turn documents, approvals, and company knowledge into automated workflows.
            </p>
            <div className="mt-10 flex items-center gap-3">
              <Btn
                href="#how"
                variant="primary"
                className="box-border rounded-[12px] h-[44px] w-[240px] px-7 bg-[#2B5BC8] whitespace-nowrap leading-none"
              >
                See How It Works
              </Btn>
              <Btn
                href="/api"
                variant="secondary"
                className="box-border h-[44px] w-[240px] rounded-[12px] px-7 whitespace-nowrap leading-none"
              >
                Explore API
              </Btn>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" aria-hidden />

      {/* Problem → Solution */}
      <section id="problem" className="relative py-20 md:py-24 lg:py-28 bg-[#fafafa]">
        <div className="mx-auto w-full max-w-[1280px] px-6">
          <h2 className="sr-only">Operations overview</h2>
          {/* Section intro — single paragraph; browser wraps naturally within max-width */}
          <p className="max-w-[min(900px,100%)] text-[28px] md:text-[30px] font-medium leading-[1.4] tracking-[-0.01em] text-[#111827]">
            Less manual work. More connected operations. Fewer costly mistakes.{" "}
            <span className="text-[#6B7280]">Innovate your process from the ground up</span>
          </p>

          {/* Cards — equal height for a cleaner row */}
          <div className="mt-11 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
            {[
              { icon: RefreshCw, title: "Manual Work", desc: "Automate repetitive document handling, approvals, and reconciliation." },
              { icon: Layers, title: "Connected Workflows", desc: "Unify spreadsheets, documents, and team actions in one operational flow." },
              { icon: ShieldCheck, title: "Error Prevention", desc: "Catch mismatches and missing data before they turn into costly issues." },
            ].map((card, i) => (
              <div
                key={i}
                className="group flex h-full flex-col rounded-[20px] bg-white p-8 lg:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-[#f0f0f0] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-[#e0e0e0]"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8efff]">
                  <card.icon className="h-[20px] w-[20px] text-[#2B5BC8]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[18px] font-semibold leading-[1.3] text-[#111] tracking-[-0.01em]">{card.title}</h3>
                <p className="mt-3 text-[14.5px] leading-[1.65] text-[#6B7280] max-w-[300px]">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" aria-hidden />

      {/* Who it's for / Use case — Finance, Operations, Owner */}
      <WhoItsForSection />

      <hr className="section-divider" aria-hidden />

      <HowItWorks />

      {/* Solutions — scroll section removed */}

      <hr className="section-divider" aria-hidden />

      {/* Security — concise, product-style control */}
      <section id="governance" className="bg-white py-20 md:py-24 lg:py-28">
        <div className="mx-auto w-full max-w-[1280px] px-6">
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-10 sm:px-8 md:px-10 md:py-12 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center lg:gap-12">
              {/* PRIMARY (most prominent) */}
              <div className="max-w-[520px]">
                <div className="space-y-7">
                  <div>
                    <h3 className="text-[1.6rem] font-semibold leading-[1.12] tracking-[-0.03em] text-[#0B0F1A] sm:text-[1.85rem]">
                      You <span className="text-[#2B5BC8]">control</span> your data
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#4B5563]">
                      Your files stay yours. You decide where they live and how they're used.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[1.6rem] font-semibold leading-[1.12] tracking-[-0.03em] text-[#0B0F1A] sm:text-[1.85rem]">
                      <span className="text-[#2B5BC8]">Zero</span> data retention
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#4B5563]">
                      Data is processed and immediately discarded. Nothing is stored or cached.
                    </p>
                  </div>
                </div>
              </div>

              <div className="max-w-[420px]">
                <motion.div
                  className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
                  initial={false}
                  animate={{
                    boxShadow:
                      governanceEnv === "local"
                        ? "0 18px 60px rgba(43, 91, 200, 0.12)"
                        : "0 18px 60px rgba(63, 188, 149, 0.12)",
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Soft gradient shift when toggling */}
                  <motion.div
                    aria-hidden
                    className="absolute -inset-16 opacity-70"
                    initial={false}
                    animate={
                      governanceEnv === "local"
                        ? { x: -18, y: 12, opacity: 0.8 }
                        : { x: 18, y: -10, opacity: 0.8 }
                    }
                    transition={{
                      duration: reduceMotion ? 0 : 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      background:
                        governanceEnv === "local"
                          ? "radial-gradient(ellipse 42% 36% at 30% 30%, rgba(61, 107, 255, 0.22) 0%, rgba(61, 107, 255, 0) 62%), radial-gradient(ellipse 42% 36% at 82% 72%, rgba(60, 59, 255, 0.18) 0%, rgba(60, 59, 255, 0) 62%)"
                          : "radial-gradient(ellipse 42% 36% at 70% 30%, rgba(124, 58, 237, 0.22) 0%, rgba(124, 58, 237, 0) 62%), radial-gradient(ellipse 42% 36% at 20% 70%, rgba(61, 107, 255, 0.16) 0%, rgba(61, 107, 255, 0) 62%)",
                    }}
                  />

                  <div className="relative">
                    {/* Toggle (main focus) */}
                    <div className="inline-flex w-full rounded-xl border border-gray-200 bg-gray-50 p-1">
                      {[
                        { id: "local", label: "Local" },
                        { id: "vpc", label: "VPC" },
                      ].map((opt) => {
                        const active = governanceEnv === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              setGovernanceEnv(opt.id);
                              setGovernanceUserControlled(true);
                            }}
                            className={`relative flex-1 rounded-lg px-3 py-2.5 text-[13px] font-semibold select-none transition-colors ${
                              active
                                ? "bg-[#2B5BC8] text-white"
                                : "bg-transparent text-gray-600 hover:text-gray-900"
                            }`}
                            aria-current={active ? "true" : "false"}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Live state (fade + slide) */}
                    <div className="mt-4">
                      <AnimatePresence mode="wait" initial={false}>
                        {governanceEnv === "local" ? (
                          <motion.p
                            key="gov-local-live"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{
                              duration: reduceMotion ? 0 : 0.38,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="text-[15px] font-semibold text-[#0B0F1A]"
                          >
                            Runs on your machine
                          </motion.p>
                        ) : (
                          <motion.p
                            key="gov-vpc-live"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{
                              duration: reduceMotion ? 0 : 0.38,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="text-[15px] font-semibold text-[#0B0F1A]"
                          >
                            Runs in your private cloud
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" aria-hidden />

      {/* Final CTA */}
      <section
        className="relative overflow-hidden bg-[#2B5BC8] py-24 md:py-28 lg:py-32"
      >
        {/* Figma-style ambient gradients + static dot field */}
        <div
          className="pointer-events-none absolute -left-[9%] top-[-172px] h-[928px] w-[55%]"
          style={{
            background:
              "radial-gradient(ellipse 62% 52% at 52% 48%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.08) 38%, rgba(255,255,255,0) 76%)",
            filter: "blur(4px)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-[9%] top-[-172px] h-[928px] w-[55%]"
          style={{
            background:
              "radial-gradient(ellipse 62% 52% at 48% 48%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.08) 38%, rgba(255,255,255,0) 76%)",
            filter: "blur(4px)",
          }}
          aria-hidden
        />
        <div className="cta-dark-dots" aria-hidden />
        <div className="relative flex flex-col items-center px-6 text-center">
          <h2 className="max-w-[820px] text-[2rem] font-normal leading-[1.2] tracking-tight text-white md:text-[2.5rem] lg:text-[3rem]">
            Stay focused on growth, we&apos;ll help you prevent operation risks
          </h2>
          <a
            href="#contact"
            className="mt-10 inline-flex h-[50px] items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-[#111827] transition-colors hover:bg-[#f2f5ff]"
          >
            Book a Demo
          </a>
        </div>
      </section>

      <hr className="section-divider" aria-hidden />

      {/* Footer */}
      <footer id="contact" className="bg-white pt-16 pb-8">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,min(100%,28rem))] lg:items-start lg:justify-between lg:gap-16">
            {/* Logo column */}
            <div className="max-w-md">
              <div className="flex items-center gap-2">
                <OmnigenceLogo size={28} decorative />
                <span className="text-sm font-semibold text-gray-900">Omnigence</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-700">
                Workflow checks with review-before-run control.
              </p>
            </div>

            {/* Important links + Contact — grouped on the right */}
            <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:max-w-xl lg:justify-self-end">
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Important links</h4>
                <nav className="mt-4 flex flex-col gap-3" aria-label="Footer navigation">
                  <a href="#product" className="text-sm text-gray-700 transition-colors hover:text-[#2B5BC8]">
                    Product
                  </a>
                  <a href="#how" className="text-sm text-gray-700 transition-colors hover:text-[#2B5BC8]">
                    How it works
                  </a>
                  <a href="#governance" className="text-sm text-gray-700 transition-colors hover:text-[#2B5BC8]">
                    Security
                  </a>
                </nav>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Contact</h4>
                <a
                  href="mailto:omnigence.ai@gmail.com"
                  className="mt-4 block text-sm text-gray-700 transition-colors hover:text-[#2B5BC8]"
                >
                  hello@omnigence.ai
                </a>
                <input
                  type="email"
                  placeholder="Your email"
                  className="mt-4 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-[#2B5BC8] focus:ring-1 focus:ring-[#2B5BC8]"
                />
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gray-300 pt-6 text-xs text-gray-600 sm:flex-row">
            <span>Copyright &copy; omnigence {new Date().getFullYear()}</span>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-gray-900">Privacy Policy</a>
              <a href="#" className="transition-colors hover:text-gray-900">Terms &amp; Conditions</a>
            </div>
          </div>
        </Container>
      </footer>
    </main>
  );
}
