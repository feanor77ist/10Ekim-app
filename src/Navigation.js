import React, { useState, useEffect } from 'react';
import mainpageIcon from './images/mainpage_icon.jpg';

const Navigation = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  // Mobil cihazlarda dışarıya dokunulduğunda navigasyonu kapat
  useEffect(() => {
    const closeNav = (e) => {
      // Navigasyon çubuğu ve ikon dışında bir yere dokunulduğunda kapat
      if (!e.target.closest('.navigation-bar') && !e.target.closest('.navbar-icon')) {
        setIsNavVisible(false);
      }
    };

    if (window.innerWidth < 768) { // Basit bir mobil cihaz kontrolü
      document.addEventListener('touchstart', closeNav);
    }

    return () => {
      if (window.innerWidth < 768) {
        document.removeEventListener('touchstart', closeNav);
      }
    };
  }, []);

  return (
    <div>
      <img 
        src={mainpageIcon} 
        alt="İkon" 
        className="navbar-icon" 
        onMouseEnter={() => setIsNavVisible(true)}
        onClick={() => setIsNavVisible(!isNavVisible)} // İkona tıklanıldığında navigasyonu aç/kapat
      />
      <div 
        className={`navigation-bar ${isNavVisible ? 'visible' : ''}`}
        onMouseLeave={() => setIsNavVisible(false)}>
        <ul>
          <li>ANKARA'DAYMIŞ BARIŞ</li>
          <li class="dropdown">SORUŞTURMA
            <ul class="dropdown-content">
              <li>Gizlenen Bir Şeyler Var</li>
              <li>İddianame: Pandoranın Kutusu</li>
              <li>Failler</li>
            </ul>
          </li>
          <li class="dropdown">DURUŞMALAR
            <ul class="dropdown-content">
              <li>Sonlanan Dava</li>
              <li>Güncel Dava</li>
            </ul>
          </li>
          <li>BİZ BİTTİ DEMEDEN BU DAVA BİTMEZ!</li>
          <li>İNSANLIĞA KARŞI SUÇ</li>
          <li>KAMU GÖREVLİLERİNİN SORUMLULUĞU</li>
          <li>YAZI & MAKALE</li>
          <li>ANI MÜZESİ</li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
