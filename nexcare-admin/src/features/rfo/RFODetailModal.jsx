import React from 'react';
import { X, Clock, FileText, Activity, AlertTriangle, CheckCircle, Info, Calendar } from 'lucide-react';
import { cn } from '../../lib/utils'; // Adjust path if needed given feature structure

import { useRef, useState } from 'react';
import { RFOReportTemplate } from './RFOReportTemplate';
import html2pdf from 'html2pdf.js';

export function RFODetailModal({ rfo, onClose }) {
  const reportRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false);

  if (!rfo) return null;

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    const element = reportRef.current;
    
    // Unhide for capture if needed, or just capture the ref
    // We render it visible but absolute positioned off-screen to ensure styles are applied
    
    const opt = {
      margin:       0,
      filename:     `RFO-${rfo.ticketNumber}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        await html2pdf().set(opt).from(element).save();
    } catch (error) {
        console.error("PDF Generation failed", error);
        alert("Failed to generate PDF. Please try again.");
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Hidden Template for PDF Generation */}
        <div style={{ position: 'fixed', top: '-9999px', left: '-9999px' }}>
            <RFOReportTemplate ref={reportRef} rfo={rfo} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-purple-50/50">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-xl border border-purple-200">
              <FileText className="w-6 h-6 text-purple-700" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">RFO Detail View</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-medium text-gray-500">{rfo.ticketNumber}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide",
                  rfo.status === 'Pending' && "bg-yellow-100 text-yellow-700",
                  rfo.status === 'Accept' && "bg-green-100 text-green-700",
                  !['Pending', 'Accept'].includes(rfo.status) && "bg-gray-100 text-gray-700"
                )}>
                  {rfo.status}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          
          {/* Key Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <InfoItem label="RFO ID" value={rfo.id} highlight />
              <InfoItem label="Client ID" value={rfo.clientId} />
              <InfoItem label="Client Name" value={rfo.clientName} />
            </div>
            <div className="space-y-4">
              <InfoItem label="Project Name" value={rfo.projectName} />
              <InfoItem label="Location" value={rfo.location} icon={null} /> 
              <InfoItem label="Created By" value={rfo.createdBy} />
            </div>
            <div className="space-y-4">
              <InfoItem label="Incident Date" value={rfo.incidentDate} icon={<Calendar className="w-4 h-4 text-purple-500" />} />
              <InfoItem label="Incident Hour" value={rfo.incidentHour} icon={<Clock className="w-4 h-4 text-purple-500" />} />
              <InfoItem label="Duration" value={rfo.durationInterruption} />
            </div>
          </div>

          <div className="h-px bg-gray-100 w-full" />

          {/* Detailed Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBox label="SLA" value={rfo.sla} color="purple" />
            <StatBox label="Category" value={rfo.incidentCategory} color={rfo.incidentCategory === 'HARD' ? 'red' : 'blue'} />
            <StatBox label="Status Ticket" value={rfo.statusTicket} color="green" />
            <StatBox label="Status RFO" value={rfo.status} color="gray" />
          </div>

          {/* Descriptive Sections */}
          <div className="space-y-6">
            <Section title="Incident Description" icon={<Activity className="w-5 h-5" />}>
              <p className="text-gray-600 leading-relaxed">{rfo.incidentDescription}</p>
            </Section>

            <Section title="Root Cause Analysis" icon={<Info className="w-5 h-5" />}>
              <p className="text-gray-600 leading-relaxed">{rfo.rootCause}</p>
            </Section>

            <Section title="Action Taken" icon={<CheckCircle className="w-5 h-5" />}>
              <p className="text-gray-600 leading-relaxed">{rfo.action}</p>
            </Section>

            <Section title="Business Impact" icon={<AlertTriangle className="w-5 h-5" />}>
              <p className="text-gray-600 leading-relaxed mb-4">{rfo.businessImpact}</p>
            </Section>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button 
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
          >
            {isGenerating ? 'Generating...' : 'Download PDF'}
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value, icon, highlight }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1 flex items-center gap-1">
        {icon} {label}
      </span>
      <span className={cn(
        "text-base text-gray-800 font-medium",
        highlight && "text-purple-700 font-bold"
      )}>
        {value}
      </span>
    </div>
  );
}

function StatBox({ label, value, color }) {
  const colors = {
    purple: "bg-purple-50 border-purple-100 text-purple-700",
    blue: "bg-blue-50 border-blue-100 text-blue-700",
    green: "bg-green-50 border-green-100 text-green-700",
    red: "bg-red-50 border-red-100 text-red-700",
    gray: "bg-gray-50 border-gray-200 text-gray-700",
  };

  return (
    <div className={cn(
      "p-4 rounded-xl border flex flex-col items-center justify-center text-center",
      colors[color] || colors.gray
    )}>
      <span className="text-xs uppercase opacity-70 font-semibold mb-1">{label}</span>
      <span className="text-lg font-bold">{value}</span>
    </div>
  );
}

function Section({ title, children, icon }) {
  return (
    <div className="bg-white border border-gray-100 p-5 rounded-xl shadow-sm">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2">
        <span className="p-1.5 bg-gray-100 rounded-md text-gray-600">{icon}</span>
        {title}
      </h3>
      <div className="pl-9">
        {children}
      </div>
    </div>
  );
}
