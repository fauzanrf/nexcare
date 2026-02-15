import { useState } from 'react';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { RFODetailModal } from './RFODetailModal';

import { ActionMenu } from '../../components/ActionMenu';
import { useAuth } from '../auth/AuthContext';

export function RFOTable({ data, onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRFO, setSelectedRFO] = useState(null);
  const { session } = useAuth();
  
  const canEdit = session?.position === 'NOC1' || session?.position === 'NOC2';

  const itemsPerPage = 7;
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));
  const handlePrev = () => setCurrentPage(p => Math.max(1, p - 1));

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">RFO ID</th>
                <th className="px-6 py-4">STATUS RFO</th>
                <th className="px-6 py-4">CLIENT ID</th>
                <th className="px-6 py-4">CLIENT NAME</th>
                <th className="px-6 py-4">CREATED BY</th>
                <th className="px-6 py-4 text-center">DETAIL</th>
                {canEdit && <th className="px-6 py-4 text-center">ACTIONS</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentData.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-purple-600">{item.id}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-mono text-xs">{item.clientId || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">{item.clientName || item.client}</td>
                  <td className="px-6 py-4 text-gray-500">{item.createdBy || 'System'}</td>
                  <td className="px-6 py-4 flex justify-center">
                    <button 
                      onClick={() => setSelectedRFO(item)}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg flex items-center gap-2 text-xs font-bold transition-all"
                    >
                      <Eye size={16} />
                      VIEW
                    </button>
                  </td>
                  {canEdit && (
                    <td className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                            <ActionMenu 
                                onEdit={() => onEdit(item)} 
                                onDelete={() => onDelete(item)} 
                            />
                        </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <span className="text-gray-500 text-xs">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, data.length)} of {data.length} entries
          </span>
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrev} 
              disabled={currentPage === 1}
              className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-lg">{currentPage}</span>
            <button 
              onClick={handleNext} 
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <RFODetailModal 
        rfo={selectedRFO} 
        onClose={() => setSelectedRFO(null)} 
      />
    </>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-yellow-50 text-yellow-700 border-yellow-100",
    Accept: "bg-green-50 text-green-700 border-green-100",
    Completed: "bg-blue-50 text-blue-700 border-blue-100",
    Suspended: "bg-red-50 text-red-700 border-red-100",
    Active: "bg-purple-50 text-purple-700 border-purple-100",
  };

  const defaultStyle = "bg-gray-50 text-gray-700 border-gray-100";

  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-xs font-semibold border",
      styles[status] || defaultStyle
    )}>
      {status}
    </span>
  );
}
