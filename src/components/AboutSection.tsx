import { useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { Download, Loader2, CheckCircle, Eye } from 'lucide-react';
import FadeIn from './FadeIn';
import { TextEffect } from './TextEffect';

const ABOUT_TEXT =
  "I'm Aliyan Saleem — a results-driven Junior IT Professional and Web & App Developer based in Karachi, Pakistan. I have hands-on experience in full-stack web development, Flutter mobile app development, and AI-assisted programming. Skilled in designing responsive interfaces, managing large-scale data workflows, and leveraging modern tools to build efficient, scalable solutions. Currently completing my Diploma in Software Technology while delivering real-world projects. Let's build something incredible together!";

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://facebook.com/creativestudi0.pk',
    icon: (
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/creativestudi0.pk_',
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37a4 4 0 1 1-7.914 1.173A4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/ItzAliyanX',
    icon: (
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    ),
  },
];

type DownloadStatus = 'idle' | 'downloading' | 'downloaded' | 'complete';

const CVDownloadButton = () => {
  const [status, setStatus] = useState<DownloadStatus>('idle');
  const [progress, setProgress] = useState(0);

  const handleClick = () => {
    if (status !== 'idle') return;

    // Trigger real download
    const link = document.createElement('a');
    link.href = '/ALIYAN-CV.pdf';
    link.download = 'Aliyan_Saleem_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Animate progress bar
    setStatus('downloading');
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + 5;
      });
    }, 80);

    setTimeout(() => setStatus('downloaded'), 1600 + 500);
    setTimeout(() => setStatus('complete'), 1600 + 500 + 1200);
    setTimeout(() => { setStatus('idle'); setProgress(0); }, 1600 + 500 + 1200 + 100);
  };

  return (
    <button
      onClick={handleClick}
      className={[
        'relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-lg',
        'px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wide select-none whitespace-nowrap',
        'transition-all duration-300',
        status === 'idle'
          ? 'border border-[#96ff19]/40 bg-[#96ff19]/10 text-[#96ff19] hover:bg-[#96ff19]/20 hover:border-[#96ff19]/80 hover:shadow-[0_0_16px_rgba(150,255,25,0.2)]'
          : status === 'downloaded'
          ? 'border border-[#96ff19] bg-[#96ff19]/20 text-[#96ff19]'
          : status === 'complete'
          ? 'border border-[#96ff19]/40 bg-[#96ff19]/10 text-[#96ff19]'
          : 'border border-[#96ff19]/20 bg-[#96ff19]/5 text-[#96ff19]/60 cursor-not-allowed',
      ].join(' ')}
    >
      {status === 'downloading' && (
        <div
          className="absolute inset-0 bg-[#96ff19]/15 transition-all duration-200 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      )}
      <span className="relative z-10 flex items-center gap-1.5">
        {status === 'idle'        && <><Download    className="h-3.5 w-3.5" />Download CV</>}
        {status === 'downloading' && <><Loader2     className="h-3.5 w-3.5 animate-spin" />{progress}%</>}
        {status === 'downloaded'  && <><CheckCircle className="h-3.5 w-3.5" />Downloaded!</>}
        {status === 'complete'    && <><Download    className="h-3.5 w-3.5" />Download CV</>}
      </span>
    </button>
  );
};

const AboutSection = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, margin: '-60px' });

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-[#96ff19]/[0.05] blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">

        {/* ── Heading — shows FIRST on mobile ──────────────────── */}
        <div className="order-1 md:order-1 md:hidden flex flex-col items-start gap-4">
          <FadeIn y={20}>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#96ff19]" />
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#96ff19]">
                Something About Me
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.08} y={30}>
            <h2
              className="hero-heading font-black uppercase leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 6.5vw, 84px)' }}
            >
              I'm a Professional
              <br />
              <span style={{ color: '#96ff19' }}>Developer</span>
            </h2>
          </FadeIn>
        </div>

        {/* ── Photo — shows SECOND on mobile, on the right on desktop ──── */}
        <FadeIn delay={0.1} y={30} className="order-2 md:order-2">
          <div className="relative mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md">
            {/* Offset accent frame */}
            <div className="absolute -right-3 -top-3 h-full w-full rounded-2xl border-2 border-[#96ff19]/70 sm:-right-6 sm:-top-6" />

            {/* Photo */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#D7E2EA]/10 bg-[#15151a]">
              <img
                src="/photo.png"
                alt="Aliyan Saleem"
                className="h-full w-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
            </div>

            {/* Glow accent */}
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-[#96ff19]/10 blur-2xl pointer-events-none" />
          </div>
        </FadeIn>

        {/* ── Text column — shows THIRD on mobile, on the left on desktop ── */}
        <div className="order-3 md:order-1 flex flex-col items-start gap-4 sm:gap-6 text-left">

          {/* Eyebrow tag + Heading — desktop only (mobile already showed it above) */}
          <div className="hidden md:flex md:flex-col md:items-start md:gap-6">
            <FadeIn y={20}>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#96ff19]" />
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#96ff19]">
                  Something About Me
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.08} y={30}>
              <h2
                className="hero-heading font-black uppercase leading-[0.95] tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 6.5vw, 84px)' }}
              >
                I'm a Professional
                <br />
                <span style={{ color: '#96ff19' }}>Developer</span>
              </h2>
            </FadeIn>
          </div>

          {/* Bio Text — word-by-word blur effect */}
          <div ref={textRef} className="max-w-md w-full">
            <TextEffect
              per="word"
              preset="blur"
              trigger={isInView}
              delay={0.05}
              className="font-medium leading-relaxed text-[#D7E2EA]/70"
              style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)' }}
            >
              {ABOUT_TEXT}
            </TextEffect>
          </div>

          {/* Social icons + Download button — same row on mobile */}
          <FadeIn delay={0.24} className="w-full">
            <div className="flex items-center justify-between gap-3 w-full sm:w-auto sm:justify-start sm:gap-5">
              <div className="flex items-center gap-2 sm:gap-3">
                {SOCIAL_LINKS.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D7E2EA]/15 text-[#D7E2EA]/60 transition-all duration-300 hover:border-[#96ff19]/60 hover:text-[#96ff19]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {icon}
                    </svg>
                  </a>
                ))}

                {/* View CV — desktop only, sits right after the icons */}
                <a
                  href="/ALIYAN-CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#D7E2EA]/20 bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#D7E2EA]/80 whitespace-nowrap transition-all duration-300 hover:border-[#D7E2EA]/40 hover:text-white"
                >
                  <Eye className="h-3.5 w-3.5" />
                  View CV
                </a>
              </div>

              {/* Mobile-only: View CV hidden, only Download shows inline with icons */}
              <CVDownloadButton />
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;