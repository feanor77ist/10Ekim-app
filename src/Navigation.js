import React, { useState, useEffect } from 'react';
import mainpageIcon from './images/mainpage_icon3.png';
import menuIcon from './images/navbar-icon.png'; // senin oluşturduğun ikon
import './Navigation.css';
import { Link } from 'react-router-dom';

const menuItems = [
  { title: "SÜREÇ", link: "/surec" },
  { title: "FAİLLER", link: "/failler" },
  { title: "KARARLAR", link: "/kararlar" },
  { title: "BELGELER & RAPORLAR", link: "/belgeler-raporlar" },
  { title: "DİLEKÇELER", link: "/dilekceler" },
  { title: "SORUMLULAR", link: "/sorumlular" },
  { title: "HABERLER", link: "/haberler" },
  { title: "GÖRSELLER", link: "/gorseller" },
  { title: "AÇIKLAMALAR", link: "/aciklamalar" },
  { title: "DURUŞMALAR", link: "/durusmalar" },
  { title: "LİNKLER", link: "/linkler" },
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
          <div className="navigation-header">10 EKİM HAFIZA ARŞİVİ</div>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.link}
                onClick={() => setIsNavVisible(false)} // menüyü kapat
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navigation;
