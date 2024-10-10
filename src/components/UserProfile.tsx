import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, LogOut, ArrowLeft } from 'lucide-react';
import AuthContext from '../contexts/AuthContext';
import { useTranslation } from '../hooks/useTranslation';
import LocationSelector from './LocationSelector';

const UserProfile: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedLocation, setSelectedLocation] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockInOut = () => {
    if (!isClockedIn && !selectedLocation) {
      setError(t('selectLocation'));
      return;
    }
    setIsClockedIn(!isClockedIn);
    setError('');
    // Here you would typically send a request to your backend to record the clock in/out
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold">{t('profile')}</h1>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            <LogOut className="inline-block mr-2" size={18} />
            {t('logout')}
          </button>
        </div>
      </nav>
      <div className="container mx-auto mt-8 p-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{t('userInfo')}</h2>
            <p><strong>{t('name')}:</strong> {user.name}</p>
            <p><strong>{t('role')}:</strong> {user.role}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{t('clockInOut')}</h2>
            <div className="flex items-center space-x-4 mb-2">
              <LocationSelector
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
              />
              <p className="text-lg">
                <Clock className="inline-block mr-2" size={24} />
                {currentTime.toLocaleTimeString()}
              </p>
              <button
                onClick={handleClockInOut}
                className={`px-4 py-2 rounded ${
                  isClockedIn
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-500 hover:bg-green-600'
                } text-white`}
              >
                {isClockedIn ? t('clockOut') : t('clockIn')}
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{t('performanceStats')}</h2>
            <p>{t('totalSales')}: $0</p>
            <p>{t('ordersProcessed')}: 0</p>
            <p>{t('averageOrderValue')}: $0</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{t('weeklyRoster')}</h2>
            <p>{t('noShiftsScheduled')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;