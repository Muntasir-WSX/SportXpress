'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, User } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/properties', label: 'Properties' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left Side: Logo & Desktop Navigation Links */}
          <div className="flex items-center gap-8">
            {/* Logo & Brand */}
            <Link href="/" className="shrink-0 flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-foreground leading-none">
                  Rent<span className="text-primary">Nest</span>
                </span>
                <span className="hidden lg:block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mt-1">
                  Fastest Growing Property Rental Platform
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-5 text-sm font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'text-primary font-semibold' 
                        : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {link.label}
                    {/* Active Underline Indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full animate-in fade-in" />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Right Side: Profile Icon & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            {/* Profile Icon */}
            <Link
              href="/profile"
              className={`p-2 rounded-full transition-colors text-foreground hover:text-primary hover:bg-muted ${
                pathname === '/profile' ? 'text-primary font-bold' : ''
              }`}
              aria-label="Profile"
            >
              <User size={20} />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-1 border-t border-border pt-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md transition-colors font-medium ${
                    isActive
                      ? 'bg-primary/10 text-primary font-semibold border-l-4 border-primary'
                      : 'text-foreground hover:bg-muted'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}