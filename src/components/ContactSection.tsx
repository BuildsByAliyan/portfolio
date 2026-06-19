import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MessageCircle, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import FadeIn from './FadeIn';

interface ContactMethod {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
  accentColor: string;
}

const CONTACT_METHODS: ContactMethod[] = [
  {
    icon: Mail,
    label: 'Email',
    value: 'ALIYANDEV-PK',
    href: 'mailto:aliyandev.pk@gmail.com',
    accentColor: '#96ff19',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+92 37002 56087',
    href: 'https://wa.me/92700256087',
    accentColor: '#96ff19',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'ALIYAN',
    href: 'https://www.linkedin.com/in/aliyan-saleem-02a596378',
    accentColor: '#96ff19',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'BUILDBYALIYAN',
    href: 'https://github.com/BuildsByAliyan',
    accentColor: '#96ff19',
  },
];

interface CardProps {
  method: ContactMethod;
  index: number;
}

const ContactCard = ({ method, index }: CardProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = method.icon;
  const isExternal = method.href.startsWith('http');

  return (
    <motion.a
      ref={ref}
      href={method.href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col justify-between gap-8 sm:gap-10 rounded-[28px] sm:rounded-[32px] border-2 border-[#D7E2EA]/20 bg-[#141418] p-6 sm:p-7 md:p-8 overflow-hidden transition-all duration-400 hover:border-[#96ff19]/60 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(150,255,25,0.08)]"
    >
      {/* Green glow corner on hover */}
      <span className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#96ff19]/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex items-start justify-between relative z-10">
        {/* Icon circle — fills green on hover */}
        <div className="rounded-full border border-[#D7E2EA]/20 p-3 sm:p-3.5 transition-all duration-400 group-hover:border-[#96ff19] group-hover:bg-[#96ff19]">
          <Icon
            className="transition-colors duration-300 text-[#D7E2EA] group-hover:text-[#0C0C0C]"
            size={22}
            strokeWidth={1.5}
          />
        </div>
        <ArrowUpRight
          className="text-[#D7E2EA]/40 transition-all duration-400 group-hover:text-[#96ff19] group-hover:rotate-12 group-hover:scale-110"
          size={22}
          strokeWidth={1.5}
        />
      </div>

      <div className="flex flex-col gap-2 sm:gap-3 relative z-10">
        <span
          className="font-light uppercase tracking-widest text-[#D7E2EA]/50 transition-colors duration-300 group-hover:text-[#96ff19]/70"
          style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
        >
          {method.label}
        </span>
        <span
          className="font-medium text-[#D7E2EA] break-all transition-colors duration-300 group-hover:text-white"
          style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)' }}
        >
          {method.value}
        </span>
      </div>
    </motion.a>
  );
};

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20"
    >
      {/* Heading */}
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-4"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Get in{' '}
          <span style={{ WebkitTextFillColor: '#96ff19', color: '#96ff19' }}>
            touch
          </span>
        </h2>
      </FadeIn>

      <FadeIn delay={0.15} y={20}>
        <p
          className="text-center font-light uppercase tracking-widest text-[#D7E2EA]/60 mb-12 sm:mb-16 md:mb-20"
          style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}
        >
          Pick whichever channel suits you
        </p>
      </FadeIn>

      {/* Contact cards */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {CONTACT_METHODS.map((method, i) => (
          <ContactCard key={method.label} method={method} index={i} />
        ))}
      </div>

      {/* Footer line */}
      <FadeIn delay={0.4} y={20}>
        <div className="mx-auto mt-20 sm:mt-24 md:mt-28 flex max-w-5xl flex-col items-center gap-3 border-t border-[#D7E2EA]/10 pt-8 text-center sm:flex-row sm:justify-between">
          <span
            className="font-light uppercase tracking-widest text-[#D7E2EA]/50"
            style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
          >
            © 2026 Aliyan Saleem
          </span>
          <span
            className="font-light uppercase tracking-widest text-[#D7E2EA]/50"
            style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
          >
            Designed & built in Karachi
          </span>
        </div>
      </FadeIn>
    </section>
  );
};

export default ContactSection;