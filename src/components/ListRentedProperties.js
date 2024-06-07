import React from "react";
import { properties } from "../auxiliars/MyConsts";
import "../styles/ListRentedProperties.css";

function ListRentedProperties() {
  const rentedProperties = properties.filter((property) => property.rent === "rented");

  return (
    <div className="list">
      <h1>List of Rented Properties</h1>
      <div className="properties-list">
        {rentedProperties.map((property) => (
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

export default ListRentedProperties;
