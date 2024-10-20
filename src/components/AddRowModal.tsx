import React, { useState } from 'react';

interface AddRowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRow: (newRow: Record<string, any>) => void;
  columns: { accessor: string }[];
}

const AddRowModal: React.FC<AddRowModalProps> = ({ isOpen, onClose, onAddRow, columns }) => {
  const [newRow, setNewRow] = useState<Record<string, any>>(
    columns.reduce((acc, col) => {
      acc[col.accessor] = ''; // Initialize each column with an empty string
      return acc;
    }, {} as Record<string, any>)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRow((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddRow(newRow);
    onClose(); // Close the modal after adding the row
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-semibold">Add New Row</h2>
        <form onSubmit={handleSubmit}>
          {columns.map((col) => (
            <div key={col.accessor} className="mb-4">
              <label className="block text-sm font-medium">{col.accessor}</label>
              <input
                type="text"
                name={col.accessor}
                value={newRow[col.accessor]}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            </div>
          ))}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Row</button>
          <button type="button" onClick={onClose} className="ml-2 bg-gray-300 px-4 py-2 rounded">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddRowModal;

