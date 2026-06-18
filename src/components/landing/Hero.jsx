import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, HandHeart, Compass } from 'lucide-react';
import Globe3D from './Globe3D';
import ParticleField from './ParticleField';
import Button from '../ui/Button';

const Hero = () => (
  <section className="relative flex min-h-screen items-center overflow-hidden bg-wing-gradient pt-24">
    <div className="absolute inset-0 opacity-70">
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>
    </div>

    <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-saffron-light">Volunteer Management, reimagined</p>
        <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] text-canvas sm:text-6xl">
          Give every act of service <span className="text-saffron-light">new wings.</span>
        </h1>
        <p className="mt-6 max-w-md text-base text-canvas/70">
          NayePankh connects volunteers, campaigns, and donors on one platform - so the time people give finds the
          communities that need it most.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <Button as={Link} to="/register">
            Become Volunteer <ArrowRight size={16} />
          </Button>
          <Button as={Link} to="/donate" variant="outline">
            <HandHeart size={16} /> Donate Now
          </Button>
          <Button as="a" href="#programs" variant="outline">
            <Compass size={16} /> Explore Programs
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
        className="relative h-[380px] sm:h-[460px]"
      >
        <Suspense fallback={null}>
          <Globe3D />
        </Suspense>
      </motion.div>
    </div>

    <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-canvas dark:from-ink to-transparent" />
  </section>
);

export default Hero;