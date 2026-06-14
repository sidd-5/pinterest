import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'PinTrends - Curated Pinterest Essentials',
  description: 'The exact products featured in your favorite visual creative boards.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}