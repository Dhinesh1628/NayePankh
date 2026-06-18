
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, HeartPulse, Leaf, Users } from 'lucide-react';

const programs = [
  { icon: GraduationCap, title: 'Education Support', body: 'Tutoring, school supplies, and digital literacy drives for underserved students.' },
  { icon: HeartPulse, title: 'Health Awareness', body: 'Community health camps, nutrition drives, and preventive-care workshops.' },
  { icon: Leaf, title: 'Environment Campaigns', body: 'Tree plantation, river clean-ups, and waste segregation programs.' },
  { icon: Users, title: 'Women Empowerment', body: 'Skill-building workshops and micro-enterprise mentoring for women.' },
];

const Programs = () => (
  <section id="programs" className="bg-mist/30 px-6 py-24 dark:bg-white/[0.02]">
    <div className="mx-auto max-w-6xl">
      <div className="max-w-xl">
        <p className="font-mono text-xs uppercase tracking-widest text-wing">Where volunteers go</p>
        <h2 className="mt-3 font-display text-4xl font-semibold text-ink dark:text-canvas">Four programs, one purpose</h2>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {programs.map(({ icon: Icon, title, body }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="rounded-2xl border border-mist bg-canvas p-6 shadow-sm transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-ink/60"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-wing/10 text-wing">
              <Icon size={20} />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold text-ink dark:text-canvas">{title}</h3>
            <p className="mt-2 text-sm text-ink/60 dark:text-canvas/60">{body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Programs;
