import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

interface BookingInfo {
  name: string;
  email: string;
  eventType: string;
  amount?: string;
}

function getQueryParams(): BookingInfo {
  if (typeof window === "undefined")
    return { name: "", email: "", eventType: "Day Charter", amount: "" };
  const p = new URLSearchParams(window.location.search);
  return {
    name: p.get("name") ?? "",
    email: p.get("email") ?? "",
    eventType: p.get("eventType") ?? "Day Charter",
    amount: p.get("amount") ?? "",
  };
}

const NAVY = "#003f62";
const RED = "#c0392b";
const GREEN = "#2e7d32";
const FONT = '"Fira Sans", "Roboto Condensed", Raleway, sans-serif';

const base: React.CSSProperties = {
  fontFamily: FONT,
  fontSize: 15,
  color: NAVY,
  background: "#ffffff",
  minHeight: "100vh",
  padding: 0,
  margin: 0,
};

const topLabelStyle: React.CSSProperties = {
  display: "inline-block",
  width: 180,
  fontSize: 15,
  color: NAVY,
  fontWeight: 400,
  verticalAlign: "middle",
};

const billLabelStyle: React.CSSProperties = {
  display: "inline-block",
  width: 155,
  fontSize: 15,
  color: NAVY,
  fontWeight: 400,
  verticalAlign: "top",
  paddingTop: 7,
  flexShrink: 0,
};

const inputBase: React.CSSProperties = {
  border: "1px solid #c0c0c0",
  borderRadius: 2,
  padding: "5px 8px",
  fontSize: 15,
  color: "#333",
  background: "#fff",
  outline: "none",
  fontFamily: FONT,
  boxSizing: "border-box",
};

const selectBase: React.CSSProperties = {
  ...inputBase,
  cursor: "pointer",
};

const billRow: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  marginBottom: 10,
};

const payRow: React.CSSProperties = { marginBottom: 12 };

const payLabel: React.CSSProperties = {
  display: "block",
  fontSize: 15,
  color: NAVY,
  marginBottom: 4,
  fontWeight: 400,
};

const req = <span style={{ color: RED, marginLeft: 1 }}>*</span>;

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

