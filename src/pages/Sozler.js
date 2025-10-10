import React, { useState, useEffect } from 'react';
import './Sozler.css';

const Sozler = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // JSON veritabanından veri yükle
  useEffect(() => {
    fetch('/sozler.json')
      .then(response => response.json())
      .then(data => {
        setDocuments(data.documents);
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
        {documents.map((doc) => (
          <div key={doc.id} className="sozler-document">
            <div className="document-header">
              <h2>{doc.title}</h2>
            </div>
            
            <div 
              className="document-content"
              dangerouslySetInnerHTML={{ __html: doc.content }}
            />
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

