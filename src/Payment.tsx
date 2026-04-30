/**
 * Payment.tsx
 * Matches the CardPointe HPP screenshot 1:1.
 *
 * Layout observations from the screenshot:
 *  - White bg, body font ~15px, color #003f62
 *  - Title row: h1 left + logo right (logo from /logo.png in public)
 *  - Amount row: label (180px) + $ prefixed input (~130px wide)
 *  - Invoice Number row: label (180px) + input (~190px)
 *  - Two-column section below (Payment Info | Billing Info)
 *  - Payment Info: label on its own line above input (stacked)
 *  - Billing Info: label inline-left (~155px) + input inline-right
 *  - CC/ACH toggle: green "Credit Card" + dark "ACH (eCheck)"
 *  - Expiration: MM dropdown then YYYY dropdown on SEPARATE lines
 *  - CVV: small input ~80px
 *  - Card icons at bottom of payment col
 *  - Submit Payment: green button bottom-left
 */

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface BookingInfo {
  name: string;
  email: string;
  eventType: string;
}

function getQueryParams(): BookingInfo {
  if (typeof window === "undefined")
    return { name: "", email: "", eventType: "Day Charter" };
  const p = new URLSearchParams(window.location.search);
  return {
    name: p.get("name") ?? "",
    email: p.get("email") ?? "",
    eventType: p.get("eventType") ?? "Day Charter",
  };
}

// ─── Shared style tokens (matching HPP exactly) ───────────────────────────────
const NAVY = "#003f62";
const RED  = "#c0392b";
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

const payRow: React.CSSProperties = {
  marginBottom: 12,
};

const payLabel: React.CSSProperties = {
  display: "block",
  fontSize: 15,
  color: NAVY,
  marginBottom: 4,
  fontWeight: 400,
};

const req = <span style={{ color: RED, marginLeft: 1 }}>*</span>;

// ─── US States ────────────────────────────────────────────────────────────────
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

