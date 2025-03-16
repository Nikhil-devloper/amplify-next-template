'use client'
import { useAuth } from "../AuthComponent";

const SignOutButton = () => {
  const { isAuthenticated, signOut } = useAuth();

  if (!isAuthenticated) {
    return null; // Don't render the button if user is not authenticated
  }

  return (
    <button 
      onClick={signOut}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton; 