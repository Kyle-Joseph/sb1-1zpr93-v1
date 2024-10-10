import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, ArrowLeft } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import AuthContext from '../contexts/AuthContext';

interface NavBarProps {
  title: string;
  showBackButton?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ title, showBackButton = true }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <h1 className="text-2xl font-bold">{title}</h1>
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
  );
};

export default NavBar;