import { useState } from 'react';

export default function AddMedicationModal({ onClose, onSave }) {
  const [newMed, setNewMed] = useState({
    name: '',
    dose: '',
    frequency: 'Once daily',
    time: '08:00'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newMed);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-4">
        <h2 className="text-xl font-bold mb-4">Add Medication</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Medication Name
            </label>
            <input
              className="border rounded w-full py-2 px-3"
              type="text"
              placeholder="e.g., Lisinopril"
              value={newMed.name}
              onChange={e => setNewMed({...newMed, name: e.target.value})}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Dosage
            </label>
            <input
              className="border rounded w-full py-2 px-3"
              type="text"
              placeholder="e.g., 10mg"
              value={newMed.dose}
              onChange={e => setNewMed({...newMed, dose: e.target.value})}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Frequency
            </label>
            <select
              className="border rounded w-full py-2 px-3"
              value={newMed.frequency}
              onChange={e => setNewMed({...newMed, frequency: e.target.value})}
            >
              <option>Once daily</option>
              <option>Twice daily</option>
              <option>Three times daily</option>
              <option>Every 6 hours</option>
              <option>Every 8 hours</option>
              <option>As needed</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Time
            </label>
            <input
              className="border rounded w-full py-2 px-3"
              type="time"
              value={newMed.time}
              onChange={e => setNewMed({...newMed, time: e.target.value})}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Medication
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}