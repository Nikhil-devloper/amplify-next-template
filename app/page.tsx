"use client";

import '@/app/lib/amplify';  // Import the shared Amplify configuration
import "@aws-amplify/ui-react/styles.css";

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Map, Phone, Mail, Star, CheckCircle, ArrowRight } from 'lucide-react';
import Slider from "react-slick";
// Add type declaration for react-slick
declare module 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import BookingButton from "./components/BookingButton";
import SignOutButton from "./components/SignOutButton";
import Navigation from "./components/Navigation";
import { useAuth } from "./AuthComponent";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024, // Desktop
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        className: 'desktop-slider',
      }
    },
    {
      breakpoint: 768, // Tablet
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 480, // Mobile
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

export default function Home() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('1');
  const [showMobileBookButton, setShowMobileBookButton] = useState(false);
  const { signOut, isAuthenticated } = useAuth();

  console.log('isAuthenticated -->', isAuthenticated);

  // Add scroll event listener to show/hide mobile book button
  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setShowMobileBookButton(true);
      } else {
        setShowMobileBookButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const testimonials = [
    {
      name: "Rahul Sharma",
      comment: "Best cricket turf in the city! Easy booking process and excellent facilities.",
      rating: 5
    },
    {
      name: "Priya Patel",
      comment: "Our team loves playing here. Clean, well-maintained and professional staff.",
      rating: 5
    },
    {
      name: "Arjun Mehta",
      comment: "Top-notch cricket ground with great lighting for evening matches.",
      rating: 4
    }
  ];
  
  const features = [
    "Professional-grade pitches",
    "Floodlights for night games",
    "Clean changing rooms",
    "Equipment rental available",
    "Parking facilities",
    "Refreshment area"
  ];

  return (
      <div>
        {/* <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Booking App</h1>
          <SignOutButton />
        </header> */}
        {/* <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Welcome to our service</h2>
            <p className="mb-4">
              This is the home page of our booking application. Users can browse this page
              without needing to authenticate. Authentication is only required when they
              try to book a slot.
            </p>
            
            <div className="mt-6">
              <BookingButton />
            </div>
          </section> */}
        
        <main>

          <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <Navigation isFixed={true} />

        {/* Hero Section */}
        <section className="relative">
          <div className="bg-black opacity-60 absolute inset-0 z-0"></div>
          <div 
            className="min-h-[80vh] bg-cover bg-center flex items-center relative z-0" 
            style={{ backgroundImage: "url('/image/hero.jpg')" }}
          >
            <div className="container mx-auto px-4 z-10 relative text-white ">
              <div className="max-w-xl">
                <h1 className="text-4xl p-4 bg-green-700 md:text-5xl font-bold mb-4 text-white-700">Premium Cricket/Football Grounds for Your Perfect Game</h1>
                <p className="text-lg mb-8 p-4 text-green-700 bg-white">Book our world-class turf for practice sessions, friendly matches, or tournaments.</p>
                <a 
                  href="/booking" 
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center"
                >
                  Book Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Gallery</h2>
            <Slider {...sliderSettings} className="max-w-5xl mx-auto">
              <div className="px-2">
                <img src="/image/hero.jpg" alt="Slide 1" className="w-full h-auto rounded-lg" />
              </div>
              <div className="px-2">
                <img src="/image/hero.jpg" alt="Slide 2" className="w-full h-auto rounded-lg" />
              </div>
              <div className="px-2">
                <img src="/image/hero.jpg" alt="Slide 3" className="w-full h-auto rounded-lg" />
              </div>
              <div className="px-2">
                <img src="/image/hero.jpg" alt="Slide 4" className="w-full h-auto rounded-lg" />
              </div>
              <div className="px-2">
                <img src="/image/hero.jpg" alt="Slide 5" className="w-full h-auto rounded-lg" />
              </div>
              <div className="px-2">
                <img src="/image/hero.jpg" alt="Slide 6" className="w-full h-auto rounded-lg" />
              </div>
            </Slider>
          </div>
        </section>

        {/* Booking Section */}
        <section id="book" className="py-12 bg-custom-yellow">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Book Your Slot</h2>
            <div className="max-w-md mx-auto bg-gray-50 rounded-lg shadow-lg p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Select Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/booking?date=${date}`;
                  }}
                >
                  Check Availability
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">World-Class Facilities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200">
                  <img src="/api/placeholder/400/320" alt="Cricket Pitch" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Professional Cricket Pitches</h3>
                  <p className="text-gray-600">Cricket pitches maintained by expert groundskeepers.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200">
                  <img src="/api/placeholder/400/320" alt="Night Cricket" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Football</h3>
                  <p className="text-gray-600">Changing rooms, equipment rental, refreshment area and ample parking.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200">
                  <img src="/api/placeholder/400/320" alt="Amenities" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Night Cricket</h3>
                  <p className="text-gray-600">High-quality floodlights enabling perfect visibility for evening matches.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 max-w-3xl mx-auto bg-amber-400 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">All Facilities Include:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-red-900">What Our Players Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 rounded-lg shadow-md p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                  <p className="font-bold">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 bg-green-600 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                <p className="max-w-md mb-6">Have questions or need assistance? Reach out to our friendly team.</p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Map className="h-5 w-5 mr-3" />
                    <span>123 Stadium Road, Cricket City</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3" />
                    <span>info@cricketspot.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">CricketSpot</h3>
                <p className="text-gray-300">Premium cricket turfs for the perfect game experience.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#book" className="text-gray-300 hover:text-white">Book Now</a></li>
                  <li><a href="#features" className="text-gray-300 hover:text-white">Facilities</a></li>
                  <li><a href="#testimonials" className="text-gray-300 hover:text-white">Testimonials</a></li>
                  <li><a href="#contact" className="text-gray-300 hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Opening Hours</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>Monday - Friday: 6:00 AM - 10:00 PM</li>
                  <li>Saturday - Sunday: 5:00 AM - 11:00 PM</li>
                  <li>Holidays: 7:00 AM - 9:00 PM</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} CricketSpot. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Mobile Fixed Book Now Button */}
        {showMobileBookButton && (
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white p-3 shadow-lg z-50">
            <a 
              href="/booking" 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center w-full"
            >
              Book Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        )}

        <style jsx global>{`
          .slick-prev {
            left: 5%;
            z-index: 1;
          }
          .slick-next {
            right: 5%;
            z-index: 1;
          }
          .slick-prev:before, .slick-next:before {
            color: black;
            font-size: 30px;
          }
          .slick-slide {
            padding: 5px;
          }
          .slick-list {
            margin: 0 -10px;
          }
          .desktop-slider .slick-slide {
            padding: 0 5px;
          }
          .desktop-slider .slick-slide img {
            height: 250px;
            width: 100%;
            object-fit: cover;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
          }
          .desktop-slider .slick-slide img:hover {
            transform: scale(1.03);
          }
          @media (min-width: 1024px) {
            .desktop-slider .slick-slide img {
              height: 250px;
            }
          }
        `}</style>
      </div>
          
        </main>

      </div>
  );
}