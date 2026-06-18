
import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-saffron text-ink hover:bg-saffron-light shadow-lg shadow-saffron/20',
  outline: 'border border-white/40 text-white hover:bg-white/10',
  ghost: 'text-wing hover:bg-wing/10',
  dark: 'bg-ink text-canvas hover:bg-ink/90',
};

const Button = ({ children, variant = 'primary', className = '', as: Tag = 'button', ...props }) => {
  const MotionTag = typeof Tag === 'string' ? (motion[Tag] || motion.button) : motion(Tag);
  return (
    <MotionTag
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-sm tracking-wide transition-colors duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </MotionTag>
  );
};

export default Button;
