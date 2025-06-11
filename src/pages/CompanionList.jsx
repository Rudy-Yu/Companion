import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/axios';
import API_ENDPOINTS from '../config/api';

const CompanionList = () => {
  const [companions, setCompanions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCompanions();
  }, []);

  const fetchCompanions = async () => {
    try {
      const response = await api.get(API_ENDPOINTS.COMPANIONS);
      setCompanions(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch companions');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Companions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companions.map((companion) => (
          <Link
            key={companion.id}
            to={`/companions/${companion.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={companion.profile_image || 'https://via.placeholder.com/300x200'}
              alt={companion.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{companion.name}</h2>
              <p className="text-gray-600 mb-2">{companion.location}</p>
              <div className="flex items-center mb-2">
                <span className="text-yellow-400">★</span>
                <span className="ml-1">{companion.rating || 'New'}</span>
              </div>
              <p className="text-gray-700">{companion.description?.substring(0, 100)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompanionList; 