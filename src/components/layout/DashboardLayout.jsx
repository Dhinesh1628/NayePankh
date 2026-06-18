import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Feather, LogOut } from 'lucide-react';
import Sidebar from './Sidebar';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = () => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <div className="flex min-h-screen bg-canvas dark:bg-ink">
      <Sidebar isAdmin={isAdmin} />
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-mist px-6 py-4 dark:border-white/10">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold text-ink dark:text-canvas">
            <Feather size={18} className="text-wing" />
            NayePankh
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-ink dark:text-canvas">{user?.name}</p>
              <p className="text-xs capitalize text-ink/50 dark:text-canvas/50">{user?.role}</p>
            </div>
            <button
              onClick={logout}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-mist/60 text-ink/70 hover:bg-coral/10 hover:text-coral dark:bg-white/5 dark:text-canvas/70"
              aria-label="Log out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
