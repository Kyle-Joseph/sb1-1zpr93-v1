import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { User, Edit, Trash2 } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'John Doe', role: 'Employee', lastActive: '2023-04-15 14:30' },
  { id: 2, name: 'Jane Smith', role: 'Manager', lastActive: '2023-04-15 16:45' },
  { id: 3, name: 'Bob Johnson', role: 'Employee', lastActive: '2023-04-14 09:15' },
];

const UserManagement: React.FC = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState(mockUsers);

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{t('userManagement')}</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">{t('name')}</th>
            <th className="p-2 text-left">{t('role')}</th>
            <th className="p-2 text-left">{t('lastActive')}</th>
            <th className="p-2 text-left">{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">{user.lastActive}</td>
              <td className="p-2">
                <button className="mr-2 text-blue-500 hover:text-blue-700">
                  <Edit size={18} />
                </button>
                <button 
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        <User className="inline-block mr-2" size={18} />
        {t('addEmployee')}
      </button>
    </div>
  );
};

export default UserManagement;