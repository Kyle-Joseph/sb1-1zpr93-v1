import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

const toppings = [
  'Sprinkles', 'Chocolate Chips', 'Nuts', 'Caramel',
  'Whipped Cream', 'Cherry', 'Oreo Crumbs', 'Gummy Bears'
];

interface ToppingsSelectorProps {
  order: any;
  setOrder: React.Dispatch<React.SetStateAction<any>>;
}

const ToppingsSelector: React.FC<ToppingsSelectorProps> = ({ order, setOrder }) => {
  const { t } = useTranslation();

  const handleToppingToggle = (topping: string) => {
    const updatedToppings = order.toppings.includes(topping)
      ? order.toppings.filter((t: string) => t !== topping)
      : [...order.toppings, topping];
    setOrder({ ...order, toppings: updatedToppings });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t('selectToppings')}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {toppings.map((topping) => (
          <button
            key={topping}
            onClick={() => handleToppingToggle(topping)}
            className={`p-4 rounded-lg ${
              order.toppings.includes(topping)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {t(topping.toLowerCase().replace(' ', '_'))}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToppingsSelector;