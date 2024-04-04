import './App.css';
import HomeRentState from './components/HomeRentState';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Navbar/>				
				<HomeRentState/>			
				<Footer/>			
			</header>
		</div>
	);
}

export default App;
