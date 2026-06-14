"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import LoginModal from './LoginModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#00234B] shadow-lg py-3' : 'bg-[#00234B]/95 backdrop-blur-sm py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Globe className="text-[#FF8C00] h-8 w-8" />
            <span className="text-2xl font-bold text-white tracking-wide">APEX <span className="text-[#FF8C00]">LOGISTICS</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {['Home', 'About', 'Services', 'Tracking', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-300 hover:text-[#FF8C00] font-medium transition-colors duration-200">{item}</a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            {/* Lang/Currency Toggle */}
            <div className="hidden lg:flex items-center gap-2 text-gray-300 text-sm border-r border-gray-600 pr-4">
              <span className="flex items-center gap-1 cursor-pointer hover:text-white">EN <ChevronDown size={14} /></span>
              <span className="flex items-center gap-1 cursor-pointer hover:text-white">USD <ChevronDown size={14} /></span>
            </div>
            
            <button onClick={() => setIsLoginOpen(true)} className="hidden md:block border-2 border-[#FF8C00] text-[#FF8C00] px-6 py-2 rounded-md font-semibold hover:bg-[#FF8C00] hover:text-white transition-all duration-300">
              Client Login
            </button>
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
        {/* Mobile Menu (unchanged) */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#00234B] border-t border-gray-700 absolute w-full">
            <div className="flex flex-col p-6 gap-4">
              {['Home', 'About', 'Services', 'Tracking', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-white hover:text-[#FF8C00] font-medium text-lg" onClick={() => setIsMenuOpen(false)}>{item}</a>
              ))}
              <button onClick={() => { setIsLoginOpen(true); setIsMenuOpen(false); }} className="mt-4 border-2 border-[#FF8C00] text-[#FF8C00] px-6 py-3 rounded-md font-semibold w-full">Client Login</button>
            </div>
          </div>
        )}
      </header>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}