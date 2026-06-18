
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="relative flex h-8 w-14 items-center rounded-full bg-mist/70 px-1 transition-colors dark:bg-white/10"
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full bg-wing text-white shadow transition-transform duration-300 ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
      </span>
    </button>
  );
};

export default ThemeToggle;
