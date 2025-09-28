import React, { useEffect, useState, useCallback } from 'react';
import videoSource from "./images/short2.mp4";
import audioSource from "./images/web sitesi ses (mp3cut.net).mp3";

// Video bileşeni
const Video = React.forwardRef(({ src, onVideoLoad, onVideoEnd, onVideoPlay, audioRef, hideAudioButton }, ref) => {
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioReady, setAudioReady] = useState(false);

    const toggleMute = useCallback(async (e) => {
        e.stopPropagation();
        const audio = audioRef?.current;
        const video = ref?.current;
        
        if (!isPlaying) {
            // İlk tıklama - Video ve ses en baştan başlat
            setIsPlaying(true);
            setIsMuted(false);
            
            if (video && audio) {
                try {
                    // Video en baştan başlat
                    video.currentTime = 0;
                    await video.play();
                    
                    // Ses en baştan başlat
                    audio.currentTime = 0;
                    await audio.play();
                    
                    console.log('🎵 Video ve ses en baştan başlatıldı!');
                } catch (error) {
                    console.error('Başlatma hatası:', error);
                }
            }
        } else {
            // İkinci tıklama - Mute/unmute toggle
            const newMutedState = !isMuted;
            setIsMuted(newMutedState);
            
            if (audio) {
                if (newMutedState) {
                    audio.pause();
                    console.log('Ses durduruldu');
                } else {
                    audio.currentTime = video ? video.currentTime * 2 : 0;
                    try {
                        await audio.play();
                        console.log('Ses açıldı');
                    } catch (error) {
                        console.error('Ses açma hatası:', error);
                    }
                }
            }
        }
    }, [isPlaying, isMuted, audioRef, ref]);
    
    useEffect(() => {
        const video = ref?.current;
        const audio = audioRef?.current;
        
        if (video && audio) {
            const handleVideoLoadedMetadata = () => {
                console.log('Video metadata yüklendi');
                // Video hızını %50 yap
                video.playbackRate = 0.5;
                // Video sessiz kalacak (ses dosyası için)
                video.volume = 0;
            };

            const handleAudioCanPlay = () => {
                console.log('Audio çalmaya hazır');
                setAudioReady(true);
            };

            const handleAudioEnded = () => {
                console.log('🎵 Ses dosyası bitti');
                setIsPlaying(false);
                setIsMuted(false);
            };

            const handleVideoPlay = () => {
                console.log('Video başladı');
                // Ses çalıyorsa senkronizasyonu sağla
                if (audioReady && !isMuted && !audio.paused && isPlaying) {
                    audio.currentTime = video.currentTime * 2;
                }
            };

            const handleVideoTimeUpdate = () => {
                if (audioReady && !audio.paused && !isMuted && isPlaying) {
                    // Ses-video senkronizasyonu
                    const expectedAudioTime = video.currentTime * 2;
                    const timeDiff = Math.abs(audio.currentTime - expectedAudioTime);
                    
                    // Fade-out efekti: Son 3 saniyede sesi yavaşça azalt
                    if (audio.currentTime >= 36) { // 39 saniyelik dosya için son 3 saniye
                        const fadeStartTime = 36;
                        const fadeDuration = 3; // 3 saniye fade
                        const fadeProgress = (audio.currentTime - fadeStartTime) / fadeDuration;
                        const fadeVolume = Math.max(0, 1 - fadeProgress); // 1'den 0'a düşür
                        audio.volume = fadeVolume;
                        console.log(`🎵 Fade-out: ${(fadeProgress * 100).toFixed(1)}% tamamlandı, volume: ${fadeVolume.toFixed(2)}`);
                    } else {
                        // Normal ses seviyesi
                        audio.volume = 1.0;
                    }
                    
                    // Sadece 0.5 saniyeden fazla fark varsa düzelt
                    if (timeDiff > 0.5) {
                        audio.currentTime = expectedAudioTime;
                    }
                }
            };

            // Audio ayarları
            audio.playbackRate = 1.0;
            audio.loop = false; // Sadece 1 kez çal
            audio.volume = isMuted ? 0 : 1.0;
            audio.preload = 'auto';
            
            // Video muted olduğu için audio'dan ses gelecek
            if (!isMuted) {
                audio.muted = false;
            }

            video.addEventListener('loadedmetadata', handleVideoLoadedMetadata);
            video.addEventListener('play', handleVideoPlay);
            video.addEventListener('timeupdate', handleVideoTimeUpdate);
            audio.addEventListener('canplay', handleAudioCanPlay);
            audio.addEventListener('ended', handleAudioEnded);

            return () => {
                video.removeEventListener('loadedmetadata', handleVideoLoadedMetadata);
                video.removeEventListener('play', handleVideoPlay);
                video.removeEventListener('timeupdate', handleVideoTimeUpdate);
                audio.removeEventListener('canplay', handleAudioCanPlay);
                audio.removeEventListener('ended', handleAudioEnded);
            };
        }
    }, [ref, audioRef, isMuted, isPlaying, audioReady]);

    // Butonu body'ye taşı - hiçbir element engelleyemesin
    useEffect(() => {
        const createButton = () => {
            // Eski button varsa kaldır
            const existingButton = document.getElementById('audio-control-btn');
            if (existingButton) {
                existingButton.remove();
            }

            // Eğer ses butonu gizlenmesi gerekiyorsa, button oluşturma
            if (hideAudioButton) {
                return;
            }

            // Yeni button oluştur
            const button = document.createElement('div');
            button.id = 'audio-control-btn';
            button.className = `audio-control ${!isPlaying ? 'audio-control-pulse' : ''} ${isPlaying && !isMuted ? 'audio-control-playing' : ''}`;
            
            // Tooltip oluştur
            const tooltip = document.createElement('div');
            tooltip.className = 'audio-tooltip';
            tooltip.textContent = !isPlaying ? "Sesi Başlat" : (isMuted ? "Sesi Aç" : "Sesi Kapat");
            
            // İkon ekle
            if (!isPlaying) {
                button.innerHTML = `
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5v14l11-7z" fill="white"/>
                        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" opacity="0.3"/>
                    </svg>
                    <div class="audio-control-ripple"></div>
                `;
            } else if (isMuted) {
                button.innerHTML = `
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.5 12C16.5 10.23 15.5 8.71 14 7.97V10.18L16.45 12.63C16.48 12.43 16.5 12.22 16.5 12Z" fill="white"/>
                        <path d="M19 12C19 12.94 18.8 13.82 18.46 14.64L19.97 16.15C20.62 14.91 21 13.5 21 12C21 7.72 18 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12Z" fill="white"/>
                        <path d="M4.27 3L3 4.27L7.73 9H3V15H7L12 20V13.27L16.25 17.52C15.58 18.04 14.83 18.46 14 18.7V20.77C15.38 20.45 16.63 19.82 17.68 18.96L19.73 21L21 19.73L12 10.73L4.27 3ZM12 4L9.91 6.09L12 8.18V4Z" fill="white"/>
                    </svg>
                `;
            } else {
                button.innerHTML = `
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 9V15H7L12 20V4L7 9H3Z" fill="white"/>
                        <path d="M16.5 12C16.5 10.23 15.5 8.71 14 7.97V16.02C15.5 15.29 16.5 13.77 16.5 12Z" fill="white" class="audio-wave-1"/>
                        <path d="M14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z" fill="white" class="audio-wave-2"/>
                    </svg>
                `;
            }

            // Tooltip'i butona ekle
            button.appendChild(tooltip);
            
            // Otomatik tooltip göster - sadece "Sesi Başlat" durumunda
            if (!isPlaying) {
                // 1 saniye sonra tooltip'i göster
                setTimeout(() => {
                    // Tooltip'in hala var olduğunu kontrol et
                    if (tooltip && document.getElementById('audio-control-btn')) {
                        tooltip.classList.add('show');
                        tooltip.style.opacity = '1';
                        tooltip.style.visibility = 'visible';
                        // 3 saniye sonra gizle
                        setTimeout(() => {
                            if (tooltip) {
                                tooltip.classList.remove('show');
                                tooltip.style.opacity = '0';
                                tooltip.style.visibility = 'hidden';
                            }
                        }, 3000);
                    }
                }, 1000);
            }
            
            // Click handler ekle
            button.onclick = toggleMute;
            
            // Hover olayları ekle
            button.addEventListener('mouseenter', () => {
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
            });
            
            button.addEventListener('mouseleave', () => {
                // Hover kalkınca tooltip'i her zaman gizle
                tooltip.classList.remove('show');
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
            });

            // Body'ye ekle
            document.body.appendChild(button);
        };

        createButton();

        return () => {
            const button = document.getElementById('audio-control-btn');
            if (button) {
                button.remove();
            }
        };
    }, [isPlaying, isMuted, toggleMute, hideAudioButton]);

    const handleContainerClick = async () => {
        const video = ref?.current;
        
        if (video && video.paused) {
            console.log('Video oynatılıyor...');
            video.play().catch(console.error);
        }
    };

    return (
        <div className="video-container" onClick={handleContainerClick}>
            <div className="video-overlay"></div>
            <video 
                autoPlay 
                muted
                loop 
                playsInline
                onLoadedMetadata={(e) => {
                    onVideoLoad && onVideoLoad(e);
                }} 
                onEnded={onVideoEnd}
                onPlay={onVideoPlay}
                ref={ref}
            >
                <source src={videoSource} type="video/mp4" />
                Tarayıcınız video etiketini desteklemiyor.
            </video>
            <audio 
                ref={audioRef}
                preload="auto"
                muted={false}
                playsInline={true}
                controls={false}
                style={{display: 'none'}}
            >
                <source src={audioSource} type="audio/mpeg" />
                <source src={audioSource} type="audio/mp3" />
                <source src={audioSource} type="audio/wav" />
                Tarayıcınız ses etiketini desteklemiyor.
            </audio>
            
            {/* 🎵 Ses Kontrol Butonu artık body'de render ediliyor */}
        </div>
    );
});

  export default Video;