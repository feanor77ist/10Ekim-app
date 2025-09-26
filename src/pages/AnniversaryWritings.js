import React, { useState, useEffect } from 'react';
import './AnniversaryWritings.css';

const AnniversaryWritings = () => {
  const [writings, setWritings] = useState([]);
  const [selectedWriting, setSelectedWriting] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const openWriting = (writing) => {
    setSelectedWriting(writing);
  };

  const closeWriting = () => {
    setSelectedWriting(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day} ${getMonthName(month)}`;
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
        <p className="anniversary-subtitle">
          29 Eylül - 10 Ekim 2025 tarihleri arasında her gün yayınlanan yazılar
        </p>
      </div>

      <div className="writings-grid">
        {writings.map((writing, index) => (
          <div 
            key={writing.id} 
            className={`writing-card ${writing.featured ? 'featured' : ''}`}
            onClick={() => openWriting(writing)}
          >
            <div className="writing-image-container">
              {writing.image && (
                <img 
                  src={writing.image} 
                  alt={writing.title}
                  className="writing-image"
                />
              )}
              <div className="writing-date">
                {formatDate(writing.date)}
              </div>
            </div>
            
            <div className="writing-content">
              <h3 className="writing-title">{writing.title}</h3>
              <div className="writing-meta">
                <p className="writing-author">{writing.author}</p>
                <p className="writing-illustrator">Çizer: {writing.illustrator}</p>
              </div>
              
              {writing.content && (
                <div className="writing-preview">
                  {writing.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 150)}...
                </div>
              )}
            </div>
            
            <div className="writing-overlay">
              <span className="read-more">Oku</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnniversaryWritings;
