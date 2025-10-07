// File: src/pages/passenger/PassengerForm.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '../../common/utils';
import FormInput from '../../components/forms/FormInput';
import FormTextarea from '../../components/forms/FormTextarea';
import Spinner from '../../components/ui/Spinner';

const PassengerForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  loading,
  palette = {},
}) => {
  const safeInitialData = useMemo(() => initialData || {}, [initialData]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    emergencyContacts: [{ name: '', phone: '', relationship: '' }],
  });

  useEffect(() => {
    setFormData({
      name: safeInitialData.name || '',
      phone: safeInitialData.phone || '',
      email: safeInitialData.email || '',
      password: '',
      emergencyContacts:
        safeInitialData.emergencyContacts?.length > 0
          ? safeInitialData.emergencyContacts
          : [{ name: '', phone: '', relationship: '' }],
    });
  }, [safeInitialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmergencyContactChange = (index, e) => {
    const { name, value } = e.target;
    const newContacts = [...(formData.emergencyContacts || [])];
    newContacts[index] = { ...newContacts[index], [name]: value };
    setFormData((prev) => ({ ...prev, emergencyContacts: newContacts }));
  };

  const addEmergencyContact = () => {
    setFormData((prev) => ({
      ...prev,
      emergencyContacts: [
        ...(prev.emergencyContacts || []),
        { name: '', phone: '', relationship: '' },
      ],
    }));
  };

  const removeEmergencyContact = (index) => {
    const newContacts = [...(formData.emergencyContacts || [])];
    newContacts.splice(index, 1);
    setFormData((prev) => ({ ...prev, emergencyContacts: newContacts }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming the API expects emergencyContacts to be an array of objects
    // Filter out any contacts that are empty (optional logic)
    const contactsToSend = (formData.emergencyContacts || []).filter(
      (c) => c.name || c.phone
    );
    onSubmit({ ...formData, emergencyContacts: contactsToSend });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* All FormInputs rely on the 'palette' prop for theming */}
      <FormInput
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        palette={palette}
      />
      <FormInput
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
        palette={palette}
      />
      <FormInput
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        palette={palette}
      />
      <FormInput
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        palette={palette}
      />

      <div>
        <h3 className={cn('text-md font-semibold mb-2', palette.text)}>
          Emergency Contacts
        </h3>
        <div className="space-y-3">
          {(formData.emergencyContacts || []).map((contact, index) => (
            <div
              key={index}
              // The container uses a theme-aware border
              className={cn(
                'flex flex-col md:flex-row items-end gap-2 p-3 border rounded-md',
                palette.border
              )}
            >
              {/* These inputs also rely on the FormInput component's internal dark mode logic */}
              <FormInput
                label="Name"
                name="name"
                value={contact.name}
                onChange={(e) => handleEmergencyContactChange(index, e)}
                palette={palette}
              />
              <FormInput
                label="Phone"
                name="phone"
                value={contact.phone}
                onChange={(e) => handleEmergencyContactChange(index, e)}
                palette={palette}
              />
              <FormInput
                label="Relationship"
                name="relationship"
                value={contact.relationship}
                onChange={(e) => handleEmergencyContactChange(index, e)}
                palette={palette}
              />
              <button
                type="button"
                onClick={() => removeEmergencyContact(index)}
                className={cn(
                  'px-3 py-2 text-sm rounded-md border',
                  // Using theme-aware classes for a neutral/secondary action
                  // bg-primary-100 is typically a light version of the primary color
                  'text-primary bg-primary-100 hover:opacity-80',
                  palette.border
                )}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addEmergencyContact}
            className={cn(
              'w-full py-2 border border-dashed rounded-md',
              // Using theme-aware classes for 'Add' button:
              'text-muted-theme hover-theme',
              palette.border
            )}
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
            'px-4 py-2 rounded-md border',
            palette.border,
            palette.card, // Background color
            palette.text, // Text color
            palette.hover // Hover background
          )}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className={cn(
            'px-4 py-2 rounded-md text-white flex items-center justify-center',
            palette.btnPrimary
          )}
        >
          {loading && <Spinner size="small" className="mr-2" />}
          {loading ? 'Saving...' : safeInitialData.id ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default PassengerForm;
