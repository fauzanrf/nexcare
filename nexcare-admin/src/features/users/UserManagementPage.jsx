import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Mail, User as UserIcon, Calendar, Shield } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { hasPermission, ROLE_LABELS } from '../../lib/permissions';
import api from '../../lib/api';

function Badge({ role }) {
    const colors = {
        super_admin: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        noc2: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
        noc1: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        technical_support: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
        magang: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
        provisioning: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    };
    const color = colors[role] || colors.magang;
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${color}`}>
            {ROLE_LABELS[role] || role}
        </span>
    );
}

function formatDate(dateString) {
    if (!dateString) return '-';
    const d = new Date(dateString);
    return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });
}

function CreateUserModal({ onClose, onSave }) {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'noc1' });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const handleSave = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.password) {
            setError('Semua field harus diisi.');
            return;
        }

        setSaving(true);
        setError('');
        try {
            await api.post('/users', form);
            onSave(); // Close and refresh
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal membuat user baru');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Tambah User Baru</h2>
                </div>
                <form onSubmit={handleSave}>
                    <div className="p-6 space-y-4">
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm border border-red-100 dark:border-red-800">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap *</label>
                            <input
                                type="text"
                                required
                                value={form.name}
                                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
                            <input
                                type="email"
                                required
                                value={form.email}
                                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Password *</label>
                            <input
                                type="password"
                                required
                                value={form.password}
                                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Role *</label>
                            <select
                                value={form.role}
                                onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                {Object.entries(ROLE_LABELS).map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex gap-3 justify-end rounded-b-2xl bg-gray-50 dark:bg-gray-800/50">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            Batal
                        </button>
                        <button type="submit" disabled={saving} className="px-4 py-2 text-sm font-medium rounded-lg bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50">
                            {saving ? 'Menyimpan...' : 'Simpan User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function UserManagementPage() {
    const { session } = useAuth();
    const role = session?.role;
    const canManageUsers = hasPermission(role, 'manage_users');

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/users');
            setUsers(data || []);
        } catch (err) {
            console.error('Failed to fetch users:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await api.delete(`/users/${deleteId}`);
            setDeleteId(null);
            fetchUsers();
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal menghapus user');
        }
    };

    if (!canManageUsers) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center">
                <Shield size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Akses Ditolak</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">User Management</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola akun dan role pengguna sistem NexCare</p>
                </div>
                <button
                    onClick={() => setShowCreate(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm"
                >
                    <Plus size={16} /> Tambah User
                </button>
            </div>

            {/* Stats Cards (Optional, just to look good) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <UserIcon size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Users</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{users.length}</p>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                        <thead className="bg-gray-50 dark:bg-gray-900/50 text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Bergabung Sejak</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-gray-400 dark:text-gray-500">
                                        <div className="flex items-center justify-center gap-2">
                                            <span className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></span>
                                            Memuat data pengguna...
                                        </div>
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-gray-400 dark:text-gray-500">
                                        Belum ada data user.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 flex items-center justify-center overflow-hidden">
                                                    {user.avatarUrl ? (
                                                        <img src={`http://localhost:3001${user.avatarUrl}`} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <UserIcon size={20} className="text-gray-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-gray-100">{user.name}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                                                        <Mail size={10} /> {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge role={user.role} />
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={14} className="opacity-70" /> {formatDate(user.createdAt)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                title="Hapus User"
                                                onClick={() => setDeleteId(user.id)}
                                                disabled={user.id === session?.id} // Cannot delete yourself
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Creata Modal */}
            {showCreate && (
                <CreateUserModal
                    onClose={() => setShowCreate(false)}
                    onSave={() => {
                        setShowCreate(false);
                        fetchUsers();
                    }}
                />
            )}

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
                        <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 mb-4">
                            <Trash2 size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Hapus User</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-6">
                            Apakah Anda yakin ingin menghapus user ini secara permanen?
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button onClick={() => setDeleteId(null)} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium text-sm">
                                Batal
                            </button>
                            <button onClick={handleDelete} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium text-sm">
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
