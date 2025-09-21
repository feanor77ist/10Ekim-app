import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);
  const cycleTimerRef = useRef(null);
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

  // Mobil ekran kontrolü
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Header görünürlük animasyonu
  const startHeaderAnimation = () => {
    // İlk 3 saniye bekleyip header'ı göster
    cycleTimerRef.current = setTimeout(() => {
      setIsVisible(true);
      
      // 5 saniye sonra hafif görünmez hale getir
      cycleTimerRef.current = setTimeout(() => {
        setIsVisible('faded');
      }, 5000);
    }, 3000);
  };

  const stopHeaderAnimation = () => {
    if (cycleTimerRef.current) {
      clearTimeout(cycleTimerRef.current);
      cycleTimerRef.current = null;
    }
  };

  // Hover event handlers - hem desktop hem mobil için
  const handleMouseEnter = () => {
    if (isVisible === 'faded') {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (isVisible === 'faded') {
      setIsHovered(false);
    }
  };

  // Touch event handlers - hem desktop hem mobil için
  const handleTouchStart = () => {
    if (isVisible === 'faded') {
      setIsHovered(true);
    }
  };

  const handleTouchEnd = () => {
    if (isVisible === 'faded') {
      // Touch end'de biraz gecikme ile hover'ı kaldır
      setTimeout(() => {
        setIsHovered(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (isHomePage) {
      // Anasayfada video oynarken header animasyonunu başlat
      const handleVideoPlay = () => {
        // Önceki timer'ları temizle
        stopHeaderAnimation();
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        
        // Header animasyonunu başlat
        startHeaderAnimation();
      };

      const handleVideoPause = () => {
        setIsVisible(false);
        stopHeaderAnimation();
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
        
        // Eğer video zaten oynuyorsa animasyonu başlat
        if (!video.paused) {
          handleVideoPlay();
        }

        return () => {
          video.removeEventListener('play', handleVideoPlay);
          video.removeEventListener('pause', handleVideoPause);
          video.removeEventListener('ended', handleVideoPause);
          stopHeaderAnimation();
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
        };
      }
    } else {
      // Diğer sayfalarda header animasyonunu başlat
      stopHeaderAnimation();
      startHeaderAnimation();
    }

    // Cleanup
    return () => {
      stopHeaderAnimation();
    };
  }, [isHomePage]);

  // Header visibility class'ını belirle
  const getHeaderClass = () => {
    if (isVisible === true) return 'header-visible';
    if (isVisible === 'faded') {
      return isHovered ? 'header-visible' : 'header-faded';
    }
    return 'header-hidden';
  };

  return (
    <header 
      className={`main-header ${getHeaderClass()}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
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