// ─── Card Icons ───────────────────────────────────────────────────────────────
function CardIcons() {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 14 }}>
      {/* Visa */}
      <div style={{ width: 52, height: 33, border: "1px solid #ddd", borderRadius: 4, background: "#1a1f71", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <svg viewBox="0 0 780 500" width="48" height="30" xmlns="http://www.w3.org/2000/svg">
          <path d="m293.2 348.73 33.361-195.76h53.36l-33.385 195.76h-53.336zm246.11-191.54c-10.57-3.966-27.137-8.222-47.822-8.222-52.725 0-89.865 26.55-90.18 64.603-.299 28.13 26.514 43.822 46.752 53.186 20.771 9.595 27.752 15.714 27.654 24.283-.131 13.121-16.586 19.116-31.922 19.116-21.357 0-32.703-2.967-50.227-10.276l-6.876-3.11-7.489 43.823c12.463 5.464 35.51 10.198 59.438 10.443 56.09 0 92.5-26.246 92.916-66.882.199-22.269-14.016-39.216-44.801-53.188-18.65-9.055-30.072-15.099-29.951-24.268 0-8.137 9.668-16.839 30.557-16.839 17.449-.27 30.09 3.535 39.938 7.5l4.781 2.26 7.232-42.429m137.31-4.223h-41.232c-12.773 0-22.332 3.487-27.941 16.234l-79.244 179.4h56.031s9.16-24.123 11.232-29.418c6.125 0 60.555.084 68.338.084 1.596 6.853 6.49 29.334 6.49 29.334h49.514l-43.188-195.64zm-65.418 126.41c4.412-11.279 21.26-54.723 21.26-54.723-.316.522 4.379-11.334 7.074-18.684l3.605 16.879s10.219 46.729 12.354 56.528h-44.293zm-363.3-126.41-52.24 133.5-5.567-27.13c-9.725-31.273-40.025-65.155-73.898-82.118l47.766 171.2 56.456-.064 84.004-195.39h-56.521" fill="#fff"/>
          <path d="m146.92 152.96h-86.041l-.681 4.073c66.938 16.204 111.23 55.363 129.62 102.41l-18.71-89.96c-3.23-12.395-12.597-16.094-24.186-16.527" fill="#F2AE14"/>
        </svg>
      </div>

      {/* Mastercard */}
      <div style={{ width: 52, height: 33, border: "1px solid #ddd", borderRadius: 4, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
        <svg viewBox="0 0 152 108" width="50" height="33" xmlns="http://www.w3.org/2000/svg">
          <circle cx="52" cy="54" r="44" fill="#eb001b"/>
          <circle cx="100" cy="54" r="44" fill="#f79e1b"/>
          <path d="M76 20.6A44 44 0 0 1 99.8 54 44 44 0 0 1 76 87.4 44 44 0 0 1 52.2 54 44 44 0 0 1 76 20.6z" fill="#ff5f00"/>
        </svg>
      </div>

      {/* Discover */}
      <div style={{ width: 52, height: 33, border: "1px solid #ddd", borderRadius: 4, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <svg viewBox="0 0 780 500" width="48" height="30" xmlns="http://www.w3.org/2000/svg">
          <rect width="780" height="500" rx="40" fill="#4D4D4D"/>
          <circle cx="415" cy="213" r="53" fill="#F47216"/>
          <path d="M327.152 161.893c8.837 0 16.248 1.784 25.268 6.09v22.751c-8.544-7.863-15.955-11.154-25.756-11.154-19.264 0-34.414 15.015-34.414 34.05 0 20.075 14.681 34.196 35.37 34.196 9.312 0 16.586-3.12 24.8-10.857v22.763c-9.341 4.14-16.911 5.776-25.756 5.776-31.278 0-55.582-22.596-55.582-51.737 0-28.826 24.951-51.878 56.07-51.878zm-97.113.627c11.546 0 22.11 3.72 30.943 10.994l-10.748 13.248c-5.35-5.646-10.41-8.028-16.564-8.028-8.853 0-15.3 4.745-15.3 10.989 0 5.354 3.619 8.188 15.944 12.482 23.365 8.044 30.29 15.176 30.29 30.926 0 19.193-14.976 32.553-36.32 32.553-15.63 0-26.994-5.795-36.458-18.872l13.268-12.03c4.73 8.61 12.622 13.222 22.42 13.222 9.163 0 15.947-5.952 15.947-13.984 0-4.164-2.055-7.734-6.158-10.258-2.066-1.195-6.158-2.977-14.2-5.647-19.291-6.538-25.91-13.527-25.91-27.185 0-16.225 14.214-28.41 32.846-28.41zm234.723 1.728h22.437l28.084 66.592 28.446-66.592h22.267l-45.494 101.686h-11.053l-44.687-101.686zm-397.348.152h30.15c33.312 0 56.534 20.382 56.534 49.641 0 14.59-7.104 28.696-19.118 38.057-10.108 7.901-21.626 11.445-37.574 11.445H67.414V164.4zm20.526 17v65.559h5.512c13.273 0 21.656-2.394 28.11-7.88 7.103-5.955 11.376-15.465 11.376-24.98 0-9.499-4.273-18.725-11.376-24.681-6.785-5.78-14.837-8.018-28.11-8.018H87.94zm74.009-17h20.54v99.143h-20.54V164.4zm411.734 0h58.252v16.8H595.81v22.005h36.336v16.791h-36.336v26.762h37.726v16.785h-58.252V164.4zm71.858 0h30.455c23.69 0 37.265 10.71 37.265 29.272 0 15.18-8.514 25.14-23.986 28.105l33.148 41.766h-25.26l-28.429-39.828h-2.678v39.828h-20.515V164.4zm20.515 15.616v30.025h6.002c13.117 0 20.069-5.362 20.069-15.328 0-9.648-6.954-14.697-19.745-14.697h-6.326z" fill="#FFF"/>
        </svg>
      </div>

      {/* Amex */}
      <div style={{ width: 52, height: 33, border: "1px solid #ddd", borderRadius: 4, background: "#2557d6", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 200 80" width="48" xmlns="http://www.w3.org/2000/svg">
          <text x="10" y="58" fontSize="52" fontWeight="bold" fontFamily="Arial" fill="white" letterSpacing="-2">AMEX</text>
        </svg>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PaymentPage() {
  const [booking] = useState<BookingInfo>(getQueryParams);
  const [payMethod, setPayMethod] = useState<"cc" | "ach">("cc");
  const [country, setCountry] = useState("US");
  const [amount, setAmount] = useState("0.00");

  const HPP_ACTION = "https://dickscottauto.securepayments.cardpointe.com/pay";

  return (
    <div style={base}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 28px 48px" }}>

        {/* ══ BACK BUTTON ══ */}
        <div style={{ marginBottom: 16 }}>
          <button
            type="button"
            onClick={() => window.history.back()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "1px solid #c0c0c0",
              borderRadius: 4,
              padding: "6px 14px",
              fontSize: 14,
              color: NAVY,
              cursor: "pointer",
              fontFamily: FONT,
              fontWeight: 500,
              transition: "background 0.15s",
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = "#f0f4f8"; }}
            onMouseOut={(e)  => { e.currentTarget.style.background = "none"; }}
          >
            {/* Left arrow SVG */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12L6 8L10 4" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
        </div>

        {/* ══ TITLE ROW ══ */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "flex-start", marginBottom: 28 }}>
          <h1 style={{
            fontFamily: '"Raleway", sans-serif',
            fontSize: 32,
            fontWeight: 700,
            color: NAVY,
            margin: 0,
            lineHeight: 1.25,
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
          }}>
            <span style={{ fontSize: 26, marginTop: 3 }}>🔒</span>
            Serendipity Yacht Charter Auto Payment Page
          </h1>

          {/* ── Logo (fixed path) ── */}
          <div style={{ textAlign: "center", minWidth: 120 }}>
            <img
              src="/assets/site-logo.png"
              alt="Serendipity"
              style={{ maxHeight: 80, maxWidth: 160, objectFit: "contain" }}
              onError={(e) => {
                // Hide broken image rather than loop
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>

        {/* ══ FORM ══ */}
        <form action={HPP_ACTION} id="payForm" method="post">

          {/* Hidden fields */}
          <input type="hidden" name="xsubmit"          value="Y"       autoComplete="off" />
          <input type="hidden" name="paymentType"      id="paymentType" value={payMethod} autoComplete="off" />
          <input type="hidden" name="type"             id="type"       value="Pay"     autoComplete="off" />
          <input type="hidden" name="token"            id="token"      value=""        autoComplete="off" />
          <input type="hidden" name="baseTotal"        id="baseTotal"  value={amount}  autoComplete="off" />
          <input type="hidden" name="overallTotal"     id="overallTotal" value={amount} autoComplete="off" />
          <input type="hidden" name="creditOrDebit"    id="creditOrDebit"               autoComplete="off" />
          <input type="hidden" name="surchargeConvFee" id="surchargeConvFee" value="0"  autoComplete="off" />
          <input type="hidden" name="debitType"        id="debitType"  value="credit"  autoComplete="off" />
          <input type="hidden" name="cardToken"        id="cardToken"  value=""        autoComplete="off" />

          {/* ── Amount ── */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
            <span style={topLabelStyle}>Amount <span style={{ color: RED }}>*</span></span>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid #c0c0c0", borderRadius: 2 }}>
              <span style={{ padding: "5px 7px", fontSize: 15, color: "#555", borderRight: "1px solid #c0c0c0", background: "#f3f3f3", lineHeight: 1.4 }}>$</span>
              <input
                id="total" name="total" type="text" inputMode="decimal"
                value={amount} onChange={(e) => setAmount(e.target.value)}
                size={10} maxLength={10}
                style={{ border: "none", padding: "5px 8px", fontSize: 15, color: "#333", outline: "none", width: 90, fontFamily: FONT }}
              />
            </div>
          </div>

          {/* Surcharge info */}
          <div style={{ marginLeft: 180, marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
              <span style={{ ...topLabelStyle, width: 200, fontSize: 14, color: "#444" }}>Credit Card Surcharge</span>
              <input type="text" name="transactionFee" id="transactionFee" value="0.00" readOnly
                style={{ ...inputBase, width: 110, background: "#f8f8f8", color: "#666", fontSize: 14 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
              <span style={{ ...topLabelStyle, width: 200, fontSize: 14, color: "#444" }}>Total</span>
              <input type="text" name="grandTotal" id="grandTotal" value="0.00" readOnly
                style={{ ...inputBase, width: 110, background: "#f8f8f8", color: "#666", fontSize: 14 }} />
            </div>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#555", fontStyle: "italic" }}>
              To cover the cost of accepting credit cards, we will collect a 2.5% credit card surcharge.
            </p>
          </div>

          {/* ── Invoice Number ── */}
          <div style={{ display: "flex", alignItems: "center", marginTop: 14, marginBottom: 28 }}>
            <span style={topLabelStyle}>Invoice Number</span>
            <input type="text" name="invoice" size={20} style={{ ...inputBase, width: 192 }} />
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

              {/* Toggle buttons */}
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
                    {/* Card Number */}
                    <div style={payRow}>
                      <label style={payLabel} htmlFor="CreditCardNumber">Card Number {req}</label>
                      <input id="CreditCardNumber" name="number" type="text" size={30} autoComplete="cc-number"
                        style={{ ...inputBase, width: 268 }} />
                    </div>

                    {/* Expiration Date — MM then YYYY on separate lines */}
                    <div style={payRow}>
                      <label style={payLabel} htmlFor="expirationDateMonth">Expiration Date {req}</label>
                      <div style={{ marginBottom: 6 }}>
                        <select id="expirationDateMonth" name="expirationDateMonth" autoComplete="cc-exp-month" defaultValue=""
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
                        <select id="expirationDateYear" name="expirationDateYear" autoComplete="cc-exp-year" defaultValue=""
                          style={{ ...selectBase, width: 158 }}>
                          <option value="" disabled>YYYY</option>
                          {Array.from({ length: 21 }, (_, i) => 2026 + i).map((y) => (
                            <option key={y} value={String(y)}>{y}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Security Code */}
                    <div style={payRow}>
                      <label style={payLabel} htmlFor="CreditCardCVV">
                        Security Code <small style={{ fontWeight: 400 }}>(CVV)</small> {req}
                      </label>
                      <input id="CreditCardCVV" name="CVV2" type="text" size={5} maxLength={4} autoComplete="cc-csc"
                        style={{ ...inputBase, width: 80 }} />
                    </div>

                    <CardIcons />
                  </motion.div>
                ) : (
                  <motion.div key="ach" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                    <div style={payRow}>
                      <label style={payLabel} htmlFor="routingNumber">Routing Number {req}</label>
                      <input id="routingNumber" name="routingNumber" type="text" maxLength={9}
                        style={{ ...inputBase, width: 200 }} />
                    </div>
                    <div style={payRow}>
                      <label style={payLabel} htmlFor="accountNumber">Account Number {req}</label>
                      <input id="accountNumber" name="accountNumber" type="text" maxLength={17}
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
                  <label style={billLabelStyle} htmlFor={id}>
                    {label} {isReq && req}
                  </label>
                  <input id={id} name={name} type="text" required={isReq} autoComplete={autoComplete}
                    style={{ ...inputBase, flex: 1, maxWidth: 175 }} />
                </div>
              ))}

              {/* State */}
              <div style={billRow}>
                <label style={billLabelStyle} htmlFor="tempBillState">State {req}</label>
                <select id="tempBillState" name="tempBillState" required={country === "US"} defaultValue=""
                  style={{ ...selectBase, flex: 1, maxWidth: 175 }}>
                  <option value="" disabled>Please Select</option>
                  {US_STATES.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
                </select>
              </div>

              {/* Zip */}
              <div style={billRow}>
                <label style={billLabelStyle} htmlFor="billZip">Zip/Postal Code {req}</label>
                <input id="billZip" name="billZip" type="text" required autoComplete="postal-code"
                  style={{ ...inputBase, flex: 1, maxWidth: 175 }} />
              </div>

              {/* Country */}
              <div style={billRow}>
                <label style={billLabelStyle} htmlFor="billCountry">Country {req}</label>
                <select id="billCountry" name="billCountry" required value={country} onChange={(e) => setCountry(e.target.value)}
                  style={{ ...selectBase, flex: 1, maxWidth: 175 }}>
                  <option value="">Please Select</option>
                  <option value="AF">Afghanistan</option><option value="AL">Albania</option><option value="DZ">Algeria</option>
                  <option value="AS">American Samoa</option><option value="AD">Andorra</option><option value="AO">Angola</option>
                  <option value="AI">Anguilla</option><option value="AG">Antigua and Barbuda</option><option value="AR">Argentina</option>
                  <option value="AM">Armenia</option><option value="AW">Aruba</option><option value="AU">Australia</option>
                  <option value="AT">Austria</option><option value="AZ">Azerbaijan</option><option value="BS">Bahamas</option>
                  <option value="BH">Bahrain</option><option value="BD">Bangladesh</option><option value="BB">Barbados</option>
                  <option value="BY">Belarus</option><option value="BE">Belgium</option><option value="BZ">Belize</option>
                  <option value="BJ">Benin</option><option value="BM">Bermuda</option><option value="BT">Bhutan</option>
                  <option value="BO">Bolivia</option><option value="BA">Bosnia and Herzegowina</option><option value="BW">Botswana</option>
                  <option value="BV">Bouvet Island</option><option value="BN">Brunei Darussalam</option><option value="BG">Bulgaria</option>
                  <option value="BF">Burkina Faso</option><option value="MM">Burma (Myanmar)</option><option value="BI">Burundi</option>
                  <option value="KH">Cambodia</option><option value="CM">Cameroon</option><option value="CA">Canada</option>
                  <option value="CV">Cape Verde</option><option value="KY">Cayman Islands</option><option value="CF">Central African Republic</option>
                  <option value="TD">Chad</option><option value="CL">Chile</option><option value="CN">China (People's Republic)</option>
                  <option value="CX">Christmas Island</option><option value="CC">Cocos Island</option><option value="CO">Colombia</option>
                  <option value="KM">Comoros</option><option value="CG">Congo, People's Republic of</option><option value="CK">Cook Islands</option>
                  <option value="CR">Costa Rica</option><option value="CI">Cote D'Ivoire</option><option value="HR">Croatia (Hrvatska)</option>
                  <option value="CU">Cuba</option><option value="CW">Curacao</option><option value="CY">Cyprus</option>
                  <option value="CZ">Czech Republic</option><option value="CD">Democratic Republic of Congo (Zaire)</option>
                  <option value="DK">Denmark</option><option value="DJ">Djibouti</option><option value="DM">Dominica</option>
                  <option value="DO">Dominican Republic</option><option value="TL">East Timor</option><option value="EC">Ecuador</option>
                  <option value="EG">Egypt</option><option value="SV">El Salvador</option><option value="GQ">Equatorial Guinea</option>
                  <option value="ER">Eritrea</option><option value="EE">Estonia</option><option value="ET">Ethiopia</option>
                  <option value="FK">Falkland Islands (Malvinas)</option><option value="FO">Faroe Islands</option><option value="FJ">Fiji</option>
                  <option value="FI">Finland</option><option value="FR">France</option><option value="GF">French Guiana</option>
                  <option value="PF">French Polynesia</option><option value="GA">Gabon</option><option value="GM">Gambia</option>
                  <option value="GE">Georgia</option><option value="DE">Germany</option><option value="GH">Ghana</option>
                  <option value="GI">Gibraltar</option><option value="GR">Greece</option><option value="GL">Greenland</option>
                  <option value="GD">Grenada</option><option value="GP">Guadeloupe</option><option value="GU">Guam</option>
                  <option value="GT">Guatemala</option><option value="GN">Guinea</option><option value="GW">Guinea-Bissau</option>
                  <option value="GY">Guyana</option><option value="HT">Haiti</option><option value="HN">Honduras</option>
                  <option value="HK">Hong Kong</option><option value="HU">Hungary</option><option value="IS">Iceland</option>
                  <option value="IN">India</option><option value="ID">Indonesia</option><option value="IR">Iran (Islamic Republic of)</option>
                  <option value="IQ">Iraq</option><option value="IE">Ireland (Republic of Ireland)</option><option value="IL">Israel</option>
                  <option value="IT">Italy</option><option value="JM">Jamaica</option><option value="JP">Japan</option>
                  <option value="JO">Jordan</option><option value="KZ">Kazakhstan</option><option value="KE">Kenya</option>
                  <option value="KI">Kiribati</option><option value="KW">Kuwait</option><option value="KG">Kyrgyzstan</option>
                  <option value="LA">Laos (Lao People's Democratic Republic)</option><option value="LV">Latvia</option><option value="LB">Lebanon</option>
                  <option value="LS">Lesotho</option><option value="LR">Liberia</option><option value="LI">Liechtenstein</option>
                  <option value="LT">Lithuania</option><option value="LU">Luxembourg</option><option value="MO">Macao</option>
                  <option value="MK">Macedonia, Republic of</option><option value="MG">Madagascar</option><option value="MW">Malawi</option>
                  <option value="MY">Malaysia</option><option value="MV">Maldives</option><option value="ML">Mali</option>
                  <option value="MT">Malta</option><option value="MH">Marshall Islands</option><option value="MQ">Martinique</option>
                  <option value="MR">Mauritania</option><option value="MU">Mauritius</option><option value="MX">Mexico</option>
                  <option value="FM">Micronesia, Federated States of</option><option value="MD">Moldova, Republic of</option>
                  <option value="MC">Monaco</option><option value="MN">Mongolia</option><option value="ME">Montenegro</option>
                  <option value="MS">Montserrat</option><option value="MA">Morocco</option><option value="MZ">Mozambique</option>
                  <option value="NA">Namibia</option><option value="NR">Nauru</option><option value="NP">Nepal</option>
                  <option value="NL">Netherlands (Holland)</option><option value="AN">Netherlands Antilles</option><option value="NC">New Caledonia</option>
                  <option value="NZ">New Zealand</option><option value="NI">Nicaragua</option><option value="NE">Niger</option>
                  <option value="NG">Nigeria</option><option value="NU">Niue</option><option value="NF">Norfolk Island</option>
                  <option value="KP">North Korea (Democratic Republic of Korea)</option><option value="NB">Northern Ireland</option>
                  <option value="NO">Norway</option><option value="OM">Oman</option><option value="PK">Pakistan</option>
                  <option value="PW">Palau</option><option value="PS">Palestinian Territory, Occupied</option><option value="PA">Panama</option>
                  <option value="PG">Papua New Guinea</option><option value="PY">Paraguay</option><option value="PE">Peru</option>
                  <option value="PH">Philippines</option><option value="PN">Pitcairn</option><option value="PL">Poland</option>
                  <option value="PT">Portugal</option><option value="PR">Puerto Rico</option><option value="QA">Qatar</option>
                  <option value="RE">Reunion</option><option value="RO">Romania</option><option value="RU">Russian Federation</option>
                  <option value="RW">Rwanda</option><option value="SH">Saint Helena</option><option value="KN">Saint Kitts and Nevis</option>
                  <option value="LC">Saint Lucia</option><option value="PM">Saint Pierre and Miquelon</option>
                  <option value="VC">Saint Vincent and The Grenadines</option><option value="MP">Saipan</option>
                  <option value="WS">Samoa, Independent State of</option><option value="SM">San Marino</option>
                  <option value="ST">Sao Tome and Principe</option><option value="SA">Saudi Arabia</option><option value="SN">Senegal</option>
                  <option value="RS">Serbia</option><option value="SC">Seychelles</option><option value="SL">Sierra Leone</option>
                  <option value="SG">Singapore</option><option value="SX">Sint Maartin</option><option value="SK">Slovakia (Slovak Republic)</option>
                  <option value="SI">Slovenia</option><option value="SB">Solomon Islands</option><option value="SO">Somalia</option>
                  <option value="ZA">South Africa</option><option value="GS">South Georgia and The South Sandwich Islands</option>
                  <option value="KR">South Korea (Republic of Korea)</option><option value="ES">Spain</option><option value="LK">Sri Lanka</option>
                  <option value="SD">Sudan</option><option value="SR">Suriname</option><option value="SJ">Svalbard and Jan Mayen Islands</option>
                  <option value="SZ">Swaziland</option><option value="SE">Sweden</option><option value="CH">Switzerland</option>
                  <option value="SY">Syrian Arab Republic</option><option value="TW">Taiwan</option><option value="TJ">Tajikistan</option>
                  <option value="TZ">Tanzania, United Republic of</option><option value="TH">Thailand</option><option value="TG">Togo</option>
                  <option value="TK">Tokelau</option><option value="TO">Tonga</option><option value="TT">Trinidad and Tobago</option>
                  <option value="TN">Tunisia</option><option value="TR">Turkey</option><option value="TM">Turkmenistan</option>
                  <option value="TC">Turks and Caicos Islands</option><option value="TV">Tuvalu</option><option value="UG">Uganda</option>
                  <option value="UA">Ukraine</option><option value="AE">United Arab Emirates</option><option value="GB">United Kingdom</option>
                  <option value="US">United States</option><option value="UM">United States Minor Outlying Islands</option>
                  <option value="UY">Uruguay</option><option value="UZ">Uzbekistan</option><option value="VU">Vanuatu</option>
                  <option value="VA">Vatican City State (Holy See)</option><option value="VE">Venezuela</option><option value="VN">Vietnam</option>
                  <option value="VG">Virgin Islands (British)</option><option value="VI">Virgin Islands (U.S.)</option>
                  <option value="WF">Wallis and Futuna Islands</option><option value="EH">Western Sahara</option>
                  <option value="YE">Yemen (Republic of)</option><option value="ZM">Zambia</option><option value="ZW">Zimbabwe</option>
                </select>
              </div>

              {/* Email */}
              <div style={billRow}>
                <label style={billLabelStyle} htmlFor="email">Email Address {req}</label>
                <input id="email" name="email" type="email" required autoComplete="email"
                  defaultValue={booking.email}
                  style={{ ...inputBase, flex: 1, maxWidth: 175 }} />
              </div>

              {/* Phone */}
              <div style={billRow}>
                <label style={billLabelStyle} htmlFor="phone">Phone # {req}</label>
                <input id="phone" name="phone" type="tel" required autoComplete="tel"
                  style={{ ...inputBase, flex: 1, maxWidth: 175 }} />
              </div>
            </div>
          </div>

          {/* ── Submit Button ── */}
          <div style={{ marginTop: 32 }}>
            <button
              type="submit" id="submitBtn" name="submitBtn"
              style={{ background: "#2e7d32", color: "#fff", border: "none", borderRadius: 4, padding: "10px 26px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: FONT, letterSpacing: 0.2 }}
              onMouseOver={(e) => { e.currentTarget.style.background = "#1b5e20"; }}
              onMouseOut={(e)  => { e.currentTarget.style.background = "#2e7d32"; }}
            >
              Submit Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}