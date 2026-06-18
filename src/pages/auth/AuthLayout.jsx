
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Feather } from 'lucide-react';

const AuthLayout = ({ title, subtitle, children }) => (
  <div className="flex min-h-screen">
    <div className="hidden flex-1 flex-col justify-between bg-wing-gradient p-12 lg:flex">
      <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold text-canvas">
        <Feather size={22} className="text-saffron-light" /> NayePankh
      </Link>
      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md font-display text-2xl font-medium text-canvas/90"
      >
        "Service is the rent we pay for living. NayePankh just makes the rent easier to track."
      </motion.blockquote>
      <p className="text-xs text-canvas/40">© {new Date().getFullYear()} NayePankh Volunteer Management System</p>
    </div>

    <div className="flex flex-1 items-center justify-center bg-canvas px-6 py-16 dark:bg-ink">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <h1 className="font-display text-2xl font-semibold text-ink dark:text-canvas">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink/60 dark:text-canvas/60">{subtitle}</p>}
        <div className="mt-8">{children}</div>
      </motion.div>
    </div>
  </div>
);

export default AuthLayout;
