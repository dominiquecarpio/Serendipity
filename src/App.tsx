/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from "react";
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
  Mail,
  Calendar,
  Check,
  ExternalLink,
  ArrowUpRight,
  User,
  Wind,
  Droplets,
  Utensils,
  Zap,
  Facebook,
  Instagram,
  Twitter,
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

// --- Constants ---
const EXPERIENCES: Experience[] = [
  {
    img: "/assets/occasion1.png",
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
    img: "/assets/occasion2.png",
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
    img: "/assets/occasion3.png",
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
    img: "/assets/occasion4.png",
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
    img: "/assets/occasion5.png",
    tag: "First Class",
    title: "First Class Relaxation",
    desc: "Impress clients and inspire your team in an extraordinary setting. Serendipity offers an exclusive boardroom on the water with full AV capabilities, catering, and absolute privacy.",
    features: [
      "Full AV & WiFi setup",
      "Catering packages",
      "Up to 12 executives",
      "NDAs & confidentiality honored",
    ],
  },
  {
    img: "/assets/occasion6.png",
    tag: "Cooking Class",
    title: "Chef’s Cooking Classes",
    desc: "Disconnect from the noise and reconnect with yourself. Our wellness retreats feature guided meditation, yoga on the sundeck, spa treatments, and clean, nourishing cuisine tailored to your needs.",
    features: [
      "Certified yoga instructor",
      "Spa & massage options",
      "Organic catering menu",
      "Mindfulness packages",
    ],
  },
];

const ROOMS: Room[] = [
  {
    img: "/assets/occasion5.png",
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
    img: "/assets/bedroom2.png",
    sub: "VIP Staterooms",
    title: "Port & Starboard VIPs",
    desc: "Two symmetrical VIP staterooms — one port, one starboard — each featuring queen-size beds, ensuite bathrooms, and elegant décor.",
    amenities: [
      "Queen bed with premium bedding",
      "Private ensuite bathroom",
      "Climate-controlled environment",
    ],
  },
];

const FLEET = [
  {
    img: "/assets/occasion1.png",
    name: "Serenity Wave",
  },
  {
    img: "/assets/occasion3.png",
    name: "Ocean's Embrace",
  },
  {
    img: "/assets/occasion4.png",
    name: "Gulf Star",
  },
  {
    img: "/assets/occasion2.png",
    name: "Azure Dream",
  },
];

// --- Components ---

