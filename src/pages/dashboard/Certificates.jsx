
import React, { useEffect, useState } from 'react';
import { Award, Download } from 'lucide-react';
import Skeleton from '../../components/ui/Skeleton';
import { getCertificates } from '../../api/certificates';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCertificates().then((res) => setCertificates(res.certificates)).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink dark:text-canvas">Certificates</h1>
      <p className="mt-1 text-sm text-ink/60 dark:text-canvas/60">Download proof of your completed volunteer work.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20" />)
        ) : certificates.length === 0 ? (
          <p className="text-sm text-ink/50 dark:text-canvas/50">No certificates yet - complete an event or campaign to earn one.</p>
        ) : (
          certificates.map((cert) => (
            <div key={cert._id} className="flex items-center justify-between rounded-2xl border border-mist bg-white/60 p-5 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-wing/10 text-wing">
                  <Award size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-ink dark:text-canvas">{cert.title}</p>
                  <p className="text-xs text-ink/50 dark:text-canvas/50">{new Date(cert.issueDate).toLocaleDateString()}</p>
                </div>
              </div>
              {cert.fileUrl ? (
                <a href={cert.fileUrl} target="_blank" rel="noreferrer" className="text-wing" aria-label="Download certificate">
                  <Download size={18} />
                </a>
              ) : (
                <span className="text-xs text-ink/40 dark:text-canvas/40">Pending file</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Certificates;
