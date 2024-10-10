import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import NavBar from './NavBar';
import ProductCategory from './order/ProductCategory';
import GelatoOrder from './order/GelatoOrder';
import OrderSummary from './order/OrderSummary';

const categories = [
  {
    name: 'Chocolates',
    products: [
      { name: 'Gianduja pequeña', price: 60 },
      { name: 'Gianduja', price: 180 },
      { name: 'Bombón', price: 30 },
      { name: 'Cocoa', price: 120 },
    ]
  },
  {
    name: 'Nuts',
    products: [
      { name: 'Maní pequeño', price: 60 },
      { name: 'Maní grande', price: 180 },
      { name: 'Nibs pequeñas', price: 60 },
      { name: 'Nibs', price: 150 },
    ]
  },
  {
    name: 'Beverages',
    products: [
      { name: 'Café chico', price: 30 },
      { name: 'Café', price: 80 },
      { name: 'Tizanas Pequeñas', price: 60 },
      { name: 'Tizanas Grandes', price: 150 },
    ]
  },
  {
    name: 'Others',
    products: [
      { name: 'Gomitas', price: 30 },
      { name: 'Miel', price: 60 },
    ]
  },
  {
    name: 'Gelato',
    products: [
      { name: 'Gelato Sencillo', price: 60 },
      { name: 'Gelato Doble', price: 100 },
      { name: '1/2 Litro', price: 190 },
    ]
  }
];

const NewOrder: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Record<string, number>>({});
  const [gelatoOrder, setGelatoOrder] = useState<any[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [showMobileOrder, setShowMobileOrder] = useState(false);

  const handleProductSelect = (productName: string, quantity: number) => {
    setOrder(prevOrder => {
      const newQuantity = (prevOrder[productName] || 0) + quantity;
      if (newQuantity <= 0) {
        const { [productName]: _, ...rest } = prevOrder;
        return rest;
      }
      return { ...prevOrder, [productName]: newQuantity };
    });
  };

  const handleGelatoAdd = (gelato: any) => {
    setGelatoOrder(prevOrder => [...prevOrder, gelato]);
  };

  const handleRemoveGelato = (index: number) => {
    setGelatoOrder(prevOrder => prevOrder.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Here you would typically send the order to your backend
    console.log('Order submitted:', { regularOrder: order, gelatoOrder });
    // Navigate back to dashboard or show a confirmation
    navigate('/dashboard');
  };

  const calculateTotal = () => {
    const regularTotal = Object.entries(order).reduce((total, [product, quantity]) => {
      const categoryProduct = categories.flatMap(cat => cat.products).find(p => p.name === product);
      return total + (categoryProduct?.price || 0) * quantity;
    }, 0);

    const gelatoTotal = gelatoOrder.reduce((total, item) => total + item.price, 0);

    return regularTotal + gelatoTotal;
  };

  const toggleMobileOrder = () => {
    setShowMobileOrder(!showMobileOrder);
  };

  const CurrentOrder = () => (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">{t('currentOrder')}</h2>
      <div className="space-y-2 mb-4">
        {Object.entries(order).map(([product, quantity]) => (
          <div key={product} className="flex justify-between items-center">
            <span>{product}</span>
            <span>x{quantity}</span>
          </div>
        ))}
        {gelatoOrder.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span>{item.product}: {item.flavors.join(', ')}</span>
            <button 
              onClick={() => handleRemoveGelato(index)}
              className="text-red-500 hover:text-red-700"
            >
              {t('remove')}
            </button>
          </div>
        ))}
      </div>
      <div className="font-bold text-xl mb-4">
        {t('total')}: ${calculateTotal()}
      </div>
      <button
        onClick={() => setShowSummary(true)}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {t('reviewOrder')}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar title={t('newOrder')} />
      <div className="container mx-auto mt-8 p-4">
        {/* Mobile Order Toggle Button */}
        <button
          className="md:hidden w-full bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={toggleMobileOrder}
        >
          {showMobileOrder ? t('hideOrder') : t('showOrder')}
        </button>

        {/* Mobile Floating Order Summary */}
        {showMobileOrder && (
          <div className="md:hidden fixed top-16 left-0 right-0 z-10 p-4 bg-white shadow-md">
            <CurrentOrder />
            <button
              className="w-full bg-gray-300 text-gray-800 px-4 py-2 rounded mt-4"
              onClick={toggleMobileOrder}
            >
              {t('hideOrder')}
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {categories.map(category => 
                category.name !== 'Gelato' ? (
                  <ProductCategory
                    key={category.name}
                    category={category}
                    onProductSelect={handleProductSelect}
                  />
                ) : (
                  <GelatoOrder
                    key={category.name}
                    gelatoProducts={category.products}
                    onGelatoAdd={handleGelatoAdd}
                  />
                )
              )}
            </div>
          </div>
          <div className="hidden md:block md:col-span-1">
            <div className="sticky top-8">
              <CurrentOrder />
            </div>
          </div>
        </div>
      </div>
      {showSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <OrderSummary
              regularOrder={order}
              gelatoOrder={gelatoOrder}
              onEdit={() => setShowSummary(false)}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewOrder;