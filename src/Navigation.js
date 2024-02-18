import React, { useState } from 'react';
import mainpageIcon from './images/mainpage_icon.jpg';

const Navigation = () => {
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div className="navigation-bar">   
    <img src={mainpageIcon} alt="İkon" className="navbar-icon" />
      <ul>
        <li>Ankara’daymış Barış</li>
        <li onClick={toggleSubMenu}>Soruşturma
          {isSubMenuOpen && (
            <ul>
              <li>Gizlenen bir şeyler var</li>
              <li>İddianame: Pandoranın Kutusu</li>
              <li>Failler</li>
            </ul>
          )}
        </li>
        <li>Biz Bitti Demeden Bu Dava Bitmez!</li>
        <li>Anı Müzesi </li>
        <li>İnsanlığa Karşı Suç</li>
        <li>Kamu Görevlilerinin Sorumluluğu</li>
        <li>Yazı/Makaleler</li>
      </ul>
    </div>
  );
};

export default Navigation;
