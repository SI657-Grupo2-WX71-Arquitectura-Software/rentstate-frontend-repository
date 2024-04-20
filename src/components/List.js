import React from "react";
import { properties } from "../auxiliars/MyConsts"; // Importa el array de propiedades desde el archivo de datos
import "../styles/List.css"; // Importa los estilos CSS para List

function List() {
  return (
    <div className="list">
      <h1>List of Properties</h1>
      <div className="properties-list">
        {properties.map((property) => (
          <div className="property-card" key={property.id}>
            <img src={property.cardimage} alt={property.category} />
            <div className="property-details">
              <h2>{property.category}</h2>
              <p>District: {property.district}</p>
              <p>Address: {property.address}</p>
              <p>Details: {property.details}</p>
              <p>Price: {property.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
