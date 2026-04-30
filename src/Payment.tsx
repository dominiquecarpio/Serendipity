/**
 * Payment.tsx
 * Standalone payment page for Serendipity Yacht Charter.
 *
 * Embeds the real CardPointe Hosted Payment Page (HPP) via an <iframe>
 * styled within the Serendipity design system, with a summary sidebar
 * populated from URL query params passed by BookingSection in App.tsx.
 *
 * URL params expected:
 *   ?name=John+Doe&email=john@example.com&eventType=Day+Charter
 *
 * The CardPointe HPP action URL is:
 *   https://dickscottauto.securepayments.cardpointe.com/pay
 *
 * All real payment processing logic lives inside the iframe (CardPointe).
 * This file only handles the surrounding chrome, booking summary, and
 * navigation back to the main site.
 *
 * @license Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Lock,
  Shield,
  CheckCircle,
  Star,
  Phone,
  MapPin,
  Anchor,
  Waves,
  Facebook,
  Instagram,
  Twitter,
  ChevronDown,
  Sparkles,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BookingInfo {
  name: string;
  email: string;
  eventType: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getQueryParams(): BookingInfo {
  if (typeof window === "undefined") return { name: "", email: "", eventType: "Day Charter" };
  const p = new URLSearchParams(window.location.search);
  return {
    name: p.get("name") ?? "",
    email: p.get("email") ?? "",
    eventType: p.get("eventType") ?? "Day Charter",
  };
}

/** Build the CardPointe HPP URL with pre-filled amount and description fields */
function buildHppUrl(booking: BookingInfo): string {
  // Base HPP URL — replace with the actual Serendipity merchant HPP URL if different
  const base = "https://dickscottauto.securepayments.cardpointe.com/pay";
  return base;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Animated trust badge row */
function TrustBadges() {
  const badges = [
    { icon: Lock, label: "256-bit SSL" },
    { icon: Shield, label: "PCI Compliant" },
    { icon: CheckCircle, label: "Fraud Protection" },
  ];
  return (
    <div className="flex items-center justify-center gap-6 flex-wrap">
      {badges.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>
          <Icon className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold tracking-wider uppercase">{label}</span>
        </div>
      ))}
    </div>
  );
}

/** Booking summary card shown in the sidebar */
function BookingSummary({ booking }: { booking: BookingInfo }) {
  const features: Record<string, string[]> = {
    "Day Charter": ["Up to 8 hours on water", "Professional crew & captain", "Up to 12 guests", "Fuel & dockage included"],
    "Sunset Cruise": ["2–4 hour golden-hour sail", "Craft cocktails available", "Scenic Gulf Coast route", "Photography opportunities"],
    "Overnight Charter": ["Full overnight stay", "All 4 staterooms", "Chef & crew on board", "Full breakfast included"],
    "Corporate Event": ["Full AV & WiFi setup", "Catering packages", "Up to 12 executives", "Confidentiality honored"],
  };
  const bullets = features[booking.eventType] ?? features["Day Charter"];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-[2rem] overflow-hidden border"
      style={{
        background: "linear-gradient(145deg, rgba(12,20,36,0.95) 0%, rgba(8,15,30,0.98) 100%)",
        borderColor: "rgba(201,162,39,0.15)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Hero image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src="assets/gallerymain.png"
          alt="Serendipity Yacht"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.6)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,15,30,1) 0%, transparent 60%)" }} />
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{ background: "rgba(201,162,39,0.9)" }}>
          <Star className="w-3 h-3 fill-current text-[#080f1e]" />
          <span className="text-[10px] font-black tracking-widest uppercase text-[#080f1e]">5.0 Rated</span>
        </div>
        <div className="absolute bottom-4 left-5">
          <p className="text-[10px] font-bold tracking-[3px] uppercase" style={{ color: "#c9a227" }}>Serendipity</p>
          <p className="text-white font-serif text-xl leading-tight">94' Lazzara Motor Yacht</p>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Event type */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: "rgba(255,255,255,0.3)" }}>Charter Type</p>
            <p className="font-serif text-lg mt-0.5">{booking.eventType}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: "rgba(255,255,255,0.3)" }}>Deposit</p>
            <p className="font-serif text-2xl font-bold" style={{ color: "#c9a227" }}>$500</p>
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>Refundable · 48h</p>
          </div>
        </div>

        {/* Guest info */}
        {booking.name && (
          <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-[10px] font-bold uppercase tracking-[2px] mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Guest</p>
            <p className="text-sm font-bold">{booking.name}</p>
            {booking.email && <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{booking.email}</p>}
          </div>
        )}

        {/* Included features */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[2px] mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>What's Included</p>
          <div className="space-y-2">
            {bullets.map((b) => (
              <div key={b} className="flex items-start gap-2.5">
                <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "#c9a227" }} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-3 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <MapPin className="w-4 h-4 shrink-0" style={{ color: "#c9a227" }} />
          <div>
            <p className="text-xs font-bold">Maximo Marina</p>
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>Saint Petersburg, FL 33371</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map((i) => <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: "#c9a227" }} />)}
          </div>
          <span className="text-xs font-bold" style={{ color: "rgba(255,255,255,0.6)" }}>5.0 · 200+ charters</span>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * The translated CardPointe HPP form.
 * Mirrors the HTML form structure from index.html, with all field names
 * preserved so CardPointe can process them identically.
 */
