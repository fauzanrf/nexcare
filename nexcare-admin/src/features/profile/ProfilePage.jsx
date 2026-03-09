import React, { useState } from 'react';
import { Camera, PenLine, Lock, Save, Loader2 } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import api from '../../lib/api';
import { ROLE_LABELS } from '../../lib/permissions';

export default function ProfilePage() {
    const { session, refreshSession } = useAuth();
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [sigFile, setSigFile] = useState(null);
    const [sigPreview, setSigPreview] = useState(null);
    const [name, setName] = useState(session?.name || '');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (e, setFile, setPreview) => {
        const file = e.target.files[0];
        if (!file) return;
        setFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSaveProfile = async () => {
        setSaving(true); setMsg(''); setError('');
        try {
            if (avatarFile) {
                const fd = new FormData(); fd.append('file', avatarFile);
                await api.post(`/users/${session.id}/avatar`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
            }
            if (sigFile) {
                const fd = new FormData(); fd.append('file', sigFile);
                await api.post(`/users/${session.id}/signature`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
            }
            if (name !== session.name) {
                await api.patch(`/users/${session.id}/profile`, { name });
            }
            await refreshSession();
            setMsg('Profil berhasil diperbarui!');
        } catch { setError('Gagal memperbarui profil.'); }
        setSaving(false);
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) { setError('Password baru tidak cocok.'); return; }
        setSaving(true); setMsg(''); setError('');
        try {
            await api.patch(`/users/${session.id}/password`, { password: newPassword });
            setOldPassword(''); setNewPassword(''); setConfirmPassword('');
            setMsg('Password berhasil diubah!');
        } catch { setError('Gagal mengubah password.'); }
        setSaving(false);
    };

    const avatarSrc = avatarPreview || (session?.avatarUrl ? `http://localhost:3001${session.avatarUrl}` : null);
    const sigSrc = sigPreview || (session?.signatureUrl ? `http://localhost:3001${session.signatureUrl}` : null);

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Profil Saya</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola informasi akun Anda</p>
            </div>

            {msg && <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg text-sm">{msg}</div>}
            {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">{error}</div>}

            {/* Profile Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-5">
                <h2 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2"><Camera size={16} /> Info Dasar</h2>

                {/* Avatar */}
                <div className="flex items-center gap-5">
                    <label className="cursor-pointer group relative">
                        <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-gray-700 group-hover:border-purple-500 transition-colors">
                            {avatarSrc ? <img src={avatarSrc} alt="avatar" className="w-full h-full object-cover" /> : <Camera size={24} className="text-gray-400" />}
                        </div>
                        <input type="file" accept="image/*" className="hidden" onChange={e => handleFileChange(e, setAvatarFile, setAvatarPreview)} />
                    </label>
                    <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">{session?.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{session?.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                            {ROLE_LABELS[session?.role] || session?.role}
                        </span>
                    </div>
                </div>

                <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Nama</label>
                    <input value={name} onChange={e => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>

                {/* Signature */}
                <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1.5"><PenLine size={13} /> Tanda Tangan</label>
                    <label className="cursor-pointer block">
                        <div className="w-full h-28 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-gray-700 hover:border-purple-500 transition-colors">
                            {sigSrc ? <img src={sigSrc} alt="Signature" className="max-h-full max-w-full object-contain p-2" /> : <PenLine size={24} className="text-gray-400" />}
                        </div>
                        <input type="file" accept="image/*" className="hidden" onChange={e => handleFileChange(e, setSigFile, setSigPreview)} />
                    </label>
                    <p className="text-xs text-gray-400 mt-1">Klik untuk upload gambar tanda tangan</p>
                </div>

                <button onClick={handleSaveProfile} disabled={saving} className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors disabled:opacity-50">
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    Simpan Profil
                </button>
            </div>

            {/* Change Password */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
                <h2 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2"><Lock size={16} /> Ubah Password</h2>
                {[
                    { label: 'Password Baru', val: newPassword, set: setNewPassword },
                    { label: 'Konfirmasi Password', val: confirmPassword, set: setConfirmPassword },
                ].map(({ label, val, set }) => (
                    <div key={label}>
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
                        <input type="password" value={val} onChange={e => set(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                ))}
                <button onClick={handleChangePassword} disabled={saving || !newPassword || !confirmPassword} className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white transition-colors disabled:opacity-50">
                    <Lock size={14} /> Ubah Password
                </button>
            </div>
        </div>
    );
}
