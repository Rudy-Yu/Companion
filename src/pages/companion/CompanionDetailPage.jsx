import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PlayfulButton } from '../../components/PlayfulButton';
import { PlayfulToast } from '../../components/PlayfulToast';

const CompanionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [companion, setCompanion] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  useEffect(() => {
    fetchCompanionDetails();
  }, [id]);

  const fetchCompanionDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:5000/api/companions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setCompanion(response.data);
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

  const handleBookNow = () => {
    navigate(`/bookings/new/${id}`);
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
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-64">
            <img
              src={companion.profile_image || '/default-profile.jpg'}
              alt={companion.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{companion.name}</h1>
                <p className="text-gray-600">{companion.description}</p>
              </div>
              <PlayfulButton
                onClick={handleBookNow}
                variant="primary"
              >
                Book Now
              </PlayfulButton>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Age:</span> {companion.age}
                  </p>
                  <p>
                    <span className="font-medium">Gender:</span>{' '}
                    {companion.gender}
                  </p>
                  <p>
                    <span className="font-medium">Location:</span>{' '}
                    {companion.location}
                  </p>
                  <p>
                    <span className="font-medium">Rating:</span>{' '}
                    {companion.rating || 'No ratings yet'}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Services</h2>
                <div className="space-y-4">
                  {companion.services.map((service) => (
                    <div
                      key={service.id}
                      className="bg-gray-50 p-4 rounded-lg"
                    >
                      <h3 className="font-medium mb-2">
                        {service.service_name}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        {service.description}
                      </p>
                      <p className="text-blue-600 font-medium">
                        Rp {service.price_per_hour}/hour
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default CompanionDetailPage; 