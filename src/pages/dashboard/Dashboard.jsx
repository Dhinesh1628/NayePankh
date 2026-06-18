
import React, { useEffect, useState } from 'react';
import { CalendarCheck, Clock, Award, HandCoins } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../../components/dashboard/StatCard';
import Skeleton from '../../components/ui/Skeleton';
import { getVolunteerStats } from '../../api/dashboard';
import { useAuth } from '../../context/AuthContext';

const participation = [
  { month: 'Jan', hours: 4 }, { month: 'Feb', hours: 7 }, { month: 'Mar', hours: 6 },
  { month: 'Apr', hours: 9 }, { month: 'May', hours: 8 }, { month: 'Jun', hours: 12 },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVolunteerStats()
      .then((res) => setData(res))
      .catch(() => setData({ stats: { eventsJoined: 0, certificatesEarned: 0, donationsMade: 0, volunteerHours: 0 }, recentActivity: [] }))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink dark:text-canvas">
        Welcome back, {user?.name?.split(' ')[0]}
      </h1>
      <p className="mt-1 text-sm text-ink/60 dark:text-canvas/60">Here's where your volunteering stands today.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32" />)
        ) : (
          <>
            <StatCard icon={CalendarCheck} label="Events Joined" value={data.stats.eventsJoined} accent="wing" />
            <StatCard icon={Clock} label="Volunteer Hours" value={data.stats.volunteerHours} accent="saffron" />
            <StatCard icon={Award} label="Certificates Earned" value={data.stats.certificatesEarned} accent="wing" />
            <StatCard icon={HandCoins} label="Donations Made" value={data.stats.donationsMade} accent="coral" />
          </>
        )}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-mist bg-white/60 p-6 lg:col-span-2 dark:border-white/10 dark:bg-white/[0.03]">
          <h3 className="font-display text-base font-semibold text-ink dark:text-canvas">Monthly participation</h3>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={participation}>
                <defs>
                  <linearGradient id="partFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1F7A6C" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#1F7A6C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="hours" stroke="#1F7A6C" fill="url(#partFill)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-mist bg-white/60 p-6 dark:border-white/10 dark:bg-white/[0.03]">
          <h3 className="font-display text-base font-semibold text-ink dark:text-canvas">Recent activity</h3>
          <ul className="mt-4 space-y-3">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-10" />)
            ) : data.recentActivity.length ? (
              data.recentActivity.map((a) => (
                <li key={a._id} className="flex items-center justify-between text-sm">
                  <span className="capitalize text-ink/70 dark:text-canvas/70">{a.type}</span>
                  <span className="text-xs capitalize text-ink/40 dark:text-canvas/40">{a.status}</span>
                </li>
              ))
            ) : (
              <p className="text-sm text-ink/50 dark:text-canvas/50">No activity yet - join an event or campaign to get started.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
