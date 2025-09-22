import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MemoryTransition.css';

const MemoryTransition = ({ isVisible, onComplete, onReturnHome }) => {
  const [phase, setPhase] = useState('hidden'); // hidden -> fade -> message -> button -> complete
  const navigate = useNavigate();

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
              10 Ekim'i
              <br />
              <span className="highlight">Hatırla</span>
            </h1>
            
            <p className="subtitle">
              104 canımızı kaybettik
              <br />
              Hafızalarını yaşatalım
            </p>
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
