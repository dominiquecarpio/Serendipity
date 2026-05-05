/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Reservation Page — Serendipity Yacht Charter
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  Ship,
  Users,
  Clock,
  Anchor,
  Check,
  ArrowUpRight,
  Phone,
  MapPin,
  CreditCard,
  Lock,
  Star,
  ChevronLeft,
  X,
  Calendar,
  Utensils,
  Wifi,
  Shield,
} from "lucide-react";

// --- Types ---
interface TabType {
  id: "day" | "overnight";
  label: string;
}

// --- Constants ---
const TABS: TabType[] = [
  { id: "day", label: "Single Day Tours" },
  { id: "overnight", label: "Multiple Day Tours" },
];

const DAY_CHARTERS = [
  {
    hours: "4 Hours",
    time: "Sat/Sun 10am - 2pm",
    price: "$2,500",
    perPerson: null,
  },
  {
    hours: "6 Hours",
    time: "Sat/Sun 10am - 4pm",
    price: "$3,500",
    perPerson: null,
  },
  {
    hours: "10 Hours",
    time: "Sat/Sun 8am - 6pm",
    price: "$7,500",
    perPerson: null,
  },
];

const OVERNIGHT_CHARTERS = [
  { days: "2 Days", nights: "1 Night", price: "$10,000", perNight: "$10,000/night" },
  { days: "3 Days", nights: "2 Nights", price: "$20,000", perNight: "$10,000/night" },
  { days: "5 Days", nights: "4 Nights", price: "$30,000", perNight: "$7,500/night" },
  { days: "6 Days", nights: "5 Nights", price: "$35,000", perNight: "$7,000/night" },
  { days: "7 Days", nights: "6 Nights", price: "$38,000", perNight: "$6,300/night" },
];

const CREW_OPTIONS = [
  { label: "Crew: $250/day" },
  { label: "Bartender: $200/day" },
  { label: "Chef: Pricing negotiated directly" },
];

const CHARTER_POLICIES = [
  "All fees including fuel shown at checkout",
  "Max outer speed: 12 knots",
  "Max capacity: Charter = 12 guests (13 total)",
  "Crew gratuity (recommended) approx 15–25%",
  "Special events (NYE, July 4th, etc.) may require higher minimum",
];

const VESSEL_IMAGES = [
  "assets/occasion1.png",
  "assets/occasion2.png",
  "assets/occasion3.png",
  "assets/occasion4.png",
];

const AMENITIES = [
  { icon: Wifi, label: "High-Speed WiFi" },
  { icon: Utensils, label: "Full Galley" },
  { icon: Shield, label: "Licensed Captain" },
  { icon: Users, label: "Professional Crew" },
  { icon: Anchor, label: "Water Sports Gear" },
  { icon: Star, label: "5-Star Service" },
];

