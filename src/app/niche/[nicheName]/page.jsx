'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import productsData from '../../../data/products.json';

// Bulletproof self-contained Auto-Scrolling Image Component for the Grid Cards
function AutoScrollingCardImage({ productImages, altText }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Filters out null or completely empty text spaces safely
  const validImages = (productImages || []).filter((img) => img && img.trim() !== '');

  useEffect(() => {
    // Safety Fallback: If your product entry only has 1 active asset path, freeze execution immediately
    if (validImages.length <= 1) {
      setCurrentIdx(0);
      return;
    }

    const intervalId = setInterval(() => {
      setCurrentIdx((prevIdx) => (prevIdx + 1) % validImages.length);
    }, 2500); // Cross-fades image files every 2.5 seconds safely

    return () => clearInterval(intervalId);
  }, [validImages]);

  if (validImages.length === 0) {
    return (
      <div style={{ width: '100%', height: '100%', backgroundColor: '#f4f4f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        No Asset Loaded
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#f4f4f5' }}>
      {validImages.map((imgUrl, index) => (
        <img
          key={imgUrl + index}
          src={imgUrl.startsWith('/') ? imgUrl : `/${imgUrl}`} // Protects root paths from breaking directory lookups
          alt={`${altText} view ${index + 1}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            aspectRatio: '1 / 1',
            position: index === 0 ? 'relative' : 'absolute',
            top: 0,
            left: 0,
            opacity: index === currentIdx ? 1 : 0,
            transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)', // High-end cinematic fade speed
            zIndex: index === currentIdx ? 2 : 1,
          }}
        />
      ))}
    </div>
  );
}

export default function NichePage({ params }) {
  const resolvedParams = use(params);
  const { nicheName } = resolvedParams;

  // Custom Editorial Headings Lookup Dictionary Map
  const customHeadings = {
    'wfh': 'Work From Home Essentials',
    'rental-friendly': 'Rental Friendly Decor Hacks',
    'kitchen-and-pantry': 'Kitchen & Pantry Organization',
    'modern-heritage': 'Modern Heritage & Traditional Fusion'
  };

  const fallbackHeading = nicheName === 'wfh' ? 'Work From Home' : nicheName.replace(/-/g, ' ');
  const pageHeading = customHeadings[nicheName] || fallbackHeading;

  // Filter products belonging to this specific sub-niche parameter profile
  const filteredProducts = productsData.filter((product) => product.niche === nicheName);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '90vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 1.5rem' }}>
        
        {/* Header Segment */}
        <div style={{ borderBottom: '2px solid var(--brand-color)', paddingBottom: '2rem', marginBottom: '3.5rem' }}>
          <Link href="/" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none' }}>
            ← Back to Index
          </Link>
          
          <h1 style={{ textTransform: 'uppercase', color: 'var(--text-main)', fontSize: 'calc(1.6rem + 1.2vw)', fontWeight: '900', marginTop: '0.75rem', letterSpacing: '-0.03em', lineHeight: '1.1' }}>
            {pageHeading}
          </h1>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: '500' }}>
              Curated layout recommendations matching your preferred feed style.
            </p>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', backgroundColor: 'var(--brand-color)', color: '#fff', padding: '0.4rem 0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {filteredProducts.length} Items Indexed
            </span>
          </div>
        </div>
        
        {/* Grid Feed Layout Container */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 0', color: 'var(--text-muted)', fontSize: '1rem', fontWeight: '500' }}>
            No listed catalog items loaded under this parameter profile.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2.5rem' }}>
            {filteredProducts.map((product) => {
              const imgs = product.images || [];
              
              return (
                <div key={product.id} className="flat-catalog-card">
                  
                  {/* Image Frame Box */}
                  <div style={{ position: 'relative', overflow: 'hidden', height: '320px', borderBottom: '1px solid var(--border-light)' }}>
                    <AutoScrollingCardImage productImages={imgs} altText={product.title} />
                  </div>

                  {/* Card Content Text Context */}
                  <div style={{ padding: '1.5rem', backgroundColor: '#ffffff' }}>
                    <h3 className="flat-title">{product.title}</h3>
                    <p className="flat-desc">{product.description}</p>
                    
                    {/* FIXED: Internal routing dynamic link to keep users inside your web platform layout shell */}
                    <Link href={`/product/${product.id}`} className="flat-catalog-btn">
                      Inspect Detail View
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        <style>{`
          .flat-catalog-card {
            border: 1px solid var(--border-light);
            background-color: #ffffff;
            transition: border-color 0.2s ease;
          }
          .flat-catalog-card:hover {
            border-color: var(--brand-color);
          }
          .flat-title {
            font-size: 1.1rem;
            font-weight: 800;
            color: var(--text-main);
            text-transform: uppercase;
            margin-bottom: 0.5rem;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .flat-desc {
            color: var(--text-muted);
            font-size: 0.9rem;
            line-height: 1.6;
            height: 48px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            margin-bottom: 1.5rem;
          }
          .flat-catalog-btn {
            display: block;
            text-align: center;
            background-color: #000000;
            color: #ffffff;
            padding: 0.8rem 0;
            font-weight: 800;
            font-size: 0.8rem;
            text-transform: uppercase;
            text-decoration: none;
            transition: background-color 0.2s ease;
          }
          .flat-catalog-btn:hover {
            background-color: var(--brand-color);
          }
        `}</style>
      </div>
    </div>
  );
}