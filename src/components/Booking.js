import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/Booking.css';

const Booking = ({ onBookingSuccess }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleBookingConfirmation = () => {
    if (selectedDate) {
      onBookingSuccess();
    }
  };

  return (
    <div className="bookingContainer">
      <h2>Seleccione una fecha de alquiler</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        minDate={new Date()} 
      />
      <button onClick={handleBookingConfirmation}>Aceptar</button>
    </div>
  );
};

export default Booking;
