import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';

interface ProjectData {
  number: string;
  category: string;
  name: string;
  description: string;
  liveUrl: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
  col1Image1Mobile: string;
  col1Image2Mobile: string;
  col2ImageMobile: string;
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    category: 'E-Commerce · Fashion',
    name: 'Trend In Law',
    description: 'Style. Vibe. Reflect.',
    liveUrl: 'https://buildsbyaliyan.github.io/trendinlaw-ecommerce/',
    col1Image1: '/trendinlaw1.jpg',
    col1Image2: '/trendinlaw2.jpg',
    col2Image: '/trendinlaw3.jpg',
    col1Image1Mobile: '/R-trendinlaw1.jpg',
    col1Image2Mobile: '/R-trendinlaw2.jpg',
    col2ImageMobile: '/R-trendinlaw3.jpg',
  },
  {
    number: '02',
    category: 'E-Commerce · Ladies Fashion',
    name: 'Libaas Studio',
    description: 'Premium Pakistani Ladies Suits',
    liveUrl: 'https://buildsbyaliyan.github.io/libaas-studio/',
    col1Image1: '/libaas-studio1.jpg',
    col1Image2: '/libaas-studio2.jpg',
    col2Image: '/libaas-studio3.jpg',
    col1Image1Mobile: '/R-libaas-studio1.jpg',
    col1Image2Mobile: '/R-libaas-studio2.jpg',
    col2ImageMobile: '/R-libaas-studio3.jpg',
  },
  {
    number: '03',
    category: 'Web App · Utility',
    name: 'Smart QR Hub',
    description: 'Generate. Scan. Connect. Instantly.',
    liveUrl: 'https://buildsbyaliyan.github.io/Smart-QR-Generator/',
    col1Image1: '/Smart-QR-Generator1.jpg',
    col1Image2: '/Smart-QR-Generator2.jpg',
    col2Image: '/Smart-QR-Generator3.jpg',
    col1Image1Mobile: '/R-Smart-QR-Generator1.jpg',
    col1Image2Mobile: '/R-Smart-QR-Generator2.jpg',
    col2ImageMobile: '/R-Smart-QR-Generator3.jpg',
  },
  {
    number: '04',
    category: 'UI/UX · Design',
    name: 'Design Works',
    description: 'Crafted interfaces that speak.',
    liveUrl: 'https://www.instagram.com/creativestudi0.pk_',
    col1Image1: '/ui-ux1.jpg',
    col1Image2: '/ui-ux2.jpg',
    col2Image: '/ui-ux3.jpg',
    col1Image1Mobile: '/R-ui-ux1.jpg',
    col1Image2Mobile: '/R-ui-ux2.jpg',
    col2ImageMobile: '/R-ui-ux3.jpg',
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

// Responsive Image Component
const ResponsiveImage = ({ 
  desktopSrc, 
  mobileSrc, 
  alt, 
  className 
}: { 
  desktopSrc: string; 
  mobileSrc: string; 
  alt: string; 
  className: string;
}) => {
  return (
    <picture>
      {/* Mobile: screens up to 768px (sm) */}
      <source media="(max-width: 768px)" srcSet={mobileSrc} />
      {/* Tablet: screens 769px to 1024px (md) */}
      <source media="(min-width: 769px) and (max-width: 1024px)" srcSet={desktopSrc} />
      {/* Desktop: 1025px and above */}
      <source media="(min-width: 1025px)" srcSet={desktopSrc} />
      {/* Fallback */}
      <img src={desktopSrc} alt={alt} className={className} loading="lazy" draggable={false} />
    </picture>
  );
};

const ProjectCard = ({ project, index, total, containerRef }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky w-full"
      style={{ top: `${96 + index * 28}px`, height: '85vh' }}
    >
      <motion.article
        style={{ scale }}
        className="group origin-top mx-auto h-full w-full flex flex-col gap-4 sm:gap-6 md:gap-8 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA]/20 bg-[#0C0C0C] p-4 sm:p-6 md:p-8 transition-colors duration-500 hover:border-[#96ff19]/40"
      >
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-4 sm:gap-6">
          <div className="flex flex-row items-start gap-3 sm:gap-6 md:gap-10 min-w-0 w-full">

            {/* Number */}
            <div
              className="shrink-0 font-black leading-none transition-colors duration-500 text-[#D7E2EA] group-hover:text-[#96ff19]"
              style={{ fontSize: 'clamp(2.5rem, 10vw, 140px)' }}
            >
              {project.number}
            </div>

            <div className="flex flex-col gap-1 sm:gap-2 pt-1 sm:pt-3 md:pt-4 min-w-0 flex-1">
              {/* Category */}
              <span
                className="font-light uppercase tracking-widest text-[#D7E2EA]/60 flex items-center gap-2"
                style={{ fontSize: 'clamp(0.65rem, 1.2vw, 1rem)' }}
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#96ff19] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                {project.category}
              </span>

              {/* Project name */}
              <h3
                className="font-medium uppercase text-[#D7E2EA] leading-tight relative inline-block w-fit"
                style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#96ff19] transition-all duration-500 group-hover:w-full rounded-full" />
              </h3>

              {/* Description */}
              <p
                className="text-[#D7E2EA]/40 font-light italic"
                style={{ fontSize: 'clamp(0.6rem, 1vw, 0.85rem)' }}
              >
                {project.description}
              </p>
            </div>
          </div>

          <div className="shrink-0 self-start sm:self-auto pt-1 sm:pt-2 md:pt-3 w-full sm:w-auto">
            <LiveProjectButton href={project.liveUrl} className="w-full sm:w-auto" />
          </div>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-[40%_60%] gap-3 sm:gap-4 md:gap-5 flex-1 min-h-0">
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 min-h-0">
            <div
              className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            >
              <ResponsiveImage
                desktopSrc={project.col1Image1}
                mobileSrc={project.col1Image1Mobile}
                alt={`${project.name} preview 1`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div
              className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            >
              <ResponsiveImage
                desktopSrc={project.col1Image2}
                mobileSrc={project.col1Image2Mobile}
                alt={`${project.name} preview 2`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] min-h-0">
            <ResponsiveImage
              desktopSrc={project.col2Image}
              mobileSrc={project.col2ImageMobile}
              alt={`${project.name} preview 3`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#0C0C0C] px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Proj<span style={{
            WebkitTextFillColor: '#96ff19',
            color: '#96ff19',
          }}>e</span>ct
        </h2>
      </FadeIn>

      <div ref={containerRef} className="mx-auto max-w-7xl">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            total={PROJECTS.length}
            containerRef={containerRef}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;