import { useState, useMemo } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";
import { TeamTable } from "./TeamTable";
import { TeamAddModal } from "./TeamAddModal";
import { SuccessNotification } from "../../components/SuccessNotification";
import { db } from "../../lib/db";
import mascot from "../../assets/mascot.png";

export default function TeamManagementPage() {
  const [data, setData] = useState(db.teamData || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Notification
  const [successMsg, setSuccessMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setShowSuccess(true);
  };

  // Search Logic
  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    const lowerQuery = searchQuery.toLowerCase();
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.email.toLowerCase().includes(lowerQuery) ||
        item.position.toLowerCase().includes(lowerQuery),
    );
  }, [data, searchQuery]);

  const handleSave = (item) => {
    if (editingItem) {
      setData((prev) => prev.map((i) => (i.id === item.id ? item : i)));
      showNotification("Team Member updated successfully!");
    } else {
      setData((prev) => [item, ...prev]);
      showNotification("New Team Member added successfully!");
    }
    setEditingItem(null);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
      setData((prev) => prev.filter((i) => i.id !== item.id));
      showNotification("Team Member deleted successfully!");
    }
  };

  return (
    <div className="space-y-6">
      <SuccessNotification
        message={successMsg}
        isVisible={showSuccess}
        onClose={() => setShowSuccess(false)}
      />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          Team Management
        </h1>
        <div className="h-16 w-16 overflow-hidden -mb-4 -mr-4 opacity-80 pointer-events-none">
          <img
            src={mascot}
            alt="Mascot"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Filters / Controls */}
      <Card className="mb-6 p-4 border-purple-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Search */}
          <div className="md:col-span-3 space-y-1">
            <label className="text-sm font-medium text-gray-700">Search:</label>
            <div className="relative">
              <Input
                placeholder="Search by Name, Email, Position..."
                icon={Search}
                className="w-full focus:ring-purple-500"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Add Button */}
          <div>
            <Button
              onClick={() => {
                setEditingItem(null);
                setIsAddModalOpen(true);
              }}
              className="w-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center gap-2 shadow-purple-200"
            >
              <Plus size={18} />
              Add Member
            </Button>
          </div>
        </div>
      </Card>

      <TeamTable
        data={filteredData}
        onEdit={(item) => {
          setEditingItem(item);
          setIsAddModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <TeamAddModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSave}
        initialData={editingItem}
      />
    </div>
  );
}
