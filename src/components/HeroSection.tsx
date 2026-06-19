import { useState, useEffect, useRef } from 'react';
import FadeIn from './FadeIn';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowSoundHint(false), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          const v = videoRef.current;
          if (v && !v.muted) {
            v.muted = true;
            setMuted(true);
          }
        }
      },
      { threshold: 0, rootMargin: '-50% 0px 0px 0px' }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // ✅ BUG FIX: Pehle wala wheel/keydown listener hata diya.
  // Woh e.preventDefault() call karta tha jo poori page ki scroll
  // permanently block kar deta tha — isliye TechStack nazar nahi aata tha
  // aur neeche scroll nahi hoti thi. Normal browser scroll ab kaam karega.

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    setShowSoundHint(false);
  };

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">

      {/* Desktop video */}
      {!isMobile && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/intro.mp4" type="video/mp4" />
        </video>
      )}

      {/* Mobile video */}
      {isMobile && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/intro-r.mp4" type="video/mp4" />
        </video>
      )}

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">

        {/* Nav */}
        <FadeIn delay={0} y={-20} className="relative">
          <div className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
            <ul className="flex items-center gap-4 sm:gap-8 md:gap-12">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[10px] sm:text-sm font-medium uppercase tracking-[0.12em] sm:tracking-[0.2em] text-white/80 transition-colors duration-200 hover:text-[#96ff19]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 sm:px-5 sm:py-2.5 text-[9px] sm:text-xs font-medium uppercase tracking-[0.1em] sm:tracking-[0.2em] text-white backdrop-blur-md transition-all duration-200 hover:bg-[#96ff19] hover:text-black hover:border-[#96ff19] hover:scale-[1.03] whitespace-nowrap"
            >
              Email me
            </a>
          </div>
        </FadeIn>

        {/* Name block */}
        <div className="flex flex-1 items-end md:items-center pb-24 sm:pb-28 md:pb-0" style={{ paddingTop: '5vh' }}>
          <div className="w-full max-w-7xl px-6 md:px-10">

            <FadeIn delay={0.3} y={20}>
              <p className="mb-4 text-[10px] sm:text-xs font-medium uppercase tracking-[0.35em] text-white/60">
                Portfolio · 2026
              </p>
            </FadeIn>

            <FadeIn delay={0.5} y={40}>
              <h1
                className="font-black uppercase leading-[0.88] tracking-tight text-white"
                style={{ fontSize: 'clamp(2.6rem, 9vw, 8.5rem)' }}
              >
                Aliyan<br />Saleem
              </h1>
            </FadeIn>

            <FadeIn delay={0.85} y={20}>
              <p
                className="font-medium uppercase tracking-[0.28em] text-white/75"
                style={{
                  fontSize: 'clamp(0.6rem, 1.05vw, 0.82rem)',
                  marginTop: 'clamp(1.4rem, 3.5vh, 2.5rem)',
                  letterSpacing: '0.28em',
                }}
              >
                Web Development&nbsp;&nbsp;·&nbsp;&nbsp;UI/UX Design&nbsp;&nbsp;·&nbsp;&nbsp;Graphic Design
              </p>
            </FadeIn>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-end justify-between px-6 md:px-10 pb-7 sm:pb-10 md:pb-12">

          <FadeIn delay={1.1} y={20}>
            <a
              href="#about"
              aria-label="Scroll to next section"
              className="group flex flex-col items-center gap-3"
            >
              <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.35em] text-white/70 transition-colors duration-200 group-hover:text-[#96ff19]">
                Scroll
              </span>
              <div className="relative h-12 w-px overflow-hidden bg-white/20">
                <span
                  className="absolute inset-x-0 top-0 h-1/2 w-full bg-[#96ff19]"
                  style={{ animation: 'scrollLine 1.8s ease-in-out infinite' }}
                />
              </div>
            </a>
          </FadeIn>

          <FadeIn delay={1.1} y={20}>
            <div className="flex items-center gap-3">
              {showSoundHint && (
                <span
                  className="hidden sm:inline text-[10px] font-medium uppercase tracking-[0.25em] text-white/80"
                  style={{ animation: 'pulseFade 2s ease-in-out infinite' }}
                >
                  Tap for sound
                </span>
              )}
              <button
                onClick={toggleMute}
                aria-label={muted ? 'Unmute video' : 'Mute video'}
                className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-200 hover:bg-[#96ff19] hover:text-black hover:border-[#96ff19] hover:scale-110"
              >
                {muted ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </button>
            </div>
          </FadeIn>

        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes pulseFade {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;