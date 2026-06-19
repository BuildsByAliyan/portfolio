import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import TechStackSection from './components/TechStackSection';
import ContactSection from './components/ContactSection';

const App = () => {
  const alreadySeen = !!sessionStorage.getItem('welcome_seen');
  const [showWelcome, setShowWelcome] = useState(!alreadySeen);

  return (
    <>
      {showWelcome && (
        <WelcomeScreen onDone={() => setShowWelcome(false)} />
      )}

      <main
        className="relative w-full"
        style={{ overflowX: 'clip', background: '#0C0C0C' }}
      >
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
};

export default App;