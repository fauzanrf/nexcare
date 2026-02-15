import { useState, useMemo } from "react";
import { RFOFilters } from "./RFOFilters";
import { RFOTable } from "./RFOTable";
import { RFOAddModal } from "./RFOAddModal";
import { SuccessNotification } from "../../components/SuccessNotification";
import mascot from "../../assets/mascot.png";
import { db } from "../../lib/db";

export default function RFOManagementPage() {
  const [rfos, setRfos] = useState(db.rfoData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Notification State
  const [successMsg, setSuccessMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setShowSuccess(true);
  };

  // Real-time Search Logic
  const filteredRfos = useMemo(() => {
    if (!searchQuery) return rfos;
    const lowerQuery = searchQuery.toLowerCase();
    return rfos.filter(
      (item) =>
        item.id.toLowerCase().includes(lowerQuery) ||
        item.clientName?.toLowerCase().includes(lowerQuery) ||
        item.clientId?.toLowerCase().includes(lowerQuery) ||
        item.projectName?.toLowerCase().includes(lowerQuery) ||
        item.status.toLowerCase().includes(lowerQuery) ||
        item.createdBy?.toLowerCase().includes(lowerQuery),
    );
  }, [rfos, searchQuery]);

  const handleSave = (newData) => {
    if (editingItem) {
      // Update existing
      setRfos((prev) =>
        prev.map((item) =>
          item.id === newData.id
            ? { ...newData, createdBy: item.createdBy }
            : item,
        ),
      );
      showNotification("RFO Data updated successfully!");
    } else {
      // Create new
      const newId = `RFO${Math.floor(100000 + Math.random() * 900000)}`;
      const newRfo = {
        id: newId,
        ...newData,
        createdBy: "Admin User", // Mock session user
        status: newData.status || "Pending",
      };
      setRfos((prev) => [newRfo, ...prev]);
      showNotification("New RFO Data added successfully!");
    }
    setEditingItem(null);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete ${item.id}?`)) {
      setRfos((prev) => prev.filter((i) => i.id !== item.id));
      showNotification("RFO Data deleted successfully!");
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
          RFO Management
        </h1>
        <div className="h-16 w-16 overflow-hidden -mb-4 -mr-4 opacity-80 pointer-events-none">
          <img
            src={mascot}
            alt="Mascot"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <RFOFilters
        onSearch={setSearchQuery}
        onAdd={() => {
          setEditingItem(null);
          setIsAddModalOpen(true);
        }}
      />

      <RFOTable
        data={filteredRfos}
        onEdit={(item) => {
          setEditingItem(item);
          setIsAddModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <RFOAddModal
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
