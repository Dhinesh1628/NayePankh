
import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', light = false, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className={`rounded-2xl p-6 ${light ? 'glass-light' : 'glass'} shadow-glass ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

export default GlassCard;