function CalendarComponent({ onSelect }: { onSelect: (date: string) => void }) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1)); // May 2025 as requested
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const bookedDays = [3, 7, 8, 14, 21, 22, 27];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysHeader = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const changeMonth = (dir: number) => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + dir, 1),
    );
  };

  const toggleDay = (d: number, isBooked: boolean) => {
    if (isBooked) return;
    const dateStr = `${d} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    setSelectedDays((prev) => {
      const idx = prev.indexOf(d);
      if (idx === -1) {
        onSelect(dateStr);
        return [...prev, d];
      }
      return prev.filter((day) => day !== d);
    });
  };

  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();
  const totalDays = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();
  const today = new Date();

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => changeMonth(-1)}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors border border-white/10 text-white/50 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-serif text-lg">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <button
          onClick={() => changeMonth(1)}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors border border-white/10 text-white/50 hover:text-white"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="cal-grid">
        {daysHeader.map((h) => (
          <div key={h} className="cal-head">
            {h}
          </div>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="cal-day empty" />
        ))}
        {Array.from({ length: totalDays }).map((_, i) => {
          const d = i + 1;
          const isToday =
            d === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();
          const isBooked = bookedDays.includes(d);
          const isSelected = selectedDays.includes(d);

          return (
            <div
              key={d}
              onClick={() => toggleDay(d, isBooked)}
              className={`
                cal-day 
                ${isBooked ? "booked" : isSelected ? "selected" : "available"}
                ${isToday && !isBooked ? "today" : ""}
              `}
            >
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroIdx, setHeroIdx] = useState(0);
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isAvailOpen, setIsAvailOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [toasts, setToasts] = useState<
    { id: number; msg: string; title: string; type: string }[]
  >([]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowFab(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addToast = (msg: string, title: string, type: string = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, title, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const nextHero = () => setHeroIdx((prev) => (prev + 1) % 3);

  useEffect(() => {
    const interval = setInterval(nextHero, 6500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen selection:bg-gold selection:text-white">
      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-blue-400 z-[10001] origin-left shadow-[0_0_10px_rgba(201,162,39,0.5)]"
        style={{ scaleX }}
      />

      <Navbar isScrolled={isScrolled} setMobileMenuOpen={setMobileMenuOpen} />

      <AnimatePresence>
        {mobileMenuOpen && <MobileMenu setMobileMenuOpen={setMobileMenuOpen} />}
      </AnimatePresence>

      <Hero
        heroIdx={heroIdx}
        setHeroIdx={setHeroIdx}
        openAvail={() => setIsAvailOpen(true)}
        openVideo={() => setIsVideoOpen(true)}
      />

      <main>
        <VesselSection
          addToast={addToast}
          openGallery={() => setIsGalleryOpen(true)}
          openAvail={() => setIsAvailOpen(true)}
        />
        <ExperiencesSection openExp={setSelectedExp} />
        <AccommodationsSection openRoom={setSelectedRoom} />
        <FleetSection />
        <ReviewsSection />
        <BookingSection addToast={addToast} />
      </main>

      <Footer />

      {/* --- Modals --- */}
      <AnimatePresence>
        {selectedExp && (
          <Modal onClose={() => setSelectedExp(null)}>
            <div className="max-w-3xl bg-navy-light rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={selectedExp.img}
                alt={selectedExp.title}
                className="w-full h-80 object-cover"
              />
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-[1.5px] bg-gold" />
                  <span className="text-[11px] font-bold tracking-[2.5px] uppercase text-gold">
                    {selectedExp.tag} Event
                  </span>
                </div>
                <h2 className="text-4xl font-serif mb-4 leading-tight">
                  {selectedExp.title}
                </h2>
                <p className="text-white/60 mb-6 leading-relaxed">
                  {selectedExp.desc}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  {selectedExp.features.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <Check className="w-4 h-4 text-gold" />
                      <span className="text-sm text-white/70">{f}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setSelectedExp(null);
                    window.location.hash = "booking";
                  }}
                  className="w-full py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-hover transition-colors flex items-center justify-center gap-2"
                >
                  Book This Experience <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Modal>
        )}

        {selectedRoom && (
          <Modal onClose={() => setSelectedRoom(null)}>
            <div className="max-w-2xl bg-navy-light rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={selectedRoom.img}
                alt={selectedRoom.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-8 md:p-10">
                <span className="text-[11px] font-bold tracking-[1.5px] uppercase text-gold mb-2 block">
                  {selectedRoom.sub}
                </span>
                <h2 className="text-3xl font-serif mb-4 leading-tight">
                  {selectedRoom.title}
                </h2>
                <p className="text-white/60 mb-6 leading-relaxed">
                  {selectedRoom.desc}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {selectedRoom.amenities.map((a, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-white/60"
                    >
                      <span className="text-gold">✦</span> {a}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setSelectedRoom(null);
                    window.location.hash = "booking";
                  }}
                  className="px-8 py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-hover transition-colors flex items-center justify-center gap-2"
                >
                  Inquire Now <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Modal>
        )}

        {isGalleryOpen && (
          <Modal onClose={() => setIsGalleryOpen(false)}>
            <div className="max-w-4xl bg-navy-light rounded-3xl overflow-hidden border border-white/10 shadow-2xl p-8">
              <h2 className="text-3xl font-serif mb-2">Photo Gallery</h2>
              <p className="text-white/40 mb-6">
                Serendipity — 94' Lazzara Hardtop Motor Yacht
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="aspect-video bg-white/5 rounded-xl border border-white/10 animate-pulse"
                  />
                ))}
              </div>
            </div>
          </Modal>
        )}

        {isAvailOpen && (
          <Modal onClose={() => setIsAvailOpen(false)}>
            <div className="max-w-lg w-full bg-navy-light rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-serif mb-2 mr-5">
                  Check Availability
                </h2>
                <p className="text-white/40 mb-8 text-sm">
                  Select your desired dates to check current availability.
                </p>

                <CalendarComponent
                  onSelect={(date) =>
                    addToast(`Selected ${date}`, "Date Added", "gold")
                  }
                />

                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-gold" />
                    <span className="text-[10px] uppercase tracking-wider text-white/50">
                      Selected
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded border border-gold" />
                    <span className="text-[10px] uppercase tracking-wider text-white/50">
                      Today
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-red-500/10 text-red-500/50" />
                    <span className="text-[10px] uppercase tracking-wider text-white/50">
                      Booked
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-white/10" />
                    <span className="text-[10px] uppercase tracking-wider text-white/50">
                      Available
                    </span>
                  </div>
                </div>

                <a
                  href="#booking"
                  onClick={() => setIsAvailOpen(false)}
                  className="mt-10 w-full py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-hover transition-colors flex items-center justify-center gap-2 ripple-btn"
                >
                  Request Selected Dates <ArrowUpRight className="w-4 h-4" />
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
              ></iframe>
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
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-[10001]">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className={`p-4 min-w-64 bg-navy-light/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex items-center gap-4`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === "gold" ? "bg-gold/15" : "bg-green-500/15"}`}
              >
                {t.type === "gold" ? (
                  <Zap className="w-4 h-4 text-gold" />
                ) : (
                  <Check className="w-4 h-4 text-green-500" />
                )}
              </div>
              <div>
                <p className="text-sm font-bold">{t.title}</p>
                <span className="text-xs text-white/40 block mt-1">
                  {t.msg}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Navbar({
  isScrolled,
  setMobileMenuOpen,
}: {
  isScrolled: boolean;
  setMobileMenuOpen: (o: boolean) => void;
}) {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 px-6 md:px-16 ${isScrolled ? "bg-navy/90 backdrop-blur-2xl py-4 shadow-xl" : "py-8"}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <img
            src="/assets/logo.png"
            alt="Serendipity Logo"
            className="h-20 md:h-16 w-auto group-hover:scale-105 transition-transform"
          />
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {["Vessel", "Experiences", "Accommodations", "Fleet", "Reviews"].map(
            (l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
              >
                {l}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-gold transition-all duration-300 group-hover:w-1/2" />
              </a>
            ),
          )}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#booking"
            className="hidden md:flex bg-gold px-8 py-3 rounded-full text-navy font-bold text-sm hover:translate-y-[-2px] transition-all shadow-lg shadow-gold/20 hover:shadow-gold/30"
          >
            Book Now
          </a>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}

