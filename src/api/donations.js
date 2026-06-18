import api from './axios';

export const getDonations = () => api.get('/donations').then((res) => res.data);
export const createDonation = (data) => api.post('/donations', data).then((res) => res.data);
