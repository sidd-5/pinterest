'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import productsData from '../data/products.json';

export default function Home() {
  const sliderRef = useRef(null);

  // Auto-scrolling Logic Engine
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationFrameId;
    let scrollSpeed = 1;

    const scrollLoop = () => {
      slider.scrollLeft += scrollSpeed;
      if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 2) {
        slider.scrollLeft = 0;
      }
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);

    const handleMouseEnter = () => cancelAnimationFrame(animationFrameId);
    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    slider.addEventListener('mouseenter', handleMouseEnter);
    slider.addEventListener('mouseleave', handleMouseLeave);
    slider.addEventListener('touchstart', handleMouseEnter);
    slider.addEventListener('touchend', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (slider) {
        slider.removeEventListener('mouseenter', handleMouseEnter);
        slider.removeEventListener('mouseleave', handleMouseLeave);
        slider.removeEventListener('touchstart', handleMouseEnter);
        slider.removeEventListener('touchend', handleMouseLeave);
      }
    };
  }, []);

  // Filter explicitly marked featured items safely
  let sliderProducts = productsData.filter(product => product.featured === true).slice(0, 10);

  // ALIGNED FIX: Changed slug to 'wfh' to perfectly mirror your JSON entries
  const niches = [
    { id: '01', name: 'Work From Home', slug: 'wfh', desc: 'Premium desk configurations, dark studio setups, and clean workflow ergonomics.', count: '15 Items Found', tag: 'PRODUCTIVITY' },
    { id: '02', name: 'Rental Friendly', slug: 'rental-friendly', desc: 'Damage-free wall updates, smart storage hacks, and renter-friendly styling.', count: '15 Items Found', tag: 'MINIMALISM' },
    { id: '03', name: 'Kitchen & Pantry', slug: 'kitchen-and-pantry', desc: 'Aesthetic glass storage, smart fridge optimization, and countertop precision sorting.', count: '15 Items Found', tag: 'UTILITY' },
    { id: '04', name: 'Modern Heritage', slug: 'modern-heritage', desc: 'Handcrafted traditional brass accents, artisan textiles, and ethnic wall masterpieces.', count: '15 Items Found', tag: 'AESTHETIC' },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-main)' }}>
      
      {/* HERO SECTION */}
      <section style={{ borderBottom: '2px solid var(--brand-color)', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '8rem 1.5rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'calc(2.2rem + 2.5vw)', fontWeight: '900', letterSpacing: '-0.04em', lineHeight: '1.05', textTransform: 'uppercase', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
            The exact products <br /> behind your <span style={{ color: 'var(--brand-color)' }}>favorite pins.</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '580px', margin: '0 auto', fontWeight: '500' }}>
            We source and catalog the direct checkout links from trending visual setups. No unlinked images, no dead ends. Just clean, immediate access.
          </p>
          <div style={{ marginTop: '3rem', display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#niches" className="hero-btn-solid-red">Explore Sub-Niches</a>
            <a href="#slider" className="hero-btn-heavy-outline">View Featured Feed</a>
          </div>
        </div>
      </section>

      {/* AUTOSCROLLING SLIDER SECTION */}
      <section id="slider" style={{ padding: '6rem 0', borderBottom: '1px solid var(--border-dark)', backgroundColor: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', marginBottom: '3rem' }}>
          <span style={{ color: 'var(--brand-color)', fontWeight: '900', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>● Curated Collection</span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-0.02em', textTransform: 'uppercase', marginTop: '0.25rem' }}>Viral Feed Discoveries</h2>
        </div>

        {sliderProducts.length === 0 ? (
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem', textAlign: 'center' }}>
            <div style={{ border: '1px dashed var(--brand-color)', padding: '3rem 2rem', backgroundColor: '#ffffff' }}>
              <span style={{ color: 'var(--brand-color)', fontSize: '1.5rem', fontWeight: '900', letterSpacing: '0.05em' }}>
                NO FEATURED PRODUCTS AT THE MOMENT
              </span>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem', fontWeight: '500' }}>
                We are currently auditing the latest viral trends. Explore the direct sub-niche directories below for immediate source link indexes.
              </p>
            </div>
          </div>
        ) : (
          <div 
            ref={sliderRef}
            className="horizontal-slider" 
            style={{ display: 'flex', gap: '2rem', overflowX: 'auto', padding: '1rem 1.5rem 2.5rem 1.5rem', behavior: 'smooth' }}
          >
            {sliderProducts.map((product, idx) => {
              const displayNicheName = product.niche === 'wfh' ? 'Work From Home' : product.niche.replace(/-/g, ' ');
              return (
                <div key={product.id} style={{ flex: '0 0 310px', border: '1px solid var(--brand-color)', backgroundColor: '#ffffff', overflow: 'hidden' }} className="slider-card-item">
                  <div style={{ height: '260px', overflow: 'hidden', position: 'relative', borderBottom: '1px solid var(--brand-color)' }}>
                    <img src={product.images ? product.images[0] : '/images/placeholder.jpg'} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: '0', left: '0', backgroundColor: 'var(--brand-color)', color: '#fff', fontSize: '0.65rem', fontWeight: '900', padding: '0.4rem 0.8rem', textTransform: 'uppercase' }}>
                      ITEM {idx + 1 === 10 ? '10' : `0${idx + 1}`}
                    </span>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: '900', color: 'var(--brand-color)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {displayNicheName}
                    </span>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', textTransform: 'uppercase', margin: '0.25rem 0 1.25rem 0', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '1.4em' }}>
                      {product.title}
                    </h3>
                    <Link href={`/product/${product.id}`} className="slider-action-btn-red">
                      Inspect Source Link
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* DIRECTORY SECTION */}
      <section id="niches" style={{ maxWidth: '1200px', margin: '0 auto', padding: '7rem 1.5rem' }}>
        <div style={{ borderBottom: '2px solid var(--brand-color)', paddingBottom: '2.5rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '900', color: 'var(--brand-color)', textTransform: 'uppercase', letterSpacing: '2px' }}>Structural Sorting</span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-0.02em', marginTop: '0.25rem' }}>Select Design Sub-Niche</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {niches.map((niche) => (
            <Link key={niche.slug} href={`/niche/${niche.slug}`} className="table-row-link" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
              <div className="editorial-table-row">
                <div className="table-col-meta">
                  <span style={{ fontWeight: '900', fontSize: '1rem', color: 'var(--brand-color)' }}>{niche.id}</span>
                  <span className="niche-badge-tag-red">{niche.tag}</span>
                </div>
                <div className="table-col-main">
                  <h3 className="niche-row-header-text" style={{ fontSize: '1.35rem', fontWeight: '900', textTransform: 'uppercase', margin: 0 }}>
                    {niche.name}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5', margin: '0.35rem 0 0 0', fontWeight: '500' }}>
                    {niche.desc}
                  </p>
                </div>
                <div className="table-col-action">
                  <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-main)' }}>{niche.count}</span>
                  <div className="arrow-indicator-red">VIEW ARCHIVE <span>→</span></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        .horizontal-slider::-webkit-scrollbar { display: none; }
        .horizontal-slider { -ms-overflow-style: none; scrollbar-width: none; }
        .hero-btn-solid-red { background-color: var(--brand-color); color: #ffffff; padding: 1.1rem 2.5rem; font-weight: 800; font-size: 0.85rem; text-transform: uppercase; border: 1px solid var(--brand-color); display: inline-block; text-decoration: none; }
        .hero-btn-solid-red:hover { background-color: var(--brand-hover); transform: translateY(-2px); }
        .hero-btn-heavy-outline { background-color: #ffffff; color: #000000; padding: 1.1rem 2.5rem; font-weight: 800; font-size: 0.85rem; text-transform: uppercase; border: 2px solid #000000; display: inline-block; text-decoration: none; }
        .hero-btn-heavy-outline:hover { color: var(--brand-color); border-color: var(--brand-color); transform: translateY(-2px); }
        .slider-action-btn-red { display: block; text-align: center; background-color: #000000; color: #ffffff; padding: 0.85rem 0; font-weight: 800; font-size: 0.8rem; text-transform: uppercase; text-decoration: none; border: 1px solid #000000; }
        .slider-action-btn-red:hover { background-color: var(--brand-color); border-color: var(--brand-color); }
        .editorial-table-row { display: flex; align-items: center; justify-content: space-between; padding: 2.5rem 0; border-bottom: 1px solid var(--border-light); gap: 2rem; }
        .table-row-link:hover .editorial-table-row { border-bottom-color: var(--brand-color); padding-left: 0.75rem; }
        .table-row-link:hover .niche-row-header-text { color: var(--brand-color); }
        .table-col-meta { display: flex; align-items: center; gap: 1.5rem; flex: 0 0 180px; }
        .niche-badge-tag-red { font-size: 0.65rem; font-weight: 900; background-color: #ffffff; color: #000000; border: 1px solid #000000; padding: 0.35rem 0.7rem; text-transform: uppercase; }
        .table-row-link:hover .niche-badge-tag-red { background-color: var(--brand-color); color: #ffffff; border-color: var(--brand-color); }
        .table-col-main { flex: 1; }
        .table-col-action { display: flex; align-items: center; justify-content: space-between; flex: 0 0 280px; gap: 1.5rem; }
        .arrow-indicator-red { font-weight: 900; font-size: 0.8rem; color: #000000; transition: transform 0.2s ease; }
        .table-row-link:hover .arrow-indicator-red { color: var(--brand-color); transform: translateX(4px); }
        @media (max-width: 860px) {
          .editorial-table-row { flex-direction: column; align-items: flex-start; gap: 1.25rem; padding: 2rem 0; }
          .table-col-meta { width: 100%; justify-content: space-between; flex: none; }
          .table-col-action { width: 100%; border-top: 1px dashed var(--border-light); padding-top: 1rem; flex: none; }
        }
      `}</style>
    </div>
  );
}