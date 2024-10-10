import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '../hooks/useTranslation';

const Login: React.FC = () => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [pin]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key >= '0' && e.key <= '9') {
      const newPin = [...pin];
      const emptyIndex = newPin.findIndex(digit => digit === '');
      if (emptyIndex !== -1) {
        newPin[emptyIndex] = e.key;
        setPin(newPin);
      }
    } else if (e.key === 'Backspace') {
      const newPin = [...pin];
      const lastFilledIndex = newPin.map(digit => digit !== '').lastIndexOf(true);
      if (lastFilledIndex !== -1) {
        newPin[lastFilledIndex] = '';
        setPin(newPin);
      }
    }
  };

  useEffect(() => {
    if (pin.every(digit => digit !== '')) {
      handleLogin();
    }
  }, [pin]);

  const handleLogin = () => {
    const enteredPin = pin.join('');
    if (enteredPin === '1234') {
      setUser({ id: '1', name: 'John Doe', role: 'user', pin: '1234' });
      navigate('/dashboard');
    } else if (enteredPin === '9999') {
      setUser({ id: 'admin', name: 'Admin User', role: 'admin', pin: '9999' });
      navigate('/admin');
    } else {
      setError(t('invalidPin'));
      setPin(['', '', '', '']);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">{t('login')}</h2>
        <div className="flex justify-center space-x-2 mb-4">
          {pin.map((digit, index) => (
            <input
              key={index}
              type="password"
              value={digit}
              readOnly
              className="w-12 h-12 text-center text-2xl border rounded"
            />
          ))}
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      </div>
    </div>
  );
};

export default Login;