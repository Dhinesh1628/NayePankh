
import React from 'react';
import { motion } from 'framer-motion';
import Counter from './Counter';

const pillars = [
  { title: 'Mission', body: 'Make it effortless for anyone to find, join, and track meaningful volunteer work.' },
  { title: 'Vision', body: 'A network where every community has the hands it needs, exactly when it needs them.' },
  { title: 'Impact', body: 'Measured in hours given, campaigns completed, and lives reached - not just sign-ups.' },
];

const About = () => (
  <section id="about" className="bg-canvas px-6 py-24 dark:bg-ink">
    <div className="mx-auto max-w-6xl">
      <div className="grid gap-8 md:grid-cols-3">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <span className="font-mono text-xs uppercase tracking-widest text-wing">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-2 font-display text-2xl font-semibold text-ink dark:text-canvas">{p.title}</h3>
            <p className="mt-3 text-sm text-ink/60 dark:text-canvas/60">{p.body}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 rounded-3xl bg-wing-gradient px-8 py-14">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <Counter to={4280} label="Volunteers" />
          <Counter to={186} label="Campaigns" />
          <Counter to={920000} label="Donations" suffix="+" />
          <Counter to={52000} label="Beneficiaries" suffix="+" />
        </div>
      </div>
    </div>
  </section>
);

export default About;
