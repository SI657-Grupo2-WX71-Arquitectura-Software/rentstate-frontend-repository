import './App.css';
import Contact from './components/Contact';
import Download from './components/Download';
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
	return (
		<div className="App">
			<header className="App-header">

				<Navbar/>
				<Home/>      
			
				<Download/>
				<Contact/>
				<Footer/>
			
			
			</header>
		</div>
	);
}

export default App;
