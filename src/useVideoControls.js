import { useRef, useEffect } from 'react';

const useVideoControls = (setShowPoetry) => {
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
        if (video.currentTime < 1) {
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

      return { videoRef, handleVideoLoad, handleVideoPlay, handleVideoPause };
};

export default useVideoControls;