/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import {
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Play,
  Star,
  MapPin,
  Phone,
  Check,
  ArrowUpRight,
  User,
  Users,
  Wind,
  Droplets,
  Utensils,
  Zap,
  Facebook,
  Instagram,
  Twitter,
  CreditCard,
  Lock,
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
  Tag,
  Grid,
  LayoutGrid,
  Layers,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

// --- Types ---
interface Experience {
  img: string;
  tag: string;
  title: string;
  desc: string;
  features: string[];
}

interface Room {
  img: string;
  sub: string;
  title: string;
  desc: string;
  amenities: string[];
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

// --- Feature Gallery Types ---
interface FeatureProduct {
  img: string;
  category: "leisure" | "celebration" | "corporate" | "wellness" | "culinary" | "vip";
  categoryLabel: string;
  name: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  featured?: boolean;
}

// --- Navigation helper ---
function goToReservation(imgIndex: number, vesselName: string) {
  const params = new URLSearchParams({
    img: String(imgIndex),
    vessel: vesselName,
  });
  window.location.href = `/reservation?${params.toString()}`;
}

// --- Constants ---
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
    features: ["Plush bedding with premium linens", "Climate-controlled environment", "Private ensuite bathroom", "Personalized service"],
  },
  {
    img: "assets/occasion6.png",
    tag: "Kitchen",
    title: "Chef's Cooking Class",
    desc: "Join our award-winning chef for an immersive culinary experience on the water. Learn to prepare signature dishes while enjoying stunning ocean views.",
    features: ["Hands-on cooking experience", "Premium ingredients provided", "Take-home recipes", "Wine pairing included"],
  },
];

const ROOMS: Room[] = [
  {
    img: "assets/gallerymain.png",
    sub: "Master Suite",
    title: "Master Stateroom",
    desc: "The crown jewel of Serendipity — a sprawling master stateroom with a king-size bed, premium linens, and a full ensuite bathroom featuring a walk-in rain shower and imported stone fixtures.",
    amenities: [
      "King bed with luxury linens",
      "Full ensuite rain shower",
      "Individual climate control",
      "Private lounge area",
    ],
  },
  {
    img: "assets/occasion5.png",
    sub: "Midship",
    title: "Midship Stateroom",
    desc: "Centrally located for optimal stability, the Midship Stateroom features a queen-size bed, ensuite bathroom, and tasteful décor with natural light.",
    amenities: [
      "Queen bed with quality bedding",
      "Private ensuite bathroom",
      "Climate-controlled environment",
      "Ample storage space",
    ],
  },
  {
    img: "assets/occasion5.png",
    sub: "Port VIP",
    title: "Port VIP Stateroom",
    desc: "Portside luxury awaits in this beautifully appointed VIP stateroom featuring a queen-size bed, ensuite bathroom, and elegant finishes.",
    amenities: [
      "Queen bed with premium bedding",
      "Private ensuite bathroom",
      "Climate-controlled environment",
      "Porthole ocean views",
    ],
  },
  {
    img: "assets/occasion5.png",
    sub: "Starboard VIP",
    title: "Starboard VIP Stateroom",
    desc: "The mirror image of port-side elegance — the Starboard VIP Stateroom offers the same refined comfort with its own private ensuite and carefully curated décor.",
    amenities: [
      "Queen bed with premium bedding",
      "Private ensuite bathroom",
      "Climate-controlled environment",
      "Starboard ocean views",
    ],
  },
];

const FLEET: FleetVessel[] = [
  {
    img: "assets/occasion1.png",
    name: "Sunset Cruises & Day Excursions",
    desc: "A sleek 94' masterpiece designed for those who appreciate the finer details of maritime luxury.",
    length: "94 ft",
    guests: "12",
    cabins: "4",
    imgIndex: 0,
    specs: [
      { label: "Year Built", value: "2000" },
      { label: "Refit", value: "2022" },
      { label: "Draft", value: "Bahamas-friendly" },
      { label: "Engine Hours", value: "Incredibly low" },
    ],
  },
  {
    img: "assets/occasion2.png",
    name: "Birthday & Anniversary Celebrations",
    desc: "Experience unparalleled privacy and comfort on this expertly remodeled hardtop motor yacht.",
    length: "86 ft",
    guests: "10",
    cabins: "3",
    imgIndex: 1,
    specs: [
      { label: "Year Built", value: "2004" },
      { label: "Refit", value: "2021" },
      { label: "Draft", value: "Shallow" },
      { label: "Type", value: "Hardtop Motor" },
    ],
  },
  {
    img: "assets/occasion3.png",
    name: "Corporate & Executive Events",
    desc: "The perfect vessel for exploring the stunning beaches and hidden sandbars of the Gulf Coast.",
    length: "78 ft",
    guests: "12",
    cabins: "3",
    imgIndex: 2,
    specs: [
      { label: "Year Built", value: "2006" },
      { label: "Refit", value: "2020" },
      { label: "Draft", value: "Shallow" },
      { label: "Type", value: "Sport Cruiser" },
    ],
  },
  {
    img: "assets/occasion4.png",
    name: "Wellness Retreats on the Water",
    desc: "A floating resort offering a full suite of water sports gear for the ultimate aquatic adventure.",
    length: "90 ft",
    guests: "12",
    cabins: "4",
    imgIndex: 3,
    specs: [
      { label: "Year Built", value: "2003" },
      { label: "Refit", value: "2023" },
      { label: "Draft", value: "Moderate" },
      { label: "Type", value: "Sport Yacht" },
    ],
  },
];

const GALLERY_IMAGES: GalleryImage[] = [
  { src: "assets/occasion1.png", tab: "exterior", label: "Bow View at Sunset" },
  { src: "assets/occasion2.png", tab: "exterior", label: "Aft Deck Dining" },
  { src: "assets/occasion3.png", tab: "exterior", label: "Starboard Profile" },
  { src: "assets/occasion4.png", tab: "exterior", label: "Flybridge" },
  { src: "assets/hero1.png", tab: "exterior", label: "Full Port Side" },
  { src: "assets/hero2.png", tab: "exterior", label: "Gulf Waters" },
  { src: "assets/hero3.png", tab: "exterior", label: "Starboard View" },
  { src: "assets/gallerymain.png", tab: "interior", label: "Master Stateroom" },
  { src: "assets/occasion5.png", tab: "interior", label: "VIP Stateroom" },
  { src: "assets/occasion6.png", tab: "interior", label: "Galley Kitchen" },
  { src: "assets/cheryl_foods.jpeg", tab: "interior", label: "Fine Dining — Chef Cheryl" },
  { src: "assets/cheryl_foods1.jpeg", tab: "interior", label: "Culinary Artistry" },
  { src: "assets/cheryl_foods2.jpeg", tab: "interior", label: "Chef's Table Experience" },
];

const DESTINATIONS = [
  {
    name: "Egmont Key",
    img: "assets/egmont_key.jpg",
    desc: "A refuge for wildlife, the Tampa Bay island known as Egmont Key is home to gopher tortoises and myriad seabirds. As a refuge for visitors, Egmont Key State Park is rich in history and can be visited by private boat.",
    distance: "45 min",
    tag: "Nature & History",
  },
  {
    name: "St Petersburg Iconic Pier",
    img: "assets/IconicPier.jpg",
    desc: "The new St. Pete Pier! This gleaming attraction on the city's picturesque waterfront promises limitless fun. Its 26 beautiful acres seamlessly combine the peaceful blue waters of Tampa Bay with the vibrant greenery of downtown.",
    distance: "20 min",
    tag: "Iconic Landmark",
  },
  {
    name: "Shell Key Preserve",
    img: "assets/Shell_Key.jpg",
    desc: "Anchor in crystal turquoise waters for world-class shelling and paddleboarding. Shell Key is a pristine barrier island offering some of the most breathtaking natural scenery on the Gulf Coast.",
    distance: "35 min",
    tag: "Snorkeling & Shelling",
  },
  {
    name: "Pass-A-Grille",
    img: "assets/Pass_A_Grille.jpg",
    desc: "Enjoy a legendary sunset with a curated beach picnic delivered to your yacht. Pass-A-Grille's bohemian charm, award-winning restaurants, and historic character make it one of the Gulf's most beloved stops.",
    distance: "30 min",
    tag: "Dining & Sunset",
  },
  {
    name: "Anna Maria Island",
    img: "assets/Anna_Maria.jpg",
    desc: "Old Florida charm meets pristine beaches on Anna Maria Island. Explore the turquoise waters, dine at waterfront restaurants, and experience the laid-back luxury that defines Gulf Coast living.",
    distance: "60 min",
    tag: "Beach & Dining",
  },
  {
    name: "Honeymoon Island",
    img: "assets/Honeymoon_Island.jpg",
    desc: "One of Florida's most visited state parks, Honeymoon Island offers pristine beaches, nature trails, and some of the Gulf's best shelling. The perfect romantic or family destination.",
    distance: "40 min",
    tag: "State Park",
  },
];

const CHARTER_RATES = [
  {
    name: "Day Trip",
    price: "$10,000",
    duration: "10am – 6pm",
    nights: "0",
    guests: "Up to 12",
    desc: "Departs at 10am and returns by 6pm. Includes use of 2 Jet Skis & 16' Nautica RIB to visit local beaches, islands and restaurants.",
    highlights: ["2 Jet Skis included", "16' Nautica RIB tender", "Local beaches & islands", "Restaurant stops"],
    popular: false,
  },
  {
    name: "Weekend Getaway",
    price: "$20,000",
    duration: "Fri noon – Sun 3pm",
    nights: "2",
    guests: "Up to 8",
    desc: "Departs at 12 noon on Friday and returns Sunday at 3pm. Enjoy 3 days and 2 overnights with up to 8 guests in four staterooms. Explore as far south as Sarasota/Long Boat Key Moorings and North to Tarpon Springs or Honeymoon Island.",
    highlights: ["3 days / 2 nights", "4 private staterooms", "Sarasota to Tarpon Springs range", "Full crew included"],
    popular: true,
  },
  {
    name: "Full Week",
    price: "$35,000",
    duration: "Mon noon – Sun 3pm",
    nights: "6",
    guests: "Up to 8",
    desc: "Departs at 12 noon on Monday and returns Sunday at 3pm. Enjoy 7 days and 6 overnights with up to 8 guests in four staterooms. Explore as far south as Key West and as far north as Destin, Florida.",
    highlights: ["7 days / 6 nights", "4 private staterooms", "Key West to Destin FL range", "Full crew & private chef"],
    popular: false,
  },
];

const SPECIAL_RATES = [
  {
    name: "Corporate Events",
    price: "$15,000",
    desc: "Catered by local waterfront restaurant destinations. Choose a public facility that can host parking and 100' vessel dockage. The vessel can accommodate up to 25 guests onboard for cocktails and hors d'oeuvres for 6-hour cruises. Includes 8 guests traveling with the vessel to/from on the day of the event.",
  },
  {
    name: "Birthdays & Anniversaries",
    price: "$7,500",
    desc: "Celebrate an intimate event with themed decor in honor of the special guest. Up to 10 people can be accommodated for a 6-hour sunset cruise and tour of the local waters. Enjoy your favorite cocktails and culinary choices with sea catering.",
  },
  {
    name: "Culinary & Wine Cheese Events",
    price: "$7,500",
    desc: "Enjoy a private chef-prepared meal prepared fresh in the country kitchen for up to 8 guests on a 6-hour dinner cruise and tour of the local waters.",
  },
];

