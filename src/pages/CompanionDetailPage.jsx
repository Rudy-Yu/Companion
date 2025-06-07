import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlayfulCard from '../components/PlayfulCard';
import PlayfulButton from '../components/PlayfulButton';

const CompanionDetailPage = () => {
  const { id } = useParams();
  const [companion, setCompanion] = useState(null);

  useEffect(() => {
    // Mock data fetching
    const fetchCompanion = () => {
      const mockCompanion = {
        id: id,
        name: 'Companion ' + id,
        description: 'Detailed description for Companion ' + id,
        image: 'https://via.placeholder.com/300',
        price: 50,
        rating: 4.5,
        location: 'New York',
        tags: ['Tag 1', 'Tag 2'],
      };
      setCompanion(mockCompanion);
    };

    fetchCompanion();
  }, [id]);

  if (!companion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{companion.name}</h1>
      <PlayfulCard
        title={companion.name}
        description={companion.description}
        image={companion.image}
        price={companion.price}
        rating={companion.rating}
        location={companion.location}
        tags={companion.tags}
      />
      <PlayfulButton>Book Now</PlayfulButton>
    </div>
  );
};

export default CompanionDetailPage; 