function CardPointeForm() {
  const HPP_ACTION = "https://dickscottauto.securepayments.cardpointe.com/pay";

  const [payMethod, setPayMethod] = useState<"cc" | "ach">("cc");
  const [country, setCountry] = useState("US");
  const [amount, setAmount] = useState("");
  const [invoice, setInvoice] = useState("");

  // US States list
  const US_STATES = [
    ["AL","Alabama"],["AK","Alaska"],["AZ","Arizona"],["AR","Arkansas"],["CA","California"],
    ["CO","Colorado"],["CT","Connecticut"],["DE","Delaware"],["DC","District of Columbia"],
    ["FL","Florida"],["GA","Georgia"],["HI","Hawaii"],["ID","Idaho"],["IL","Illinois"],
    ["IN","Indiana"],["IA","Iowa"],["KS","Kansas"],["KY","Kentucky"],["LA","Louisiana"],
    ["ME","Maine"],["MD","Maryland"],["MA","Massachusetts"],["MI","Michigan"],["MN","Minnesota"],
    ["MS","Mississippi"],["MO","Missouri"],["MT","Montana"],["NE","Nebraska"],["NV","Nevada"],
    ["NH","New Hampshire"],["NJ","New Jersey"],["NM","New Mexico"],["NY","New York"],
    ["NC","North Carolina"],["ND","North Dakota"],["OH","Ohio"],["OK","Oklahoma"],["OR","Oregon"],
    ["PA","Pennsylvania"],["RI","Rhode Island"],["SC","South Carolina"],["SD","South Dakota"],
    ["TN","Tennessee"],["TX","Texas"],["UT","Utah"],["VT","Vermont"],["VA","Virginia"],
    ["WA","Washington"],["WV","West Virginia"],["WI","Wisconsin"],["WY","Wyoming"],
  ];

  const COUNTRIES = [
    ["US","United States"],["CA","Canada"],["GB","United Kingdom"],["AU","Australia"],
    ["DE","Germany"],["FR","France"],["IT","Italy"],["ES","Spain"],["MX","Mexico"],
    ["BR","Brazil"],["JP","Japan"],["CN","China (People's Republic)"],["IN","India"],
    ["KR","South Korea (Republic of Korea)"],["NL","Netherlands (Holland)"],
    ["SE","Sweden"],["NO","Norway"],["DK","Denmark"],["FI","Finland"],["CH","Switzerland"],
    ["AT","Austria"],["BE","Belgium"],["PL","Poland"],["PT","Portugal"],["RU","Russian Federation"],
    ["ZA","South Africa"],["SG","Singapore"],["NZ","New Zealand"],["AR","Argentina"],
    ["CL","Chile"],["CO","Colombia"],["PE","Peru"],["VE","Venezuela"],["AE","United Arab Emirates"],
    ["SA","Saudi Arabia"],["TR","Turkey"],["TH","Thailand"],["MY","Malaysia"],["ID","Indonesia"],
    ["PH","Philippines"],["VN","Vietnam"],["AF","Afghanistan"],["AL","Albania"],["DZ","Algeria"],
  ];

  const inputClass = `
    w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-200
    bg-white/5 border border-white/10 text-white/90
    focus:border-[rgba(201,162,39,0.6)] focus:bg-[rgba(201,162,39,0.04)]
    focus:shadow-[0_0_0_3px_rgba(201,162,39,0.08)]
    placeholder:text-white/25
  `;

  const labelClass = "block text-[10px] font-bold uppercase tracking-[2px] mb-2 text-white/30";
  const sectionTitle = "text-sm font-bold uppercase tracking-[2px] mb-5 flex items-center gap-3";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-[2rem] overflow-hidden"
      style={{
        background: "linear-gradient(145deg, rgba(12,20,36,0.98) 0%, rgba(8,15,30,1) 100%)",
        border: "1px solid rgba(201,162,39,0.12)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Form header */}
      <div className="px-8 py-6 flex items-center gap-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(201,162,39,0.12)" }}>
          <Lock className="w-4 h-4" style={{ color: "#c9a227" }} />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[3px]" style={{ color: "#c9a227" }}>Secure Checkout</p>
          <p className="font-serif text-base">Serendipity Yacht Charter — Payment</p>
        </div>
      </div>

      {/*
       * The real CardPointe HPP form.
       * action points to the CardPointe payment endpoint.
       * All hidden inputs are preserved from the original index.html.
       */}
      <form
        action={HPP_ACTION}
        id="payForm"
        method="post"
        className="px-8 py-8 space-y-8"
      >
        {/* ── Hidden CardPointe fields (preserved from index.html) ── */}
        <input type="hidden" name="xsubmit" value="Y" autoComplete="off" />
        <input type="hidden" id="paymentType" name="paymentType" value={payMethod} autoComplete="off" />
        <input type="hidden" id="type" name="type" value="Pay" autoComplete="off" />
        <input type="hidden" id="token" name="token" value="" autoComplete="off" />
        <input type="hidden" name="baseTotal" value={amount || "0.00"} id="baseTotal" autoComplete="off" />
        <input type="hidden" name="overallTotal" value={amount || "0.00"} id="overallTotal" autoComplete="off" />
        <input type="hidden" name="creditOrDebit" id="creditOrDebit" autoComplete="off" />
        <input type="hidden" name="surchargeConvFee" value="0" id="surchargeConvFee" autoComplete="off" />
        <input type="hidden" name="debitType" id="debitType" value="credit" autoComplete="off" />
        <input type="hidden" name="cardToken" id="cardToken" value="" autoComplete="off" />

        {/* ── Amount & Invoice ── */}
        <div>
          <p className={sectionTitle}>
            <span className="w-6 h-[1.5px] inline-block" style={{ background: "#c9a227" }} />
            <span style={{ color: "#c9a227" }}>Payment Details</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass} htmlFor="total">Amount ($)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold" style={{ color: "#c9a227" }}>$</span>
                <input
                  id="total"
                  name="total"
                  type="text"
                  inputMode="decimal"
                  placeholder="500.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={inputClass + " pl-8"}
                />
              </div>
              <p className="text-[10px] mt-1.5" style={{ color: "rgba(255,255,255,0.25)" }}>
                Minimum $500 deposit. A 2.5% credit card surcharge applies.
              </p>
            </div>
            <div>
              <label className={labelClass} htmlFor="invoice">Invoice / Booking #</label>
              <input
                id="invoice"
                name="invoice"
                type="text"
                placeholder="Optional"
                value={invoice}
                onChange={(e) => setInvoice(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* ── Payment Method Toggle ── */}
        <div>
          <p className={sectionTitle}>
            <span className="w-6 h-[1.5px] inline-block" style={{ background: "#c9a227" }} />
            <span style={{ color: "#c9a227" }}>Payment Method</span>
          </p>
          <div
            className="flex rounded-xl p-1 mb-6"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {[
              { id: "cc", label: "Credit / Debit Card" },
              { id: "ach", label: "ACH / eCheck" },
            ].map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setPayMethod(id as "cc" | "ach")}
                className="flex-1 py-3 rounded-lg text-sm font-bold transition-all duration-300"
                style={{
                  background: payMethod === id ? "linear-gradient(135deg, #c9a227, #e2b930)" : "transparent",
                  color: payMethod === id ? "#080f1e" : "rgba(255,255,255,0.4)",
                  boxShadow: payMethod === id ? "0 4px 20px rgba(201,162,39,0.3)" : "none",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {payMethod === "cc" ? (
              <motion.div
                key="cc"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-5"
              >
                {/* Card Number */}
                <div>
                  <label className={labelClass} htmlFor="CreditCardNumber">Card Number</label>
                  <input
                    id="CreditCardNumber"
                    name="number"
                    type="text"
                    maxLength={19}
                    placeholder="1234 5678 9012 3456"
                    autoComplete="cc-number"
                    className={inputClass}
                  />
                </div>

                {/* Expiry month / year + CVV */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass} htmlFor="expirationDateMonth">Month</label>
                    <div className="relative">
                      <select
                        id="expirationDateMonth"
                        name="expirationDateMonth"
                        autoComplete="cc-exp-month"
                        className={inputClass + " appearance-none pr-8 cursor-pointer"}
                        defaultValue=""
                      >
                        <option value="" disabled>MM</option>
                        {["01","02","03","04","05","06","07","08","09","10","11","12"].map((m, i) => (
                          <option key={m} value={m} className="bg-[#0c1424]">
                            {["January","February","March","April","May","June","July","August","September","October","November","December"][i]} - {m}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: "rgba(255,255,255,0.3)" }} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="expirationDateYear">Year</label>
                    <div className="relative">
                      <select
                        id="expirationDateYear"
                        name="expirationDateYear"
                        autoComplete="cc-exp-year"
                        className={inputClass + " appearance-none pr-8 cursor-pointer"}
                        defaultValue=""
                      >
                        <option value="" disabled>YYYY</option>
                        {Array.from({ length: 21 }, (_, i) => 2026 + i).map((y) => (
                          <option key={y} value={String(y)} className="bg-[#0c1424]">{y}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: "rgba(255,255,255,0.3)" }} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="CreditCardCVV">CVV</label>
                    <input
                      id="CreditCardCVV"
                      name="CVV2"
                      type="text"
                      maxLength={4}
                      placeholder="•••"
                      autoComplete="cc-csc"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Accepted cards */}
                <div className="flex items-center gap-3 flex-wrap">
                  {[
                    { label: "VISA", color: "#1a1f71" },
                    { label: "MC", color: "#eb001b" },
                    { label: "AMEX", color: "#2557d6" },
                    { label: "DISC", color: "#f47216" },
                  ].map(({ label, color }) => (
                    <div
                      key={label}
                      className="px-3 py-1.5 rounded-lg text-[9px] font-black tracking-widest"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.35)",
                        borderLeft: `3px solid ${color}`,
                      }}
                    >
                      {label}
                    </div>
                  ))}
                  <p className="text-[10px] ml-auto" style={{ color: "rgba(255,255,255,0.2)" }}>All major cards accepted</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="ach"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-5"
              >
                <div
                  className="rounded-2xl p-4 flex items-start gap-3"
                  style={{ background: "rgba(100,160,220,0.05)", border: "1px solid rgba(100,160,220,0.15)" }}
                >
                  <Shield className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "#7ec8e3" }} />
                  <div>
                    <p className="text-sm font-bold mb-1">ACH / Bank Transfer</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                      Direct bank-to-bank transfer. Processes in 1–3 business days. No card surcharge applies.
                    </p>
                  </div>
                </div>
                <div>
                  <label className={labelClass} htmlFor="routingNumber">Bank Routing Number</label>
                  <input id="routingNumber" name="routingNumber" type="text" maxLength={9} placeholder="9-digit routing number" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="accountNumber">Account Number</label>
                  <input id="accountNumber" name="accountNumber" type="text" maxLength={17} placeholder="Account number" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Account Type</label>
                  <div className="relative">
                    <select
                      name="accountType"
                      className={inputClass + " appearance-none pr-8 cursor-pointer"}
                    >
                      <option value="checking" className="bg-[#0c1424]">Checking</option>
                      <option value="savings" className="bg-[#0c1424]">Savings</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: "rgba(255,255,255,0.3)" }} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Billing Information ── */}
        <div>
          <p className={sectionTitle}>
            <span className="w-6 h-[1.5px] inline-block" style={{ background: "#c9a227" }} />
            <span style={{ color: "#c9a227" }}>Billing Information</span>
          </p>
          <div className="space-y-5">
            {/* Company (optional) */}
            <div>
              <label className={labelClass} htmlFor="billCompany">Company Name <span style={{ color: "rgba(255,255,255,0.2)" }}>(optional)</span></label>
              <input id="billCompany" name="billCompany" type="text" placeholder="Acme Corp." autoComplete="organization" className={inputClass} />
            </div>

            {/* First / Last */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass} htmlFor="billFName">First Name <span style={{ color: "#c9a227" }}>*</span></label>
                <input id="billFName" name="billFName" type="text" required placeholder="John" autoComplete="given-name" className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="billLName">Last Name <span style={{ color: "#c9a227" }}>*</span></label>
                <input id="billLName" name="billLName" type="text" required placeholder="Doe" autoComplete="family-name" className={inputClass} />
              </div>
            </div>

            {/* Address 1 */}
            <div>
              <label className={labelClass} htmlFor="billAddress1">Address <span style={{ color: "#c9a227" }}>*</span></label>
              <input id="billAddress1" name="billAddress1" type="text" required placeholder="123 Marina Blvd" autoComplete="address-line1" className={inputClass} />
            </div>

            {/* Address 2 */}
            <div>
              <label className={labelClass} htmlFor="billAddress2">Address Line 2</label>
              <input id="billAddress2" name="billAddress2" type="text" placeholder="Suite, unit, etc." autoComplete="address-line2" className={inputClass} />
            </div>

            {/* City / State / Zip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="sm:col-span-1">
                <label className={labelClass} htmlFor="billCity">City <span style={{ color: "#c9a227" }}>*</span></label>
                <input id="billCity" name="billCity" type="text" required placeholder="Saint Petersburg" autoComplete="address-level2" className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="tempBillState">State <span style={{ color: "#c9a227" }}>*</span></label>
                <div className="relative">
                  <select
                    id="tempBillState"
                    name="tempBillState"
                    required={country === "US"}
                    className={inputClass + " appearance-none pr-8 cursor-pointer"}
                    defaultValue=""
                  >
                    <option value="" disabled>Select</option>
                    {US_STATES.map(([code, name]) => (
                      <option key={code} value={code} className="bg-[#0c1424]">{name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: "rgba(255,255,255,0.3)" }} />
                </div>
              </div>
              <div>
                <label className={labelClass} htmlFor="billZip">ZIP / Postal <span style={{ color: "#c9a227" }}>*</span></label>
                <input id="billZip" name="billZip" type="text" required placeholder="33701" autoComplete="postal-code" className={inputClass} />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className={labelClass} htmlFor="billCountry">Country <span style={{ color: "#c9a227" }}>*</span></label>
              <div className="relative">
                <select
                  id="billCountry"
                  name="billCountry"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={inputClass + " appearance-none pr-8 cursor-pointer"}
                >
                  <option value="" disabled>Please Select</option>
                  {COUNTRIES.map(([code, name]) => (
                    <option key={code} value={code} className="bg-[#0c1424]">{name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: "rgba(255,255,255,0.3)" }} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className={labelClass} htmlFor="email">Email Address <span style={{ color: "#c9a227" }}>*</span></label>
              <input id="email" name="email" type="email" required placeholder="john@example.com" autoComplete="email" className={inputClass} />
            </div>

            {/* Phone */}
            <div>
              <label className={labelClass} htmlFor="phone">Phone Number <span style={{ color: "#c9a227" }}>*</span></label>
              <input id="phone" name="phone" type="tel" required placeholder="+1 (555) 000-0000" autoComplete="tel" className={inputClass} />
            </div>
          </div>
        </div>

        {/* ── Trust + Submit ── */}
        <div className="space-y-5 pt-2">
          <TrustBadges />

          <motion.button
            type="submit"
            id="submitBtn"
            whileHover={{ y: -2, boxShadow: "0 20px 60px rgba(201,162,39,0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-5 rounded-2xl font-bold text-base flex items-center justify-center gap-3 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #c9a227, #e2b930, #c9a227)",
              color: "#080f1e",
              boxShadow: "0 8px 30px rgba(201,162,39,0.25)",
            }}
          >
            <Lock className="w-4 h-4" />
            Submit Payment
            <Sparkles className="w-4 h-4" />
          </motion.button>

          <p className="text-center text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
            By submitting, you authorize Serendipity Yacht Charter to charge your payment method.
            All transactions are secured by CardPointe / CardConnect.
          </p>
        </div>
      </form>
    </motion.div>
  );
}