// --- Feature Gallery Data ---
const FEATURE_PRODUCTS: FeatureProduct[] = [
  {
    img: "assets/occasion1.png",
    category: "leisure",
    categoryLabel: "Leisure",
    name: "Sunset Cruise Package",
    subtitle: "4-Hour Gulf Coast Escape",
    price: "$1,200",
    originalPrice: "$1,800",
    badge: "SAVE 33%",
    featured: false,
  },
  {
    img: "assets/occasion2.png",
    category: "celebration",
    categoryLabel: "Celebration",
    name: "Birthday & Anniversary",
    subtitle: "6-Hour Private Charter",
    price: "$7,500",
    badge: "POPULAR",
    featured: true,
  },
  {
    img: "assets/occasion3.png",
    category: "corporate",
    categoryLabel: "Corporate",
    name: "Executive Retreat",
    subtitle: "Full-Day Corporate Charter",
    price: "$15,000",
    badge: "EXCLUSIVE",
    featured: false,
  },
  {
    img: "assets/occasion4.png",
    category: "wellness",
    categoryLabel: "Wellness",
    name: "Wellness Retreat",
    subtitle: "Half-Day Mindfulness Journey",
    price: "$3,500",
    originalPrice: "$4,500",
    badge: "SAVE 22%",
    featured: false,
  },
  {
    img: "assets/occasion5.png",
    category: "vip",
    categoryLabel: "VIP Suite",
    name: "Master Stateroom Night",
    subtitle: "Overnight King Suite",
    price: "$2,800",
    badge: "LUXURY",
    featured: false,
  },
  {
    img: "assets/occasion6.png",
    category: "culinary",
    categoryLabel: "Culinary",
    name: "Chef's Table Experience",
    subtitle: "Private 5-Course Dinner",
    price: "$450",
    originalPrice: "$600",
    badge: "PER GUEST",
    featured: false,
  },
  {
    img: "assets/cheryl_foods.jpeg",
    category: "culinary",
    categoryLabel: "Culinary",
    name: "Fine Dining Charter",
    subtitle: "Chef Cheryl Signature Menu",
    price: "$7,500",
    badge: "CHEF'S CHOICE",
    featured: false,
  },
  {
    img: "assets/gallerymain.png",
    category: "vip",
    categoryLabel: "VIP Suite",
    name: "Weekend Stateroom Package",
    subtitle: "2 Nights · 4 Private Suites",
    price: "$20,000",
    badge: "BEST VALUE",
    featured: true,
  },
  {
    img: "assets/hero1.png",
    category: "leisure",
    categoryLabel: "Leisure",
    name: "Day Excursion",
    subtitle: "Island Hopping · Jet Skis",
    price: "$10,000",
    badge: "TOP RATED",
    featured: false,
  },
  {
    img: "assets/hero2.png",
    category: "wellness",
    categoryLabel: "Wellness",
    name: "Sunrise Yoga Cruise",
    subtitle: "3-Hour Morning Retreat",
    price: "$1,800",
    originalPrice: "$2,200",
    badge: "SAVE 18%",
    featured: false,
  },
  {
    img: "assets/egmont_key.jpg",
    category: "leisure",
    categoryLabel: "Leisure",
    name: "Egmont Key Expedition",
    subtitle: "History & Wildlife Tour",
    price: "$2,400",
    badge: "GUIDED",
    featured: false,
  },
  {
    img: "assets/cheryl_foods2.jpeg",
    category: "culinary",
    categoryLabel: "Culinary",
    name: "Wine & Cheese Evening",
    subtitle: "Curated Tasting at Sea",
    price: "$7,500",
    badge: "CURATED",
    featured: false,
  },
];

type FeatureCategory = "all" | "leisure" | "celebration" | "corporate" | "wellness" | "culinary" | "vip";

const CATEGORY_FILTERS: { key: FeatureCategory; label: string }[] = [
  { key: "all", label: "ALL" },
  { key: "leisure", label: "LEISURE" },
  { key: "celebration", label: "CELEBRATION" },
  { key: "corporate", label: "CORPORATE" },
  { key: "wellness", label: "WELLNESS" },
  { key: "culinary", label: "CULINARY" },
  { key: "vip", label: "VIP SUITE" },
];

