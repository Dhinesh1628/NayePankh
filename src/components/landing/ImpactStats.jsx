import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const monthly = [
  { month: 'Jan', hours: 320 }, { month: 'Feb', hours: 410 }, { month: 'Mar', hours: 500 },
  { month: 'Apr', hours: 460 }, { month: 'May', hours: 610 }, { month: 'Jun', hours: 700 },
];

const byProgram = [
  { name: 'Education', volunteers: 1240 }, { name: 'Health', volunteers: 980 },
  { name: 'Environment', volunteers: 860 }, { name: 'Women Empw.', volunteers: 740 },
];

const ImpactStats = () => (
  <section id="impact" className="bg-mist/30 px-6 py-24 dark:bg-white/[0.02]">
    <div className="mx-auto max-w-6xl">
      <p className="font-mono text-xs uppercase tracking-widest text-wing">By the numbers</p>
      <h2 className="mt-3 font-display text-4xl font-semibold text-ink dark:text-canvas">Impact statistics</h2>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-mist bg-canvas p-6 dark:border-white/10 dark:bg-ink/60">
          <h3 className="font-display text-lg font-semibold text-ink dark:text-canvas">Volunteer hours, monthly</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthly}>
                <defs>
                  <linearGradient id="hoursFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1F7A6C" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#1F7A6C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="hours" stroke="#1F7A6C" fill="url(#hoursFill)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-mist bg-canvas p-6 dark:border-white/10 dark:bg-ink/60">
          <h3 className="font-display text-lg font-semibold text-ink dark:text-canvas">Volunteers by program</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byProgram}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="volunteers" fill="#E98C2B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ImpactStats;
