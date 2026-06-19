import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import FadeIn from './FadeIn';

const SERVICES = [
  {
    number: '01',
    title: 'UI/UX Design',
    description:
      'Designing clean, intuitive interfaces that prioritise user flow, visual hierarchy, and clarity — turning ideas into experiences people actually enjoy using. Proficient in Figma, Adobe Photoshop, and Canva.',
  },
  {
    number: '02',
    title: 'Front-End & Flutter Development',
    description:
      'Building responsive, pixel-perfect web apps with React, TypeScript, and Tailwind CSS — and cross-platform mobile apps with Flutter and Dart. From browser to phone, every screen covered.',
  },
  {
    number: '03',
    title: 'GenAI & AI-Assisted Programming',
    description:
      'Integrating large language models into real products via Gemini, Claude, and OpenAI APIs. Skilled in prompt engineering, AI-assisted code generation, and building smart automation workflows that save time.',
  },
  {
    number: '04',
    title: 'Data Analysis & Reporting',
    description:
      'Turning raw numbers into clear decisions using Advanced MS Excel, Power BI, and automated reporting workflows. Experienced in managing large-scale data, ensuring integrity, and delivering dashboards stakeholders can act on.',
  },
  {
    number: '05',
    title: 'IT Support & Cyber Security',
    description:
      'Providing end-to-end technical support — hardware maintenance, network configuration, and system troubleshooting. Certified in Cyber Security Fundamentals with hands-on experience implementing security protocols and protecting digital assets.',
  },
];

interface ServiceRowProps {
  service: typeof SERVICES[0];
  index: number;
  total: number;
}

const ServiceRow = ({ service, index, total }: ServiceRowProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-row items-start gap-6 sm:gap-10 md:gap-14 py-8 sm:py-10 md:py-12 cursor-default"
      style={{
        borderTop: '1px solid rgba(12, 12, 12, 0.15)',
        ...(index === total - 1 ? { borderBottom: '1px solid rgba(12, 12, 12, 0.15)' } : {}),
      }}
    >
      {/* Green left accent on hover */}
      <span className="absolute left-0 top-0 h-full w-[3px] bg-[#96ff19] scale-y-0 origin-top transition-transform duration-500 group-hover:scale-y-100 rounded-full" />

      {/* Number */}
      <div
        className="shrink-0 font-black leading-none transition-colors duration-400 text-[#0C0C0C] group-hover:text-[#96ff19]"
        style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
      >
        {service.number}
      </div>

      <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 pt-2 sm:pt-3 md:pt-4 w-full">
        <h3
          className="font-medium uppercase text-[#0C0C0C] leading-tight relative inline-block w-fit"
          style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
        >
          {service.title}
          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#96ff19] transition-all duration-500 group-hover:w-full rounded-full" />
        </h3>
        <p
          className="font-light leading-relaxed text-[#0C0C0C] max-w-2xl transition-opacity duration-300 group-hover:opacity-80"
          style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}
        >
          {service.description}
        </p>
      </div>

      {/* Arrow on hover */}
      <div className="shrink-0 self-center ml-auto pr-2 opacity-0 translate-x-[-8px] transition-all duration-400 group-hover:opacity-100 group-hover:translate-x-0">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#96ff19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="relative w-full bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn y={40}>
        <h2
          className="text-center font-black uppercase text-[#0C0C0C] mb-16 sm:mb-20 md:mb-28 leading-none"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Serv<span style={{ color: '#96ff19' }}>i</span>ces
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {SERVICES.map((service, i) => (
          <ServiceRow key={service.number} service={service} index={i} total={SERVICES.length} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;