import React, { useEffect, useState } from 'react';
import api from '../../lib/api';
import { AdminLayout } from '../../components/AdminLayout';
import { Eye, Pencil, Trash2, Plus, X } from 'lucide-react';
import { Ingredient } from '../../types';

export const AdminIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<Partial<Ingredient> | null>(null);

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const res = await api.get('/ingredients');
      setIngredients(res.data);
    } catch (error) {
      console.error('Error fetching ingredients', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deseja excluir este insumo?')) {
      await api.delete(`/ingredients/${id}`);
      fetchIngredients();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedIngredient?.id) {
        await api.put(`/ingredients/${selectedIngredient.id}`, selectedIngredient);
      } else {
        await api.post('/ingredients', selectedIngredient);
      }
      setIsModalOpen(false);
      fetchIngredients();
    } catch (error) {
      alert('Erro ao salvar insumo');
    }
  };

  return (
    <AdminLayout title="Gestão de Insumos">
      <div className="flex justify-between items-center mb-8">
        <p className="text-gray-600">Cadastre e gerencie os insumos utilizados nas fichas técnicas.</p>
        <button
          onClick={() => { setSelectedIngredient({}); setIsModalOpen(true); }}
          className="bg-primary-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-primary-700 transition"
        >
          <Plus className="w-4 h-4 mr-2" /> Novo Insumo
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Insumo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grupos (L1/L2/L3)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unidade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Custo Unit.</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ingredients.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                  {item.groupLevel1} / {item.groupLevel2} / {item.groupLevel3}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.unit}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.cost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <button onClick={() => { setSelectedIngredient(item); setIsModalOpen(true); }} className="text-blue-600 hover:text-blue-900">
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">{selectedIngredient?.id ? 'Editar Insumo' : 'Novo Insumo'}</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Nome do Insumo</label>
                  <input
                    type="text"
                    required
                    value={selectedIngredient?.name || ''}
                    onChange={e => setSelectedIngredient({ ...selectedIngredient, name: e.target.value })}
                    className="mt-1 block w-full border rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Unidade (kg, un, l, etc)</label>
                  <input
                    type="text"
                    required
                    value={selectedIngredient?.unit || ''}
                    onChange={e => setSelectedIngredient({ ...selectedIngredient, unit: e.target.value })}
                    className="mt-1 block w-full border rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Custo Unitário</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={selectedIngredient?.cost || ''}
                    onChange={e => setSelectedIngredient({ ...selectedIngredient, cost: parseFloat(e.target.value) })}
                    className="mt-1 block w-full border rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Grupo L1 (Ex: ALIMENTAR)</label>
                  <input
                    type="text"
                    value={selectedIngredient?.groupLevel1 || ''}
                    onChange={e => setSelectedIngredient({ ...selectedIngredient, groupLevel1: e.target.value })}
                    className="mt-1 block w-full border rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Grupo L2 (Ex: PROTEINA)</label>
                  <input
                    type="text"
                    value={selectedIngredient?.groupLevel2 || ''}
                    onChange={e => setSelectedIngredient({ ...selectedIngredient, groupLevel2: e.target.value })}
                    className="mt-1 block w-full border rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Grupo L3 (Ex: BOVINA)</label>
                  <input
                    type="text"
                    value={selectedIngredient?.groupLevel3 || ''}
                    onChange={e => setSelectedIngredient({ ...selectedIngredient, groupLevel3: e.target.value })}
                    className="mt-1 block w-full border rounded-md p-2"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
