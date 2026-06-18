import api from './axios';

export const updateVolunteerApi = (id, data) => api.put(`/volunteers/${id}`, data).then((res) => res.data);