function MobileMenu({
  setMobileMenuOpen,
}: {
  setMobileMenuOpen: (o: boolean) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-navy/98 backdrop-blur-2xl z-[2000] flex flex-col items-center justify-center p-8"
    >
      <button
        onClick={() => setMobileMenuOpen(false)}
        className="absolute top-8 right-8 p-3 text-white/50 hover:text-white transition-colors"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="flex flex-col gap-6 text-center">
        {[
          "Home",
          "Vessel",
          "Experiences",
          "Accommodations",
          "Fleet",
          "Reviews",
          "Contact",
        ].map((l) => (
          <a
            key={l}
            href={`#${l === "Home" ? "home" : l === "Contact" ? "booking" : l.toLowerCase()}`}
            onClick={() => setMobileMenuOpen(false)}
            className="text-4xl font-serif text-white hover:text-gold transition-colors"
          >
            {l}
          </a>
        ))}
      </div>
    </motion.div>
  );
}

function Hero({
  heroIdx,
  setHeroIdx,
  openAvail,
  openVideo,
}: {
  heroIdx: number;
  setHeroIdx: (i: number) => void;
  openAvail: () => void;
  openVideo: () => void;
}) {
  const slides = [
    {
      line1: "Your Gulf Coast",
      line2: "Escape Awaits",
      desc: "Reserve our luxury 94' Lazzara yacht for charter in St Pete / Tampa Bay.",
      img: "/assets/hero1.png",
      tag: "Saint Petersburg, FL",
    },
    {
      line1: "Experience",
      line2: "Pure Luxury",
      desc: "Discover breathtaking views and world-class comfort on Florida's Gulf Coast.",
      img: "/assets/hero2.png",
      tag: "Tampa Bay, FL",
    },
    {
      line1: "Make Memories",
      line2: "at Sea",
      desc: "Unforgettable moments aboard our expertly remodeled luxury yacht.",
      img: "/assets/hero3.png",
      tag: "Gulf Coast, FL",
    },
  ];

  return (
    <section
      id="home"
      className="relative h-screen min-h-[600px] overflow-hidden"
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={heroIdx}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slides[heroIdx].img}
            className="w-full h-full object-cover"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/20 to-navy" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col justify-end pb-24 md:pb-32 z-10">
        <motion.div
          key={heroIdx + "content"}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-3 mb-6 hero-tag-line">
            <span className="text-xs font-bold tracking-[2.5px] uppercase text-gold">
              {slides[heroIdx].tag}
            </span>
          </div>
          <h1 className="text-[40px] md:text-[62px] font-serif leading-[1.08] tracking-tight mb-6">
            <span>{slides[heroIdx].line1}</span>
            <br />
            <em className="text-gold italic not-italic font-serif">
              {slides[heroIdx].line2}
            </em>
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-lg">
            {slides[heroIdx].desc}
          </p>
          <div className="flex flex-wrap gap-6 items-center">
            <a
              href="#booking"
              className="bg-gold px-10 py-5 rounded-full text-navy font-bold text-base hover:translate-y-[-3px] transition-all flex items-center gap-2 shadow-xl shadow-gold/20"
            >
              Reserve Now <ArrowUpRight className="w-5 h-5" />
            </a>
            <button
              onClick={openVideo}
              className="flex items-center gap-4 text-white hover:text-gold transition-all group"
            >
              <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold transition-all">
                <Play className="w-5 h-5 fill-current ml-1" />
              </div>
              <span className="font-bold tracking-widest text-sm uppercase">
                Watch Experience
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating UI */}
      <div className="absolute top-28 right-16 hidden lg:block w-64 bg-navy/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl animate-float-y">
        <img
          src="/assets/hero1.png"
          className="w-full aspect-video object-cover rounded-xl mb-4"
        />
        <span className="text-[10px] font-bold text-gold tracking-widest uppercase">
          Popular Route
        </span>
        <h4 className="font-semibold mt-1">Island Hopping</h4>
        <p className="text-xs text-white/50 mt-1">
          Exclusive inlets & hidden sandbars
        </p>
      </div>

      <button
        onClick={openAvail}
        className="absolute top-[60%] right-28 hidden lg:flex items-center gap-4 bg-navy/80 border border-gold/30 backdrop-blur-xl p-4 rounded-2xl shadow-2xl hover:border-gold transition-all group z-20"
      >
        <div className="w-3 h-3 rounded-full bg-green-500 relative">
          <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse-ring" />
        </div>
        <div className="text-left">
          <p className="text-sm font-bold">Check Availability</p>
          <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">
            Summer 2025 dates open
          </p>
        </div>
      </button>

      {/* Nav Dots */}
      <div className="absolute right-8 md:right-16 bottom-32 md:bottom-40 flex flex-col gap-3">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={() => setHeroIdx(i)}
            className={`w-2.5 transition-all duration-500 ${heroIdx === i ? "h-10 bg-gold rounded-md" : "h-2.5 bg-white/20 rounded-full hover:bg-white/40"}`}
          />
        ))}
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce">
        <span className="text-[10px] tracking-[2px] uppercase">Scroll</span>
        <ChevronLeft className="w-5 h-5 -rotate-90" />
      </div>
    </section>
  );
}

