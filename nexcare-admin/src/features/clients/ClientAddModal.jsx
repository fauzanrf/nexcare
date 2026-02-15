import React, { useState, useEffect } from 'react';
import { X, Save, User } from 'lucide-react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export function ClientAddModal({ isOpen, onClose, onSave, initialData = null }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    bandwidth: '',
    services: 'Broadband',
    address: '',
    vendorName: '',
    vendorCid: '',
    vendorBandwidth: '',
    installPhone: '',
    installName: ''
  });

  useEffect(() => {
    if (initialData) {
        setFormData({
            id: initialData.id || '',
            name: initialData.name || '',
            bandwidth: initialData.bandwidth || '',
            services: initialData.services || 'Broadband',
            address: initialData.address || '',
            vendorName: initialData.vendorName || '',
            vendorCid: initialData.vendorCid || '',
            vendorBandwidth: initialData.vendorBandwidth || '',
            installPhone: initialData.installPhone || '',
            installName: initialData.installName || ''
        });
    } else {
        setFormData({
            id: '',
            name: '',
            bandwidth: '',
            services: 'Broadband',
            address: '',
            vendorName: '',
            vendorCid: '',
            vendorBandwidth: '',
            installPhone: '',
            installName: ''
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
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-purple-50/50">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-xl border border-purple-200">
              <User className="w-6 h-6 text-purple-700" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{initialData ? 'Edit Client' : 'Add New Client'}</h2>
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
            <Input label="Client ID" name="id" value={formData.id} onChange={handleChange} placeholder="IWxxxxxxx" required />
            <Input label="Client Name" name="name" value={formData.name} onChange={handleChange} placeholder="Company Name" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Bandwidth Client" name="bandwidth" value={formData.bandwidth} onChange={handleChange} placeholder="e.g. 20Mbps" />
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Services</label>
              <select name="services" value={formData.services} onChange={handleChange} className="w-full h-10 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none bg-white">
                <option value="Broadband">Broadband</option>
                <option value="Dedicated">Dedicated</option>
                <option value="VPN">VPN</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-1">
             <label className="text-sm font-medium text-gray-700">Customer Address</label>
             <textarea 
               name="address" 
               value={formData.address} 
               onChange={handleChange} 
               className="w-full min-h-[60px] p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
               placeholder="Full Address"
             />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
             <div className="md:col-span-3 text-sm font-bold text-gray-500 uppercase">Vendor Info</div>
             <Input label="Vendor Name" name="vendorName" value={formData.vendorName} onChange={handleChange} placeholder="e.g. Icon+" />
             <Input label="Vendor CID" name="vendorCid" value={formData.vendorCid} onChange={handleChange} placeholder="CID-xxxxx" />
             <Input label="Vendor Bandwidth" name="vendorBandwidth" value={formData.vendorBandwidth} onChange={handleChange} placeholder="e.g. 50Mbps" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
             <div className="md:col-span-2 text-sm font-bold text-gray-500 uppercase">Installation Info</div>
             <Input label="Installation Name" name="installName" value={formData.installName} onChange={handleChange} placeholder="Technician Name" />
             <Input label="Installation Phone" name="installPhone" value={formData.installPhone} onChange={handleChange} placeholder="08xxxxxxxxxxx" />
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
            {initialData ? 'Update Client' : 'Save Client'}
          </Button>
        </div>
      </div>
    </div>
  );
}
