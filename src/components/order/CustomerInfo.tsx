import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

interface CustomerInfoProps {
  order: any;
  setOrder: React.Dispatch<React.SetStateAction<any>>;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ order, setOrder }) => {
  const { t } = useTranslation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t('customerInfo')}</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="customerName" className="block mb-1">
            {t('name')}
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={order.customerName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="customerPhone" className="block mb-1">
            {t('phoneNumber')}
          </label>
          <input
            type="tel"
            id="customerPhone"
            name="customerPhone"
            value={order.customerPhone}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;