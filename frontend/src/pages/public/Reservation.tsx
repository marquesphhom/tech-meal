import React, { useState, useEffect } from 'react';
import api from '../../lib/api';

export const Reservation = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    cpf: '',
    birthDate: '',
    email: '',
    date: '',
    time: '',
    tableNumber: ''
  });
  const [tables, setTables] = useState<any[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    api.get('/tables/available').then(res => setTables(res.data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/reservations', formData);
      setSubmitted(true);
    } catch (error) {
      alert('Erro ao realizar reserva. Tente novamente.');
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Reserva Enviada!</h2>
        <p className="text-gray-600">Sua reserva foi recebida e está aguardando confirmação. Entraremos em contato em breve.</p>
        <button onClick={() => setSubmitted(false)} className="mt-8 text-primary-600 font-semibold underline">Fazer outra reserva</button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Faça sua Reserva</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-lg shadow-md">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
          <input type="text" name="fullName" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-2 border" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Telefone (WhatsApp)</label>
            <input type="text" name="phone" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">CPF</label>
            <input type="text" name="cpf" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-2 border" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">E-mail</label>
          <input type="email" name="email" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-2 border" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Data</label>
            <input type="date" name="date" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Horário</label>
            <input type="time" name="time" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mesa</label>
            <select name="tableNumber" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-2 border">
              <option value="">Selecione</option>
              {tables.map(table => (
                <option key={table.number} value={table.number}>Mesa {table.number} ({table.capacity} pessoas)</option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="w-full bg-primary-600 text-white py-3 rounded-md font-bold hover:bg-primary-700 transition">Confirmar Reserva</button>
      </form>
    </div>
  );
};
