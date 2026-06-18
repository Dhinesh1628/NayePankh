
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Skeleton from '../../components/ui/Skeleton';
import Button from '../../components/ui/Button';
import { getCampaigns, joinCampaign, updateCampaignProgress } from '../../api/campaigns';
import { useAuth } from '../../context/AuthContext';

const Campaigns = () => {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const load = () => getCampaigns().then((res) => setCampaigns(res.campaigns)).finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const myAssignment = (c) => c.assignedVolunteers?.find((v) => (v.volunteer?._id || v.volunteer) === user._id);

  const handleJoin = async (id) => {
    setBusyId(id);
    try {
      await joinCampaign(id);
      toast.success('Joined campaign');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not join campaign');
    } finally {
      setBusyId(null);
    }
  };

  const handleProgress = async (id, value) => {
    try {
      await updateCampaignProgress(id, value);
      load();
    } catch (err) {
      toast.error('Could not update progress');
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink dark:text-canvas">Campaigns</h1>
      <p className="mt-1 text-sm text-ink/60 dark:text-canvas/60">Join a campaign and track your contribution over time.</p>

      <div className="mt-8 space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28" />)
        ) : campaigns.length === 0 ? (
          <p className="text-sm text-ink/50 dark:text-canvas/50">No campaigns running right now.</p>
        ) : (
          campaigns.map((c) => {
            const assignment = myAssignment(c);
            return (
              <div key={c._id} className="rounded-2xl border border-mist bg-white/60 p-5 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink dark:text-canvas">{c.title}</h3>
                    <p className="mt-1 text-sm text-ink/60 dark:text-canvas/60">{c.description}</p>
                  </div>
                  {!assignment && (
                    <Button onClick={() => handleJoin(c._id)} disabled={busyId === c._id} className="!px-4 !py-2 text-xs">
                      {busyId === c._id ? 'Joining...' : 'Join'}
                    </Button>
                  )}
                </div>

                {assignment && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-ink/50 dark:text-canvas/50">
                      <span>Your progress</span>
                      <span>{assignment.progress}%</span>
                    </div>
                    <input
                      type="range" min="0" max="100" value={assignment.progress}
                      onChange={(e) => handleProgress(c._id, Number(e.target.value))}
                      className="mt-2 w-full accent-wing"
                    />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Campaigns;
