import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { PlayfulButton } from '../../components/PlayfulButton';
import { PlayfulInput } from '../../components/PlayfulInput';
import { PlayfulSelect } from '../../components/PlayfulSelect';
import { PlayfulToast } from '../../components/PlayfulToast';

const BookingForm = () => {
  const navigate = useNavigate();
  const { companionId } = useParams();
  const [companion, setCompanion] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [notes, setNotes] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  useEffect(() => {
    fetchCompanionDetails();
  }, [companionId]);

  const fetchCompanionDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:5000/api/companions/${companionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setCompanion(response.data);
      setServices(response.data.services);
    } catch (error) {
      showErrorToast('Failed to fetch companion details');
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedService || !startTime || !endTime) {
      showErrorToast('Please fill in all required fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/bookings',
        {
          companion_profile_id: companionId,
          service_id: selectedService,
          start_time: new Date(startTime).toISOString(),
          end_time: new Date(endTime).toISOString(),
          notes
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      showSuccessToast('Booking created successfully');
      navigate('/bookings');
    } catch (error) {
      showErrorToast(error.response?.data?.error || 'Failed to create booking');
    }
  };

  if (!companion) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Book {companion.name}</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service
            </label>
            <PlayfulSelect
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              required
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.service_name} - Rp {service.price_per_hour}/hour
                </option>
              ))}
            </PlayfulSelect>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time
            </label>
            <PlayfulInput
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Time
            </label>
            <PlayfulInput
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Add any special requests or notes..."
            />
          </div>

          <div className="flex justify-end space-x-4">
            <PlayfulButton
              type="button"
              onClick={() => navigate(-1)}
              variant="secondary"
            >
              Cancel
            </PlayfulButton>
            <PlayfulButton type="submit" variant="primary">
              Create Booking
            </PlayfulButton>
          </div>
        </form>
      </div>

      <PlayfulToast
        show={showToast}
        message={toastMessage}
        type={toastType}
        position="top-right"
      />
    </div>
  );
};

export default BookingForm; 