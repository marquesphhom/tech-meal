import React, { ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Utensils, CalendarDays, LogOut, Package, ClipboardList } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/products', label: 'Cardápio', icon: Utensils },
    { path: '/admin/ingredients', label: 'Insumos', icon: Package },
    { path: '/admin/technical-sheets', label: 'Fichas Técnicas', icon: ClipboardList },
    { path: '/admin/reservations', label: 'Reservas', icon: CalendarDays },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-bold text-primary-600">Admin Tech Meal</h2>
          <p className="text-sm text-gray-500">Olá, {user.username}</p>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-3 text-sm font-medium ${
                  isActive ? 'text-primary-600 bg-primary-50 border-r-4 border-primary-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" /> {item.label}
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-6 py-3 text-sm font-medium text-red-600 hover:bg-red-50 mt-10"
          >
            <LogOut className="w-5 h-5 mr-3" /> Sair
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8">{title}</h1>
        {children}
      </main>
    </div>
  );
};
