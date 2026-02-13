import React, { useEffect, useState } from 'react';
import api from '../../lib/api';
import { AdminLayout } from '../../components/AdminLayout';
import { Pencil, Trash2, Plus, X, PlusCircle, MinusCircle } from 'lucide-react';
import { TechnicalSheet, Ingredient, Product } from '../../types';

export const AdminTechnicalSheets = () => {
  const [sheets, setSheets] = useState<TechnicalSheet[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSheet, setSelectedSheet] = useState<Partial<TechnicalSheet> | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [sheetsRes, ingRes, prodRes] = await Promise.all([
      api.get('/technical-sheets'),
      api.get('/ingredients'),
      api.get('/products')
    ]);
    setSheets(sheetsRes.data);
    setIngredients(ingRes.data);
    setProducts(prodRes.data);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedSheet?.id) {
        await api.put(`/technical-sheets/${selectedSheet.id}`, selectedSheet);
      } else {
        await api.post('/technical-sheets', selectedSheet);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      alert('Erro ao salvar ficha técnica');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deseja excluir esta ficha técnica?')) {
      await api.delete(`/technical-sheets/${id}`);
      fetchData();
    }
  };

  const addIngredientItem = () => {
    const currentItems = selectedSheet?.ingredients || [];
    setSelectedSheet({
      ...selectedSheet,
      ingredients: [...currentItems, { ingredientId: '', quantity: 0 }]
    });
  };

  const removeIngredientItem = (index: number) => {
    const currentItems = [...(selectedSheet?.ingredients || [])];
    currentItems.splice(index, 1);
    setSelectedSheet({ ...selectedSheet, ingredients: currentItems });
  };

  const updateIngredientItem = (index: number, field: string, value: any) => {
    const currentItems = [...(selectedSheet?.ingredients || [])];
    currentItems[index] = { ...currentItems[index], [field]: value };
    setSelectedSheet({ ...selectedSheet, ingredients: currentItems });
  };

  const calculateTotal = (sheet: Partial<TechnicalSheet>) => {
    return sheet.ingredients?.reduce((acc, item) => {
      const ing = ingredients.find(i => i.id === item.ingredientId);
      return acc + (ing ? ing.cost * item.quantity : 0);
    }, 0) || 0;
  };

  return (
    <AdminLayout title="Fichas Técnicas">
      <div className="flex justify-between items-center mb-8">
        <p className="text-gray-600">Gestão de composições e custos dos produtos.</p>
        <button
          onClick={() => { setSelectedSheet({ ingredients: [], name: '', productId: '', observations: '' }); setIsModalOpen(true); }}
          className="bg-primary-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-primary-700 transition"
        >
          <Plus className="w-4 h-4 mr-2" /> Nova Ficha
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome da Ficha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produto Vinculado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Custo Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preço Venda</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Margem (MC)</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sheets.map((item) => {
              const product = products.find(p => p.id === item.productId);
              const totalCost = calculateTotal(item);
              const salePrice = product?.price || 0;
              const marginValue = salePrice - totalCost;
              const marginPercentage = salePrice > 0 ? (marginValue / salePrice) * 100 : 0;

              return (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product?.name || 'Não vinculado'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-primary-600">
                    {totalCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {salePrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className={`font-bold ${marginPercentage > 30 ? 'text-green-600' : 'text-orange-600'}`}>
                      {marginValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                    <div className="text-xs text-gray-500">{marginPercentage.toFixed(2)}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <button onClick={() => { setSelectedSheet(item); setIsModalOpen(true); }} className="text-blue-600 hover:text-blue-900">
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">{selectedSheet?.id ? 'Editar Ficha Técnica' : 'Nova Ficha Técnica'}</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6" /></button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 flex-grow overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome da Ficha</label>
                  <input
                    type="text"
                    required
                    value={selectedSheet?.name || ''}
                    onChange={e => setSelectedSheet({ ...selectedSheet, name: e.target.value })}
                    className="mt-1 block w-full border rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Produto Vinculado</label>
                  <select
                    required
                    value={selectedSheet?.productId || ''}
                    onChange={e => setSelectedSheet({ ...selectedSheet, productId: e.target.value })}
                    className="mt-1 block w-full border rounded-md p-2"
                  >
                    <option value="">Selecione um produto</option>
                    {products
                      .filter(p => !sheets.some(s => s.productId === p.id && s.id !== selectedSheet?.id))
                      .map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-800">Composição (Insumos)</h3>
                  <button type="button" onClick={addIngredientItem} className="text-primary-600 flex items-center text-sm font-semibold">
                    <PlusCircle className="w-4 h-4 mr-1" /> Adicionar Insumo
                  </button>
                </div>
                
                <div className="space-y-3">
                  {selectedSheet?.ingredients?.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md border">
                      <div className="flex-grow">
                        <select
                          required
                          value={item.ingredientId}
                          onChange={e => updateIngredientItem(index, 'ingredientId', e.target.value)}
                          className="w-full border rounded-md p-2 text-sm"
                        >
                          <option value="">Selecione o insumo</option>
                          {ingredients.map(ing => (
                            <option key={ing.id} value={ing.id}>
                              {ing.name} ({ing.unit}) - {ing.cost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="w-32">
                        <input
                          type="number"
                          step="0.001"
                          placeholder="Qtd"
                          required
                          value={item.quantity}
                          onChange={e => updateIngredientItem(index, 'quantity', parseFloat(e.target.value))}
                          className="w-full border rounded-md p-2 text-sm"
                        />
                      </div>
                      <button type="button" onClick={() => removeIngredientItem(index)} className="text-red-500">
                        <MinusCircle className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Observações de Preparo</label>
                <textarea
                  value={selectedSheet?.observations || ''}
                  onChange={e => setSelectedSheet({ ...selectedSheet, observations: e.target.value })}
                  className="mt-1 block w-full border rounded-md p-2 h-24"
                />
              </div>

              <div className="bg-primary-50 p-4 rounded-lg flex justify-between items-center border border-primary-200">
                <span className="text-primary-800 font-bold uppercase text-sm">Custo Total da Composição:</span>
                <span className="text-2xl font-black text-primary-600">
                  {calculateTotal(selectedSheet!).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
            </form>

            <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 border rounded-md text-gray-600 hover:bg-white">Cancelar</button>
              <button type="button" onClick={handleSave} className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 font-bold">Salvar Ficha Técnica</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
