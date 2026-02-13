import React, { useEffect, useState } from 'react';
import api from '../../lib/api';
import { AdminLayout } from '../../components/AdminLayout';
import { Eye, ClipboardList, Pencil, Trash2, Plus } from 'lucide-react';

export const AdminProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await api.get('/products');
    setProducts(res.data);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir?')) {
      await api.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <AdminLayout title="Gestão de Cardápio">
      <div className="flex justify-between items-center mb-8">
        <p className="text-gray-600">Gerencie os itens do seu cardápio aqui.</p>
        <button onClick={() => { setSelectedProduct(null); setIsModalOpen(true); }} className="bg-primary-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-primary-700">
          <Plus className="w-4 h-4 mr-2" /> Novo Produto
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button onClick={() => { setSelectedProduct(product); setIsModalOpen(true); }} className="text-blue-600 hover:text-blue-900" title="Ver Detalhes">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="text-green-600 hover:text-green-900" title="Editar">
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900" title="Excluir">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Simulado (apenas exibição para exemplo) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
            <h2 className="text-2xl font-bold mb-4">{selectedProduct ? 'Detalhes do Produto' : 'Novo Produto'}</h2>
            <div className="space-y-4">
              <p className="border-b pb-2"><strong>Nome:</strong> {selectedProduct?.name || '---'}</p>
              <p className="border-b pb-2"><strong>Descrição:</strong> {selectedProduct?.description || '---'}</p>
              <p className="border-b pb-2"><strong>Preço:</strong> {selectedProduct?.price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || '---'}</p>
            </div>
            <button onClick={() => setIsModalOpen(false)} className="mt-8 w-full bg-primary-600 text-white py-2 rounded-md font-bold hover:bg-primary-700">Fechar</button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
