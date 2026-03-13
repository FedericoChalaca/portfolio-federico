import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Suppress known Three.js deprecation warnings from @react-three/fiber internals
const originalWarn = console.warn;
console.warn = (...args) => {
    if (args[0] && typeof args[0] === 'string' && args[0].includes('THREE.Clock: This module has been deprecated')) {
        return;
    }
    originalWarn(...args);
};

createRoot(document.getElementById('root')!).render(<App />)
