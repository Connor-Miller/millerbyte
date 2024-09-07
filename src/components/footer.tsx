import React, { useEffect, useState } from 'react';
import './footer.css';

const Footer: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer id="footer" style={{ '--scroll-position': scrollPosition } as React.CSSProperties}>
      <div className="backdrop"></div>
      <div className="footer-content">
        <div className="col col1">
          <h3>Miller Bytes</h3>
          <p>Made with <span style={{ color: '#BA6573' }}>❤</span> by Comtronic_Codes</p>
          <div className="social">
            <a href="https://github.com/Connor-Miller" target="_blank" rel="noopener noreferrer" className="link">
              <img src="/logos/github-white-icon.png" alt="GitHub" />
            </a>
            <a href="https://x.com/Comtronic_Codes" target="_blank" rel="noopener noreferrer" className="link">
              <img src="/logos/x-social-media-white-icon.png" alt="Twitter" />
            </a>
            <a href="https://www.linkedin.com/in/connor-miller-dev/" target="_blank" rel="noopener noreferrer" className="link">
              <img src="/logos/linkedin-app-white-icon.png" alt="LinkedIn" />
            </a>
          </div>
          <p style={{ color: '#818181', fontSize: 'smaller' }}>2024 © All Rights Reserved</p>
        </div>
        <div className="col col2">
          <p>About</p>
          <p>Our mission</p>
          <p>Privacy Policy</p>
          <p>Terms of service</p>
        </div>
        <div className="col col3">
          <p>Services</p>
          <p>Products</p>
          <p>Join our team</p>
          <p>Partner with us</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
