
import api from './axios';

export const getCertificates = () => api.get('/certificates').then((res) => res.data);
