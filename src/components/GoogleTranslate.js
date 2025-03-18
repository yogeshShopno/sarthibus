
import React, { useEffect, useState } from 'react';
import { IoLanguageSharp } from "react-icons/io5";

function GoogleTranslate() {
  const [selectedLanguage, setSelectedLanguage] = useState(''); 

  useEffect(() => {
    if (!document.querySelector("[src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit']")) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,hi,gu', 
            autoDisplay: false, 
          },
          'google_translate_element'
        );
      };

      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleLanguageChange = (e) => {
    const languageCode = e.target.value;
    setSelectedLanguage(languageCode);

    const selectField = document.querySelector('.goog-te-combo');
    if (selectField) {
      selectField.value = languageCode;
      selectField.dispatchEvent(new Event('change')); 
    }
  };

  return (
<div style={{ display: "flex",  alignItems:"center"}}>
      <IoLanguageSharp size={25} />
      <select 
  onChange={handleLanguageChange}
  value={selectedLanguage}
  style={{
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    appearance: 'none',   
    WebkitAppearance: 'none', 
    MozAppearance: 'none',   
    cursor: 'pointer',  
    boxShadow: 'none', 
    WebkitBoxShadow: 'none', 
  }}  
  className="custom-language-dropdown nav-link dropdown-toggle d-flex align-items-center gap-1"
>
  <option value="">Select Language</option>
  <option value="en">English</option>
  <option value="hi">Hindi</option>
  <option value="gu">Gujarati</option>
</select>

      <div id="google_translate_element" style={{ display: 'none' }}></div>
    </div>
  );
}

export default GoogleTranslate;
