import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { Edit, Trash2, Plus } from 'lucide-react';
import { MenuItem } from '../../types';

const mockInventory: MenuItem[] = [
  { id: '1', name: 'Vanilla', category: 'Flavor', price: 2.5, stock: 100 },
  { id: '2', name: 'Chocolate', category: 'Flavor', price: 2.5, stock: 80 },
  { id: '3', name: 'Strawberry', category: 'Flavor', price: 2.75, stock: 60 },
  { id: '4', name: 'Small', category: 'Size', price: 3.0, stock: 200 },
  { id: '5', name: 'Medium', category: 'Size', price: 4.0, stock: 150 },
  { id: '6', name: 'Large', category: 'Size', price: 5.0, stock: 100 },
];

const InventoryManagement: React.FC = () => {
  const { t } = useTranslation();
  const [inventory, setInventory] = useState<MenuItem[]>(mockInventory);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
  };

  const handleDelete = (id: string) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const handleSave = (updatedItem: MenuItem) => {
    setInventory(inventory.map(item => item.id === updatedItem.id ? updatedItem : item));
    setEditingItem(null);
  };

  const handleAdd = () => {
    const newItem: MenuItem = {
      id: (inventory.length + 1).toString(),
      name: '',
      category: 'Flavor',
      price: 0,
      stock: 0
    };
    setEditingItem(newItem);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{t('inventoryManagement')}</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">{t('itemName')}</th>
            <th className="p-2 text-left">{t('category')}</th>
            <th className="p-2 text-left">{t('price')}</th>
            <th className="p-2 text-left">{t('inStock')}</th>
            <th className="p-2 text-left">{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item.id} className="border-b">
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.category}</td>
              <td className="p-2">${item.price.toFixed(2)}</td>
              <td className="p-2">{item.stock}</td>
              <td className="p-2">
                <button 
                  className="mr-2 text-blue-500 hover:text-blue-700"
                  onClick={() => handleEdit(item)}
                >
                  <Edit size={18} />
                </button>
                <button 
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button 
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={handleAdd}
      >
        <Plus className="inline-block mr-2" size={18} />
        {t('addItem')}
      </button>
      {editingItem && (
        <EditItemModal 
          item={editingItem} 
          onSave={handleSave} 
          onCancel={() => setEditingItem(null)} 
        />
      )}
    </div>
  );
};

interface EditItemModalProps {
  item: MenuItem;
  onSave: (item: MenuItem) => void;
  onCancel: () => void;
}

const EditItemModal: React.FC<EditItemModalProps> = ({ item, onSave, onCancel }) => {
  const { t } = useTranslation();
  const [editedItem, setEditedItem] = useState<MenuItem>(item);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedItem(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-bold mb-4">{item.id ? t('editItem') : t('addItem')}</h3>
        <form onSubmit={(e) => { e.preventDefault(); onSave(editedItem); }}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              {t('itemName')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedItem.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              {t('category')}
            </label>
            <select
              id="category"
              name="category"
              value={editedItem.category}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="Flavor">{t('flavor')}</option>
              <option value="Size">{t('size')}</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              {t('price')}
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={editedItem.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
              {t('inStock')}
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={editedItem.stock}
              onChange={handleChange}
              min="0"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {t('save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryManagement;