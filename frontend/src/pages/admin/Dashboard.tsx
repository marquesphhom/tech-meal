import React from 'react';
import { AdminLayout } from '../../components/AdminLayout';

export const Dashboard = () => {
  return (
    <AdminLayout title="Dashboard">
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
    </AdminLayout>
  );
};
