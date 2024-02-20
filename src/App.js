import React, { useState, useRef, useEffect } from 'react';
import './App.css'; // Ana Stil dosyası yolu
import videoSource from "./images/short.mp4"
import Navigation from './Navigation';
import './Navigation.css'; // NavBar Stil dosyası yolu
import Video from './Video';
import Poetry from './Poetry';
import useVideoControls from './useVideoControls';

// Uygulamanın ana bileşeni
function App() {
  const [showPoetry, setShowPoetry] = useState(false);
  const { videoRef, handleVideoLoad, handleVideoPlay, handleVideoPause } = useVideoControls(setShowPoetry);

  return (
    <div className="app-container">
      <Navigation />
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

export default App;

