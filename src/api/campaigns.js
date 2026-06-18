import api from './axios';

export const getCampaigns = () => api.get('/campaigns').then((res) => res.data);
export const getCampaign = (id) => api.get(`/campaigns/${id}`).then((res) => res.data);
export const createCampaign = (data) => api.post('/campaigns', data).then((res) => res.data);
export const updateCampaign = (id, data) => api.put(`/campaigns/${id}`, data).then((res) => res.data);
export const deleteCampaign = (id) => api.delete(`/campaigns/${id}`).then((res) => res.data);
export const joinCampaign = (id) => api.post(`/campaigns/${id}/join`).then((res) => res.data);
export const updateCampaignProgress = (id, progress) =>
  api.put(`/campaigns/${id}/progress`, { progress }).then((res) => res.data);
