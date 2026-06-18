
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { updateVolunteerApi } from '../../api/profile';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    college: user?.college || '',
    skills: (user?.skills || []).join(', '),
    bio: user?.bio || '',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean) };
      const res = await updateVolunteerApi(user._id, payload);
      setUser(res.volunteer);
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold text-ink dark:text-canvas">Profile</h1>
      <p className="mt-1 text-sm text-ink/60 dark:text-canvas/60">Keep your details up to date so admins can match you to the right work.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-2xl border border-mist bg-white/60 p-6 dark:border-white/10 dark:bg-white/[0.03]">
        <div>
          <label className="text-sm font-medium text-ink dark:text-canvas">Full name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 w-full rounded-xl border border-mist bg-transparent px-4 py-3 text-sm text-ink focus:outline-none focus:ring-1 focus:ring-wing dark:border-white/10 dark:text-canvas" />
        </div>
        <div>
          <label className="text-sm font-medium text-ink dark:text-canvas">Email</label>
          <input value={user?.email} disabled
            className="mt-1 w-full rounded-xl border border-mist bg-mist/30 px-4 py-3 text-sm text-ink/50 dark:border-white/10 dark:bg-white/5 dark:text-canvas/50" />
        </div>
        <div>
          <label className="text-sm font-medium text-ink dark:text-canvas">Phone</label>
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="mt-1 w-full rounded-xl border border-mist bg-transparent px-4 py-3 text-sm text-ink focus:outline-none focus:ring-1 focus:ring-wing dark:border-white/10 dark:text-canvas" />
        </div>
        <div>
          <label className="text-sm font-medium text-ink dark:text-canvas">College / Organization</label>
          <input value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })}
            className="mt-1 w-full rounded-xl border border-mist bg-transparent px-4 py-3 text-sm text-ink focus:outline-none focus:ring-1 focus:ring-wing dark:border-white/10 dark:text-canvas" />
        </div>
        <div>
          <label className="text-sm font-medium text-ink dark:text-canvas">Skills</label>
          <input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })}
            placeholder="design, first-aid, teaching"
            className="mt-1 w-full rounded-xl border border-mist bg-transparent px-4 py-3 text-sm text-ink focus:outline-none focus:ring-1 focus:ring-wing dark:border-white/10 dark:text-canvas" />
        </div>
        <div>
          <label className="text-sm font-medium text-ink dark:text-canvas">Bio</label>
          <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3}
            className="mt-1 w-full rounded-xl border border-mist bg-transparent px-4 py-3 text-sm text-ink focus:outline-none focus:ring-1 focus:ring-wing dark:border-white/10 dark:text-canvas" />
        </div>

        <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save changes'}</Button>
      </form>
    </div>
  );
};

export default Profile;
