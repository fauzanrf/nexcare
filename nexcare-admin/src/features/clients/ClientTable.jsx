import { useState } from 'react';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ClientDetailModal } from './ClientDetailModal';
import { ActionMenu } from '../../components/ActionMenu';
import { useAuth } from '../auth/AuthContext';

export function ClientTable({ data, onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
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
                <th className="px-6 py-4">CLIENT ID</th>
                <th className="px-6 py-4">CLIENT NAME</th>
                <th className="px-6 py-4">BANDWIDTH CLIENT</th>
                <th className="px-6 py-4">SERVICES</th>
                <th className="px-6 py-4 text-center">DETAIL</th>
                {canEdit && <th className="px-6 py-4 text-center">ACTIONS</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentData.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-purple-600">{item.id}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-gray-500">{item.bandwidth || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-700">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {item.services}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center">
                    <button 
                      onClick={() => setSelectedItem(item)}
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
              {currentData.length === 0 && (
                <tr>
                    <td colSpan={canEdit ? 6 : 5} className="px-6 py-8 text-center text-gray-500">
                        No clients found matching the criteria.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, data.length)} of {data.length} entries
          </span>
          <div className="flex gap-2">
            <button 
              onClick={handlePrev} 
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-colors"
            >
              <ChevronLeft size={18} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={cn(
                            "w-8 h-8 rounded-lg text-sm font-medium transition-colors",
                            currentPage === i + 1 
                                ? "bg-purple-600 text-white shadow-sm" 
                                : "text-gray-600 hover:bg-gray-100"
                        )}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
            <button 
              onClick={handleNext} 
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-colors"
            >
              <ChevronRight size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <ClientDetailModal 
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        data={selectedItem}
      />
    </>
  );
}
