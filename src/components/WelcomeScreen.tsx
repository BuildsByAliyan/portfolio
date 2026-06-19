import { useEffect, useRef, useState } from 'react';

const WelcomeScreen = ({ onDone }: { onDone: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [fading, setFading] = useState(false);
  // null = not yet determined. Prevents rendering the wrong <source>
  // before we know the real viewport width.
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (isMobile === null) return; // wait until we know which video to show

    const seen = sessionStorage.getItem('welcome_seen');
    if (seen) {
      onDone();
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    // Force the browser to (re)load with the now-correct <source>,
    // since changing isMobile after first paint doesn't auto-reload
    // an already-mounted <video> element.
    video.load();
    video.play().catch(() => {
      /* autoplay can be blocked until user interaction; ignore */
    });

    const finish = () => {
      setFading(true);
      setTimeout(() => {
        sessionStorage.setItem('welcome_seen', '1');
        onDone();
      }, 800);
    };

    const timer = setTimeout(finish, 10000);
    video.addEventListener('ended', finish);

    return () => {
      clearTimeout(timer);
      video.removeEventListener('ended', finish);
    };
  }, [isMobile, onDone]);

  const handleSkip = () => {
    setFading(true);
    setTimeout(() => {
      sessionStorage.setItem('welcome_seen', '1');
      onDone();
    }, 800);
  };

  // Don't render the video at all until we know which source to use —
  // avoids a flash of the wrong video and the stale-source bug.
  if (isMobile === null) {
    return <div className="fixed inset-0 z-[9999] bg-black" />;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.8s ease',
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      <video
        ref={videoRef}
        key={isMobile ? 'mobile' : 'desktop'}
        autoPlay
        muted
        playsInline
        preload="auto"
        src={isMobile ? '/wellcome-r.mp4' : '/wellcome-d.mp4'}
        className="h-full w-full object-cover"
        style={
          isMobile
            ? { maxWidth: '500px', maxHeight: '500px' }
            : {}
        }
      />

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-8 right-8 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs uppercase tracking-widest text-white/70 backdrop-blur-md transition-all duration-200 hover:bg-[#96ff19] hover:text-black hover:border-[#96ff19]"
      >
        Skip
      </button>
    </div>
  );
};

export default WelcomeScreen;