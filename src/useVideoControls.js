import { useRef, useEffect } from 'react';

const useVideoControls = (setShowPoetry, setShowMemoryTransition) => {
    const videoRef = useRef(null);
    const audioRef = useRef(null);
    const intervalRef = useRef(null);
    const poetryTimerRef = useRef(null);
    const loopCountRef = useRef(0);

    const checkVideoTime = () => {
        const video = videoRef.current;
        if (!video) return;
    
        const timeLeft = video.duration - video.currentTime;
    
        // Video her loop bittiğinde sayacı artır
        if (timeLeft < 0.5 && video.currentTime > video.duration - 1) {
          loopCountRef.current += 1;
          console.log(`Video loop sayısı: ${loopCountRef.current}`);
          
          // 1. loop sonrası sinematik geçişi başlat (son 3 saniyede)
          if (loopCountRef.current >= 1) {
            triggerMemoryTransition();
            return;
          }
        }
        
        // Video son 3 saniyeye geldiğinde ve loop sayısı 1'e ulaştığında geçişi başlat
        if (timeLeft <= 3 && loopCountRef.current >= 1) {
          triggerMemoryTransition();
          return;
        }
    
        // Eğer video sona ermek üzereyse şiiri gizle
        if (timeLeft < 1) {
          setShowPoetry(false);
        }
    
        // Video döngü başına döndüğünde şiiri yeniden göster
        if (video.currentTime < 1 && loopCountRef.current < 3) {
          setShowPoetryAfterDelay();
        }
      };

      const triggerMemoryTransition = () => {
        const video = videoRef.current;
        
        // Interval'ları temizle
        clearInterval(intervalRef.current);
        clearTimeout(poetryTimerRef.current);
        
        // Şiiri gizle
        setShowPoetry(false);
        
        // Memory transition'ı hemen göster - sinematik geçiş için
        if (setShowMemoryTransition) {
          setShowMemoryTransition(true);
        }
        
        // Video'yu biraz daha çaldıktan sonra durdur (overlap efekti için)
        setTimeout(() => {
          if (video) {
            video.pause();
            video.loop = false;
          }
        }, 2000); // 2 saniye daha video çalsın, sonra durdur
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
        }, 20000); //20 saniye sonra şiiri göster
      };

      const resetVideoState = () => {
        // Loop sayacını sıfırla
        loopCountRef.current = 0;
        
        // Tüm timer'ları temizle
        clearInterval(intervalRef.current);
        clearTimeout(poetryTimerRef.current);
        intervalRef.current = null;
        poetryTimerRef.current = null;
        
        // State'leri sıfırla
        setShowPoetry(false);
        setShowMemoryTransition(false);
        
        // Video'yu yeniden başlat
        const video = videoRef.current;
        if (video) {
          video.loop = true;
          video.currentTime = 0;
          video.play().catch(e => console.log('Video play error:', e));
        }
        
        // Yeni döngüyü başlat
        handleVideoLoad();
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

      return { videoRef, audioRef, handleVideoLoad, handleVideoPlay, handleVideoPause, resetVideoState };
};

export default useVideoControls;