import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  // Döngüsel animasyon fonksiyonu
  const startCyclingAnimation = () => {
    const cycle = () => {
      // 3 saniye görünür
      setIsVisible(true);
      cycleTimerRef.current = setTimeout(() => {
        // 3 saniye kaybol
        setIsVisible(false);
        cycleTimerRef.current = setTimeout(() => {
          // Tekrar döngüye başla
          cycle();
        }, 3000);
      }, 3000);
    };
    
    // İlk 3 saniye bekleyip döngüyü başlat
    cycleTimerRef.current = setTimeout(() => {
      cycle();
    }, 3000);
  };

  const stopCyclingAnimation = () => {
    if (cycleTimerRef.current) {
      clearTimeout(cycleTimerRef.current);
      cycleTimerRef.current = null;
    }
  };

  useEffect(() => {
    if (isHomePage) {
      // Anasayfada video oynarken döngüsel animasyonu başlat
      const handleVideoPlay = () => {
        // Önceki timer'ları temizle
        stopCyclingAnimation();
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        
        // Döngüsel animasyonu başlat
        startCyclingAnimation();
      };

      const handleVideoPause = () => {
        setIsVisible(false);
        stopCyclingAnimation();
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
        
        // Eğer video zaten oynuyorsa döngüyü başlat
        if (!video.paused) {
          handleVideoPlay();
        }

        return () => {
          video.removeEventListener('play', handleVideoPlay);
          video.removeEventListener('pause', handleVideoPause);
          video.removeEventListener('ended', handleVideoPause);
          stopCyclingAnimation();
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
        };
      }
    } else {
      // Diğer sayfalarda döngüsel animasyonu başlat
      stopCyclingAnimation();
      startCyclingAnimation();
    }

    // Cleanup
    return () => {
      stopCyclingAnimation();
    };
  }, [isHomePage]);

  return (
    <header className={`main-header ${isVisible ? 'header-visible' : 'header-hidden'}`}>
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