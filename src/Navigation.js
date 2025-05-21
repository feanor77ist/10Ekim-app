import React, { useState, useEffect } from 'react';
import mainpageIcon from './images/mainpage_icon.jpg';
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
      if (!e.target.closest('.navigation-bar') && !e.target.closest('.navbar-icon')) {
        setIsNavVisible(false);
      }
    };

    if (window.innerWidth < 768) {
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
        onClick={() => setIsNavVisible(!isNavVisible)}
      />
      <div
        className={`navigation-bar ${isNavVisible ? 'visible' : ''}`}
        onMouseLeave={() => setIsNavVisible(false)}
      >
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a href={item.link}>{item.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
