import React, { useState } from 'react';
import './Aciklamalar.css';

const Aciklamalar = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const documents = [
    {
      id: 1,
      title: "Tefrik Karar Açıklaması",
      filename: "03.07.2024-Tefrik Karar açıklaması.pdf",
      date: "03.07.2024",
      sortDate: "2024-07-03",
      description: "Tefrik kararı ile ilgili basın açıklaması.",
      category: "Tefrik"
    },
    {
      id: 2,
      title: "Tefrik Gerekçeli Karar Açıklaması",
      filename: "13.09.2024-Tefrik Gerekçeli karar açıklaması.pdf",
      date: "13.09.2024",
      sortDate: "2024-09-13",
      description: "Tefrik gerekçeli karar ile ilgili basın açıklaması.",
      category: "Tefrik"
    },
    {
      id: 3,
      title: "9. Yıl Anma Açıklaması",
      filename: "10.10.2024-9.YIL ANMA açıklama.pdf",
      date: "10.10.2024",
      sortDate: "2024-10-10",
      description: "10 Ekim Ankara Gar Katliamı'nın 9. yılı anma açıklaması.",
      category: "Anma"
    },
    {
      id: 4,
      title: "AYM Kabul Edilmezlik Açıklaması",
      filename: "21.05.2024-AYM Kabul edilmezlik Açıklama.pdf",
      date: "21.05.2024",
      sortDate: "2024-05-21",
      description: "Anayasa Mahkemesi kabul edilmezlik kararı açıklaması.",
      category: "AYM"
    },
    {
      id: 5,
      title: "Tefrik Mütalaa Açıklaması",
      filename: "24.04.2024- Tefrik Mütalaa açıklama.pdf",
      date: "24.04.2024",
      sortDate: "2024-04-24",
      description: "Tefrik mütalaa ile ilgili basın açıklaması.",
      category: "Tefrik"
    },
    {
      id: 6,
      title: "Ankara Emniyet Kayıp Klasörler Suç Duyurusu Açıklaması",
      filename: "23.11.2022- Ankara Emniyet-kayıp klasörler suç duyurusu açıklaması.pdf",
      date: "23.11.2022",
      sortDate: "2022-11-23",
      description: "Ankara Emniyet'te kayıp klasörler ile ilgili suç duyurusu açıklaması.",
      category: "Suç Duyurusu"
    },
    {
      id: 7,
      title: "7. Yıl Anma Açıklaması",
      filename: "10.10.2022-7.Yıl Anma Açıklama.pdf",
      date: "10.10.2022",
      sortDate: "2022-10-10",
      description: "10 Ekim Ankara Gar Katliamı'nın 7. yılı anma açıklaması.",
      category: "Anma"
    },
    {
      id: 8,
      title: "7. Yıl Raporu - Adaleti Aratmamak",
      filename: "06.10.2022-7.YIL raporu-ADALETİ ARATMAMAK.pdf",
      date: "06.10.2022",
      sortDate: "2022-10-06",
      description: "7. yıl raporu: Adaleti Aratmamak başlıklı açıklama.",
      category: "Rapor"
    },
    {
      id: 9,
      title: "Ümit Özdağ Açıklaması",
      filename: "09.05.2022-ÜMİT ÖZDAĞ AÇIKLAMA.pdf",
      date: "09.05.2022",
      sortDate: "2022-05-09",
      description: "Ümit Özdağ ile ilgili basın açıklaması.",
      category: "Kişisel"
    },
    {
      id: 10,
      title: "Ümit Özdağ Suç Duyurusu Açıklaması",
      filename: "05.07.2022-Ümit Özdağ Suç Duyurusu Açıklama.pdf",
      date: "05.07.2022",
      sortDate: "2022-07-05",
      description: "Ümit Özdağ ile ilgili suç duyurusu açıklaması.",
      category: "Suç Duyurusu"
    },
    {
      id: 11,
      title: "İDDK Kararı Açıklaması",
      filename: "17.01.2023-iddk kararı açıklama.pdf",
      date: "17.01.2023",
      sortDate: "2023-01-17",
      description: "İdari Dava Daireleri Kurulu kararı açıklaması.",
      category: "İdari"
    },
    {
      id: 12,
      title: "Yargıtay Tebliğname Açıklaması",
      filename: "06.04.2021- Yargıtay tebliğname açıklama.pdf",
      date: "06.04.2021",
      sortDate: "2021-04-06",
      description: "Yargıtay tebliğname ile ilgili basın açıklaması.",
      category: "Yargıtay"
    },
    {
      id: 13,
      title: "Yakalanan IŞİD'liler Açıklaması",
      filename: "22.09.2021-YAKALANAN IŞİDLİLER.pdf",
      date: "22.09.2021",
      sortDate: "2021-09-22",
      description: "Yakalanan IŞİD'liler ile ilgili basın açıklaması.",
      category: "Güvenlik"
    },
    {
      id: 14,
      title: "Adalete Açık Çağrı",
      filename: "22.11.2021-Adalete Açık Çağrı.pdf",
      date: "22.11.2021",
      sortDate: "2021-11-22",
      description: "Adalete açık çağrı başlıklı basın açıklaması.",
      category: "Genel"
    },
    {
      id: 15,
      title: "Savcılar AYM Başvuru Açıklaması",
      filename: "26.11.2021-savcılar aym başvuru açıklama.pdf",
      date: "26.11.2021",
      sortDate: "2021-11-26",
      description: "Savcıların AYM başvurusu ile ilgili açıklama.",
      category: "AYM"
    },
    {
      id: 16,
      title: "Danıştay Kararı Açıklaması",
      filename: "10.08.2021-Danıştay Kararı Açıklama.pdf",
      date: "10.08.2021",
      sortDate: "2021-08-10",
      description: "Danıştay kararı ile ilgili basın açıklaması.",
      category: "Danıştay"
    },
    {
      id: 17,
      title: "Antep Emniyeti Suç Duyurusu",
      filename: "27.01.2021- Antep Emniyeti Suç Duyurusu.pdf",
      date: "27.01.2021",
      sortDate: "2021-01-27",
      description: "Antep Emniyeti ile ilgili suç duyurusu açıklaması.",
      category: "Suç Duyurusu"
    },
    {
      id: 18,
      title: "Hulusi Akar Açıklamalarına İlişkin",
      filename: "14.11.2020- Hulusi Akar açıklamalarına ilişkin.pdf",
      date: "14.11.2020",
      sortDate: "2020-11-14",
      description: "Hulusi Akar'ın açıklamalarına ilişkin basın açıklaması.",
      category: "Kişisel"
    },
    {
      id: 19,
      title: "Heyet Değişikliği Açıklaması",
      filename: "29.12.2020-heyet değişikliği açıklama.pdf",
      date: "29.12.2020",
      sortDate: "2020-12-29",
      description: "Heyet değişikliği ile ilgili basın açıklaması.",
      category: "Genel"
    },
    {
      id: 20,
      title: "Adem Arslanoğlu Açıklaması",
      filename: "15.08.2020-adem arslanoğlu açıklama.pdf",
      date: "15.08.2020",
      sortDate: "2020-08-15",
      description: "Adem Arslanoğlu ile ilgili basın açıklaması.",
      category: "Kişisel"
    },
    {
      id: 21,
      title: "Davutoğlu Açıklaması",
      filename: "15.06.2020- Davutoğlu açıklama.pdf",
      date: "15.06.2020",
      sortDate: "2020-06-15",
      description: "Davutoğlu ile ilgili basın açıklaması.",
      category: "Kişisel"
    },
    {
      id: 22,
      title: "İlhami Balı Açıklaması",
      filename: "13.09.2019-İlhami Balı Açıklama.pdf",
      date: "13.09.2019",
      sortDate: "2019-09-13",
      description: "İlhami Balı ile ilgili basın açıklaması.",
      category: "Kişisel"
    },
    {
      id: 23,
      title: "Gerekçeli Karar Açıklaması",
      filename: "22.02.2019-Gerekçeli karar açıklama.pdf",
      date: "22.02.2019",
      sortDate: "2019-02-22",
      description: "Gerekçeli karar ile ilgili basın açıklaması.",
      category: "Genel"
    },
    {
      id: 24,
      title: "Ana Dava Mütalaa Açıklaması",
      filename: "18.06.2018-Ana Dava Mütalaa Açıklama.pdf",
      date: "18.06.2018",
      sortDate: "2018-06-18",
      description: "Ana dava mütalaa ile ilgili basın açıklaması.",
      category: "Dava"
    },
    {
      id: 25,
      title: "Kısıtlılık AYM Kararı Açıklaması",
      filename: "07.12.2018- Kısıtlılık AYM kararı açıklama.pdf",
      date: "07.12.2018",
      sortDate: "2018-12-07",
      description: "Kısıtlılık AYM kararı ile ilgili basın açıklaması.",
      category: "AYM"
    }
  ];

  // Tarih sıralaması (azalan - en yeni önce)
  const sortedDocuments = documents.sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate));

  const categories = [...new Set(documents.map(doc => doc.category))];

  const handleDocumentClick = (document) => {
    setSelectedDocument(document);
  };

  const closeDocumentViewer = () => {
    setSelectedDocument(null);
  };

  const downloadDocument = (filename) => {
    const link = document.createElement('a');
    link.href = `/basın açıklamaları/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCategoryFilter = (category) => {
    setActiveCategory(category);
  };

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredDocuments = activeCategory === 'all' 
    ? sortedDocuments 
    : sortedDocuments.filter(doc => doc.category === activeCategory);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Tefrik':
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'Anma':
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'AYM':
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'Suç Duyurusu':
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
      case 'Tefrik':
        return '#4ecdc4';
      case 'Anma':
        return '#ff6b6b';
      case 'AYM':
        return '#45b7d1';
      case 'Suç Duyurusu':
        return '#ffa726';
      case 'Yargıtay':
        return '#66bb6a';
      case 'Danıştay':
        return '#ab47bc';
      case 'İdari':
        return '#26a69a';
      case 'Güvenlik':
        return '#ef5350';
      case 'Dava':
        return '#42a5f5';
      case 'Rapor':
        return '#8d6e63';
      case 'Kişisel':
        return '#78909c';
      case 'Genel':
        return '#96ceb4';
      default:
        return '#ffa726';
    }
  };

  const getCategoryDisplayName = (category) => {
    return category;
  };

  return (
    <div className="aciklamalar-container">
      <div className="aciklamalar-header">
        <h1>BASIN AÇIKLAMALARI</h1>
        <p className="aciklamalar-subtitle">
          10 Ekim Ankara Gar Katliamı ile ilgili basın açıklamaları ve resmi duyurular
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

      <div className="aciklamalar-grid">
        {filteredDocuments.map((document) => (
          <div key={document.id} className="document-card" data-category={document.category}>
            <div className="document-header">
              <div className="document-icon" style={{ color: getCategoryColor(document.category) }}>
                {getCategoryIcon(document.category)}
              </div>
              <div className="document-category" style={{ backgroundColor: getCategoryColor(document.category) + '20', color: getCategoryColor(document.category) }}>
                {getCategoryDisplayName(document.category)}
              </div>
            </div>
            <div className="document-content">
              <h3 className="document-title">{document.title}</h3>
              <p className="document-date">Tarih: {document.date}</p>
              <p className="document-description">{document.description}</p>
              <div className="document-actions">
                <button 
                  className="view-btn"
                  onClick={() => handleDocumentClick(document)}
                >
                  Görüntüle
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Document Viewer Modal */}
      {selectedDocument && (
        <div className="document-modal-overlay" onClick={closeDocumentViewer}>
          <div className="document-modal" onClick={(e) => e.stopPropagation()}>
            <div className="document-modal-header">
              <h3>{selectedDocument.title}</h3>
              <button className="close-btn" onClick={closeDocumentViewer}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="document-viewer">
              <iframe
                src={`/basın açıklamaları/${selectedDocument.filename}#toolbar=1&navpanes=1&scrollbar=1`}
                title={selectedDocument.title}
                width="100%"
                height="100%"
              />
            </div>
            <div className="document-modal-footer">
              <button 
                className="download-btn"
                onClick={() => downloadDocument(selectedDocument.filename)}
              >
                Belgeyi İndir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Aciklamalar;
