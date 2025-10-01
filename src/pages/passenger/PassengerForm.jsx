// File: src/pages/passenger/PassengerForm.jsx
import React, { useState, useEffect } from 'react';
import { cn } from '../../common/utils';
import Spinner from '../../components/ui/Spinner';

const PassengerForm = ({ initialData = {}, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    emergencyContacts: [{ name: '', phone: '', relationship: '' }],
    ...initialData,
  });

  useEffect(() => {
    // Reset form data when initialData changes
    setFormData({
      name: '',
      phone: '',
      email: '',
      password: '',
      emergencyContacts: [{ name: '', phone: '', relationship: '' }],
      ...initialData,
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmergencyContactChange = (index, e) => {
    const { name, value } = e.target;
    const newContacts = [...formData.emergencyContacts];
    newContacts[index][name] = value;
    setFormData((prev) => ({ ...prev, emergencyContacts: newContacts }));
  };

  const addEmergencyContact = () => {
    setFormData((prev) => ({
      ...prev,
      emergencyContacts: [
        ...prev.emergencyContacts,
        { name: '', phone: '', relationship: '' },
      ],
    }));
  };

  const removeEmergencyContact = (index) => {
    const newContacts = [...formData.emergencyContacts];
    newContacts.splice(index, 1);
    setFormData((prev) => ({ ...prev, emergencyContacts: newContacts }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone || ''}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email || ''}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password || ''}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <h3 className="text-md font-semibold mb-2">Emergency Contacts</h3>
        <div className="space-y-3">
          {formData.emergencyContacts.map((contact, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-end gap-2 p-3 border rounded-md"
            >
              <div className="flex-1 w-full">
                <label className="block text-xs font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={contact.name}
                  onChange={(e) => handleEmergencyContactChange(index, e)}
                  className="w-full p-2 border rounded text-sm"
                />
              </div>
              <div className="flex-1 w-full">
                <label className="block text-xs font-medium mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={contact.phone}
                  onChange={(e) => handleEmergencyContactChange(index, e)}
                  className="w-full p-2 border rounded text-sm"
                />
              </div>
              <div className="flex-1 w-full">
                <label className="block text-xs font-medium mb-1">
                  Relationship
                </label>
                <input
                  type="text"
                  name="relationship"
                  value={contact.relationship}
                  onChange={(e) => handleEmergencyContactChange(index, e)}
                  className="w-full p-2 border rounded text-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => removeEmergencyContact(index)}
                className="px-3 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addEmergencyContact}
            className="w-full py-2 border border-dashed rounded-md text-gray-500 hover:bg-gray-100"
          >
            Add Emergency Contact
          </button>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className={cn(
            'px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          )}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-md bg-blue-600 text-white flex items-center justify-center"
        >
          {loading && <Spinner size="small" className="mr-2" />}
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default PassengerForm;
