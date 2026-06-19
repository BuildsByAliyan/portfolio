# Aliyan Saleem — Developer & Designer Portfolio

A dark-themed personal portfolio for **Aliyan Saleem** — Developer & Designer focused on UI/UX, front-end development, and creative web experiences.

Built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion**. Designed for one-click deployment on **Vercel**.

## Stack

- React 18 / TypeScript
- Vite (build tool)
- Tailwind CSS (utility-first styling)
- Framer Motion (animations + scroll effects)
- Lucide React (icons)
- Kanit font (Google Fonts, weights 300–900)

## Sections

1. **Hero** — name, tagline, magnetic-hover portrait
2. **About** — bio + skills grouped by Languages / Frameworks / Tools / Design
3. **Services** — UI/UX Design, Web Design, Front-end Development, GenAI Integration
4. **Tech Stack** — interactive 3D physics balls with skill icons
5. **Projects** — sticky-stacking cards for Trend In Law, Libaas Studio, Smart QR Hub, Design Works
6. **Contact** — Email, WhatsApp, LinkedIn, GitHub

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → /dist
npm run preview  # serve /dist locally
```

## Deploy to Vercel

Push to GitHub → import the repo at [vercel.com/new](https://vercel.com/new) → click Deploy. No environment variables needed.

## Project structure

```
src/
├── App.tsx                    # composes all sections
├── main.tsx                   # React entry
├── index.css                  # global styles + .hero-heading gradient
└── components/
    ├── HeroSection.tsx        # navbar, massive heading, magnetic portrait
    ├── AboutSection.tsx       # bio, animated text, skills grid
    ├── ServicesSection.tsx    # white section, 4 numbered services
    ├── TechStackSection.tsx   # 3D physics balls with WebP skill icons
    ├── ProjectsSection.tsx    # sticky-stacking project cards
    ├── ContactSection.tsx     # 4 contact methods with icons
    │
    ├── ContactButton.tsx      # gradient pill CTA
    ├── LiveProjectButton.tsx  # ghost outline pill
    ├── FadeIn.tsx             # whileInView animation wrapper
    ├── Magnet.tsx             # mouse-following magnetic hover
    └── AnimatedText.tsx       # char-by-char scroll-driven reveal
```

## Featured projects

| Project | Live | Built with |
|---|---|---|
| Trend In Law | [buildsbyaliyan.github.io/trendinlaw-ecommerce](https://buildsbyaliyan.github.io/trendinlaw-ecommerce/) | HTML, CSS, JavaScript |
| Libaas Studio | [buildsbyaliyan.github.io/libaas-studio](https://buildsbyaliyan.github.io/libaas-studio/) | HTML, CSS, JavaScript |
| Smart QR Hub | [github.com/BuildsByAliyan/Smart-QR-Generator](https://github.com/BuildsByAliyan/Smart-QR-Generator) | React, QR Libraries |

## Customisation

| Want to change | Open this file |
|---|---|
| Name, nav links, hero text | `src/components/HeroSection.tsx` |
| About paragraph, skills list | `src/components/AboutSection.tsx` |
| Services list | `src/components/ServicesSection.tsx` (`SERVICES` array) |
| Tech stack icons | `src/components/TechStackSection.tsx` (`IMAGE_URLS` array) |
| Projects, screenshots, live URLs | `src/components/ProjectsSection.tsx` (`PROJECTS` array) |
| Contact methods | `src/components/ContactSection.tsx` (`CONTACT_METHODS` array) |
| Project screenshots | drop new images in `public/` and reference as `/filename.jpg` |
| Brand gradient, font, dark colour | `src/index.css` and `tailwind.config.js` |
| Page title, meta description | `index.html` |

## Credits

Designed & built by **Aliyan Saleem** · [LinkedIn](https://www.linkedin.com/in/aliyan-saleem-02a596378/) · [Instagram](https://www.instagram.com/creativestudi0.pk_) · [GitHub](https://github.com/BuildsByAliyan)
