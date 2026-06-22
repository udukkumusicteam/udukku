import React from 'react';
import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import VisionMission from '../components/VisionMission';
import TutorsSlider from '../components/TutorsSlider';
import Testimonials from '../components/Testimonials';
import Gallery from '../components/Gallery';
import BottomCTA from '../components/BottomCTA';

export default function Home() {
  return (
    <main data-testid="home-page" className="page-fade-in">
      <Hero />
      <StatsSection />
      <VisionMission />
      <TutorsSlider />
      <Testimonials />
      <Gallery />
      <BottomCTA />
    </main>
  );
}
