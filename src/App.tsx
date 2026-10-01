import './index.css';
import './App.css';
import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Technologies } from './sections/Technologies';
import { Contact } from './sections/Contact';
import { CustomCursor } from './components/ui/CustomCursor';
import { WhatsAppFab } from './components/WhatsAppFab';
import { useTheme } from './hooks/useTheme';

/**
 * App - Root composition component.
 * Dependency Inversion: sections depend on the data abstraction (data/portfolio.ts).
 * Theme state provided via the useTheme hook and passed down as props.
 */
function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    // reducedMotion="user": every framer animation honors the OS setting
    <MotionConfig reducedMotion="user">
    <div className="app">
      <CustomCursor />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Technologies />
        <Contact />
      </main>
      <ScrollToTop />
      <WhatsAppFab />
    </div>
    </MotionConfig>
  );
}

export default App;
