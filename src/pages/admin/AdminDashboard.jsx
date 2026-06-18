
import React, { useEffect, useState } from 'react';
import { Users, CalendarDays, Megaphone, HandCoins } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../../components/dashboard/StatCard';
import Skeleton from '../../components/ui/Skeleton';
import { getAdminStats } from '../../api/dashboard';

const growth = [
  { month: 'Jan', volunteers: 120 }, { month: 'Feb', volunteers: 180 }, { month: 'Mar', volunteers: 260 },
  { month: 'Apr', volunteers: 340 }, { month: 'May', volunteers: 410 }, { month: 'Jun', volunteers: 520 },
];

const donationTrend = [
  { month: 'Jan', amount: 42000 }, { month: 'Feb', amount: 58000 }, { month: 'Mar', amount: 71000 },
  { month: 'Apr', amount: 65000 }, { month: 'May', amount: 88000 }, { month: 'Jun', amount: 96000 },
];

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats()
      .then(setData)
      .catch(() => setData({ stats: {}, recentVolunteers: [], recentDonations: [] }))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink dark:text-canvas">Admin overview</h1>
      <p className="mt-1 text-sm text-ink/60 dark:text-canvas/60">Organization-wide volunteer and donation analytics.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32" />)
        ) : (
          <>
            <StatCard icon={Users} label="Total Volunteers" value={data.stats.totalVolunteers ?? 0} accent="wing" />
            <StatCard icon={CalendarDays} label="Total Events" value={data.stats.totalEvents ?? 0} accent="saffron" />
            <StatCard icon={Megaphone} label="Active Campaigns" value={data.stats.activeCampaigns ?? 0} accent="wing" />
            <StatCard icon={HandCoins} label="Donations" value={`₹${(data.stats.totalDonations ?? 0).toLocaleString()}`} accent="coral" />
          </>
        )}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-mist bg-white/60 p-6 dark:border-white/10 dark:bg-white/[0.03]">
          <h3 className="font-display text-base font-semibold text-ink dark:text-canvas">Monthly volunteer growth</h3>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growth}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="volunteers" stroke="#1F7A6C" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-mist bg-white/60 p-6 dark:border-white/10 dark:bg-white/[0.03]">
          <h3 className="font-display text-base font-semibold text-ink dark:text-canvas">Donation trends</h3>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={donationTrend}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="amount" fill="#E98C2B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-mist bg-white/60 p-6 dark:border-white/10 dark:bg-white/[0.03]">
          <h3 className="font-display text-base font-semibold text-ink dark:text-canvas">Recent volunteers</h3>
          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-ink/40 dark:text-canvas/40">
                <th className="pb-2">Name</th><th className="pb-2">Email</th><th className="pb-2">Joined</th>
              </tr>
            </thead>
            <tbody>
              {(data?.recentVolunteers || []).map((v) => (
                <tr key={v._id} className="border-t border-mist/60 dark:border-white/10">
                  <td className="py-2 text-ink dark:text-canvas">{v.name}</td>
                  <td className="py-2 text-ink/60 dark:text-canvas/60">{v.email}</td>
                  <td className="py-2 text-ink/40 dark:text-canvas/40">{new Date(v.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl border border-mist bg-white/60 p-6 dark:border-white/10 dark:bg-white/[0.03]">
          <h3 className="font-display text-base font-semibold text-ink dark:text-canvas">Recent donations</h3>
          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-ink/40 dark:text-canvas/40">
                <th className="pb-2">Donor</th><th className="pb-2">Amount</th><th className="pb-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {(data?.recentDonations || []).map((d) => (
                <tr key={d._id} className="border-t border-mist/60 dark:border-white/10">
                  <td className="py-2 text-ink dark:text-canvas">{d.donorName}</td>
                  <td className="py-2 text-ink/60 dark:text-canvas/60">₹{d.amount}</td>
                  <td className="py-2 text-ink/40 dark:text-canvas/40">{new Date(d.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
