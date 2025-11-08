import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/adopt', label: 'Adopt' },
    { href: '/about', label: 'About Us' },
    { href: '/process', label: 'Process' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center"
            >
              <Heart className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold text-gradient">Poppy Paws</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-medium transition-all duration-300 relative ${
                  location.pathname === link.href
                    ? 'text-poppy-peach'
                    : 'text-foreground hover:text-poppy-peach'
                }`}
              >
                {link.label}
                {location.pathname === link.href && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-primary rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="btn-hero">
              Adopt Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 pb-4"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-medium transition-colors ${
                    location.pathname === link.href
                      ? 'text-poppy-peach'
                      : 'text-foreground hover:text-poppy-peach'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button className="btn-hero w-full mt-4">
                Adopt Now
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};