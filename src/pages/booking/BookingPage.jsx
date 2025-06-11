import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PlayfulButton } from '../../components/PlayfulButton';
import { PlayfulInput } from '../../components/PlayfulInput';
import { PlayfulSelect } from '../../components/PlayfulSelect';
import { PlayfulToast } from '../../components/PlayfulToast';

const BookingPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/bookings', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBookings(response.data);
    } catch (error) {
      showErrorToast('Failed to fetch bookings');
    }
  };

  const showErrorToast = (message) => {
    setToastMessage(message);
    setToastType('error');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const showSuccessToast = (message) => {
    setToastMessage(message);
    setToastType('success');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      showSuccessToast('Booking cancelled successfully');
      fetchBookings();
    } catch (error) {
      showErrorToast('Failed to cancel booking');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <PlayfulButton
          onClick={() => navigate('/companions')}
          variant="primary"
        >
          Book New Companion
        </PlayfulButton>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No bookings found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    {booking.companion_profile.name}
                  </h2>
                  <p className="text-gray-600">
                    {booking.companion_profile.description}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Service</p>
                  <p className="font-medium">{booking.service.service_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Price</p>
                  <p className="font-medium">Rp {booking.total_price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Start Time</p>
                  <p className="font-medium">{formatDate(booking.start_time)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Time</p>
                  <p className="font-medium">{formatDate(booking.end_time)}</p>
                </div>
              </div>

              {booking.notes && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Notes</p>
                  <p className="font-medium">{booking.notes}</p>
                </div>
              )}

              {booking.status === 'pending' && (
                <div className="flex justify-end">
                  <PlayfulButton
                    onClick={() => handleCancelBooking(booking.id)}
                    variant="danger"
                  >
                    Cancel Booking
                  </PlayfulButton>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <PlayfulToast
        show={showToast}
        message={toastMessage}
        type={toastType}
        position="top-right"
      />
    </div>
  );
};

export default BookingPage; 