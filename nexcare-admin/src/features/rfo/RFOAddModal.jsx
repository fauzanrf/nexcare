import React, { useState, useEffect } from 'react';
import { X, Save, FileText } from 'lucide-react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../auth/AuthContext';

export function RFOAddModal({ isOpen, onClose, onSave, initialData = null }) {
  const { session } = useAuth();
  const isNOC2 = session?.position === 'NOC2';

  const [formData, setFormData] = useState({
    status: 'Pending',
    clientId: '',
    clientName: '',
    projectName: '',
    location: '',
    incidentDate: '',
    incidentHour: '',
    sla: '',
    ticketNumber: '',
    incidentCategory: 'NORMAL',
    durationInterruption: '',
    incidentDescription: '',
    rootCause: '',
    action: '',
    businessImpact: ''
  });

  useEffect(() => {
    if (initialData) {
        setFormData({
            status: initialData.status || 'Pending',
            clientId: initialData.clientId || '',
            clientName: initialData.clientName || '',
            projectName: initialData.projectName || '',
            location: initialData.location || '',
            incidentDate: initialData.date || '', // Map 'date' to 'incidentDate'
            incidentHour: initialData.incidentHour || '',
            sla: initialData.sla || '',
            ticketNumber: initialData.ticketNumber || '',
            incidentCategory: initialData.incidentCategory || 'NORMAL',
            durationInterruption: initialData.durationInterruption || '',
            incidentDescription: initialData.incidentDescription || '',
            rootCause: initialData.rootCause || '',
            action: initialData.action || '',
            businessImpact: initialData.businessImpact || ''
        });
    } else {
        setFormData({
            status: 'Pending',
            clientId: '',
            clientName: '',
            projectName: '',
            location: '',
            incidentDate: '',
            incidentHour: '',
            sla: '',
            ticketNumber: '',
            incidentCategory: 'NORMAL',
            durationInterruption: '',
            incidentDescription: '',
            rootCause: '',
            action: '',
            businessImpact: ''
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
    onSave({
        ...initialData,
        ...formData,
        id: initialData ? initialData.id : `RFO-${Math.floor(Math.random() * 10000)}`,
        date: formData.incidentDate // Map back
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-purple-50/50">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-xl border border-purple-200">
              <FileText className="w-6 h-6 text-purple-700" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{initialData ? 'Edit RFO Data' : 'Add New RFO Data'}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          
          {/* Key Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Client ID" name="clientId" value={formData.clientId} onChange={handleChange} required placeholder="e.g. IWxxxxx" />
            <Input label="Client Name" name="clientName" value={formData.clientName} onChange={handleChange} required placeholder="Client Company Name" />
            <Input label="Project Name" name="projectName" value={formData.projectName} onChange={handleChange} placeholder="Project Name" />
            <Input label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="City, Country" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Incident Date</label>
                <input type="date" name="incidentDate" value={formData.incidentDate} onChange={handleChange} className="w-full h-10 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none" />
             </div>
             <Input label="Incident Hour" name="incidentHour" value={formData.incidentHour} onChange={handleChange} placeholder="e.g. 12:00 - 13:00" />
             <Input label="Duration" name="durationInterruption" value={formData.durationInterruption} onChange={handleChange} placeholder="e.g. 1 Hour" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <select name="incidentCategory" value={formData.incidentCategory} onChange={handleChange} className="w-full h-10 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none bg-white">
                <option value="EASY">EASY</option>
                <option value="NORMAL">NORMAL</option>
                <option value="HARD">HARD</option>
              </select>
            </div>
            <Input label="Ticket Number" name="ticketNumber" value={formData.ticketNumber} onChange={handleChange} placeholder="Ticket #" />
            <Input label="SLA" name="sla" value={formData.sla} onChange={handleChange} placeholder="e.g. 99.5%" />
          </div>

          {/* Status Dropdown - Restricted to NOC2 */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                RFO Status
                {!isNOC2 && <span className="text-xs text-gray-400 font-normal">(Restricted to NOC2)</span>}
            </label>
            <select 
                name="status" 
                value={formData.status} 
                onChange={handleChange} 
                disabled={!isNOC2}
                className={`w-full h-10 px-3 rounded-md border outline-none bg-white
                    ${!isNOC2 ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200' : 'border-gray-300 focus:ring-2 focus:ring-purple-500'}
                `}
            >
                <option value="Pending">Pending</option>
                <option value="Accept">Accept</option>
                <option value="Suspended">Suspended</option>
                <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Text Areas */}
          <div className="space-y-4">
            <TextArea label="Incident Description" name="incidentDescription" value={formData.incidentDescription} onChange={handleChange} />
            <TextArea label="Root Cause" name="rootCause" value={formData.rootCause} onChange={handleChange} />
            <TextArea label="Action Taken" name="action" value={formData.action} onChange={handleChange} />
            <TextArea label="Business Impact" name="businessImpact" value={formData.businessImpact} onChange={handleChange} />
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
            {initialData ? 'Update Data' : 'Save Data'}
          </Button>
        </div>
      </div>
    </div>
  );
}

function TextArea({ label, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <textarea 
        {...props}
        className="w-full min-h-[80px] p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none resize-y text-sm"
      />
    </div>
  );
}