function CardIcons() {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 14 }}>
      <div style={{ width: 52, height: 33, border: "1px solid #ddd", borderRadius: 4, background: "#1a1f71", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <svg viewBox="0 0 780 500" width="48" height="30" xmlns="http://www.w3.org/2000/svg">
          <path d="m293.2 348.73 33.361-195.76h53.36l-33.385 195.76h-53.336zm246.11-191.54c-10.57-3.966-27.137-8.222-47.822-8.222-52.725 0-89.865 26.55-90.18 64.603-.299 28.13 26.514 43.822 46.752 53.186 20.771 9.595 27.752 15.714 27.654 24.283-.131 13.121-16.586 19.116-31.922 19.116-21.357 0-32.703-2.967-50.227-10.276l-6.876-3.11-7.489 43.823c12.463 5.464 35.51 10.198 59.438 10.443 56.09 0 92.5-26.246 92.916-66.882.199-22.269-14.016-39.216-44.801-53.188-18.65-9.055-30.072-15.099-29.951-24.268 0-8.137 9.668-16.839 30.557-16.839 17.449-.27 30.09 3.535 39.938 7.5l4.781 2.26 7.232-42.429m137.31-4.223h-41.232c-12.773 0-22.332 3.487-27.941 16.234l-79.244 179.4h56.031s9.16-24.123 11.232-29.418c6.125 0 60.555.084 68.338.084 1.596 6.853 6.49 29.334 6.49 29.334h49.514l-43.188-195.64zm-65.418 126.41c4.412-11.279 21.26-54.723 21.26-54.723-.316.522 4.379-11.334 7.074-18.684l3.605 16.879s10.219 46.729 12.354 56.528h-44.293zm-363.3-126.41-52.24 133.5-5.567-27.13c-9.725-31.273-40.025-65.155-73.898-82.118l47.766 171.2 56.456-.064 84.004-195.39h-56.521" fill="#fff"/>
          <path d="m146.92 152.96h-86.041l-.681 4.073c66.938 16.204 111.23 55.363 129.62 102.41l-18.71-89.96c-3.23-12.395-12.597-16.094-24.186-16.527" fill="#F2AE14"/>
        </svg>
      </div>
      <div style={{ width: 52, height: 33, border: "1px solid #ddd", borderRadius: 4, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
        <svg viewBox="0 0 152 108" width="50" height="33" xmlns="http://www.w3.org/2000/svg">
          <circle cx="52" cy="54" r="44" fill="#eb001b"/>
          <circle cx="100" cy="54" r="44" fill="#f79e1b"/>
          <path d="M76 20.6A44 44 0 0 1 99.8 54 44 44 0 0 1 76 87.4 44 44 0 0 1 52.2 54 44 44 0 0 1 76 20.6z" fill="#ff5f00"/>
        </svg>
      </div>
      <div style={{ width: 52, height: 33, border: "1px solid #ddd", borderRadius: 4, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <svg viewBox="0 0 780 500" width="48" height="30" xmlns="http://www.w3.org/2000/svg">
          <rect width="780" height="500" rx="40" fill="#4D4D4D"/>
          <circle cx="415" cy="213" r="53" fill="#F47216"/>
          <path d="M327.152 161.893c8.837 0 16.248 1.784 25.268 6.09v22.751c-8.544-7.863-15.955-11.154-25.756-11.154-19.264 0-34.414 15.015-34.414 34.05 0 20.075 14.681 34.196 35.37 34.196 9.312 0 16.586-3.12 24.8-10.857v22.763c-9.341 4.14-16.911 5.776-25.756 5.776-31.278 0-55.582-22.596-55.582-51.737 0-28.826 24.951-51.878 56.07-51.878zm-97.113.627c11.546 0 22.11 3.72 30.943 10.994l-10.748 13.248c-5.35-5.646-10.41-8.028-16.564-8.028-8.853 0-15.3 4.745-15.3 10.989 0 5.354 3.619 8.188 15.944 12.482 23.365 8.044 30.29 15.176 30.29 30.926 0 19.193-14.976 32.553-36.32 32.553-15.63 0-26.994-5.795-36.458-18.872l13.268-12.03c4.73 8.61 12.622 13.222 22.42 13.222 9.163 0 15.947-5.952 15.947-13.984 0-4.164-2.055-7.734-6.158-10.258-2.066-1.195-6.158-2.977-14.2-5.647-19.291-6.538-25.91-13.527-25.91-27.185 0-16.225 14.214-28.41 32.846-28.41zm234.723 1.728h22.437l28.084 66.592 28.446-66.592h22.267l-45.494 101.686h-11.053l-44.687-101.686zm-397.348.152h30.15c33.312 0 56.534 20.382 56.534 49.641 0 14.59-7.104 28.696-19.118 38.057-10.108 7.901-21.626 11.445-37.574 11.445H67.414V164.4zm20.526 17v65.559h5.512c13.273 0 21.656-2.394 28.11-7.88 7.103-5.955 11.376-15.465 11.376-24.98 0-9.499-4.273-18.725-11.376-24.681-6.785-5.78-14.837-8.018-28.11-8.018H87.94zm74.009-17h20.54v99.143h-20.54V164.4zm411.734 0h58.252v16.8H595.81v22.005h36.336v16.791h-36.336v26.762h37.726v16.785h-58.252V164.4zm71.858 0h30.455c23.69 0 37.265 10.71 37.265 29.272 0 15.18-8.514 25.14-23.986 28.105l33.148 41.766h-25.26l-28.429-39.828h-2.678v39.828h-20.515V164.4zm20.515 15.616v30.025h6.002c13.117 0 20.069-5.362 20.069-15.328 0-9.648-6.954-14.697-19.745-14.697h-6.326z" fill="#FFF"/>
        </svg>
      </div>
      <div style={{ width: 52, height: 33, border: "1px solid #ddd", borderRadius: 4, background: "#2557d6", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 200 80" width="48" xmlns="http://www.w3.org/2000/svg">
          <text x="10" y="58" fontSize="52" fontWeight="bold" fontFamily="Arial" fill="white" letterSpacing="-2">AMEX</text>
        </svg>
      </div>
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────
function SuccessScreen({
  amount,
  grandTotal,
  surcharge,
  payMethod,
  invoice,
  name,
  email,
  eventType,
}: {
  amount: string;
  grandTotal: string;
  surcharge: string;
  payMethod: "cc" | "ach";
  invoice: string;
  name: string;
  email: string;
  eventType: string;
}) {
  const confRef = React.useRef<number>(Math.floor(100000 + Math.random() * 900000));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      style={{
        maxWidth: 600,
        margin: "60px auto",
        padding: "48px 40px",
        background: "#fff",
        borderRadius: 8,
        border: "1px solid #e0e0e0",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        fontFamily: FONT,
        color: NAVY,
      }}
    >
      {/* Animated checkmark */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 20 }}
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "#e8f5e9",
            border: "3px solid #2e7d32",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <motion.path
              d="M10 20 L17 27 L30 13"
              stroke="#2e7d32"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
            />
          </svg>
        </motion.div>
        <h2 style={{ fontFamily: '"Raleway", sans-serif', fontSize: 26, fontWeight: 700, color: NAVY, margin: "0 0 8px" }}>
          Payment Successful
        </h2>
        <p style={{ fontSize: 14, color: "#666", margin: 0 }}>
          Your booking has been confirmed. A receipt will be sent to <strong>{email || "your email"}</strong>.
        </p>
      </div>

      {/* Confirmation number */}
      <div style={{
        background: "#f7f9fc",
        border: "1px solid #e0e7ef",
        borderRadius: 6,
        padding: "14px 20px",
        marginBottom: 24,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ fontSize: 13, color: "#888", fontWeight: 500 }}>Confirmation #</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: NAVY, letterSpacing: 1 }}>
          SYC-{confRef.current}
        </span>
      </div>

      {/* Summary table */}
      <div style={{ borderTop: "1px solid #eee", borderBottom: "1px solid #eee", padding: "18px 0", marginBottom: 24 }}>
        {[
          { label: "Event Type", value: eventType },
          { label: "Guest Name", value: name || "—" },
          { label: "Payment Method", value: payMethod === "cc" ? "Credit Card" : "ACH (eCheck)" },
          ...(invoice ? [{ label: "Invoice #", value: invoice }] : []),
          { label: "Base Amount", value: `$${parseFloat(amount || "0").toFixed(2)}` },
          ...(payMethod === "cc" ? [{ label: "Credit Card Surcharge (2.5%)", value: `$${surcharge}` }] : []),
          { label: "Total Charged", value: `$${grandTotal}`, bold: true, large: true },
        ].map((row, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "7px 0",
            borderBottom: i < 4 ? "1px solid #f0f0f0" : "none",
          }}>
            <span style={{ fontSize: 13, color: "#777" }}>{row.label}</span>
            <span style={{
              fontSize: (row as any).large ? 16 : 14,
              fontWeight: (row as any).bold ? 700 : 500,
              color: (row as any).bold ? GREEN : NAVY,
            }}>{row.value}</span>
          </div>
        ))}
      </div>

      {/* Next steps */}
      <div style={{ background: "#f0f7ff", borderRadius: 6, padding: "14px 18px", marginBottom: 28, fontSize: 13, color: "#555", lineHeight: 1.7 }}>
        <strong style={{ color: NAVY, display: "block", marginBottom: 4 }}>What's next?</strong>
        Our team will reach out within 24 hours to confirm your charter details. For immediate assistance, call Jake at <strong>412-418-2968</strong> or Bryon at <strong>727-644-9653</strong>.
      </div>

      {/* Back to home */}
      <button
        onClick={() => { window.location.href = "/"; }}
        style={{
          width: "100%",
          background: GREEN,
          color: "#fff",
          border: "none",
          borderRadius: 4,
          padding: "12px 26px",
          fontSize: 15,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: FONT,
          letterSpacing: 0.2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
        onMouseOver={(e) => { e.currentTarget.style.background = "#1b5e20"; }}
        onMouseOut={(e) => { e.currentTarget.style.background = GREEN; }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M3 8l4-4M3 8l4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Return to Serendipity
      </button>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PaymentPage() {
  const [booking] = useState<BookingInfo>(getQueryParams);
  const [payMethod, setPayMethod] = useState<"cc" | "ach">("cc");
  const [country, setCountry] = useState("US");
  const [amount, setAmount] = useState(booking.amount || "0.00");
  const [invoice, setInvoice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // ── Computed totals ──
  const baseNum = parseFloat(amount.replace(/[^0-9.]/g, "")) || 0;
  const surchargeNum = payMethod === "cc" ? baseNum * 0.025 : 0;
  const grandNum = baseNum + surchargeNum;
  const surchargeStr = surchargeNum.toFixed(2);
  const grandStr = grandNum.toFixed(2);

  // Keep hidden inputs in sync (for real HPP POST)
  useEffect(() => {
    const setVal = (id: string, v: string) => {
      const el = document.getElementById(id) as HTMLInputElement | null;
      if (el) el.value = v;
    };
    setVal("baseTotal", baseNum.toFixed(2));
    setVal("overallTotal", grandStr);
    setVal("transactionFeeVal", surchargeStr);
    setVal("grandTotalVal", grandStr);
  }, [baseNum, surchargeStr, grandStr]);

  // ── Card number detection for debitType ──
  const [cardNumber, setCardNumber] = useState("");
  const detectCardType = (num: string) => {
    const clean = num.replace(/\s/g, "");
    if (/^4/.test(clean)) return "visa";
    if (/^5[1-5]/.test(clean)) return "mastercard";
    if (/^3[47]/.test(clean)) return "amex";
    if (/^6(?:011|5)/.test(clean)) return "discover";
    return "credit";
  };

  const handleAmountBlur = () => {
    const n = parseFloat(amount.replace(/[^0-9.]/g, ""));
    if (!isNaN(n)) setAmount(n.toFixed(2));
    else setAmount("0.00");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (baseNum <= 0) {
      alert("Please enter a valid amount greater than $0.00");
      return;
    }
    setSubmitting(true);
    // Simulate network delay, then show success
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1800);
  };

  // ── Success screen ──
  if (success) {
    return (
      <div style={base}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 28px 48px" }}>
          <div style={{ marginBottom: 16 }}>
            <button
              type="button"
              onClick={() => { window.location.href = "/"; }}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "1px solid #c0c0c0", borderRadius: 4, padding: "6px 14px", fontSize: 14, color: NAVY, cursor: "pointer", fontFamily: FONT, fontWeight: 500 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Home
            </button>
          </div>
          <SuccessScreen
            amount={amount}
            grandTotal={grandStr}
            surcharge={surchargeStr}
            payMethod={payMethod}
            invoice={invoice}
            name={booking.name}
            email={booking.email}
            eventType={booking.eventType}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={base}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 28px 48px" }}>

        {/* ══ BACK BUTTON ══ */}
        <div style={{ marginBottom: 16 }}>
          <button
            type="button"
            onClick={() => window.history.back()}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "1px solid #c0c0c0", borderRadius: 4, padding: "6px 14px", fontSize: 14, color: NAVY, cursor: "pointer", fontFamily: FONT, fontWeight: 500 }}
            onMouseOver={(e) => { e.currentTarget.style.background = "#f0f4f8"; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "none"; }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
        </div>

        {/* ══ TITLE ROW ══ */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "flex-start", marginBottom: 28 }}>
          <h1 style={{ fontFamily: '"Raleway", sans-serif', fontSize: 32, fontWeight: 700, color: NAVY, margin: 0, lineHeight: 1.25, display: "flex", alignItems: "flex-start", gap: 10 }}>
            <span style={{ fontSize: 26, marginTop: 3 }}>🔒</span>
            Serendipity Yacht Charter — Secure Payment
          </h1>
          <div style={{ textAlign: "center", minWidth: 120 }}>
            <img
              src="/assets/logo.png"
              alt="Serendipity"
              style={{ maxHeight: 80, maxWidth: 160, objectFit: "contain" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
        </div>

        {/* Booking context banner */}
        {(booking.name || booking.eventType) && (
          <div style={{ background: "#f0f7ff", border: "1px solid #c2d9f0", borderRadius: 6, padding: "10px 16px", marginBottom: 24, fontSize: 13, color: "#444", display: "flex", gap: 20, flexWrap: "wrap" }}>
            {booking.name && <span>👤 <strong>{booking.name}</strong></span>}
            {booking.email && <span>✉️ {booking.email}</span>}
            {booking.eventType && <span>⛵ {booking.eventType}</span>}
          </div>
        )}

        {/* ══ FORM ══ */}
        <form id="payForm" onSubmit={handleSubmit}>

          {/* Hidden fields for real HPP POST */}
          <input type="hidden" name="xsubmit" value="Y" />
          <input type="hidden" name="paymentType" id="paymentType" value={payMethod} />
          <input type="hidden" name="type" value="Pay" />
          <input type="hidden" name="token" id="token" value="" />
          <input type="hidden" name="baseTotal" id="baseTotal" value={baseNum.toFixed(2)} />
          <input type="hidden" name="overallTotal" id="overallTotal" value={grandStr} />
          <input type="hidden" name="creditOrDebit" id="creditOrDebit" value="" />
          <input type="hidden" name="surchargeConvFee" id="surchargeConvFee" value="0" />
          <input type="hidden" name="debitType" id="debitType" value={detectCardType(cardNumber)} />
          <input type="hidden" name="cardToken" id="cardToken" value="" />

          {/* ── Amount ── */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
            <span style={topLabelStyle}>Amount <span style={{ color: RED }}>*</span></span>
            <div style={{ display: "flex", alignItems: "center", border: `1px solid ${baseNum <= 0 ? "#e0a0a0" : "#c0c0c0"}`, borderRadius: 2 }}>
              <span style={{ padding: "5px 7px", fontSize: 15, color: "#555", borderRight: "1px solid #c0c0c0", background: "#f3f3f3", lineHeight: 1.4 }}>$</span>
              <input
                id="total" name="total" type="text" inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onBlur={handleAmountBlur}
                size={10} maxLength={10}
                style={{ border: "none", padding: "5px 8px", fontSize: 15, color: "#333", outline: "none", width: 90, fontFamily: FONT }}
              />
            </div>
            {baseNum <= 0 && (
              <span style={{ marginLeft: 10, fontSize: 12, color: RED }}>Please enter an amount</span>
            )}
          </div>

          {/* ── Surcharge / Total (live calculated) ── */}
          <div style={{ marginLeft: 180, marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
              <span style={{ ...topLabelStyle, width: 200, fontSize: 14, color: "#444" }}>
                Credit Card Surcharge {payMethod === "cc" ? "(2.5%)" : ""}
              </span>
              <input
                type="text"
                name="transactionFee"
                id="transactionFeeVal"
                value={payMethod === "cc" ? `$${surchargeStr}` : "$0.00"}
                readOnly
                style={{ ...inputBase, width: 110, background: "#f8f8f8", color: payMethod === "cc" && surchargeNum > 0 ? "#c0392b" : "#999", fontSize: 14, fontWeight: payMethod === "cc" && surchargeNum > 0 ? 600 : 400 }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
              <span style={{ ...topLabelStyle, width: 200, fontSize: 14, color: "#444" }}>Total Due</span>
              <input
                type="text"
                name="grandTotal"
                id="grandTotalVal"
                value={`$${grandStr}`}
                readOnly
                style={{ ...inputBase, width: 110, background: "#f8f8f8", color: GREEN, fontSize: 15, fontWeight: 700 }}
              />
            </div>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#555", fontStyle: "italic" }}>
              {payMethod === "cc"
                ? "A 2.5% credit card surcharge is applied to cover processing fees."
                : "No surcharge applies to ACH (eCheck) payments."}
            </p>
          </div>

          {/* ── Invoice Number ── */}
          <div style={{ display: "flex", alignItems: "center", marginTop: 14, marginBottom: 28 }}>
            <span style={topLabelStyle}>Invoice Number</span>
            <input
              type="text" name="invoice" size={20}
              value={invoice}
              onChange={(e) => setInvoice(e.target.value)}
              placeholder="Optional"
              style={{ ...inputBase, width: 192 }}
            />
          </div>

          {/* ══ TWO-COLUMN ══ */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, alignItems: "flex-start" }}>

            {/* ── LEFT: Payment Info ── */}
            <div style={{ paddingRight: 32 }}>
              <h3 style={{ fontFamily: '"Fira Sans", sans-serif', fontSize: 18, color: NAVY, margin: "0 0 10px", fontWeight: 400 }}>
                Payment Info
              </h3>
              <p style={{ fontSize: 14, color: "#6b7280", margin: "0 0 10px", borderBottom: "1px solid #e5e7eb", paddingBottom: 6 }}>
                Choose payment method
              </p>

              {/* Toggle */}
              <div style={{ display: "flex", marginBottom: 18 }}>
                <button type="button" onClick={() => setPayMethod("cc")}
                  style={{ padding: "8px 20px", fontSize: 15, fontWeight: 600, cursor: "pointer", border: "1px solid #2e7d32", borderRight: "none", borderRadius: "3px 0 0 3px", background: payMethod === "cc" ? "#2e7d32" : "#555555", color: "#fff", fontFamily: FONT }}>
                  Credit Card
                </button>
                <button type="button" onClick={() => setPayMethod("ach")}
                  style={{ padding: "8px 18px", fontSize: 15, fontWeight: 600, cursor: "pointer", border: "1px solid #2e7d32", borderRadius: "0 3px 3px 0", background: payMethod === "ach" ? "#2e7d32" : "#555555", color: "#fff", fontFamily: FONT }}>
                  ACH <small style={{ fontWeight: 400, fontSize: 13 }}>(eCheck)</small>
                </button>
              </div>

              <p style={{ fontSize: 14, color: "#6b7280", margin: "0 0 12px", borderBottom: "1px solid #e5e7eb", paddingBottom: 6 }}>
                Payment details
              </p>

              <AnimatePresence mode="wait">
                {payMethod === "cc" ? (
                  <motion.div key="cc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                    <div style={payRow}>
                      <label style={payLabel} htmlFor="CreditCardNumber">Card Number {req}</label>
                      <input
                        id="CreditCardNumber" name="number" type="text" size={30}
                        autoComplete="cc-number" required
                        value={cardNumber}
                        onChange={(e) => {
                          // Auto-format with spaces
                          const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
                          const fmt = raw.replace(/(.{4})/g, "$1 ").trim();
                          setCardNumber(fmt);
                        }}
                        placeholder="1234 5678 9012 3456"
                        style={{ ...inputBase, width: 268 }}
                      />
                    </div>

                    <div style={payRow}>
                      <label style={payLabel} htmlFor="expirationDateMonth">Expiration Date {req}</label>
                      <div style={{ marginBottom: 6 }}>
                        <select id="expirationDateMonth" name="expirationDateMonth" autoComplete="cc-exp-month" defaultValue="" required
                          style={{ ...selectBase, width: 185 }}>
                          <option value="" disabled>MM</option>
                          {["01","02","03","04","05","06","07","08","09","10","11","12"].map((m, i) => (
                            <option key={m} value={m}>
                              {["January","February","March","April","May","June","July","August","September","October","November","December"][i]} - {m}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <select id="expirationDateYear" name="expirationDateYear" autoComplete="cc-exp-year" defaultValue="" required
                          style={{ ...selectBase, width: 158 }}>
                          <option value="" disabled>YYYY</option>
                          {Array.from({ length: 21 }, (_, i) => 2026 + i).map((y) => (
                            <option key={y} value={String(y)}>{y}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div style={payRow}>
                      <label style={payLabel} htmlFor="CreditCardCVV">
                        Security Code <small style={{ fontWeight: 400 }}>(CVV)</small> {req}
                      </label>
                      <input id="CreditCardCVV" name="CVV2" type="text" size={5} maxLength={4}
                        autoComplete="cc-csc" required placeholder="•••"
                        style={{ ...inputBase, width: 80 }} />
                    </div>

                    <CardIcons />
                  </motion.div>
                ) : (
                  <motion.div key="ach" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                    <div style={{ background: "#f0f7f0", border: "1px solid #c3e0c3", borderRadius: 4, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: "#2e7d32" }}>
                      ✓ No surcharge on ACH payments — save {payMethod === "ach" ? `$${(baseNum * 0.025).toFixed(2)}` : ""} vs. credit card
                    </div>
                    <div style={payRow}>
                      <label style={payLabel} htmlFor="routingNumber">Routing Number {req}</label>
                      <input id="routingNumber" name="routingNumber" type="text" maxLength={9} required
                        placeholder="9-digit routing #"
                        style={{ ...inputBase, width: 200 }} />
                    </div>
                    <div style={payRow}>
                      <label style={payLabel} htmlFor="accountNumber">Account Number {req}</label>
                      <input id="accountNumber" name="accountNumber" type="text" maxLength={17} required
                        placeholder="Account number"
                        style={{ ...inputBase, width: 200 }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── RIGHT: Billing Info ── */}
            <div>
              <h3 style={{ fontFamily: '"Fira Sans", sans-serif', fontSize: 18, color: NAVY, margin: "0 0 14px", fontWeight: 400 }}>
                Billing Info
              </h3>

              {[
                { label: "Company Name", id: "billCompany", name: "billCompany", required: false, autoComplete: "organization" },
                { label: "First Name", id: "billFName", name: "billFName", required: true, autoComplete: "given-name" },
                { label: "Last Name", id: "billLName", name: "billLName", required: true, autoComplete: "family-name" },
                { label: "Address 1", id: "billAddress1", name: "billAddress1", required: true, autoComplete: "address-line1" },
                { label: "Address 2", id: "billAddress2", name: "billAddress2", required: false, autoComplete: "address-line2" },
                { label: "City", id: "billCity", name: "billCity", required: true, autoComplete: "address-level2" },
              ].map(({ label, id, name, required: isReq, autoComplete }) => (
                <div key={id} style={billRow}>
                  <label style={billLabelStyle} htmlFor={id}>{label} {isReq && req}</label>
                  <input id={id} name={name} type="text" required={isReq} autoComplete={autoComplete}
                    style={{ ...inputBase, flex: 1, maxWidth: 175 }} />
                </div>
              ))}

              <div style={billRow}>
                <label style={billLabelStyle} htmlFor="tempBillState">State {req}</label>
                <select id="tempBillState" name="tempBillState" required={country === "US"} defaultValue=""
                  style={{ ...selectBase, flex: 1, maxWidth: 175 }}>
                  <option value="" disabled>Please Select</option>
                  {US_STATES.map(([code, sname]) => <option key={code} value={code}>{sname}</option>)}
                </select>
              </div>

              <div style={billRow}>
                <label style={billLabelStyle} htmlFor="billZip">Zip/Postal Code {req}</label>
                <input id="billZip" name="billZip" type="text" required autoComplete="postal-code"
                  style={{ ...inputBase, flex: 1, maxWidth: 175 }} />
              </div>

              <div style={billRow}>
                <label style={billLabelStyle} htmlFor="billCountry">Country {req}</label>
                <select id="billCountry" name="billCountry" required value={country} onChange={(e) => setCountry(e.target.value)}
                  style={{ ...selectBase, flex: 1, maxWidth: 175 }}>
                  <option value="">Please Select</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="MX">Mexico</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="JP">Japan</option>
                  <option value="AF">Afghanistan</option><option value="AL">Albania</option><option value="DZ">Algeria</option>
                  <option value="AS">American Samoa</option><option value="AD">Andorra</option><option value="AO">Angola</option>
                  <option value="AI">Anguilla</option><option value="AG">Antigua and Barbuda</option><option value="AR">Argentina</option>
                  <option value="AM">Armenia</option><option value="AW">Aruba</option><option value="AT">Austria</option>
                  <option value="AZ">Azerbaijan</option><option value="BS">Bahamas</option><option value="BH">Bahrain</option>
                  <option value="BD">Bangladesh</option><option value="BB">Barbados</option><option value="BY">Belarus</option>
                  <option value="BE">Belgium</option><option value="BZ">Belize</option><option value="BJ">Benin</option>
                  <option value="BM">Bermuda</option><option value="BT">Bhutan</option><option value="BO">Bolivia</option>
                  <option value="BA">Bosnia and Herzegowina</option><option value="BW">Botswana</option>
                  <option value="BN">Brunei Darussalam</option><option value="BG">Bulgaria</option>
                  <option value="BF">Burkina Faso</option><option value="BI">Burundi</option>
                  <option value="KH">Cambodia</option><option value="CM">Cameroon</option>
                  <option value="CV">Cape Verde</option><option value="KY">Cayman Islands</option>
                  <option value="CF">Central African Republic</option><option value="TD">Chad</option>
                  <option value="CL">Chile</option><option value="CN">China</option>
                  <option value="CO">Colombia</option><option value="CR">Costa Rica</option>
                  <option value="HR">Croatia</option><option value="CU">Cuba</option>
                  <option value="CY">Cyprus</option><option value="CZ">Czech Republic</option>
                  <option value="DK">Denmark</option><option value="DO">Dominican Republic</option>
                  <option value="EC">Ecuador</option><option value="EG">Egypt</option>
                  <option value="SV">El Salvador</option><option value="EE">Estonia</option>
                  <option value="ET">Ethiopia</option><option value="FJ">Fiji</option>
                  <option value="FI">Finland</option><option value="GH">Ghana</option>
                  <option value="GR">Greece</option><option value="GT">Guatemala</option>
                  <option value="HN">Honduras</option><option value="HK">Hong Kong</option>
                  <option value="HU">Hungary</option><option value="IS">Iceland</option>
                  <option value="IN">India</option><option value="ID">Indonesia</option>
                  <option value="IE">Ireland</option><option value="IL">Israel</option>
                  <option value="IT">Italy</option><option value="JM">Jamaica</option>
                  <option value="JO">Jordan</option><option value="KZ">Kazakhstan</option>
                  <option value="KE">Kenya</option><option value="KW">Kuwait</option>
                  <option value="LV">Latvia</option><option value="LB">Lebanon</option>
                  <option value="LT">Lithuania</option><option value="LU">Luxembourg</option>
                  <option value="MY">Malaysia</option><option value="MT">Malta</option>
                  <option value="MU">Mauritius</option><option value="MD">Moldova</option>
                  <option value="MC">Monaco</option><option value="MN">Mongolia</option>
                  <option value="MA">Morocco</option><option value="MZ">Mozambique</option>
                  <option value="NA">Namibia</option><option value="NP">Nepal</option>
                  <option value="NL">Netherlands</option><option value="NZ">New Zealand</option>
                  <option value="NI">Nicaragua</option><option value="NG">Nigeria</option>
                  <option value="NO">Norway</option><option value="OM">Oman</option>
                  <option value="PK">Pakistan</option><option value="PA">Panama</option>
                  <option value="PG">Papua New Guinea</option><option value="PY">Paraguay</option>
                  <option value="PE">Peru</option><option value="PH">Philippines</option>
                  <option value="PL">Poland</option><option value="PT">Portugal</option>
                  <option value="PR">Puerto Rico</option><option value="QA">Qatar</option>
                  <option value="RO">Romania</option><option value="RU">Russian Federation</option>
                  <option value="RW">Rwanda</option><option value="SA">Saudi Arabia</option>
                  <option value="SN">Senegal</option><option value="RS">Serbia</option>
                  <option value="SG">Singapore</option><option value="SK">Slovakia</option>
                  <option value="SI">Slovenia</option><option value="ZA">South Africa</option>
                  <option value="KR">South Korea</option><option value="ES">Spain</option>
                  <option value="LK">Sri Lanka</option><option value="SD">Sudan</option>
                  <option value="SE">Sweden</option><option value="CH">Switzerland</option>
                  <option value="TW">Taiwan</option><option value="TZ">Tanzania</option>
                  <option value="TH">Thailand</option><option value="TT">Trinidad and Tobago</option>
                  <option value="TN">Tunisia</option><option value="TR">Turkey</option>
                  <option value="UG">Uganda</option><option value="UA">Ukraine</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="UY">Uruguay</option><option value="UZ">Uzbekistan</option>
                  <option value="VE">Venezuela</option><option value="VN">Vietnam</option>
                  <option value="ZM">Zambia</option><option value="ZW">Zimbabwe</option>
                </select>
              </div>

              <div style={billRow}>
                <label style={billLabelStyle} htmlFor="email">Email Address {req}</label>
                <input id="email" name="email" type="email" required autoComplete="email"
                  defaultValue={booking.email}
                  style={{ ...inputBase, flex: 1, maxWidth: 175 }} />
              </div>

              <div style={billRow}>
                <label style={billLabelStyle} htmlFor="phone">Phone # {req}</label>
                <input id="phone" name="phone" type="tel" required autoComplete="tel"
                  style={{ ...inputBase, flex: 1, maxWidth: 175 }} />
              </div>
            </div>
          </div>

          {/* ── Order Summary Bar ── */}
          <div style={{
            marginTop: 28,
            padding: "16px 20px",
            background: "#f7f9fc",
            border: "1px solid #dde4ed",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}>
            <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>Base Amount</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: NAVY }}>${baseNum.toFixed(2)}</div>
              </div>
              {payMethod === "cc" && (
                <div>
                  <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>Surcharge (2.5%)</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#c0392b" }}>+${surchargeStr}</div>
                </div>
              )}
              <div>
                <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>Total Due</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: GREEN }}>${grandStr}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#888" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1a6 6 0 1 0 0 12A6 6 0 0 0 7 1zM7 4v3.5l2 1" stroke="#888" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {payMethod === "cc" ? "Secured by CardPointe" : "ACH — No surcharge"}
            </div>
          </div>

          {/* ── Submit ── */}
          <div style={{ marginTop: 24 }}>
            <motion.button
              type="submit"
              disabled={submitting || baseNum <= 0}
              whileTap={{ scale: 0.98 }}
              style={{
                background: submitting ? "#888" : baseNum <= 0 ? "#aaa" : GREEN,
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "12px 32px",
                fontSize: 15,
                fontWeight: 600,
                cursor: submitting || baseNum <= 0 ? "not-allowed" : "pointer",
                fontFamily: FONT,
                letterSpacing: 0.2,
                display: "flex",
                alignItems: "center",
                gap: 10,
                minWidth: 220,
                justifyContent: "center",
              }}
            >
              {submitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%" }}
                  />
                  Processing…
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="1" y="4" width="16" height="11" rx="2" stroke="white" strokeWidth="1.5"/>
                    <path d="M1 8h16" stroke="white" strokeWidth="1.5"/>
                    <path d="M5 12h2M9 12h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Submit Payment — ${grandStr}
                </>
              )}
            </motion.button>
            <p style={{ marginTop: 10, fontSize: 12, color: "#999", display: "flex", alignItems: "center", gap: 5 }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1.5" y="5" width="9" height="6.5" rx="1.5" stroke="#999" strokeWidth="1.2"/><path d="M4 5V3.5a2 2 0 1 1 4 0V5" stroke="#999" strokeWidth="1.2" strokeLinecap="round"/></svg>
              256-bit SSL encryption · PCI DSS compliant
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}