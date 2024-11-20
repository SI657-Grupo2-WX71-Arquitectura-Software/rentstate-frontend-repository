import './styles/App.css';
import HomeRentState from './components/HomeRentState';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import PropertyDetail from './components/PropertyDetail';
import Chat from './components/Chat';
import AddProperty from './components/AddProperty';
import PostProperty from './components/PostProperty';
import Register from './components/Register Account/Register';
import MyAccount from './components/MyAccount/MyAccount';
import OtherAccount from './components/OtherAccount';
import { FavoriteProperties } from './components/FavoriteProperties';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import RenAssistant from './components/RenAssistant';
import PropertyStep1 from './components/CreateProperty/PropertyStep1';

function NotFound() {
    return (
        <div style={{height:'80vh', display:'block', alignContent: 'center'}}>
            <h1>404 - Page Not Found</h1>
            <p>¡Ups! No encontramos la página que buscas</p>
        </div>
    );
}

function App() {
    const location = useLocation();

    return (
        <div className="App">
            <header className="App-header">
                <Navbar />
                <Routes>
                    <Route path="/perfil" element={<MyAccount />} />
                    <Route path="/home" element={<HomeRentState />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/mensajes" element={<Chat />} />
                    <Route path="/crear_propiedad" element={<PropertyStep1 />} />
                    <Route path="/publicar" element={<PostProperty />} />
                    <Route path="/favoritos" element={<FavoriteProperties />} />
                    <Route path="/property/:id" element={<PropertyDetail />} />
                    <Route path="/perfil/:userId" element={<OtherAccount />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </header>
            <ToastContainer />
            {location.pathname !== '/login' && location.pathname !== '/register' && <RenAssistant />}
        </div>
    );
}

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;