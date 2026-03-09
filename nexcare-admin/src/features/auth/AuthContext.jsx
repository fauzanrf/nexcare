import React, { createContext, useContext, useRef, useCallback } from 'react';
import api, { setAccessToken, clearAccessToken } from '../../lib/api';

const AuthContext = createContext(null);

const SESSION_TIMEOUT_MS = 60 * 60 * 1000; // 1 hour

export const AuthProvider = ({ children }) => {
  const [session, setSession] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const timeoutRef = useRef(null);

  const clearSessionTimeout = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const scheduleSessionTimeout = useCallback((logoutFn) => {
    clearSessionTimeout();
    timeoutRef.current = setTimeout(() => {
      logoutFn();
    }, SESSION_TIMEOUT_MS);
  }, [clearSessionTimeout]);

  const resetActivityTimer = useCallback(() => {
    if (session) {
      scheduleSessionTimeout(() => {
        setSession(null);
        clearAccessToken();
        window.location.href = '/login';
      });
    }
  }, [session, scheduleSessionTimeout]);

  // Attach activity listeners
  React.useEffect(() => {
    if (!session) return;
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach((e) => window.addEventListener(e, resetActivityTimer));
    scheduleSessionTimeout(() => {
      setSession(null);
      clearAccessToken();
      window.location.href = '/login';
    });
    return () => {
      events.forEach((e) => window.removeEventListener(e, resetActivityTimer));
      clearSessionTimeout();
    };
  }, [session, resetActivityTimer, scheduleSessionTimeout, clearSessionTimeout]);

  // On mount: try to refresh token (uses httpOnly cookie)
  React.useEffect(() => {
    const initSession = async () => {
      try {
        const { data } = await api.post('/auth/refresh');
        setAccessToken(data.accessToken);
        const { data: user } = await api.get('/auth/me');
        setSession(user);
      } catch {
        setSession(null);
      } finally {
        setIsLoading(false);
      }
    };
    initSession();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setAccessToken(data.accessToken);
      setSession(data.user);
      return { data: data.user, error: null };
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      return { data: null, error: { message: msg } };
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch { }
    clearAccessToken();
    clearSessionTimeout();
    setSession(null);
  };

  const refreshSession = async () => {
    try {
      const { data } = await api.get('/auth/me');
      setSession(data);
    } catch { }
  };

  return (
    <AuthContext.Provider value={{ session, isLoading, login, logout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
