import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#ffffff', color: 'var(--text-muted)', padding: '4rem 1.5rem 3rem 1.5rem', borderTop: '1px solid var(--border-dark)', marginTop: 'auto' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem' }}>
          <div>
            <span style={{ fontSize: '1.1rem', fontWeight: '900', color: '#000000', letterSpacing: '-0.02em' }}>
              PIN<span style={{ color: 'var(--brand-color)' }}>TRENDS</span>
            </span>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', maxWidth: '300px', lineHeight: '1.5' }}>
              Bringing the absolute best viral trending styles right from your feed to your home.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '3rem' }}>
            <div>
              <h4 style={{ color: '#000000', fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1rem' }}>Collections</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                <li><Link href="/niche/wfh">Work from Home</Link></li>
                <li><Link href="/niche/rental-friendly">Rental Friendly Decor Hacks</Link></li>
                <li><Link href="/niche/kitchen-and-pantry">Kitchen & Pantry</Link></li>
                <li><Link href="/niche/modern-heritage">Modern Heritage & Traditional Fusion</Link></li>
              </ul>
            </div>
            {/* <div>
              <h4 style={{ color: '#000000', fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1rem' }}>Legal</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                <li><span style={{ cursor: 'pointer' }}>Privacy Policy</span></li>
                <li><span style={{ cursor: 'pointer' }}>Terms of Service</span></li>
              </ul>
            </div> */}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border-light)' }} />

        <div style={{ textAlign: 'center', fontSize: '0.75rem', lineHeight: '1.6' }}>
          <p>© {new Date().getFullYear()} PinTrends. All rights reserved.</p>
          <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>
            Disclaimer: This site contains affiliate links. If you make a purchase through these links, we may earn a small commission at no extra cost to you.
          </p>
        </div>

      </div>
    </footer>
  );
}