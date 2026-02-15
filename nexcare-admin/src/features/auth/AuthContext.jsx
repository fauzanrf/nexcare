import React, { createContext, useContext } from 'react';
import { authClient } from '../../lib/auth-client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const initSession = async () => {
      // Simulate checking session on mount
      // accessible via authClient or direct localStorage check. 
      // Using direct check for consistency with how we will update it.
      await new Promise(resolve => setTimeout(resolve, 300));
      const storedSession = localStorage.getItem("nexcare_session");
      if (storedSession) {
        try {
            const parsedSession = JSON.parse(storedSession);
            // Ensure position exists for legacy/mock sessions
            if (!parsedSession.position) {
                parsedSession.position = "NOC2"; // Default fallback
            }
            setSession(parsedSession);
        } catch (e) {
            console.error("Failed to parse session", e);
        }
      }
      setIsLoading(false);
    };
    initSession();
  }, []);

  const login = async (email, password) => {
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock Logic for Positions
    let position = "NOC2";
    if (email.includes("noc1")) position = "NOC1";
    if (email.includes("tech")) position = "Technical Support";

    const mockUser = {
      id: "USR-" + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email: email,
      position: position
    };

    setSession(mockUser);
    localStorage.setItem("nexcare_session", JSON.stringify(mockUser));
    
    return { data: mockUser, error: null };
  };

  const logout = async () => {
    await authClient.signOut();
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
