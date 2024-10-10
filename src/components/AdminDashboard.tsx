import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, ShoppingBag, Calendar, Package } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import SalesOverview from './admin/SalesOverview';
import UserManagement from './admin/UserManagement';
import ShiftManagement from './admin/ShiftManagement';
import InventoryManagement from './admin/InventoryManagement';
import CountdownPopup from './CountdownPopup';
import AuthContext from '../contexts/AuthContext';

const INACTIVITY_TIMEOUT = 2 * 60 * 1000; // 2 minutes
const WARNING_TIMEOUT = 30 * 1000; // 30 seconds

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  const handleLogout = useCallback(() => {
    setUser(null);
    navigate('/login');
  }, [setUser, navigate]);

  const resetTimer = useCallback(() => {
    setLastActivity(Date.now());
    setShowWarning(false);
  }, []);

  useEffect(() => {
    const activityEvents = ['mousedown', 'keydown', 'touchstart', 'scroll'];
    const handleActivity = () => resetTimer();

    activityEvents.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [resetTimer]);

  useEffect(() => {
    const checkInactivity = () => {
      const currentTime = Date.now();
      const timeSinceLastActivity = currentTime - lastActivity;

      if (timeSinceLastActivity >= INACTIVITY_TIMEOUT - WARNING_TIMEOUT) {
        setShowWarning(true);
      }

      if (timeSinceLastActivity >= INACTIVITY_TIMEOUT) {
        handleLogout();
      }
    };

    const intervalId = setInterval(checkInactivity, 1000);

    return () => clearInterval(intervalId);
  }, [lastActivity, handleLogout]);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'sales':
        return <SalesOverview />;
      case 'users':
        return <UserManagement />;
      case 'shifts':
        return <ShiftManagement />;
      case 'inventory':
        return <InventoryManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t('adminDashboard')}</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title={t('salesOverview')}
            icon={<ShoppingBag size={24} />}
            onClick={() => setActiveSection('sales')}
            active={activeSection === 'sales'}
          />
          <DashboardCard
            title={t('employeeManagement')}
            icon={<Users size={24} />}
            onClick={() => setActiveSection('users')}
            active={activeSection === 'users'}
          />
          <DashboardCard
            title={t('shiftManagement')}
            icon={<Calendar size={24} />}
            onClick={() => setActiveSection('shifts')}
            active={activeSection === 'shifts'}
          />
          <DashboardCard
            title={t('inventoryManagement')}
            icon={<Package size={24} />}
            onClick={() => setActiveSection('inventory')}
            active={activeSection === 'inventory'}
          />
        </div>
        {renderActiveSection()}
      </div>
      {showWarning && (
        <CountdownPopup
          onLogout={handleLogout}
          onStayLoggedIn={resetTimer}
        />
      )}
    </div>
  );
};

const DashboardCard: React.FC<{ 
  title: string; 
  icon: React.ReactNode; 
  onClick: () => void;
  active: boolean;
}> = ({ title, icon, onClick, active }) => (
  <div
    className={`bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow ${
      active ? 'ring-2 ring-blue-500' : ''
    }`}
    onClick={onClick}
  >
    <div className="flex items-center mb-4">
      {icon}
      <h2 className="text-xl font-semibold ml-2">{title}</h2>
    </div>
    <p className="text-gray-600">Click to manage</p>
  </div>
);

export default AdminDashboard;