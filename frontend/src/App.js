import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Toaster } from 'sonner';
import '@/App.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Booking from '@/pages/Booking';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Learn from '@/pages/Learn';
import Admin from '@/pages/Admin';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/about" element={<About />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
        <Toaster
          position="bottom-right"
          theme="light"
          richColors
          toastOptions={{
            style: {
              fontFamily: 'Hanken Grotesk, sans-serif',
            },
          }}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
