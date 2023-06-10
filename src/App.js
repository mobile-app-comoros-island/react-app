import React, { useState } from 'react';
import MapContainer from './MapContainer';

function App() {
  const [selectedAddress, setSelectedAddress] = useState(null);

  const addresses = [
    { id: 1, name: 'Address 1', lat: 51.5074, lon: -0.1278 },
    { id: 2, name: 'Address 2', lat: 40.7128, lon: -74.0060 },
    { id: 3, name: 'Address 3', lat: 34.0522, lon: -118.2437 },
    // Add more addresses as needed
  ];

  const handleAddressClick = (address) => {
    setSelectedAddress(address);
  };

  return (
    <div className="container">
      <div className="column">
        <h2>Addresses</h2>
        <ul className="address-list">
          {addresses.map((address) => (
            <li
              key={address.id}
              onClick={() => handleAddressClick(address)}
              className={selectedAddress === address ? 'selected' : ''}
            >
              {address.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="column">
        <h2>Location</h2>
        {selectedAddress ? (
          <MapContainer lat={selectedAddress.lat} lon={selectedAddress.lon} />
        ) : (
          <p>Please select an address from the list</p>
        )}
      </div>
    </div>
  );
}

export default App;
