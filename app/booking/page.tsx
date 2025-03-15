"use client";

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, Info, Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function BookingPage() {
  const searchParams = useSearchParams();
  const initialDate = searchParams.get('date') || new Date().toISOString().split('T')[0];
  
  const [currentDate, setCurrentDate] = useState(new Date(initialDate));
  const [selectedSlot, setSelectedSlot] = useState<{day: number, time: string} | null>(null);

  // Generate time slots for 24 hours
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    const amPm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
    return `${displayHour}:00 ${amPm}`;
  });
  
  // Add half-hour slots
  const allTimeSlots = timeSlots.flatMap(time => {
    const [hourMin, amPm] = time.split(' ');
    const hour = hourMin.split(':')[0];
    return [`${hour}:00 ${amPm}`, `${hour}:30 ${amPm}`];
  });

  // Function to format date as "DD MMM, YYYY"
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Function to get day of week (e.g., "Mon", "Tue")
  const getDayOfWeek = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Function to navigate to next/previous days
  const navigateDays = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (direction === 'next') {
        newDate.setDate(newDate.getDate() + 1);
      } else {
        newDate.setDate(newDate.getDate() - 1);
      }
      return newDate;
    });
    setSelectedSlot(null);
  };

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
    setSelectedSlot(null);
  };

  // Generate dates for display (current date and next day)
  const dates = [
    currentDate,
    new Date(new Date(currentDate).setDate(currentDate.getDate() + 1))
  ];

  // Mock data for slot availability
  // In a real app, this would come from an API
  const slotAvailability: Record<string, Record<string, { price: number, available: number }>> = {};
  
  // Generate mock data
  dates.forEach(date => {
    const dateStr = date.toISOString().split('T')[0];
    slotAvailability[dateStr] = {};
    
    allTimeSlots.forEach(time => {
      // Random availability (0 = booked, 1 = available)
      const available = Math.floor(Math.random() * 2);
      slotAvailability[dateStr][time] = {
        price: 900,
        available: available
      };
    });
  });

  const handleSlotSelect = (day: number, time: string) => {
    const dateStr = dates[day].toISOString().split('T')[0];
    if (slotAvailability[dateStr][time].available > 0) {
      setSelectedSlot({ day, time });
    }
  };

  const handleBooking = () => {
    if (!selectedSlot) return;
    
    const dateStr = dates[selectedSlot.day].toISOString().split('T')[0];
    const time = selectedSlot.time;
    
    // In a real app, you would send this to your backend
    alert(`Booking confirmed for ${dateStr} at ${time}`);
  };

  const parseTimeForSorting = (timeStr: string) => {
    const [time, amPm] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (amPm === 'PM' && hours !== 12) {
      hours += 12;
    } else if (amPm === 'AM' && hours === 12) {
      hours = 0;
    }
    
    return hours * 60 + minutes;
  };

  // Sort time slots
  const sortedTimeSlots = [...allTimeSlots].sort((a, b) => {
    return parseTimeForSorting(a) - parseTimeForSorting(b);
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-700 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Book a Slot</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-navy-800">Select Slots</h2>
            <button className="text-gray-400">
              <Info size={24} />
            </button>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
              <span className="text-gray-600">Booked</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 border border-gray-300 rounded mr-2"></div>
              <span className="text-gray-600">Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
              <span className="text-gray-600">Not Available</span>
            </div>
          </div>

          <div className="sticky top-0 bg-white z-10 pb-4">
            <div className="flex mb-6">
              <div className="flex-1 border rounded-l-lg p-4 flex items-center">
                <div className="text-center text-lg font-medium flex-1">
                  {formatDate(currentDate)}
                </div>
                <div className="ml-2">
                  <DatePicker
                    selected={currentDate}
                    onChange={(date: Date | null) => date && handleDateChange(date)}
                    customInput={<button className="flex items-center text-gray-600"><Calendar size={20} /></button>}
                    dateFormat="dd MMM, yyyy"
                  />
                </div>
              </div>
              <div className="flex">
                <button 
                  onClick={() => navigateDays('prev')} 
                  className="border-t border-b border-l px-4 md:px-6 flex items-center justify-center"
                  aria-label="Previous days"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={() => navigateDays('next')} 
                  className="border rounded-r-lg px-4 md:px-6 flex items-center justify-center"
                  aria-label="Next days"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2"></th>
                  {dates.map((date, index) => (
                    <th key={index} className="p-2 text-center">
                      <div className="text-2xl font-bold">{date.getDate()}</div>
                      <div className="text-gray-500">{getDayOfWeek(date)}</div>
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                {sortedTimeSlots.map((time) => {
                  const [hourMin, amPm] = time.split(' ');
                  const hour = parseInt(hourMin.split(':')[0]);
                  const isNightTime = (amPm === 'PM' && hour >= 6) || (amPm === 'AM' && hour < 6);
                  
                  return (
                    <tr key={time} className="border-t">
                      <td className="p-2 whitespace-nowrap text-center">
                        <div className="font-medium">{time}</div>
                        <div className="flex justify-center">
                          {isNightTime ? (
                            <div className="text-purple-700">🌙</div>
                          ) : (
                            <div className="text-amber-500">☀️</div>
                          )}
                        </div>
                      </td>
                      
                      {dates.map((date, dayIndex) => {
                        const dateStr = date.toISOString().split('T')[0];
                        const slot = slotAvailability[dateStr][time];
                        const isBooked = slot?.available === 0;
                        const isSelected = selectedSlot?.day === dayIndex && selectedSlot?.time === time;
                        
                        return (
                          <td 
                            key={`${dateStr}-${time}`} 
                            className={`p-1 rounded border border-solid border-black md:p-2 text-center ${isBooked ? 'bg-red-100' : 'bg-green-100'}`}
                            onClick={() => !isBooked && handleSlotSelect(dayIndex, time)}
                          >
                            {isBooked ? (
                              <div className="rounded">
                                <div className="text-red-500">Slot Booked</div>
                              </div>
                            ) : (
                              <div className={`p-2 md:p-4 rounded cursor-pointer ${isSelected ? 'bg-yellow-400' : ''}`}>
                                <div>₹ {slot?.price || 900}</div>
                                <div className="text-sm">Available</div>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {selectedSlot && (
          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border-t z-20">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <div className="text-gray-600">Total ₹ 900</div>
              </div>
              <button 
                onClick={handleBooking}
                className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Add padding at the bottom when a slot is selected to prevent the confirmation bar from covering content */}
      {selectedSlot && <div className="pb-20"></div>}

      <style jsx global>{`
        @media (max-width: 640px) {
          table {
            font-size: 0.875rem;
          }
        }
        
        .bg-navy-800 {
          background-color: #172b4d;
        }
        
        .text-navy-800 {
          color: #172b4d;
        }
        
        .react-datepicker-wrapper {
          display: inline-block;
        }
        
        .react-datepicker__input-container button {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 4px;
        }
        
        .react-datepicker__input-container button:hover {
          background-color: #f3f4f6;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
} 