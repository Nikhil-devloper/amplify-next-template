"use client";

import React, { useState } from 'react';
import { useAuth } from "../AuthComponent";
import { usePathname } from 'next/navigation';

interface NavigationProps {
  // Add any props that might be needed in the future
  isFixed?: boolean; // Optional prop to control whether the navigation is fixed
}

const Navigation: React.FC<NavigationProps> = ({ isFixed = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { signOut, isAuthenticated, setShowAuth } = useAuth();
  const pathname = usePathname();
  
  // Determine if we're on the home page
  const isHomePage = pathname === '/';
  
  // Apply sticky positioning only on home page if isFixed is true
  const navClassName = `bg-green-600 text-white shadow-lg z-10 ${isFixed && isHomePage ? 'sticky top-0' : ''}`;

  return (
    <nav className={navClassName}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold">CricketSpot</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#book" className="hover:text-green-200">Book Now</a>
          <a href="#features" className="hover:text-green-200">Features</a>
          <a href="#testimonials" className="hover:text-green-200">Testimonials</a>
          <a href="#contact" className="hover:text-green-200">Contact</a>
          {isAuthenticated ? 
            <span onClick={signOut} className="cursor-pointer hover:text-green-200">Sign Out</span> : 
            <span onClick={() => setShowAuth(true)}>Sign In</span>
            // <a href="/auth" className="hover:text-green-200">Sign In</a>
          }
        </div>
        <div className="md:hidden">
          <button 
            className="text-white focus:outline-none" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-green-700 py-2 px-4 shadow-inner">
          <div className="flex flex-col space-y-3">
            <a 
              href="#book" 
              className="text-white py-2 hover:bg-green-800 px-3 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Now
            </a>
            <a 
              href="#features" 
              className="text-white py-2 hover:bg-green-800 px-3 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#testimonials" 
              className="text-white py-2 hover:bg-green-800 px-3 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a 
              href="#contact" 
              className="text-white py-2 hover:bg-green-800 px-3 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            {isAuthenticated ? 
              <span 
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="text-white py-2 hover:bg-green-800 px-3 rounded cursor-pointer"
              >
                Sign Out
              </span> : 
              <span
                onClick={() => setShowAuth(true)}
              >
                Sign In
              </span>
            }
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation; 