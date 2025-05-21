import React, { useState } from 'react';
import './App.css'; // Ana Stil dosyası yolu
import videoSource from "./images/short2.mp4"
import Navigation from './Navigation';
import './Navigation.css'; // NavBar Stil dosyası yolu
import Video from './Video';
import Poetry from './Poetry';
import useVideoControls from './useVideoControls';
import MyTypewriter from './TypeWriter';

// Uygulamanın ana bileşeni
function App() {
  const [showPoetry, setShowPoetry] = useState(false);
  const { videoRef, handleVideoLoad, handleVideoPlay, handleVideoPause } = useVideoControls(setShowPoetry);

  return (
    <div className="app-container">
      <div className="typewriter-container">
        <div className="typewriter-text">
          <MyTypewriter />
        </div>
      </div>
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

