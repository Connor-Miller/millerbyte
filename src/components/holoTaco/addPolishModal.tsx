import React, { useState } from 'react';
import { TacoBottle, TacoPolish } from '../../utils/holoTacoTypes';
import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiRequest } from '../../utils/clientAPIService';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function


interface AddBottleModalProps {
  isOpen: boolean;
  onClose: () => void;
  ownerEmail: string;
}

const AddBottleModal: React.FC<AddBottleModalProps> = ({ isOpen, onClose, ownerEmail }) => {
  const [location, setLocation] = useState(''); // New state for location
  const [isSwatched, setIsSwatched] = useState(false); // New state for isSwatched
  const [isOpened, setIsOpened] = useState(false); // New state for isOpened
  const [selectedPolish, setSelectedPolish] = useState<string>(""); // New state for selected polish

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedPolish === "") {
      alert("Please select a polish");
      return;
    }

    // Add the bottle to the database
    addBottleMutation.mutate({
      polishName: selectedPolish,
      isSwatched: isSwatched,
      isOpened: isOpened,
      location: location,
      bottleId: uuidv4(),
      ownerEmail: ownerEmail,
    });
    onClose(); // Close the modal after adding the record
  };

  if (!isOpen) return null;

  const addBottleMutation = useMutation({
    mutationFn: (newBottle: TacoBottle) => apiRequest(`/api/bottles`, 'POST', newBottle),
});

const polishQuery = useQuery<any, Error, any, string[]>({
    queryKey: ['polishes'], 
    queryFn: () => apiRequest('/api/polishes', 'GET'),
} as UseQueryOptions<any, Error, any, string[]>); // Cast to UseQueryOptions

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-semibold">Add New Bottle</h2>
        <form onSubmit={handleSubmit}>
          
          {/* Dropdown for selecting polish */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Polish Name</label>
            <select
              value={selectedPolish || ''}
              onChange={(e) => setSelectedPolish(e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option value="" disabled>Select Polish</option>
              {/* Map through polishQuery.data to create options */}
              {polishQuery.data?.map((polish: TacoPolish) => (
                <option key={polish.polishName} value={polish.polishName}>{polish.polishName}</option>
              ))}
            </select>
          </div>

          {/* Checkbox for isSwatched */}
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={isSwatched}
                onChange={() => setIsSwatched(!isSwatched)}
                className="form-checkbox"
              />
              <span className="ml-2">Is Swatched</span>
            </label>
          </div>

          {/* Checkbox for isOpened */}
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={isOpened}
                onChange={() => setIsOpened(!isOpened)}
                className="form-checkbox"
              />
              <span className="ml-2">Is Opened</span>
            </label>
          </div>

          {/* Input for location */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Bottle</button>
          <button type="button" onClick={onClose} className="ml-2 bg-gray-300 px-4 py-2 rounded">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddBottleModal;
