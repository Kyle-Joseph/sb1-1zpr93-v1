import React, { useEffect, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface CountdownPopupProps {
  onLogout: () => void;
  onStayLoggedIn: () => void;
}

const CountdownPopup: React.FC<CountdownPopupProps> = ({ onLogout, onStayLoggedIn }) => {
  const [countdown, setCountdown] = useState(30);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          onLogout();
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onLogout]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{t('sessionTimeout')}</h2>
        <p className="mb-4">
          {t('logoutWarning', { seconds: countdown })}
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            {t('logout')}
          </button>
          <button
            onClick={onStayLoggedIn}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {t('stayLoggedIn')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountdownPopup;