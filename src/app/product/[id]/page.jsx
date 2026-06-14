'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import productsData from '../../../data/products.json';

export default function ProductDetails({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const product = productsData.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  // Extracts array items safely and filters out empty lines
  const rawImages = product.images && product.images.length > 0 ? product.images : [];
  const productImages = rawImages.filter(img => img && img.trim() !== '');

  // Safety fallback if no picture exists
  if (productImages.length === 0) {
    productImages.push('images/placeholder.jpg');
  }

  const [activeImage, setActiveImage] = useState(productImages[0]);

  // ALIGNED FIX: Outputs clean "Work From Home" strings text formatting when niche matches 'wfh'
  const displayNicheName = product.niche === 'wfh' ? 'Work From Home' : product.niche.replace(/-/g, ' ');

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '90vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 1.5rem' }}>
        
        {/* Breadcrumb Layer */}
        <div style={{ marginBottom: '3.5rem' }}>
          <Link href={`/niche/${product.niche}`} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <span>←</span> Back to <span style={{ color: 'var(--brand-color)' }}>{displayNicheName}</span>
          </Link>
        </div>

        <div className="flat-split-layout">
          
          {/* Left Column: Image Viewing Area */}
          <div style={{ flex: '1.1', width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Aspect Ratio container sets image bounding context */}
            <div style={{ border: '1px solid var(--brand-color)', overflow: 'hidden', backgroundColor: '#f4f4f5', width: '100%' }}>
              <img 
                src={activeImage.startsWith('/') ? activeImage : `/${activeImage}`} 
                alt={product.title} 
                style={{ width: '100%', display: 'block', objectFit: 'cover', objectPosition: 'center', aspectRatio: '1 / 1' }} 
              />
            </div>

            {/* Thumbnail Row Buttons (Only shows up if your database array contains variations) */}
            {productImages.length > 1 && (
              <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {productImages.map((imgUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(imgUrl)}
                    style={{
                      flex: '0 0 75px',
                      height: '75px',
                      padding: 0,
                      cursor: 'pointer',
                      backgroundColor: '#ffffff',
                      border: activeImage === imgUrl ? '2px solid var(--brand-color)' : '1px solid var(--border-light)',
                      overflow: 'hidden',
                      transition: 'border-color 0.15s ease'
                    }}
                  >
                    <img 
                      src={imgUrl.startsWith('/') ? imgUrl : `/${imgUrl}`} 
                      alt={`View ${index + 1}`} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
                    />
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Right Column: Copywriting Parameters Details */}
          <div style={{ flex: '0.9', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            
            <div style={{ display: 'inline-block', alignSelf: 'flex-start', fontSize: '0.7rem', fontWeight: '800', color: '#ffffff', backgroundColor: 'var(--brand-color)', padding: '0.4rem 0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
              Direct Product Verification
            </div>
            
            <h1 style={{ fontSize: 'calc(1.6rem + 0.6vw)', color: 'var(--text-main)', margin: '0 0 1.25rem 0', fontWeight: '900', lineHeight: '1.15', textTransform: 'uppercase' }}>
              {product.title}
            </h1>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.65', marginBottom: '2rem', fontWeight: '500' }}>
              {product.description}
            </p>

            <div style={{ borderLeft: '2px solid var(--brand-color)', paddingLeft: '1rem', marginBottom: '2.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '500', lineHeight: '1.5' }}>
              <strong>Platform Note:</strong> This validated secure node connection transfers your terminal window safely to authorized purchase configurations.
            </div>
            
            <a
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flat-cta-link"
            >
              Go To Source Platform ↗
            </a>

            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>
              <span style={{ color: '#22c55e', fontSize: '1.1rem' }}>✓</span> Monitored external transfer link
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .flat-split-layout {
          display: flex;
          flex-direction: column;
          gap: 4.5rem;
        }
        .flat-cta-link {
          display: block;
          text-align: center;
          background-color: var(--brand-color);
          color: #ffffff;
          padding: 1.1rem 2rem;
          text-decoration: none;
          font-weight: 800;
          text-transform: uppercase;
          font-size: 0.9rem;
          letter-spacing: 0.05em;
          transition: background-color 0.2s ease;
        }
        .flat-cta-link:hover {
          background-color: var(--brand-hover);
        }
        @media (min-width: 768px) {
          .flat-split-layout { 
            flex-direction: row !important;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}