import React, { useState, useEffect } from 'react';
import mainpageIcon from './images/mainpage_icon.jpg';
import menuIcon from './images/navbar-icon.png'; // senin oluşturduğun ikon
import './Navigation.css';

const menuItems = [
  { title: "Süreç", link: "/surec" },
  { title: "Failler", link: "/failler" },
  { title: "Kararlar", link: "/kararlar" },
  { title: "Belgeler & Raporlar", link: "/belgeler-raporlar" },
  { title: "Dilekçeler", link: "/dilekceler" },
  { title: "Sorumlular", link: "/sorumlular" },
  { title: "Haberler", link: "/haberler" },
  { title: "Görseller", link: "/gorseller" },
  { title: "Açıklamalar", link: "/aciklamalar" },
  { title: "Duruşmalar", link: "/durusmalar" },
  { title: "Linkler", link: "/linkler" },
];

const Navigation = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  useEffect(() => {
    const closeNav = (e) => {
      if (!e.target.closest('.navigation-bar') && !e.target.closest('.menu-icon')) {
        setIsNavVisible(false);
      }
    };
    document.addEventListener('click', closeNav);
    return () => document.removeEventListener('click', closeNav);
  }, []);

  return (
    <>
      {/* Anasayfa yönlendirme ikonu */}
      <a href="/" className="mainpage-icon-link">
        <img src={mainpageIcon} alt="Anasayfa" className="mainpage-icon" />
      </a>

      {/* Menü açma ikonu */}
      <img
        src={menuIcon}
        alt="Menü"
        className="menu-icon"
        onClick={() => setIsNavVisible(!isNavVisible)}
      />

      {/* Sağdan kayan menü */}
      <div className={`navigation-bar ${isNavVisible ? 'visible' : ''}`}>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a href={item.link}>{item.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navigation;
