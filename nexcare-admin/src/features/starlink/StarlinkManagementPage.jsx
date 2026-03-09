import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Plus, Search, Eye, Edit, Trash2, X, Lock, Wifi } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { hasPermission } from '../../lib/permissions';
import api from '../../lib/api';

// ─── Detail Modal ─────────────────────────────────────────────────────────────

function StarlinkDetailModal({ item, role, onClose }) {
  const hidePasswords = role === 'magang';
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wifi size={18} className="text-purple-600 dark:text-purple-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Detail Akun Starlink</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
            <X size={18} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          {/* Client info */}
          {item.client && (
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider font-semibold">Informasi Client</p>
              <div className="grid grid-cols-2 gap-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Nama Client</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{item.client.name || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">CID IW</p>
                  <p className="font-mono text-sm font-semibold text-purple-600 dark:text-purple-400">{item.client.cidIw || '-'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Starlink fields */}
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider font-semibold">Informasi Akun</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                ['No. Account', item.accountNumber],
                ['Status', item.status],
                ['Email Starlink', item.emailStarlink],
                ['Password Starlink', hidePasswords ? '••••••••' : item.passwordStarlink],
                ['Email Hosting', item.emailHosting],
                ['Password Hosting', hidePasswords ? '••••••••' : item.passwordHosting],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                    {label === 'Status' ? (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${value === 'Active'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>{value || '-'}</span>
                    ) : (
                      value || '-'
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Form Modal (Add / Edit) ──────────────────────────────────────────────────

function StarlinkFormModal({ item, onClose, onSave }) {
  const isEdit = Boolean(item);
  const [form, setForm] = useState(isEdit ? {
    clientId: item.clientId || '',
    accountNumber: item.accountNumber || '',
    emailStarlink: item.emailStarlink || '',
    passwordStarlink: item.passwordStarlink || '',
    emailHosting: item.emailHosting || '',
    passwordHosting: item.passwordHosting || '',
    status: item.status || 'Active',
  } : {
    clientId: '', accountNumber: '', emailStarlink: '',
    passwordStarlink: '', emailHosting: '', passwordHosting: '', status: 'Active',
  });
  const [clients, setClients] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/clients').then(({ data }) => setClients(data)).catch(() => { });
  }, []);

  const handleSave = async () => {
    if (!form.clientId) { alert('Pilih client terlebih dahulu'); return; }
    setSaving(true);
    try {
      if (isEdit) {
        await api.put(`/clients/${item.clientId}/starlink/${item.id}`, form);
      } else {
        await api.post(`/clients/${form.clientId}/starlink`, form);
      }
      onSave();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menyimpan data');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Wifi size={18} className="text-purple-600 dark:text-purple-400" />
            {isEdit ? 'Edit Akun Starlink' : 'Tambah Akun Starlink'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"><X size={18} /></button>
        </div>

        <div className="p-6 space-y-4">
          {/* Client selector */}
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Client *</label>
            <select
              value={form.clientId}
              onChange={e => setForm(p => ({ ...p, clientId: e.target.value }))}
              disabled={isEdit}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-60"
            >
              <option value="">-- Pilih Client --</option>
              {clients.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.cidIw})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="No. Account" value={form.accountNumber} onChange={v => setForm(p => ({ ...p, accountNumber: v }))} placeholder="ACC-xxxxxxx" />
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Status</label>
              <select
                value={form.status}
                onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Active">Active</option>
                <option value="Suspend">Suspend</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Email Starlink" value={form.emailStarlink} onChange={v => setForm(p => ({ ...p, emailStarlink: v }))} placeholder="ops@example.com" />
            <Field label="Password Starlink" value={form.passwordStarlink} onChange={v => setForm(p => ({ ...p, passwordStarlink: v }))} placeholder="••••••••" icon={<Lock size={13} />} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Email Hosting" value={form.emailHosting} onChange={v => setForm(p => ({ ...p, emailHosting: v }))} placeholder="host@example.com" />
            <Field label="Password Hosting" value={form.passwordHosting} onChange={v => setForm(p => ({ ...p, passwordHosting: v }))} placeholder="••••••••" icon={<Lock size={13} />} />
          </div>
        </div>

        <div className="sticky bottom-0 bg-white dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Batal</button>
          <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm rounded-lg bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50">
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, icon }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>}
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${icon ? 'pl-8' : ''}`}
        />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function StarlinkManagementPage() {
  const { session } = useAuth();
  const role = session?.role;
  const canEdit = hasPermission(role, 'crud_starlink');

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [showDetail, setShowDetail] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const debounceRef = useRef(null);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedSearch(val), 400);
  };

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/starlink', { params: { search: debouncedSearch || undefined } });
      setItems(data);
    } catch { setItems([]); }
    setLoading(false);
  }, [debouncedSearch]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleViewDetail = async (item) => {
    // Re-fetch to get latest data with client relation
    setShowDetail(item);
  };

  const handleDelete = async (id) => {
    const item = items.find(i => i.id === id);
    if (!confirm('Yakin ingin menghapus akun Starlink ini?')) return;
    try {
      await api.delete(`/clients/${item.clientId}/starlink/${id}`);
      fetchItems();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Wifi size={22} className="text-purple-600 dark:text-purple-400" />
            Starlink Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola semua akun Starlink dan client terhubung</p>
        </div>
        {canEdit && (
          <button
            onClick={() => { setEditItem(null); setShowForm(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium transition-colors"
          >
            <Plus size={16} /> Tambah Akun
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
        <input
          value={search}
          onChange={handleSearchChange}
          placeholder="Cari no. account, email, atau status..."
          className="w-full pl-9 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                {['No. Account', 'Client', 'Email Starlink', 'Email Hosting', 'Status', 'Aksi'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-10 text-gray-400">Memuat data...</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-10 text-gray-400">Tidak ada data Starlink.</td></tr>
              ) : items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-400 font-medium">
                    {item.accountNumber || '-'}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 dark:text-gray-100">{item.client?.name || '-'}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">{item.client?.cidIw || ''}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">{item.emailStarlink || '-'}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">{item.emailHosting || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${item.status === 'Active'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetail(item)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                        title="Lihat detail"
                      >
                        <Eye size={15} />
                      </button>
                      {canEdit && <>
                        <button
                          onClick={() => { setEditItem(item); setShowForm(true); }}
                          className="p-1.5 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 text-purple-500"
                          title="Edit"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500"
                          title="Hapus"
                        >
                          <Trash2 size={15} />
                        </button>
                      </>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showDetail && <StarlinkDetailModal item={showDetail} role={role} onClose={() => setShowDetail(null)} />}
      {showForm && (
        <StarlinkFormModal
          item={editItem}
          onClose={() => { setShowForm(false); setEditItem(null); }}
          onSave={() => { setShowForm(false); setEditItem(null); fetchItems(); }}
        />
      )}
    </div>
  );
}
