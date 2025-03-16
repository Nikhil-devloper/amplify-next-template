'use client'
import { useAuth } from "../AuthComponent";

const BookingButton = () => {
  const { isAuthenticated, setShowAuth } = useAuth();

  const handleBooking = () => {
    if (!isAuthenticated) {
      // If user is not authenticated, show the auth screen
      setShowAuth(true);
    } else {
      // User is authenticated, proceed with booking
      // You can navigate to booking form or show a modal here
      console.log("User is authenticated, proceed with booking");
      // Example: router.push('/booking-form')
    }
  };
  if(isAuthenticated) {
    return <div> User is Authenticated </div>
  }
  return (
    <button 
      onClick={handleBooking}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
    >
      Book a Slot
    </button>
  );
};

export default BookingButton; 