import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

interface Product {
  name: string;
  price: number;
}

interface ProductCategoryProps {
  category: {
    name: string;
    products: Product[];
  };
  onProductSelect: (productName: string, quantity: number) => void;
}

const ProductCategory: React.FC<ProductCategoryProps> = ({ category, onProductSelect }) => {
  const { t } = useTranslation();
  const [addedProducts, setAddedProducts] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState<Record<string, string>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setFeedback({});
    }, 500);

    return () => clearTimeout(timer);
  }, [feedback]);

  const handleProductAdd = (product: Product) => {
    onProductSelect(product.name, 1);
    setAddedProducts(prev => ({
      ...prev,
      [product.name]: (prev[product.name] || 0) + 1
    }));
    setFeedback(prev => ({ ...prev, [product.name]: 'added' }));
  };

  const handleProductRemove = (product: Product) => {
    if (addedProducts[product.name] > 0) {
      onProductSelect(product.name, -1);
      setAddedProducts(prev => ({
        ...prev,
        [product.name]: Math.max((prev[product.name] || 0) - 1, 0)
      }));
      setFeedback(prev => ({ ...prev, [product.name]: 'removed' }));
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{t(category.name)}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {category.products.map((product) => (
          <div key={product.name} className="border rounded-lg p-4 relative overflow-hidden">
            <h3 className="font-medium mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">${product.price}</p>
            <div className="flex justify-between items-center">
              <button
                onClick={() => handleProductRemove(product)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
              >
                -
              </button>
              <span className="font-bold">
                {addedProducts[product.name] || 0}
              </span>
              <button
                onClick={() => handleProductAdd(product)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
              >
                +
              </button>
            </div>
            {feedback[product.name] && (
              <div 
                className={`absolute inset-0 bg-opacity-20 flex items-center justify-center transition-opacity duration-300`}
                style={{ 
                  backgroundColor: feedback[product.name] === 'added' ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)',
                }}
              >
                <span className={`font-bold text-lg ${feedback[product.name] === 'added' ? 'text-green-700' : 'text-red-700'}`}>
                  {t(feedback[product.name])}!
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;