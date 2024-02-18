import React, { useState, useRef, useEffect } from 'react';
import './App.css'; // Ana Stil dosyası yolu
import videoSource from "./images/short.mp4"
import Poem from './poem';
import Navigation from './Navigation';
import './Navigation.css'; // NavBar Stil dosyası yolu

// Video bileşeni
const Video = React.forwardRef(({ src, onVideoLoad, onVideoEnd, onVideoPlay }, ref) => (
  <div className="video-container">
    <video 
      autoPlay 
      loop 
      muted 
      onLoadedMetadata={onVideoLoad} 
      onEnded={onVideoEnd}
      onPlay={onVideoPlay}
      ref={ref}
    >
      <source src={videoSource} type="video/mp4" />
      Tarayıcınız video etiketini desteklemiyor.
    </video>
  </div>
));

// Şiir bileşeni
const Poetry = ({ isVisible }) => {
  const containerClasses = `poetry-container ${isVisible ? 'visible' : ''}`;

  return (
    <div className={containerClasses}>
      <Poem />
    </div>
  );
};

// Uygulamanın ana bileşeni
function App() {
  const [showPoetry, setShowPoetry] = useState(false);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const poetryTimerRef = useRef(null);

  const checkVideoTime = () => {
    const video = videoRef.current;
    if (!video) return;

    const timeLeft = video.duration - video.currentTime;

    // Eğer video sona ermek üzereyse şiiri gizle
    if (timeLeft < 1) {
      setShowPoetry(false);
    }

    // Video döngü başına döndüğünde şiiri yeniden göster
    if (video.currentTime < 1 && !showPoetry) {
      setShowPoetryAfterDelay();
    }
  };

  const handleVideoLoad = () => {
    setShowPoetryAfterDelay();
    intervalRef.current = setInterval(checkVideoTime, 500); // Her 500 ms'de bir kontrol et
  };

  const handleVideoPlay = () => {
    if (!poetryTimerRef.current) {
      setShowPoetryAfterDelay();
    }
    if (!intervalRef.current) {
      intervalRef.current = setInterval(checkVideoTime, 500);
    }
  };

  const handleVideoPause = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    clearTimeout(poetryTimerRef.current);
    poetryTimerRef.current = null;
  };

  const setShowPoetryAfterDelay = () => {
    clearTimeout(poetryTimerRef.current);
    poetryTimerRef.current = setTimeout(() => {
      setShowPoetry(true);
    }, 6000);
  };

  // Komponent unmount olduğunda interval ve timeout'ları temizle
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (poetryTimerRef.current) {
        clearTimeout(poetryTimerRef.current);
      }
    };
  }, []);

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

