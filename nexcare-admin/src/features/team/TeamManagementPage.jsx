import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Calendar, Users, MapPin, X, CheckCircle, Clock, UserCheck } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { hasPermission } from '../../lib/permissions';
import api from '../../lib/api';
import { cn } from '../../lib/utils';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Badge({ color, children }) {
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>{children}</span>;
}

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  assigned: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  done: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
};

const STATUS_LABELS = { pending: 'Pending', assigned: 'Ditugaskan', done: 'Selesai' };

const ROLE_LABELS = {
  noc1: 'NOC 1',
  noc2: 'NOC 2',
  technical_support: 'Technical Support',
  super_admin: 'Super Admin',
};

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

// ─── Assign Modal (Multi-select) ──────────────────────────────────────────────

function AssignModal({ visit, onClose, onSave }) {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(() => {
    // Pre-select existing members
    return new Set((visit.members || []).map(m => m.userId));
  });
  const [userMap, setUserMap] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/users').then(({ data }) => {
      const eligible = data.filter(u => ['noc1', 'technical_support'].includes(u.role));
      setUsers(eligible);
      const map = {};
      eligible.forEach(u => { map[u.id] = u; });
      setUserMap(map);
    }).catch(() => { });
  }, []);

  const toggle = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAssign = async () => {
    setSaving(true);
    try {
      const members = [...selected].map(id => ({
        userId: id,
        userName: userMap[id]?.name || '',
        userRole: userMap[id]?.role || '',
      }));
      await api.patch(`/team-visits/${visit.id}/assign`, { members });
      onSave();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menugaskan');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Users size={18} className="text-purple-600" />
              Pilih Tim
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate max-w-xs">
              Visit: <span className="font-semibold text-gray-700 dark:text-gray-200">{visit.title}</span>
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><X size={18} /></button>
        </div>

        {/* Instruction */}
        <div className="px-6 py-3 bg-purple-50 dark:bg-purple-900/20 border-b border-purple-100 dark:border-purple-800 flex-shrink-0">
          <p className="text-xs text-purple-700 dark:text-purple-300 font-medium">
            Pilih satu atau lebih anggota tim (NOC 1 / Technical Support) yang akan bertugas hari ini.
          </p>
        </div>

        {/* User list */}
        <div className="p-4 space-y-2.5 overflow-y-auto flex-1">
          {users.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">Tidak ada anggota tim tersedia.</p>
          ) : users.map(u => {
            const isSelected = selected.has(u.id);
            return (
              <button
                key={u.id}
                type="button"
                onClick={() => toggle(u.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all",
                  isSelected
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/30 dark:border-purple-500"
                    : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-purple-200 dark:hover:border-purple-700"
                )}
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center flex-shrink-0 text-purple-700 dark:text-purple-400 font-bold text-sm overflow-hidden">
                  {u.avatarUrl
                    ? <img src={`http://localhost:3001${u.avatarUrl}`} alt="" className="w-full h-full object-cover" />
                    : u.name.charAt(0).toUpperCase()
                  }
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className={cn("font-semibold text-sm truncate", isSelected ? "text-purple-800 dark:text-purple-200" : "text-gray-800 dark:text-gray-100")}>{u.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{ROLE_LABELS[u.role] || u.role}</p>
                </div>
                {/* Checkbox */}
                <div className={cn(
                  "w-5 h-5 rounded-md flex items-center justify-center border-2 flex-shrink-0 transition-colors",
                  isSelected ? "bg-purple-600 border-purple-600" : "border-gray-300 dark:border-gray-500"
                )}>
                  {isSelected && <CheckCircle size={13} className="text-white" strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between gap-3 flex-shrink-0">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {selected.size} anggota dipilih
          </span>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Batal</button>
            <button
              onClick={handleAssign}
              disabled={saving}
              className="px-5 py-2 text-sm rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium disabled:opacity-50 flex items-center gap-2"
            >
              <UserCheck size={15} />
              {saving ? 'Menugaskan...' : 'Tugaskan Tim'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Create Visit Modal ────────────────────────────────────────────────────────

function CreateVisitModal({ onClose, onSave }) {
  const [form, setForm] = useState({ title: '', scheduledDate: '', scheduledTime: '', location: '', notes: '' });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.title) { alert('Judul visit wajib diisi'); return; }
    setSaving(true);
    try {
      await api.post('/team-visits', form);
      onSave();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal membuat jadwal');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Calendar size={18} className="text-purple-600" /> Buat Jadwal Visit
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-4">
          {[
            { label: 'Judul / Nama Visit *', key: 'title' },
            { label: 'Tanggal', key: 'scheduledDate', type: 'date' },
            { label: 'Waktu', key: 'scheduledTime', type: 'time' },
            { label: 'Lokasi', key: 'location' },
          ].map(({ label, key, type = 'text' }) => (
            <div key={key}>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
              <input type={type} value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
          ))}
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Catatan</label>
            <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Batal</button>
          <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm rounded-lg bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50">
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Visit Card ────────────────────────────────────────────────────────────────

function VisitCard({ v, canAssign, onAssign, onDone }) {
  const members = v.members || [];
  const hasMember = members.length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all flex flex-col gap-3">
      {/* Title + Status */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight">{v.title}</h3>
        <Badge color={STATUS_COLORS[v.status] || STATUS_COLORS.pending}>{STATUS_LABELS[v.status] || v.status}</Badge>
      </div>

      {/* Meta */}
      <div className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Calendar size={12} className="flex-shrink-0" />
          <span>{v.scheduledDate}{v.scheduledTime ? ` • ${v.scheduledTime}` : ''}</span>
        </div>
        {v.location && (
          <div className="flex items-center gap-2">
            <MapPin size={12} className="flex-shrink-0" />
            <span className="truncate">{v.location}</span>
          </div>
        )}
        {v.notes && (
          <p className="text-xs text-gray-400 dark:text-gray-500 italic line-clamp-2">{v.notes}</p>
        )}
      </div>

      {/* Team Members */}
      <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mb-2 flex items-center gap-1.5">
          <Users size={11} /> Tim Bertugas
        </p>
        {hasMember ? (
          <div className="flex flex-wrap gap-1.5">
            {members.map(m => (
              <span key={m.id} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700">
                <span className="w-3.5 h-3.5 rounded-full bg-purple-400 dark:bg-purple-600 text-white flex items-center justify-center text-[8px] font-bold flex-shrink-0">
                  {m.userName.charAt(0)}
                </span>
                {m.userName}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 dark:text-gray-500 italic">Belum ada anggota ditugaskan</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-1">
        {canAssign && v.status !== 'done' && (
          <button
            onClick={() => onAssign(v)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors border border-purple-200 dark:border-purple-700 font-medium"
          >
            <Users size={13} /> {hasMember ? 'Ubah Tim' : 'Tugaskan Tim'}
          </button>
        )}
        {canAssign && v.status === 'assigned' && (
          <button
            onClick={() => onDone(v)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors border border-green-200 dark:border-green-700 font-medium"
          >
            <CheckCircle size={13} /> Selesai
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function TeamManagementPage() {
  const { session } = useAuth();
  const role = session?.role;
  const canCreate = hasPermission(role, 'crud_team_visit') || hasPermission(role, 'submit_team_visit');
  const canAssign = hasPermission(role, 'assign_team_visit');

  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [assignTarget, setAssignTarget] = useState(null);

  const today = todayStr();
  const todayVisits = visits.filter(v => v.scheduledDate === today);

  const fetchVisits = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/team-visits');
      setVisits(data);
    } catch { }
    setLoading(false);
  }, []);

  useEffect(() => { fetchVisits(); }, [fetchVisits]);

  const handleDone = async (visit) => {
    if (!confirm(`Tandai "${visit.title}" sebagai selesai?`)) return;
    try {
      await api.put(`/team-visits/${visit.id}`, { status: 'done' });
      fetchVisits();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal mengupdate status');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Jadwal Team Visit</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola jadwal dan penugasan tim lapangan</p>
        </div>
        {canCreate && (
          <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium transition-colors shadow-md shadow-purple-200 dark:shadow-none">
            <Plus size={16} /> Buat Jadwal
          </button>
        )}
      </div>

      {/* ── Jadwal Hari Ini Panel ── */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-5 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <Clock size={18} />
          </div>
          <div>
            <h2 className="font-bold text-base">Jadwal Hari Ini</h2>
            <p className="text-xs text-purple-200">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
        </div>

        {loading ? (
          <div className="h-16 bg-white/10 rounded-xl animate-pulse" />
        ) : todayVisits.length === 0 ? (
          <div className="bg-white/10 rounded-xl px-4 py-5 text-center">
            <p className="text-sm text-purple-200">Tidak ada kunjungan terjadwal hari ini.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todayVisits.map(v => {
              const members = v.members || [];
              return (
                <div key={v.id} className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex items-start gap-4">
                  <div className="flex-shrink-0 text-center">
                    <p className="text-lg font-bold leading-none">{v.scheduledTime || '--:--'}</p>
                    <p className="text-[10px] text-purple-200 mt-0.5">WIB</p>
                  </div>
                  <div className="border-l border-white/20 pl-4 flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{v.title}</p>
                    {v.location && <p className="text-xs text-purple-200 flex items-center gap-1 mt-0.5"><MapPin size={10} />{v.location}</p>}
                    {members.length > 0 ? (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {members.map(m => (
                          <span key={m.id} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-white text-xs font-medium">
                            <UserCheck size={10} /> {m.userName}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-purple-300 mt-1 italic">Belum ada tim ditugaskan</p>
                    )}
                  </div>
                  <Badge color={`${STATUS_COLORS[v.status]} !bg-white/20 !text-white border border-white/30`}>
                    {STATUS_LABELS[v.status]}
                  </Badge>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── All Visits Grid ── */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Semua Jadwal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 animate-pulse h-44" />
            ))
          ) : visits.length === 0 ? (
            <div className="col-span-3 text-center py-16 text-gray-400">Belum ada jadwal team visit.</div>
          ) : visits.map(v => (
            <VisitCard
              key={v.id}
              v={v}
              canAssign={canAssign}
              onAssign={setAssignTarget}
              onDone={handleDone}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      {showCreate && <CreateVisitModal onClose={() => setShowCreate(false)} onSave={() => { setShowCreate(false); fetchVisits(); }} />}
      {assignTarget && <AssignModal visit={assignTarget} onClose={() => setAssignTarget(null)} onSave={() => { setAssignTarget(null); fetchVisits(); }} />}
    </div>
  );
}
