import React, { useState, useEffect } from 'react';
import './Sozler.css';

const Sozler = () => {
  const [documentsWithQuotes, setDocumentsWithQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // JSON veritabanından veri yükle ve parse et
  useEffect(() => {
    fetch('/sozler.json')
      .then(response => response.json())
      .then(data => {
        // Her dokümandaki paragrafları ayrıştır
        const parsed = data.documents.map(doc => {
          const parser = new DOMParser();
          const htmlDoc = parser.parseFromString(doc.content, 'text/html');
          const paragraphs = htmlDoc.querySelectorAll('p');
          
          const quotes = [];
          paragraphs.forEach((p, index) => {
            const text = p.innerHTML.trim();
            // Boş paragrafları ve başlık paragrafını atla
            if (text && text.length > 20 && !text.startsWith('<strong>6-10 Şubat') && !text.startsWith('<strong>Tefrik dosyasının')) {
              quotes.push({
                id: `${doc.id}_${index}`,
                text: text
              });
            }
          });
          
          return {
            id: doc.id,
            title: doc.title,
            quotes: quotes
          };
        });
        
        setDocumentsWithQuotes(parsed);
        setLoading(false);
      })
      .catch(error => {
        console.error('Sözler veritabanı yüklenemedi:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="sozler-page">
        <div className="sozler-header">
          <h1>DURUŞMA TUTANAKLARINDAN ALINMIŞTIR</h1>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sozler-page">
      <div className="sozler-header">
        <h1>DURUŞMA TUTANAKLARINDAN ALINMIŞTIR</h1>
        <p className="sozler-subtitle">Davanın Sahipleri Konuşuyor</p>
      </div>

      <div className="sozler-content">
        {documentsWithQuotes.map((doc) => (
          <div key={doc.id} className="document-section">
            <div className="document-section-header">
              <h2>{doc.title}</h2>
            </div>
            
            <div className="quotes-list">
              {doc.quotes.map((quote) => (
                <div key={quote.id} className="quote-card">
                  <div className="quote-icon">❝</div>
                  <div 
                    className="quote-text"
                    dangerouslySetInnerHTML={{ __html: quote.text }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="sozler-footer">
        <p className="footer-note">
          Bu sözler, 10 Ekim Ankara Gar Katliamı davası duruşmalarında müşteki aileler 
          tarafından yapılan beyanlardan alınmıştır. Her kelime, adalet mücadelesinin 
          ve yitirilen canların anısının bir parçasıdır.
        </p>
      </div>
    </div>
  );
};

export default Sozler;

