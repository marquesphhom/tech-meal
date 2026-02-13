import React, { useEffect, useState } from 'react';
import api from '../../lib/api';
import { AdminLayout } from '../../components/AdminLayout';
import { CheckCircle, XCircle, Trash2 } from 'lucide-react';

export const AdminReservations = () => {
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    const res = await api.get('/reservations');
    setReservations(res.data);
  };

  const updateStatus = async (id: string, status: string) => {
    await api.put(`/reservations/${id}`, { status });
    fetchReservations();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Excluir registro de reserva?')) {
      await api.delete(`/reservations/${id}`);
      fetchReservations();
    }
  };

  return (
    <AdminLayout title="Gestão de Reservas">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data/Hora</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mesa</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reservations.map((res) => (
              <tr key={res.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{res.fullName}</div>
                  <div className="text-sm text-gray-500">{res.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {res.date} às {res.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mesa {res.tableNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${res.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                      res.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {res.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button onClick={() => updateStatus(res.id, 'confirmed')} className="text-green-600 hover:text-green-900" title="Confirmar">
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <button onClick={() => updateStatus(res.id, 'cancelled')} className="text-orange-600 hover:text-orange-900" title="Cancelar">
                    <XCircle className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(res.id)} className="text-red-600 hover:text-red-900" title="Excluir">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};
