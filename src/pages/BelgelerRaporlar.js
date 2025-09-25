import React, { useState } from 'react';
import './BelgelerRaporlar.css';

const BelgelerRaporlar = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const pdfFiles = [
    {
      id: 1,
      title: "EGM Mülkiye Müfetişleri Araştırma Raporu",
      filename: "1-Araştırma Raporu.pdf",
      description: "10 Ekim Ankara Gar Katliamı ile ilgili detaylı araştırma raporu. Tarih: 24.02.2017",
      category: "Araştırma"
    },
    {
      id: 2,
      title: "EGM Mülkiye Müfetişleri Araştırma Raporu Ekleri",
      filename: "2-Araştırma Raporu Ekleri .pdf",
      description: "Araştırma raporuna ait ek belgeler ve dokümanlar.",
      category: "Araştırma"
    },
    {
      id: 3,
      title: "EGM Mülkiye Müfetişleri Disiplin Raporu",
      filename: "Disiplin Raporu .pdf",
      description: "Olayla ilgili disiplin soruşturması raporu. Tarih: 26.02.2016",
      category: "Disiplin"
    },
    {
      id: 4,
      title: "EGM Mülkiye Müfetişleri İnceleme Raporu",
      filename: "İnceleme Raporu .pdf",
      description: "Olayın detaylı inceleme raporu ve bulguları. Tarih: 13.10.2015",
      category: "İnceleme"
    },
    {
      id: 5,
      title: "EGM Mülkiye Müfetişleri İnceleme Raporu (2016)",
      filename: "İnceleme Raporu.pdf",
      description: "İnceleme raporunun 2016 tarihli versiyonu. Tarih: 26.02.2016",
      category: "İnceleme"
    },
    {
      id: 6,
      title: "EGM Mülkiye Müfettişleri Ön İnceleme Raporu",
      filename: "MÜLKİYE MÜFETTİŞLERİ ÖN İNCELEME RAPORU.pdf",
      description: "Mülkiye müfettişleri tarafından hazırlanan ön inceleme raporu. Tarih: 25.02.2016",
      category: "Müfettişlik"
    }
  ];
  
  // Yeni eklenen PDF'ler
  pdfFiles.push(
    {
      id: 7,
      title: "10 Ekim Raporu (Avukatlar)",
      filename: "10-EKİM-RAPORU (avukatlar).pdf",
      description: "10 Ekim davasına ilişkin avukatlar raporu.",
      category: "Rapor"
    },
    {
      id: 8,
      title: "Hukuki Mütalaa (Dr. Barış Işık)",
      filename: "HUKUKİ MÜTALAA Dr. Barış IŞIK.pdf",
      description: "10 Ekim dosyasına ilişkin hukuki mütalaa (Dr. Barış Işık).",
      category: "Mütalaa"
    },
    {
      id: 9,
      title: "TTB 10 Ekim Raporu",
      filename: "TTB 10 ekim rapor.pdf",
      description: "Türk Tabipleri Birliği tarafından hazırlanan 10 Ekim raporu.",
      category: "Rapor"
    },
    {
      id: 10,
      title: "ÖHD Raporu",
      filename: "ÖHD RAPOR.pdf",
      description: "Özgür Hukukçular Derneği tarafından hazırlanan rapor.",
      category: "Rapor"
    },
    {
      id: 11,
      title: "İnsanlığa Karşı Suç Hukuki Mütalaa (Dr. Murat Önok)",
      filename: "İNSANLIĞA KARŞI SUÇ HUKUKİ MÜTALAA DR. MURAT ÖNOK.pdf",
      description: "İnsanlığa karşı suç kapsamında hukuki mütalaa (Dr. Murat Önok).",
      category: "Mütalaa"
    }
  );

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

  const handlePdfClick = (pdf) => {
    setSelectedPdf(pdf);
  };

  const closePdfViewer = () => {
    setSelectedPdf(null);
  };

  const downloadPdf = (filename) => {
    const link = document.createElement('a');
    link.href = `/belgeler-raporlar/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
                src={`/belgeler-raporlar/${selectedPdf.filename}#toolbar=1&navpanes=1&scrollbar=1`}
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

export default BelgelerRaporlar;
