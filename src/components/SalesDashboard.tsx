import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { XAxis, YAxis } from './admin/RechartsWrapper';
import { LogOut, ArrowLeft } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import LocationSelector from './LocationSelector';

const mockDailyData = [
  { hour: '00:00', sales: 120 },
  { hour: '04:00', sales: 80 },
  { hour: '08:00', sales: 200 },
  { hour: '12:00', sales: 350 },
  { hour: '16:00', sales: 280 },
  { hour: '20:00', sales: 190 },
];

const mockWeeklyData = [
  { day: 'Mon', sales: 1200 },
  { day: 'Tue', sales: 1400 },
  { day: 'Wed', sales: 1100 },
  { day: 'Thu', sales: 1500 },
  { day: 'Fri', sales: 1800 },
  { day: 'Sat', sales: 2000 },
  { day: 'Sun', sales: 1600 },
];

const mockMonthlyData = [
  { week: 'Week 1', sales: 5000 },
  { week: 'Week 2', sales: 6200 },
  { week: 'Week 3', sales: 5800 },
  { week: 'Week 4', sales: 7000 },
];

const SalesDashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [timePeriod, setTimePeriod] = useState('daily');

  const handleLogout = () => {
    // Implement logout logic
    navigate('/login');
  };

  const getChartData = () => {
    switch (timePeriod) {
      case 'daily':
        return mockDailyData;
      case 'weekly':
        return mockWeeklyData;
      case 'monthly':
        return mockMonthlyData;
      default:
        return mockDailyData;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold">{t('viewSales')}</h1>
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
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between mb-6">
            <LocationSelector
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
            <div>
              <select
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="daily">{t('daily')}</option>
                <option value="weekly">{t('weekly')}</option>
                <option value="monthly">{t('monthly')}</option>
              </select>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={getChartData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey={timePeriod === 'daily' ? 'hour' : timePeriod === 'weekly' ? 'day' : 'week'}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" name={t('sales')} />
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <SalesStat title={t('totalSales')} value={`$${getChartData().reduce((sum, item) => sum + item.sales, 0)}`} />
            <SalesStat title={t('averageOrderValue')} value="$37.25" />
            <SalesStat title={t('ordersProcessed')} value={`${Math.round(getChartData().reduce((sum, item) => sum + item.sales, 0) / 37.25)}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

const SalesStat: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="bg-gray-100 p-4 rounded-lg">
    <h4 className="text-lg font-semibold mb-2">{title}</h4>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default SalesDashboard;