import './App.css';
import HomeRentState from './components/HomeRentState';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MyAccount from './components/MyAccount';
import Login from './components/Login';
import List from './components/List';
import Register from './components/Register';
import CardDetail from './components/CardDetail';

function NotFound() {
    return (
      <div>
        <h1>404 - Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    );
  }

function App() {
    return (
        <Router>
      <div className="App">
        <header className="App-header">
          <Navbar />				
          <Routes>
            <Route path="/MiCuenta" element={<MyAccount />} />
            <Route path="/" element={<HomeRentState />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/list" element={<List />} />
            <Route path="/properties/:id" element={<CardDetail />} />
            {/* Ruta para manejar cualquier otra URL no encontrada */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />			
        </header>
      </div>
    </Router>
    );
}

export default App;
