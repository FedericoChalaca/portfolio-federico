import React, { Suspense, lazy, useEffect, useState, useSyncExternalStore } from 'react';
import { laptopColors } from './laptopColors';

// three.js is ~1 MB: its own chunk, downloaded only when the 3D scene is really going to run
const InteractiveMonitor = lazy(() =>
  import('./InteractiveMonitor').then((m) => ({ default: m.InteractiveMonitor })),
);

const PHONE = '(max-width: 768px)';
const subscribePhone = (onChange: () => void) => {
  const query = window.matchMedia(PHONE);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};
const isPhoneNow = () => window.matchMedia(PHONE).matches;

/** If the 3D chunk fails to load (bad connection), drop the 3D instead of taking the whole page down. */
class Optional3D extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

interface HeroLaptopProps {
  near: boolean; // the hero column has been on screen
}

/**
 * Desktop: the live 3D laptop, as always.
 * Phones: a still of the same scene shows instantly, and the live 3D takes its place once the
 * visitor starts interacting, so three.js never competes with the first paint.
 */
export const HeroLaptop: React.FC<HeroLaptopProps> = ({ near }) => {
  const isPhone = useSyncExternalStore(subscribePhone, isPhoneNow);
  const [engaged, setEngaged] = useState(false); // the visitor touched, typed or scrolled
  const [live, setLive] = useState(false); // the 3D scene is drawn and ready to replace the still
  const [color, setColor] = useState(laptopColors[0].value);

  useEffect(() => {
    if (!isPhone || engaged) return;
    const engage = () => setEngaged(true);
    const events = ['pointerdown', 'keydown', 'scroll'] as const;
    events.forEach((name) => window.addEventListener(name, engage, { once: true, passive: true }));
    return () => events.forEach((name) => window.removeEventListener(name, engage));
  }, [isPhone, engaged]);

  const still = laptopColors.find((c) => c.value === color) ?? laptopColors[0];

  return (
    <>
      {!isPhone ? (
        near && (
          <Optional3D>
            <Suspense fallback={null}>
              <InteractiveMonitor />
            </Suspense>
          </Optional3D>
        )
      ) : (
        <div className="laptop-stage">
          <div className={`laptop-still ${live ? 'is-hidden' : ''}`}>
            <img src={`/laptop/${still.still}.webp`} alt="Laptop con código en la pantalla" width={780} height={700} />
            <div className="color-controls">
              {laptopColors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  className={`color-btn ${color === c.value ? 'active' : ''}`}
                  onClick={() => setColor(c.value)}
                  style={{ backgroundColor: c.value }}
                  aria-label={`Color ${c.name}`}
                  aria-pressed={color === c.value}
                />
              ))}
            </div>
          </div>
          {engaged && near && (
            <Optional3D>
              <Suspense fallback={null}>
                <div className={`laptop-live ${live ? 'is-ready' : ''}`}>
                  <InteractiveMonitor initialColor={color} onReady={() => setLive(true)} />
                </div>
              </Suspense>
            </Optional3D>
          )}
        </div>
      )}

      <style>{`
        .laptop-stage {
          position: relative;
          width: 100%;
          height: 350px;
          margin-top: -30px;
        }
        .laptop-still {
          position: absolute;
          inset: 0;
          transition: opacity 0.4s ease, visibility 0s linear 0.4s;
        }
        .laptop-still.is-hidden { opacity: 0; visibility: hidden; }
        .laptop-still img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }
        /* The live scene fades in over the still once its first frame is ready */
        .laptop-live {
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }
        .laptop-live.is-ready { opacity: 1; pointer-events: auto; }
        .laptop-live .interactive-3d-container { height: 100%; margin-top: 0; }

        .color-controls {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          padding: 8px 16px;
          background: var(--color-bg-card);
          backdrop-filter: blur(8px);
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
          z-index: 10;
        }
        .color-btn {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .color-btn.active {
          border-color: var(--color-text);
          transform: scale(1.2);
        }
        .color-btn:hover {
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
};
