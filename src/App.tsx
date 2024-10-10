import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import UserProfile from './components/UserProfile';
import NewOrder from './components/NewOrder';
import SalesDashboard from './components/SalesDashboard';
import LanguageContext from './contexts/LanguageContext';
import AuthContext from './contexts/AuthContext';
import { User } from './types';

function App() {
  const [language, setLanguage] = useState('en');
  const [user, setUser] = useState<User | null>(null);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <AuthContext.Provider value={{ user, setUser }}>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/admin"
                element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/profile"
                element={user ? <UserProfile /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/new-order"
                element={user ? <NewOrder /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/sales"
                element={user ? <SalesDashboard /> : <Navigate to="/login" replace />}
              />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthContext.Provider>
    </LanguageContext.Provider>
  );
}

export default App;