// --- Main Reservation Page ---
export default function ReservationPage() {
  const [activeTab, setActiveTab] = useState<"day" | "overnight">("day");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [crewOption, setCrewOption] = useState("");
  const [additionalReq, setAdditionalReq] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#040d1a] text-white font-sans selection:bg-[#c9a227] selection:text-[#040d1a]">
      {/* Background texture */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#040d1a] via-[#071224] to-[#040d1a]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c9a227]/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-16 py-5 border-b border-white/5 bg-[#040d1a]/80 backdrop-blur-2xl">
        <a href="/" className="flex items-center gap-3 group">
          <img src="assets/logo.png" alt="Serendipity" className="h-12 w-auto group-hover:scale-105 transition-transform" />
        </a>
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Main Site
          </a>
          <a href="#reservation-form" className="hidden md:flex bg-[#c9a227] px-6 py-2.5 rounded-full text-[#040d1a] font-bold text-xs hover:translate-y-[-2px] transition-all shadow-lg shadow-[#c9a227]/20">
            Reserve Now
          </a>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="relative z-10 overflow-hidden">
        <div className="relative h-[340px] md:h-[420px]">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImg}
              src={VESSEL_IMAGES[activeImg]}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Serendipity Yacht"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-[#040d1a]/60 via-[#040d1a]/30 to-[#040d1a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#040d1a]/80 to-transparent" />

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 pb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-[1px] bg-[#c9a227]" />
                <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-[#c9a227]">Saint Petersburg, FL</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif leading-tight mb-3">
                Reserve Your Luxury<br />
                <em className="text-[#c9a227] italic">Yacht Experience</em>
              </h1>
              <p className="text-sm md:text-base text-white/60 max-w-md">
                Set sail aboard the Serendipity Motor Yacht — where every journey is tailored for elegance, comfort, and unforgettable memories.
              </p>
            </motion.div>
          </div>

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex gap-2 z-10">
            {VESSEL_IMAGES.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-14 h-10 md:w-20 md:h-14 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImg === i ? "border-[#c9a227]" : "border-white/10 opacity-60 hover:opacity-80"
                }`}
              >
                <img src={img} className="w-full h-full object-cover" alt="" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 md:gap-16">

        {/* LEFT — Charter Rates Info */}
        <div>
          {/* Amenities strip */}
          <div className="flex flex-wrap gap-3 mb-10">
            {AMENITIES.map((a, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/8 rounded-full text-xs text-white/60">
                <a.icon className="w-3.5 h-3.5 text-[#c9a227]" />
                {a.label}
              </div>
            ))}
          </div>

          {/* Charter Rates Heading */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-[1.5px] bg-[#c9a227]" />
              <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-[#c9a227]">Charter Pricing</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-serif">Charter Rates</h2>
            <p className="text-white/40 text-sm mt-2 max-w-lg">Our rates include the vessel, Captain, and Mate. Additional expenses apply for food, beverages, fuel, and dockage (when applicable).</p>
          </div>

          {/* Day / Overnight columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Day Charters */}
            <div className="p-6 bg-white/4 border border-white/8 rounded-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-[#c9a227]/15 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[#c9a227]" />
                </div>
                <h3 className="font-serif text-lg">Day Charters</h3>
              </div>
              <div className="space-y-3">
                {DAY_CHARTERS.map((r, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/4 rounded-xl border border-white/6 hover:border-[#c9a227]/20 transition-all group">
                    <div>
                      <p className="text-sm font-semibold group-hover:text-[#c9a227] transition-colors">{r.hours}</p>
                      <p className="text-[10px] text-white/35 mt-0.5">{r.time}</p>
                    </div>
                    <span className="text-[#c9a227] font-bold font-serif text-base">{r.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Overnight Charters */}
            <div className="p-6 bg-white/4 border border-white/8 rounded-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-[#c9a227]/15 flex items-center justify-center">
                  <Anchor className="w-4 h-4 text-[#c9a227]" />
                </div>
                <h3 className="font-serif text-lg">Overnight Charters</h3>
              </div>
              <div className="space-y-3">
                {OVERNIGHT_CHARTERS.map((r, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/4 rounded-xl border border-white/6 hover:border-[#c9a227]/20 transition-all group">
                    <div>
                      <p className="text-sm font-semibold group-hover:text-[#c9a227] transition-colors">{r.days} / {r.nights}</p>
                      <p className="text-[10px] text-white/35 mt-0.5">{r.perNight}</p>
                    </div>
                    <span className="text-[#c9a227] font-bold font-serif text-base">{r.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Crew Options */}
            <div className="p-6 bg-white/4 border border-white/8 rounded-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-[#c9a227]/15 flex items-center justify-center">
                  <Users className="w-4 h-4 text-[#c9a227]" />
                </div>
                <h3 className="font-serif text-lg">Additional Crew Options</h3>
              </div>
              <div className="space-y-3">
                {CREW_OPTIONS.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white/4 rounded-xl border border-white/6">
                    <Check className="w-3.5 h-3.5 text-[#c9a227] shrink-0" />
                    <span className="text-sm text-white/70">{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Charter Policies */}
            <div className="p-6 bg-white/4 border border-white/8 rounded-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-[#c9a227]/15 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-[#c9a227]" />
                </div>
                <h3 className="font-serif text-lg">Charter Policies</h3>
              </div>
              <div className="space-y-2.5">
                {CHARTER_POLICIES.map((p, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-white/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c9a227]/60 mt-1.5 shrink-0" />
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Your Voyage Awaits */}
          <div className="p-8 md:p-10 bg-gradient-to-br from-[#c9a227]/10 to-blue-500/5 border border-[#c9a227]/20 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl mb-3">Your Voyage Awaits</h3>
              <p className="text-white/50 text-sm max-w-md leading-relaxed">
                From sunrise cruises to weeklong escapes, every charter is tailored to you. Let us handle the details — your only job is to relax, indulge, and create lasting memories.
              </p>
            </div>
            <a href="#reservation-form"
              className="shrink-0 flex items-center gap-2 px-8 py-4 bg-[#c9a227] text-[#040d1a] font-bold rounded-xl text-sm hover:translate-y-[-2px] transition-all shadow-xl shadow-[#c9a227]/20">
              Reserve Now <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* RIGHT — Reservation Form */}
        <div id="reservation-form" className="lg:sticky lg:top-8 self-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#071224]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl"
          >
            {/* Form Header */}
            <div className="p-6 md:p-8 border-b border-white/8">
              <h2 className="text-xl md:text-2xl font-serif mb-1">Start Your Reservation</h2>
              <p className="text-white/35 text-xs">Fill in details below and we'll confirm within 24 hours</p>
            </div>

            {/* Tab Toggle */}
            <div className="flex border-b border-white/8">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === tab.id
                      ? "text-[#c9a227] border-b-2 border-[#c9a227] bg-[#c9a227]/5"
                      : "text-white/35 hover:text-white/60"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-[1.5px] uppercase text-white/30">Full Name</label>
                <input
                  required
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#c9a227] rounded-xl px-4 py-3 text-sm outline-none transition-colors placeholder:text-white/20"
                />
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-[1.5px] uppercase text-white/30">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 000-0000"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#c9a227] rounded-xl px-3 py-3 text-sm outline-none transition-colors placeholder:text-white/20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-[1.5px] uppercase text-white/30">Email</label>
                  <input
                    required
                    type="email"
                    value={emailVal}
                    onChange={(e) => setEmailVal(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#c9a227] rounded-xl px-3 py-3 text-sm outline-none transition-colors placeholder:text-white/20"
                  />
                </div>
              </div>

              {/* Date & Duration */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-[1.5px] uppercase text-white/30">Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#c9a227] rounded-xl px-3 py-3 text-sm outline-none transition-colors text-white/70 appearance-none [color-scheme:dark]"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-[1.5px] uppercase text-white/30">Duration (Hours)</label>
                  <div className="relative">
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#c9a227] rounded-xl px-3 py-3 text-sm outline-none transition-colors appearance-none cursor-pointer text-white/70"
                    >
                      <option value="" className="bg-[#040d1a]">— Select —</option>
                      {activeTab === "day" ? (
                        <>
                          <option value="4" className="bg-[#040d1a]">4 Hours — $2,500</option>
                          <option value="6" className="bg-[#040d1a]">6 Hours — $3,500</option>
                          <option value="10" className="bg-[#040d1a]">10 Hours — $7,500</option>
                        </>
                      ) : (
                        <>
                          <option value="2d1n" className="bg-[#040d1a]">2 Days / 1 Night — $10,000</option>
                          <option value="3d2n" className="bg-[#040d1a]">3 Days / 2 Nights — $20,000</option>
                          <option value="5d4n" className="bg-[#040d1a]">5 Days / 4 Nights — $30,000</option>
                          <option value="6d5n" className="bg-[#040d1a]">6 Days / 5 Nights — $35,000</option>
                          <option value="7d6n" className="bg-[#040d1a]">7 Days / 6 Nights — $38,000</option>
                        </>
                      )}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Crew Option */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-[1.5px] uppercase text-white/30">Crew Options</label>
                <select
                  value={crewOption}
                  onChange={(e) => setCrewOption(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#c9a227] rounded-xl px-4 py-3 text-sm outline-none transition-colors appearance-none cursor-pointer text-white/70"
                >
                  <option value="" className="bg-[#040d1a]">Select crew option…</option>
                  <option value="crew" className="bg-[#040d1a]">Crew — $250/day</option>
                  <option value="bartender" className="bg-[#040d1a]">Bartender — $200/day</option>
                  <option value="chef" className="bg-[#040d1a]">Chef — Pricing negotiated directly</option>
                  <option value="full" className="bg-[#040d1a]">Full Crew Package</option>
                </select>
              </div>

              {/* Additional Requests */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-[1.5px] uppercase text-white/30">Additional Requests</label>
                <textarea
                  rows={3}
                  value={additionalReq}
                  onChange={(e) => setAdditionalReq(e.target.value)}
                  placeholder="Special occasions, dietary needs, destination preferences…"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#c9a227] rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none placeholder:text-white/20"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-[#c9a227] to-[#d4b445] text-[#040d1a] font-bold rounded-xl text-sm hover:translate-y-[-2px] active:scale-[0.98] transition-all shadow-lg shadow-[#c9a227]/20 disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-[#040d1a]/30 border-t-[#040d1a] rounded-full"
                    />
                    Submitting Request…
                  </>
                ) : (
                  <>
                    Request My Charter <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-[10px] text-white/20 flex items-center justify-center gap-1.5">
                <Lock className="w-3 h-3" /> Secured with 256-bit SSL encryption
              </p>
            </form>

            {/* Contact strip */}
            <div className="px-6 md:px-8 pb-6 border-t border-white/6 pt-5">
              <p className="text-[10px] text-white/25 uppercase tracking-widest mb-3 font-bold">Prefer to talk?</p>
              <div className="flex flex-col gap-2">
                <a href="tel:4124182968" className="flex items-center gap-2.5 text-sm text-white/50 hover:text-[#c9a227] transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#c9a227]/60" /> Call Jake: 412-418-2968
                </a>
                <a href="tel:7276449653" className="flex items-center gap-2.5 text-sm text-white/50 hover:text-[#c9a227] transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#c9a227]/60" /> Call Bryon: 727-644-9653
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="fixed bottom-8 left-8 z-[9999] flex items-center gap-4 p-4 bg-[#071224] border border-[#c9a227]/30 rounded-2xl shadow-2xl"
          >
            <div className="w-10 h-10 rounded-full bg-green-500/15 flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="font-bold text-sm">Request Submitted!</p>
              <p className="text-xs text-white/40 mt-0.5">We'll contact you within 24 hours.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-6 md:px-16 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-white/20 uppercase tracking-widest">
          <p>© 2025 Serendipity Yacht Charter. All Rights Reserved.</p>
          <div className="flex items-center gap-2 text-white/30">
            <MapPin className="w-3 h-3 text-[#c9a227]/50" />
            Maximo Marina, 3701 50 Ave S., Saint Petersburg, FL 33371
          </div>
        </div>
      </footer>
    </div>
  );
}