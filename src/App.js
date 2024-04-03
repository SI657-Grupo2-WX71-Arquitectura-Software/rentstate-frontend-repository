import './App.css';
import Contact from './components/Contact';
import Download from './components/Download';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
	return (
		<div className="App">
			<header className="App-header">

				<Navbar/>
				
				<Download/>
				<Contact/>
				<Footer/>
			
			
			</header>
		</div>
	);
}

export default App;
