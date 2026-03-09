import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Plus, Search, Eye, Trash2, CheckCircle, X, Download } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { hasPermission } from '../../lib/permissions';
import api from '../../lib/api';

const CATEGORY = ['Hard', 'Normal', 'Easy'];
const TICKET_STATUS = ['Open', 'Close'];

// ─── All field components at MODULE LEVEL ─────────────────────────────────────
// Never define React components inside render functions — causes remount + focus loss
function RFOSelectField({ label, fieldName, options, form, onChange }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
      <select
        value={form[fieldName]}
        onChange={e => onChange(fieldName, e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function RFOTextField({ label, fieldName, type, form, onChange }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
      <input
        type={type || 'text'}
        value={form[fieldName]}
        onChange={e => onChange(fieldName, type === 'number' ? +e.target.value : e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}

function RFOCheckbox({ label, fieldName, form, onChange }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
      <label className="flex items-center gap-2 cursor-pointer mt-2">
        <input type="checkbox" checked={form[fieldName]} onChange={e => onChange(fieldName, e.target.checked)} className="w-4 h-4 rounded accent-purple-600" />
        <span className="text-sm text-gray-700 dark:text-gray-300">Ya</span>
      </label>
    </div>
  );
}

function RichEditorField({ label, fieldRef, fieldKey, onPaste, onInput }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
        {label} <span className="text-purple-400 text-xs">(bisa paste gambar)</span>
      </label>
      <div
        ref={fieldRef}
        contentEditable
        suppressContentEditableWarning
        onPaste={onPaste}
        onInput={onInput}
        className="w-full min-h-[100px] px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed"
        style={{ outline: 'none' }}
      />
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

function Badge({ color, children }) {
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>{children}</span>;
}

function RFODetailModal({ rfo, onClose, onApprove, canApprove }) {
  const [downloading, setDownloading] = useState(false);
  const statusColor = rfo.status === 'approved'
    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
  const ticketColor = rfo.statusTicket === 'Close' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700';

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await api.get(`/rfo/${rfo.id}/pdf`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `RFO-${rfo.rfoNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Gagal mengunduh PDF');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Detail RFO</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">{rfo.rfoNumber}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleDownload} disabled={downloading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 transition-colors">
              <Download size={14} /> {downloading ? 'Loading...' : 'PDF'}
            </button>
            {canApprove && rfo.status === 'pending' && (
              <button onClick={() => onApprove(rfo.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-green-600 hover:bg-green-700 text-white">
                <CheckCircle size={14} /> Approve
              </button>
            )}
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><X size={18} /></button>
          </div>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[['RFO ID', rfo.rfoNumber], ['Nama Customer', rfo.clientName], ['CID IW', rfo.cidIw], ['Dibuat Oleh', rfo.createdByName], ['Tanggal Insiden', rfo.incidentDate], ['Jam Insiden', rfo.incidentHour], ['Durasi (menit)', rfo.durationMinutes], ['Berdampak ke SLA', rfo.impactedSla ? 'Ya' : 'Tidak'], ['Kategori', rfo.category]].map(([l, v]) => (
              <div key={l}><p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{l}</p><p className="font-medium text-gray-900 dark:text-gray-100">{v || '-'}</p></div>
            ))}
            <div><p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Status Tiket</p><Badge color={ticketColor}>{rfo.statusTicket}</Badge></div>
            <div><p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Status</p><Badge color={statusColor}>{rfo.status === 'approved' ? 'Approved' : 'Pending'}</Badge></div>
          </div>
          {[['Deskripsi Insiden', 'incidentDescription'], ['Root Cause Analysis', 'rootCause'], ['Tindakan yang Diambil', 'actionTaken']].map(([label, key]) => (
            <div key={key}>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{label}</p>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-sm text-gray-800 dark:text-gray-200 min-h-[60px] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: rfo[key] || '<span class="text-gray-400">-</span>' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RFOFormModal({ onClose, onSave, clients }) {
  const [form, setForm] = useState({
    clientId: '', clientName: '', cidIw: '',
    incidentDate: '', incidentHour: '', durationMinutes: 0,
    impactedSla: false, category: 'Normal',
    statusTicket: 'Open', incidentDescription: '', rootCause: '', actionTaken: '',
  });
  const [saving, setSaving] = useState(false);
  const descRef = useRef(null);
  const rcRef = useRef(null);
  const atRef = useRef(null);

  // Stable handler — does NOT change reference between renders
  const handleChange = useCallback((field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleClientChange = (e) => {
    const c = clients.find(c => c.id === e.target.value);
    if (c) setForm(p => ({ ...p, clientId: c.id, clientName: c.name, cidIw: c.cidIw }));
  };

  const makeHandlePaste = (fieldRef, key) => (e) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          e.preventDefault();
          const blob = item.getAsFile();
          const reader = new FileReader();
          reader.onload = (ev) => {
            document.execCommand('insertImage', false, ev.target.result);
            setForm(p => ({ ...p, [key]: fieldRef.current.innerHTML }));
          };
          reader.readAsDataURL(blob);
          return;
        }
      }
    }
    setTimeout(() => setForm(p => ({ ...p, [key]: fieldRef.current.innerHTML })), 10);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.post('/rfo', {
        ...form,
        incidentDescription: descRef.current.innerHTML,
        rootCause: rcRef.current.innerHTML,
        actionTaken: atRef.current.innerHTML,
      });
      onSave();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal membuat RFO');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Tambah RFO</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-4">
          {/* Client selector */}
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Client</label>
            <select onChange={handleClientChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="">Pilih Client</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.name} ({c.cidIw})</option>)}
            </select>
          </div>

          {/* Use module-level field components directly — stable references */}
          <div className="grid grid-cols-2 gap-3">
            <RFOTextField label="Tanggal Insiden" fieldName="incidentDate" type="date" form={form} onChange={handleChange} />
            <RFOTextField label="Jam Insiden (ex: 13:00-14:00)" fieldName="incidentHour" form={form} onChange={handleChange} />
            <RFOTextField label="Durasi (menit)" fieldName="durationMinutes" type="number" form={form} onChange={handleChange} />
            <RFOCheckbox label="Berdampak ke SLA" fieldName="impactedSla" form={form} onChange={handleChange} />
            <RFOSelectField label="Kategori" fieldName="category" options={CATEGORY} form={form} onChange={handleChange} />
            <RFOSelectField label="Status Tiket" fieldName="statusTicket" options={TICKET_STATUS} form={form} onChange={handleChange} />
          </div>

          <RichEditorField
            label="Deskripsi Insiden" fieldRef={descRef} fieldKey="incidentDescription"
            onPaste={makeHandlePaste(descRef, 'incidentDescription')}
            onInput={() => setForm(p => ({ ...p, incidentDescription: descRef.current.innerHTML }))}
          />
          <RichEditorField
            label="Root Cause Analysis" fieldRef={rcRef} fieldKey="rootCause"
            onPaste={makeHandlePaste(rcRef, 'rootCause')}
            onInput={() => setForm(p => ({ ...p, rootCause: rcRef.current.innerHTML }))}
          />
          <RichEditorField
            label="Tindakan yang Diambil" fieldRef={atRef} fieldKey="actionTaken"
            onPaste={makeHandlePaste(atRef, 'actionTaken')}
            onInput={() => setForm(p => ({ ...p, actionTaken: atRef.current.innerHTML }))}
          />
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

export default function RFOManagementPage() {
  const { session } = useAuth();
  const role = session?.role;
  const canEdit = hasPermission(role, 'crud_rfo');
  const canApprove = hasPermission(role, 'approve_rfo');
  const [rfos, setRfos] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [showDetail, setShowDetail] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const debounceRef = useRef(null);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedSearch(val), 400);
  };

  const fetchRFOs = useCallback(async () => {
    try {
      const { data } = await api.get('/rfo', { params: { search: debouncedSearch || undefined } });
      setRfos(data);
    } catch { }
    setLoading(false);
  }, [debouncedSearch]);

  useEffect(() => { fetchRFOs(); }, [fetchRFOs]);
  useEffect(() => { api.get('/clients').then(({ data }) => setClients(data)).catch(() => { }); }, []);

  const handleApprove = async (id) => {
    if (!confirm('Approve RFO ini?')) return;
    await api.patch(`/rfo/${id}/approve`);
    setShowDetail(null);
    fetchRFOs();
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm('Hapus RFO ini?')) return;
    await api.delete(`/rfo/${id}`);
    fetchRFOs();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">RFO Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola laporan RFO</p>
        </div>
        {canEdit && (
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium transition-colors">
            <Plus size={16} /> Tambah RFO
          </button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          value={search}
          onChange={handleSearchChange}
          placeholder="Cari RFO, nama client, CID..."
          className="w-full pl-9 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                {['RFO ID', 'Nama Customer', 'CID IW', 'Status', 'Created By', 'Aksi'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-10 text-gray-400">Memuat data...</td></tr>
              ) : rfos.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-10 text-gray-400">Tidak ada data RFO.</td></tr>
              ) : rfos.map(r => (
                <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer" onClick={() => setShowDetail(r)}>
                  <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-400 font-medium">{r.rfoNumber}</td>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{r.clientName}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{r.cidIw || '-'}</td>
                  <td className="px-4 py-3">
                    <Badge color={r.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'}>
                      {r.status === 'approved' ? 'Approved' : 'Pending'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{r.createdByName || '-'}</td>
                  <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setShowDetail(r)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"><Eye size={15} /></button>
                      {canApprove && r.status === 'pending' && (
                        <button onClick={() => handleApprove(r.id)} className="p-1.5 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 text-green-600"><CheckCircle size={15} /></button>
                      )}
                      {canEdit && (
                        <button onClick={(e) => handleDelete(r.id, e)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500"><Trash2 size={15} /></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDetail && <RFODetailModal rfo={showDetail} onClose={() => setShowDetail(null)} onApprove={handleApprove} canApprove={canApprove} />}
      {showForm && <RFOFormModal onClose={() => setShowForm(false)} onSave={() => { setShowForm(false); fetchRFOs(); }} clients={clients} />}
    </div>
  );
}
