import React, { useState, useEffect } from 'react';
import mainpageIcon from './images/logo-rev.png';
import menuIcon from './images/navbar-icon.png'; // senin oluşturduğun ikon
import twitterIcon from './images/tw.jpg';
import instagramIcon from './images/ig_icon.png';
import youtubeIcon from './images/youtube-icon.svg';
import './Navigation.css';
import { Link } from 'react-router-dom';

const menuItems = [
  { title: "HAFIZA", link: "/hafiza-arsivi", enabled: true },
  { title: "SÜREÇ", link: "/surec", enabled: true },
  { title: "FAİLLER", link: "/failler", enabled: false },
  { title: "KARARLAR", link: "/kararlar", enabled: true },
  { title: "BELGELER & RAPORLAR", link: "/belgeler-raporlar", enabled: true },
  { title: "DİLEKÇELER", link: "/dilekceler", enabled: false },
  { title: "SORUMLULAR", link: "/sorumlular", enabled: false },
  { title: "HABERLER", link: "/haberler", enabled: true },
  { title: "GÖRSELLER & VİDEOLAR", link: "https://www.youtube.com/@10ekimankarakatliamavukatk96", enabled: true, external: true },
  { title: "BASIN AÇIKLAMALARI", link: "/aciklamalar", enabled: true },
  { title: "DURUŞMALAR", link: "/durusmalar", enabled: false },
  { title: "10 EKİM'İN 10.YILINDA 10 KAVRAM", link: "https://medium.com/@10ekimlegal", enabled: true, external: true },
  { title: "HAKKINDA", link: "/hakkinda", enabled: true },
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

  // Sosyal link title yerine tooltip gösterimi
  useEffect(() => {
    const links = Array.from(document.querySelectorAll('.social-link'));
    const cleanups = [];

    links.forEach((link) => {
      // Her link için tooltip div'i oluştur
      const label = link.getAttribute('data-tooltip') || '';
      const tooltip = document.createElement('div');
      tooltip.className = 'audio-tooltip';
      tooltip.textContent = label;

      // Konumlandırma için bağlam
      const previousPosition = link.style.position;
      if (!previousPosition) {
        link.style.position = 'relative';
      }

      link.appendChild(tooltip);

      const onEnter = () => {
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
      };

      const onLeave = () => {
        tooltip.classList.remove('show');
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
      };

      link.addEventListener('mouseenter', onEnter);
      link.addEventListener('mouseleave', onLeave);

      cleanups.push(() => {
        link.removeEventListener('mouseenter', onEnter);
        link.removeEventListener('mouseleave', onLeave);
        if (tooltip && tooltip.parentNode === link) {
          link.removeChild(tooltip);
        }
        // Yalnızca biz eklediysek position'u geri al
        if (!previousPosition) {
          link.style.position = '';
        }
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <>
      {/* Arka plan karartma overlay */}
      <div 
        className={`navigation-overlay ${isNavVisible ? 'visible' : ''}`}
        onClick={() => setIsNavVisible(false)}
      ></div>

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
          <div className="navigation-header">10 EKİM HAFIZA</div>
          {menuItems.map((item, index) => (
            <li key={index} className={!item.enabled ? 'disabled' : ''}>
              {item.enabled ? (
                item.external ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsNavVisible(false)} // menüyü kapat
                  >
                    {item.title}
                  </a>
                ) : (
                  <Link
                    to={item.link}
                    onClick={() => setIsNavVisible(false)} // menüyü kapat
                  >
                    {item.title}
                  </Link>
                )
              ) : (
                <span className="disabled-link">
                  {item.title}
                </span>
              )}
            </li>
          ))}
          
          {/* Sosyal medya linkleri */}
          <div className="social-links">
            <a 
              href="https://twitter.com/10Ekimdavasi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link twitter"
              data-tooltip="Twitter"
            >
              <img src={twitterIcon} alt="Twitter" className="social-icon" />
            </a>
            <a 
              href="https://instagram.com/10Ekimdavasi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link instagram"
              data-tooltip="Instagram"
            >
              <img src={instagramIcon} alt="Instagram" className="social-icon" />
            </a>
            <a 
              href="https://www.youtube.com/@10ekimankarakatliamavukatk96" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link youtube"
              data-tooltip="YouTube"
            >
              <img src={youtubeIcon} alt="YouTube" className="social-icon" />
            </a>
          </div>
        </ul>
      </div>
    </>
  );
};

export default Navigation;
