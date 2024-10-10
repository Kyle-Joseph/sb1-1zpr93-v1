import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

interface DailySalesProps {
  selectedLocation: string;
}

const mockShiftData = [
  { id: 1, employee: 'John Doe', start: '09:00', end: '17:00', sales: 1200 },
  { id: 2, employee: 'Jane Smith', start: '12:00', end: '20:00', sales: 1500 },
  { id: 3, employee: 'Bob Johnson', start: '17:00', end: '01:00', sales: 1800 },
];

const DailySales: React.FC<DailySalesProps> = ({ selectedLocation }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">{t('dailySales')}</h3>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">{t('employee')}</th>
            <th className="p-2 text-left">{t('shift')}</th>
            <th className="p-2 text-left">{t('sales')}</th>
          </tr>
        </thead>
        <tbody>
          {mockShiftData.map((shift) => (
            <tr key={shift.id} className="border-b">
              <td className="p-2">{shift.employee}</td>
              <td className="p-2">{`${shift.start} - ${shift.end}`}</td>
              <td className="p-2">${shift.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <p className="font-bold">{t('totalDailySales')}: $4,500</p>
      </div>
    </div>
  );
};

export default DailySales;