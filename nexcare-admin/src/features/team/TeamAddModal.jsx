import React, { useState, useEffect } from 'react';
import { X, Save, User } from 'lucide-react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export function TeamAddModal({ isOpen, onClose, onSave, initialData = null }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    position: 'NOC1',
    signature: '',
    profilePicture: ''
  });

  useEffect(() => {
    if (initialData) {
        setFormData({
            name: initialData.name || '',
            email: initialData.email || '',
            password: initialData.password || '',
            position: initialData.position || 'NOC1',
            signature: initialData.signature || '',
            profilePicture: initialData.profilePicture || ''
        });
    } else {
        setFormData({
            name: '',
            email: '',
            password: '',
            position: 'NOC1',
            signature: '',
            profilePicture: ''
        });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use default avatars if empty, for demo purposes
    const submissionData = {
        ...initialData,
        ...formData,
        id: initialData ? initialData.id : `USR${Math.floor(Math.random() * 1000)}`,
        signature: formData.signature || `https://ui-avatars.com/api/?name=${formData.name}&background=random`,
        profilePicture: formData.profilePicture || `https://ui-avatars.com/api/?name=${formData.name}&background=random`
    };
    onSave(submissionData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-purple-50/50">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-xl border border-purple-200">
              <User className="w-6 h-6 text-purple-700" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{initialData ? 'Edit Team Member' : 'Add Team Member'}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. John Doe" required />
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Position</label>
              <select name="position" value={formData.position} onChange={handleChange} className="w-full h-10 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none bg-white">
                <option value="NOC2">NOC2 (Full Access)</option>
                <option value="NOC1">NOC1 (Restricted)</option>
                <option value="Technical Support">Technical Support</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="email@nexcare.com" required />
            <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Ex: S3cureP@ss" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
             <div className="md:col-span-2 text-sm font-bold text-gray-500 uppercase">Images (Optional URLs)</div>
             <Input label="Profile Picture URL" name="profilePicture" value={formData.profilePicture} onChange={handleChange} placeholder="https://..." />
             <Input label="Signature URL" name="signature" value={formData.signature} onChange={handleChange} placeholder="https://..." />
          </div>

        </form>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <Button 
            onClick={handleSubmit} 
            className="bg-purple-600 hover:bg-purple-700 text-white shadow-md flex items-center gap-2"
          >
            <Save size={18} />
            {initialData ? 'Update Member' : 'Save Member'}
          </Button>
        </div>
      </div>
    </div>
  );
}
