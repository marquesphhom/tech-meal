import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Utensils, CalendarDays, LogOut } from 'lucide-react';

export const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-bold text-primary-600">Admin Tech Meal</h2>
          <p className="text-sm text-gray-500">Olá, {user.username}</p>
        </div>
        <nav className="mt-6">
          <Link to="/admin" className="flex items-center px-6 py-3 text-gray-700 bg-gray-200">
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </Link>
          <Link to="/admin/products" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-200">
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

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary-500">
            <h3 className="text-gray-500 text-sm font-medium uppercase">Produtos Ativos</h3>
            <p className="text-2xl font-bold">12</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm font-medium uppercase">Reservas Hoje</h3>
            <p className="text-2xl font-bold">5</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
            <h3 className="text-gray-500 text-sm font-medium uppercase">Mesas Ocupadas</h3>
            <p className="text-2xl font-bold">3/15</p>
          </div>
        </div>
      </main>
    </div>
  );
};
