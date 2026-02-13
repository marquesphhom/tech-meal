import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/public/Home';
import { Menu } from './pages/public/Menu';
import { Reservation } from './pages/public/Reservation';
import { Buffet } from './pages/public/Buffet';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { AdminProducts } from './pages/admin/Products';
import { AdminIngredients } from './pages/admin/Ingredients';
import { AdminTechnicalSheets } from './pages/admin/TechnicalSheets';
import { AdminReservations } from './pages/admin/Reservations';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <header className="bg-white shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary-600">Tech Meal</Link>
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-700 hover:text-primary-600">Home</Link>
              <Link to="/menu" className="text-gray-700 hover:text-primary-600">Cardápio</Link>
              <Link to="/reservation" className="text-gray-700 hover:text-primary-600">Reservas</Link>
              <Link to="/buffet" className="text-gray-700 hover:text-primary-600">Buffet</Link>
              <Link to="/admin" className="text-gray-500 hover:text-primary-600 ml-4">Restrito</Link>
            </div>
          </nav>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/buffet" element={<Buffet />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/products" element={
              <ProtectedRoute>
                <AdminProducts />
              </ProtectedRoute>
            } />
            <Route path="/admin/ingredients" element={
              <ProtectedRoute>
                <AdminIngredients />
              </ProtectedRoute>
            } />
            <Route path="/admin/technical-sheets" element={
              <ProtectedRoute>
                <AdminTechnicalSheets />
              </ProtectedRoute>
            } />
            <Route path="/admin/reservations" element={
              <ProtectedRoute>
                <AdminReservations />
              </ProtectedRoute>
            } />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>&copy; 2026 Tech Meal Restaurant. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
