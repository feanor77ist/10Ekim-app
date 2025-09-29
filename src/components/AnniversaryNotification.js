import React, { useState, useEffect } from 'react';
import './AnniversaryNotification.css';

const AnniversaryNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentWriting, setCurrentWriting] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Yazıları yükle
    fetch('/anniversary_writings.json')
      .then(response => response.json())
      .then(data => {
        const publishedWritings = data.filter(writing => writing.published);
        
        // En son yayınlanan yazıyı al
        if (publishedWritings.length > 0) {
          const latest = publishedWritings[publishedWritings.length - 1];
          setCurrentWriting(latest);
        }
      })
      .catch(error => console.error('Yazılar yüklenemedi:', error));
  }, []);

  useEffect(() => {
    // Header'ın görünür olmasını bekle, sonra 2 saniye daha bekle
    const checkHeaderVisibility = () => {
      const header = document.querySelector('.main-header');
      if (header && header.classList.contains('header-visible')) {
        // Header görünür, 2 saniye sonra notification'ı göster
        const showTimer = setTimeout(() => {
          setIsVisible(true);
          // showAnimation'ı biraz gecikmeyle set et ki animasyon çalışsın
          setTimeout(() => {
            setShowAnimation(true);
          }, 50);
          
          // 5 saniye sonra hafif görünmez hale getir
          const fadeTimer = setTimeout(() => {
            setIsVisible('faded');
          }, 5000);
          
          return () => clearTimeout(fadeTimer);
        }, 2000);
        
        return () => clearTimeout(showTimer);
      } else {
        // Header henüz görünür değil, tekrar kontrol et
        setTimeout(checkHeaderVisibility, 100);
      }
    };

    // İlk kontrolü başlat
    checkHeaderVisibility();
  }, []);

  const handleReadMore = () => {
    window.open('https://medium.com/@10ekimlegal', '_blank');
  };

  const handleClose = () => {
    setShowAnimation(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  // Hover event handlers
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

  // Touch event handlers
  const handleTouchStart = () => {
    if (isVisible === 'faded') {
      setIsHovered(true);
    }
  };

  const handleTouchEnd = () => {
    if (isVisible === 'faded') {
      setTimeout(() => {
        setIsHovered(false);
      }, 2000);
    }
  };

  // Notification visibility class'ını belirle
  const getNotificationClass = () => {
    if (isVisible === true && showAnimation) return 'show';
    if (isVisible === 'faded') {
      return isHovered ? 'show' : 'faded';
    }
    return '';
  };

  if (!isVisible || !currentWriting) {
    return null;
  }

  return (
    <div 
      className={`anniversary-notification ${getNotificationClass()}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="notification-content">
        <div className="notification-header">
          <div className="notification-icon">📝</div>
          <div className="notification-title">
            <h3>10 Ekim'in 10.yılında 10 kavram</h3>
            <p className="subtitle">Alternatif bir karar denemesi</p>
          </div>
          <button className="notification-close" onClick={handleClose}>×</button>
        </div>
        
        <div className="notification-body">
          <div className="writing-preview">
            <div className="writing-image-small">
              {currentWriting.image && (
                <img 
                  src={currentWriting.image} 
                  alt={currentWriting.title}
                />
              )}
            </div>
            <div className="writing-info">
              <h4>{currentWriting.title}</h4>
              <p className="writing-author">{currentWriting.author}</p>
              <p className="writing-illustrator">Çizer: {currentWriting.illustrator}</p>
            </div>
          </div>
          
          <div className="notification-actions">
            <button className="btn-read-more" onClick={handleReadMore}>
              Yazıyı Oku
            </button>
            <button className="btn-all-writings" onClick={handleReadMore}>
              Tüm Yazılar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnniversaryNotification;
