/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Book.tsx — Serendipity Yacht Charter Booking Page
 * "Book Now" flow → this page → Payment.tsx
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ArrowUpRight,
  Check,
  Clock,
  Users,
  Anchor,
  Star,
  MapPin,
  Phone,
  Lock,
  CreditCard,
  Ship,
  Utensils,
  Wifi,
  Shield,
  ChevronDown,
  DollarSign,
  Calendar,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CharterRate {
  id: string;
  name: string;
  price: string;
  numPrice: number;
  duration: string;
  nights: string;
  guests: string;
  highlights: string[];
  popular?: boolean;
  tag?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const CHARTER_RATES: CharterRate[] = [
  {
    id: "day-trip",
    name: "Day Trip",
    price: "$10,000",
    numPrice: 10000,
    duration: "10am – 6pm",
    nights: "0",
    guests: "Up to 12",
    tag: "Most Flexible",
    highlights: [
      "2 Jet Skis included",
      "16' Nautica RIB tender",
      "Local beaches & islands",
      "Restaurant stops",
    ],
  },
  {
    id: "weekend",
    name: "Weekend Getaway",
    price: "$20,000",
    numPrice: 20000,
    duration: "Fri noon – Sun 3pm",
    nights: "2",
    guests: "Up to 8",
    popular: true,
    tag: "Most Popular",
    highlights: [
      "3 days / 2 nights",
      "4 private staterooms",
      "Sarasota to Tarpon Springs range",
      "Full crew included",
    ],
  },
  {
    id: "full-week",
    name: "Full Week",
    price: "$35,000",
    numPrice: 35000,
    duration: "Mon noon – Sun 3pm",
    nights: "6",
    guests: "Up to 8",
    tag: "Best Value",
    highlights: [
      "7 days / 6 nights",
      "4 private staterooms",
      "Key West to Destin FL range",
      "Full crew & private chef",
    ],
  },
];

const SPECIAL_RATES = [
  {
    id: "corporate",
    name: "Corporate Events",
    price: "$15,000",
    numPrice: 15000,
    desc: "Up to 25 guests for cocktails & hors d'oeuvres. 6-hour cruise with waterfront restaurant catering.",
  },
  {
    id: "birthday",
    name: "Birthdays & Anniversaries",
    price: "$7,500",
    numPrice: 7500,
    desc: "Up to 10 guests for 6-hour sunset cruise. Themed décor, cocktails & culinary choices.",
  },
  {
    id: "culinary",
    name: "Culinary & Wine Events",
    price: "$7,500",
    numPrice: 7500,
    desc: "Private chef-prepared meal for up to 8 guests on a 6-hour dinner cruise.",
  },
  {
    id: "sunset",
    name: "Sunset Cruise (Custom)",
    price: "Custom",
    numPrice: 0,
    desc: "Tailored pricing for a romantic sunset on the Gulf Coast. Contact us for details.",
  },
];

const VESSEL_STATS = [
  { val: "94 ft", label: "Lazzara" },
  { val: "12", label: "Max Guests" },
  { val: "4", label: "Staterooms" },
  { val: "5.0★", label: "Rating" },
];

const HERO_IMAGES = [
  "assets/hero1.png",
  "assets/hero2.png",
  "assets/hero3.png",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function navigateToPayment(data: {
  name: string;
  email: string;
  eventType: string;
  amount: string;
}) {
  const params = new URLSearchParams({
    name: data.name,
    email: data.email,
    eventType: data.eventType,
    amount: data.amount,
  });
  window.location.href = `/payment?${params.toString()}`;
}

// ─── Step Indicator ───────────────────────────────────────────────────────────
function StepIndicator({ step }: { step: number }) {
  const steps = ["Select Package", "Your Details", "Confirm & Pay"];
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                i < step
                  ? "bg-[#c9a227] text-[#040d1a]"
                  : i === step
                  ? "bg-[#c9a227]/20 border-2 border-[#c9a227] text-[#c9a227]"
                  : "bg-white/5 border border-white/15 text-white/25"
              }`}
            >
              {i < step ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={`text-[8px] font-bold uppercase tracking-wider mt-1.5 whitespace-nowrap ${
                i <= step ? "text-[#c9a227]" : "text-white/20"
              }`}
            >
              {s}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`flex-1 h-[1px] mx-2 transition-all duration-700 ${
                i < step ? "bg-[#c9a227]" : "bg-white/10"
              }`}
              style={{ minWidth: 20 }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Rate Card ────────────────────────────────────────────────────────────────
function RateCard({
  rate,
  selected,
  onSelect,
}: {
  rate: CharterRate;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ${
        selected
          ? "border-2 border-[#c9a227] shadow-2xl shadow-[#c9a227]/20"
          : "border border-white/10 hover:border-white/25"
      }`}
      style={{
        background: selected
          ? "linear-gradient(145deg, rgba(201,162,39,0.12) 0%, rgba(4,13,26,0.95) 100%)"
          : "rgba(255,255,255,0.04)",
      }}
    >
      {rate.popular && (
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <span className="text-[9px] font-bold uppercase tracking-widest px-5 py-1.5 rounded-b-xl bg-[#c9a227] text-[#040d1a]">
            Most Popular
          </span>
        </div>
      )}
      {!rate.popular && rate.tag && (
        <div className="absolute top-4 right-4">
          <span className="text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/8 border border-white/15 text-white/40">
            {rate.tag}
          </span>
        </div>
      )}
      <div className={`p-6 ${rate.popular ? "pt-10" : ""}`}>
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-serif text-lg">{rate.name}</h3>
          {selected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-6 h-6 rounded-full bg-[#c9a227] flex items-center justify-center"
            >
              <Check className="w-3.5 h-3.5 text-[#040d1a]" />
            </motion.div>
          )}
        </div>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-3xl font-serif text-[#c9a227] font-bold">
            {rate.price}
          </span>
          <span className="text-white/30 text-xs">/ charter</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-1 text-white/40 text-[10px] bg-white/5 rounded-full px-2.5 py-1 border border-white/8">
            <Clock className="w-3 h-3 text-[#c9a227]/60" /> {rate.duration}
          </div>
          <div className="flex items-center gap-1 text-white/40 text-[10px] bg-white/5 rounded-full px-2.5 py-1 border border-white/8">
            <Users className="w-3 h-3 text-[#c9a227]/60" /> {rate.guests}
          </div>
          {rate.nights !== "0" && (
            <div className="flex items-center gap-1 text-white/40 text-[10px] bg-white/5 rounded-full px-2.5 py-1 border border-white/8">
              <Anchor className="w-3 h-3 text-[#c9a227]/60" /> {rate.nights} nights
            </div>
          )}
        </div>
        <div className="space-y-2">
          {rate.highlights.map((h, j) => (
            <div key={j} className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  selected ? "bg-[#c9a227]/20" : "bg-white/8"
                }`}
              >
                <Check
                  className={`w-2.5 h-2.5 ${
                    selected ? "text-[#c9a227]" : "text-white/30"
                  }`}
                />
              </div>
              <span className="text-xs text-white/50">{h}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Special Rate Card ────────────────────────────────────────────────────────
function SpecialRateCard({
  rate,
  selected,
  onSelect,
}: {
  rate: (typeof SPECIAL_RATES)[0];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
        selected
          ? "border-2 border-[#c9a227] bg-[#c9a227]/8 shadow-lg shadow-[#c9a227]/10"
          : "border border-white/8 bg-white/3 hover:border-white/20"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {selected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-4 h-4 rounded-full bg-[#c9a227] flex items-center justify-center flex-shrink-0"
              >
                <Check className="w-2.5 h-2.5 text-[#040d1a]" />
              </motion.div>
            )}
            <h4 className="font-serif text-sm">{rate.name}</h4>
          </div>
          <p className="text-[10px] text-white/40 leading-relaxed">{rate.desc}</p>
        </div>
        <span
          className={`font-bold font-serif text-base flex-shrink-0 ${
            selected ? "text-[#c9a227]" : "text-white/60"
          }`}
        >
          {rate.price}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Main Book Page ───────────────────────────────────────────────────────────
export default function BookPage() {
  const [step, setStep] = useState(0);
  const [selectedRateId, setSelectedRateId] = useState<string | null>(null);
  const [showSpecial, setShowSpecial] = useState(false);
  const [heroIdx, setHeroIdx] = useState(0);

  // Step 2 fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto-cycle hero
  useEffect(() => {
    const t = setInterval(() => setHeroIdx((p) => (p + 1) % HERO_IMAGES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const allRates = [
    ...CHARTER_RATES.map((r) => ({ ...r, isSpecial: false })),
    ...SPECIAL_RATES.map((r) => ({
      ...r,
      isSpecial: true,
      duration: "",
      nights: "0",
      guests: "",
      highlights: [],
    })),
  ];

  const selected =
    allRates.find((r) => r.id === selectedRateId) ?? null;

  const selectedPrice =
    selected && selected.price !== "Custom" ? selected.price : "";

  const handleProceedToDetails = () => {
    if (!selectedRateId) return;
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConfirmPayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigateToPayment({
        name: `${firstName} ${lastName}`,
        email,
        eventType: selected?.name ?? "Charter",
        amount: selected?.numPrice ? String(selected.numPrice) : "0",
      });
    }, 600);
  };

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "#040d1a", fontFamily: "serif" }}
    >
      {/* Fixed bg gradient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-[180px]" style={{ background: "radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[150px]" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)" }} />
      </div>

      {/* Navbar */}
      <nav
        className="relative z-50 flex items-center justify-between px-6 md:px-16 py-4 border-b border-white/5"
        style={{ background: "rgba(4,13,26,0.9)", backdropFilter: "blur(24px)" }}
      >
        <a href="/" className="group">
          <img
            src="assets/logo.png"
            alt="Serendipity"
            className="h-12 w-auto group-hover:scale-105 transition-transform"
          />
        </a>
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Site
          </a>
          <a
            href="/reservation"
            className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/15 text-white/50 text-xs font-bold uppercase tracking-widest hover:border-[#c9a227]/40 hover:text-[#c9a227] transition-all"
          >
            Inquire Instead
          </a>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative z-10 overflow-hidden">
        <div className="relative h-[280px] md:h-[360px]">
          <AnimatePresence mode="wait">
            <motion.img
              key={heroIdx}
              src={HERO_IMAGES[heroIdx]}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
              className="absolute inset-0 w-full h-full object-cover object-top"
              alt="Serendipity"
            />
          </AnimatePresence>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(4,13,26,0.55) 0%, rgba(4,13,26,0.25) 40%, rgba(4,13,26,1) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(4,13,26,0.8) 0%, transparent 60%)",
            }}
          />

          <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-[1px] bg-[#c9a227]" />
                <span className="text-[9px] font-bold tracking-[3px] uppercase text-[#c9a227]">
                  Saint Petersburg, FL
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif leading-tight mb-2">
                Book Your Charter
                <br />
                <em className="text-[#c9a227] italic">Experience</em>
              </h1>
              <p className="text-sm text-white/55 max-w-sm">
                Select your package, fill your details, and proceed directly to
                payment.
              </p>
            </motion.div>
          </div>

          {/* Vessel stats */}
          <div className="absolute bottom-4 right-6 md:right-16 flex items-center gap-0 bg-[#040d1a]/70 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
            {VESSEL_STATS.map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center px-4 py-2.5"
                style={{
                  borderRight:
                    i < VESSEL_STATS.length - 1
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "none",
                }}
              >
                <span className="text-sm font-serif text-[#c9a227] font-bold leading-none">
                  {s.val}
                </span>
                <span className="text-[8px] uppercase tracking-[1.5px] text-white/35 mt-1">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <StepIndicator step={step} />

        <AnimatePresence mode="wait">
          {/* ── STEP 0: Select Package ── */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-[1.5px] bg-[#c9a227]" />
                  <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-[#c9a227]">
                    Charter Packages
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif">
                  Choose Your Package
                </h2>
                <p className="text-white/40 text-sm mt-1">
                  Select a charter type to continue to booking.
                </p>
              </div>

              {/* Main charter rates */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {CHARTER_RATES.map((rate) => (
                  <RateCard
                    key={rate.id}
                    rate={rate}
                    selected={selectedRateId === rate.id}
                    onSelect={() => setSelectedRateId(rate.id)}
                  />
                ))}
              </div>

              {/* Special rates accordion */}
              <div className="border border-white/10 rounded-3xl overflow-hidden mb-8">
                <button
                  onClick={() => setShowSpecial((p) => !p)}
                  className="w-full flex items-center justify-between p-5 hover:bg-white/3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/20 flex items-center justify-center">
                      <Star className="w-4 h-4 text-[#c9a227]" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-base font-serif">
                        Special Events & Occasions
                      </h3>
                      <p className="text-[10px] text-white/30 mt-0.5">
                        Corporate, celebrations & culinary
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-white/40 transition-transform duration-300 ${
                      showSpecial ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {showSpecial && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {SPECIAL_RATES.map((r) => (
                          <SpecialRateCard
                            key={r.id}
                            rate={r}
                            selected={selectedRateId === r.id}
                            onSelect={() => setSelectedRateId(r.id)}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Proceed CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl border border-white/10 bg-white/3">
                <div>
                  {selected ? (
                    <div>
                      <p className="text-[10px] text-white/35 uppercase tracking-widest mb-0.5">
                        Selected Package
                      </p>
                      <p className="font-serif text-base">
                        {selected.name} —{" "}
                        <span className="text-[#c9a227]">{selected.price}</span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-white/35 text-sm">
                      ← Select a package above to continue
                    </p>
                  )}
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleProceedToDetails}
                  disabled={!selectedRateId}
                  className="flex items-center gap-2 px-8 py-4 bg-[#c9a227] text-[#040d1a] font-bold rounded-xl text-sm transition-all shadow-xl shadow-[#c9a227]/20 disabled:opacity-30 disabled:cursor-not-allowed hover:translate-y-[-2px] active:scale-95"
                >
                  Continue to Details{" "}
                  <ArrowUpRight className="w-4 h-4" />
                </motion.button>
              </div>

              <p className="text-center text-white/20 text-[10px] mt-4">
                * All rates include captain and crew. Fuel, food, and gratuity not
                included.
              </p>
            </motion.div>
          )}

          {/* ── STEP 1: Your Details ── */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-[1.5px] bg-[#c9a227]" />
                    <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-[#c9a227]">
                      Your Information
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif">
                    Your Details
                  </h2>
                </div>
                <button
                  onClick={() => setStep(0)}
                  className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs transition-colors mt-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>

              {/* Selected package recap */}
              {selected && (
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#c9a227]/8 border border-[#c9a227]/20 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#c9a227]/15 flex items-center justify-center">
                      <Ship className="w-4 h-4 text-[#c9a227]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">{selected.name}</p>
                      <p className="text-[10px] text-white/40">
                        {(selected as CharterRate).duration || "Custom"} ·{" "}
                        {(selected as CharterRate).guests || "Contact for details"}
                      </p>
                    </div>
                  </div>
                  <span className="text-[#c9a227] font-bold font-serif text-lg">
                    {selected.price}
                  </span>
                </div>
              )}

              <form
                onSubmit={handleProceedToPayment}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {/* First Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-[1.5px] uppercase text-white/30">
                    First Name <span className="text-[#c9a227]">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#c9a227] rounded-xl px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-white/20"
                    style={{ fontFamily: "sans-serif" }}
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-[1.5px] uppercase text-white/30">
                    Last Name <span className="text-[#c9a227]">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#c9a227] rounded-xl px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-white/20"
                    style={{ fontFamily: "sans-serif" }}
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-[1.5px] uppercase text-white/30">
                    Email Address <span className="text-[#c9a227]">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#c9a227] rounded-xl px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-white/20"
                    style={{ fontFamily: "sans-serif" }}
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-[1.5px] uppercase text-white/30">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 000-0000"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#c9a227] rounded-xl px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-white/20"
                    style={{ fontFamily: "sans-serif" }}
                  />
                </div>

                {/* Preferred Date */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-[1.5px] uppercase text-white/30">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#c9a227] rounded-xl px-4 py-3.5 text-sm outline-none transition-colors text-white/60 [color-scheme:dark]"
                    style={{ fontFamily: "sans-serif" }}
                  />
                </div>

                {/* Guest Count */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-[1.5px] uppercase text-white/30">
                    Number of Guests
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#c9a227] rounded-xl px-4 py-3.5 text-sm outline-none transition-colors appearance-none cursor-pointer text-white/60"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    <option value="" className="bg-[#040d1a]">
                      Select guests
                    </option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n} className="bg-[#040d1a]">
                        {n} {n === 1 ? "guest" : "guests"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message — full width */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[10px] font-bold tracking-[1.5px] uppercase text-white/30">
                    Special Requests / Notes
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Dietary needs, special occasions, destination preferences…"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#c9a227] rounded-xl px-4 py-3.5 text-sm outline-none transition-colors resize-none placeholder:text-white/20"
                    style={{ fontFamily: "sans-serif" }}
                  />
                </div>

                {/* Proceed button */}
                <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <p className="text-[10px] text-white/25 flex items-center gap-1.5">
                    <Lock className="w-3 h-3" /> 256-bit SSL secured checkout
                  </p>
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-8 py-4 bg-[#c9a227] text-[#040d1a] font-bold rounded-xl text-sm transition-all shadow-xl shadow-[#c9a227]/20 hover:translate-y-[-2px]"
                  >
                    <CreditCard className="w-4 h-4" /> Review & Pay
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}

          {/* ── STEP 2: Confirm & Pay ── */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-[1.5px] bg-[#c9a227]" />
                    <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-[#c9a227]">
                      Review Order
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif">
                    Confirm & Pay
                  </h2>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs transition-colors mt-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Order Summary */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">
                    Order Summary
                  </h3>

                  {/* Charter */}
                  <div className="p-5 rounded-2xl border border-white/10 bg-white/3 space-y-3">
                    <div className="flex items-center gap-3 pb-3 border-b border-white/8">
                      <div className="w-10 h-10 rounded-xl bg-[#c9a227]/10 flex items-center justify-center">
                        <Ship className="w-5 h-5 text-[#c9a227]" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{selected?.name}</p>
                        <p className="text-[10px] text-white/35">
                          Serendipity — 94' Lazzara
                        </p>
                      </div>
                    </div>

                    {[
                      {
                        label: "Guest",
                        value: `${firstName} ${lastName}`,
                        icon: Users,
                      },
                      { label: "Email", value: email, icon: null },
                      {
                        label: "Date",
                        value: preferredDate || "TBD",
                        icon: Calendar,
                      },
                      {
                        label: "Guests",
                        value: guestCount ? `${guestCount} guests` : "TBD",
                        icon: Users,
                      },
                      {
                        label: "Duration",
                        value:
                          (selected as CharterRate)?.duration ||
                          "Custom — contact us",
                        icon: Clock,
                      },
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className="text-white/35">{row.label}</span>
                        <span
                          className="text-white/70 text-right max-w-[60%] truncate"
                          style={{ fontFamily: "sans-serif" }}
                        >
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Price breakdown */}
                  <div className="p-5 rounded-2xl border border-[#c9a227]/20 bg-[#c9a227]/5 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Charter Base Rate</span>
                      <span className="font-bold">{selected?.price}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/30">CC Surcharge (2.5%)</span>
                      <span className="text-white/40">
                        {selected?.numPrice
                          ? `+$${(selected.numPrice * 0.025).toLocaleString(
                              "en-US",
                              { minimumFractionDigits: 2 }
                            )}`
                          : "Calculated at payment"}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-[#c9a227]/20 flex justify-between">
                      <span className="text-white/60 text-sm font-bold">
                        Total (with CC)
                      </span>
                      <span className="text-[#c9a227] font-bold font-serif text-xl">
                        {selected?.numPrice
                          ? `$${(selected.numPrice * 1.025).toLocaleString(
                              "en-US",
                              { minimumFractionDigits: 2 }
                            )}`
                          : selected?.price}
                      </span>
                    </div>
                    <p className="text-[9px] text-white/25">
                      No surcharge for ACH (eCheck) payments — save{" "}
                      {selected?.numPrice
                        ? `$${(selected.numPrice * 0.025).toLocaleString()}`
                        : ""}
                    </p>
                  </div>

                  {/* Inclusions */}
                  {"highlights" in (selected ?? {}) &&
                    (selected as CharterRate).highlights?.length > 0 && (
                      <div className="p-4 rounded-2xl border border-white/8 bg-white/3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2.5">
                          Included
                        </p>
                        <div className="space-y-2">
                          {(selected as CharterRate).highlights.map((h, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-[#c9a227] flex-shrink-0" />
                              <span className="text-xs text-white/50">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>

                {/* Payment CTA */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">
                    Payment
                  </h3>

                  <div className="p-5 rounded-2xl border border-white/10 bg-white/3 space-y-4">
                    <p className="text-sm text-white/60 leading-relaxed">
                      You'll be directed to our secure payment page where you
                      can pay by credit card or ACH (eCheck). ACH has no
                      surcharge.
                    </p>

                    <div className="space-y-2.5">
                      {[
                        "256-bit SSL encrypted",
                        "PCI DSS compliant",
                        "Credit card & ACH accepted",
                        "Confirmation within 24 hours",
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-white/40">
                          <Shield className="w-3.5 h-3.5 text-[#c9a227]/60 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleConfirmPayment}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#c9a227] to-[#d4b445] text-[#040d1a] font-bold rounded-xl text-sm transition-all shadow-xl shadow-[#c9a227]/20 hover:translate-y-[-2px] disabled:opacity-50 disabled:translate-y-0"
                    >
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-4 h-4 border-2 border-[#040d1a]/30 border-t-[#040d1a] rounded-full"
                          />
                          Preparing Payment…
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          Proceed to Secure Payment
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-[9px] text-white/20 flex items-center justify-center gap-1.5">
                      <Lock className="w-3 h-3" /> Secured by 256-bit SSL
                      encryption
                    </p>
                  </div>

                  {/* Contact */}
                  <div className="p-4 rounded-2xl border border-white/8 bg-white/3">
                    <p className="text-[10px] text-white/25 uppercase tracking-widest mb-3 font-bold">
                      Questions? Call Us
                    </p>
                    <div className="flex flex-col gap-2">
                      <a
                        href="tel:4124182968"
                        className="flex items-center gap-2 text-sm text-white/45 hover:text-[#c9a227] transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#c9a227]/60" />{" "}
                        Jake: 412-418-2968
                      </a>
                      <a
                        href="tel:7276449653"
                        className="flex items-center gap-2 text-sm text-white/45 hover:text-[#c9a227] transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#c9a227]/60" />{" "}
                        Bryon: 727-644-9653
                      </a>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-white/8 bg-white/3">
                    <p className="text-[10px] text-white/25 uppercase tracking-widest mb-2 font-bold">
                      Location
                    </p>
                    <div className="flex items-start gap-2 text-xs text-white/40">
                      <MapPin className="w-3.5 h-3.5 text-[#c9a227]/60 mt-0.5 flex-shrink-0" />
                      <span>
                        Maximo Marina, 3701 50 Ave S.
                        <br />
                        Saint Petersburg, FL
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer
        className="relative z-10 border-t border-white/5 py-8 px-6 md:px-16 mt-10"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 2rem)" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-white/20 uppercase tracking-widest">
          <p>© 2025 Serendipity Yacht Charter. All Rights Reserved.</p>
          <div className="flex gap-5">
            <a href="/reservation" className="hover:text-[#c9a227] transition-colors">
              Inquire
            </a>
            <a href="/" className="hover:text-[#c9a227] transition-colors">
              Home
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}