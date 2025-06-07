import React, { useState } from 'react';
import PlayfulInput from '../components/PlayfulInput';
import PlayfulButton from '../components/PlayfulButton';
import PlayfulCard from '../components/PlayfulCard';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Mock search results
    const results = [
      { id: 1, name: 'Companion 1', description: 'Description for Companion 1', image: 'https://via.placeholder.com/150' },
      { id: 2, name: 'Companion 2', description: 'Description for Companion 2', image: 'https://via.placeholder.com/150' },
      { id: 3, name: 'Companion 3', description: 'Description for Companion 3', image: 'https://via.placeholder.com/150' },
    ];
    setSearchResults(results);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Companions</h1>
      <div className="flex space-x-2 mb-4">
        <PlayfulInput
          placeholder="Search for companions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <PlayfulButton onClick={handleSearch}>Search</PlayfulButton>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResults.map((companion) => (
          <PlayfulCard
            key={companion.id}
            title={companion.name}
            description={companion.description}
            image={companion.image}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage; 