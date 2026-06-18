
import api from './axios';

export const getVolunteerStats = () => api.get('/dashboard/volunteer').then((res) => res.data);
export const getAdminStats = () => api.get('/dashboard/admin').then((res) => res.data);
