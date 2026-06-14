export default function BlogPage() {
    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '90vh' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 1.5rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '2rem' }}>Blog</h1>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                    Welcome to our blog! Here you'll find the latest updates, insights, and stories from our team. Stay tuned for more content!
                </p>
            </div>
        </div>
    );
}