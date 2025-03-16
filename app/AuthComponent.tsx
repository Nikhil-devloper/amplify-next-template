'use client'
import { Authenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { fetchAuthSession, signOut as amplifySignOut, getCurrentUser } from "aws-amplify/auth";

// Create a context to share authentication state across components
import { createContext, useContext } from "react";

// Define the auth context type
export type AuthContextType = {
  user: any | null;
  isAuthenticated: boolean;
  signOut: () => void;
  showAuth: boolean;
  setShowAuth: (show: boolean) => void;
};

// Create the auth context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthComponent = ({ children }: { children: React.ReactNode }) => {
  const [showAuth, setShowAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already authenticated on component mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        // First try to get the current user
        const user = await getCurrentUser();
        // Then fetch the session to get tokens
        const { tokens } = await fetchAuthSession();
        if (tokens) {
          setCurrentUser(user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log("Not authenticated", error);
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
    };
    
    checkUser();
  }, []);

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await amplifySignOut();
      setCurrentUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user: currentUser, 
        isAuthenticated, 
        signOut: handleSignOut,
        showAuth,
        setShowAuth
      }}
    >
      {showAuth ? (
        <Authenticator>
          {({ signOut, user }) => {
            // Update our state when Authenticator signs in a user
            if (user && !isAuthenticated) {
              setCurrentUser(user);
              setIsAuthenticated(true);
              setShowAuth(false);
            }
            
            return (
              <div className="authenticated-container">
                {children}
              </div>
            );
          }}
        </Authenticator>
      ) : (
        <div className="authenticated-container">
          {children}
        </div>
      )}
    </AuthContext.Provider>
  );
};

export default AuthComponent;