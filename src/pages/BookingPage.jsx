import React, { useState } from 'react';
import PlayfulInput from '../components/PlayfulInput';
import PlayfulButton from '../components/PlayfulButton';

const BookingPage = () => {
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock booking submission
    console.log('Booking submitted:', bookingDetails);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Book a Companion</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2">
          <PlayfulInput
            label="Name"
            name="name"
            value={bookingDetails.name}
            onChange={handleChange}
            required
          />
          <PlayfulInput
            label="Email"
            name="email"
            type="email"
            value={bookingDetails.email}
            onChange={handleChange}
            required
          />
          <PlayfulInput
            label="Date"
            name="date"
            type="date"
            value={bookingDetails.date}
            onChange={handleChange}
            required
          />
          <PlayfulInput
            label="Time"
            name="time"
            type="time"
            value={bookingDetails.time}
            onChange={handleChange}
            required
          />
          <PlayfulButton type="submit">Submit Booking</PlayfulButton>
        </div>
      </form>
    </div>
  );
};

export default BookingPage; 