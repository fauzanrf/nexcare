import { Search, Plus } from 'lucide-react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';

export function RFOFilters({ onSearch, onAdd }) {
  return (
    <Card className="mb-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        
        {/* Real-time Search */}
        <div className="md:col-span-3 space-y-1">
           <label className="text-sm font-medium text-gray-700">Search:</label>
           <div className="relative">
             <Input 
               placeholder="Search by ID, Client, Project, Created By..." 
               icon={Search}
               className="w-full"
               onChange={(e) => onSearch(e.target.value)}
             />
           </div>
        </div>
        
        {/* Add Data Button */}
        <div>
          <Button 
            onClick={onAdd}
            className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Data
          </Button>
        </div>
      </div>
    </Card>
  );
}
