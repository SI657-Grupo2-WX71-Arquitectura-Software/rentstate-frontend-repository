import React from "react";
import "../styles/Home.css";

const Home = () => {
return (   	
	<div id="home">	
		<div className="home-container">
			
			<div className="home-title">				
				Bienvenido a <span style={{color:'#00334B', marginLeft:'0.7rem'}}> RentState</span>
			</div>

			
			<div className="home-desc">
				Transforma tu experiencia al encontrar tu próximo hogar en Lima, Perú. 
				Descubre una amplia gama de opciones de alquiler de inmuebles. ¡Solo en RentState!
          	</div>

			<div style={{display:'flex', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
			<div className="home-button" onClick={() =>  window.open("https://renstate-aedf7.web.app/home", "_blank")}>
				<p>Ir a RentState</p>
			</div>
			</div>
		
			
		</div>
	</div>
);
};

export default Home;