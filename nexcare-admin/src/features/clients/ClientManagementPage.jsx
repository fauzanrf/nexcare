import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Plus, Search, Eye, Edit, Trash2, X } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { hasPermission } from '../../lib/permissions';
import api from '../../lib/api';

const EMPTY_VENDOR = { vendorName: '', vendorCid: '', vendorBandwidth: '', installName: '', installPhone: '', installAddress: '' };
const EMPTY_STARLINK = { accountNumber: '', emailStarlink: '', passwordStarlink: '', emailHosting: '', passwordHosting: '', status: 'Active' };

// ─── Shared field component defined at MODULE LEVEL ───────────────────────────
// NEVER define components inside render functions — React will remount them
// on every render, causing inputs to lose focus after each keystroke.
function TextField({ label, fieldName, colSpan2, form, onChange }) {
  return (
    <div className={colSpan2 ? 'col-span-2' : ''}>
      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
      <input
        value={form[fieldName] || ''}
        onChange={e => onChange(fieldName, e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}

function ClientDetailModal({ client, onClose, role }) {
  const hidePasswords = role === 'magang';
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Detail Client</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {[['CID IW', client.cidIw], ['Nama Customer', client.name], ['Bandwidth', client.bandwidth], ['Services', client.services], ['No M2M', client.m2mNumber], ['No. PIC', client.picPhone]].map(([label, value]) => (
              <div key={label}><p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p><p className="font-medium text-gray-900 dark:text-gray-100">{value || '-'}</p></div>
            ))}
            <div className="col-span-2"><p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Alamat</p><p className="font-medium text-gray-900 dark:text-gray-100">{client.address || '-'}</p></div>
          </div>
          {client.ispVendors?.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">Vendor ISP ({client.ispVendors.length})</h3>
              <div className="space-y-3">
                {client.ispVendors.map((v, i) => (
                  <div key={v.id || i} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 grid grid-cols-2 gap-2 text-sm">
                    {[['Vendor', v.vendorName], ['Vendor CID', v.vendorCid], ['Bandwidth', v.vendorBandwidth], ['Nama Install', v.installName], ['Telepon', v.installPhone], ['Alamat Install', v.installAddress]].map(([l, val]) => (
                      <div key={l}><span className="text-gray-500 dark:text-gray-400 text-xs">{l}: </span><span className="font-medium text-gray-900 dark:text-gray-100">{val || '-'}</span></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
          {client.starlinkAccounts?.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">Akun Starlink ({client.starlinkAccounts.length})</h3>
              <div className="space-y-3">
                {client.starlinkAccounts.map((s, i) => (
                  <div key={s.id || i} className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 grid grid-cols-2 gap-2 text-sm">
                    {[['No. Account', s.accountNumber], ['Status', s.status], ['Email Starlink', s.emailStarlink], ['Password Starlink', hidePasswords ? '••••••••' : s.passwordStarlink], ['Email Hosting', s.emailHosting], ['Password Hosting', hidePasswords ? '••••••••' : s.passwordHosting]].map(([l, val]) => (
                      <div key={l}><span className="text-gray-500 dark:text-gray-400 text-xs">{l}: </span><span className="font-medium text-gray-900 dark:text-gray-100">{val || '-'}</span></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ClientFormModal({ client, onClose, onSave }) {
  const [form, setForm] = useState(
    client ? { ...client } : { cidIw: '', name: '', bandwidth: '', services: '', m2mNumber: '', address: '', picPhone: '' }
  );
  const [ispList, setIspList] = useState(client?.ispVendors || []);
  const [starlinkList, setStarlinkList] = useState(client?.starlinkAccounts || []);
  const [saving, setSaving] = useState(false);

  // Stable handler: doesn't change reference between renders
  const handleChange = useCallback((field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleIspChange = useCallback((idx, field, value) => {
    setIspList(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  }, []);

  const handleStarlinkChange = useCallback((idx, field, value) => {
    setStarlinkList(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (client?.id) {
        await api.put(`/clients/${client.id}`, form);
      } else {
        const { data: saved } = await api.post('/clients', form);
        for (const isp of ispList) await api.post(`/clients/${saved.id}/isp`, isp);
        for (const sl of starlinkList) await api.post(`/clients/${saved.id}/starlink`, sl);
      }
      onSave();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menyimpan data client');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{client ? 'Edit Client' : 'Tambah Client'}</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-4">

          {/* Use TextField (module-level) directly — no wrapper component inside render */}
          <div className="grid grid-cols-2 gap-3">
            <TextField label="CID IW *" fieldName="cidIw" form={form} onChange={handleChange} />
            <TextField label="Nama Customer *" fieldName="name" form={form} onChange={handleChange} />
            <TextField label="Bandwidth" fieldName="bandwidth" form={form} onChange={handleChange} />
            <TextField label="Services" fieldName="services" form={form} onChange={handleChange} />
            <TextField label="No M2M" fieldName="m2mNumber" form={form} onChange={handleChange} />
            <TextField label="No. PIC Customer" fieldName="picPhone" form={form} onChange={handleChange} />
            <TextField label="Alamat Customer" fieldName="address" colSpan2 form={form} onChange={handleChange} />
          </div>

          {/* ISP Vendors — only on create */}
          {!client && (
            <>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Vendor ISP</h3>
                  <button onClick={() => setIspList(p => [...p, { ...EMPTY_VENDOR }])} className="text-xs text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"><Plus size={14} /> Tambah ISP</button>
                </div>
                {ispList.map((isp, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 mb-2 grid grid-cols-2 gap-2">
                    {Object.keys(EMPTY_VENDOR).map(k => (
                      <div key={k}>
                        <label className="text-xs text-gray-400 mb-0.5 block capitalize">{k.replace(/([A-Z])/g, ' $1')}</label>
                        <input
                          value={isp[k]}
                          onChange={e => handleIspChange(i, k, e.target.value)}
                          className="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                    ))}
                    <div className="col-span-2">
                      <button onClick={() => setIspList(p => p.filter((_, j) => j !== i))} className="text-xs text-red-500 hover:underline">Hapus</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Akun Starlink</h3>
                  <button onClick={() => setStarlinkList(p => [...p, { ...EMPTY_STARLINK }])} className="text-xs text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"><Plus size={14} /> Tambah Starlink</button>
                </div>
                {starlinkList.map((sl, i) => (
                  <div key={i} className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 mb-2 grid grid-cols-2 gap-2">
                    {Object.keys(EMPTY_STARLINK).map(k => (
                      <div key={k}>
                        <label className="text-xs text-gray-400 mb-0.5 block capitalize">{k.replace(/([A-Z])/g, ' $1')}</label>
                        <input
                          value={sl[k]}
                          onChange={e => handleStarlinkChange(i, k, e.target.value)}
                          className="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                    ))}
                    <div className="col-span-2">
                      <button onClick={() => setStarlinkList(p => p.filter((_, j) => j !== i))} className="text-xs text-red-500 hover:underline">Hapus</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
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

export default function ClientManagementPage() {
  const { session } = useAuth();
  const role = session?.role;
  const canEdit = hasPermission(role, 'crud_client');
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [showDetail, setShowDetail] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editClient, setEditClient] = useState(null);
  const debounceRef = useRef(null);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedSearch(val), 400);
  };

  const fetchClients = useCallback(async () => {
    try {
      const { data } = await api.get('/clients', { params: { search: debouncedSearch || undefined } });
      setClients(data);
    } catch { }
    setLoading(false);
  }, [debouncedSearch]);

  useEffect(() => { fetchClients(); }, [fetchClients]);

  const handleViewDetail = async (client) => {
    const { data } = await api.get(`/clients/${client.id}`);
    setShowDetail(data);
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus client ini?')) return;
    await api.delete(`/clients/${id}`);
    fetchClients();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Client Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola semua data client</p>
        </div>
        {canEdit && (
          <button onClick={() => { setEditClient(null); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium transition-colors">
            <Plus size={16} /> Tambah Client
          </button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
        <input
          value={search}
          onChange={handleSearchChange}
          placeholder="Cari nama customer atau CID..."
          className="w-full pl-9 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                {['CID IW', 'Nama Customer', 'Bandwidth', 'Services', 'Aksi'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {loading ? (
                <tr><td colSpan={5} className="text-center py-10 text-gray-400">Memuat data...</td></tr>
              ) : clients.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-10 text-gray-400">Tidak ada data client.</td></tr>
              ) : clients.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-400 font-medium">{c.cidIw}</td>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{c.name}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{c.bandwidth || '-'}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{c.services || '-'}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleViewDetail(c)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"><Eye size={15} /></button>
                      {canEdit && <>
                        <button onClick={() => { setEditClient(c); setShowForm(true); }} className="p-1.5 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 text-purple-500"><Edit size={15} /></button>
                        <button onClick={() => handleDelete(c.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500"><Trash2 size={15} /></button>
                      </>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDetail && <ClientDetailModal client={showDetail} role={role} onClose={() => setShowDetail(null)} />}
      {showForm && <ClientFormModal client={editClient} onClose={() => setShowForm(false)} onSave={() => { setShowForm(false); fetchClients(); }} />}
    </div>
  );
}
