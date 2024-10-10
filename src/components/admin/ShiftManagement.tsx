import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { Calendar, Clock, User } from 'lucide-react';

const mockShifts = [
  { id: 1, userId: 1, userName: 'John Doe', date: 'April 16, 2023', startTime: '9:00 AM', endTime: '5:00 PM' },
  { id: 2, userId: 2, userName: 'Jane Smith', date: 'April 16, 2023', startTime: '12:00 PM', endTime: '8:00 PM' },
  { id: 3, userId: 3, userName: 'Bob Johnson', date: 'April 17, 2023', startTime: '8:00 AM', endTime: '4:00 PM' },
];

const ShiftManagement: React.FC = () => {
  const { t } = useTranslation();
  const [shifts, setShifts] = useState(mockShifts);

  const handleDeleteShift = (id: number) => {
    setShifts(shifts.filter(shift => shift.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{t('shiftManagement')}</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">{t('employee')}</th>
              <th className="p-2 text-left">{t('date')}</th>
              <th className="p-2 text-left">{t('startTime')}</th>
              <th className="p-2 text-left">{t('endTime')}</th>
              <th className="p-2 text-left">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map(shift => (
              <tr key={shift.id} className="border-b">
                <td className="p-2">{shift.userName}</td>
                <td className="p-2">{shift.date}</td>
                <td className="p-2">{shift.startTime}</td>
                <td className="p-2">{shift.endTime}</td>
                <td className="p-2">
                  <button className="mr-2 text-blue-500 hover:text-blue-700">
                    <Clock size={18} />
                  </button>
                  <button 
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteShift(shift.id)}
                  >
                    <Calendar size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        <User className="inline-block mr-2" size={18} />
        {t('addShift')}
      </button>
    </div>
  );
};

export default ShiftManagement;