"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// You can easily add or remove sections by modifying this array
const navSections = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div className="hidden md:flex items-center space-x-1">
              {navSections.map((section) => (
                <Link
                  key={section.name}
                  href={section.href}
                  className={`py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300 ${
                    pathname === section.href ? 'text-green-500 border-b-4 border-green-500' : ''
                  }`}
                >
                  {section.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button" onClick={() => setIsOpen(!isOpen)}>
              <svg
                className="w-6 h-6 text-gray-500 hover:text-green-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navSections.map((section) => (
            <Link
              key={section.name}
              href={section.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === section.href
                  ? 'text-white bg-green-500'
                  : 'text-gray-500 hover:text-white hover:bg-green-500'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {section.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}