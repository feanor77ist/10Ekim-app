import React, { useState } from 'react';
import mainpageIcon from './images/mainpage_icon.jpg';

const Navigation = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  return (
    <div>
      <img 
        src={mainpageIcon} 
        alt="İkon" 
        className="navbar-icon" 
        onMouseEnter={() => setIsNavVisible(true)}  
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
          <li>DURUŞMALAR</li>
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
