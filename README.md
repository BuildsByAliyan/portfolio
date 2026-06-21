<div align="center">

<img src="./.github/github-banner.jpg" alt="Aliyan Saleem — Developer & Designer Portfolio" width="100%" />

<br />

# Aliyan Saleem
### Web Developer · UI/UX Designer · Flutter Developer

A dark-themed, animation-rich personal portfolio built to showcase full-stack web development, mobile app development, and creative design work.

[![Live Site](https://img.shields.io/badge/Live%20Site-96ff19?style=for-the-badge&logo=vercel&logoColor=black)](https://portfolio-xi-virid-59.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aliyan-saleem-02a596378/)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/creativestudi0.pk_)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/BuildsByAliyan)

</div>

<br />

## ✨ Overview

This portfolio is built with **React, TypeScript, Vite, Tailwind CSS,** and **Framer Motion** — designed around a bold black-and-lime-green visual identity, smooth scroll-driven animations, and an interactive 3D tech stack section powered by physics simulation.

<br />

## 🛠️ Tech Stack

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=flat-square&logo=framer&logoColor=blue)

</div>

| Tool | Purpose |
|---|---|
| **React 18 + TypeScript** | Component architecture & type safety |
| **Vite** | Lightning-fast build tool |
| **Tailwind CSS** | Utility-first responsive styling |
| **Framer Motion** | Scroll animations, transitions, text effects |
| **React Three Fiber + Rapier** | 3D physics-based tech stack visualization |
| **Lucide React** | Icon system |

<br />

## 📐 Sections

| # | Section | Description |
|---|---|---|
| 01 | **Welcome Screen** | Animated intro video on first load |
| 02 | **Hero** | Full-bleed video background, name, tagline, sound toggle |
| 03 | **About** | Bio, social links, animated CV download |
| 04 | **Tech Stack** | Interactive 3D physics balls representing skills |
| 05 | **Projects** | Sticky-stacking scroll cards for featured work |
| 06 | **Services** | UI/UX, development, AI integration, and support offerings |
| 07 | **Contact** | Email, WhatsApp, LinkedIn, and GitHub |

<br />

## 🚀 Run Locally

```bash
git clone https://github.com/BuildsByAliyan/portfolio.git
cd portfolio
npm install --legacy-peer-deps
npm run dev          # → http://localhost:5173
```

```bash
npm run build         # production build → /dist
npm run preview        # preview the production build locally
```

<br />

## ☁️ Deployment

This project auto-deploys to **Vercel** on every push to `main`.

```bash
git add .
git commit -m "your message"
git push
```

No environment variables required. Vercel handles install, build, and output automatically via `vercel.json`.

<br />

## 📁 Project Structure

```
portfolio/
├── public/                      # static assets — images, videos, CV
├── .github/
│   └── github-banner.jpg        # README banner image
└── src/
    ├── App.tsx                  # composes all sections
    ├── main.tsx                 # React entry point
    ├── index.css                # global styles
    └── components/
        ├── WelcomeScreen.tsx    # intro video screen
        ├── HeroSection.tsx      # navbar + hero video + name
        ├── AboutSection.tsx     # bio, socials, CV download
        ├── TextEffect.tsx       # word-by-word text reveal animation
        ├── TechStackSection.tsx # 3D physics skill balls
        ├── ProjectsSection.tsx  # sticky project cards
        ├── ServicesSection.tsx  # services list
        ├── ContactSection.tsx   # contact methods
        ├── FadeIn.tsx           # scroll-reveal wrapper
        └── Magnet.tsx           # magnetic hover effect
```

<br />

## 🌟 Featured Projects

| Project | Live Demo | Stack |
|---|---|---|
| **Trend In Law** | [View Live](https://buildsbyaliyan.github.io/trendinlaw-ecommerce/) | HTML, CSS, JavaScript |
| **Libaas Studio** | [View Live](https://buildsbyaliyan.github.io/libaas-studio/) | HTML, CSS, JavaScript |
| **Smart QR Hub** | [View Repo](https://github.com/BuildsByAliyan/Smart-QR-Generator) | React, QR Libraries |

<br />

## ⚙️ Customisation Guide

| Want to change | Edit this file |
|---|---|
| Name, nav links, hero text | `src/components/HeroSection.tsx` |
| Bio, CV link, social links | `src/components/AboutSection.tsx` |
| Services list | `src/components/ServicesSection.tsx` |
| Tech stack icons | `src/components/TechStackSection.tsx` |
| Projects & screenshots | `src/components/ProjectsSection.tsx` |
| Contact methods | `src/components/ContactSection.tsx` |
| Theme colours, fonts | `src/index.css`, `tailwind.config.js` |
| Page title, meta tags | `index.html` |

<br />

<div align="center">

### Designed & built by **Aliyan Saleem**

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aliyan-saleem-02a596378/)
[![Instagram](https://img.shields.io/badge/-Instagram-E4405F?style=flat-square&logo=instagram&logoColor=white)](https://www.instagram.com/creativestudi0.pk_)
[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/BuildsByAliyan)

<br />

<sub>© 2026 Aliyan Saleem. All rights reserved.</sub>

</div>
