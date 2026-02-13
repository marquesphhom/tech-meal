import React, { useEffect, useState } from 'react';
import api from '../../lib/api';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export const Menu = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get('/products').then(res => setProducts(res.data));
  }, []);

  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Nosso Cardápio</h1>
      
      {categories.map(category => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 border-b-2 border-primary-200 pb-2">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.filter(p => p.category === category).map(product => (
              <div key={product.id} className="flex justify-between items-start p-4 bg-white rounded-lg shadow-sm border">
                <div>
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                </div>
                <span className="text-primary-600 font-bold">
                  {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
