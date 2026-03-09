import { useState, useEffect } from 'react';
import { X, Save, Wifi } from 'lucide-react';
import api from '../../lib/api';

const EMPTY_FORM = {
    clientId: '',
    accountNumber: '',
    emailStarlink: '',
    passwordStarlink: '',
    emailHosting: '',
    passwordHosting: '',
    status: 'Active',
};

export function StarlinkFormModal({ item, onClose, onSaved }) {
    const isEdit = Boolean(item);
    const [form, setForm] = useState(isEdit ? {
        clientId: item.clientId || '',
        accountNumber: item.accountNumber || '',
        emailStarlink: item.emailStarlink || '',
        passwordStarlink: item.passwordStarlink || '',
        emailHosting: item.emailHosting || '',
        passwordHosting: item.passwordHosting || '',
        status: item.status || 'Active',
    } : EMPTY_FORM);
    const [clients, setClients] = useState([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        api.get('/clients').then(({ data }) => setClients(data)).catch(() => { });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.clientId) { alert('Pilih client terlebih dahulu'); return; }
        setSaving(true);
        try {
            if (isEdit) {
                await api.put(`/clients/${item.clientId}/starlink/${item.id}`, form);
            } else {
                await api.post(`/clients/${form.clientId}/starlink`, form);
            }
            onSaved();
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal menyimpan');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700 bg-purple-50/50 dark:bg-purple-900/10">
                    <div className="flex items-center gap-4">
                        <div className="bg-purple-100 dark:bg-purple-900/40 p-3 rounded-xl border border-purple-200 dark:border-purple-700">
                            <Wifi className="w-6 h-6 text-purple-700 dark:text-purple-400" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                            {isEdit ? 'Edit Akun Starlink' : 'Tambah Akun Starlink'}
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={22} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">

                    {/* Client selector */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Client *</label>
                        <select
                            name="clientId"
                            value={form.clientId}
                            onChange={handleChange}
                            disabled={isEdit}
                            className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-60"
                        >
                            <option value="">-- Pilih Client --</option>
                            {clients.map(c => (
                                <option key={c.id} value={c.id}>{c.name} ({c.cidIw})</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Field label="No. Account" name="accountNumber" value={form.accountNumber} onChange={handleChange} placeholder="ACC-xxxxxxx" />
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="Active">Active</option>
                                <option value="Suspend">Suspend</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Field label="Email Starlink" name="emailStarlink" type="email" value={form.emailStarlink} onChange={handleChange} placeholder="ops@example.com" />
                        <Field label="Password Starlink" name="passwordStarlink" value={form.passwordStarlink} onChange={handleChange} placeholder="••••••••" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Field label="Email Hosting" name="emailHosting" type="email" value={form.emailHosting} onChange={handleChange} placeholder="host@example.com" />
                        <Field label="Password Hosting" name="passwordHosting" value={form.passwordHosting} onChange={handleChange} placeholder="••••••••" />
                    </div>
                </form>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/20 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="px-5 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium rounded-lg text-sm flex items-center gap-2 transition-colors"
                    >
                        <Save size={16} />
                        {saving ? 'Menyimpan...' : 'Simpan'}
                    </button>
                </div>
            </div>
        </div>
    );
}

function Field({ label, name, value, onChange, type = 'text', placeholder }) {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
            <input
                name={name}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
        </div>
    );
}
