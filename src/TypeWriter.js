import React from 'react';
import Typewriter from 'typewriter-effect';

const MyTypewriter = () => {
  return (
    <Typewriter
      options={{
        loop: true,
        delay: 50,
        html: true,
      }}
      onInit={(typewriter) => {
        typewriter
            .pauseFor(1000)
            .typeString('ANKARA\'DAYMIŞ <span class="highlight-gradient">BARIŞ</span>')
            .pauseFor(2000)           
            .deleteChars(10)
            .pauseFor(1000)
            .typeString('<span> </span><span class="highlight-gradient">BARIŞ</span>')
            .pauseFor(1000)
            .deleteChars(6)
            .pauseFor(1000)
            .typeString('<span> </span><span class="highlight-gradient">MIYDI</span>BARIŞ ?')
            .pauseFor(1000)
            .typeString('<br><span style="font-style: italic; font-family: Montserrat, sans-serif; font-size: medium;">hasret ve saygıyla...</span>')
            .pauseFor(1000)
            .start();
      }}
    />
  );
};

export default MyTypewriter;
