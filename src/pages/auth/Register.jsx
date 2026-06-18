import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthLayout from './AuthLayout';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', college: '', skills: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const user = await register(form);
      toast.success(`Welcome to NayePankh, ${user.name.split(' ')[0]}!`);
      navigate('/app/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Become a volunteer" subtitle="A few details and you're ready to start.">
      <form onSubmit={handleSubmit} className="space-y-3">
        {error && <p className="rounded-lg bg-coral/10 px-3 py-2 text-sm text-coral">{error}</p>}

        <input
          type="text" required placeholder="Full name" value={form.name} onChange={update('name')}
          className="w-full rounded-xl border border-mist bg-transparent px-4 py-3 text-sm text-ink focus:outline-none focus:ring-1 focus:ring-wing dark:border-white/10 dark:text-canvas"
        />
        <input
          type="email" required placeholder="Email" value={form.email} onChange={update('email')}
          className="w-full rounded-xl border border-mist bg-transparent px-4 py-3 text-sm text-ink focus:outline-none focus:ring-1 focus:ring-wing dark:border-white/10 dark:text-canvas"
        />
        <input
          type="password" required placeholder="Password (min. 6 characters)" value={form.password} onChange={update('password')}
          className="w-full rounded-xl border border-mist bg-transparent px-4 py-3 text-sm text-ink focus:outline-none focus:ring-1 focus:ring-wing dark:border-white/10 dark:text-canvas"
        />
        <input
          type="tel" placeholder="Phone" value={form.phone} onChange={update('phone')}
          className="w-full rounded-xl border border-mist bg-transparent px-4 py-3 text-sm text-ink focus:outline-none focus:ring-1 focus:ring-wing dark:border-white/10 dark:text-canvas"
        />
        <input
          type="text" placeholder="College / Organization" value={form.college} onChange={update('college')}
          className="w-full rounded-xl border border-mist bg-transparent px-4 py-3 text-sm text-ink focus:outline-none focus:ring-1 focus:ring-wing dark:border-white/10 dark:text-canvas"
        />
        <input
          type="text" placeholder="Skills (comma separated)" value={form.skills} onChange={update('skills')}
          className="w-full rounded-xl border border-mist bg-transparent px-4 py-3 text-sm text-ink focus:outline-none focus:ring-1 focus:ring-wing dark:border-white/10 dark:text-canvas"
        />

        <Button type="submit" className="w-full !mt-5" disabled={loading}>
          {loading ? 'Creating account...' : 'Create account'}
        </Button>
      </form>

      <p className="mt-6 text-sm text-ink/60 dark:text-canvas/60">
        Already volunteering?{' '}
        <Link to="/login" className="font-medium text-wing">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
