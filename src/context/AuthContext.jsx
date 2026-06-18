import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginApi, registerApi, getMeApi } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('np_token') || sessionStorage.getItem('np_token');
    if (!token) {
      setLoading(false);
      return;
    }
    getMeApi()
      .then((res) => setUser(res.user))
      .catch(() => {
        localStorage.removeItem('np_token');
        sessionStorage.removeItem('np_token');
      })
      .finally(() => setLoading(false));
  }, []);

  const persistSession = (token, userData, rememberMe) => {
    const store = rememberMe ? localStorage : sessionStorage;
    store.setItem('np_token', token);
    store.setItem('np_user', JSON.stringify(userData));
    setUser(userData);
  };

  const login = async (email, password, rememberMe = true) => {
    const res = await loginApi({ email, password });
    persistSession(res.token, res.user, rememberMe);
    return res.user;
  };

  const register = async (formData) => {
    const res = await registerApi(formData);
    persistSession(res.token, res.user, true);
    return res.user;
  };

  const logout = () => {
    localStorage.removeItem('np_token');
    localStorage.removeItem('np_user');
    sessionStorage.removeItem('np_token');
    sessionStorage.removeItem('np_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
