
import React from 'react';
import Typewriter from 'typewriter-effect';

const MyTypewriter = () => {
  return (
    <Typewriter
      options={{
        loop: true,
        delay: 80, // Biraz daha yavaş ve zarif
        deleteSpeed: 45, // Daha akıcı silme
        html: true,
        cursor: '<span class="custom-cursor">|</span>', // Özel cursor
        autoStart: true,
        skipAddStyles: true, // Kendi stillerimizi kullan
      }}
      onInit={(typewriter) => {
        typewriter
            .pauseFor(800)
            .typeString('ANKARA\'DAYMIŞ <span class="highlight-gradient">BARIŞ</span>')
            .pauseFor(1800)       
            .deleteChars(10)
            .pauseFor(600)
            .typeString('<span> </span><span class="highlight-gradient">BARIŞ</span>')
            .pauseFor(1200)
            .deleteChars(6)
            .pauseFor(600)
            .typeString('<span> </span><span class="highlight-gradient">MIYDI</span>BARIŞ ?')
            .pauseFor(1500)
            .typeString('<br><span class="typewriter-subtitle">hasret ve saygıyla...</span>')
            .pauseFor(2500)
            .start();
      }}
    />
  );
};

export default MyTypewriter;
