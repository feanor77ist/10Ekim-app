import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import './App.css';
import './Navigation.css';

import videoSource from "./images/short2.mp4";
import Navigation from './Navigation';
import Header from './components/Header';
import Video from './Video';
import useVideoControls from './useVideoControls';
import MyTypewriter from './TypeWriter';
import Timeline from './pages/Timeline'; // Timeline bileşenini ekliyoruz
import MemoryArchive from './pages/MemoryArchive'; // Hafıza arşivi bileşenini ekliyoruz
import Haberler from './pages/Haberler'; // Haberler sayfası bileşeni
import Hakkinda from './pages/Hakkinda'; // Hakkında sayfası bileşeni
import Kararlar from './pages/Kararlar'; // Kararlar sayfası bileşeni
import BelgelerRaporlar from './pages/BelgelerRaporlar'; // Belgeler & Raporlar sayfası bileşeni
import Aciklamalar from './pages/Aciklamalar'; // Açıklamalar sayfası bileşeni
import MemoryTransition from './components/MemoryTransition'; // Sinematik geçiş bileşeni
import AnniversaryWritings from './pages/AnniversaryWritings'; // 10. yıl anma yazıları
import AnniversaryNotification from './components/AnniversaryNotification'; // Yazı bildirimi
import Sozler from './pages/Sozler'; // Davanın Sahipleri Konuşuyor sayfası
import SEO from './components/SEO'; // SEO meta tag'leri

function HomePage() {
  const [showMemoryTransition, setShowMemoryTransition] = React.useState(false);
  const { videoRef, audioRef, handleVideoLoad, handleVideoPlay, handleVideoPause, resetVideoState } = useVideoControls(setShowMemoryTransition);

  // Debug için
  React.useEffect(() => {
    console.log('showMemoryTransition state değişti:', showMemoryTransition);
  }, [showMemoryTransition]);

  return (
    <div className="app-container">
      <SEO 
        title="10 Ekim Davası"
        description="10 Ekim 2015 Ankara Gar Katliamı ile ilgili belgeler, haberler, yargı süreci ve adalet arayışının kapsamlı arşivi. 103 can, 500'den fazla yaralı. Adalet bekliyor."
        keywords="10 Ekim, Ankara Gar Katliamı, 10 Ekim 2015, adalet, dava, yargı süreci, insan hakları, barış mitingi, terör saldırısı"
        url="https://10ekimdavasi.com"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "10 Ekim Davası",
          "description": "10 Ekim Ankara Gar Katliamı ile ilgili belgeler, haberler ve yargı süreci arşivi",
          "url": "https://10ekimdavasi.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://10ekimdavasi.com/haberler?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />
      <Header />
      <div className="flash-screen"></div>
      <div className="typewriter-container">
        <div className="typewriter-text">
          <MyTypewriter />
        </div>
      </div>
      <Video 
        src={videoSource} 
        onVideoLoad={handleVideoLoad} 
        onVideoPlay={handleVideoPlay}
        onVideoPause={handleVideoPause}
        ref={videoRef}
        audioRef={audioRef}
        hideAudioButton={showMemoryTransition}
      />
      
      {/* Sinematik geçiş bileşeni */}
      <MemoryTransition 
        isVisible={showMemoryTransition}
        onComplete={() => setShowMemoryTransition(false)}
        onReturnHome={resetVideoState}
      />
      
      {/* 10. yıl anma yazıları bildirimi */}
      <AnniversaryNotification />
      
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hafiza-arsivi" element={<MemoryArchive />} />
          <Route path="/surec" element={<Timeline />} />
          <Route path="/hakkinda" element={<Hakkinda />} />
          <Route path="/kararlar" element={<Kararlar />} />
          <Route path="/belgeler-raporlar" element={<BelgelerRaporlar />} />
          <Route path="/haberler" element={<Haberler />} />
          <Route path="/aciklamalar" element={<Aciklamalar />} />
          <Route path="/sozler" element={<Sozler />} />
          <Route path="/gorseller" element={<div>Görseller Sayfası</div>} />
          <Route path="/yitirdiklerimiz" element={<div>Yitirdiklerimiz Sayfası</div>} />
          <Route path="/yazilar" element={<AnniversaryWritings />} />
          {/* Diğer sayfaları buraya ekleyebilirsin */}
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
