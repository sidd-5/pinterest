'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Core product niches mapping dynamically
  const navItems = [
    { name: 'Work From Home', slug: 'wfh', isStaticPath: false },
    { name: 'Rental Friendly', slug: 'rental-friendly', isStaticPath: false },
    { name: 'Kitchen and Pantry', slug: 'kitchen-and-pantry', isStaticPath: false },
    { name: 'Modern Heritage', slug: 'modern-heritage', isStaticPath: false },
    //{ name: 'Blog', slug: 'blog', isStaticPath: true }, // New dedicated clean path item
  ];

  return (
    <nav style={{ backgroundColor: '#ffffff', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid var(--border-dark)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>

        {/* Brand Logo */}
        <Link href="/">
          <img
            src="/logo.png"
            alt="Brand Logo"
            style={{
              height: '80px',
              width: 'auto',
              display: 'block',
              objectFit: 'contain',
              cursor: 'pointer',
            }}
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div style={{ display: 'flex', gap: '2rem' }} className="desktop-menu">
          {navItems.map((item) => (
            <Link
              key={item.slug}
              href={item.isStaticPath ? `/${item.slug}` : `/niche/${item.slug}`}
              style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'color 0.2s' }}
              className="nav-link-item"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', flexDirection: 'column', gap: '5px' }}
          className="hamburger-button"
          aria-label="Toggle Navigation Menu"
        >
          <div style={{ width: '22px', height: '2px', backgroundColor: '#000000', transition: '0.3s', transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></div>
          <div style={{ width: '22px', height: '2px', backgroundColor: '#000000', transition: '0.3s', opacity: isOpen ? 0 : 1 }}></div>
          <div style={{ width: '22px', height: '2px', backgroundColor: '#000000', transition: '0.3s', transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></div>
        </button>

        {/* Mobile Dropdown Menu Container */}
        <div
          style={{
            display: isOpen ? 'flex' : 'none',
            flexDirection: 'column',
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid var(--border-dark)',
            padding: '1rem 0'
          }}
          className="mobile-dropdown"
        >
          {navItems.map((item) => (
            <Link
              key={item.slug}
              href={item.isStaticPath ? `/${item.slug}` : `/niche/${item.slug}`}
              onClick={() => setIsOpen(false)} // Closes menu automatically when clicked
              style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '1rem 1.5rem', borderBottom: '1px solid #f4f4f5', color: '#000000' }}
            >
              {item.name}
            </Link>
          ))}
        </div>

      </div>

      {/* Scoped CSS Media Queries to manage breakpoint visibility */}
      <style>{`
        .nav-link-item:hover {
          color: var(--brand-color) !important;
        }
        
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .hamburger-button {
            display: flex !important;
          }
        }

        @media (min-width: 769px) {
          .mobile-dropdown {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}