
import api from './axios';

export const registerApi = (data) => api.post('/auth/register', data).then((res) => res.data);
export const loginApi = (data) => api.post('/auth/login', data).then((res) => res.data);
export const getMeApi = () => api.get('/auth/me').then((res) => res.data);
