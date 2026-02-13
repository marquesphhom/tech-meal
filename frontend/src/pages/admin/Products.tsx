import React, { useEffect, useState } from 'react';
import api from '../../lib/api';
import { LayoutDashboard, Utensils, CalendarDays, LogOut, Eye, ClipboardList, Pencil, Trash2, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const AdminProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-bold text-primary-600">Admin Tech Meal</h2>
        </div>
        <nav className="mt-6">
          <Link to="/admin" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-200">
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </Link>
          <Link to="/admin/products" className="flex items-center px-6 py-3 text-gray-700 bg-gray-200">
            <Utensils className="w-5 h-5 mr-3" /> Cardápio
          </Link>
          <Link to="/admin/reservations" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-200">
            <CalendarDays className="w-5 h-5 mr-3" /> Reservas
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center px-6 py-3 text-red-600 hover:bg-red-50 mt-10">
            <LogOut className="w-5 h-5 mr-3" /> Sair
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Gestão de Cardápio</h1>
          <button onClick={() => { setSelectedProduct(null); setIsModalOpen(true); }} className="bg-primary-600 text-white px-4 py-2 rounded-md flex items-center">
            <Plus className="w-4 h-4 mr-2" /> Novo Produto
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
                <tr key={product.id}>
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
                    <button onClick={() => { setSelectedProduct(product); setIsSheetOpen(true); }} className="text-orange-600 hover:text-orange-900" title="Ficha Técnica">
                      <ClipboardList className="w-5 h-5" />
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
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">{selectedProduct ? 'Detalhes do Produto' : 'Novo Produto'}</h2>
              <div className="space-y-4">
                <p><strong>Nome:</strong> {selectedProduct?.name || '---'}</p>
                <p><strong>Descrição:</strong> {selectedProduct?.description || '---'}</p>
                <p><strong>Preço:</strong> {selectedProduct?.price || '---'}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="mt-6 w-full bg-primary-600 text-white py-2 rounded-md">Fechar</button>
            </div>
          </div>
        )}

        {isSheetOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-4">Ficha Técnica: {selectedProduct?.name}</h2>
              <table className="min-w-full border mt-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">Insumo</th>
                    <th className="p-2 border">Qtd</th>
                    <th className="p-2 border">Custo</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProduct?.technicalSheet?.ingredients.map((ing: any, i: number) => (
                    <tr key={i}>
                      <td className="p-2 border">{ing.name}</td>
                      <td className="p-2 border">{ing.quantity}</td>
                      <td className="p-2 border">{ing.cost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 font-bold">
                    <td colSpan={2} className="p-2 border text-right">Custo Total:</td>
                    <td className="p-2 border text-primary-600">
                      {selectedProduct?.technicalSheet?.ingredients.reduce((acc: number, ing: any) => acc + ing.cost, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div className="mt-4">
                <h3 className="font-semibold">Observações:</h3>
                <p className="text-gray-600">{selectedProduct?.technicalSheet?.observations || 'Nenhuma observação.'}</p>
              </div>
              <button onClick={() => setIsSheetOpen(false)} className="mt-6 w-full bg-primary-600 text-white py-2 rounded-md">Fechar</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
