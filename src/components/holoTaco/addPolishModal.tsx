import React, { useState } from 'react';
import { TacoBottle, TacoPolish } from '../../utils/holoTacoTypes';
import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiRequest } from '../../utils/clientAPIService';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function
import RainbowModal from '../../components/RainbowModal'; // Import the RainbowModal component


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
  const [searchPolish, setSearchPolish] = useState<string>(""); // New state for search polish

  const addBottleMutation = useMutation({
    mutationFn: (newBottle: TacoBottle) => apiRequest(`/api/bottles`, 'POST', newBottle),
  });

  const polishQuery = useQuery<any, Error, any, string[]>({
    queryKey: ['polishes'], 
    queryFn: () => apiRequest('/api/polishes', 'GET'),
  } as UseQueryOptions<any, Error, any, string[]>); // Cast to UseQueryOptions

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

  return (
    <RainbowModal isOpen={isOpen} onClose={onClose} title="Add New Bottle">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input for searching polishes */}
        <div>
          <label className="block text-sm font-medium">Search Polish</label>
          <input
            type="text"
            onChange={(e) => setSearchPolish(e.target.value)}
            className="border rounded p-2 w-full"
            placeholder="Type to search..."
          />
        </div>

        {/* Dropdown for selecting polish */}
        <div>
          <label className="block text-sm font-medium">Polish Name</label>
          <select
            value={selectedPolish || ''}
            onChange={(e) => setSelectedPolish(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="" disabled>Select Polish</option>
            {polishQuery.data?.filter((polish: TacoPolish) => 
              polish.polishname.toLowerCase().includes(searchPolish.toLowerCase())
            ).map((polish: TacoPolish) => (
              <option key={polish.polishname} value={polish.polishname}>{polish.polishname}</option>
            ))}
          </select>
        </div>

        {/* Checkbox for isSwatched */}
        <div>
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
        <div>
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
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition">Add Bottle</button>
        <button type="button" onClick={onClose} className="ml-2 text-white bg-gray-500 px-6 py-3 rounded hover:bg-gray-600 transition">Cancel</button>
      </form>
    </RainbowModal>
  );
};

export default AddBottleModal;
