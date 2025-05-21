import React, { useEffect, useState } from 'react';
import './TwitterFeed.css';
import twitterIcon from './images/tw.jpg';

const TwitterFeed = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false); // Tek seferlik yükleme kontrolü

  // Script yüklü değilse ekle (ilk render'da)
  useEffect(() => {
    if (!window.twttr) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.onload = () => {
        if (window.twttr && window.twttr.widgets) {
          window.twttr.widgets.load();
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  // Hover ile panel açıldığında yalnızca bir kez embed yükle
  useEffect(() => {
    if (isVisible && !hasLoaded && window.twttr && window.twttr.widgets) {
      const timeout = setTimeout(() => {
        window.twttr.widgets.load();
        setHasLoaded(true); // İkinci kez yüklemeyi engelle
      }, 500); // Yüklemeyi biraz geciktir
      return () => clearTimeout(timeout);
    }
  }, [isVisible, hasLoaded]);

  return (
    <div
      className="twitter-widget-wrapper"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <img src={twitterIcon} alt="Twitter Icon" className="twitter-icon" />
      <div className={`twitter-feed-panel ${isVisible ? 'visible' : ''}`}>
        {isVisible && (
          <a
            className="twitter-timeline"
            data-theme="dark"
            data-width="300"
            data-height="500"
            href="https://twitter.com/10EkimDavasi?ref_src=twsrc%5Etfw"
          >
            Tweetler @10EkimDavasi
          </a>
        )}
      </div>
    </div>
  );
};

export default TwitterFeed;
