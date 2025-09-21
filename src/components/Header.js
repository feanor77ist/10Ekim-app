import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const headerLinks = [
    { title: "HAFIZA", link: "/hafiza-arsivi", enabled: true },
    { title: "SÜREÇ", link: "/surec", enabled: true },
    { title: "KARARLAR", link: "/kararlar", enabled: true },
    { title: "BELGELER & RAPORLAR", link: "/belgeler-raporlar", enabled: true },
    { title: "HABERLER", link: "/haberler", enabled: true },
    { title: "GÖRSELLER", link: "/gorseller", enabled: true }
  ];

  return (
    <header className="main-header">
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
