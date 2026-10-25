import React, { Suspense, lazy, useCallback, useEffect, useState, useSyncExternalStore } from 'react';
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

type NetInfo = { saveData?: boolean; effectiveType?: string };
/** Data saver on, or a 2G/3G connection (only Chromium browsers report it) */
const isSlowNetwork = () => {
  const c = (navigator as Navigator & { connection?: NetInfo }).connection;
  return !!c && (!!c.saveData || /(^|-)2g$|^3g$/.test(c.effectiveType ?? ''));
};

/** Calls `run` when it unmounts: the still must come back if the 3D scene goes away (e.g. resizing to phone width). */
function OnUnmount({ run }: { run: () => void }) {
  useEffect(() => run, [run]);
  return null;
}

/** If the 3D chunk fails to load (bad connection), drop the 3D instead of taking the whole page down. */
class Optional3D extends React.Component<{ children: React.ReactNode; onFail?: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFail?.();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

interface HeroLaptopProps {
  near: boolean; // the hero column has been on screen
}

/**
 * A still of the 3D scene shows instantly and the live 3D laptop takes its place afterwards,
 * so three.js never competes with the first paint:
 * - desktop: right away, loading in the background while the still is on screen
 * - phones and slow connections: only when the visitor taps the laptop or its hint,
 *   so nobody spends 290 KB of data and a busy second on an ornament they did not ask for
 */
export const HeroLaptop: React.FC<HeroLaptopProps> = ({ near }) => {
  const isPhone = useSyncExternalStore(subscribePhone, isPhoneNow);
  const [slow] = useState(isSlowNetwork);
  const [engaged, setEngaged] = useState(false); // the visitor asked for the 3D
  const [live, setLive] = useState(false); // the 3D scene is drawn and ready to replace the still
  const [color, setColor] = useState(laptopColors[0].value);
  const hideLive = useCallback(() => setLive(false), []);
  const [failed, setFailed] = useState(false); // the 3D download failed (no signal): the still stays
  const onFail = useCallback(() => setFailed(true), []);

  // Desktop starts the 3D right away (measured: waiting for an idle moment made blocking worse)
  const askFirst = isPhone || slow;
  const start = !askFirst || engaged;

  const still = laptopColors.find((c) => c.value === color) ?? laptopColors[0];

  return (
    <>
      <div className="laptop-stage">
        <div className={`laptop-still ${live ? 'is-hidden' : ''}`}>
          <img
            src={`/laptop/${isPhone ? '' : 'desktop-'}${still.still}.webp`}
            alt="Portátil con código en la pantalla"
            width={isPhone ? 780 : 1026}
            height={isPhone ? 700 : 1125}
            onPointerDown={askFirst ? () => setEngaged(true) : undefined}
          />
          {askFirst && !live && (
            <button type="button" className="laptop-hint" onClick={() => setEngaged(true)} disabled={engaged} aria-live="polite">
              {failed ? 'Sin conexión: recarga para ver el 3D' : engaged ? 'Cargando 3D…' : 'Toca para moverlo en 3D'}
            </button>
          )}
          <div className="color-controls">
            {laptopColors.map((c) => (
              <button
                key={c.name}
                type="button"
                className={`color-btn ${color === c.value ? 'active' : ''}`}
                onClick={() => setColor(c.value)}
                style={{ backgroundColor: c.value }}
                aria-label={`Color ${c.name}`}
                title={c.name}
                aria-pressed={color === c.value}
              />
            ))}
          </div>
        </div>
        {start && near && (
          <Optional3D onFail={onFail}>
            <OnUnmount run={hideLive} />
            <Suspense fallback={null}>
              <div className={`laptop-live ${live ? 'is-ready' : ''}`}>
                <InteractiveMonitor initialColor={color} onReady={() => setLive(true)} />
              </div>
            </Suspense>
          </Optional3D>
        )}
      </div>

      <style>{`
        .laptop-stage {
          position: relative;
          width: 100%;
          height: 750px;
        }
        @media (max-width: 768px) {
          .laptop-stage { height: 350px; margin-top: -30px; }
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
          object-fit: cover;
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
        .color-btn { position: relative; }
        /* 24 px dots, 44 px finger area */
        @media (pointer: coarse) { .color-btn::after { content: ''; position: absolute; inset: -10px; } }
        .laptop-hint {
          position: absolute;
          bottom: 84px; /* in the empty band between the laptop's shadow and the color dots */
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          min-height: 36px;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
          background: var(--color-bg-card);
          color: var(--color-text-secondary);
          font: 500 0.8rem/1 'Inter', sans-serif;
          white-space: nowrap;
          cursor: pointer;
        }
        @media (pointer: coarse) { .laptop-hint { min-height: 44px; } }
      `}</style>
    </>
  );
};
