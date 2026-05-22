'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Pit Wall', href: '/pit-wall' },
    { name: 'Paddock', href: '/paddock' },
    { name: 'Calendar', href: '/calendar' },
    { name: 'Standings', href: '/standings' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="border-b border-white/5 bg-carbon/80 backdrop-blur-md py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl md:text-2xl font-black tracking-tighter text-f1-red uppercase italic hover:scale-105 transition-transform">
          Outlap
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em]">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`relative py-1 transition-all hover:text-f1-red ${
                isActive(link.href) ? 'text-f1-red' : 'text-silver/60'
              }`}
            >
              {link.name}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-f1-red animate-in fade-in duration-500"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
           <button 
             onClick={() => setIsMenuOpen(!isMenuOpen)}
             className="text-[10px] font-black text-silver bg-steel px-3 py-1 rounded uppercase tracking-widest border border-white/5 active:scale-95 transition-all"
           >
             {isMenuOpen ? 'Close' : 'Menu'}
           </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-carbon border-b border-white/5 py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              className={`text-[10px] font-black uppercase tracking-[0.2em] py-2 ${
                isActive(link.href) ? 'text-f1-red' : 'text-silver/60'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
