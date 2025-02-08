import { useState } from 'react';
import { Package, Plus, AlertTriangle } from 'lucide-react';

interface Resource {
  id: string;
  name: string;
  category: 'medical' | 'food' | 'shelter' | 'equipment';
  quantity: number;
  threshold: number;
  location: string;
  lastUpdated: Date;
}

export default function ResourceInventory() {
  const [resources, setResources] = useState<Resource[]>([]);
  
  return (
    <div className="bg-white dark:bg-black rounded-lg shadow-lg p-6 border dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resource Inventory</h2>
        <button className="btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Resource
        </button>
      </div>
      
      {/* Resource tracking and alerts */}
      <div className="space-y-4">
        {resources.map(resource => (
          <div key={resource.id} className="p-4 border dark:border-gray-700 rounded-lg">
            {resource.quantity < resource.threshold && (
              <div className="flex items-center text-red-500 mb-2">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Low Stock Alert
              </div>
            )}
            {/* Resource details */}
          </div>
        ))}
      </div>
    </div>
  );
} 