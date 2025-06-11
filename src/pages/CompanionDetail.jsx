import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/axios';
import API_ENDPOINTS from '../config/api';

const CompanionDetail = () => {
  const { id } = useParams();
  const [companion, setCompanion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCompanionDetails();
  }, [id]);

  const fetchCompanionDetails = async () => {
    try {
      const response = await api.get(API_ENDPOINTS.COMPANION_DETAIL(id));
      setCompanion(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch companion details');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!companion) return <div>Companion not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={companion.profile_image || 'https://via.placeholder.com/400x600'}
              alt={companion.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-4">{companion.name}</h1>
            <div className="flex items-center mb-4">
              <span className="text-yellow-400 text-xl">★</span>
              <span className="ml-2 text-xl">{companion.rating || 'New'}</span>
            </div>
            <p className="text-gray-600 mb-4">{companion.location}</p>
            <p className="text-gray-700 mb-6">{companion.description}</p>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {companion.services?.map((service) => (
                  <div key={service.id} className="border rounded-lg p-4">
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-gray-600">Rp {service.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
              onClick={() => {/* TODO: Implement booking */}}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanionDetail; 