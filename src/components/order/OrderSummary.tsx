import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

interface OrderSummaryProps {
  regularOrder: Record<string, number>;
  gelatoOrder: any[];
  onEdit: () => void;
  onSubmit: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ regularOrder, gelatoOrder, onEdit, onSubmit }) => {
  const { t } = useTranslation();

  const calculateTotal = () => {
    const regularTotal = Object.entries(regularOrder).reduce((total, [product, quantity]) => {
      const price = getProductPrice(product);
      return total + price * quantity;
    }, 0);

    const gelatoTotal = gelatoOrder.reduce((total, item) => total + item.price, 0);

    return regularTotal + gelatoTotal;
  };

  const getProductPrice = (productName: string) => {
    // This function should return the price of the product based on its name
    // You might want to create a separate file with all product prices and import it here
    return 0; // Placeholder
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{t('orderSummary')}</h2>
      <div className="space-y-4 mb-6">
        <h3 className="font-medium text-lg">{t('regularItems')}</h3>
        {Object.entries(regularOrder).map(([product, quantity]) => (
          <div key={product} className="flex justify-between">
            <span>{product} x{quantity}</span>
            <span>${getProductPrice(product) * quantity}</span>
          </div>
        ))}
        <h3 className="font-medium text-lg mt-4">{t('gelatoItems')}</h3>
        {gelatoOrder.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span>{item.product}: {item.flavors.join(', ')}</span>
            <span>${item.price}</span>
          </div>
        ))}
        <div className="font-bold text-xl mt-4 pt-4 border-t">
          {t('total')}: ${calculateTotal()}
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={onEdit}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          {t('editOrder')}
        </button>
        <button
          onClick={onSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {t('submitOrder')}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;