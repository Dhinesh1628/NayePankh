
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../../components/layout/ThemeToggle';
import Button from '../../components/ui/Button';

const Settings = () => {
  const { theme } = useTheme();
  const { logout } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleLogoutEverywhere = () => {
    toast.success('Logged out of this device');
    logout();
  };

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl font-semibold text-ink dark:text-canvas">Settings</h1>
      <p className="mt-1 text-sm text-ink/60 dark:text-canvas/60">Manage how NayePankh looks and behaves for you.</p>

      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between rounded-2xl border border-mist bg-white/60 p-5 dark:border-white/10 dark:bg-white/[0.03]">
          <div>
            <p className="text-sm font-medium text-ink dark:text-canvas">Appearance</p>
            <p className="text-xs text-ink/50 dark:text-canvas/50">Currently using {theme} mode</p>
          </div>
          <ThemeToggle />
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-mist bg-white/60 p-5 dark:border-white/10 dark:bg-white/[0.03]">
          <div>
            <p className="text-sm font-medium text-ink dark:text-canvas">Sign out</p>
            <p className="text-xs text-ink/50 dark:text-canvas/50">End your session on this device</p>
          </div>
          {confirmOpen ? (
            <div className="flex gap-2">
              <Button onClick={handleLogoutEverywhere} variant="dark" className="!px-4 !py-2 text-xs">Confirm</Button>
              <button onClick={() => setConfirmOpen(false)} className="text-xs text-ink/50 dark:text-canvas/50">Cancel</button>
            </div>
          ) : (
            <Button onClick={() => setConfirmOpen(true)} variant="ghost" className="!px-4 !py-2 text-xs">Log out</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
