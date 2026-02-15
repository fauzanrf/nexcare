import React, { useState } from 'react';
import { X, Save, Wifi } from 'lucide-react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export function StarlinkAddModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    passwordEmail: '',
    status: 'Active',
    optStatus: 'Disable',
    optQuota: '-'
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-purple-50/50">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-xl border border-purple-200">
              <Wifi className="w-6 h-6 text-purple-700" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Add New Starlink</h2>
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
            <Input label="Starlink Account (ID)" name="id" value={formData.id} onChange={handleChange} placeholder="ACC-xxxxxxx" required />
            <Input label="Starlink Name" name="name" value={formData.name} onChange={handleChange} placeholder="Location Name" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Starlink Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="ops@nexcare.com" />
            <Input label="Starlink Password" name="password" value={formData.password} onChange={handleChange} placeholder="Strong Password" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Input label="Password Email" name="passwordEmail" value={formData.passwordEmail} onChange={handleChange} placeholder="Email Password" />
             <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Status Starlink</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full h-10 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none bg-white">
                <option value="Active">Active</option>
                <option value="Suspend">Suspend</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">OPT Status</label>
              <select name="optStatus" value={formData.optStatus} onChange={handleChange} className="w-full h-10 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none bg-white">
                <option value="Active">Active</option>
                <option value="Disable">Disable</option>
              </select>
            </div>
            <Input label="OPT Quota" name="optQuota" value={formData.optQuota} onChange={handleChange} placeholder="e.g. 1GB or -" />
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
            Save Starlink
          </Button>
        </div>
      </div>
    </div>
  );
}
