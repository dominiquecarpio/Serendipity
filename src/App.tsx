/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { motion, AnimatePresence, useScroll, useSpring, useInView } from "motion/react";
import {
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Play,
  GlassWater,
  Speaker,
  Star,
  Sparkles,
  MapPin,
  Phone,
  Check,
  ArrowUpRight,
  Users,
  Wind,
  Droplets,
  Utensils,
  Zap,
  Facebook,
  Instagram,
  Twitter,
  ChevronDown,
  ZoomIn,
  Anchor,
  Clock,
  DollarSign,
  Ship,
  Gauge,
  Fuel,
  Wrench,
  Settings,
  Activity,
  Camera,
  Eye,
  Home,
  Compass,
  Waves,
  Send,
  Pause,
  Plus,
  ChevronUp,
  Layers,
  Navigation,
  Shield,
  Wifi,
  ThermometerSun,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Experience {
  img: string;
  tag: string;
  title: string;
  desc: string;
  features: string[];
}

interface HeroSlide {
  line1: string;
  line2: string;
  desc: string;
  img: string;
  mobileImg?: string;
  tag: string;
}

interface Room {
  img: string;
  sub: string;
  title: string;
  desc: string;
  amenities: string[];
  extraAmenities?: string[];
  bathDesc?: string;
  extraImages?: string[];
}

interface FleetVessel {
  img: string;
  name: string;
  desc: string;
  specs: { label: string; value: string }[];
  length: string;
  guests: string;
  cabins: string;
  imgIndex: number;
}

interface GalleryImage {
  src: string;
  tab: "exterior" | "interior";
  label: string;
}

interface PhotoGalleryItem {
  src: string;
  label: string;
  glowColor: "gold" | "blue" | "teal" | "rose";
  tall?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const EXPERIENCES: Experience[] = [
  {
    img: "assets/occasion1.png",
    tag: "Leisure",
    title: "Sunset Cruises & Day Excursions",
    desc: "Watch the Gulf Coast horizon blaze with color as Serendipity glides through calm waters. Our sunset cruises are timed perfectly to the golden hour, with craft cocktails, soft music, and panoramic views from the flybridge.",
    features: [
      "Professional crew & captain",
      "Craft cocktails included",
      "Up to 4 hours on water",
      "Available year-round",
    ],
  },
  {
    img: "assets/occasion2.png",
    tag: "Celebration",
    title: "Birthday & Anniversary Celebrations",
    desc: "Make your milestone unforgettable. We coordinate every detail—from floral décor and custom cakes to curated playlists and chef-prepared menus—so all you do is celebrate.",
    features: [
      "Custom décor packages",
      "Private chef available",
      "Champagne toast included",
      "Photography coordination",
    ],
  },
  {
    img: "assets/occasion3.png",
    tag: "Corporate",
    title: "Corporate & Executive Events",
    desc: "Impress clients and inspire your team in an extraordinary setting. Serendipity offers an exclusive boardroom on the water with full AV capabilities, catering, and absolute privacy.",
    features: [
      "Full AV & WiFi setup",
      "Catering packages",
      "Up to 12 executives",
      "NDAs & confidentiality honored",
    ],
  },
  {
    img: "assets/occasion4.png",
    tag: "Wellness",
    title: "Wellness Retreats on the Water",
    desc: "Disconnect from the noise and reconnect with yourself. Our wellness retreats feature guided meditation, yoga on the sundeck, spa treatments, and clean, nourishing cuisine tailored to your needs.",
    features: [
      "Certified yoga instructor",
      "Spa & massage options",
      "Organic catering menu",
      "Mindfulness packages",
    ],
  },
  {
    img: "assets/occasion5.png",
    tag: "VIP Room",
    title: "First Class Relaxation",
    desc: "Experience the pinnacle of luxury in our VIP staterooms. Each room is a sanctuary of comfort, featuring plush bedding, ambient lighting, and personalized service.",
    features: [
      "Plush bedding with premium linens",
      "Climate-controlled environment",
      "Private ensuite bathroom",
      "Personalized service",
    ],
  },
  {
    img: "assets/occasion6.png",
    tag: "Kitchen",
    title: "Chef's Cooking Class",
    desc: "Join our award-winning chef for an immersive culinary experience on the water. Learn to prepare signature dishes while enjoying stunning ocean views.",
    features: [
      "Hands-on cooking experience",
      "Premium ingredients provided",
      "Take-home recipes",
      "Wine pairing included",
    ],
  },
];

const ROOMS: Room[] = [
  {
    img: "assets/accomodation1.webp",
    sub: "Master Suite",
    title: "Primary Stateroom",
    desc: "The full-beam Master Stateroom is a private sanctuary, featuring a plush king-size bed that is framed by oversized stainless porthole windows, overflowing with natural light. This room includes:",
    amenities: [
      "Double-door entry for a grand welcome",
      "Walk-in closet plus two armoires",
      "Makeup vanity (port side) and working desk (starboard) with bookshelves and filing cabinets",
      'Flat screen 32" TV with satellite DirecTV and entertainment center',
      "Motorized blackout shades and custom ambient lighting, including ceiling and wall sconces",
      "Independent climate control",
    ],
    extraAmenities: [
      "Oversized frameless glass shower with dual-controlled showerheads",
      "His & hers walkthrough vanity with quartz countertops",
      "Herringbone travertine mosaic floor",
      "Two large vanity cabinets with ample room for cosmetics, hairdryers, and personal care items",
      "Two full-height linen closets (port and starboard)",
    ],
    bathDesc: "Designed with you in mind, the full-beam ensuite master bath includes:",
    extraImages: ["assets/accomodation2.webp", "assets/accomodation3.webp"],
  },
  {
    img: "assets/accomodation4.webp",
    sub: "Port VIP",
    title: "Port VIP Stateroom",
    desc: "Located on the port side, this VIP guest suite features a queen-size bed and large stainless porthole windows that spill natural light into the room.",
    amenities: [
      "Custom motorized shades with indirect ceiling lighting",
      "Satellite DirecTV plasma TV and climate-controlled comfort",
      "Generous storage with drawers under the bed and a cedar lined closet",
    ],
    extraAmenities: [
      "Frameless full-size shower",
      "Herringbone mosaic travertine flooring",
      "Quartz vanity top with ample counter space",
      "Vanity mirrors and separate storage closet for personal items",
    ],
    bathDesc: "The port VIP ensuite bath offers:",
    extraImages: ["assets/accomodation5.webp", "assets/accomodation6.webp"],
  },
  {
    img: "assets/accomodation7.webp",
    sub: "Starboard VIP",
    title: "Starboard VIP Stateroom",
    desc: "The Starboard VIP Stateroom mirrors its port side counterpart for the same upscale features.",
    amenities: [
      "Queen-size bed with under-bed storage",
      "Stainless porthole windows for natural light",
      "Motorized lighting control and ambient LED accents",
      "Satellite DirecTV and climate-controlled atmosphere",
      "Cedar-lined closet for longer charters or extended stays",
    ],
    extraAmenities: [
      "Frameless glass shower with full standing height",
      "Elegant quartz vanity with mosaic tile flooring",
      "Generous vanity storage and personal care cabinet",
    ],
    bathDesc: "The starboard VIP ensuite bath includes:",
    extraImages: ["assets/accomodation8.webp", "assets/accomodation9.webp"],
  },
  {
    img: "assets/accomodation10.webp",
    sub: "Midship",
    title: "Midship Stateroom",
    desc: "The Midship Stateroom offers a beautifully appointed retreat centered around a comfortable double bed, bathed in natural light through a generous stainless steel porthole window. This inviting space includes:",
    amenities: [
      "Motorized shades paired with refined ambient lighting — indirect cove illumination and soft accent lights — to set the perfect mood",
      "Independently controlled air conditioning for personalized comfort",
      "Satellite DirecTV entertainment system",
      "Abundant storage with spacious drawers beneath the bed and a cedar lined closet",
    ],
    extraAmenities: [
      "A full-size, frameless glass shower",
      "Vanity mirrors flanked by generous storage and a dedicated vanity closet for grooming essentials",
      "A subtly elegant quartz countertop atop a mosaic herringbone travertine floor",
    ],
    bathDesc: "Thoughtfully designed with your ease in mind, the adjoining ensuite bath includes:",
    extraImages: ["assets/accomodation11.webp"],
  },
];

const EXTERIOR_GALLERY: GalleryImage[] = [
  { src: "assets/hero1.png", tab: "exterior", label: "Bow View at Sunset" },
  { src: "assets/hero2.png", tab: "exterior", label: "Open Gulf Waters" },
  { src: "assets/hero3.png", tab: "exterior", label: "Starboard Profile" },
  { src: "assets/occasion1.png", tab: "exterior", label: "Aft Deck at Anchor" },
  { src: "assets/occasion2.png", tab: "exterior", label: "Flybridge Entertaining" },
  { src: "assets/occasion3.png", tab: "exterior", label: "Full Port Side" },
  { src: "assets/occasion4.png", tab: "exterior", label: "Stern View at Sea" },
  { src: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=800", tab: "exterior", label: "Bow at Sunrise" },
  { src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800", tab: "exterior", label: "Gulf Coast Cruise" },
  { src: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&q=80&w=800", tab: "exterior", label: "Anchor in Paradise" },
  { src: "https://img.freepik.com/free-photo/infinity-pool-with-ocean-view-sunset_23-2151993705.jpg?semt=ais_hybrid&w=740&q=80", tab: "exterior", label: "Twilight on the Water" },
  { src: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=800", tab: "exterior", label: "Sundeck Life" },
];

const INTERIOR_GALLERY: GalleryImage[] = [
  { src: "assets/gallerymain.png", tab: "interior", label: "Master Stateroom" },
  { src: "assets/occasion5.png", tab: "interior", label: "VIP Stateroom" },
  { src: "assets/occasion6.png", tab: "interior", label: "Galley Kitchen" },
  { src: "assets/cheryl_foods.jpeg", tab: "interior", label: "Fine Dining — Chef Cheryl" },
  { src: "assets/cheryl_foods1.jpeg", tab: "interior", label: "Culinary Artistry" },
  { src: "assets/cheryl_foods2.jpeg", tab: "interior", label: "Chef's Table Experience" },
  { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800", tab: "interior", label: "Salon Lounge" },
  { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800", tab: "interior", label: "Chef's Preparation" },
  { src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=800", tab: "interior", label: "Ensuite Bathroom" },
  { src: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&q=80&w=800", tab: "interior", label: "Navigation Helm" },
  { src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800", tab: "interior", label: "Luxury Bedding Suite" },
  { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800", tab: "interior", label: "Private Deck Lounge" },
];

const DESTINATIONS = [
  { name: "Egmont Key", img: "assets/egmont_key.jpg", desc: "A refuge for wildlife, the Tampa Bay island known as Egmont Key is home to gopher tortoises and myriad seabirds. As a refuge for visitors, Egmont Key State Park is rich in history and can be visited by private boat.", distance: "45 min", tag: "Nature & History" },
  { name: "St Petersburg Iconic Pier", img: "assets/IconicPier.jpg", desc: "The new St. Pete Pier! This gleaming attraction on the city's picturesque waterfront promises limitless fun. Its 26 beautiful acres seamlessly combine the peaceful blue waters of Tampa Bay with the vibrant greenery of downtown.", distance: "20 min", tag: "Iconic Landmark" },
  { name: "Shell Key Preserve", img: "assets/Shell_Key.jpg", desc: "Anchor in crystal turquoise waters for world-class shelling and paddleboarding. Shell Key is a pristine barrier island offering some of the most breathtaking natural scenery on the Gulf Coast.", distance: "35 min", tag: "Snorkeling & Shelling" },
  { name: "Pass-A-Grille", img: "assets/Pass_A_Grille.jpg", desc: "Enjoy a legendary sunset with a curated beach picnic delivered to your yacht. Pass-A-Grille's bohemian charm, award-winning restaurants, and historic character make it one of the Gulf's most beloved stops.", distance: "30 min", tag: "Dining & Sunset" },
  { name: "Anna Maria Island", img: "assets/Anna_Maria.jpg", desc: "Old Florida charm meets pristine beaches on Anna Maria Island. Explore the turquoise waters, dine at waterfront restaurants, and experience the laid-back luxury that defines Gulf Coast living.", distance: "60 min", tag: "Beach & Dining" },
  { name: "Honeymoon Island", img: "assets/Honeymoon_Island.jpg", desc: "One of Florida's most visited state parks, Honeymoon Island offers pristine beaches, nature trails, and some of the Gulf's best shelling. The perfect romantic or family destination.", distance: "40 min", tag: "State Park" },
];

const CHARTER_RATES = [
  { name: "Day Trip", price: "$10,000", duration: "10am – 6pm", nights: "0", guests: "Up to 12", desc: "Departs at 10am and returns by 6pm. Includes use of 2 Jet Skis & 16' Nautica RIB to visit local beaches, islands and restaurants.", highlights: ["2 Jet Skis included", "16' Nautica RIB tender", "Local beaches & islands", "Restaurant stops"], popular: false },
  { name: "Weekend Getaway", price: "$20,000", duration: "Fri noon – Sun 3pm", nights: "2", guests: "Up to 8", desc: "Departs at 12 noon on Friday and returns Sunday at 3pm. Enjoy 3 days and 2 overnights with up to 8 guests in four staterooms.", highlights: ["3 days / 2 nights", "4 private staterooms", "Sarasota to Tarpon Springs range", "Full crew included"], popular: true },
  { name: "Full Week", price: "$35,000", duration: "Mon noon – Sun 3pm", nights: "6", guests: "Up to 8", desc: "Departs at 12 noon on Monday and returns Sunday at 3pm. Enjoy 7 days and 6 overnights with up to 8 guests in four staterooms.", highlights: ["7 days / 6 nights", "4 private staterooms", "Key West to Destin FL range", "Full crew & private chef"], popular: false },
];

const SPECIAL_RATES = [
  { name: "Corporate Events", price: "$15,000", desc: "Catered by local waterfront restaurant destinations. The vessel can accommodate up to 25 guests onboard for cocktails and hors d'oeuvres for 6-hour cruises." },
  { name: "Birthdays & Anniversaries", price: "$7,500", desc: "Celebrate an intimate event with themed decor in honor of the special guest. Up to 10 people can be accommodated for a 6-hour sunset cruise." },
  { name: "Culinary & Wine Cheese Events", price: "$7,500", desc: "Enjoy a private chef-prepared meal prepared fresh in the country kitchen for up to 8 guests on a 6-hour dinner cruise." },
];

const PHOTO_COL_1: PhotoGalleryItem[] = [
  { src: "assets/occasion1.png", label: "Sunset Cruise", glowColor: "gold", tall: true },
  { src: "assets/occasion2.png", label: "Anniversary Charter", glowColor: "teal", tall: false },
  { src: "assets/hero1.png", label: "Gulf Waters", glowColor: "blue", tall: true },
  { src: "assets/cheryl_foods.jpeg", label: "Fine Dining", glowColor: "rose", tall: false },
  { src: "assets/occasion4.png", label: "Wellness Retreat", glowColor: "teal", tall: true },
];

const PHOTO_COL_2: PhotoGalleryItem[] = [
  { src: "assets/hero2.png", label: "Open Sea", glowColor: "blue", tall: false },
  { src: "assets/gallerymain.png", label: "Master Stateroom", glowColor: "gold", tall: true },
  { src: "assets/occasion3.png", label: "Corporate Event", glowColor: "teal", tall: false },
  { src: "assets/cheryl_foods1.jpeg", label: "Culinary Artistry", glowColor: "rose", tall: true },
  { src: "assets/occasion5.png", label: "VIP Suite", glowColor: "blue", tall: false },
];

const PHOTO_COL_3: PhotoGalleryItem[] = [
  { src: "assets/cheryl_foods2.jpeg", label: "Chef's Table", glowColor: "rose", tall: true },
  { src: "assets/hero3.png", label: "Starboard View", glowColor: "blue", tall: false },
  { src: "assets/occasion6.png", label: "Chef's Kitchen", glowColor: "gold", tall: true },
  { src: "assets/occasion1.png", label: "Island Hopping", glowColor: "teal", tall: false },
  { src: "assets/gallerymain.png", label: "Luxury Interior", glowColor: "gold", tall: true },
];

const GLOW_MAP: Record<PhotoGalleryItem["glowColor"], string> = {
  gold: "linear-gradient(90deg, transparent, #c9a227, transparent)",
  blue: "linear-gradient(90deg, transparent, #3b82f6, transparent)",
  teal: "linear-gradient(90deg, transparent, #14b8a6, transparent)",
  rose: "linear-gradient(90deg, transparent, #f43f5e, transparent)",
};

// ─── HD Video Helper ──────────────────────────────────────────────────────────
const HD_VIDEO_STYLE: React.CSSProperties = {
  imageRendering: "auto",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  transform: "translateZ(0)",
  willChange: "transform",
};

// ─── Section 1: Cinematic Video (attract_video.mp4) ───────────────────────────
function CinematicVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="vessel"
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "100vh" }}
    >
      <video
        ref={videoRef}
        src="/assets/attract_video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{
          ...HD_VIDEO_STYLE,
          filter: "brightness(1) contrast(1.05) saturate(1.1)",
        }}
      />
      {/* Subtle cinematic gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.5) 100%)",
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.18) 100%)",
        }}
      />
      {/* Bottom label */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-[10px] font-bold tracking-[4px] uppercase text-white">Serendipity</span>
        <div className="w-px h-8 bg-white/40" />
      </div>
    </section>
  );
}

function InlineSpecsVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-5%" });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="specs-section"
      className="relative overflow-hidden bg-black"
    >
      <div className="relative w-full h-[55vh] md:h-[70vh] max-h-[800px] flex justify-center">
        <video
          ref={videoRef}
          src="/assets/fast.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute left-1/2 top-0 h-full w-[85%] md:w-[75%] lg:w-[65%] -translate-x-1/2 object-cover object-center"
          style={{
            ...HD_VIDEO_STYLE,
            filter: "brightness(1) contrast(1.05) saturate(1.08)",
          }}
        />

        {/* Top fade */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: "120px",
            background: "linear-gradient(to bottom, #040d1a, transparent)",
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "120px",
            background: "linear-gradient(to top, #040d1a, transparent)",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.15) 100%)",
          }}
        />
      </div>
    </section>
  );
}

// ─── Mobile Components ────────────────────────────────────────────────────────
function MobileBottomNav({ openAvail }: { openAvail: () => void }) {
  const [active, setActive] = useState("home");
  const navItems = [
    { id: "home", icon: Home, label: "Home", href: "#home" },
    { id: "experiences", icon: Waves, label: "Explore", href: "#experiences" },
    { id: "booking", icon: Anchor, label: "Book", href: "/book", isExternal: true, isPrimary: true },
    { id: "gallery", icon: Camera, label: "Gallery", href: "#gallery" },
    { id: "pricing", icon: DollarSign, label: "Pricing", href: "#pricing" },
  ];
  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-[999]"
      style={{
        background: "rgba(4, 13, 26, 0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(201, 162, 39, 0.15)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={() => !item.isExternal && setActive(item.id)}
            className="flex flex-col items-center gap-1 relative group"
            style={{ minWidth: 56, padding: "4px 8px" }}
          >
            {item.isPrimary ? (
              <motion.div
                whileTap={{ scale: 0.92 }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #c9a227, #f0c040)",
                  boxShadow: "0 0 20px rgba(201,162,39,0.4)",
                  marginTop: -20,
                }}
              >
                <item.icon className="w-5 h-5 text-navy" strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div
                whileTap={{ scale: 0.88 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                style={{ background: active === item.id ? "rgba(201,162,39,0.15)" : "transparent" }}
              >
                <item.icon
                  className="w-5 h-5 transition-colors"
                  style={{ color: active === item.id ? "#c9a227" : "rgba(255,255,255,0.4)" }}
                />
              </motion.div>
            )}
            <span
              className="text-[9px] font-bold tracking-wide uppercase transition-colors"
              style={{
                color: item.isPrimary ? "#c9a227" : active === item.id ? "#c9a227" : "rgba(255,255,255,0.3)",
                marginTop: item.isPrimary ? 2 : 0,
              }}
            >
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function MobileHeroStats() {
  const stats = [
    { val: "94'", label: "Lazzara" },
    { val: "12", label: "Guests" },
    { val: "5.0★", label: "Rating" },
    { val: "20+", label: "Spots" },
  ];
  return (
    <div className="flex items-center overflow-x-auto gap-0 scrollbar-hide" style={{ scrollSnapType: "x mandatory" }}>
      {stats.map((s, i) => (
        <div
          key={i}
          className="flex-shrink-0 flex flex-col items-center px-5 py-3"
          style={{
            scrollSnapAlign: "start",
            borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
          }}
        >
          <span className="text-lg text-gold font-bold leading-none">{s.val}</span>
          <span className="text-[9px] uppercase tracking-[1.5px] text-white/40 mt-1">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function MobileQuickActions({
  openAvail,
  openVideo,
  openRoute,
}: {
  openAvail: () => void;
  openVideo: () => void;
  openRoute: () => void;
}) {
  const actions = [
    { label: "Check Dates", icon: Clock, action: openAvail, color: "rgba(201,162,39,0.15)", textColor: "#c9a227" },
    { label: "Watch Video", icon: Play, action: openVideo, color: "rgba(255,255,255,0.06)", textColor: "rgba(255,255,255,0.7)" },
    { label: "View Route", icon: Compass, action: openRoute, color: "rgba(255,255,255,0.06)", textColor: "rgba(255,255,255,0.7)" },
  ];
  return (
    <div className="flex gap-2 px-4 mt-4">
      {actions.map((a, i) => (
        <motion.button
          key={i}
          whileTap={{ scale: 0.94 }}
          onClick={a.action}
          className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl border"
          style={{
            background: a.color,
            borderColor: a.textColor === "#c9a227" ? "rgba(201,162,39,0.3)" : "rgba(255,255,255,0.08)",
          }}
        >
          <a.icon className="w-4 h-4" style={{ color: a.textColor }} />
          <span className="text-[10px] font-bold tracking-wide" style={{ color: a.textColor }}>
            {a.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

function MobilePricingCard({ rate }: { rate: (typeof CHARTER_RATES)[0] }) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="w-full rounded-3xl overflow-hidden"
      style={{
        background: rate.popular
          ? "linear-gradient(145deg, rgba(201,162,39,0.12) 0%, rgba(4,13,26,0.8) 100%)"
          : "rgba(255,255,255,0.04)",
        border: rate.popular ? "1px solid rgba(201,162,39,0.35)" : "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {rate.popular && (
        <div className="flex justify-center pt-0">
          <span
            className="text-[9px] font-bold uppercase tracking-widest px-5 py-1.5 rounded-b-xl"
            style={{ background: "#c9a227", color: "#040d1a" }}
          >
            Most Popular
          </span>
        </div>
      )}
      <div className="p-5">
        <h3 className="text-lg mb-1">{rate.name}</h3>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-3xl font-serif text-gold font-bold">{rate.price}</span>
          <span className="text-white/30 text-xs">/ charter</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-1 text-white/40 text-[10px] bg-white/5 rounded-full px-2.5 py-1">
            <Clock className="w-3 h-3 text-gold/60" /> {rate.duration}
          </div>
          <div className="flex items-center gap-1 text-white/40 text-[10px] bg-white/5 rounded-full px-2.5 py-1">
            <Users className="w-3 h-3 text-gold/60" /> {rate.guests}
          </div>
        </div>
        <div className="space-y-2 mb-5">
          {rate.highlights.slice(0, 3).map((h, j) => (
            <div key={j} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                <Check className="w-2.5 h-2.5 text-gold" />
              </div>
              <span className="text-xs text-white/50">{h}</span>
            </div>
          ))}
        </div>
        <a
          href="/book"
          className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold transition-all"
          style={{
            background: rate.popular ? "#c9a227" : "rgba(255,255,255,0.06)",
            color: rate.popular ? "#040d1a" : "rgba(255,255,255,0.6)",
            border: rate.popular ? "none" : "1px solid rgba(255,255,255,0.1)",
          }}
        >
          Book {rate.name} <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}

function MobileDestCard({
  dest,
  onTap,
}: {
  dest: (typeof DESTINATIONS)[0];
  onTap: () => void;
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.96 }}
      onClick={onTap}
      className="flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer"
      style={{ width: 200, height: 260 }}
    >
      <div className="relative w-full h-full">
        <img src={dest.img} className="w-full h-full object-cover" alt={dest.name} />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(4,13,26,0.9) 0%, transparent 55%)" }}
        />
        <div className="absolute top-3 left-3">
          <span
            className="text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ background: "rgba(201,162,39,0.85)", color: "#040d1a" }}
          >
            {dest.tag}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-sm text-white leading-snug">{dest.name}</p>
          <div className="flex items-center gap-1 mt-1 text-white/40">
            <Clock className="w-2.5 h-2.5" />
            <span className="text-[9px]">{dest.distance}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CalendarComponent({ onSelect }: { onSelect: (date: string) => void }) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1));
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const bookedDays = [3, 7, 8, 14, 21, 22, 27];
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const daysHeader = ["Su","Mo","Tu","We","Th","Fr","Sa"];
  const changeMonth = (dir: number) => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + dir, 1));
  };
  const toggleDay = (d: number, isBooked: boolean) => {
    if (isBooked) return;
    const dateStr = `${d} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    setSelectedDays((prev) => {
      const idx = prev.indexOf(d);
      if (idx === -1) { onSelect(dateStr); return [...prev, d]; }
      return prev.filter((day) => day !== d);
    });
  };
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const totalDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const today = new Date();
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-white/5 rounded-lg transition-colors border border-white/10 text-white/50 hover:text-white"><ChevronLeft className="w-5 h-5" /></button>
        <span className="text-lg">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
        <button onClick={() => changeMonth(1)} className="p-2 hover:bg-white/5 rounded-lg transition-colors border border-white/10 text-white/50 hover:text-white"><ChevronRight className="w-5 h-5" /></button>
      </div>
      <div className="cal-grid">
        {daysHeader.map((h) => (<div key={h} className="cal-head">{h}</div>))}
        {Array.from({ length: firstDay }).map((_, i) => (<div key={`empty-${i}`} className="cal-day empty" />))}
        {Array.from({ length: totalDays }).map((_, i) => {
          const d = i + 1;
          const isToday = d === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();
          const isBooked = bookedDays.includes(d);
          const isSelected = selectedDays.includes(d);
          return (
            <div
              key={d}
              onClick={() => toggleDay(d, isBooked)}
              className={`cal-day ${isBooked ? "booked" : isSelected ? "selected" : "available"} ${isToday && !isBooked ? "today" : ""}`}
            >
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Photo Gallery Components ─────────────────────────────────────────────────
function PhotoGalleryCard({ item, onZoom }: { item: PhotoGalleryItem; onZoom: (src: string) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative rounded-2xl overflow-hidden flex-shrink-0"
      style={{
        border: hovered ? "1px solid rgba(201,162,39,0.3)" : "1px solid rgba(255,255,255,0.06)",
        transition: "border-color 0.3s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        background: "#061020",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onPointerUp={(e) => { e.stopPropagation(); onZoom(item.src); }}
    >
      <div
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: GLOW_MAP[item.glowColor],
          opacity: hovered ? 1 : 0, transition: "opacity 0.3s", zIndex: 5,
        }}
      />
      <img
        src={item.src}
        alt={item.label}
        draggable={false}
        className="w-full block object-cover"
        style={{
          aspectRatio: item.tall ? "3/4" : "16/9",
          transition: "transform 0.7s cubic-bezier(0.19,1,0.22,1)",
          transform: hovered ? "scale(1.08)" : "scale(1)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(4,13,26,0.9) 0%, rgba(4,13,26,0.1) 60%, transparent 100%)",
          opacity: hovered ? 1 : 0, transition: "opacity 0.4s",
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          padding: "14px 16px", pointerEvents: "none",
        }}
      >
        <span style={{ fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{item.label}</span>
        <ZoomIn style={{ width: 15, height: 15, color: "rgba(255,255,255,0.5)" }} />
      </div>
    </div>
  );
}

function PhotoScrollColumn({
  items,
  speed,
  direction,
  topOffset = 0,
  onZoom,
}: {
  items: PhotoGalleryItem[];
  speed: number;
  direction: 1 | -1;
  topOffset?: number;
  onZoom: (src: string) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const dragRef = useRef<{ startY: number; startOffset: number } | null>(null);
  const onZoomRef = useRef(onZoom);
  useEffect(() => { onZoomRef.current = onZoom; }, [onZoom]);
  const tripled = useMemo(() => [...items, ...items, ...items], [items]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const oneSetHeight = track.scrollHeight / 3;
    if (offsetRef.current === 0) { offsetRef.current = oneSetHeight; track.style.transform = `translateY(${-offsetRef.current}px)`; }
    function loop() {
      if (!pausedRef.current && dragRef.current === null) {
        offsetRef.current += speed * direction;
        if (direction === 1 && offsetRef.current >= oneSetHeight * 2) offsetRef.current -= oneSetHeight;
        if (direction === -1 && offsetRef.current <= 0) offsetRef.current += oneSetHeight;
      }
      track!.style.transform = `translateY(${-offsetRef.current}px)`;
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed, direction]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current || !trackRef.current) return;
      const delta = dragRef.current.startY - e.clientY;
      const half = trackRef.current.scrollHeight / 2;
      let next = dragRef.current.startOffset + delta;
      if (next > half) next -= half;
      if (next < 0) next += half;
      offsetRef.current = next;
    };
    const onUp = () => { dragRef.current = null; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: 680 }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; dragRef.current = null; }}
      onMouseDown={(e) => { e.preventDefault(); dragRef.current = { startY: e.clientY, startOffset: offsetRef.current }; }}
      onTouchStart={(e) => { dragRef.current = { startY: e.touches[0].clientY, startOffset: offsetRef.current }; }}
      onTouchMove={(e) => {
        if (!dragRef.current || !trackRef.current) return;
        const delta = dragRef.current.startY - e.touches[0].clientY;
        const half = trackRef.current.scrollHeight / 2;
        let next = dragRef.current.startOffset + delta;
        if (next > half) next -= half;
        if (next < 0) next += half;
        offsetRef.current = next;
      }}
      onTouchEnd={() => { dragRef.current = null; }}
    >
      <div className="pointer-events-none absolute top-0 left-0 right-0 z-10" style={{ height: 80, background: "linear-gradient(to bottom, #040d1a, transparent)" }} />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10" style={{ height: 80, background: "linear-gradient(to top, #040d1a, transparent)" }} />
      <div
        ref={trackRef}
        className="flex flex-col gap-4 select-none"
        style={{ marginTop: topOffset, willChange: "transform", cursor: "grab" }}
      >
        {tripled.map((item, i) => (
          <PhotoGalleryCard key={`${item.src}__${i}`} item={item} onZoom={(src) => onZoomRef.current(src)} />
        ))}
      </div>
    </div>
  );
}

function MobileGalleryStrip({ onZoom }: { onZoom: (src: string) => void }) {
  const allImages = [...PHOTO_COL_1, ...PHOTO_COL_2, ...PHOTO_COL_3];
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollSnapType: "x mandatory" }}>
      {allImages.map((item, i) => (
        <motion.div
          key={i}
          whileTap={{ scale: 0.95 }}
          onClick={() => onZoom(item.src)}
          className="flex-shrink-0 relative rounded-2xl overflow-hidden cursor-pointer"
          style={{ width: 140, height: 180, scrollSnapAlign: "start", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <img src={item.src} alt={item.label} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,13,26,0.8) 0%, transparent 60%)" }} />
          <div className="absolute top-2 left-0 right-0 flex justify-center"><div className="w-8 h-0.5 rounded-full" style={{ background: GLOW_MAP[item.glowColor] }} /></div>
          <div className="absolute bottom-3 left-3 right-3"><p className="text-[9px] uppercase tracking-[1px] text-white/60 font-bold truncate">{item.label}</p></div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Charter Highlights Modal ─────────────────────────────────────────────────
function CharterHighlightsModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[10010] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(2,5,15,0.96)", backdropFilter: "blur(24px)" }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-3xl overflow-hidden border border-white/10"
        style={{
          background: "#060e1e",
          maxHeight: "92vh",
          boxShadow: "0 0 80px rgba(201,162,39,0.08), 0 40px 120px rgba(0,0,0,0.8)",
        }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 text-white/30 hover:text-white transition-colors rounded-xl hover:bg-white/5">
          <X className="w-5 h-5" />
        </button>
        <div className="overflow-y-auto" style={{ maxHeight: "92vh" }}>
          <div className="relative flex-shrink-0" style={{ height: 240 }}>
            <video
              className="w-full h-full object-cover"
              src="/assets/videos.mp4"
              autoPlay
              muted
              loop
              playsInline
              style={{ pointerEvents: "none", filter: "brightness(0.55) saturate(1.1)", ...HD_VIDEO_STYLE }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,14,30,0.4) 0%, transparent 40%, rgba(6,14,30,0.98) 100%)" }} />
            <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "rgba(6,14,30,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(201,162,39,0.25)" }}>
              <Star className="w-3 h-3 fill-gold text-gold" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-gold">5.0 Rated Charter</span>
            </div>
            <div className="absolute bottom-6 left-0 right-0 text-center z-10">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-8 h-px bg-gold/50" />
                <span className="text-[9px] font-bold uppercase tracking-[3px] text-gold/70">Overnight or Day Charter</span>
                <div className="w-8 h-px bg-gold/50" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-white drop-shadow-2xl">Charter Highlights</h2>
            </div>
          </div>
          <div className="p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {[
                { icon: MapPin, text: "Based in Saint Petersburg, perfectly located between Tampa and Sarasota", color: "#c9a227" },
                { icon: Compass, text: "Unmatched flexibility with access to Gulf and Intercoastal routes", color: "#3b82f6" },
                { icon: Ship, text: "Exceptionally rare 100ft yacht with shallow draft—access exclusive spots", color: "#14b8a6" },
                { icon: Sparkles, text: "Newly remodeled interior with crewed, concierge-level service", color: "#f43f5e" },
                { icon: Navigation, text: "Convenient access from major airports and marinas", color: "#a855f7" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-4 p-4 rounded-2xl transition-all cursor-default"
                  style={{ background: `${item.color}06`, border: `1px solid ${item.color}15` }}
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}15` }}>
                    <item.icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-3 mb-8 p-5 rounded-2xl" style={{ background: "rgba(201,162,39,0.05)", border: "1px solid rgba(201,162,39,0.12)" }}>
              {[{ val: "94 ft", label: "Vessel" }, { val: "12", label: "Max Guests" }, { val: "4", label: "Suites" }, { val: "5.0★", label: "Rating" }].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }} className="text-center">
                  <div className="text-xl text-gold font-bold">{s.val}</div>
                  <div className="text-[9px] uppercase tracking-[2px] text-white/30 mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#contact" onClick={onClose} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm border border-gold/40 text-gold hover:bg-gold/10 transition-all">
                <Phone className="w-4 h-4" /> Contact for Custom Itineraries
              </a>
              <a href="/book" onClick={onClose} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all hover:translate-y-[-1px]" style={{ background: "linear-gradient(135deg, #c9a227, #f0c040)", color: "#040d1a" }}>
                Book Now <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Flybridge Section ────────────────────────────────────────────────────────
function FlybridgeSection({ onTourClick }: { onTourClick: () => void }) {
  const [activeImg, setActiveImg] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const flybridgeImages = [
    { src: "assets/occasion2.png", label: "Al Fresco Dining" },
    { src: "assets/occasion3.png", label: "Lounge & Entertainment" },
    { src: "assets/occasion4.png", label: "Panoramic Views" },
  ];

  const features = [
    { icon: Droplets, text: "Jacuzzi" },
    { icon: Wind, text: "Sun Lounge" },
    { icon: Utensils, text: "Dining Deck" },
    { icon: GlassWater, text: "Wet Bar" },
    { icon: Speaker, text: "Audio System" },
    { icon: Zap, text: "LED Ambience" },
  ];

  useEffect(() => {
    const t = setInterval(() => setActiveImg((p) => (p + 1) % flybridgeImages.length), 5000);
    return () => clearInterval(t);
  }, [flybridgeImages.length]);

  return (
    <section
      id="flybridge"
      ref={sectionRef}
      className="py-16 md:py-28 px-4 md:px-8 lg:px-16 relative overflow-hidden"
      style={{ background: "linear-gradient(to top, #0b1929, transparent)" }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -40 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: "#c9a227" }} />
              <span className="text-[10px] font-bold uppercase tracking-[4px]" style={{ color: "#c9a227" }}>Luxury Living</span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl text-white leading-[1.1] mb-8">
              Expansive<br />
              <em className="italic" style={{ color: "#c9a227" }}>Flybridge</em><br />
              <span className="text-white/40 text-3xl md:text-4xl block mt-2 font-light">for up to 12 guests</span>
            </h2>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 mb-8 backdrop-blur-md">
              <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#c9a227] mb-6">Flybridge Experience</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {features.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <Check className="w-3.5 h-3.5" style={{ color: "#c9a227" }} />
                    <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-8 max-w-md text-white/50">
              Four private suites designed for absolute comfort, privacy, and quiet ocean living with 360° sightlines.
            </p>
            <motion.button
              onClick={onTourClick}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold transition-all shadow-xl shadow-black/40"
              style={{ background: "#c9a227", color: "#050a10" }}
            >
              Tour Serendipity
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 40 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="relative rounded-3xl overflow-hidden mb-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5" style={{ aspectRatio: "16/10" }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={flybridgeImages[activeImg].src}
                  alt={flybridgeImages[activeImg].label}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                />
              </AnimatePresence>
              <div className="absolute bottom-4 left-4 px-4 py-2 rounded-xl" style={{ background: "rgba(5,10,16,0.7)", backdropFilter: "blur(12px)" }}>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">{flybridgeImages[activeImg].label}</span>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                {flybridgeImages.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ width: activeImg === i ? 30 : 8, background: activeImg === i ? "#c9a227" : "rgba(255,255,255,0.3)" }}
                    className="h-1 rounded-full"
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {flybridgeImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative rounded-xl overflow-hidden transition-all duration-300 border-2 ${activeImg === i ? "border-[#c9a227] opacity-100" : "border-transparent opacity-40"}`}
                  style={{ aspectRatio: "16/10" }}
                >
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Water Toys Section ───────────────────────────────────────────────────────
function WaterToysSection() {
  const [activeImg, setActiveImg] = useState(0);
  const [hoveredToy, setHoveredToy] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const toyImages = [
    { src: "assets/occasion3.png", label: "Jet Ski Launch" },
    { src: "assets/occasion2.png", label: "Al Fresco on the Water" },
    { src: "assets/occasion1.png", label: "Full Vessel" },
  ];

  const toys = [
    { icon: Zap, label: "2 SeaDoo Spark Jet Skis", desc: "Twin high-performance personal watercraft", color: "#c9a227" },
    { icon: Anchor, label: "16' Novurania Jet Drive RIB", desc: "Rigid inflatable tender for island exploration", color: "#c9a227" },
    { icon: Waves, label: "Waterskiing & Wakeboarding", desc: "Full gear set for aquatic adventure", color: "#c9a227" },
    { icon: Compass, label: "Snorkel Sets & Paddle Boards", desc: "Explore beneath and above the surface", color: "#c9a227" },
  ];

  useEffect(() => {
    const t = setInterval(() => setActiveImg((p) => (p + 1) % toyImages.length), 4200);
    return () => clearInterval(t);
  }, [toyImages.length]);

  return (
    <section
      id="water-toys"
      ref={sectionRef}
      className="py-16 md:py-28 px-4 md:px-8 lg:px-16 relative overflow-hidden"
      style={{ background: "#051126" }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -40 }} transition={{ duration: 0.8 }} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5" style={{ aspectRatio: "16/10" }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={toyImages[activeImg].src}
                  alt={toyImages[activeImg].label}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute bottom-4 left-4 px-4 py-2 rounded-xl" style={{ background: "rgba(5, 10, 16, 0.75)", backdropFilter: "blur(12px)" }}>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">{toyImages[activeImg].label}</span>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                {toyImages.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    animate={{ width: activeImg === i ? 24 : 8, background: activeImg === i ? "#c9a227" : "rgba(255,255,255,0.3)" }}
                    className="h-1 rounded-full"
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {toyImages.map((img, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  whileHover={{ scale: 1.03 }}
                  className="relative rounded-xl overflow-hidden transition-all"
                  style={{ aspectRatio: "16/10", border: activeImg === i ? "2px solid #c9a227" : "2px solid transparent", opacity: activeImg === i ? 1 : 0.4 }}
                >
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 40 }} transition={{ duration: 0.8, delay: 0.1 }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: "#c9a227" }} />
              <span className="text-[10px] font-bold uppercase tracking-[4px]" style={{ color: "#c9a227" }}>Onboard Amenities</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-[1.1] mb-8">
              Water Toys<br />
              <span className="text-white/40 font-light">Included for Your</span><br />
              <em className="italic" style={{ color: "#c9a227" }}>Enjoyment</em>
            </h2>
            <div className="space-y-3 mb-10">
              {toys.map((toy, i) => (
                <motion.div
                  key={i}
                  onMouseEnter={() => setHoveredToy(i)}
                  onMouseLeave={() => setHoveredToy(null)}
                  className="flex items-center gap-5 p-4 rounded-2xl transition-all border"
                  style={{
                    background: hoveredToy === i ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
                    borderColor: hoveredToy === i ? "rgba(201,162,39,0.3)" : "rgba(255,255,255,0.05)",
                  }}
                >
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: hoveredToy === i ? "rgba(201,162,39,0.15)" : "rgba(255,255,255,0.05)" }}>
                    <toy.icon className="w-5 h-5 transition-colors" style={{ color: hoveredToy === i ? "#c9a227" : "#666" }} />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">{toy.label}</div>
                    <div className="text-xs text-white/40 mt-0.5">{toy.desc}</div>
                  </div>
                  <ArrowUpRight className="ml-auto w-4 h-4 transition-all" style={{ color: "#c9a227", opacity: hoveredToy === i ? 1 : 0.2 }} />
                </motion.div>
              ))}
            </div>
            <motion.a
              href="/book"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-sm font-bold transition-all shadow-xl shadow-black/40"
              style={{ background: "#c9a227", color: "#050a10" }}
            >
              Plan Your Experience
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Room Detail Modal ────────────────────────────────────────────────────────
function RoomDetailModal({ room, onClose }: { room: Room; onClose: () => void }) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="max-w-3xl w-full bg-navy-light rounded-3xl overflow-hidden border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-hide">
      <div className="relative h-64 md:h-80">
        <img src={room.img} alt={room.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-light via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ background: "rgba(201,162,39,0.9)", color: "#040d1a" }}>{room.sub}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(201,162,39,0.6), transparent)" }} />
      </div>
      <div className="p-6 md:p-10">
        <div className="flex items-center gap-3 mb-2"><div className="w-8 h-[1px] bg-gold" /><span className="text-[9px] uppercase tracking-[3px] text-gold/60 font-bold">{room.sub} Suite</span></div>
        <h2 className="text-2xl md:text-3xl font-serif mb-3">{room.title}</h2>
        <p className="text-sm text-white/60 mb-6 leading-relaxed">{room.desc}</p>
        <h3 className="text-xs font-bold uppercase tracking-[2px] text-gold/70 mb-3 flex items-center gap-2"><span className="w-4 h-px bg-gold/40" /> Key Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {room.amenities.map((a, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white/5 border border-white/8 rounded-xl">
              <div className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3 text-gold" /></div>
              <span className="text-xs text-white/70">{a}</span>
            </div>
          ))}
        </div>
        {room.extraAmenities && room.extraAmenities.length > 0 && (
          <div className="mb-6">
            <AnimatePresence>
              {showMore && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
                  <div className="mt-2 mb-4">
                    {room.bathDesc && (
                      <div className="p-4 rounded-2xl mb-4" style={{ background: "rgba(201,162,39,0.06)", border: "1px solid rgba(201,162,39,0.15)" }}>
                        <p className="text-[10px] uppercase tracking-[2px] text-gold/60 font-bold mb-2">Ensuite Bath</p>
                        <p className="text-xs text-white/60 leading-relaxed">{room.bathDesc}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {room.extraAmenities.map((a, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="flex items-start gap-3 p-3 bg-white/3 border border-white/6 rounded-xl">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                          <span className="text-xs text-white/55 leading-relaxed">{a}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => setShowMore(!showMore)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-[2px] transition-all"
              style={{
                background: showMore ? "rgba(201,162,39,0.08)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${showMore ? "rgba(201,162,39,0.25)" : "rgba(255,255,255,0.08)"}`,
                color: showMore ? "#c9a227" : "rgba(255,255,255,0.4)",
              }}
            >
              {showMore ? <><ChevronUp className="w-4 h-4" /> Show Less</> : <><Plus className="w-4 h-4" /> View All Room Details</>}
            </button>
          </div>
        )}
        {room.extraImages && room.extraImages.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {room.extraImages.map((src, i) => (
              <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden border border-white/8">
                <img src={src} alt={`${room.title} ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
        )}
        <a href="#contact" onClick={onClose} className="w-full py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-hover transition-colors flex items-center justify-center gap-2 text-sm">
          Inquire About This Suite <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({
  isScrolled,
  isHidden,
  setMobileMenuOpen,
  openAvail,
}: {
  isScrolled: boolean;
  isHidden: boolean;
  setMobileMenuOpen: (o: boolean) => void;
  openAvail: () => void;
}) {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 px-6 md:px-16 overflow-visible ${
        isScrolled ? "bg-navy/90 backdrop-blur-2xl py-4 shadow-xl" : "py-8"
      } ${isHidden ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center flex-shrink-0">
          <a href="#" className="group">
            <img src="assets/logo.png" alt="Logo" className="h-10 md:h-16 lg:h-20 w-auto group-hover:scale-105 transition-transform" />
          </a>
        </div>

        <div className="hidden lg:flex items-center gap-6 xl:gap-10 flex-nowrap overflow-visible">
          <a href="#vessel" className="whitespace-nowrap flex-shrink-0 text-white/70 hover:text-white transition">Vessel</a>
          <a href="#accommodations" className="whitespace-nowrap flex-shrink-0 text-white/70 hover:text-white transition">Accommodations</a>
          <a href="#experiences" className="whitespace-nowrap flex-shrink-0 text-white/70 hover:text-white transition">Experiences</a>
          <a href="#destinations" className="whitespace-nowrap flex-shrink-0 text-white/70 hover:text-white transition">Destinations</a>
          <div className="relative group z-50">
            <button className="flex items-center gap-1 whitespace-nowrap text-white/70 hover:text-white transition">
              Explore
              <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-navy-light/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden py-2">
              <button onClick={openAvail} className="w-full text-left px-5 py-3 whitespace-nowrap text-green-400 hover:bg-white/5 hover:text-green-300 transition">● Live Availability</button>
              <a href="#culinary" className="block px-5 py-3 whitespace-nowrap text-white/70 hover:text-gold hover:bg-white/5">Culinary</a>
              <a href="#mechanical" className="block px-5 py-3 whitespace-nowrap text-white/70 hover:text-gold hover:bg-white/5">Mechanical</a>
              <a href="#reviews" className="block px-5 py-3 whitespace-nowrap text-white/70 hover:text-gold hover:bg-white/5">Reviews</a>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="relative group z-50">
            <a href="/book" className="flex items-center gap-2 whitespace-nowrap bg-gold px-5 py-2.5 rounded-full text-navy font-bold text-sm hover:translate-y-[-2px] transition shadow-lg shadow-gold/20">
              Book Now
              <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
            </a>
            <div className="absolute right-0 mt-2 w-44 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-black/10 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <a href="/reservation" className="block px-4 py-3 whitespace-nowrap text-sm text-gray-800 hover:bg-gray-100">Reserve</a>
              <a href="#contact" className="block px-4 py-3 whitespace-nowrap text-sm text-gray-800 hover:bg-gray-100">Inquire</a>
            </div>
          </div>
          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 text-white border border-white/10 rounded-xl hover:bg-white/5">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────
function MobileMenu({ setMobileMenuOpen, openAvail }: { setMobileMenuOpen: (o: boolean) => void; openAvail: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="fixed inset-0 bg-navy/98 backdrop-blur-2xl z-[2000] flex flex-col"
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
        <img src="assets/logo.png" alt="Serendipity" className="h-10 w-auto" />
        <button onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="flex flex-col gap-1">
          {["Home","Vessel","Experiences","Gallery","Flybridge","Accommodations","Culinary","Destinations","Pricing","Mechanical","Reviews","Inquire"].map((l, i) => (
            <motion.a
              key={l}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 + 0.1 }}
              href={l === "Home" ? "#home" : l === "Inquire" ? "#contact" : `#${l.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-4 border-b border-white/5 group"
            >
              <span className="text-xl font-serif text-white/80 group-hover:text-gold transition-colors">{l}</span>
              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-gold transition-colors" />
            </motion.a>
          ))}
        </div>
      </div>
      <div className="px-6 py-5 border-t border-white/5 flex flex-col gap-3">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => { setMobileMenuOpen(false); openAvail(); }}
          className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-gold text-xs font-bold uppercase tracking-[2px]"
        >
          <div className="w-2 h-2 rounded-full bg-green-400 relative"><div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-60" /></div>
          Check Live Availability
        </motion.button>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="grid grid-cols-2 gap-3">
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border border-gold/30 text-gold font-bold text-sm hover:bg-gold/10 transition-all">
            <Send className="w-4 h-4" /> Inquire
          </a>
          <a href="/book" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gold text-navy font-bold text-sm">
            Reserve <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function Hero({
  heroIdx,
  setHeroIdx,
  openAvail,
  openVideo,
  openRoute,
}: {
  heroIdx: number;
  setHeroIdx: (i: number) => void;
  openAvail: () => void;
  openVideo: () => void;
  openRoute: () => void;
}) {
  const slides: HeroSlide[] = [
    { line1: "Your Gulf Coast", line2: "Escape Awaits", desc: "Reserve our luxury 94' Lazzara yacht for charter in St Pete / Tampa Bay.", img: "assets/hero1.png", mobileImg: "assets/hero1port.png", tag: "Saint Petersburg, FL" },
    { line1: "Experience", line2: "Pure Luxury", desc: "Discover breathtaking views and world-class comfort on Florida's Gulf Coast.", img: "assets/hero2.png", mobileImg: "assets/hero2port.png", tag: "Tampa Bay, FL" },
    { line1: "Make Memories", line2: "at Sea", desc: "Unforgettable moments aboard our expertly remodeled luxury yacht.", img: "assets/hero3.png", tag: "Gulf Coast, FL" },
  ];

  return (
    <section id="home" className="relative h-[100svh] min-h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={heroIdx}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="absolute inset-0"
        >
          <picture>
            <source media="(max-width: 1023px)" srcSet={slides[heroIdx].mobileImg ?? slides[heroIdx].img} />
            <img src={slides[heroIdx].img} className="w-full h-full object-cover object-top" alt="" />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/20 to-navy" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Mobile hero content */}
      <div className="lg:hidden relative h-full flex flex-col justify-end z-10">
        <div className="px-5 pb-4">
          <motion.div key={heroIdx + "mobile"} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="flex items-center gap-2 mb-4"><MapPin className="w-3 h-3 text-gold" /><span className="text-[10px] font-bold tracking-[2px] uppercase text-gold">{slides[heroIdx].tag}</span></div>
            <h1 className="text-[32px] font-serif leading-[1.08] tracking-tight mb-3">
              {slides[heroIdx].line1}<br />
              <em className="text-gold italic font-serif">{slides[heroIdx].line2}</em>
            </h1>
            <p className="text-sm text-white/65 mb-5 leading-relaxed max-w-xs">{slides[heroIdx].desc}</p>
            <div className="flex gap-3 mb-5">
              <a href="/book" className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gold text-navy font-bold text-sm shadow-lg shadow-gold/25">Book Now <ArrowUpRight className="w-4 h-4" /></a>
              <button onClick={openVideo} className="w-12 h-12 rounded-2xl border border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-md flex-shrink-0">
                <Play className="w-4 h-4 fill-current text-white ml-0.5" />
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden mb-4" style={{ background: "rgba(4,13,26,0.7)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <MobileHeroStats />
            </div>
            <MobileQuickActions openAvail={openAvail} openVideo={openVideo} openRoute={openRoute} />
          </motion.div>
        </div>
        <div className="flex justify-center gap-2 pb-24 pt-3">
          {[0, 1, 2].map((i) => (<button key={i} onClick={() => setHeroIdx(i)} className={`h-1.5 rounded-full transition-all duration-500 ${heroIdx === i ? "w-8 bg-gold" : "w-2.5 bg-white/20"}`} />))}
        </div>
      </div>

      {/* Desktop hero content */}
      <div className="hidden lg:flex relative h-full max-w-7xl mx-auto px-16 flex-col justify-end pb-32 z-10">
        <motion.div key={heroIdx + "desktop"} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6"><span className="text-xs font-bold tracking-[2.5px] uppercase text-gold">{slides[heroIdx].tag}</span></div>
          <h1 className="text-[62px] font-serif leading-[1.08] tracking-tight mb-6">
            {slides[heroIdx].line1}<br />
            <em className="text-gold italic font-serif">{slides[heroIdx].line2}</em>
          </h1>
          <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-lg">{slides[heroIdx].desc}</p>
          <div className="flex gap-6 items-center">
            <a href="/book" className="bg-gold px-10 py-5 rounded-full text-navy font-bold text-base hover:translate-y-[-3px] transition-all flex items-center gap-2 shadow-xl shadow-gold/20">Book Now <ArrowUpRight className="w-5 h-5" /></a>
            <button onClick={openVideo} className="flex items-center gap-4 text-white hover:text-gold transition-all group">
              <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold transition-all">
                <Play className="w-5 h-5 fill-current ml-1" />
              </div>
              <span className="font-bold tracking-widest text-sm uppercase">Watch Experience</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden lg:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-40 animate-bounce">
        <span className="text-[10px] tracking-[2px] uppercase">Scroll</span>
        <ChevronLeft className="w-5 h-5 -rotate-90" />
      </div>

      {/* Desktop slide dots */}
      <div className="hidden lg:flex absolute right-16 bottom-40 flex-col gap-3">
        {[0, 1, 2].map((i) => (
          <button key={i} onClick={() => setHeroIdx(i)} className={`w-2.5 transition-all duration-500 ${heroIdx === i ? "h-10 bg-gold rounded-md" : "h-2.5 bg-white/20 rounded-full hover:bg-white/40"}`} />
        ))}
      </div>
    </section>
  );
}

// ─── Experiences Section ──────────────────────────────────────────────────────
function ExperiencesSection({ openExp }: { openExp: (e: Experience) => void }) {
  const [idx, setIdx] = useState(EXPERIENCES.length);
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const extendedItems = useMemo(() => [...EXPERIENCES, ...EXPERIENCES, ...EXPERIENCES], []);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemWidth = windowWidth >= 768 ? 350 : 240;
  const gap = 16;
  const offset = (windowWidth - itemWidth) / 2;

  const slide = useCallback((d: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTransitionEnabled(true);
    setIdx((prev) => prev + d);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  useEffect(() => {
    if (isAnimating) return;
    if (idx >= EXPERIENCES.length * 2) { setTransitionEnabled(false); setIdx(idx - EXPERIENCES.length); }
    else if (idx < EXPERIENCES.length) { setTransitionEnabled(false); setIdx(idx + EXPERIENCES.length); }
  }, [idx, isAnimating]);

  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => slide(1), 3500);
  }, [slide]);

  useEffect(() => {
    resetAutoPlay();
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [resetAutoPlay]);

  const onTouchStart = (e: React.TouchEvent) => { dragStartX.current = e.touches[0].clientX; isDragging.current = false; };
  const onTouchMove = (e: React.TouchEvent) => { if (dragStartX.current === null) return; if (Math.abs(e.touches[0].clientX - dragStartX.current) > 5) isDragging.current = true; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX.current === null) return;
    const diff = dragStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { slide(diff > 0 ? 1 : -1); resetAutoPlay(); }
    dragStartX.current = null; isDragging.current = false;
  };
  const onMouseDown = (e: React.MouseEvent) => { dragStartX.current = e.clientX; isDragging.current = false; };
  const onMouseMove = (e: React.MouseEvent) => { if (dragStartX.current === null) return; if (Math.abs(e.clientX - dragStartX.current) > 5) isDragging.current = true; };
  const onMouseUp = (e: React.MouseEvent) => {
    if (dragStartX.current === null) return;
    const diff = dragStartX.current - e.clientX;
    if (Math.abs(diff) > 40) { slide(diff > 0 ? 1 : -1); resetAutoPlay(); }
    dragStartX.current = null;
  };
  const handleCardClick = (e: React.MouseEvent, exp: Experience) => { if (!isDragging.current) openExp(exp); };
  const activeDot = ((idx % EXPERIENCES.length) + EXPERIENCES.length) % EXPERIENCES.length;

  return (
    <section id="experiences" className="py-10 md:py-8 bg-navy overflow-hidden relative">
      <div className="hidden xl:block absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-navy via-navy/90 to-transparent z-20 pointer-events-none" />
      <div className="hidden md:block absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-navy via-navy/90 to-transparent z-20 pointer-events-none" />
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto px-4 md:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 md:gap-10 mb-8 md:mb-16 relative z-30">
          <div>
            <div className="flex items-center gap-3 mb-3"><div className="w-10 h-[1.5px] bg-gold" /><span className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold">Curated Experiences</span></div>
            <h2 className="text-3xl md:text-5xl font-serif leading-tight">A Floating Resort for<br /><em className="text-gold italic font-serif">Every Occasion</em></h2>
          </div>
          <div className="flex items-center gap-2 md:hidden"><ChevronLeft className="w-4 h-4 text-gold/40" /><span className="text-[10px] text-white/30 uppercase tracking-widest">Swipe to explore</span><ChevronRight className="w-4 h-4 text-gold/40" /></div>
        </div>
      </motion.div>
      <div
        className="relative select-none cursor-grab active:cursor-grabbing"
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}
        onMouseLeave={() => { dragStartX.current = null; isDragging.current = false; setHoveredIndex(null); }}
      >
        <motion.div
          animate={{ x: -idx * (itemWidth + gap) + offset }}
          transition={transitionEnabled ? { type: "spring", stiffness: 180, damping: 25, mass: 1 } : { duration: 0 }}
          className="flex pointer-events-auto"
          style={{ width: "max-content", gap: gap }}
        >
          {extendedItems.map((e, i) => (
            <motion.div
              key={i}
              onClick={(ev) => handleCardClick(ev, e)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.09, y: -18, zIndex: 60 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative rounded-3xl overflow-hidden shrink-0 shadow-2xl bg-navy-light"
              style={{
                width: itemWidth,
                height: windowWidth >= 768 ? 420 : 320,
                cursor: isDragging.current ? "grabbing" : "pointer",
                filter: hoveredIndex !== null && hoveredIndex !== i ? "blur(8px) brightness(0.65)" : "brightness(1)",
                transition: "filter 0.3s ease-out",
              }}
            >
              <img src={e.img} className="absolute inset-0 w-full h-full object-cover pointer-events-none" alt="" draggable={false} />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 pointer-events-none">
                <span className="text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: "rgba(201,162,39,0.8)", color: "#040d1a" }}>{e.tag}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 z-10 pointer-events-none">
                <div className="mb-2 w-6 h-[1px] bg-gold" />
                <h3 className="text-base md:text-2xl font-serif text-white">{e.title}</h3>
                <div className="flex items-center gap-2 text-gold text-[9px] font-bold uppercase tracking-[2px] mt-3 opacity-70">Discover More <ArrowUpRight className="w-3 h-3" /></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="flex justify-center gap-2 mt-6 relative z-20">
        {EXPERIENCES.map((_, i) => (
          <button key={i} onClick={() => { if (isAnimating) return; slide(i - activeDot); resetAutoPlay(); }} className={`h-1.5 rounded-full transition-all duration-500 ${activeDot === i ? "w-8 bg-gold" : "w-2.5 bg-white/20 hover:bg-white/40"}`} />
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-16 mt-8 md:mt-16 pt-6 md:pt-10 border-t border-white/10 flex flex-col md:flex-row flex-wrap items-start md:items-center justify-between gap-6 md:gap-10 relative z-20">
        <div className="max-w-lg">
          <p className="text-white/40 mb-2 text-sm">With spa-inspired amenities, elegant interiors, and professional crew, Serendipity is designed to impress.</p>
          <p className="text-gold font-bold">Plan your private event with us today.</p>
        </div>
        <a href="#destinations" className="flex items-center gap-2 text-gold font-bold text-sm tracking-widest uppercase hover:gap-4 transition-all">Explore Destinations <ChevronRight className="w-4 h-4" /></a>
      </div>
    </section>
  );
}

// ─── Accommodations Section ───────────────────────────────────────────────────
function AccommodationsSection({ openRoom, openGalleryInterior }: { openRoom: (r: Room) => void; openGalleryInterior: () => void }) {
  const [showAllRooms, setShowAllRooms] = useState(false);
  const visibleRooms = showAllRooms ? ROOMS : ROOMS.slice(0, 2);

  return (
    <section id="accommodations" className="relative py-10 md:py-16 px-4 md:px-10 lg:px-20 bg-gradient-to-b from-[#061226] via-[#081a33] to-[#050b18]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gold/10 blur-[150px]" />
      </div>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 items-end mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3"><div className="w-12 h-[1px] bg-gradient-to-r from-gold to-transparent" /><span className="text-[10px] tracking-[0.35em] uppercase text-gold/80">Luxury Living</span></div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-[1.05]">Elegant Accommodations<span className="block text-gold italic mt-1">for up to 12 guests</span></h2>
          </div>
          <p className="text-white/50 text-base max-w-md">Four private suites designed for absolute comfort, privacy, and quiet ocean living.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start mb-12">
          <div className="relative group">
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10">
              <img src="assets/gallerymain.png" className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-700" alt="Luxury suite" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-xl border border-white/10 px-4 py-3 rounded-xl">
                <p className="text-2xl font-serif text-gold leading-none">4</p>
                <p className="text-[9px] tracking-widest text-white/40 mt-0.5">Private Suites</p>
              </div>
              <button onClick={openGalleryInterior} className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-gold/30 text-gold text-[10px] tracking-widest uppercase hover:bg-gold hover:text-black transition flex items-center gap-1">
                <Eye className="w-3 h-3" /> Interior
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
              <h3 className="text-base font-serif mb-3 text-gold">Flybridge Experience</h3>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                {["Jacuzzi","Sun Lounge","Dining Deck","Wet Bar","Audio System","LED Ambience","Water Sports","Jet Ski Garage","Helm Station","360° Views"].map((a, i) => (
                  <div key={i} className="flex items-center gap-2"><Check className="w-3 h-3 text-gold" /><span className="text-xs text-white/60">{a}</span></div>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
              <h3 className="text-base font-serif mb-3 text-white/80">Vessel Comfort Features</h3>
              <div className="space-y-2">
                {[
                  { icon: ThermometerSun, text: "Full vessel climate control — Chilled water HVAC 169,500 BTU" },
                  { icon: Wifi, text: "High-speed satellite WiFi & entertainment throughout" },
                  { icon: Shield, text: "USCG-certified safety equipment including life rafts & EPIRB" },
                  { icon: Droplets, text: "Onboard watermaker — 1,500 gallons per day freshwater" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <item.icon className="w-3.5 h-3.5 text-gold/50 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-white/50 leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-serif text-white/80">Private Staterooms</h3>
            <span className="text-xs text-white/30 uppercase tracking-widest">4 suites aboard</span>
          </div>
          <div className="space-y-3">
            {visibleRooms.map((r, i) => (
              <motion.div key={r.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} onClick={() => openRoom(r)} className="group cursor-pointer">
                <div className="flex items-center justify-between p-4 border border-white/5 hover:border-gold/30 hover:bg-white/5 transition-all rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden hidden sm:block flex-shrink-0">
                      <img src={r.img} className="w-full h-full object-cover group-hover:scale-110 transition" alt={r.title} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="font-serif text-base group-hover:text-gold transition">{r.title}</h4>
                        <span className="text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-gold/20 text-gold/60">{r.sub}</span>
                      </div>
                      <p className="text-[11px] text-white/40 leading-relaxed max-w-sm">{r.desc.substring(0, 90)}...</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-gold transition flex-shrink-0 ml-3" />
                </div>
              </motion.div>
            ))}
          </div>
          <AnimatePresence>
            {!showAllRooms && ROOMS.length > 2 && (
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAllRooms(true)} className="w-full mt-4 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-sm transition-all group" style={{ background: "rgba(201,162,39,0.06)", border: "1px solid rgba(201,162,39,0.2)", color: "#c9a227" }}>
                <Plus className="w-4 h-4" /> View All {ROOMS.length} Staterooms
              </motion.button>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showAllRooms && (
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAllRooms(false)} className="w-full mt-4 py-3 rounded-2xl flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest transition-all" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)" }}>
                <ChevronUp className="w-4 h-4" /> Collapse
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Culinary Section ─────────────────────────────────────────────────────────
function CulinarySection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const slides = [
    {
      id: "chef",
      tag: "Master of the Galley",
      name: "Chef Cheryl",
      role: "Gulf Coast's Premier Yacht Chef",
      profileImg: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=200",
      titleLine1: "Where ",
      titleItalic: "Fine Dining",
      titleLine2: " Meets Home Comfort",
      description: "Looking for a personal chef for a party, work event, family dinner, or yacht excursion? Chef Cheryl brings the dream of fine dining to your charter table.",
      mainImgs: ["assets/cheryl_foods.jpeg", "assets/cheryl_foods1.jpeg", "assets/cheryl_foods2.jpeg"],
      icon: <Utensils className="w-4 h-4 text-gold" />,
    },
    {
      id: "mixology",
      tag: "The Art of Mixology",
      name: "Nelly the Mixologist",
      role: "Expert Craft Cocktail Artist",
      profileImg: "https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=200",
      titleLine1: "Crafting Cocktails That ",
      titleItalic: "Spark Connection",
      titleLine2: "",
      description: "Mixology isn't just about pouring drinks—it's about creating an experience where every sip tells a story.",
      mainImgs: [
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=500",
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=500",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=600",
      ],
      icon: (
        <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7.5,7L5.5,5H18.5L16.5,7M11,13V19H6V21H18V19H13V13L21,5V3H3V5L11,13Z" />
        </svg>
      ),
    },
  ];
  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 1000 : -1000, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (d: number) => ({ zIndex: 0, x: d < 0 ? 1000 : -1000, opacity: 0 }),
  };

  return (
    <section id="culinary" className="py-8 md:py-14 bg-navy-light overflow-hidden relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3"><div className="w-10 h-[1.5px] bg-gold" /><span className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold">Culinary & Mixology</span></div>
            <h2 className="text-3xl md:text-5xl font-serif">Epicurean <em className="text-gold italic font-serif">Journey</em></h2>
          </div>
          <div className="flex gap-2 md:gap-4">
            <button onClick={() => { setDirection(-1); setActiveSlide((p) => (p - 1 + slides.length) % slides.length); }} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all"><ChevronLeft className="w-4 h-4" /></button>
            <button onClick={() => { setDirection(1); setActiveSlide((p) => (p + 1) % slides.length); }} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="relative h-auto lg:h-[700px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.4 } }}
              className="lg:absolute inset-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center h-full">
                <div className="order-2 lg:order-1">
                  <div className="bg-navy/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 md:p-12 shadow-2xl">
                    <div className="flex items-center gap-3 mb-5"><div className="w-8 h-[1px] bg-gold/50" /><span className="text-[10px] font-bold tracking-[2px] uppercase text-gold/60">{slides[activeSlide].tag}</span></div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 md:w-20 h-14 md:h-20 rounded-full border-2 border-gold/30 p-1 shrink-0 shadow-xl relative">
                        <img src={slides[activeSlide].profileImg} className="w-full h-full object-cover rounded-full" alt={slides[activeSlide].name} />
                        <div className="absolute -bottom-1 -right-1 bg-navy border border-white/10 rounded-full p-1.5 scale-90">{slides[activeSlide].icon}</div>
                      </div>
                      <div>
                        <h3 className="text-lg md:text-2xl font-serif">{slides[activeSlide].name}</h3>
                        <p className="text-gold text-[9px] uppercase tracking-widest mt-1 font-bold opacity-80">{slides[activeSlide].role}</p>
                      </div>
                    </div>
                    <h2 className="text-xl md:text-4xl font-serif mb-5 leading-snug">
                      {slides[activeSlide].titleLine1}
                      <em className="text-gold italic font-serif">{slides[activeSlide].titleItalic}</em>
                      {slides[activeSlide].titleLine2}
                    </h2>
                    <p className="text-white/50 text-sm leading-relaxed">{slides[activeSlide].description}</p>
                  </div>
                </div>
                <div className="order-1 lg:order-2 grid grid-cols-2 gap-3 md:gap-6 relative px-2 lg:px-0">
                  <div className="mt-6 md:mt-12"><motion.img whileHover={{ y: -10 }} src={slides[activeSlide].mainImgs[0]} className="w-full aspect-[4/5] object-cover rounded-[2rem] shadow-2xl border border-white/10" alt="" /></div>
                  <div><motion.img whileHover={{ y: -10 }} src={slides[activeSlide].mainImgs[1]} className="w-full aspect-[4/5] object-cover rounded-[2rem] shadow-2xl border border-white/10" alt="" /></div>
                  <div className="col-span-2 px-4 md:px-20 -mt-6 md:-mt-10 relative z-10"><motion.img whileHover={{ scale: 1.02 }} src={slides[activeSlide].mainImgs[2]} className="w-full aspect-video object-cover rounded-[2rem] shadow-2xl border border-white/20" alt="" /></div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-3 mt-8 md:mt-20">
          {slides.map((_, i) => (<button key={i} onClick={() => { setDirection(i > activeSlide ? 1 : -1); setActiveSlide(i); }} className={`h-1.5 transition-all duration-500 rounded-full ${activeSlide === i ? "w-8 bg-gold" : "w-4 bg-white/20"}`} />))}
        </div>
      </div>
    </section>
  );
}

// ─── Destinations Section ─────────────────────────────────────────────────────
function DestinationsSection() {
  const [selected, setSelected] = useState<(typeof DESTINATIONS)[0] | null>(null);
  return (
    <section id="destinations" className="py-10 md:py-20 px-4 md:px-8 lg:px-16 bg-navy">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3"><div className="w-10 h-[1.5px] bg-gold" /><span className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold">Gulf Coast Destinations</span></div>
            <h2 className="text-3xl md:text-5xl font-serif leading-tight">Choose Great Day<br /><em className="text-gold italic font-serif">Destinations</em></h2>
          </div>
          <p className="text-white/40 max-w-sm text-sm leading-relaxed">All destinations accessible from St Petersburg / Tampa Bay.</p>
        </div>
        {/* Mobile */}
        <div className="lg:hidden flex gap-3 overflow-x-auto pb-3 scrollbar-hide" style={{ scrollSnapType: "x mandatory" }}>
          {DESTINATIONS.map((dest, i) => (<MobileDestCard key={i} dest={dest} onTap={() => setSelected(dest)} />))}
        </div>
        {/* Desktop */}
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {DESTINATIONS.map((dest, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setSelected(dest)}
              className="group relative rounded-3xl overflow-hidden cursor-pointer aspect-[4/3] shadow-2xl"
            >
              <img src={dest.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={dest.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-gold/90 text-navy text-[10px] font-bold uppercase tracking-widest rounded-full">{dest.tag}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base md:text-lg font-serif group-hover:text-gold transition-colors">{dest.name}</h3>
                  <div className="flex items-center gap-1 text-white/40 text-xs"><Clock className="w-3 h-3" /> {dest.distance}</div>
                </div>
                <div className="flex items-center gap-2 text-gold text-[10px] font-bold uppercase tracking-[2px] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">Learn More <ArrowUpRight className="w-3 h-3" /></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <AnimatePresence>
        {selected && (
          <Modal onClose={() => setSelected(null)}>
            <div className="max-w-2xl w-full bg-navy-light rounded-3xl overflow-hidden border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-hide">
              <div className="relative h-52 md:h-64">
                <img src={selected.img} className="w-full h-full object-cover" alt={selected.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-light via-transparent to-transparent" />
                <div className="absolute top-4 left-4"><span className="px-3 py-1 bg-gold/90 text-navy text-[10px] font-bold uppercase tracking-widest rounded-full">{selected.tag}</span></div>
              </div>
              <div className="p-5 md:p-10">
                <div className="flex items-center gap-3 mb-2"><Clock className="w-4 h-4 text-gold" /><span className="text-xs text-white/40 uppercase tracking-widest">{selected.distance} from marina</span></div>
                <h2 className="text-2xl md:text-3xl font-serif mb-3">{selected.name}</h2>
                <p className="text-sm text-white/60 leading-relaxed mb-6">{selected.desc}</p>
                <a href="/book" onClick={() => setSelected(null)} className="w-full py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-hover transition-colors flex items-center justify-center gap-2">Include in My Charter <ArrowUpRight className="w-4 h-4" /></a>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Pricing Section ──────────────────────────────────────────────────────────
function PricingSection() {
  const [showSpecial, setShowSpecial] = useState(false);
  return (
    <section id="pricing" className="py-10 md:py-20 px-4 md:px-8 lg:px-16 bg-navy-light">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-3"><div className="w-10 h-[1.5px] bg-gold" /><span className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold">Charter Rates</span><div className="w-10 h-[1.5px] bg-gold" /></div>
          <h2 className="text-3xl md:text-5xl font-serif mb-3">Charter Pricing<br /><em className="text-gold italic font-serif">& Price List</em></h2>
          <p className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed">Departing Tampa / St Petersburg. All rates include professional captain and crew.</p>
        </div>
        {/* Mobile */}
        <div className="lg:hidden grid grid-cols-1 gap-3 mb-6 max-w-md mx-auto px-4">
          {CHARTER_RATES.map((rate, i) => (<MobilePricingCard key={i} rate={rate} />))}
        </div>
        {/* Desktop */}
        <div className="hidden lg:grid grid-cols-3 gap-5 md:gap-8 mb-8">
          {CHARTER_RATES.map((rate, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-[2rem] overflow-hidden border transition-all hover:scale-[1.01] ${rate.popular ? "border-gold/40 bg-gradient-to-b from-gold/10 to-navy/50" : "border-white/10 bg-white/5 hover:border-white/20"}`}
            >
              {rate.popular && (
                <div className="absolute top-0 left-0 right-0 flex justify-center">
                  <div className="bg-gold text-navy text-[10px] font-bold uppercase tracking-widest px-6 py-1.5 rounded-b-full">Most Popular</div>
                </div>
              )}
              <div className={`p-6 md:p-10 ${rate.popular ? "pt-10 md:pt-12" : ""}`}>
                <h3 className="text-xl md:text-2xl font-serif mb-1">{rate.name}</h3>
                <div className="flex items-end gap-2 mb-3"><span className="text-3xl md:text-4xl font-serif text-gold font-bold">{rate.price}</span><span className="text-white/30 text-sm mb-1">/ charter</span></div>
                <div className="flex flex-wrap gap-2 md:gap-3 mb-5">
                  <div className="flex items-center gap-1.5 text-white/40 text-xs"><Clock className="w-3.5 h-3.5 text-gold/60" /> {rate.duration}</div>
                  <div className="flex items-center gap-1.5 text-white/40 text-xs"><Users className="w-3.5 h-3.5 text-gold/60" /> {rate.guests}</div>
                  {rate.nights !== "0" && (<div className="flex items-center gap-1.5 text-white/40 text-xs"><Anchor className="w-3.5 h-3.5 text-gold/60" /> {rate.nights} nights</div>)}
                </div>
                <p className="text-sm text-white/50 leading-relaxed mb-5">{rate.desc}</p>
                <div className="space-y-2.5 mb-6">
                  {rate.highlights.map((h, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-gold" /></div>
                      <span className="text-sm text-white/60">{h}</span>
                    </div>
                  ))}
                </div>
                <a href="/book" className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${rate.popular ? "bg-gold text-navy hover:bg-gold-hover" : "border border-white/10 text-white/60 hover:border-gold/40 hover:text-gold"}`}>
                  Book {rate.name} <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="border border-white/10 rounded-3xl overflow-hidden">
          <button onClick={() => setShowSpecial(!showSpecial)} className="w-full flex items-center justify-between p-5 md:p-8 hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center"><Star className="w-4 h-4 text-gold" /></div>
              <div className="text-left">
                <h3 className="text-base md:text-xl font-serif">Special Events & Occasions</h3>
                <p className="text-[10px] text-white/30 mt-0.5">Corporate events, celebrations & culinary experiences</p>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-white/40 transition-transform duration-300 ${showSpecial ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {showSpecial && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
                <div className="p-5 md:p-8 pt-0 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {SPECIAL_RATES.map((r, i) => (
                    <div key={i} className="p-4 md:p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-gold/20 transition-all">
                      <div className="flex items-center justify-between mb-2"><h4 className="font-serif text-sm md:text-lg">{r.name}</h4><span className="text-gold font-bold text-base md:text-xl font-serif shrink-0 ml-2">{r.price}</span></div>
                      <p className="text-xs text-white/50 leading-relaxed mb-4">{r.desc}</p>
                      <a href="/book" className="text-gold text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 hover:gap-3 transition-all">Book Now <ArrowUpRight className="w-3 h-3" /></a>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="text-center text-white/25 text-xs mt-6">*Pricing subject to availability. Contact us for custom itineraries and special packages.</p>
        <div className="mt-6 text-center">
          <a href="#destinations" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest hover:bg-gold/10 transition-all">
            <MapPin className="w-4 h-4" /> Check Out Cool Destinations
          </a>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Mechanical Section ───────────────────────────────────────────────────────
function MechanicalSection() {
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [openSystem, setOpenSystem] = useState<number | null>(null);
  const mechanicalSpecs = [
    { label: "Hull Type", value: "Fiberglass / GRP", icon: Ship },
    { label: "Hull Config", value: "Monohull", icon: Anchor },
    { label: "Year Built", value: "2000", icon: Clock },
    { label: "Major Refit", value: "2022", icon: Wrench },
    { label: "Builder", value: "Lazzara Yachts (FL)", icon: Settings },
    { label: "Classification", value: "Lazzara 94 Hardtop", icon: Activity },
    { label: "LOA", value: "94 ft / 28.65 m", icon: Ship },
    { label: "Beam", value: "23 ft / 7.01 m", icon: Wind },
    { label: "Draft", value: "6 ft (1.7 m)", icon: Droplets },
    { label: "Displacement", value: "174 gross tons", icon: Gauge },
    { label: "Cruise Speed", value: "18 knots", icon: Zap },
    { label: "Max Speed", value: "25 knots", icon: Zap },
    { label: "Engine Hours", value: "Incredibly Low", icon: Gauge },
    { label: "Fuel Capacity", value: "Large reserve tanks", icon: Fuel },
    { label: "Range", value: "Tampa to Key West", icon: MapPin },
    { label: "Generator", value: "Dual — 6,250 hrs each", icon: Activity },
    { label: "Air Conditioning", value: "Chilled water 169,500 BTU", icon: Wind },
    { label: "Navigation", value: "Full electronics suite", icon: Settings },
  ];
  const systems = [
    { title: "Propulsion", icon: Gauge, items: ["Twin diesel inboard engines","Shaft drive — low engine hours","Bow thruster for precision docking","Hydraulic stabilizers underway","Anti-fouling bottom paint (2022)"] },
    { title: "Electronics & Navigation", icon: Settings, items: ["Garmin / Furuno chart plotter suite","Radar — open array","VHF radios (multiple)","GPS & AIS transponder","Satellite TV & high-speed WiFi","Full anchor windlass system"] },
    { title: "Safety Systems", icon: Activity, items: ["Life rafts — USCG certified","EPIRB & flares aboard","Fire suppression — engine room","Bilge pump system — automatic","CO detectors throughout","First aid & medical kit"] },
    { title: "Onboard Systems", icon: Wrench, items: ["Dual generators — full power at anchor","Watermaker / reverse osmosis — 1,500 gal/day","Full HVAC — all staterooms","Premium sound system","Washer / dryer aboard","Icemaker & commercial refrigeration"] },
  ];
  const visibleSpecs = showAllSpecs ? mechanicalSpecs : mechanicalSpecs.slice(0, 6);

  return (
    <section id="mechanical" className="py-12 md:py-24 px-4 md:px-6 lg:px-20 bg-navy relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gold/5 blur-[120px]" />
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-6xl mx-auto relative z-10">
        <div className="mb-10 text-center">
          <span className="text-[10px] tracking-[3px] uppercase text-gold/70">Technical Overview</span>
          <h2 className="text-3xl md:text-5xl font-serif mt-3 leading-tight">Mechanical <br /><em className="text-gold italic">Excellence</em></h2>
          <p className="text-white/40 max-w-xl mx-auto mt-3 text-sm">SERENDIPITY is engineered for performance, reliability, and refined cruising comfort.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
          {visibleSpecs.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-gold/30 hover:bg-white/10 transition-all group">
              <s.icon className="w-4 h-4 text-gold/60 mb-1.5 group-hover:text-gold" />
              <p className="text-[9px] uppercase tracking-widest text-white/30 mb-0.5">{s.label}</p>
              <p className="text-xs font-semibold text-white/80 leading-tight">{s.value}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mb-10">
          <button onClick={() => setShowAllSpecs(!showAllSpecs)} className="text-xs tracking-widest text-gold hover:text-gold-hover transition">
            {showAllSpecs ? "SHOW LESS" : "VIEW ALL SPECS"}
          </button>
        </div>
        <div className="space-y-3">
          {systems.map((sys, i) => {
            const isOpen = openSystem === i;
            return (
              <motion.div key={i} layout className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
                <button onClick={() => setOpenSystem(isOpen ? null : i)} className="w-full flex items-center justify-between p-4 md:p-5 hover:bg-white/5 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center"><sys.icon className="w-4 h-4 text-gold" /></div>
                    <h4 className="font-serif text-base md:text-lg">{sys.title}</h4>
                  </div>
                  <span className="text-[10px] text-white/40 tracking-widest">{isOpen ? "CLOSE" : "VIEW"}</span>
                </button>
                {isOpen && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 pb-5">
                    <ul className="space-y-2.5 text-sm text-white/60">
                      {sys.items.map((item, j) => (<li key={j} className="flex gap-2"><span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />{item}</li>))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <a href="/book" className="inline-flex items-center gap-2 px-7 py-4 bg-gold text-navy font-semibold rounded-xl hover:scale-105 hover:bg-gold-hover transition">
            Book Your Charter <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Reviews Section ──────────────────────────────────────────────────────────
function ReviewsSection() {
  const reviewsList = [
    { name: "Carolina Reyes", role: "5-Day Charter Guest", text: "We just had a 5 day charter and we could not be any happier. Captain John, Jake and Hailey were amazing. The crew made it perfect and the yacht's beauty I could not even explain. We are already planning our next trip. 5 stars no doubt!!!", initial: "CR" },
    { name: "Shannon Cook", role: "Day Cruise Guest", text: "I had the opportunity to be a guest for a day cruise and it was lovely. The boat is top notch as are the captains. Definitely recommend!", initial: "SC" },
    { name: "Byron Wilson", role: "Weekend Charter Guest", text: "We had an amazing time aboard the Serendipity! Unforgettable from start to finish. Already planning our return!", initial: "BW" },
    { name: "Michael Chen", role: "Corporate Event", text: "Stunning yacht and professional crew. Our executive team was thoroughly impressed. The perfect venue for networking.", initial: "MC" },
    { name: "Sarah Jenkins", role: "Sunset Cruise", text: "The most beautiful sunset I have ever seen. The attention to detail on Serendipity is unmatched. Truly first-class.", initial: "SJ" },
    { name: "David Miller", role: "Anniversary Guest", text: "An absolute dream. The crew went above and beyond to make our anniversary special. Highly recommended!", initial: "DM" },
  ];
  const infiniteReviews = [...reviewsList, ...reviewsList];

  return (
    <section id="reviews" className="py-10 md:py-20 bg-navy-light relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px]" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 mb-8 md:mb-16">
        <div className="flex items-center gap-3 mb-3"><div className="w-10 h-[1.5px] bg-gold" /><span className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold">Guest Reviews</span></div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <h2 className="text-3xl md:text-5xl font-serif leading-tight">What Our Clients <em className="text-gold italic font-serif">Say</em></h2>
          <div className="flex flex-col items-start md:items-end">
            <div className="flex items-center gap-1 mb-1">{[1,2,3,4,5].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}</div>
            <p className="text-sm font-bold">5.0 Average Rating</p>
          </div>
        </div>
      </div>
      <div className="flex overflow-hidden relative py-6 md:py-10">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex gap-4 md:gap-6 whitespace-nowrap"
        >
          {infiniteReviews.map((r, i) => (
            <div key={i} className="w-[280px] md:w-[420px] shrink-0 p-5 md:p-10 bg-navy/40 backdrop-blur-xl border border-white/10 rounded-[2rem] whitespace-normal group hover:border-gold/30 transition-all shadow-xl">
              <div className="text-gold/20 mb-4 font-serif">
                <svg className="w-7 md:w-10 h-7 md:h-10" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              </div>
              <div className="flex gap-0.5 mb-4">{[1,2,3,4,5].map((j) => (<Star key={j} className="w-3 h-3 fill-gold text-gold" />))}</div>
              <p className="text-sm text-white/80 leading-relaxed mb-5 italic">"{r.text}"</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center font-bold text-gold text-xs group-hover:bg-gold group-hover:text-navy transition-all shrink-0">{r.initial}</div>
                <div><h5 className="font-bold text-sm">{r.name}</h5><p className="text-[9px] text-white/40 uppercase tracking-widest mt-0.5">{r.role}</p></div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Inquiry Section ──────────────────────────────────────────────────────────
function InquirySection({ addToast }: { addToast: (m: string, t: string, tp: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState("Day Trip");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast("We'll be in touch within 24 hours!", "Inquiry Sent!", "success");
      setFirstName(""); setLastName(""); setEmail(""); setMessage(""); setEventType("Day Trip");
    }, 900);
  };

  return (
    <section id="contact" className="py-10 md:py-20 px-4 md:px-8 lg:px-16 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 blur-sm pointer-events-none">
        <img src="assets/hero1.png" className="w-full h-full object-cover" alt="" />
      </div>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-20 items-center">
        <div>
          <div className="flex items-center gap-3 mb-3"><div className="w-10 h-[1.5px] bg-gold" /><span className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold">Get in Touch</span></div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight mb-6">Questions or<br /><em className="text-gold italic font-serif">Special Requests?</em></h2>
          <p className="text-white/50 text-base mb-8 max-w-sm">Have questions about our charter packages, availability, or want to discuss a custom itinerary?</p>
          <div className="p-5 mb-6 rounded-2xl border border-gold/20 bg-gold/5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1"><p className="text-sm font-bold text-gold mb-1">Ready to Book?</p><p className="text-xs text-white/50">Skip the inquiry and go straight to selecting your charter package.</p></div>
            <a href="/book" className="flex items-center gap-2 px-5 py-3 bg-gold text-navy font-bold rounded-xl text-sm hover:translate-y-[-2px] transition-all shadow-lg shadow-gold/20 whitespace-nowrap shrink-0">Book Now <ArrowUpRight className="w-4 h-4" /></a>
          </div>
          <div className="space-y-4">
            {[{ icon: Phone, text: "Call Jake: 412-418-2968" }, { icon: Phone, text: "Call Bryon: 727-644-9653" }, { icon: MapPin, text: "Saint Petersburg, FL" }].map((c, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:border-gold/50 transition-colors shrink-0"><c.icon className="w-4 h-4 text-gold" /></div>
                <span className="text-white/70 font-medium group-hover:text-white transition-colors text-sm">{c.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-5 md:p-10 lg:p-12 bg-navy-light/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-serif mb-2">Send an Inquiry</h3>
          <p className="text-white/40 mb-6 text-sm">Tell us about your event and we'll get back to you within 24 hours.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><label className="text-[9px] font-bold text-white/30 tracking-widest uppercase">First Name</label><input required type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm outline-none focus:border-gold transition-colors" placeholder="John" /></div>
              <div className="space-y-1.5"><label className="text-[9px] font-bold text-white/30 tracking-widest uppercase">Last Name</label><input required type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm outline-none focus:border-gold transition-colors" placeholder="Doe" /></div>
            </div>
            <div className="space-y-1.5"><label className="text-[9px] font-bold text-white/30 tracking-widest uppercase">Email Address</label><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm outline-none focus:border-gold transition-colors" placeholder="john@example.com" /></div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-white/30 tracking-widest uppercase">Charter Interest</label>
              <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm outline-none focus:border-gold transition-colors appearance-none cursor-pointer">
                <option className="bg-navy" value="Day Trip">Day Trip — $10,000</option>
                <option className="bg-navy" value="Weekend Getaway">Weekend Getaway — $20,000</option>
                <option className="bg-navy" value="Full Week">Full Week — $35,000</option>
                <option className="bg-navy" value="Corporate Events">Corporate Events — $15,000</option>
                <option className="bg-navy" value="Birthdays & Anniversaries">Birthdays & Anniversaries — $7,500</option>
                <option className="bg-navy" value="Culinary & Wine Cheese Events">Culinary & Wine Cheese — $7,500</option>
                <option className="bg-navy" value="Sunset Cruise">Sunset Cruise (Custom)</option>
                <option className="bg-navy" value="General Question">General Question</option>
              </select>
            </div>
            <div className="space-y-1.5"><label className="text-[9px] font-bold text-white/30 tracking-widest uppercase">Message</label><textarea required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm outline-none focus:border-gold transition-colors resize-none" placeholder="Tell us about your event, preferred dates, guest count..." /></div>
            <button disabled={loading} className="w-full py-4 bg-gradient-to-r from-gold to-gold-hover text-navy font-bold rounded-2xl shadow-xl shadow-gold/20 hover:translate-y-[-2px] active:scale-[0.98] transition-all disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-3">
              {loading ? (
                <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full" />Sending Inquiry…</>
              ) : (
                <><Send className="w-5 h-5" /> Send Inquiry</>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#040810] py-12 md:py-20 px-4 md:px-8 lg:px-16 border-t border-white/5 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-20">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4"><img src="assets/logo.png" alt="Serendipity Logo" className="h-12 md:h-16 w-auto" /></div>
            <p className="text-white/40 text-sm leading-relaxed mb-5 max-w-xs">A stunning 94' Lazzara Hardtop motor yacht based in Saint Petersburg, Florida.</p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/profile.php?id=61578530267044" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-gold/50 transition-colors text-white/50 hover:text-gold"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-gold/50 transition-colors text-white/50 hover:text-gold"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-gold/50 transition-colors text-white/50 hover:text-gold"><Twitter className="w-4 h-4" /></a>
            </div>
          </div>
          <div>
            <h4 className="font-serif text-base mb-4">Charter</h4>
            <ul className="space-y-2.5">
              {[["Day Trip — $10,000", "/book"],["Weekend — $20,000", "/book"],["Full Week — $35,000", "/book"],["Corporate — $15,000", "/book"]].map(([label, href]) => (
                <li key={label}><a href={href} className="text-sm text-white/30 hover:text-gold transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-base mb-4">Contact</h4>
            <ul className="space-y-2.5">
              <li className="text-sm text-white/30">Jake: 412-418-2968</li>
              <li className="text-sm text-white/30">Bryon: 727-644-9653</li>
              <li><a href="#contact" className="text-sm text-white/30 hover:text-gold transition-colors">Send Inquiry</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-base mb-4">Location</h4>
            <ul className="space-y-2.5">
              <li className="text-sm text-white/30">Maximo Marina</li>
              <li className="text-sm text-white/30">3701 50 Ave S.</li>
              <li className="text-sm text-white/30">St. Petersburg, FL</li>
              <li><a href="#gallery" className="text-sm text-white/30 hover:text-gold transition-colors">Gallery →</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-medium text-white/20 tracking-widest uppercase">
          <p>© 2025 SERENDIPITY YACHT CHARTER. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-5 md:gap-8">{["Privacy","Terms","Cookies"].map((l) => (<a key={l} href="#" className="hover:text-gold transition-colors">{l}</a>))}</div>
        </div>
      </div>
    </footer>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-navy/90 backdrop-blur-xl z-[10002] flex items-end md:items-center justify-center md:p-10"
    >
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-full w-full md:w-auto flex items-end md:items-center justify-center"
        style={{ maxHeight: "95vh" }}
      >
        <div className="md:hidden absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/20 z-10" />
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors z-[10003] bg-navy/20 backdrop-blur-md rounded-full hover:bg-navy/40">
          <X className="w-5 h-5" />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroIdx, setHeroIdx] = useState(0);
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryTab, setGalleryTab] = useState<"exterior" | "interior">("exterior");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [isAvailOpen, setIsAvailOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isRouteOpen, setIsRouteOpen] = useState(false);
  const [isCharterHighlightsOpen, setIsCharterHighlightsOpen] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; msg: string; title: string; type: string }[]>([]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowFab(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addToast = (msg: string, title: string, type: string = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, title, type }]);
    setTimeout(() => { setToasts((prev) => prev.filter((t) => t.id !== id)); }, 4000);
  };

  const nextHero = () => setHeroIdx((prev) => (prev + 1) % 3);
  useEffect(() => {
    const interval = setInterval(nextHero, 6500);
    return () => clearInterval(interval);
  }, []);

  const openGalleryWithTab = (tab: "exterior" | "interior") => {
    setGalleryTab(tab);
    setIsGalleryOpen(true);
  };

  const openLightbox = useCallback((src: string) => { setLightboxImg(src); }, []);

  return (
    <div className="min-h-screen selection:bg-gold selection:text-white">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-blue-400 z-[10001] origin-left"
        style={{ scaleX, boxShadow: "0 0 8px rgba(201,162,39,0.5)" }}
      />

      <Navbar isHidden={false} isScrolled={isScrolled} setMobileMenuOpen={setMobileMenuOpen} openAvail={() => setIsAvailOpen(true)} />

      <AnimatePresence>
        {mobileMenuOpen && <MobileMenu setMobileMenuOpen={setMobileMenuOpen} openAvail={() => setIsAvailOpen(true)} />}
      </AnimatePresence>

      <MobileBottomNav openAvail={() => setIsAvailOpen(true)} />

      {/* ── HERO ── */}
      <Hero heroIdx={heroIdx} setHeroIdx={setHeroIdx} openAvail={() => setIsAvailOpen(true)} openVideo={() => setIsVideoOpen(true)} openRoute={() => setIsRouteOpen(true)} />

      <main>
        {/* 1. Video — attract_video.mp4 (full viewport, HD) */}
        <CinematicVideoSection />

        {/* 2. Accommodations */}
        <AccommodationsSection openRoom={setSelectedRoom} openGalleryInterior={() => openGalleryWithTab("interior")} />

        {/* 3. 3D Video — fast.mp4 (full viewport, HD) */}
        <InlineSpecsVideoSection />

        {/* 4. A Floating Resort — 3D Carousel Experiences */}
        <ExperiencesSection openExp={setSelectedExp} />

        {/* 5. Flybridge */}
        <FlybridgeSection onTourClick={() => setIsCharterHighlightsOpen(true)} />

        {/* 6. Water Toys */}
        <WaterToysSection />

        {/* 7. Culinary */}
        <CulinarySection />

        {/* 8. Choose Great Day Destinations */}
        <DestinationsSection />

        {/* 9. Specs / Pricing */}
        <PricingSection />

        {/* 10. Mechanical */}
        <MechanicalSection />

        {/* 11. Reviews */}
        <ReviewsSection />

        {/* 12. Inquiry / Contact */}
        <InquirySection addToast={addToast} />
      </main>

      <Footer />

      {/* ── Modals ── */}
      <AnimatePresence>
        {isCharterHighlightsOpen && <CharterHighlightsModal onClose={() => setIsCharterHighlightsOpen(false)} />}

        {selectedExp && (
          <Modal onClose={() => setSelectedExp(null)}>
            <div className="max-w-3xl w-full bg-navy-light rounded-3xl overflow-hidden border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-hide">
              <div className="relative">
                <img src={selectedExp.img} alt={selectedExp.title} className="w-full h-56 md:h-80 object-cover" />
                <div className="absolute top-4 left-4 md:hidden">
                  <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: "rgba(201,162,39,0.85)", color: "#040d1a" }}>{selectedExp.tag}</span>
                </div>
              </div>
              <div className="p-5 md:p-12">
                <div className="hidden md:flex items-center gap-2 mb-4"><div className="w-10 h-[1.5px] bg-gold" /><span className="text-[10px] md:text-[11px] font-bold tracking-[2.5px] uppercase text-gold">{selectedExp.tag} Event</span></div>
                <h2 className="text-2xl md:text-4xl font-serif mb-3 md:mb-4 leading-tight">{selectedExp.title}</h2>
                <p className="text-sm text-white/60 mb-5 leading-relaxed">{selectedExp.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                  {selectedExp.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 p-3.5 bg-white/5 border border-white/10 rounded-xl"><Check className="w-4 h-4 text-gold shrink-0" /><span className="text-xs text-white/70">{f}</span></div>
                  ))}
                </div>
                <a href="/book" className="w-full py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-hover transition-colors flex items-center justify-center gap-2 text-sm">Book This Experience <ArrowUpRight className="w-4 h-4" /></a>
              </div>
            </div>
          </Modal>
        )}

        {selectedRoom && (
          <Modal onClose={() => setSelectedRoom(null)}>
            <RoomDetailModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
          </Modal>
        )}

        {isGalleryOpen && (
          <Modal onClose={() => setIsGalleryOpen(false)}>
            <div className="max-w-5xl w-full bg-navy-light rounded-3xl border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-hide">
              <div className="sticky top-0 bg-navy-light/95 backdrop-blur-xl border-b border-white/10 z-10 p-5 md:p-10 pb-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-3">
                  <div><h2 className="text-xl md:text-4xl font-serif mb-1">The Collection</h2><p className="text-white/40 text-xs">Serendipity — 94' Lazzara Hardtop Motor Yacht</p></div>
                  <div className="flex gap-2">
                    {(["exterior","interior"] as const).map((tab) => (
                      <button key={tab} onClick={() => setGalleryTab(tab)} className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${galleryTab === tab ? "bg-gold text-navy border-gold shadow-lg shadow-gold/20" : "bg-white/5 border-white/15 text-white/50 hover:text-white hover:border-white/30"}`}>
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-5 md:p-10 pt-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={galleryTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5"
                  >
                    {(galleryTab === "exterior" ? EXTERIOR_GALLERY : INTERIOR_GALLERY).map((img, i) => (
                      <motion.div
                        key={`${galleryTab}-${i}`}
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/8 group relative cursor-pointer"
                        onClick={() => setLightboxImg(img.src)}
                      >
                        <img src={img.src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={img.label} />
                        <div className="absolute inset-0 bg-navy/10 group-hover:bg-navy/50 transition-colors duration-400 flex items-center justify-center">
                          <ZoomIn className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-navy/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                          <p className="text-[10px] font-semibold text-white/90">{img.label}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Modal>
        )}

        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 bg-black/96 z-[10003] flex items-center justify-center p-4"
            style={{ backdropFilter: "blur(12px)" }}
          >
            <button onClick={() => setLightboxImg(null)} className="absolute top-6 right-6 p-2 text-white/50 hover:text-white"><X className="w-7 h-7" /></button>
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={lightboxImg}
              className="max-w-full max-h-[88vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              alt="Gallery"
            />
          </motion.div>
        )}

        {isAvailOpen && (
          <Modal onClose={() => setIsAvailOpen(false)}>
            <div className="max-w-lg w-full bg-navy-light rounded-3xl overflow-y-auto max-h-[90vh] scrollbar-hide border border-white/10 shadow-2xl relative">
              <div className="p-5 md:p-12">
                <h2 className="text-2xl md:text-3xl font-serif mb-2 mr-5">Check Availability</h2>
                <p className="text-white/40 mb-6 text-xs md:text-sm">Select your desired dates to check current availability.</p>
                <CalendarComponent onSelect={(date) => addToast(`Selected ${date}`, "Date Added", "gold")} />
                <div className="mt-6 flex flex-wrap gap-3">
                  {[["bg-gold","Selected"],["border border-gold","Today"],["bg-red-500/10","Booked"],["bg-white/10","Available"]].map(([cls, label]) => (
                    <div key={label} className="flex items-center gap-2"><div className={`w-3 h-3 rounded ${cls}`} /><span className="text-[10px] uppercase tracking-wider text-white/50">{label}</span></div>
                  ))}
                </div>
                <a href="/book" onClick={() => setIsAvailOpen(false)} className="mt-8 w-full py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-hover transition-colors flex items-center justify-center gap-2 text-sm">
                  Book Selected Dates <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </Modal>
        )}

        {isVideoOpen && (
          <Modal onClose={() => setIsVideoOpen(false)}>
            <div className="w-[95vw] md:w-[80vw] lg:w-[70vw] aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative border border-white/10">
              <iframe
                src="https://player.vimeo.com/video/778990092?autoplay=1&color=c9a227&title=0&byline=0&portrait=0"
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Modal>
        )}

        {isRouteOpen && (
          <Modal onClose={() => setIsRouteOpen(false)}>
            <div className="max-w-2xl w-full bg-navy-light rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col scrollbar-hide overflow-y-auto max-h-[95vh]">
              <div className="relative h-44 md:h-64 shrink-0">
                <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-light via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-gold/90 px-3 py-1.5 rounded-full text-navy font-bold text-[10px] uppercase tracking-widest shadow-lg"><Star className="w-3 h-3 fill-current" /> High Demand</div>
              </div>
              <div className="p-5 md:p-12">
                <div className="flex items-center gap-3 mb-3"><div className="w-8 h-[1.5px] bg-gold" /><span className="text-[10px] font-bold tracking-[2px] uppercase text-gold">Exclusive Itinerary</span></div>
                <h2 className="text-2xl md:text-3xl font-serif mb-3">The Island Hopper</h2>
                <p className="text-xs md:text-sm text-white/60 mb-6 leading-relaxed">Navigate the crown jewels of Florida's coast.</p>
                <div className="space-y-4">
                  {[
                    { t: "Egmont Key State Park", d: "Visit the historic lighthouse and explore hidden ruins." },
                    { t: "Shell Key Preserve", d: "Anchor in crystal turquoise waters for shelling and paddleboarding." },
                    { t: "Pass-A-Grille Historic District", d: "Enjoy a legendary sunset with a curated beach picnic." },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full border border-gold/30 flex items-center justify-center text-[10px] text-gold font-bold transition-all group-hover:bg-gold group-hover:text-navy shrink-0">{idx + 1}</div>
                        {idx < 2 && <div className="w-px h-full bg-white/10 my-1" />}
                      </div>
                      <div className="pb-3">
                        <h4 className="font-bold text-xs mb-0.5 group-hover:text-gold transition-colors">{item.t}</h4>
                        <p className="text-[10px] text-white/40 leading-relaxed">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div><p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Duration</p><p className="text-gold text-lg">4 - 8 Hours</p></div>
                  <a href="/book" onClick={() => setIsRouteOpen(false)} className="w-full sm:w-auto px-8 py-4 bg-gold text-navy font-bold rounded-xl text-sm transition-all hover:scale-105 active:scale-95 text-center">Reserve This Route</a>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* FAB scroll-to-top */}
      <AnimatePresence>
        {showFab && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hidden lg:flex fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-gold to-gold/80 rounded-full items-center justify-center shadow-xl z-50 group"
          >
            <ChevronLeft className="w-6 h-6 text-navy rotate-90 group-hover:translate-y-[-2px] transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Toast notifications */}
      <div className="fixed bottom-20 lg:bottom-8 left-4 flex flex-col gap-3 z-[10001] max-w-[260px] md:max-w-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              className="p-3.5 min-w-48 md:min-w-64 bg-navy-light/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex items-center gap-3"
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${t.type === "gold" ? "bg-gold/15" : "bg-green-500/15"}`}>
                {t.type === "gold" ? <Zap className="w-4 h-4 text-gold" /> : <Check className="w-4 h-4 text-green-500" />}
              </div>
              <div><p className="text-xs font-bold">{t.title}</p><span className="text-[10px] text-white/40 block mt-0.5">{t.msg}</span></div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
