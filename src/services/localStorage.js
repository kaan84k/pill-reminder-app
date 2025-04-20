// services/localStorage.js

// Get all medications
export const getMedications = () => {
    if (typeof window !== 'undefined') {
      try {
        const medications = localStorage.getItem('medications');
        return medications ? JSON.parse(medications) : [];
      } catch (error) {
        console.error('Error getting medications:', error);
        return [];
      }
    }
    return [];
  };
  
  // Save all medications
  export const saveMedications = (medications) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('medications', JSON.stringify(medications));
        return true;
      } catch (error) {
        console.error('Error saving medications:', error);
        return false;
      }
    }
    return false;
  };
  
  // Add a medication
  export const addMedication = (medication) => {
    const medications = getMedications();
    const newMedication = {
      ...medication,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      lastTaken: null
    };
    
    medications.push(newMedication);
    saveMedications(medications);
    return newMedication;
  };
  
  // Update a medication
  export const updateMedication = (id, updatedData) => {
    const medications = getMedications();
    const index = medications.findIndex(med => med.id === id);
    
    if (index === -1) return null;
    
    medications[index] = { ...medications[index], ...updatedData };
    saveMedications(medications);
    return medications[index];
  };
  
  // Delete a medication
  export const deleteMedication = (id) => {
    const medications = getMedications();
    const filteredMeds = medications.filter(med => med.id !== id);
    
    if (filteredMeds.length === medications.length) return false;
    
    saveMedications(filteredMeds);
    return true;
  };
  
  // Mark medication as taken
  export const takeMedication = (id) => {
    return updateMedication(id, { lastTaken: new Date().toISOString() });
  };