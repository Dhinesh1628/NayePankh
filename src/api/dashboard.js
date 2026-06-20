
import api from './axios';

export const getVolunteerStats = () => api.get('/dashboard/volunteer').then((res) => res.data);
export const getAdminStats = () => api.get('/dashboard/admin').then((res) => res.data);
export const exportVolunteersApi = () => api.get('/dashboard/admin/reports/volunteers', { responseType: 'blob' }).then((res) => res.data);
export const exportDonationsApi = () => api.get('/dashboard/admin/reports/donations', { responseType: 'blob' }).then((res) => res.data);
