import React, { useContext } from 'react';
import LanguageContext from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div className="flex items-center space-x-2">
      <Globe size={18} />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-transparent border-none text-sm"
      >
        <option value="en">EN</option>
        <option value="es">ES</option>
      </select>
    </div>
  );
};

export default LanguageSelector;