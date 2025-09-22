import { useRef, useEffect } from 'react';

const useVideoControls = (setShowMemoryTransition) => {
    const videoRef = useRef(null);
    const audioRef = useRef(null);
    const intervalRef = useRef(null);
    const loopCountRef = useRef(0);

    const checkVideoTime = () => {
        const video = videoRef.current;
        if (!video) return;
    
        const timeLeft = video.duration - video.currentTime;
    
        // Video her loop bittiğinde sayacı artır
        if (timeLeft < 0.5 && video.currentTime > video.duration - 1) {
          loopCountRef.current += 1;
          console.log(`Video loop sayısı: ${loopCountRef.current}`);
        }
        
        // Video son 3 saniyeye geldiğinde ve loop sayısı 1'e ulaştığında geçişi başlat
        if (timeLeft <= 3 && loopCountRef.current >= 1) {
          console.log('MemoryTransition tetikleniyor...');
          triggerMemoryTransition();
          return;
        }
    
      };

      const triggerMemoryTransition = () => {
        const video = videoRef.current;
        
        // Interval'ları temizle
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        
        console.log('MemoryTransition state güncelleniyor...');
        
        // Memory transition'ı hemen göster - sinematik geçiş için
        if (setShowMemoryTransition) {
          setShowMemoryTransition(true);
          console.log('MemoryTransition true olarak ayarlandı');
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
        intervalRef.current = setInterval(checkVideoTime, 500); // Her 500 ms'de bir kontrol et
      };
    
      const handleVideoPlay = () => {
        if (!intervalRef.current) {
          intervalRef.current = setInterval(checkVideoTime, 500);
        }
      };
    
      const handleVideoPause = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      };
    

      const resetVideoState = () => {
        // Loop sayacını sıfırla
        loopCountRef.current = 0;
        
        // Tüm timer'ları temizle
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        
        // State'leri sıfırla
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
    
      // Komponent unmount olduğunda interval'ları temizle
      useEffect(() => {
        return () => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        };
      }, []);

      return { videoRef, audioRef, handleVideoLoad, handleVideoPlay, handleVideoPause, resetVideoState };
};

export default useVideoControls;