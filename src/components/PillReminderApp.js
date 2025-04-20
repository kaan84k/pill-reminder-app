import { useState, useEffect } from 'react';
import AddMedicationModal from './AddMedicationModal';

export default function PillReminderApp() {
  const [medications, setMedications] = useState([]);
  const [activeTab, setActiveTab] = useState('today');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load medications on mount
  useEffect(() => {
    fetchMedications();
    
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Fetch medications from API
  const fetchMedications = async () => {
    setIsLoading(true);
    try {
      // For client-side localStorage implementation
      const storedMeds = localStorage.getItem('medications');
      const data = storedMeds ? JSON.parse(storedMeds) : [];
      setMedications(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching medications:', error);
      setError('Failed to load medications');
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new medication
  const handleAddMedication = async (newMed) => {
    try {
      // Add ID and timestamp
      const medicationToAdd = {
        ...newMed,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        lastTaken: null
      };
      
      // Add to local state first for instant UI update
      setMedications(prev => [...prev, medicationToAdd]);
      
      // Store in localStorage
      const updatedMeds = [...medications, medicationToAdd];
      localStorage.setItem('medications', JSON.stringify(updatedMeds));
      
    } catch (error) {
      console.error('Error adding medication:', error);
      setError('Failed to add medication');
    }
  };

  // Mark medication as taken
  const markAsTaken = async (id) => {
    try {
      // Update in local state first for instant UI update
      const updatedMeds = medications.map(med => 
        med.id === id ? {...med, lastTaken: new Date().toISOString()} : med
      );
      
      setMedications(updatedMeds);
      
      // Store in localStorage
      localStorage.setItem('medications', JSON.stringify(updatedMeds));
      
    } catch (error) {
      console.error('Error marking medication as taken:', error);
      setError('Failed to update medication');
    }
  };

  // Delete a medication
  const deleteMedication = async (id) => {
    try {
      // Remove from local state
      const filteredMeds = medications.filter(med => med.id !== id);
      setMedications(filteredMeds);
      
      // Update localStorage
      localStorage.setItem('medications', JSON.stringify(filteredMeds));
      
    } catch (error) {
      console.error('Error deleting medication:', error);
      setError('Failed to delete medication');
    }
  };

  // Format time strings
  const formatTime = (timeStr) => {
    return timeStr.split(',').map(t => {
      const [hours, minutes] = t.split(':');
      return `${hours}:${minutes}`;
    }).join(', ');
  };

  // Format last taken timestamp
  const formatLastTaken = (lastTaken) => {
    if (!lastTaken) return 'Not taken yet';
    const date = new Date(lastTaken);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
  };

  // Check if a medication time is overdue
  const isOverdue = (timeStr) => {
    const now = new Date();
    const [hours, minutes] = timeStr.split(':').map(Number);
    const scheduleTime = new Date();
    scheduleTime.setHours(hours, minutes, 0);
    return now > scheduleTime;
  };

  // Get the status of a medication (taken, overdue, upcoming)
  const getDueStatus = (med) => {
    // Check if already taken today
    if (med.lastTaken) {
      const takenDate = new Date(med.lastTaken);
      const today = new Date();
      if (takenDate.getDate() === today.getDate() && 
          takenDate.getMonth() === today.getMonth() && 
          takenDate.getFullYear() === today.getFullYear()) {
        return { status: 'taken', label: 'Taken' };
      }
    }
    
    // Check schedule times
    const times = med.time.split(',');
    for (const time of times) {
      if (isOverdue(time)) {
        return { status: 'overdue', label: 'Overdue' };
      }
    }
    
    return { status: 'upcoming', label: 'Upcoming' };
  };

  // The rest of the component UI remains similar to before
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden h-screen flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold text-center">💊 Pill Reminder</h1>
        <p className="text-center text-sm opacity-80">
          {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </p>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b">
        <button 
          className={`flex-1 py-3 ${activeTab === 'today' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('today')}>
          Today
        </button>
        <button 
          className={`flex-1 py-3 ${activeTab === 'history' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('history')}>
          History
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {error && (
          <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {isLoading ? (
          <div className="text-center py-8">
            <p>Loading medications...</p>
          </div>
        ) : activeTab === 'today' ? (
          <div className="space-y-4">
            {medications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No medications added yet.</p>
                <p>Tap the + button to add your first medication.</p>
              </div>
            ) : (
              medications.map(med => {
                const dueStatus = getDueStatus(med);
                return (
                  <div key={med.id} className="bg-white border rounded-lg p-4 shadow-sm relative">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{med.name}</h3>
                        <p className="text-gray-600">{med.dose} • {med.frequency}</p>
                        <p className="text-gray-500 text-sm">Time: {formatTime(med.time)}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          dueStatus.status === 'taken' ? 'bg-green-100 text-green-800' : 
                          dueStatus.status === 'overdue' ? 'bg-red-100 text-red-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {dueStatus.label}
                        </span>
                        
                        <button 
                          onClick={() => deleteMedication(med.id)} 
                          className="text-red-600 text-xs mt-2 hover:underline">
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        Last taken: {formatLastTaken(med.lastTaken)}
                      </span>
                      <button 
                        onClick={() => markAsTaken(med.id)}
                        className="text-white bg-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-700">
                        Take Now
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="font-medium text-gray-700">Medication History</h2>
            {medications
              .filter(med => med.lastTaken)
              .sort((a, b) => new Date(b.lastTaken) - new Date(a.lastTaken))
              .map(med => (
                <div key={med.id} className="bg-gray-50 border rounded-lg p-3">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{med.name}</h3>
                      <p className="text-gray-600 text-sm">{med.dose}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Last taken</p>
                      <p className="text-sm font-medium">{formatLastTaken(med.lastTaken)}</p>
                    </div>
                  </div>
                </div>
              ))}
            {medications.filter(med => med.lastTaken).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No medication history yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Add button */}
      <div className="p-4 border-t">
        <button 
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center"
          onClick={() => setShowAddModal(true)}>
          <span className="mr-2 text-lg">+</span> Add Medication
        </button>
      </div>
      
      {/* Add Medication Modal */}
      {showAddModal && (
        <AddMedicationModal 
          onClose={() => setShowAddModal(false)} 
          onSave={handleAddMedication} 
        />
      )}
    </div>
  );
}