import { useState } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  type: 'alert' | 'update' | 'action';
  severity: 'low' | 'medium' | 'high';
}

export default function EventTimeline() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
      
      <div className="space-y-6 ml-8">
        {events.map(event => (
          <div key={event.id} className="relative">
            <div className="flex items-center mb-2">
              <div className={`absolute -left-10 w-4 h-4 rounded-full ${
                event.severity === 'high' ? 'bg-red-500' :
                event.severity === 'medium' ? 'bg-yellow-500' :
                'bg-green-500'
              }`} />
              <span className="text-sm text-gray-500">
                {event.timestamp.toLocaleString()}
              </span>
            </div>
            <div className="bg-white dark:bg-black rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold">{event.title}</h4>
              <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 