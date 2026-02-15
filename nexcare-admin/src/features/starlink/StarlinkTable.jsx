import { useState } from 'react';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { StarlinkDetailModal } from './StarlinkDetailModal';
import { ActionMenu } from '../../components/ActionMenu';
import { useAuth } from '../auth/AuthContext';

export function StarlinkTable({ data, onEdit, onDelete }) {
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
                <th className="px-6 py-4">STARLINK ACCOUNT</th>
                <th className="px-6 py-4">STARLINK NAME</th>
                <th className="px-6 py-4">STARLINK EMAIL</th>
                <th className="px-6 py-4">STARLINK PASSWORD</th>
                <th className="px-6 py-4 text-center">DETAIL</th>
                {canEdit && <th className="px-6 py-4 text-center">ACTIONS</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentData.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-purple-600">{item.id}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-gray-500">{item.email}</td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">••••••••</td>
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
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                        No starlink data found.
                    </td>
                </tr>
              )}
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
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg">{currentPage}</span>
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

      <StarlinkDetailModal 
        data={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </>
  );
}
