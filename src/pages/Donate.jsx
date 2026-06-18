
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import { createDonation } from '../api/donations';
import { useAuth } from '../context/AuthContext';

const presetAmounts = [500, 1000, 2500, 5000];

const Donate = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState(1000);
  const [form, setForm] = useState({ donorName: user?.name || '', donorEmail: user?.email || '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createDonation({ ...form, amount });
      toast.success('Thank you - your donation was recorded!');
      setForm({ donorName: '', donorEmail: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not process donation, please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas dark:bg-ink">
      <Navbar />
      <section className="mx-auto max-w-xl px-6 py-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="font-mono text-xs uppercase tracking-widest text-wing">Support the mission</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-ink dark:text-canvas">Make a donation</h1>
          <p className="mt-2 text-sm text-ink/60 dark:text-canvas/60">
            Every rupee funds an active campaign - education kits, health camps, plantation drives, and more.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-2xl border border-mist bg-white/60 p-6 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="grid grid-cols-4 gap-2">
              {presetAmounts.map((a) => (
                <button
                  type="button"
                  key={a}
                  onClick={() => setAmount(a)}
                  className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                    amount === a ? 'border-wing bg-wing/10 text-wing' : 'border-mist text-ink/60 dark:border-white/10 dark:text-canvas/60'
                  }`}
                >
                  ₹{a}
                </button>
              ))}
            </div>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full rounded-xl border border-mist bg-transparent px-4 py-3 text-sm text-ink focus:outline-none focus:ring-1 focus:ring-wing dark:border-white/10 dark:text-canvas"
              required
            />
            <input
              type="text"
              placeholder="Your name"
              value={form.donorName}
              onChange={(e) => setForm({ ...form, donorName: e.target.value })}
              className="w-full rounded-xl border border-mist bg-transparent px-4 py-3 text-sm text-ink focus:outline-none focus:ring-1 focus:ring-wing dark:border-white/10 dark:text-canvas"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.donorEmail}
              onChange={(e) => setForm({ ...form, donorEmail: e.target.value })}
              className="w-full rounded-xl border border-mist bg-transparent px-4 py-3 text-sm text-ink focus:outline-none focus:ring-1 focus:ring-wing dark:border-white/10 dark:text-canvas"
              required
            />
            <textarea
              placeholder="Message (optional)"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-xl border border-mist bg-transparent px-4 py-3 text-sm text-ink focus:outline-none focus:ring-1 focus:ring-wing dark:border-white/10 dark:text-canvas"
              rows={3}
            />
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? 'Processing...' : `Donate ₹${amount}`}
            </Button>
          </form>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
};

export default Donate;