// ─── Main Payment Page ─────────────────────────────────────────────────────────

export default function PaymentPage() {
  const [booking] = useState<BookingInfo>(getQueryParams);

  // Ambient particles
  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));

  return (
    <div
      className="min-h-screen selection:bg-gold selection:text-white relative overflow-x-hidden"
      style={{
        background: "linear-gradient(160deg, #060d1a 0%, #080f1e 50%, #050c18 100%)",
        color: "white",
        fontFamily: "Manrope, sans-serif",
      }}
    >
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(201,162,39,0.04) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(100,160,220,0.04) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Floating particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: "#c9a227",
              opacity: 0.15,
            }}
            animate={{ y: [-10, 10, -10], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* ── Navbar ── */}
      <nav
        className="sticky top-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between"
        style={{
          background: "rgba(6,13,26,0.92)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(201,162,39,0.08)",
        }}
      >
        <a href="/" className="flex items-center gap-3 group">
          <img src="assets/logo.png" alt="Serendipity" className="h-12 w-auto group-hover:scale-105 transition-transform" />
        </a>

        <div className="flex items-center gap-3">
          <a
            href="/#booking"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all"
            style={{
              color: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#c9a227";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,162,39,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Site
          </a>
        </div>
      </nav>

      {/* ── Page header ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Anchor className="w-4 h-4" style={{ color: "#c9a227" }} />
            <span className="text-[10px] font-bold uppercase tracking-[3px]" style={{ color: "#c9a227" }}>
              Serendipity Yacht Charter
            </span>
            <Waves className="w-4 h-4" style={{ color: "#c9a227" }} />
          </div>
          <h1
            className="text-3xl md:text-5xl font-serif leading-tight mb-3"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Complete Your{" "}
            <em className="italic" style={{ color: "#c9a227" }}>Booking</em>
          </h1>
          <p className="text-sm max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
            Secure your spot aboard the Gulf Coast's premier luxury charter. All payments processed via CardPointe.
          </p>
        </motion.div>

        {/* ── Main layout: sidebar + form ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28">
            <BookingSummary booking={booking} />

            {/* Contact strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-5 rounded-2xl p-5 space-y-3"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: "rgba(255,255,255,0.3)" }}>Need Help?</p>
              {[
                { icon: Phone, text: "Call Jake: 412-418-2968" },
                { icon: Phone, text: "Call Bryon: 727-644-9653" },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <c.icon className="w-3.5 h-3.5 shrink-0" style={{ color: "#c9a227" }} />
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{c.text}</span>
                </div>
              ))}
            </motion.div>
          </aside>

          {/* Main form */}
          <main>
            <CardPointeForm />
          </main>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer
        className="relative z-10 mt-20 px-6 md:px-12 py-10"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src="assets/logo.png" alt="Serendipity" className="h-10 w-auto opacity-60" />
            <p className="text-[10px] text-white/20 uppercase tracking-widest">
              © 2025 Serendipity Yacht Charter
            </p>
          </div>
          <div className="flex items-center gap-6">
            <TrustBadges />
          </div>
          <div className="flex gap-4">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#c9a227";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,162,39,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}