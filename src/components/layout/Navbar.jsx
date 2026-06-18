import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Feather } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const links = [
  { to: '/#about', label: 'About' },
  { to: '/#programs', label: 'Programs' },
  { to: '/#impact', label: 'Impact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav className="glass-light dark:glass mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full px-6 py-3 lg:mx-auto lg:mt-6">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold text-ink dark:text-canvas">
          <Feather size={20} className="text-wing" />
          NayePankh
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.label} href={l.to} className="text-sm font-medium text-ink/70 hover:text-wing dark:text-canvas/70 dark:hover:text-wing-light">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {user ? (
            <Button as={Link} to={user.role === 'admin' ? '/admin' : '/app/dashboard'} className="!px-5 !py-2">
              Dashboard
            </Button>
          ) : (
            <>
              <Button as={Link} to="/login" variant="ghost" className="!px-4 !py-2">
                Log in
              </Button>
              <Button as={Link} to="/register" className="!px-5 !py-2">
                Become Volunteer
              </Button>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="text-ink dark:text-canvas" /> : <Menu className="text-ink dark:text-canvas" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-light dark:glass mx-4 mt-2 flex flex-col gap-4 rounded-2xl p-6 md:hidden"
          >
            {links.map((l) => (
              <a key={l.label} href={l.to} onClick={() => setOpen(false)} className="text-ink dark:text-canvas">
                {l.label}
              </a>
            ))}
            <div className="flex items-center justify-between pt-2">
              <ThemeToggle />
              <Button as={Link} to="/register" className="!px-5 !py-2" onClick={() => setOpen(false)}>
                Become Volunteer
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
