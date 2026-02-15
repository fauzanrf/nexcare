import { useState, useEffect } from 'react';
import { db } from './db';

// Mocking better-auth client behavior
export const authClient = {
  signIn: async ({ email, password }) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (email === "admin@nexcare.com" && password === "password") {
      localStorage.setItem("nexcare_session", "true");
      return { data: db.user, error: null };
    }
    return { data: null, error: { message: "Invalid credentials" } };
  },
  
  signOut: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    localStorage.removeItem("nexcare_session");
    window.location.reload(); 
    return { success: true };
  },
  
  useSession: () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkSession = async () => {
        // Simulate checking session
        await new Promise(resolve => setTimeout(resolve, 300));
        const hasSession = localStorage.getItem("nexcare_session");
        if (hasSession) {
          setSession({ user: db.user });
        } else {
          setSession(null);
        }
        setLoading(false);
      };
      
      checkSession();
    }, []);

    return { data: session, isPending: loading };
  }
};
