import React, { useEffect, useState } from 'react';

export const ReadingProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const currentProgress = Math.min(1, Math.max(0, scrollY / totalHeight));
            setProgress(currentProgress);
          } else {
            setProgress(0);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[3px] pointer-events-none bg-slate-900/10"
      role="progressbar"
      aria-label="Page reading progress"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-gradient-to-r from-teal-800 via-teal-600 to-teal-500 origin-left transition-transform duration-75 ease-out shadow-[0_0_8px_rgba(20,184,166,0.5)]"
        style={{
          transform: `scaleX(${progress})`,
        }}
      />
    </div>
  );
};
