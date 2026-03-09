import { useState } from 'react';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { StarlinkDetailModal } from './StarlinkDetailModal';
import { ActionMenu } from '../../components/ActionMenu';

export function StarlinkTable({ data, loading, canEdit, role, onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const hidePasswords = role === 'magang';

  const itemsPerPage = 8;
  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));
  const handlePrev = () => setCurrentPage(p => Math.max(1, p - 1));

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                {['No. Account', 'Client', 'Email Starlink', 'Email Hosting', 'Status', 'Detail', canEdit && 'Aksi'].filter(Boolean).map(h => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-400">Memuat data...</td>
                </tr>
              ) : currentData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-400">Tidak ada data Starlink.</td>
                </tr>
              ) : currentData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-purple-600 dark:text-purple-400">
                    {item.accountNumber || '-'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">{item.client?.name || '-'}</div>
                    <div className="text-xs text-gray-400 font-mono">{item.client?.cidIw || ''}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">
                    {item.emailStarlink || '-'}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">
                    {item.emailHosting || '-'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      'inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border',
                      item.status === 'Active'
                        ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
                        : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
                    )}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="p-1.5 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all"
                    >
                      <Eye size={14} /> VIEW
                    </button>
                  </td>
                  {canEdit && (
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <ActionMenu onEdit={() => onEdit(item)} onDelete={() => onDelete(item)} />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-700">
          <span className="text-gray-500 dark:text-gray-400 text-xs">
            Showing {data.length === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + itemsPerPage, data.length)} of {data.length} entries
          </span>
          <div className="flex items-center gap-2">
            <button onClick={handlePrev} disabled={currentPage === 1} className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-700">
              <ChevronLeft size={15} />
            </button>
            <span className="px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-lg">{currentPage}</span>
            <button onClick={handleNext} disabled={currentPage === totalPages} className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-700">
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      <StarlinkDetailModal data={selectedItem} onClose={() => setSelectedItem(null)} hidePasswords={hidePasswords} />
    </>
  );
}
