'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, User, Settings, LogOut, ChevronDown, LogIn } from 'lucide-react'


type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
}

type Iuser = {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    isBanned: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

type NavbarProps = {
  user?: Iuser;
}

export function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const pathname = usePathname()
  const profileRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/properties', label: 'Featured Properties' },
    { href: '/about', label: 'About Us' },
  ]

  const profileData = user?.data;

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left Side: Logo & Desktop Navigation Links */}
          <div className="flex items-center gap-8">
            {/* Logo & Brand */}
            <Link href="/" className="shrink-0 flex flex-col items-start gap-0.5 py-2">
              <Image 
                src="/assets/logo.png" 
                alt="RentNest Logo" 
                width={120} 
                height={40} 
                className="object-contain h-10 w-auto"
                priority
              />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mt-0.5">
                Find your nest
              </span>
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
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full animate-in fade-in" />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Right Side: Profile Icon Dropdown / Login & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            
            {profileData ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center gap-1.5 p-1.5 rounded-full transition-colors text-foreground hover:text-primary hover:bg-muted ${
                    pathname === '/profile' ? 'text-primary font-bold' : ''
                  }`}
                  aria-label="Profile menu"
                >
                  <div className="p-2 rounded-full bg-white dark:bg-card border border-border shadow-sm text-foreground flex items-center justify-center">
                    <User size={18} />
                  </div>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-card border border-border shadow-lg py-2 z-50 animate-in fade-in-50 zoom-in-95">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-xs text-muted-foreground">Signed in as</p>
                      <p className="text-sm font-semibold text-foreground truncate">{profileData.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{profileData.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <User size={16} className="text-muted-foreground" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        href="/settings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <Settings size={16} className="text-muted-foreground" />
                        <span>Settings</span>
                      </Link>
                    </div>

                    <div className="border-t border-border pt-1">
                      <button
                        onClick={() => {
                          setIsProfileOpen(false)
                        
                          alert('Logged out successfully!')
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shadow-sm"
              >
                <LogIn size={16} />
                <span>Login</span>
              </Link>
            )}

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