import React from 'react';

export const Buffet = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Serviço de Buffet</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <img src="https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Buffet" className="rounded-lg shadow-lg" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Leve o Tech Meal para o seu evento</h2>
          <p className="text-gray-600 mb-6">Oferecemos serviços completos de buffet para casamentos, aniversários e eventos corporativos. Nossa equipe cuida de tudo para que você possa aproveitar seu momento.</p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center"><span className="text-primary-600 mr-2">✓</span> Menu Personalizado</li>
            <li className="flex items-center"><span className="text-primary-600 mr-2">✓</span> Equipe de Garçons Profissionais</li>
            <li className="flex items-center"><span className="text-primary-600 mr-2">✓</span> Louças e Utensílios Inclusos</li>
            <li className="flex items-center"><span className="text-primary-600 mr-2">✓</span> Opções Veganas e Vegetarianas</li>
          </ul>
          <a href="https://wa.me/5511999999999" className="bg-green-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-700 inline-block">Solicitar Orçamento via WhatsApp</a>
        </div>
      </div>
    </div>
  );
};
