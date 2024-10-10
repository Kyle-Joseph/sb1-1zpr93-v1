import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

const flavors = [
  'Vanilla', 'Chocolate', 'Strawberry', 'Mint Chocolate Chip',
  'Cookie Dough', 'Rocky Road', 'Coffee', 'Pistachio'
];

interface FlavorSelectorProps {
  order: any;
  setOrder: React.Dispatch<React.SetStateAction<any>>;
}

const FlavorSelector: React.FC<FlavorSelectorProps> = ({ order, setOrder }) => {
  const { t } = useTranslation();

  const handleFlavorSelect = (flavor: string) => {
    setOrder({ ...order, flavor });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t('selectFlavor')}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {flavors.map((flavor) => (
          <button
            key={flavor}
            onClick={() => handleFlavorSelect(flavor)}
            className={`p-4 rounded-lg ${
              order.flavor === flavor
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {t(flavor.toLowerCase().replace(' ', '_'))}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FlavorSelector;