// --- Calendar Component ---
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
        <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-white/5 rounded-lg transition-colors border border-white/10 text-white/50 hover:text-white">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-serif text-lg">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
        <button onClick={() => changeMonth(1)} className="p-2 hover:bg-white/5 rounded-lg transition-colors border border-white/10 text-white/50 hover:text-white">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="cal-grid">
        {daysHeader.map((h) => <div key={h} className="cal-head">{h}</div>)}
        {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} className="cal-day empty" />)}
        {Array.from({ length: totalDays }).map((_, i) => {
          const d = i + 1;
          const isToday = d === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();
          const isBooked = bookedDays.includes(d);
          const isSelected = selectedDays.includes(d);
          return (
            <div key={d} onClick={() => toggleDay(d, isBooked)}
              className={`cal-day ${isBooked ? "booked" : isSelected ? "selected" : "available"} ${isToday && !isBooked ? "today" : ""}`}>
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Main App ---
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroIdx, setHeroIdx] = useState(0);
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedFleet, setSelectedFleet] = useState<FleetVessel | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryTab, setGalleryTab] = useState<"exterior" | "interior">("exterior");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [isAvailOpen, setIsAvailOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isRouteOpen, setIsRouteOpen] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [isStickyRoute, setIsStickyRoute] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; msg: string; title: string; type: string }[]>([]);
  const [featureProduct, setFeatureProduct] = useState<FeatureProduct | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowFab(window.scrollY > 600);
      const vesselSection = document.getElementById("vessel");
      const experiencesSection = document.getElementById("experiences");
      if (vesselSection && experiencesSection) {
        const vesselTop = vesselSection.offsetTop;
        const experiencesBottom = experiencesSection.offsetTop + experiencesSection.offsetHeight;
        setIsStickyRoute(window.scrollY > vesselTop && window.scrollY < experiencesBottom);
      }
    };
    window.addEventListener("scroll", handleScroll);
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

  const openGalleryInterior = () => {
    setGalleryTab("interior");
    setIsGalleryOpen(true);
  };

  const navigateToPayment = (data: { name: string; email: string; eventType: string }) => {
    const params = new URLSearchParams({ name: data.name, email: data.email, eventType: data.eventType });
    window.location.href = `/payment?${params.toString()}`;
  };

  return (
    <div className="min-h-screen selection:bg-gold selection:text-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-blue-400 z-[10001] origin-left shadow-[0_0_10px_rgba(201,162,39,0.5)]"
        style={{ scaleX }}
      />

      <Navbar isScrolled={isScrolled} setMobileMenuOpen={setMobileMenuOpen} openAvail={() => setIsAvailOpen(true)} />

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu setMobileMenuOpen={setMobileMenuOpen} openAvail={() => setIsAvailOpen(true)} />
        )}
      </AnimatePresence>

      <Hero
        heroIdx={heroIdx}
        setHeroIdx={setHeroIdx}
        openAvail={() => setIsAvailOpen(true)}
        openVideo={() => setIsVideoOpen(true)}
        openRoute={() => setIsRouteOpen(true)}
      />

      <AnimatePresence>
        {isStickyRoute && !isRouteOpen && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            onClick={() => setIsRouteOpen(true)}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-[999] flex items-center gap-3 bg-navy-light/40 backdrop-blur-md border-l border-y border-gold/10 pl-2 pr-1.5 py-5 rounded-l-xl cursor-pointer hover:bg-gold/10 hover:border-gold/30 transition-all group shadow-xl"
          >
            <div className="flex flex-col items-center gap-4">
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                <MapPin className="w-3.5 h-3.5 text-gold/60 group-hover:text-gold transition-colors" />
              </motion.div>
              <div className="rotate-180 [writing-mode:vertical-lr] flex items-center gap-2 whitespace-nowrap">
                <span className="text-[8px] font-bold tracking-[3px] uppercase text-white/20 group-hover:text-gold/60 transition-colors">Route</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <VesselSection
          addToast={addToast}
          openGallery={() => setIsGalleryOpen(true)}
          openGalleryInterior={openGalleryInterior}
          openAvail={() => setIsAvailOpen(true)}
          openSpecs={() => setIsSpecsOpen(true)}
        />
        <ExperiencesSection openExp={setSelectedExp} />
        <FleetSection openFleet={setSelectedFleet} />
        {/* ── NEW Feature Gallery Section ── */}
        <FeatureGallerySection
          onSelect={setFeatureProduct}
          addToast={addToast}
        />
        <AccommodationsSection openRoom={setSelectedRoom} openGalleryInterior={openGalleryInterior} />
        <CulinarySection />
        <DestinationsSection />
        <PricingSection />
        <MechanicalSection />
        <ReviewsSection />
        <BookingSection addToast={addToast} openPayment={navigateToPayment} />
      </main>

      <Footer />

      {/* --- Modals --- */}
      <AnimatePresence>
        {selectedExp && (
          <Modal onClose={() => setSelectedExp(null)}>
            <div className="max-w-3xl w-full bg-navy-light rounded-3xl overflow-hidden border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-hide">
              <img src={selectedExp.img} alt={selectedExp.title} className="w-full h-64 md:h-80 object-cover" />
              <div className="p-6 md:p-12">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-[1.5px] bg-gold" />
                  <span className="text-[10px] md:text-[11px] font-bold tracking-[2.5px] uppercase text-gold">{selectedExp.tag} Event</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif mb-4 leading-tight">{selectedExp.title}</h2>
                <p className="text-sm md:text-base text-white/60 mb-6 leading-relaxed">{selectedExp.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {selectedExp.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                      <Check className="w-4 h-4 text-gold shrink-0" />
                      <span className="text-xs md:text-sm text-white/70">{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => { setSelectedExp(null); window.location.hash = "booking"; }}
                  className="w-full py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-hover transition-colors flex items-center justify-center gap-2 text-sm md:text-base">
                  Book This Experience <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Modal>
        )}

        {selectedRoom && (
          <Modal onClose={() => setSelectedRoom(null)}>
            <div className="max-w-2xl w-full bg-navy-light rounded-3xl overflow-hidden border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-hide">
              <img src={selectedRoom.img} alt={selectedRoom.title} className="w-full h-60 md:h-72 object-cover" />
              <div className="p-6 md:p-10">
                <span className="text-[10px] md:text-[11px] font-bold tracking-[1.5px] uppercase text-gold mb-2 block">{selectedRoom.sub}</span>
                <h2 className="text-2xl md:text-3xl font-serif mb-4 leading-tight">{selectedRoom.title}</h2>
                <p className="text-sm md:text-base text-white/60 mb-6 leading-relaxed">{selectedRoom.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {selectedRoom.amenities.map((a, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs md:text-sm text-white/60">
                      <span className="text-gold">✦</span> {a}
                    </div>
                  ))}
                </div>
                <button onClick={() => { setSelectedRoom(null); window.location.hash = "booking"; }}
                  className="w-full sm:w-auto px-8 py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-hover transition-colors flex items-center justify-center gap-2 text-sm md:text-base">
                  Inquire Now <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Modal>
        )}

        {selectedFleet && (
          <Modal onClose={() => setSelectedFleet(null)}>
            <div className="max-w-2xl w-full bg-navy-light rounded-3xl overflow-hidden border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-hide">
              <div className="relative">
                <img src={selectedFleet.img} alt={selectedFleet.name} className="w-full h-64 md:h-72 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-light via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h2 className="text-2xl md:text-3xl font-serif">{selectedFleet.name}</h2>
                </div>
              </div>
              <div className="p-6 md:p-10">
                <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8">{selectedFleet.desc}</p>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { label: "Length", value: selectedFleet.length, icon: Ship },
                    { label: "Max Guests", value: selectedFleet.guests, icon: Users },
                    { label: "Staterooms", value: selectedFleet.cabins, icon: Anchor },
                  ].map((s, i) => (
                    <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center">
                      <s.icon className="w-5 h-5 text-gold mx-auto mb-2" />
                      <p className="text-xl font-serif text-gold font-bold">{s.value}</p>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {selectedFleet.specs.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                      <Check className="w-3 h-3 text-gold shrink-0" />
                      <div>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest">{s.label}</p>
                        <p className="text-xs text-white/70">{s.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => goToReservation(selectedFleet.imgIndex, selectedFleet.name)}
                  className="w-full py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-hover transition-colors flex items-center justify-center gap-2"
                >
                  Inquire About This Vessel <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Modal>
        )}

        {/* Feature Product Modal */}
        {featureProduct && (
          <Modal onClose={() => setFeatureProduct(null)}>
            <div className="max-w-2xl w-full bg-navy-light rounded-3xl overflow-hidden border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-hide">
              <div className="relative h-72">
                <img src={featureProduct.img} alt={featureProduct.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-light via-navy/30 to-transparent" />
                {featureProduct.badge && (
                  <div className="absolute top-5 left-5">
                    <span className="px-3 py-1.5 bg-gold text-navy text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                      {featureProduct.badge}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-bold tracking-[2px] uppercase text-gold/80 block mb-1">{featureProduct.categoryLabel}</span>
                  <h2 className="text-2xl md:text-3xl font-serif">{featureProduct.name}</h2>
                  <p className="text-white/50 text-sm mt-1">{featureProduct.subtitle}</p>
                </div>
              </div>
              <div className="p-6 md:p-10">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-3xl font-serif text-gold font-bold">{featureProduct.price}</span>
                  {featureProduct.originalPrice && (
                    <span className="text-white/30 text-lg line-through">{featureProduct.originalPrice}</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {["Professional crew & captain","Personalized itinerary","All safety equipment","On-water support"].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl">
                      <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span className="text-xs text-white/60">{f}</span>
                    </div>
                  ))}
                </div>
                <a href="#booking" onClick={() => setFeatureProduct(null)}
                  className="w-full py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-hover transition-colors flex items-center justify-center gap-2">
                  Book This Package <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </Modal>
        )}

        {/* Gallery Modal */}
        {isGalleryOpen && (
          <Modal onClose={() => setIsGalleryOpen(false)}>
            <div className="max-w-5xl w-full bg-navy-light rounded-3xl border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-hide">
              <div className="sticky top-0 bg-navy-light/95 backdrop-blur-xl border-b border-white/10 z-10 p-6 md:p-10 pb-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl md:text-4xl font-serif mb-1">The Collection</h2>
                    <p className="text-white/40 text-sm">Serendipity — 94' Lazzara Hardtop Motor Yacht</p>
                  </div>
                  <div className="flex gap-3">
                    {(["exterior", "interior"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setGalleryTab(tab)}
                        className={`px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all border ${
                          galleryTab === tab
                            ? "bg-gold text-navy border-gold shadow-lg shadow-gold/20"
                            : "bg-white/5 border-white/15 text-white/50 hover:text-white hover:border-white/30 hover:bg-white/10"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-white/30 text-xs">
                  {galleryTab === "exterior"
                    ? "Exterior views — hull, decks, flybridge & on-water photography"
                    : "Interior views — staterooms, galley, dining salon & culinary artistry"}
                </p>
              </div>
              <div className="p-6 md:p-10 pt-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={galleryTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
                  >
                    {GALLERY_IMAGES.filter((g) => g.tab === galleryTab).map((img, i) => (
                      <motion.div
                        key={`${galleryTab}-${i}`}
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.06 }}
                        className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/8 group relative cursor-pointer"
                        onClick={() => setLightboxImg(img.src)}
                      >
                        <img src={img.src} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" alt={img.label} />
                        <div className="absolute inset-0 bg-navy/10 group-hover:bg-navy/50 transition-colors duration-400 flex items-center justify-center">
                          <ZoomIn className="w-9 h-9 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                          <p className="text-xs font-semibold text-white/90">{img.label}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Modal>
        )}

        {/* Lightbox */}
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 bg-black/96 z-[10003] flex items-center justify-center p-4"
          >
            <button onClick={() => setLightboxImg(null)} className="absolute top-6 right-6 p-2 text-white/50 hover:text-white">
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={lightboxImg}
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              alt="Gallery"
            />
          </motion.div>
        )}

        {isAvailOpen && (
          <Modal onClose={() => setIsAvailOpen(false)}>
            <div className="max-w-lg w-full bg-navy-light rounded-3xl overflow-y-auto max-h-[90vh] scrollbar-hide border border-white/10 shadow-2xl relative">
              <div className="p-6 md:p-12">
                <h2 className="text-2xl md:text-3xl font-serif mb-2 mr-5">Check Availability</h2>
                <p className="text-white/40 mb-8 text-xs md:text-sm">Select your desired dates to check current availability.</p>
                <CalendarComponent onSelect={(date) => addToast(`Selected ${date}`, "Date Added", "gold")} />
                <div className="mt-8 flex flex-wrap gap-4">
                  {[["bg-gold","Selected"],["border border-gold","Today"],["bg-red-500/10","Booked"],["bg-white/10","Available"]].map(([cls, label]) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded ${cls}`} />
                      <span className="text-[10px] uppercase tracking-wider text-white/50">{label}</span>
                    </div>
                  ))}
                </div>
                <a href="#booking" onClick={() => setIsAvailOpen(false)}
                  className="mt-10 w-full py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-hover transition-colors flex items-center justify-center gap-2 ripple-btn text-sm md:text-base">
                  Request Selected Dates <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </Modal>
        )}

        {isVideoOpen && (
          <Modal onClose={() => setIsVideoOpen(false)}>
            <div className="w-[95vw] md:w-[80vw] lg:w-[70vw] aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative border border-white/10">
              <iframe src="https://player.vimeo.com/video/778990092?autoplay=1&color=c9a227&title=0&byline=0&portrait=0"
                className="w-full h-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
            </div>
          </Modal>
        )}

        {isRouteOpen && (
          <Modal onClose={() => setIsRouteOpen(false)}>
            <div className="max-w-2xl w-full bg-navy-light rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col scrollbar-hide overflow-y-auto max-h-[95vh] md:max-h-[90vh]">
              <div className="relative h-48 md:h-64 shrink-0">
                <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-light via-transparent to-transparent" />
                <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 bg-gold/90 px-3 py-1.5 rounded-full text-navy font-bold text-[10px] uppercase tracking-widest shadow-lg">
                  <Star className="w-3 h-3 fill-current" /> High Demand
                </div>
              </div>
              <div className="p-6 md:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-[1.5px] bg-gold" />
                  <span className="text-[10px] md:text-[11px] font-bold tracking-[2px] uppercase text-gold">Exclusive Itinerary</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif mb-4">The Island Hopper</h2>
                <p className="text-xs md:text-sm text-white/60 mb-8 leading-relaxed">
                  Navigate the crown jewels of Florida's coast. From the pristine sandbars of Egmont Key to the bohemian charm of Pass-A-Grille, this route is curated for those who seek the perfect balance of seclusion and style.
                </p>
                <div className="space-y-4 md:space-y-6">
                  {[
                    { t: "Egmont Key State Park", d: "Visit the historic lighthouse and explore ruins hidden within lush foliage." },
                    { t: "Shell Key Preserve", d: "Anchor in crystal turquoise waters for world-class shelling and paddleboarding." },
                    { t: "Pass-A-Grille Historic District", d: "Enjoy a legendary sunset with a curated beach picnic delivered to your yacht." },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 md:gap-6 group">
                      <div className="flex flex-col items-center">
                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-gold/30 flex items-center justify-center text-[9px] md:text-[10px] text-gold font-bold transition-all group-hover:bg-gold group-hover:text-navy shrink-0">{idx + 1}</div>
                        {idx < 2 && <div className="w-px h-full bg-white/10 my-1 md:my-2" />}
                      </div>
                      <div className="pb-2 md:pb-4">
                        <h4 className="font-bold text-xs md:text-sm mb-1 group-hover:text-gold transition-colors">{item.t}</h4>
                        <p className="text-[10px] md:text-xs text-white/40 leading-relaxed">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-center sm:text-left">
                    <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Duration</p>
                    <p className="font-serif text-gold text-lg">4 - 8 Hours</p>
                  </div>
                  <button onClick={() => { setIsRouteOpen(false); window.location.hash = "booking"; }}
                    className="w-full sm:w-auto px-8 py-4 bg-gold text-navy font-bold rounded-xl text-sm transition-all hover:scale-105 active:scale-95 shadow-xl shadow-gold/20">
                    Reserve This Route
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        )}

        {isSpecsOpen && (
          <Modal onClose={() => setIsSpecsOpen(false)}>
            <div className="max-w-2xl w-full bg-navy-light rounded-3xl overflow-hidden border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-hide">
              <div className="relative h-52 shrink-0">
                <img src="assets/gallerymain.png" className="w-full h-full object-cover" alt="Serendipity" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-light to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold mb-1">Full Specifications</p>
                  <h2 className="text-2xl font-serif">SERENDIPITY</h2>
                </div>
              </div>
              <div className="p-6 md:p-10">
                <p className="text-xs font-bold tracking-[2px] uppercase text-gold/70 mb-2">Lazzara Single Model Built With The 106' Hardtop</p>
                <p className="text-sm text-white/60 leading-relaxed mb-6">
                  SERENDIPITY is the best layout of any Lazzara. With a Bahamas-friendly draft, the yacht is in turnkey condition. Boasting incredibly low engine hours, an open flybridge for socializing and an on-deck jacuzzi.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: "LOA", value: "94 ft (28.65m)" },
                    { label: "Beam", value: "22 ft (6.7m)" },
                    { label: "Draft", value: "Bahamas-friendly" },
                    { label: "Year Built", value: "2000" },
                    { label: "Refit", value: "2022" },
                    { label: "Builder", value: "Lazzara Yachts" },
                    { label: "Engine Hours", value: "Incredibly Low" },
                    { label: "Guests Sleeping", value: "Up to 8" },
                    { label: "Guests Day Charter", value: "Up to 12" },
                    { label: "Staterooms", value: "4 Private Suites" },
                    { label: "Crew Cabins", value: "2" },
                    { label: "Cruising Speed", value: "18–22 knots" },
                  ].map((s, i) => (
                    <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">{s.label}</p>
                      <p className="text-sm font-semibold text-white/80">{s.value}</p>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-gold/5 border border-gold/20 rounded-2xl mb-6">
                  <h4 className="font-serif text-lg mb-3">Flybridge Features</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {["Hot/Cold Jacuzzi","Oversized sun lounges","Al fresco dining","Professional wet bar","Surround sound","LED ambient lighting","Water sports gear","Jet Ski launch"].map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-white/60">
                        <Check className="w-3 h-3 text-gold shrink-0" /> {f}
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={() => { setIsSpecsOpen(false); window.location.hash = "booking"; }}
                  className="w-full py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-hover transition-colors flex items-center justify-center gap-2">
                  Inquire Now <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* FAB */}
      <AnimatePresence>
        {showFab && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-gold to-gold/80 rounded-full flex items-center justify-center shadow-xl z-50 group"
          >
            <ChevronLeft className="w-6 h-6 text-navy rotate-90 group-hover:translate-y-[-2px] transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Toasts */}
      <div className="fixed bottom-8 left-4 md:left-8 flex flex-col gap-3 z-[10001] max-w-[280px] md:max-w-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div key={t.id} initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}
              className="p-4 min-w-48 md:min-w-64 bg-navy-light/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${t.type === "gold" ? "bg-gold/15" : "bg-green-500/15"}`}>
                {t.type === "gold" ? <Zap className="w-4 h-4 text-gold" /> : <Check className="w-4 h-4 text-green-500" />}
              </div>
              <div>
                <p className="text-sm font-bold">{t.title}</p>
                <span className="text-xs text-white/40 block mt-1">{t.msg}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// FEATURE GALLERY SECTION (NEW)
// ─────────────────────────────────────────────
function FeatureGallerySection({
  onSelect,
  addToast,
}: {
  onSelect: (p: FeatureProduct) => void;
  addToast: (m: string, t: string, tp: string) => void;
}) {
  const [activeFilter, setActiveFilter] = useState<FeatureCategory>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showCount, setShowCount] = useState(8);

  const sortMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(e.target as Node)) {
        setShowSortMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const parsePrice = (p: string) =>
    parseFloat(p.replace(/[^0-9.]/g, ""));

  const filtered = useMemo(() => {
    let list = [...FEATURE_PRODUCTS];
    if (activeFilter !== "all") list = list.filter((p) => p.category === activeFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q)
      );
    }
    if (sortBy === "price-asc") list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    else if (sortBy === "price-desc") list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    else list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return list;
  }, [activeFilter, sortBy, searchQuery]);

  const visible = filtered.slice(0, showCount);
  const hasMore = filtered.length > showCount;

  const sortLabels: Record<string, string> = {
    featured: "Best Selling",
    "price-asc": "Price: Low → High",
    "price-desc": "Price: High → Low",
  };

  return (
    <section id="feature-gallery" className="py-16 md:py-24 bg-[#040d1a] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gold/4 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-800/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 md:mb-14"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-[1.5px] bg-gold" />
                <span className="text-xs font-bold tracking-[2.5px] uppercase text-gold">Charter Packages</span>
                <Sparkles className="w-3.5 h-3.5 text-gold/50" />
              </div>
              <h2 className="text-3xl md:text-5xl font-serif leading-tight">
                Browse All
                <br />
                <em className="text-gold italic font-serif">Experiences & Packages</em>
              </h2>
            </div>
            <p className="text-white/40 max-w-sm text-sm leading-relaxed md:text-right">
              Every package includes professional crew, captain, and unmatched Gulf Coast luxury aboard Serendipity.
            </p>
          </div>
        </motion.div>

        {/* Controls bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8"
        >
          {/* Sort dropdown */}
          <div className="relative" ref={sortMenuRef}>
            <button
              onClick={() => setShowSortMenu((v) => !v)}
              className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white/70 hover:border-gold/30 hover:text-white transition-all whitespace-nowrap"
            >
              <SlidersHorizontal className="w-4 h-4 text-gold/60" />
              Sort by: <span className="font-bold text-white">{sortLabels[sortBy]}</span>
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showSortMenu ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {showSortMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-52 bg-navy-light border border-white/10 rounded-2xl shadow-2xl z-50 py-2 overflow-hidden"
                >
                  {(["featured", "price-asc", "price-desc"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => { setSortBy(s); setShowSortMenu(false); }}
                      className={`w-full text-left px-5 py-3 text-sm transition-colors ${sortBy === s ? "text-gold bg-gold/10" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                    >
                      {sortLabels[s]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Filter pill */}
          <button
            onClick={() => {}}
            className="flex items-center gap-2 px-5 py-3 bg-gold text-navy font-bold rounded-xl text-sm hover:bg-gold/90 transition-colors whitespace-nowrap"
          >
            <Tag className="w-4 h-4" /> FILTER
          </button>

          {/* Search */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search packages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-gold/40 transition-colors pr-10"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Results count */}
          <div className="text-[11px] text-white/30 uppercase tracking-widest whitespace-nowrap self-center">
            Showing {visible.length} of {filtered.length} packages
          </div>
        </motion.div>

        {/* Category pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {CATEGORY_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => { setActiveFilter(f.key); setShowCount(8); }}
              className={`px-5 py-2.5 rounded-full text-[11px] font-bold tracking-[1.5px] uppercase transition-all border ${
                activeFilter === f.key
                  ? "bg-white text-navy border-white shadow-lg"
                  : "bg-transparent border-white/15 text-white/50 hover:border-white/40 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter + sortBy + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5"
          >
            {visible.map((product, i) => (
              <FeatureCard
                key={`${product.name}-${i}`}
                product={product}
                index={i}
                isHovered={hoveredIndex === i}
                onHover={() => setHoveredIndex(i)}
                onLeave={() => setHoveredIndex(null)}
                onSelect={() => onSelect(product)}
                onBook={() => {
                  addToast(`${product.name} added`, "Package Selected", "gold");
                  window.location.hash = "booking";
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center">
            <p className="text-white/20 text-lg font-serif mb-2">No packages found</p>
            <p className="text-white/10 text-sm">Try adjusting your search or filter</p>
            <button onClick={() => { setSearchQuery(""); setActiveFilter("all"); }} className="mt-6 px-6 py-3 border border-white/10 rounded-xl text-gold text-sm hover:border-gold/30 transition-colors">
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Load more */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 text-center"
          >
            <button
              onClick={() => setShowCount((c) => c + 8)}
              className="px-10 py-4 border border-white/10 rounded-2xl text-white/50 text-sm font-bold uppercase tracking-widest hover:border-gold/40 hover:text-gold transition-all"
            >
              Load More ({filtered.length - showCount} remaining)
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ─── Feature Card ───
function FeatureCard({
  product,
  index,
  isHovered,
  onHover,
  onLeave,
  onSelect,
  onBook,
}: {
  product: FeatureProduct;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onSelect: () => void;
  onBook: () => void;
}) {
  const categoryColors: Record<string, string> = {
    leisure: "text-sky-400",
    celebration: "text-pink-400",
    corporate: "text-blue-400",
    wellness: "text-emerald-400",
    culinary: "text-amber-400",
    vip: "text-gold",
  };

  const badgeColors: Record<string, string> = {
    "POPULAR": "bg-gold text-navy",
    "EXCLUSIVE": "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    "TOP RATED": "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    "LUXURY": "bg-purple-500/20 text-purple-300 border border-purple-500/30",
    "BEST VALUE": "bg-gold/20 text-gold border border-gold/30",
  };

  const badgeCls = product.badge ? (badgeColors[product.badge] ?? "bg-white/10 text-white/70") : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.05, 0.4), duration: 0.5 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group relative rounded-2xl overflow-hidden bg-[#071525] border border-white/8 hover:border-gold/25 transition-all duration-500 cursor-pointer"
      style={{ boxShadow: isHovered ? "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,162,39,0.12)" : "none" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/3.5]" onClick={onSelect}>
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071525] via-[#071525]/30 to-transparent" />
        <div className={`absolute inset-0 bg-gradient-to-t from-[#071525]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        {/* Badge top-left */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className={`inline-block px-2.5 py-1 rounded-md text-[9px] font-bold tracking-widest uppercase ${badgeCls}`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Original price badge top-right */}
        {product.originalPrice && (
          <div className="absolute top-3 right-3 bg-navy/70 backdrop-blur-md border border-white/10 px-2 py-1 rounded-lg">
            <span className="text-[9px] text-white/40 line-through">{product.originalPrice}</span>
          </div>
        )}

        {/* Hover: zoom icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
            <ZoomIn className="w-5 h-5 text-white" />
          </div>
        </motion.div>

        {/* Book button — slides up on hover */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 16, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute bottom-4 left-3 right-3"
          onClick={(e) => { e.stopPropagation(); onBook(); }}
        >
          <button className="w-full py-2.5 bg-gold text-navy font-bold rounded-xl text-[11px] tracking-widest uppercase hover:bg-gold/90 transition-colors flex items-center justify-center gap-1.5 shadow-xl shadow-gold/20">
            Book Now <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-3 md:p-4" onClick={onSelect}>
        <span className={`text-[9px] font-bold tracking-[2px] uppercase ${categoryColors[product.category] ?? "text-gold"}`}>
          {product.categoryLabel}
        </span>
        <h3 className="text-sm md:text-base font-semibold text-white mt-1 leading-snug group-hover:text-gold transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-[11px] text-white/40 mt-0.5 line-clamp-1">{product.subtitle}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-serif font-bold text-gold">{product.price}</span>
            {product.originalPrice && (
              <span className="text-[11px] text-white/25 line-through">{product.originalPrice}</span>
            )}
          </div>
          <motion.div
            animate={{ x: isHovered ? 0 : -4, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight className="w-4 h-4 text-gold/60" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// --- Navbar ---
function Navbar({ isScrolled, setMobileMenuOpen, openAvail }: { isScrolled: boolean; setMobileMenuOpen: (o: boolean) => void; openAvail: () => void }) {
  const mainLinks = ["Vessel", "Experiences", "Destinations", "Pricing"];
  const dropdownLinks = ["Accommodations", "Fleet", "Culinary", "Mechanical", "Reviews"];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 px-4 md:px-8 lg:px-16 ${isScrolled ? "bg-navy/90 backdrop-blur-2xl py-3 shadow-xl" : "py-6 md:py-8"}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          <a href="#" className="flex items-center gap-3 group">
            <img src="assets/logo.png" alt="Serendipity Logo" className="h-12 md:h-16 lg:h-20 w-auto group-hover:scale-105 transition-transform" />
          </a>
          <button onClick={openAvail} className="hidden xl:flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-gold/30 hover:bg-white/10 transition-all cursor-pointer group/avail">
            <div className="w-2 h-2 rounded-full bg-green-500 relative">
              <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-70" />
            </div>
            <span className="text-[10px] font-bold text-white/40 tracking-[2px] uppercase group-hover/avail:text-gold transition-colors">Live Availability</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-2 xl:gap-4">
          {mainLinks.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="px-3 py-2 text-sm xl:text-base font-medium text-white/70 hover:text-white transition-colors relative group">
              {l}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-gold transition-all duration-300 group-hover:w-1/2" />
            </a>
          ))}
          <div className="relative group/dropdown py-2">
            <button className="flex items-center gap-1 px-3 py-2 text-sm xl:text-base font-medium text-white/70 group-hover/dropdown:text-white transition-colors cursor-pointer">
              Explore <ChevronDown className="w-4 h-4 transition-transform group-hover/dropdown:rotate-180" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-navy-light/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 flex flex-col overflow-hidden py-2">
              {dropdownLinks.map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="px-5 py-3 text-sm font-medium text-white/70 hover:text-gold hover:bg-white/5 transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a href="#booking" className="hidden md:flex bg-gold px-5 xl:px-8 py-2.5 xl:py-3 rounded-full text-navy font-bold text-xs xl:text-sm hover:translate-y-[-2px] transition-all shadow-lg shadow-gold/20 hover:shadow-gold/30">Book Now</a>
          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 text-white hover:bg-white/5 rounded-lg transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}

// --- MobileMenu ---
function MobileMenu({ setMobileMenuOpen, openAvail }: { setMobileMenuOpen: (o: boolean) => void; openAvail: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-navy/98 backdrop-blur-2xl z-[2000] flex flex-col items-center justify-center p-8 overflow-y-auto">
      <button onClick={() => setMobileMenuOpen(false)} className="absolute top-8 right-8 p-3 text-white/50 hover:text-white transition-colors">
        <X className="w-8 h-8" />
      </button>
      <div className="flex flex-col gap-5 text-center mb-10">
        {["Home","Vessel","Experiences","Accommodations","Fleet","Culinary","Destinations","Pricing","Mechanical","Reviews","Contact"].map((l, i) => (
          <motion.a key={l} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 + 0.1 }}
            href={`#${l === "Home" ? "home" : l === "Contact" ? "booking" : l.toLowerCase()}`}
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl md:text-3xl font-serif text-white hover:text-gold transition-colors tracking-wide">{l}</motion.a>
        ))}
      </div>
      <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        onClick={() => { setMobileMenuOpen(false); openAvail(); }}
        className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-gold text-xs font-bold uppercase tracking-[3px] backdrop-blur-xl hover:bg-gold/10 hover:border-gold/30 transition-all">
        <div className="w-2.5 h-2.5 rounded-full bg-green-500 relative">
          <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse blur-[2px]" />
        </div>
        Availability
      </motion.button>
    </motion.div>
  );
}

// --- Hero ---
function Hero({ heroIdx, setHeroIdx, openAvail, openVideo, openRoute }: { heroIdx: number; setHeroIdx: (i: number) => void; openAvail: () => void; openVideo: () => void; openRoute: () => void }) {
  const slides = [
    { line1: "Your Gulf Coast", line2: "Escape Awaits", desc: "Reserve our luxury 94' Lazzara yacht for charter in St Pete / Tampa Bay.", img: "assets/hero1.png", tag: "Saint Petersburg, FL" },
    { line1: "Experience", line2: "Pure Luxury", desc: "Discover breathtaking views and world-class comfort on Florida's Gulf Coast.", img: "assets/hero2.png", tag: "Tampa Bay, FL" },
    { line1: "Make Memories", line2: "at Sea", desc: "Unforgettable moments aboard our expertly remodeled luxury yacht.", img: "assets/hero3.png", tag: "Gulf Coast, FL" },
  ];

  return (
    <section id="home" className="relative h-screen min-h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div key={heroIdx} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }} className="absolute inset-0">
          <img src={slides[heroIdx].img} className="w-full h-full object-cover object-top" alt="" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/20 to-navy" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col justify-end pb-24 md:pb-32 z-10">
        <motion.div key={heroIdx + "content"} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold tracking-[2.5px] uppercase text-gold">{slides[heroIdx].tag}</span>
          </div>
          <h1 className="text-[28px] sm:text-[40px] md:text-[62px] font-serif leading-[1.08] tracking-tight mb-6">
            <span>{slides[heroIdx].line1}</span><br />
            <em className="text-gold italic font-serif">{slides[heroIdx].line2}</em>
          </h1>
          <p className="text-sm md:text-xl text-white/70 mb-8 md:mb-10 leading-relaxed max-w-lg">{slides[heroIdx].desc}</p>
          <div className="flex flex-wrap gap-4 md:gap-6 items-center">
            <a href="#booking" className="bg-gold px-8 md:px-10 py-4 md:py-5 rounded-full text-navy font-bold text-sm md:text-base hover:translate-y-[-3px] transition-all flex items-center gap-2 shadow-xl shadow-gold/20">
              Reserve Now <ArrowUpRight className="w-5 h-5" />
            </a>
            <button onClick={openVideo} className="flex items-center gap-3 md:gap-4 text-white hover:text-gold transition-all group">
              <div className="w-12 md:w-14 h-12 md:h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold transition-all">
                <Play className="w-4 md:w-5 h-4 md:h-5 fill-current ml-1" />
              </div>
              <span className="font-bold tracking-widest text-xs md:text-sm uppercase">Watch Experience</span>
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        onClick={openRoute}
        className="absolute top-24 right-3 md:top-40 md:right-16 w-[160px] sm:w-[180px] md:w-72 bg-navy/40 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-3xl p-3 md:p-6 shadow-2xl hover:border-gold/50 hover:bg-navy/60 transition-all cursor-pointer group animate-float-y z-20"
      >
        <div className="relative overflow-hidden rounded-lg md:rounded-xl mb-3 md:mb-4 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400" className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
          <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-gold/90 text-navy px-2 py-1 rounded-full font-bold text-[9px] uppercase tracking-widest flex items-center gap-1 shadow-lg">View Route <ArrowUpRight className="w-3 h-3" /></div>
          </div>
        </div>
        <div className="flex items-center justify-between mb-1 pointer-events-none">
          <span className="text-[9px] md:text-[10px] font-bold text-gold tracking-widest uppercase">Popular Route</span>
          <div className="flex items-center gap-1"><Star className="w-3 h-3 fill-gold text-gold" /><span className="text-[9px] md:text-[10px] font-bold text-white/80">4.9</span></div>
        </div>
        <h4 className="font-serif text-sm md:text-lg group-hover:text-gold transition-colors pointer-events-none">Island Hopping</h4>
        <p className="text-[10px] md:text-xs text-white/50 mt-1 leading-relaxed pointer-events-none hidden md:block">Egmont Key, Shell Key & hidden sandbars</p>
        <div className="mt-2 md:mt-6 pt-2 md:pt-4 border-t border-white/5 flex items-center justify-between pointer-events-none">
          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white/30">From $1,200</span>
          <div className="flex items-center gap-1 md:gap-2 text-gold text-[9px] md:text-[10px] font-bold uppercase tracking-widest">Itinerary <ArrowUpRight className="w-3 h-3" /></div>
        </div>
      </motion.div>

      <div className="absolute right-3 md:right-16 bottom-24 md:bottom-40 flex flex-col gap-3">
        {[0,1,2].map((i) => (
          <button key={i} onClick={() => setHeroIdx(i)} className={`w-2.5 transition-all duration-500 ${heroIdx === i ? "h-10 bg-gold rounded-md" : "h-2.5 bg-white/20 rounded-full hover:bg-white/40"}`} />
        ))}
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce">
        <span className="text-[10px] tracking-[2px] uppercase">Scroll</span>
        <ChevronLeft className="w-5 h-5 -rotate-90" />
      </div>
    </section>
  );
}

// --- VesselSection ---
function VesselSection({ addToast, openGallery, openGalleryInterior, openAvail, openSpecs }: {
  addToast: (m: string, t: string, tp: string) => void;
  openGallery: () => void;
  openGalleryInterior: () => void;
  openAvail: () => void;
  openSpecs: () => void;
}) {
  return (
    <section id="vessel" className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-navy-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute -top-10 -left-10 w-32 h-32 border border-gold/20 rounded-full animate-spin-slow" />
          <div className="shimmer-wrap rounded-[2rem] overflow-hidden relative">
            <img
              src="assets/gallerymain.png"
              className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
              alt="Serendipity Yacht"
              onClick={openGallery}
            />
            <div className="absolute bottom-6 right-6 bg-navy/90 backdrop-blur-xl border border-gold/20 p-4 md:p-6 rounded-2xl">
              <p className="text-3xl md:text-4xl font-serif text-gold font-bold">94'</p>
              <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Lazzara Motor Yacht</p>
            </div>
          </div>
          <button
            onClick={openGalleryInterior}
            className="mt-3 w-full flex items-center justify-center py-3 rounded-2xl border border-gold/20 text-gold hover:border-gold/50 hover:bg-gold/5 transition-all text-xs font-bold uppercase tracking-widest bg-gold/5"
          >
            View Interior Photos
          </button>
          <button
            onClick={openSpecs}
            className="mt-2 w-full flex items-center justify-center py-3 rounded-2xl border border-white/10 text-white/40 hover:border-gold/40 hover:text-gold transition-all text-xs font-bold uppercase tracking-widest bg-white/5"
          >
            View Full Specifications
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[1.5px] bg-gold" />
            <span className="text-xs font-bold tracking-[2.5px] uppercase text-gold">About Serendipity</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight mb-8">
            Experience the Ocean<br />
            <em className="text-gold italic font-serif">Like Never Before</em>
          </h2>
          <div className="space-y-5 text-white/60 leading-relaxed text-base md:text-lg pb-10">
            <p>Welcome aboard to Serendipity, an extraordinary charter experience. Based in Saint Petersburg, Florida, Serendipity is an expertly remodeled, stunning 94' Lazzara Hardtop motor yacht.</p>
            <p>Located between Tampa and Sarasota on Florida's Gulf Coast, Serendipity offers rare access to secret inlets and calm anchorages that few yachts of this size can reach.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {[
              { val: "94 ft", label: "Yacht Length", icon: Wind, action: openSpecs, extra: null },
              { val: "12", label: "Max Guests", icon: Users, action: () => addToast("Up to 12 guests for day charters", "Max Guests", "gold"), extra: "multi" },
              { val: "20+", label: "Destinations", icon: MapPin, action: openAvail, extra: null },
              { val: "5.0", label: "Guest Rating", icon: Star, action: () => { const el = document.getElementById("reviews"); if (el) el.scrollIntoView({ behavior: "smooth" }); }, extra: "stars" },
            ].map((s, i) => (
              <div key={i} onClick={s.action}
                className="p-4 md:p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-gold/30 transition-all cursor-pointer group">
                <s.icon className="w-5 md:w-6 h-5 md:h-6 text-gold mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-2xl md:text-3xl font-serif text-gold font-bold">{s.val}</p>
                {s.extra === "stars" ? (
                  <>
                    <div className="flex gap-0.5 mt-2 mb-1">
                      {[1,2,3,4,5].map((j) => <Star key={j} className="w-3 h-3 fill-gold text-gold" />)}
                    </div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">{s.label}</p>
                  </>
                ) : (
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{s.label}</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- ExperiencesSection ---
function ExperiencesSection({ openExp }: { openExp: (e: Experience) => void }) {
  const [idx, setIdx] = useState(EXPERIENCES.length);
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
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

  const itemWidth = windowWidth >= 768 ? 350 : 280;
  const gap = 24;
  const sectionPadding = windowWidth < 768 ? 24 : 64;
  const offset = (windowWidth - itemWidth) / 2 - (windowWidth < 768 ? sectionPadding : 0);

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
  const onMouseLeave = () => { dragStartX.current = null; isDragging.current = false; };

  const handleCardClick = (e: React.MouseEvent, exp: Experience) => {
    if (!isDragging.current) openExp(exp);
  };

  const activeDot = ((idx % EXPERIENCES.length) + EXPERIENCES.length) % EXPERIENCES.length;

  return (
    <section id="experiences" className="py-12 md:py-8 md:py-5 bg-navy overflow-hidden relative px-4 md:px-16">
      <div className="hidden xl:block absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-navy via-navy/90 to-transparent z-20 pointer-events-none" />
      <div className="hidden md:block absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-navy via-navy/90 to-transparent z-20 pointer-events-none" />
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-10 mb-12 md:mb-16 relative z-30">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[1.5px] bg-gold" />
              <span className="text-xs font-bold tracking-[2.5px] uppercase text-gold">Curated Experiences</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif leading-tight">
              A Floating Resort for<br />
              <em className="text-gold italic font-serif">Every Occasion</em>
            </h2>
          </div>
        </div>
        <div className="relative select-none cursor-grab active:cursor-grabbing" ref={containerRef}
          onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave}>
          <motion.div
            animate={{ x: -idx * (itemWidth + gap) + (windowWidth < 768 ? offset : 0) }}
            transition={transitionEnabled ? { type: "spring", stiffness: 180, damping: 25, mass: 1 } : { duration: 0 }}
            className="flex gap-6 pointer-events-auto" style={{ width: "max-content" }}>
            {extendedItems.map((e, i) => (
              <div key={i} onClick={(ev) => handleCardClick(ev, e)}
                className="w-[280px] md:w-[350px] aspect-[3/4.2] relative group rounded-3xl overflow-hidden shrink-0 shadow-2xl bg-navy-light"
                style={{ cursor: isDragging.current ? "grabbing" : "pointer" }}>
                <img src={e.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 pointer-events-none" alt="" draggable={false} />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 pointer-events-none">
                  <div className="mb-2 w-8 h-[1px] bg-gold group-hover:w-12 transition-all" />
                  <h3 className="text-lg md:text-2xl font-serif text-white group-hover:text-gold transition-colors">{e.title}</h3>
                  <div className="flex items-center gap-2 text-gold text-[10px] font-bold uppercase tracking-[2px] mt-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    Discover More <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="flex justify-center gap-2 mt-8 relative z-20">
          {EXPERIENCES.map((_, i) => (
            <button key={i} onClick={() => { if (isAnimating) return; slide(i - activeDot); resetAutoPlay(); }}
              className={`h-1.5 rounded-full transition-all duration-500 ${activeDot === i ? "w-8 bg-gold" : "w-2.5 bg-white/20 hover:bg-white/40"}`} />
          ))}
        </div>
        <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-white/10 flex flex-col md:flex-row flex-wrap items-start md:items-center justify-between gap-8 md:gap-10 relative z-20">
          <div className="max-w-lg">
            <p className="text-white/40 mb-3">With spa-inspired amenities, elegant interiors, and professional crew, Serendipity is designed to impress.</p>
            <p className="text-gold font-bold text-lg">Plan your private event with us today.</p>
          </div>
          <a href="#destinations" className="flex items-center gap-3 text-gold font-bold text-sm tracking-widest uppercase hover:gap-5 transition-all">
            Explore Destinations <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

// --- AccommodationsSection ---
function AccommodationsSection({ openRoom, openGalleryInterior }: { openRoom: (r: Room) => void; openGalleryInterior: () => void }) {
  return (
    <section id="accommodations" className="relative py-12 md:py-16 px-4 md:px-10 lg:px-20 bg-gradient-to-b from-[#061226] via-[#081a33] to-[#050b18]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/10 blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[160px]" />
      </div>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-[1px] bg-gradient-to-r from-gold to-transparent" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-gold/80">Luxury Living</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif leading-[1.05]">
              Elegant Accommodations{" "}
              <span className="block text-gold italic mt-1">for up to 12 guests</span>
            </h2>
          </div>
          <p className="text-white/50 text-base md:text-lg max-w-md lg:justify-self-end">
            Four private suites designed for absolute comfort, privacy, and quiet ocean living.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div className="relative group">
            <div className="relative rounded-[2.2rem] overflow-hidden border border-white/10">
              <img src="assets/gallerymain.png" className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-xl border border-white/10 px-5 py-4 rounded-xl">
                <p className="text-3xl font-serif text-gold leading-none">4</p>
                <p className="text-[10px] tracking-widest text-white/40 mt-1">Private Suites</p>
              </div>
              <button
                onClick={openGalleryInterior}
                className="absolute top-5 right-5 px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-gold/30 text-gold text-[10px] tracking-widest uppercase hover:bg-gold hover:text-black transition"
              >
                <Eye className="w-4 h-4 inline-block mr-1" />Interior
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            {ROOMS.map((r, i) => (
              <div key={i} onClick={() => openRoom(r)} className="group cursor-pointer">
                <div className="flex items-center justify-between p-4 md:p-5 border-b border-white/5 hover:border-gold/30 hover:bg-white/5 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:block w-14 h-14 rounded-lg overflow-hidden">
                      <img src={r.img} className="w-full h-full object-cover group-hover:scale-110 transition" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base md:text-lg group-hover:text-gold transition">{r.title}</h4>
                      <p className="text-xs text-white/40">{r.sub}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-gold transition" />
                </div>
              </div>
            ))}
            <div className="mt-6 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
              <h3 className="text-lg font-serif mb-4 text-gold">Flybridge Experience</h3>
              <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                {["Jacuzzi","Sun Lounge","Dining Deck","Wet Bar","Audio System","LED Ambience"].map((a, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-gold" />
                    <span className="text-xs text-white/60">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// --- FleetSection ---
function FleetSection({ openFleet }: { openFleet: (f: FleetVessel) => void }) {
  return (
    <section id="fleet" className="py-12 md:py-5 px-4 md:px-8 lg:px-16 bg-navy">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-32 items-center mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[1.5px] bg-gold" />
              <span className="text-xs font-bold tracking-[2.5px] uppercase text-gold">Our Exclusive Fleet</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif leading-tight">
              Plan Your Yacht<br />
              <em className="text-gold italic font-serif">Experience Today</em>
            </h2>
          </div>
          <p className="text-white/50 text-base md:text-lg leading-relaxed">From romantic cruises off Anna Maria Island to corporate retreats in Tampa Bay, adventure meets luxury with a full suite of water sports gear.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {FLEET.map((f, i) => (
            <div key={i} className="relative aspect-[3/4] rounded-3xl overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 cursor-pointer" onClick={() => openFleet(f)}>
                <img src={f.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/80 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-500" />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToReservation(f.imgIndex, f.name);
                }}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#c9a227] flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-[#c9a227]/40 transition-all"
                aria-label={`Reserve ${f.name}`}
              >
                <ArrowUpRight className="w-5 h-5 text-[#040d1a]" />
              </button>
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10 pointer-events-none">
                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="font-bold text-lg md:text-xl mb-3 text-white group-hover:text-gold transition-colors">{f.name}</p>
                  <p className="text-sm text-white/0 group-hover:text-white/70 line-clamp-3 transition-colors duration-500 delay-100 mb-6">{f.desc}</p>
                </div>
                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold">View Details</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// --- CulinarySection ---
function CulinarySection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    {
      id: "chef", tag: "Master of the Galley", name: "Chef Cheryl", role: "Gulf Coast's Premier Yacht Chef",
      profileImg: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=200",
      titleLine1: "Where ", titleItalic: "Fine Dining", titleLine2: " Meets Home Comfort",
      description: "Looking for a personal chef for a party, work event, family dinner, or yacht excursion? Chef Cheryl brings the dream of fine dining to your charter table, where every dish is a labor of love.",
      mainImgs: ["assets/cheryl_foods.jpeg","assets/cheryl_foods1.jpeg","assets/cheryl_foods2.jpeg"],
      icon: <Utensils className="w-4 h-4 text-gold" />,
    },
    {
      id: "mixology", tag: "The Art of Mixology", name: "Nelly the Mixologist", role: "Expert Craft Cocktail Artist",
      profileImg: "https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=200",
      titleLine1: "Crafting Cocktails That ", titleItalic: "Spark Connection", titleLine2: "",
      description: "Mixology isn't just about pouring drinks—it's about creating an experience where every sip tells a story. Nelly blends premium spirits and fresh ingredients with a creative flair.",
      mainImgs: [
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=500",
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=500",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=600",
      ],
      icon: <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M7.5,7L5.5,5H18.5L16.5,7M11,13V19H6V21H18V19H13V13L21,5V3H3V5L11,13Z" /></svg>,
    },
  ];

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 1000 : -1000, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (d: number) => ({ zIndex: 0, x: d < 0 ? 1000 : -1000, opacity: 0 }),
  };

  return (
    <section id="culinary" className="py-6 md:py-14 bg-navy-light overflow-hidden relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative">
        <div className="flex items-center justify-between mb-10 md:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[1.5px] bg-gold" />
              <span className="text-xs font-bold tracking-[2.5px] uppercase text-gold">Culinary & Mixology</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif">Epicurean <em className="text-gold italic font-serif">Journey</em></h2>
          </div>
          <div className="flex gap-3 md:gap-4">
            <button onClick={() => { setDirection(-1); setActiveSlide((p) => (p - 1 + slides.length) % slides.length); }} className="w-10 md:w-12 h-10 md:h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all">
              <ChevronLeft className="w-4 md:w-5 h-4 md:h-5" />
            </button>
            <button onClick={() => { setDirection(1); setActiveSlide((p) => (p + 1) % slides.length); }} className="w-10 md:w-12 h-10 md:h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all">
              <ChevronRight className="w-4 md:w-5 h-4 md:h-5" />
            </button>
          </div>
        </div>
        <div className="relative h-auto lg:h-[700px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div key={activeSlide} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.4 } }}
              className="lg:absolute inset-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center h-full">
                <div className="order-2 lg:order-1">
                  <div className="bg-navy/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 md:p-12 shadow-2xl relative overflow-hidden hover:border-gold/20 transition-colors">
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-gold/5 rounded-full blur-[60px]" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-[1px] bg-gold/50" />
                        <span className="text-[10px] font-bold tracking-[2px] uppercase text-gold/60">{slides[activeSlide].tag}</span>
                      </div>
                      <div className="flex items-center gap-4 md:gap-5 mb-6 md:mb-8">
                        <div className="w-14 md:w-20 h-14 md:h-20 rounded-full border-2 border-gold/30 p-1 shrink-0 shadow-xl relative">
                          <img src={slides[activeSlide].profileImg} className="w-full h-full object-cover rounded-full" alt={slides[activeSlide].name} />
                          <div className="absolute -bottom-1 -right-1 bg-navy border border-white/10 rounded-full p-1.5 scale-90">{slides[activeSlide].icon}</div>
                        </div>
                        <div>
                          <h3 className="text-lg md:text-2xl font-serif">{slides[activeSlide].name}</h3>
                          <p className="text-gold text-[9px] md:text-[10px] uppercase tracking-widest mt-1 font-bold opacity-80">{slides[activeSlide].role}</p>
                        </div>
                      </div>
                      <h2 className="text-xl md:text-4xl font-serif mb-6 leading-snug">
                        {slides[activeSlide].titleLine1}<em className="text-gold italic font-serif">{slides[activeSlide].titleItalic}</em>{slides[activeSlide].titleLine2}
                      </h2>
                      <p className="text-white/50 text-sm md:text-base leading-relaxed">{slides[activeSlide].description}</p>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2 grid grid-cols-2 gap-4 md:gap-6 relative px-2 lg:px-0">
                  <div className="absolute inset-0 bg-gold/5 blur-[100px] rounded-full -z-10" />
                  <div className="mt-8 md:mt-12"><motion.img whileHover={{ y: -10 }} src={slides[activeSlide].mainImgs[0]} className="w-full aspect-[4/5] object-cover rounded-[2rem] shadow-2xl border border-white/10" alt="" /></div>
                  <div><motion.img whileHover={{ y: -10 }} src={slides[activeSlide].mainImgs[1]} className="w-full aspect-[4/5] object-cover rounded-[2rem] shadow-2xl border border-white/10" alt="" /></div>
                  <div className="col-span-2 px-6 md:px-20 -mt-8 md:-mt-10 relative z-10"><motion.img whileHover={{ scale: 1.02 }} src={slides[activeSlide].mainImgs[2]} className="w-full aspect-video object-cover rounded-[2rem] shadow-2xl border border-white/20" alt="" /></div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-3 mt-10 md:mt-20">
          {slides.map((_, i) => (
            <button key={i} onClick={() => { setDirection(i > activeSlide ? 1 : -1); setActiveSlide(i); }}
              className={`h-1.5 transition-all duration-500 rounded-full ${activeSlide === i ? "w-8 bg-gold" : "w-4 bg-white/20"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

// --- DestinationsSection ---
function DestinationsSection() {
  const [selected, setSelected] = useState<typeof DESTINATIONS[0] | null>(null);

  return (
    <section id="destinations" className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-navy">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[1.5px] bg-gold" />
              <span className="text-xs font-bold tracking-[2.5px] uppercase text-gold">Gulf Coast Destinations</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif leading-tight">
              Choose Great Day<br />
              <em className="text-gold italic font-serif">Destinations</em>
            </h2>
          </div>
          <p className="text-white/40 max-w-sm text-sm leading-relaxed">All destinations accessible from St Petersburg / Tampa Bay aboard Serendipity.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {DESTINATIONS.map((dest, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              onClick={() => setSelected(dest)}
              className="group relative rounded-3xl overflow-hidden cursor-pointer aspect-[4/3] shadow-2xl">
              <img src={dest.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={dest.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-gold/90 text-navy text-[10px] font-bold uppercase tracking-widest rounded-full">{dest.tag}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base md:text-lg font-serif group-hover:text-gold transition-colors">{dest.name}</h3>
                  <div className="flex items-center gap-1 text-white/40 text-xs">
                    <Clock className="w-3 h-3" /> {dest.distance}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gold text-[10px] font-bold uppercase tracking-[2px] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  Learn More <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <AnimatePresence>
        {selected && (
          <Modal onClose={() => setSelected(null)}>
            <div className="max-w-2xl w-full bg-navy-light rounded-3xl overflow-hidden border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-hide">
              <div className="relative h-64">
                <img src={selected.img} className="w-full h-full object-cover" alt={selected.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-light via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gold/90 text-navy text-[10px] font-bold uppercase tracking-widest rounded-full">{selected.tag}</span>
                </div>
              </div>
              <div className="p-6 md:p-10">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-4 h-4 text-gold" />
                  <span className="text-xs text-white/40 uppercase tracking-widest">{selected.distance} from marina</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif mb-4">{selected.name}</h2>
                <p className="text-sm md:text-base text-white/60 leading-relaxed mb-8">{selected.desc}</p>
                <button onClick={() => { setSelected(null); window.location.hash = "booking"; }}
                  className="w-full py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-hover transition-colors flex items-center justify-center gap-2">
                  Include in My Charter <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
}

// --- PricingSection ---
function PricingSection() {
  const [showSpecial, setShowSpecial] = useState(false);

  return (
    <section id="pricing" className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-navy-light">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[1.5px] bg-gold" />
            <span className="text-xs font-bold tracking-[2.5px] uppercase text-gold">Charter Rates</span>
            <div className="w-12 h-[1.5px] bg-gold" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif mb-4">
            Charter Pricing<br />
            <em className="text-gold italic font-serif">& Price List</em>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed">Departing Tampa / St Petersburg. All rates include professional captain and crew. Charter rates are not inclusive of food/drink provisions, fuel, gratuity and/or expenses related to dockage or mooring fees at remote locations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 mb-10">
          {CHARTER_RATES.map((rate, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`relative rounded-[2rem] overflow-hidden border transition-all hover:scale-[1.01] ${rate.popular ? "border-gold/40 bg-gradient-to-b from-gold/10 to-navy/50" : "border-white/10 bg-white/5 hover:border-white/20"}`}>
              {rate.popular && (
                <div className="absolute top-0 left-0 right-0 flex justify-center">
                  <div className="bg-gold text-navy text-[10px] font-bold uppercase tracking-widest px-6 py-1.5 rounded-b-full">Most Popular</div>
                </div>
              )}
              <div className={`p-6 md:p-10 ${rate.popular ? "pt-10 md:pt-12" : ""}`}>
                <h3 className="text-xl md:text-2xl font-serif mb-1">{rate.name}</h3>
                <div className="flex items-end gap-2 mb-3">
                  <span className="text-3xl md:text-4xl font-serif text-gold font-bold">{rate.price}</span>
                  <span className="text-white/30 text-sm mb-1">/ charter</span>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
                  <div className="flex items-center gap-1.5 text-white/40 text-xs"><Clock className="w-3.5 h-3.5 text-gold/60" /> {rate.duration}</div>
                  <div className="flex items-center gap-1.5 text-white/40 text-xs"><Users className="w-3.5 h-3.5 text-gold/60" /> {rate.guests}</div>
                  {rate.nights !== "0" && <div className="flex items-center gap-1.5 text-white/40 text-xs"><Anchor className="w-3.5 h-3.5 text-gold/60" /> {rate.nights} nights</div>}
                </div>
                <p className="text-sm text-white/50 leading-relaxed mb-6">{rate.desc}</p>
                <div className="space-y-2.5 mb-8">
                  {rate.highlights.map((h, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-gold" /></div>
                      <span className="text-sm text-white/60">{h}</span>
                    </div>
                  ))}
                </div>
                <a href="#booking" className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${rate.popular ? "bg-gold text-navy hover:bg-gold-hover" : "border border-white/10 text-white/60 hover:border-gold/40 hover:text-gold"}`}>
                  Book {rate.name} <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="border border-white/10 rounded-3xl overflow-hidden">
          <button onClick={() => setShowSpecial(!showSpecial)} className="w-full flex items-center justify-between p-6 md:p-8 hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center"><Star className="w-4 h-4 text-gold" /></div>
              <div className="text-left">
                <h3 className="text-lg md:text-xl font-serif">Special Events & Occasions</h3>
                <p className="text-xs text-white/30 mt-0.5">Corporate events, celebrations & culinary experiences</p>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-white/40 transition-transform duration-300 ${showSpecial ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {showSpecial && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
                <div className="p-6 md:p-8 pt-0 grid grid-cols-1 md:grid-cols-3 gap-5">
                  {SPECIAL_RATES.map((r, i) => (
                    <div key={i} className="p-5 md:p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-gold/20 transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-serif text-base md:text-lg">{r.name}</h4>
                        <span className="text-gold font-bold text-lg md:text-xl font-serif shrink-0 ml-3">{r.price}</span>
                      </div>
                      <p className="text-xs md:text-sm text-white/50 leading-relaxed mb-5">{r.desc}</p>
                      <a href="#booking" className="text-gold text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 hover:gap-3 transition-all">Inquire <ArrowUpRight className="w-3 h-3" /></a>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="text-center text-white/25 text-xs mt-8">*Pricing subject to availability. Contact us for custom itineraries and special packages.</p>
        <div className="mt-8 text-center">
          <a href="#destinations" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest hover:bg-gold/10 transition-all">
            <MapPin className="w-4 h-4" /> Check Out Cool Destinations
          </a>
        </div>
      </motion.div>
    </section>
  );
}

// --- MechanicalSection ---
function MechanicalSection() {
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [openSystem, setOpenSystem] = useState<number | null>(null);

  const mechanicalSpecs = [
    { label: "Hull Type", value: "Fiberglass / GRP", icon: Ship },
    { label: "Hull Configuration", value: "Monohull", icon: Anchor },
    { label: "Year Built", value: "2000", icon: Clock },
    { label: "Major Refit", value: "2022", icon: Wrench },
    { label: "Builder", value: "Lazzara Yachts (FL)", icon: Settings },
    { label: "Classification", value: "Lazzara 94 Hardtop", icon: Activity },
    { label: "LOA", value: "94 ft / 28.65 m", icon: Ship },
    { label: "Beam", value: "22 ft / 6.7 m", icon: Wind },
    { label: "Draft", value: "Bahamas-friendly / Shallow", icon: Droplets },
    { label: "Displacement", value: "Low — fast cruiser", icon: Gauge },
    { label: "Cruising Speed", value: "18–22 knots", icon: Zap },
    { label: "Max Speed", value: "26+ knots", icon: Zap },
    { label: "Engine Hours", value: "Incredibly Low", icon: Gauge },
    { label: "Fuel Capacity", value: "Large reserve tanks", icon: Fuel },
    { label: "Range", value: "Tampa to Key West", icon: MapPin },
    { label: "Generator", value: "Dual onboard", icon: Activity },
    { label: "Air Conditioning", value: "Full vessel climate control", icon: Wind },
    { label: "Navigation", value: "Full electronics suite", icon: Settings },
  ];

  const systems = [
    { title: "Propulsion", icon: Gauge, items: ["Twin diesel inboard engines","Shaft drive — low engine hours","Bow thruster for precision docking","Hydraulic stabilizers underway","Anti-fouling bottom paint (2022)"] },
    { title: "Electronics & Navigation", icon: Settings, items: ["Garmin / Furuno chart plotter suite","Radar — open array","VHF radios (multiple)","GPS & AIS transponder","Satellite TV & high-speed WiFi","Full anchor windlass system"] },
    { title: "Safety Systems", icon: Activity, items: ["Life rafts — USCG certified","EPIRB & flares aboard","Fire suppression — engine room","Bilge pump system — automatic","CO detectors throughout","First aid & medical kit"] },
    { title: "Onboard Systems", icon: Wrench, items: ["Dual generators — full power at anchor","Watermaker / reverse osmosis","Full HVAC — all staterooms","Premium sound system","Washer / dryer aboard","Icemaker & commercial refrigeration"] },
  ];

  const visibleSpecs = showAllSpecs ? mechanicalSpecs : mechanicalSpecs.slice(0, 6);

  return (
    <section id="mechanical" className="py-16 md:py-24 px-6 lg:px-20 bg-navy relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/5 blur-[120px]" />
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-6xl mx-auto relative z-10">
        <div className="mb-14 text-center">
          <span className="text-[10px] tracking-[3px] uppercase text-gold/70">Technical Overview</span>
          <h2 className="text-3xl md:text-5xl font-serif mt-4 leading-tight">Mechanical <br /><em className="text-gold italic">Excellence</em></h2>
          <p className="text-white/40 max-w-xl mx-auto mt-4 text-sm">SERENDIPITY is engineered for performance, reliability, and refined cruising comfort.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {visibleSpecs.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-gold/30 hover:bg-white/10 transition-all group">
              <s.icon className="w-4 h-4 text-gold/60 mb-2 group-hover:text-gold" />
              <p className="text-[9px] uppercase tracking-widest text-white/30 mb-1">{s.label}</p>
              <p className="text-xs font-semibold text-white/80 leading-tight">{s.value}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mb-14">
          <button onClick={() => setShowAllSpecs(!showAllSpecs)} className="text-xs tracking-widest text-gold hover:text-gold-hover transition">
            {showAllSpecs ? "SHOW LESS" : "VIEW ALL SPECS"}
          </button>
        </div>
        <div className="space-y-4">
          {systems.map((sys, i) => {
            const isOpen = openSystem === i;
            return (
              <motion.div key={i} layout className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
                <button onClick={() => setOpenSystem(isOpen ? null : i)} className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center"><sys.icon className="w-4 h-4 text-gold" /></div>
                    <h4 className="font-serif text-lg">{sys.title}</h4>
                  </div>
                  <span className="text-xs text-white/40 tracking-widest">{isOpen ? "CLOSE" : "VIEW"}</span>
                </button>
                {isOpen && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-6 pb-6">
                    <ul className="space-y-3 text-sm text-white/60">
                      {sys.items.map((item, j) => (
                        <li key={j} className="flex gap-2"><span className="w-1.5 h-1.5 bg-gold rounded-full mt-2" />{item}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
        <div className="mt-16 text-center">
          <a href="#booking" className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-xl hover:scale-105 hover:bg-gold-hover transition">
            Request Full Technical Docs <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

// --- ReviewsSection ---
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
    <section id="reviews" className="py-12 md:py-20 bg-navy-light relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 mb-12 md:mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-[1.5px] bg-gold" />
          <span className="text-xs font-bold tracking-[2.5px] uppercase text-gold">Guest Reviews</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="text-3xl md:text-5xl font-serif leading-tight">What Our Clients <em className="text-gold italic font-serif">Say</em></h2>
          <div className="flex flex-col items-start md:items-end">
            <div className="flex items-center gap-1 mb-2">{[1,2,3,4,5].map((i) => <Star key={i} className="w-4 md:w-5 h-4 md:h-5 fill-gold text-gold" />)}</div>
            <p className="text-sm font-bold">5.0 Average Rating</p>
          </div>
        </div>
      </div>
      <div className="flex overflow-hidden relative py-8 md:py-10">
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} className="flex gap-5 md:gap-6 whitespace-nowrap">
          {infiniteReviews.map((r, i) => (
            <div key={i} className="w-[300px] md:w-[420px] lg:w-[450px] shrink-0 p-6 md:p-10 bg-navy/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] whitespace-normal group hover:border-gold/30 transition-all shadow-xl">
              <div className="text-gold/20 mb-5 font-serif">
                <svg className="w-8 md:w-10 h-8 md:h-10" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              </div>
              <div className="flex gap-0.5 mb-5">{[1,2,3,4,5].map((j) => <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" />)}</div>
              <p className="text-sm md:text-base text-white/80 leading-relaxed mb-6 md:mb-8 italic">"{r.text}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 md:w-12 h-10 md:h-12 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center font-bold text-gold text-xs md:text-sm group-hover:bg-gold group-hover:text-navy transition-all shrink-0">{r.initial}</div>
                <div>
                  <h5 className="font-bold text-sm">{r.name}</h5>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// --- BookingSection ---
function BookingSection({ addToast, openPayment }: { addToast: (m: string, t: string, tp: string) => void; openPayment: (data: { name: string; email: string; eventType: string }) => void }) {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState("Day Trip");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      openPayment({ name: `${firstName} ${lastName}`, email, eventType });
    }, 800);
  };

  return (
    <section id="booking" className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 blur-sm pointer-events-none">
        <img src="assets/hero1.png" className="w-full h-full object-cover" alt="" />
      </div>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[1.5px] bg-gold" />
            <span className="text-xs font-bold tracking-[2.5px] uppercase text-gold">Start Planning</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight mb-8">
            Ready for Your<br />
            <em className="text-gold italic font-serif">Next Adventure?</em>
          </h2>
          <p className="text-white/50 text-base md:text-lg mb-10 max-w-sm">Whether celebrating a milestone or seeking peace on the water, Serendipity brings refined luxury and adventure together.</p>
          <div className="space-y-5">
            {[
              { icon: Phone, text: "Call Jake: 412-418-2968" },
              { icon: Phone, text: "Call Bryon: 727-644-9653" },
              { icon: MapPin, text: "Saint Petersburg, FL" },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:border-gold/50 transition-colors shrink-0">
                  <c.icon className="w-5 h-5 text-gold" />
                </div>
                <span className="text-white/70 font-medium group-hover:text-white transition-colors">{c.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 md:mt-12 p-5 md:p-6 rounded-2xl border border-white/10 bg-white/5">
            <p className="text-xs font-bold tracking-[2px] uppercase text-gold/70 mb-4">Charter Quick Rates</p>
            <div className="space-y-3">
              {CHARTER_RATES.map((r, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-white/60">{r.name}</span>
                  <span className="text-sm font-bold text-gold">{r.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6 md:p-10 lg:p-12 bg-navy-light/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-serif mb-2">Inquire Now</h3>
          <p className="text-white/40 mb-8 text-sm">Tell us about your dream charter and we'll craft the perfect itinerary.</p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/30 tracking-widest uppercase">First Name</label>
                <input required type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-sm outline-none focus:border-gold transition-colors" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/30 tracking-widest uppercase">Last Name</label>
                <input required type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-sm outline-none focus:border-gold transition-colors" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 tracking-widest uppercase">Email Address</label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-sm outline-none focus:border-gold transition-colors" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 tracking-widest uppercase">Charter Type</label>
              <select value={eventType} onChange={(e) => setEventType(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-sm outline-none focus:border-gold transition-colors appearance-none cursor-pointer">
                <option className="bg-navy" value="Day Trip">Day Trip — $10,000</option>
                <option className="bg-navy" value="Weekend Getaway">Weekend Getaway — $20,000</option>
                <option className="bg-navy" value="Full Week">Full Week — $35,000</option>
                <option className="bg-navy" value="Corporate Events">Corporate Events — $15,000</option>
                <option className="bg-navy" value="Birthdays & Anniversaries">Birthdays & Anniversaries — $7,500</option>
                <option className="bg-navy" value="Culinary & Wine Cheese Events">Culinary & Wine Cheese Events — $7,500</option>
                <option className="bg-navy" value="Sunset Cruise">Sunset Cruise (Custom)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 tracking-widest uppercase">Message</label>
              <textarea rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-sm outline-none focus:border-gold transition-colors resize-none" placeholder="Tell us about your event, preferred dates, and any special requests..." />
            </div>
            <button disabled={loading}
              className="w-full py-4 md:py-5 bg-gradient-to-r from-gold to-gold-hover text-navy font-bold rounded-2xl shadow-xl shadow-gold/20 hover:translate-y-[-2px] active:scale-[0.98] transition-all disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-3">
              {loading ? (
                <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full" />Preparing Payment…</>
              ) : (
                <><CreditCard className="w-5 h-5" /> Proceed to Payment</>
              )}
            </button>
            <p className="text-center text-[10px] text-white/25 flex items-center justify-center gap-2">
              <Lock className="w-3 h-3" /> Secured with 256-bit SSL encryption
            </p>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer className="bg-[#040810] py-16 md:py-20 px-4 md:px-8 lg:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-16 md:mb-20">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <img src="assets/logo.png" alt="Serendipity Logo" className="h-14 md:h-16 w-auto" />
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">A stunning 94' Lazzara Hardtop motor yacht based in Saint Petersburg, Florida.</p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/profile.php?id=61578530267044" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold/50 transition-colors cursor-pointer text-white/50 hover:text-gold">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold/50 transition-colors cursor-pointer text-white/50 hover:text-gold">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold/50 transition-colors cursor-pointer text-white/50 hover:text-gold">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-6">Charter</h4>
            <ul className="space-y-3">
              <li><a href="#pricing" className="text-sm text-white/30 hover:text-gold transition-colors cursor-pointer block">Day Excursions — $10,000</a></li>
              <li><a href="#pricing" className="text-sm text-white/30 hover:text-gold transition-colors cursor-pointer block">Weekend Getaway — $20,000</a></li>
              <li><a href="#pricing" className="text-sm text-white/30 hover:text-gold transition-colors cursor-pointer block">Full Week — $35,000</a></li>
              <li><a href="#pricing" className="text-sm text-white/30 hover:text-gold transition-colors cursor-pointer block">Corporate Events — $15,000</a></li>
              <li><a href="#pricing" className="text-sm text-white/30 hover:text-gold transition-colors cursor-pointer block">Special Occasions — $7,500</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-6">Contact</h4>
            <ul className="space-y-3">
              <li className="text-sm text-white/30">Call Jake: 412-418-2968</li>
              <li className="text-sm text-white/30">Manager Bryon: 727-644-9653</li>
              <li><a href="#booking" className="text-sm text-white/30 hover:text-gold transition-colors cursor-pointer block">Send Inquiry</a></li>
              <li><a href="#mechanical" className="text-sm text-white/30 hover:text-gold transition-colors cursor-pointer block">Technical Specs</a></li>
              <li><a href="#vessel" className="text-sm text-white/30 hover:text-gold transition-colors cursor-pointer block">Full Specifications</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-6">Location</h4>
            <ul className="space-y-3">
              <li className="text-sm text-white/30">Maximo Marina</li>
              <li className="text-sm text-white/30">3701 50 Ave S.</li>
              <li className="text-sm text-white/30">Saint Petersburg, FL 33371</li>
              <li><a href="#destinations" className="text-sm text-white/30 hover:text-gold transition-colors cursor-pointer block">View Destinations →</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 md:pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-5 text-[10px] md:text-xs font-medium text-white/20 tracking-widest uppercase">
          <p>© 2025 SERENDIPITY YACHT CHARTER. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 md:gap-8">
            {["Privacy","Terms","Cookies"].map((l) => <a key={l} href="#" className="hover:text-gold transition-colors">{l}</a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Modal ---
function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-navy/90 backdrop-blur-xl z-[10002] flex items-center justify-center p-3 md:p-10">
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()} className="relative max-h-full w-full flex items-center justify-center">
        <button onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors z-[10003] bg-navy/20 backdrop-blur-md rounded-full hover:bg-navy/40">
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}