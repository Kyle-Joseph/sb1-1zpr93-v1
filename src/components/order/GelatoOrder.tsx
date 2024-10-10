import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

const flavors = [
  'Vanilla', 'Chocolate', 'Strawberry', 'Mint Chocolate Chip',
  'Cookie Dough', 'Rocky Road', 'Coffee', 'Pistachio'
];

interface GelatoProduct {
  name: string;
  price: number;
}

interface GelatoOrderProps {
  gelatoProducts: GelatoProduct[];
  onGelatoAdd: (gelato: any) => void;
}

const GelatoOrder: React.FC<GelatoOrderProps> = ({ gelatoProducts, onGelatoAdd }) => {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState<GelatoProduct | null>(null);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);

  const handleProductSelect = (product: GelatoProduct) => {
    setSelectedProduct(product);
    setSelectedFlavors([]);
  };

  const handleFlavorToggle = (flavor: string) => {
    setSelectedFlavors(prev => 
      prev.includes(flavor) 
        ? prev.filter(f => f !== flavor)
        : [...prev, flavor]
    );
  };

  const handleAddGelato = () => {
    if (selectedProduct) {
      onGelatoAdd({
        product: selectedProduct.name,
        flavors: selectedFlavors,
        price: selectedProduct.price
      });
      setSelectedProduct(null);
      setSelectedFlavors([]);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{t('Gelato')}</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {gelatoProducts.map((product) => (
          <button
            key={product.name}
            onClick={() => handleProductSelect(product)}
            className={`p-2 rounded-lg ${
              selectedProduct?.name === product.name
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {product.name} - ${product.price}
          </button>
        ))}
      </div>
      {selectedProduct && (
        <>
          <h3 className="font-medium mb-2">{t('selectFlavors')} ({selectedProduct.name === 'Gelato Doble' ? '2' : '1'})</h3>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {flavors.map((flavor) => (
              <button
                key={flavor}
                onClick={() => handleFlavorToggle(flavor)}
                disabled={selectedFlavors.length >= (selectedProduct.name === 'Gelato Doble' ? 2 : 1) && !selectedFlavors.includes(flavor)}
                className={`p-2 rounded-lg ${
                  selectedFlavors.includes(flavor)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                } disabled:opacity-50`}
              >
                {t(flavor.toLowerCase().replace(' ', '_'))}
              </button>
            ))}
          </div>
          <button
            onClick={handleAddGelato}
            disabled={selectedFlavors.length === 0}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {t('addToOrder')}
          </button>
        </>
      )}
    </div>
  );
};

export default GelatoOrder;