function VesselSection({
  addToast,
  openGallery,
  openAvail,
}: {
  addToast: (m: string, t: string, tp: string) => void;
  openGallery: () => void;
  openAvail: () => void;
}) {
  return (
    <section
      id="vessel"
      className="py-24 md:py-40 px-6 bg-navy-light relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute -top-10 -left-10 w-32 h-32 border border-gold/20 rounded-full animate-spin-slow" />
          <div
            className="shimmer-wrap rounded-[2rem] overflow-hidden relative"
            onClick={openGallery}
          >
            <img
              src="/assets/gallerymain.png"
              className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
              alt="Serendipity Yacht"
            />
            <div className="absolute bottom-6 right-6 bg-navy/90 backdrop-blur-xl border border-gold/20 p-6 rounded-2xl">
              <p className="text-4xl font-serif text-gold font-bold">94'</p>
              <p className="text-xs text-white/40 uppercase tracking-widest mt-1">
                Lazzara Motor Yacht
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[1.5px] bg-gold" />
            <span className="text-xs font-bold tracking-[2.5px] uppercase text-gold">
              About Serendipity
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-8">
            Experience the Ocean
            <br />
            <span className="text-gradient">Like Never Before</span>
          </h2>
          <div className="space-y-6 text-white/60 leading-relaxed text-lg pb-10">
            <p>
              Welcome aboard to Serendipity, an extraordinary charter
              experience. Based in Saint Petersburg, Florida, Serendipity is an
              expertly remodeled, stunning 94' Lazzara Hardtop motor yacht.
            </p>
            <p>
              Located between Tampa and Sarasota on Florida's Gulf Coast,
              Serendipity offers rare access to secret inlets and calm
              anchorages that few yachts of this size can reach.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { val: "94 ft", label: "Yacht Length", icon: Wind },
              { val: "12", label: "Max Guests", icon: User },
              { val: "20+", label: "Destinations", icon: MapPin },
              { val: "5.0 ★", label: "Guest Rating", icon: Star },
            ].map((s, i) => (
              <div
                key={i}
                onClick={() =>
                  i === 2
                    ? openAvail()
                    : addToast(`Detail about ${s.label}`, s.val, "gold")
                }
                className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-gold/30 transition-all cursor-pointer group"
              >
                <s.icon className="w-6 h-6 text-gold mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-3xl font-serif text-gold font-bold">
                  {s.val}
                </p>
                <p className="text-xs text-white/40 uppercase tracking-widest mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ExperiencesSection({ openExp }: { openExp: (e: Experience) => void }) {
  const [idx, setIdx] = useState(EXPERIENCES.length);
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionStatus, setTransitionStatus] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Triple the items to create a seamless infinite scroll buffer
  const extendedItems = useMemo(
    () => [...EXPERIENCES, ...EXPERIENCES, ...EXPERIENCES],
    [],
  );

  const slide = (d: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTransitionStatus(true);
    setIdx((prev) => prev + d);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Teleport logic to handle infinite loop seamlessly
  useEffect(() => {
    if (isAnimating) return;

    if (idx >= EXPERIENCES.length * 2) {
      setTransitionStatus(false);
      setIdx(idx - EXPERIENCES.length);
    } else if (idx < EXPERIENCES.length) {
      setTransitionStatus(false);
      setIdx(idx + EXPERIENCES.length);
    }
  }, [idx, isAnimating]);

  const itemWidth =
    typeof window !== "undefined" && window.innerWidth >= 768 ? 350 : 300;
  const gap = 24;

  return (
    <section
      id="experiences"
      className="py-24 md:py-40 px-6 bg-navy overflow-hidden relative"
    >
      {/* Edge Gradients for Cinematic Feel */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-navy via-navy/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-navy via-navy/80 to-transparent z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 relative z-20">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[1.5px] bg-gold" />
              <span className="text-xs font-bold tracking-[2.5px] uppercase text-gold">
                Curated Experiences
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              A Floating Resort for
              <br />
              <span className="text-gradient">Every Occasion</span>
            </h2>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => slide(-1)}
              disabled={isAnimating}
              className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all active:scale-95 ${isAnimating ? "opacity-50" : ""}`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => slide(1)}
              disabled={isAnimating}
              className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all active:scale-95 ${isAnimating ? "opacity-50" : ""}`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="relative" ref={containerRef}>
          <motion.div
            animate={{ x: -idx * (itemWidth + gap) }}
            transition={
              transitionStatus
                ? { type: "spring", stiffness: 200, damping: 30, mass: 1 }
                : { duration: 0 }
            }
            className="flex gap-6 pointer-events-auto"
            style={{
              width: "max-content",
            }}
          >
            {extendedItems.map((e, i) => (
              <div
                key={i}
                onClick={() => openExp(e)}
                className="w-[300px] md:w-[350px] aspect-[3/4] relative group rounded-3xl overflow-hidden cursor-pointer shrink-0 shadow-2xl"
              >
                <img
                  src={e.img}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  alt=""
                />
                {/* Enhanced Dark Gradient for each card */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-navy/20 hover:bg-transparent transition-colors duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                  <div className="mb-2 w-8 h-[1px] bg-gold group-hover:w-12 transition-all" />
                  <h3 className="text-xl md:text-2xl font-serif text-white group-hover:text-gold transition-colors">
                    {e.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gold text-[10px] font-bold uppercase tracking-[2px] mt-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    Discover More <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/10 flex flex-wrap items-center justify-between gap-10 relative z-20">
          <div className="max-w-lg">
            <p className="text-white/40 mb-3">
              With spa-inspired amenities, elegant interiors, and professional
              crew, Serendipity is designed to impress.
            </p>
            <p className="text-gold font-bold text-lg">
              Plan your private event with us today.
            </p>
          </div>
          <a
            href="#"
            className="flex items-center gap-3 text-gold font-bold text-sm tracking-widest uppercase hover:gap-5 transition-all"
          >
            Explore Destinations <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function AccommodationsSection({ openRoom }: { openRoom: (r: Room) => void }) {
  return (
    <section id="accommodations" className="py-24 md:py-40 px-6 bg-navy-light">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[1.5px] bg-gold" />
            <span className="text-xs font-bold tracking-[2.5px] uppercase text-gold">
              Luxury Living
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-6">
            Elegant Accommodations
            <br />
            <span className="text-gradient">for Up to 12 Guests</span>
          </h2>
          <p className="text-white/50 text-lg">
            Rest and unwind in four refined guest suites, each designed for
            absolute comfort and offering total privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="relative rounded-[2.5rem] overflow-hidden group">
            <img
              src="/assets/gallerymain.png"
              className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-700"
              alt=""
            />
            <div className="absolute bottom-8 left-8 bg-navy/80 backdrop-blur-xl border border-gold/20 p-6 rounded-2xl">
              <p className="text-4xl font-serif text-gold font-bold">4</p>
              <p className="text-xs text-white/40 uppercase tracking-widest mt-1">
                Private Suites
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {ROOMS.map((r, i) => (
              <div
                key={i}
                onClick={() => openRoom(r)}
                className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-gold/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-xl overflow-hidden hidden sm:block">
                    <img
                      src={r.img}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif group-hover:text-gold transition-colors">
                      {r.title}
                    </h4>
                    <p className="text-sm text-white/40 mt-1">{r.sub}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-gold transition-colors" />
              </div>
            ))}

            <div className="p-8 mt-4 bg-gradient-to-br from-gold/10 to-blue-400/5 border border-white/5 rounded-3xl">
              <h3 className="text-xl font-serif mb-6">
                Premium Flybridge Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {[
                  "Hot/Cold Jacuzzi",
                  "Oversized sun lounges",
                  "Al fresco dining area",
                  "Professional wet bar",
                  "Surround sound system",
                  "LED ambient lighting",
                ].map((a, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-gold" />
                    </div>
                    <span className="text-sm text-white/60">{a}</span>
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

function FleetSection() {
  const [idx, setIdx] = useState(0);

  return (
    <section id="fleet" className="py-24 md:py-40 px-6 bg-navy">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-32 items-center mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[1.5px] bg-gold" />
              <span className="text-xs font-bold tracking-[2.5px] uppercase text-gold">
                Our Exclusive Fleet
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              Plan Your Yacht
              <br />
              <span className="text-gradient">Experience Today</span>
            </h2>
          </div>
          <p className="text-white/50 text-lg leading-relaxed">
            From romantic cruises off Anna Maria Island to corporate retreats in
            Tampa Bay, adventure meets luxury with a full suite of water sports
            gear.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLEET.map((f, i) => (
            <div
              key={i}
              className="relative aspect-[3/4] rounded-3xl overflow-hidden group cursor-pointer"
            >
              <img
                src={f.img}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                <p className="font-bold text-lg">{f.name}</p>
                <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-navy shadow-lg">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="py-24 md:py-40 px-6 bg-navy-light relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[1.5px] bg-gold" />
            <span className="text-xs font-bold tracking-[2.5px] uppercase text-gold">
              Guest Reviews
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-6">
            What Our
            <br />
            Clients
            <br />
            <span className="text-gradient">Say</span>
          </h2>
          <p className="text-white/50 mb-8 max-w-xs">
            Thousands of travelers have set sail with us — see what they have to
            say about their unforgettable experiences.
          </p>
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 fill-gold text-gold" />
            ))}
          </div>
          <p className="text-sm font-bold">5.0 Average Rating</p>
        </div>

        <div className="space-y-6">
          <div className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] relative overflow-hidden group">
            <div className="text-gold/20 mb-6 font-serif text-6xl">
              <svg
                className="w-12 h-12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <div className="flex gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-8">
              "We just had a 5 day charter and we could not be any happier.
              Captain John, Jake and Hailey were amazing. The crew made it
              perfect and the yacht's beauty I could not even explain. We are
              already planning our next trip. 5 stars no doubt!!!"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-gold to-blue-400 rounded-full flex items-center justify-center font-bold text-navy">
                CR
              </div>
              <div>
                <h5 className="font-bold">Carolina Reyes</h5>
                <p className="text-xs text-white/40 uppercase tracking-widest mt-1">
                  5-Day Charter Guest
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Shannon Cook",
                role: "Day Cruise Guest",
                text: "I had the opportunity to be a guest for a day cruise and it was lovely. The boat is top notch as are the captains. Definitely recommend!",
              },
              {
                name: "Byron Wilson",
                role: "Weekend Charter Guest",
                text: "We had an amazing time aboard the Serendipity! Unforgettable from start to finish. Already planning our return!",
              },
            ].map((r, i) => (
              <div
                key={i}
                className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] hover:border-gold/30 transition-all"
              >
                <div className="text-gold/20 mb-6">
                  <svg
                    className="w-10 h-10"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <Star key={j} className="w-3 h-3 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-white/60 mb-8 leading-relaxed">"{r.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xs font-bold">
                    {r.name[0]}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">{r.name}</h5>
                    <p className="text-[10px] text-white/40 uppercase mt-1">
                      {r.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function BookingSection({
  addToast,
}: {
  addToast: (m: string, t: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast(
        "Your charter request has been received. We'll be in touch within 24 hours.",
        "Request Sent!",
      );
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <section
      id="booking"
      className="py-24 md:py-48 px-6 bg-navy relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 blur-sm pointer-events-none">
        <img
          src="/assets/occasion4.png"
          className="w-full h-full object-cover"
          alt=""
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[1.5px] bg-gold" />
            <span className="text-xs font-bold tracking-[2.5px] uppercase text-gold">
              Start Planning
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-8">
            Ready for Your
            <br />
            <span className="text-gradient">Next Adventure?</span>
          </h2>
          <p className="text-white/50 text-lg mb-12 max-w-sm">
            Whether celebrating a milestone or seeking peace on the water,
            Serendipity brings refined luxury and adventure together.
          </p>

          <div className="space-y-6">
            {[
              { icon: Phone, text: "Call Jake: 412-418-2969" },
              { icon: Phone, text: "Call Manager Bryon: 727-644-9653" },
              { icon: MapPin, text: "Saint Petersburg, FL" },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:border-gold/50 transition-colors">
                  <c.icon className="w-5 h-5 text-gold" />
                </div>
                <span className="text-white/70 font-medium group-hover:text-white transition-colors">
                  {c.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 md:p-12 bg-navy-light/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl">
          <h3 className="text-3xl font-serif mb-2">Inquire Now</h3>
          <p className="text-white/40 mb-10 text-sm">
            Tell us about your dream charter and we'll craft the perfect
            itinerary.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/30 tracking-widest uppercase">
                  First Name
                </label>
                <input
                  required
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-gold transition-colors"
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/30 tracking-widest uppercase">
                  Last Name
                </label>
                <input
                  required
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-gold transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 tracking-widest uppercase">
                Email Address
              </label>
              <input
                required
                type="email"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-gold transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 tracking-widest uppercase">
                Event Type
              </label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-gold transition-colors appearance-none cursor-pointer">
                <option className="bg-navy">Day Charter</option>
                <option className="bg-navy">Sunset Cruise</option>
                <option className="bg-navy">Overnight Charter</option>
                <option className="bg-navy">Corporate Event</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 tracking-widest uppercase">
                Message
              </label>
              <textarea
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-gold transition-colors"
                placeholder="Tell us about your event..."
              />
            </div>
            <button
              disabled={loading}
              className="w-full py-5 bg-gradient-to-r from-gold to-gold-hover text-navy font-bold rounded-2xl shadow-xl shadow-gold/20 hover:translate-y-[-2px] active:scale-[0.98] transition-all disabled:opacity-50 disabled:translate-y-0"
            >
              {loading ? "Sending Request..." : "Submit Request"}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#040810] py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <img
                src="/assets/logo.png"
                alt="Serendipity Logo"
                className="h-20 w-auto"
              />
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              A stunning 94' Lazzara Hardtop motor yacht based in Saint
              Petersburg, Florida. Experience refined luxury on Florida's Gulf
              Coast.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold/50 transition-colors cursor-pointer text-white/50 hover:text-gold"
                >
                  <I className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: "Charter",
              links: [
                "Day Excursions",
                "Sunset Cruises",
                "Overnight Stays",
                "Corporate Events",
              ],
            },
            {
              title: "Contact",
              links: ["Capt Jake 412-418-2969", "Manager Bryon 727-644-9653"],
            },
            {
              title: "Location",
              links: [
                "Maximo Marina",
                "3701 50th Ave S.",
                "Saint Petersburg, FL 33371",
              ],
            },
          ].map((c, i) => (
            <div key={i}>
              <h4 className="font-serif text-lg mb-6">{c.title}</h4>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l} className="text-sm text-white/30">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] md:text-xs font-medium text-white/20 tracking-widest uppercase">
          <p>© 2025 SERENDIPITY YACHT CHARTER. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-gold transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-gold transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-gold transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-navy/90 backdrop-blur-xl z-[10002] flex items-center justify-center p-6 md:p-10"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative"
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 md:-right-12 p-3 text-white/50 hover:text-white transition-colors"
        >
          <X className="w-8 h-8" />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}
