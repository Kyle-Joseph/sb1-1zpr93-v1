import React from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = React.createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
});

export default LanguageContext;