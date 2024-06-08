import './styles/App.css';
import HomeRentState from './components/HomeRentState';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import MyPosts from './components/MyPosts';
import ExternalProfileDetails from './components/ExternalProfileDetails';

function NotFound() {
  return (
    <div style={{height:'80vh', display:'block', alignContent: 'center'}}>
      <h1>404 - Page Not Found</h1>
      <p>¡Ups! No encontramos la página que buscas</p>
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
            <Route path="/perfil" element={<MyAccount />} />
            <Route path="/" element={<HomeRentState />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts" element={<MyProperties />} />
            <Route path="/mensajes" element={<Chat />} />
            <Route path="/crear_propiedad" element={<AddProperty />} />
            <Route path="/publicar" element={<MyPublish />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/external-profile/:id" element={<ExternalProfileDetails />} /> {/* Nueva ruta */}
            <Route path="/property_rented" element={<ListRentedProperties />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </header>
      </div>
    </Router>
  );
}

export default App;
