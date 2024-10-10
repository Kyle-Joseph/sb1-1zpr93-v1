import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, ShoppingCart, User, List, BarChart2 } from 'lucide-react';
import AuthContext from '../contexts/AuthContext';
import { useTranslation } from '../hooks/useTranslation';

const Dashboard: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t('dashboard')}</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/profile')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              <User className="inline-block mr-2" size={18} />
              {t('profile')}
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              <LogOut className="inline-block mr-2" size={18} />
              {t('logout')}
            </button>
          </div>
        </div>
      </nav>
      <div className="container mx-auto mt-8 p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">{t('actions')}</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/new-order')}
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 flex items-center"
            >
              <ShoppingCart className="mr-2" size={24} />
              {t('newOrder')}
            </button>
            <button
              onClick={() => {/* Implement existing order logic */}}
              className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 flex items-center"
            >
              <List className="mr-2" size={24} />
              {t('existingOrder')}
            </button>
            <button
              onClick={() => navigate('/sales')}
              className="bg-purple-500 text-white px-6 py-3 rounded hover:bg-purple-600 flex items-center"
            >
              <BarChart2 className="mr-2" size={24} />
              {t('viewSales')}
            </button>
            {user?.role === 'admin' && (
              <button
                onClick={() => navigate('/admin')}
                className="bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-800 flex items-center"
              >
                <User className="mr-2" size={24} />
                {t('adminConsole')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;