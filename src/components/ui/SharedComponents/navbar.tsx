'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, User } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

 
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/breaking-news', label: 'Breaking News' },
    { href: '/about', label: 'About Us' },
    { href: '/post-news', label: 'Post Your Story' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left Side: Logo & Desktop Navigation Links */}
          <div className="flex items-center gap-8">
            {/* Logo & Brand */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <Image
                src="/assets/logo.png"
                alt="SportXpress Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-foreground leading-none">
                  Sport<span className="text-primary">Xpress</span>
                </span>
                <span className="hidden lg:block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mt-1">
                  The Pulse of Global Sports
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side: Profile Icon & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            {/* Profile Icon (Always visible on right side) */}
            <Link
              href="/profile"
              className="p-2 rounded-full bg-secondary text-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
              aria-label="Profile"
            >
              <User size={20} />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-in fade-in slide-in-from-top-2 border-t border-border pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-md text-foreground hover:bg-secondary transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
          </div>
        )}
      </div>
    </nav>
  )
}