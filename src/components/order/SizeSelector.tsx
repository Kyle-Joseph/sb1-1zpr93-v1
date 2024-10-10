import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

const sizes = ['Small', 'Medium', 'Large'];

interface SizeSelectorProps {
  order: any;
  setOrder: React.Dispatch<React.SetStateAction<any>>;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ order, setOrder }) => {
  const { t } = useTranslation();

  const handleSizeSelect = (size: string) => {
    setOrder({ ...order, size });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t('selectSize')}</h2>
      <div className="flex justify-center space-x-4">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => handleSizeSelect(size)}
            className={`p-4 rounded-lg ${
              order.size === size
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {t(size.toLowerCase())}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;