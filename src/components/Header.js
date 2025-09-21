import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const headerLinks = [
    { title: "HAFIZA", link: "/hafiza-arsivi", enabled: true },
    { title: "SÜREÇ", link: "/surec", enabled: true },
    { title: "KARARLAR", link: "/kararlar", enabled: true },
    { title: "BELGELER & RAPORLAR", link: "/belgeler-raporlar", enabled: true },
    { title: "HABERLER", link: "/haberler", enabled: true },
    { title: "GÖRSELLER", link: "/gorseller", enabled: true }
  ];

  useEffect(() => {
    if (isHomePage) {
      // Anasayfada video oynarken 3 saniye sonra header'ı göster
      const handleVideoPlay = () => {
        // Timer'ı temizle
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        
        // 3 saniye sonra header'ı göster
        timerRef.current = setTimeout(() => {
          console.log('Header gösteriliyor!');
          setIsVisible(true);
        }, 3000);
      };

      const handleVideoPause = () => {
        setIsVisible(false);
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      };

      // Video elementini bul ve event listener'ları ekle
      const video = document.querySelector('video');
      if (video) {
        video.addEventListener('play', handleVideoPlay);
        video.addEventListener('pause', handleVideoPause);
        video.addEventListener('ended', handleVideoPause);
        
        // Eğer video zaten oynuyorsa timer'ı başlat
        if (!video.paused) {
          handleVideoPlay();
        }

        return () => {
          video.removeEventListener('play', handleVideoPlay);
          video.removeEventListener('pause', handleVideoPause);
          video.removeEventListener('ended', handleVideoPause);
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
        };
      }
    } else {
      // Diğer sayfalarda her zaman görünür
      setIsVisible(true);
    }
  }, [isHomePage]);

  return (
    <header className={`main-header ${isHomePage ? (isVisible ? 'header-visible' : 'header-hidden') : 'header-visible'}`}>
      <div className="header-container">
        <div className="header-content">
          <nav className="header-navigation">
            <ul className="header-nav-list">
              {headerLinks.map((item, index) => (
                <li key={index} className="header-nav-item">
                  {item.enabled ? (
                    <Link 
                      to={item.link} 
                      className="header-nav-link"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <span className="header-nav-link disabled">
                      {item.title}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;