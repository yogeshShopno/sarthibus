import React, { useEffect } from 'react';

const TawkMessenger = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://tawk.to/chat/66fd192f4cbc4814f7e1e48f/1i96akoti';
    script.async = true;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(script, firstScriptTag);

    return () => {
      script.remove();
    };
  }, []);  

  return null;  
};

export default TawkMessenger;

