import React, { useState } from 'react';
import { BarChart, Bar, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { XAxis, YAxis } from './RechartsWrapper';
import { useTranslation } from '../../hooks/useTranslation';
import LocationSelector from '../LocationSelector';
import DailySales from './DailySales';

const mockWeeklyData = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const mockMonthlyData = [
  { name: 'Week 1', sales: 15000 },
  { name: 'Week 2', sales: 18000 },
  { name: 'Week 3', sales: 16000 },
  { name: 'Week 4', sales: 20000 },
];

const SalesOverview: React.FC = () => {
  const { t } = useTranslation();
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [timePeriod, setTimePeriod] = useState('weekly');

  const getChartData = () => {
    switch (timePeriod) {
      case 'daily':
        return [];  // This will be handled by the DailySales component
      case 'weekly':
        return mockWeeklyData;
      case 'monthly':
        return mockMonthlyData;
      default:
        return mockWeeklyData;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{t('salesOverview')}</h2>
      <div className="flex justify-between mb-6">
        <LocationSelector
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          includeAllOption={true}
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
      {timePeriod === 'daily' ? (
        <DailySales selectedLocation={selectedLocation} />
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-2">
            {t(timePeriod === 'weekly' ? 'weeklySales' : 'monthlySales')}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getChartData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" name={t('sales')} />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SalesStat title={t('totalSales')} value="$20,550" />
        <SalesStat title={t('averageOrderValue')} value="$37.25" />
        <SalesStat title={t('ordersProcessed')} value="552" />
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

export default SalesOverview;