import { useState } from 'react';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { TeamDetailModal } from './TeamDetailModal';
import { ActionMenu } from '../../components/ActionMenu';

export function TeamTable({ data, onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
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
                <th className="px-6 py-4">NAME</th>
                <th className="px-6 py-4">EMAIL</th>
                <th className="px-6 py-4">POSITION</th>
                <th className="px-6 py-4 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentData.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 overflow-hidden flex-shrink-0">
                        <img src={item.profilePicture} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{item.email}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                        "px-2 py-1 rounded text-xs font-semibold border",
                        item.position === 'NOC2' ? "bg-purple-50 text-purple-700 border-purple-100" :
                        item.position === 'NOC1' ? "bg-blue-50 text-blue-700 border-blue-100" :
                        "bg-orange-50 text-orange-700 border-orange-100"
                    )}>
                        {item.position}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center gap-2">
                        <button 
                            onClick={() => setSelectedItem(item)}
                            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg flex items-center gap-2 text-xs font-bold transition-all"
                        >
                            <Eye size={16} />
                            VIEW
                        </button>
                        <ActionMenu 
                            onEdit={() => onEdit(item)} 
                            onDelete={() => onDelete(item)} 
                        />
                    </div>
                  </td>
                </tr>
              ))}
              {currentData.length === 0 && (
                <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                        No team members found.
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

      <TeamDetailModal 
        data={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </>
  );
}
