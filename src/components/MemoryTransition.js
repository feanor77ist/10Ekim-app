import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './MemoryTransition.css';

const MemoryTransition = ({ isVisible, onComplete, onReturnHome }) => {
  const [phase, setPhase] = useState('hidden'); // hidden -> fade -> message -> button -> complete
  const [activeQuotes, setActiveQuotes] = useState([]);
  const [quotesData, setQuotesData] = useState([]);
  const [usedQuoteIds, setUsedQuoteIds] = useState(new Set());
  const navigate = useNavigate();

  // Family quotes veri yükleme
  useEffect(() => {
    fetch('/family_quotes.json')
      .then(response => response.json())
      .then(data => setQuotesData(data))
      .catch(error => console.error('Family quotes yüklenemedi:', error));
  }, []);

  // Çizilen alanlara karşılık gelen sabit pozisyonlar
  const getFixedPositions = (isMobile = false) => {
    if (isMobile) {
      return [
        // Mobil - üstte 2, altta 2 konum (daha rahat yerleşim)
        { x: 10, y: 18 },  // Sol üst - daha içeride
        { x: 65, y: 18 },  // Sağ üst - daha az sıkışmış  
        { x: 15, y: 78 },  // Sol alt - daha içeride
        { x: 60, y: 78 },  // Sağ alt - daha az sıkışmış
      ];
    } else {
      return [
        // Desktop - çizilen turuncu alanlara göre
        { x: 8, y: 18 },   // Sol üst - başlığın solunda
        { x: 88, y: 18 },  // Sağ üst - başlığın sağında
        { x: 12, y: 45 },  // Sol orta - ana içeriğin solunda
        { x: 85, y: 45 },  // Sağ orta - ana içeriğin sağında
        { x: 15, y: 72 },  // Sol alt - butonun sol altında
        { x: 80, y: 72 },  // Sağ alt - butonun sağ altında
        { x: 45, y: 85 },  // Alt merkez - butonun altında
      ];
    }
  };

  // Kullanılmayan pozisyon seç (üst üste çıkma önleme)
  const getAvailablePosition = useCallback((isMobile = false) => {
    const allPositions = getFixedPositions(isMobile);
    
    // Şu anda aktif quotes'ların pozisyonlarını al
    const usedPositions = activeQuotes.map(quote => quote.position);
    
    // Kullanılmayan pozisyonları filtrele
    const availablePositions = allPositions.filter(pos => 
      !usedPositions.some(used => 
        Math.abs(pos.x - used.x) < 5 && Math.abs(pos.y - used.y) < 5
      )
    );
    
    // Eğer tüm pozisyonlar doluysa, rastgele bir pozisyon döndür
    if (availablePositions.length === 0) {
      return allPositions[Math.floor(Math.random() * allPositions.length)];
    }
    
    // Kullanılmayan pozisyonlardan rastgele seç
    return availablePositions[Math.floor(Math.random() * availablePositions.length)];
  }, [activeQuotes]);

  // Rastgele quote ekleme sistemi
  useEffect(() => {
    if (!isVisible || quotesData.length === 0 || phase === 'hidden' || phase === 'fade') return;

    const isMobile = window.innerWidth <= 768;
    const maxConcurrentQuotes = isMobile ? 2 : 3; // Mobil 2, Desktop 3 eş zamanlı
    const quoteInterval = isMobile ? 3500 : 2800; // Dengeli akış
    
    const addRandomQuote = () => {
      if (activeQuotes.length >= maxConcurrentQuotes) return;

      // Henüz kullanılmamış quotes'ları filtrele
      const availableQuotes = quotesData.filter(quote => !usedQuoteIds.has(quote.id));
      
      // Eğer tüm quotes kullanıldıysa, reset et
      if (availableQuotes.length === 0) {
        setUsedQuoteIds(new Set());
        return;
      }

      // Rastgele bir kullanılmamış quote seç
      const selectedQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
      
      // Kullanılmayan pozisyon seç
      const position = getAvailablePosition(isMobile);
      
      const rotation = (Math.random() - 0.5) * 8; // -4 to +4 degrees (daha az döndürme)
      const duration = 6 + Math.random() * 3; // 6-9 saniye (daha uzun görünür)

      const newQuote = {
        id: `quote-${selectedQuote.id}-${Date.now()}`, // Unique key için
        originalId: selectedQuote.id,
        text: selectedQuote.text,
        author: selectedQuote.author,
        position,
        rotation,
        duration
      };

      setActiveQuotes(prev => [...prev, newQuote]);
      setUsedQuoteIds(prev => new Set([...prev, selectedQuote.id]));

      // Quote'u otomatik kaldır
      setTimeout(() => {
        setActiveQuotes(prev => prev.filter(q => q.id !== newQuote.id));
      }, duration * 1000);
    };

    const interval = setInterval(addRandomQuote, quoteInterval);
    
    // Fazlara göre gecikmeli başlangıç
    if (phase === 'message') {
      setTimeout(addRandomQuote, 3000); // Message fazında 3 saniye bekle
    } else if (phase === 'button') {
      setTimeout(addRandomQuote, 2000); // Button fazında 2 saniye bekle
    }

    return () => clearInterval(interval);
  }, [isVisible, quotesData, phase, activeQuotes.length, getAvailablePosition, usedQuoteIds]);

  // Cleanup when component unmounts or becomes invisible
  useEffect(() => {
    if (!isVisible) {
      setActiveQuotes([]);
      setUsedQuoteIds(new Set());
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const sequence = async () => {
      // Faz 1: Karartma
      setPhase('fade');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Faz 2: Mesaj göster
      setPhase('message');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Faz 3: Buton göster
      setPhase('button');
    };

    sequence();
  }, [isVisible]);

  const handleEnterArchive = () => {
    setPhase('complete');
    
    setTimeout(() => {
      navigate('/hafiza-arsivi');
      onComplete && onComplete();
    }, 1000);
  };

  const handleExitToHome = () => {
    setPhase('complete');
    
    setTimeout(() => {
      navigate('/');
      onComplete && onComplete();
      // Video state'ini sıfırla
      onReturnHome && onReturnHome();
    }, 1000);
  };

  if (!isVisible) return null;

  return (
    <div className={`memory-transition ${phase}`}>
      <div className="transition-overlay">
        
        {/* Karartma katmanı */}
        <div className="fade-layer"></div>
        
        {/* Ana mesaj */}
        <div className="transition-content">
          <div className="memory-message">
            <h1 className="main-title">
              <span className="highlight-text">Mahkeme kararlarında</span>
              <br />
              <span className="regular-text">yer almayan her şey</span>
              <br />
              <span className="highlight-text">hafızalarımızda</span>
            </h1>
          </div>
          
          {/* Çıkış ikonu */}
          <button 
            className="exit-icon"
            onClick={handleExitToHome}
            title="Çıkış"
          >
            ✕
          </button>

          {/* Aksiyon butonları */}
          <div className="action-container">
            <div className="buttons-row">
              <button 
                className="memory-button primary"
                onClick={handleEnterArchive}
              >
                <span className="button-text">HAFIZA MEYDANINA GİT</span>
              </button>
            </div>
            
            <p className="instruction">
              360° interaktif hafıza deneyimi
            </p>
          </div>
        </div>

        {/* Floating Quotes */}
        <div className="floating-quotes-container">
          {activeQuotes.map((quote) => (
            <div
              key={quote.id}
              className="floating-quote"
              style={{
                left: `${quote.position.x}%`,
                top: `${quote.position.y}%`,
                '--rotation': `${quote.rotation}deg`,
                '--duration': `${quote.duration}s`,
                '--delay': '0s'
              }}
            >
              <div className="floating-quote-text">
                {quote.text.length > 120 ? 
                  `${quote.text.substring(0, 120)}...` : 
                  quote.text
                }
              </div>
              <div className="floating-quote-author">
                — {quote.author}
              </div>
            </div>
          ))}
        </div>

        {/* Animasyonlu partiküller */}
        <div className="memory-particles">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                '--delay': `${i * 0.3}s`,
                '--duration': `${3 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryTransition;
