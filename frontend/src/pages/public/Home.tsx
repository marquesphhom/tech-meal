import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="bg-white">
      <section className="relative h-[500px] flex items-center justify-center bg-gray-900 text-white">
        <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-4">Tech Meal</h1>
          <p className="text-xl mb-8">A melhor experiência gastronômica com tecnologia.</p>
          <div className="flex justify-center space-x-4">
            <Link to="/menu" className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-md font-semibold">Ver Cardápio</Link>
            <Link to="/reservation" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold">Reservar Mesa</Link>
          </div>
        </div>
      </section>
      
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nossos Diferenciais</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg text-center">
            <div className="text-primary-600 mb-4 text-4xl">🥘</div>
            <h3 className="text-xl font-semibold mb-2">Ingredientes Frescos</h3>
            <p className="text-gray-600">Trabalhamos apenas com os melhores fornecedores locais.</p>
          </div>
          <div className="p-6 border rounded-lg text-center">
            <div className="text-primary-600 mb-4 text-4xl">📱</div>
            <h3 className="text-xl font-semibold mb-2">Reserva Online</h3>
            <p className="text-gray-600">Agende sua mesa em segundos através do nosso site.</p>
          </div>
          <div className="p-6 border rounded-lg text-center">
            <div className="text-primary-600 mb-4 text-4xl">👨‍🍳</div>
            <h3 className="text-xl font-semibold mb-2">Chefs Renomados</h3>
            <p className="text-gray-600">Equipe apaixonada por criar sabores inesquecíveis.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
