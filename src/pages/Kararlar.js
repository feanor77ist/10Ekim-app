import React, { useState, useEffect } from 'react';
import './Kararlar.css';

const Kararlar = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // JSON veritabanından veri yükle
  useEffect(() => {
    fetch('/pdf_database.json')
      .then(response => response.json())
      .then(data => {
        setPdfFiles(data.kararlar);
        setLoading(false);
      })
      .catch(error => {
        console.error('PDF veritabanı yüklenemedi:', error);
        setLoading(false);
      });
  }, []);

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

  if (loading) {
    return (
      <div className="kararlar-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>PDF verileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="kararlar-container">
      <div className="kararlar-header">
        <h1>KARARLAR</h1>
        <p className="kararlar-subtitle">
          10 Ekim Ankara Gar Katliamı davasına ilişkin mahkeme kararları ve belgeler
        </p>
      </div>

      <div className="kararlar-grid">
        {pdfFiles.map((pdf) => (
          <div key={pdf.id} className="pdf-card">
            <div className="pdf-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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

export default Kararlar;
