import { useContext } from 'react';
import LanguageContext from '../contexts/LanguageContext';

const translations = {
  en: {
    // ... (keep existing translations)
    added: 'Added',
    removed: 'Removed',
    sessionTimeout: 'Session Timeout',
    logoutWarning: 'You will be logged out in {seconds} seconds due to inactivity.',
    stayLoggedIn: 'Stay Logged In',
  },
  es: {
    // ... (keep existing translations)
    added: 'Añadido',
    removed: 'Eliminado',
    sessionTimeout: 'Tiempo de sesión agotado',
    logoutWarning: 'Se cerrará la sesión en {seconds} segundos debido a inactividad.',
    stayLoggedIn: 'Mantener sesión iniciada',
  },
};

export const useTranslation = () => {
  const { language } = useContext(LanguageContext);
  
  const t = (key: string, params?: Record<string, string | number>) => {
    let translation = translations[language][key] || key;
    
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        translation = translation.replace(`{${paramKey}}`, paramValue.toString());
      });
    }
    
    return translation;
  };

  return { t };
};