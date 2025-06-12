import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import './Navigation.css';

import videoSource from "./images/short2.mp4";
import Navigation from './Navigation';
import Video from './Video';
import Poetry from './Poetry';
import useVideoControls from './useVideoControls';
import MyTypewriter from './TypeWriter';
import Timeline from './pages/Timeline'; // Timeline bileşenini ekliyoruz

function HomePage() {
  const [showPoetry, setShowPoetry] = React.useState(false);
  const { videoRef, handleVideoLoad, handleVideoPlay, handleVideoPause } = useVideoControls(setShowPoetry);

  return (
    <div className="app-container">
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
      />
      <Poetry isVisible={showPoetry} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/surec" element={<Timeline />} />
        {/* Diğer sayfaları buraya ekleyebilirsin */}
      </Routes>
    </Router>
  );
}

export default App;
