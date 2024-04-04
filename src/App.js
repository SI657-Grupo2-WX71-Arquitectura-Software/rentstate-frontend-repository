import './App.css';
import HomeRentState from './components/HomeRentState';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyAccount from './components/MyAccount';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Navbar/>				
                    <Routes>
                        <Route path="/MiCuenta" element={<MyAccount />} />
                        <Route path="/" element={<HomeRentState />} />
                    </Routes>
                    <Footer/>			
                </header>
            </div>
        </Router>
    );
}

export default App;
