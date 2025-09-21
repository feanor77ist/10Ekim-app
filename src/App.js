import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import './Navigation.css';

import videoSource from "./images/short2.mp4";
import Navigation from './Navigation';
import Header from './components/Header';
import Video from './Video';
import Poetry from './Poetry';
import useVideoControls from './useVideoControls';
import MyTypewriter from './TypeWriter';
import Timeline from './pages/Timeline'; // Timeline bileşenini ekliyoruz
import MemoryArchive from './pages/MemoryArchive'; // Hafıza arşivi bileşenini ekliyoruz
import Haberler from './pages/Haberler'; // Haberler sayfası bileşeni
import Hakkinda from './pages/Hakkinda'; // Hakkında sayfası bileşeni
import MemoryTransition from './components/MemoryTransition'; // Sinematik geçiş bileşeni

function HomePage() {
  const [showPoetry, setShowPoetry] = React.useState(false);
  const [showMemoryTransition, setShowMemoryTransition] = React.useState(false);
  const { videoRef, audioRef, handleVideoLoad, handleVideoPlay, handleVideoPause, resetVideoState } = useVideoControls(setShowPoetry, setShowMemoryTransition);

  return (
    <div className="app-container">
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
      <Poetry isVisible={showPoetry} />
      
      {/* Sinematik geçiş bileşeni */}
      <MemoryTransition 
        isVisible={showMemoryTransition}
        onComplete={() => setShowMemoryTransition(false)}
        onReturnHome={resetVideoState}
      />
      
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hafiza-arsivi" element={<MemoryArchive />} />
        <Route path="/surec" element={<Timeline />} />
        <Route path="/hakkinda" element={<Hakkinda />} />
        <Route path="/kararlar" element={<div>Kararlar Sayfası</div>} />
        <Route path="/belgeler-raporlar" element={<div>Belgeler & Raporlar Sayfası</div>} />
        <Route path="/haberler" element={<Haberler />} />
        <Route path="/gorseller" element={<div>Görseller Sayfası</div>} />
        <Route path="/yitirdiklerimiz" element={<div>Yitirdiklerimiz Sayfası</div>} />
        {/* Diğer sayfaları buraya ekleyebilirsin */}
      </Routes>
    </Router>
  );
}

export default App;
