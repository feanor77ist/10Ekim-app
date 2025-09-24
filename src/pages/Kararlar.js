import React, { useState } from 'react';
import './Kararlar.css';

const Kararlar = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);

  const pdfFiles = [
    {
      id: 1,
      title: "Ankara 4. Ağır Ceza Mahkemesi 2016/232 Gerekçeli Karar",
      filename: "ANKARA 4 AĞIR CEZA MAH 2016 232 GEREKÇELİ KARAR.pdf",
      description: "2016 yılında Ankara 4. Ağır Ceza Mahkemesi tarafından verilen gerekçeli karar."
    },
    {
      id: 2,
      title: "Ankara 4. Ağır Ceza Mahkemesi 2018/287 Gerekçeli Karar",
      filename: "ANKARA 4 AĞIR CEZA MAH 2018 287 GEREKÇELİ KARAR.pdf",
      description: "2018 yılında Ankara 4. Ağır Ceza Mahkemesi tarafından verilen gerekçeli karar."
    },
    {
      id: 3,
      title: "Ankara Bölge Adliye Mahkemesi Gerekçeli Karar",
      filename: "ANKARA BÖLGE ADLİYE MAHKEMESİ GEREKÇELİ KARAR.pdf",
      description: "Ankara Bölge Adliye Mahkemesi tarafından verilen gerekçeli karar."
    },
    {
      id: 4,
      title: "İddianame",
      filename: "İDDİANAME.pdf",
      description: "Dava sürecinde hazırlanan iddianame belgesi."
    }
  ];

  const handlePdfClick = (pdf) => {
    setSelectedPdf(pdf);
  };

  const closePdfViewer = () => {
    setSelectedPdf(null);
  };

  const downloadPdf = (filename) => {
    const link = document.createElement('a');
    link.href = `/kararlar/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
              <iframe
                src={`/kararlar/${selectedPdf.filename}#toolbar=1&navpanes=1&scrollbar=1`}
                title={selectedPdf.title}
                width="100%"
                height="100%"
              />
            </div>
            <div className="pdf-modal-footer">
              <button 
                className="download-btn"
                onClick={() => downloadPdf(selectedPdf.filename)}
              >
                PDF'yi İndir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kararlar;
