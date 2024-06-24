import './styles/App.css';
import HomeRentState from './components/HomeRentState';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MyAccount from './components/MyAccount';
import Login from './components/Login';
import MyProperties from './components/MyProperties';
import Register from './components/Register';
import PropertyDetail from './components/PropertyDetail';
import ListRentedProperties from './components/ListRentedProperties';
import Chat from './components/Chat';
import Clients from './components/Clients';
import AddProperty from './components/AddProperty';
import MyPublish from './components/MyPublish';
import ExternalProfileDetails from './components/ExternalProfileDetails';
import NearbyPropertiesMap from './components/NearbyPropertiesMap';
import { AuthProvider, useAuth } from './AuthContext';

function NotFound() {
  return (
    <div style={{ height: '80vh', display: 'block', alignContent: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>¡Ups! No encontramos la página que buscas</p>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <Navbar />
            <Routes>
              <Route path="/perfil" element={<PrivateRoute><MyAccount /></PrivateRoute>} />
              <Route path="/home" element={<PrivateRoute><HomeRentState /></PrivateRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/posts" element={<PrivateRoute><MyProperties /></PrivateRoute>} />
              <Route path="/mensajes" element={<PrivateRoute><Chat /></PrivateRoute>} />
              <Route path="/crear_propiedad" element={<PrivateRoute><AddProperty /></PrivateRoute>} />
              <Route path="/publicar" element={<PrivateRoute><MyPublish /></PrivateRoute>} />
              <Route path="/clients" element={<PrivateRoute><Clients /></PrivateRoute>} />
              <Route path="/property/:id" element={<PrivateRoute><PropertyDetail /></PrivateRoute>} />
              <Route path="/external-profile/:id" element={<PrivateRoute><ExternalProfileDetails /></PrivateRoute>} />
              <Route path="/property_rented" element={<PrivateRoute><ListRentedProperties /></PrivateRoute>} />
              <Route path="/nearby-properties" element={<PrivateRoute><NearbyPropertiesMap /></PrivateRoute>} />
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
            <Footer />
          </header>
        </div>
      </Router>
    </AuthProvider>
  );
}

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default App;
