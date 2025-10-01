import React, { useState, useEffect } from 'react';
import './BelgelerRaporlar.css';

const BelgelerRaporlar = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [pdfFiles, setPdfFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // JSON veritabanından veri yükle
  useEffect(() => {
    fetch('/pdf_database.json')
      .then(response => response.json())
      .then(data => {
        setPdfFiles(data.belgeler_raporlar);
        setLoading(false);
      })
      .catch(error => {
        console.error('PDF veritabanı yüklenemedi:', error);
        setLoading(false);
      });
  }, []);

  const getCategoryDisplayName = (category) => {
    switch (category) {
      case 'Araştırma':
        return 'Araştırma';
      case 'Disiplin':
        return 'Disiplin';
      case 'İnceleme':
        return 'İnceleme';
      case 'Müfettişlik':
        return 'Müfettişlik';
      default:
        return category;
    }
  };

  const categories = [...new Set(pdfFiles.map(pdf => pdf.category))];

  const [pdfLoading, setPdfLoading] = useState(false);

  const handlePdfClick = (pdf) => {
    if (pdf.googleDriveLink && pdf.googleDriveLink !== null) {
      // Google Drive linkine yönlendir
      window.open(pdf.googleDriveLink, '_blank');
    } else {
      // Local PDF görüntüleme
      setPdfLoading(true);
      setSelectedPdf(pdf);
      setTimeout(() => setPdfLoading(false), 1000);
    }
  };

  const closePdfViewer = () => {
    setSelectedPdf(null);
  };

  // downloadPdf kaldırıldı (artık yalnızca Görüntüle var)

  const handleCategoryFilter = (category) => {
    setActiveCategory(category);
  };

  const filteredPdfFiles = activeCategory === 'all' 
    ? pdfFiles 
    : pdfFiles.filter(pdf => pdf.category === activeCategory);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Araştırma':
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'Disiplin':
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'İnceleme':
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'Müfettişlik':
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Araştırma':
        return '#4ecdc4';
      case 'Disiplin':
        return '#ff6b6b';
      case 'İnceleme':
        return '#45b7d1';
      case 'Müfettişlik':
        return '#96ceb4';
      default:
        return '#ffa726';
    }
  };

  if (loading) {
    return (
      <div className="belgeler-raporlar-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>PDF verileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="belgeler-raporlar-container">
      <div className="belgeler-raporlar-header">
        <h1>BELGELER & RAPORLAR</h1>
        <p className="belgeler-raporlar-subtitle">
          10 Ekim Ankara Gar Katliamı ile ilgili resmi belgeler, raporlar ve inceleme dokümanları
        </p>
      </div>

      <div className="categories-filter">
        <div className="category-buttons">
          <button 
            className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryFilter('all')}
          >
            Tümü
          </button>
          {categories.map((category, index) => (
            <button 
              key={index} 
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryFilter(category)}
              style={{ '--category-color': getCategoryColor(category) }}
            >
              {getCategoryDisplayName(category)}
            </button>
          ))}
        </div>
      </div>

      <div className="belgeler-raporlar-grid">
        {filteredPdfFiles.map((pdf) => (
          <div key={pdf.id} className="pdf-card" data-category={pdf.category}>
            <div className="pdf-header">
              <div className="pdf-icon" style={{ color: getCategoryColor(pdf.category) }}>
                {getCategoryIcon(pdf.category)}
              </div>
              <div className="pdf-category" style={{ backgroundColor: getCategoryColor(pdf.category) + '20', color: getCategoryColor(pdf.category) }}>
                {getCategoryDisplayName(pdf.category)}
              </div>
            </div>
            <div className="pdf-content">
              <h3 className="pdf-title">{pdf.title}</h3>
              <p className="pdf-description">{pdf.description}</p>
              <div className="pdf-meta">
                <span className="pdf-size">Boyut: {pdf.size}</span>
                <span className="pdf-date">Tarih: {pdf.date}</span>
              </div>
              <div className="pdf-actions">
                <button 
                  className="view-btn"
                  onClick={() => handlePdfClick(pdf)}
                >
                  Görüntüle
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PDF Viewer Modal */}
      {selectedPdf && (
        <div className="pdf-modal-overlay" onClick={closePdfViewer}>
          <div className="pdf-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pdf-modal-header">
              <h3>{selectedPdf.title}</h3>
              <button className="close-btn" onClick={closePdfViewer}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="pdf-viewer">
              {pdfLoading ? (
                <div className="pdf-loading">
                  <div className="pdf-loading-spinner"></div>
                  <p>PDF yükleniyor...</p>
                </div>
              ) : (
                <iframe
                  src={`${selectedPdf.localPath}#toolbar=1&navpanes=1&scrollbar=1`}
                  title={selectedPdf.title}
                  width="100%"
                  height="100%"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BelgelerRaporlar;
