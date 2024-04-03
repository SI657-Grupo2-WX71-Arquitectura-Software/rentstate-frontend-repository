import './App.css';
import Download from './components/Download';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
	return (
		<div className="App">
			<header className="App-header">

				<Navbar/>				
				<Download/>			
				<Footer/>
			
			
			</header>
		</div>
	);
}

export default App;
