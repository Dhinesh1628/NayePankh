
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, User, CalendarDays, Megaphone, Award, Bell, Settings, ShieldCheck, Sparkles,
} from 'lucide-react';

const volunteerLinks = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/profile', label: 'Profile', icon: User },
  { to: '/app/events', label: 'Events', icon: CalendarDays },
  { to: '/app/campaigns', label: 'Campaigns', icon: Megaphone },
  { to: '/app/certificates', label: 'Certificates', icon: Award },
  { to: '/app/notifications', label: 'Notifications', icon: Bell },
  { to: '/app/assistant', label: 'AI Assistant', icon: Sparkles },
  { to: '/app/settings', label: 'Settings', icon: Settings },
];

const Sidebar = ({ isAdmin }) => {
  const links = isAdmin ? [{ to: '/admin', label: 'Admin Overview', icon: ShieldCheck }, ...volunteerLinks] : volunteerLinks;

  return (
    <aside className="hidden h-screen w-64 flex-shrink-0 flex-col border-r border-mist bg-canvas px-4 py-8 dark:border-white/10 dark:bg-ink lg:flex">
      <nav className="flex flex-1 flex-col gap-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-wing/10 text-wing dark:bg-wing/20 dark:text-wing-light'
                  : 'text-ink/60 hover:bg-mist/60 dark:text-canvas/60 dark:hover:bg-white/5'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
