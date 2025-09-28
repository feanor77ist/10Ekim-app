import React, { useState, useEffect, useRef } from 'react';
import './AnniversaryWritings.css';

const AnniversaryWritings = () => {
  const [writings, setWritings] = useState([]);
  const [selectedWriting, setSelectedWriting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const backToTopRef = useRef(null);

  useEffect(() => {
    fetch('/anniversary_writings.json')
      .then(response => response.json())
      .then(data => {
        // Sadece yayınlanmış yazıları göster
        const publishedWritings = data.filter(writing => writing.published);
        setWritings(publishedWritings);
        setLoading(false);
      })
      .catch(error => {
        console.error('Yazılar yüklenemedi:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (selectedWriting) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setShowBackToTop(scrollTop > 300);
      }
    };

    if (selectedWriting) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [selectedWriting]);

  const openWriting = (writing) => {
    setSelectedWriting(writing);
  };

  const closeWriting = () => {
    setSelectedWriting(null);
  };

  const formatDate = (dateString) => {
    // ISO formatındaki tarihi doğru şekilde parse et
    const [year, month, day] = dateString.split('-').map(Number);
    return `${day} ${getMonthName(month)} ${year}`;
  };

  const getMonthName = (month) => {
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    return months[month - 1];
  };

  if (loading) {
    return (
      <div className="anniversary-loading">
        <div className="loading-spinner"></div>
        <p>Yazılar yükleniyor...</p>
      </div>
    );
  }

  // Eğer bir yazı seçilmişse, o yazıyı göster
  if (selectedWriting) {
    return (
      <div className="anniversary-writings">
        <div className="writing-detail-page">
          <button className="back-button" onClick={closeWriting}>
            ← Geri Dön
          </button>
          
          <div className="writing-detail-header">
            <div className="writing-detail-image-container">
              {selectedWriting.image && (
                <img 
                  src={selectedWriting.image} 
                  alt={selectedWriting.title}
                  className="writing-detail-image"
                />
              )}
            </div>
            
            <div className="writing-detail-title-section">
              <h1 className="writing-detail-title">{selectedWriting.title}</h1>
              <div className="writing-detail-meta">
                <p className="writing-detail-author">{selectedWriting.author}</p>
                <p className="writing-detail-illustrator">Çizer: {selectedWriting.illustrator}</p>
                <p className="writing-detail-date">{formatDate(selectedWriting.date)}</p>
              </div>
            </div>
          </div>
          
          <div className="writing-detail-body">
            <div 
              className="writing-detail-text"
              dangerouslySetInnerHTML={{ __html: selectedWriting.content }}
            />
            <button 
              ref={backToTopRef}
              className={`back-to-top-btn ${showBackToTop ? 'visible' : ''}`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Başa Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Ana liste görünümü
  return (
    <div className="anniversary-writings">
      <div className="anniversary-header">
        <h1>10 Ekim'in 10.yılında 10 kavram</h1>
        <div className="anniversary-subtitle">
          <div className="concept-text">Alternatif bir karar denemesi</div>
        </div>
      </div>

      <div className="concepts-section">
        
        <div className="concepts-right">
          <div className="concept-list">
            <div className="concept-item">dava</div>
            <div className="concept-item">barış</div>
            <div className="concept-item">katliam</div>
            <div className="concept-item">sorumluluk</div>
            <div className="concept-item">eylem</div>
            <div className="concept-item">politika</div>
            <div className="concept-item">emek</div>
            <div className="concept-item">yas</div>
            <div className="concept-item">mücadele</div>
            <div className="concept-item">zaman</div>
          </div>
        </div>
      </div>

      <div className="writings-grid">
        {writings.map((writing, index) => (
          <div 
            key={writing.id} 
            className={`writing-card ${writing.featured ? 'featured' : ''}`}
            onClick={() => openWriting(writing)}
          >
            {writing.coverImage && (
              <img 
                src={writing.coverImage} 
                alt={writing.title}
                className="writing-cover-image"
              />
            )}
            
            <div className="writing-date-badge">
              {formatDate(writing.date)}
            </div>
            
            <div className="writing-overlay">
              <div className="writing-overlay-content">
                <span className="writing-title-overlay">{writing.title}</span>
                <span className="read-more">Oku</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnniversaryWritings;
