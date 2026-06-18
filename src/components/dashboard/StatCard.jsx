
import React from 'react';
import { motion } from 'framer-motion';

const accentStyles = {
  wing: 'bg-wing/10 text-wing',
  saffron: 'bg-saffron/10 text-saffron',
  coral: 'bg-coral/10 text-coral',
};

const StatCard = ({ icon: Icon, label, value, accent = 'wing' }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="rounded-2xl border border-mist bg-white/60 p-5 dark:border-white/10 dark:bg-white/[0.03]"
  >
    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${accentStyles[accent] || accentStyles.wing}`}>
      <Icon size={18} />
    </div>
    <p className="mt-4 font-mono text-2xl font-semibold text-ink dark:text-canvas">{value}</p>
    <p className="mt-1 text-xs uppercase tracking-wide text-ink/50 dark:text-canvas/50">{label}</p>
  </motion.div>
);

export default StatCard;
