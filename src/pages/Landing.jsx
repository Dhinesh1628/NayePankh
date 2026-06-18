
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/landing/Hero';
import About from '../components/landing/About';
import Programs from '../components/landing/Programs';
import Testimonials from '../components/landing/Testimonials';
import ImpactStats from '../components/landing/ImpactStats';
import Footer from '../components/layout/Footer';

const Landing = () => (
  <div>
    <Navbar />
    <Hero />
    <About />
    <Programs />
    <ImpactStats />
    <Testimonials />
    <Footer />
  </div>
);

export default Landing;
