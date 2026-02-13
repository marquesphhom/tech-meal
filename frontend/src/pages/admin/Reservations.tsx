import React, { useEffect, useState } from 'react';
import api from '../../lib/api';
import { LayoutDashboard, Utensils, CalendarDays, LogOut, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const AdminReservations = () => {
  const [reservations, setReservations] = useState<any[]>([]);
  const navigate = useNavigate();

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
          <Link to="/admin/products" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-200">
            <Utensils className="w-5 h-5 mr-3" /> Cardápio
          </Link>
          <Link to="/admin/reservations" className="flex items-center px-6 py-3 text-gray-700 bg-gray-200">
            <CalendarDays className="w-5 h-5 mr-3" /> Reservas
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center px-6 py-3 text-red-600 hover:bg-red-50 mt-10">
            <LogOut className="w-5 h-5 mr-3" /> Sair
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8">Gestão de Reservas</h1>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
                <tr key={res.id}>
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
      </main>
    </div>
  );
};
