import { whatsappUrl } from '../sections/Contact';

export const WhatsAppFab = () => (
  <>
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbeme por WhatsApp"
      className="wa-fab"
    >
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" fill="#fff">
        <path d="M16.003 3C9.374 3 4 8.373 4 15c0 2.364.69 4.566 1.878 6.42L4 29l7.77-1.84A11.94 11.94 0 0 0 16.003 27C22.63 27 28 21.627 28 15S22.63 3 16.003 3zm0 21.6a9.6 9.6 0 0 1-4.892-1.338l-.35-.207-4.613 1.093 1.112-4.49-.228-.364A9.6 9.6 0 1 1 16.003 24.6zm5.49-7.19c-.3-.15-1.775-.876-2.05-.976-.275-.1-.475-.15-.675.15s-.775.976-.95 1.176c-.175.2-.35.225-.65.075-.3-.15-1.268-.467-2.415-1.49-.893-.796-1.495-1.779-1.67-2.079-.175-.3-.019-.462.131-.611.134-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.628-.925-2.228-.244-.586-.49-.506-.675-.515l-.575-.01c-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.112 3.225 5.117 4.523.715.308 1.272.492 1.707.63.717.228 1.37.196 1.887.119.576-.086 1.775-.726 2.025-1.426.25-.7.25-1.3.175-1.426-.075-.125-.275-.2-.575-.35z" />
      </svg>
    </a>
    <style>{`
      .wa-fab {
        position: fixed;
        right: 24px;
        bottom: 24px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: #25D366;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 6px 20px rgba(0,0,0,.22);
        transition: transform .2s ease, box-shadow .2s ease;
        z-index: 9998;
      }
      .wa-fab:hover { transform: scale(1.08); box-shadow: 0 10px 24px rgba(0,0,0,.3); }
      /* ScrollToTop sits at bottom:32px/right:32px — stack the FAB above it on mobile */
      @media (max-width: 768px) {
        .wa-fab { right: 20px; bottom: 96px; width: 52px; height: 52px; }
      }
    `}</style>
  </>
);
