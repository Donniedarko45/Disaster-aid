import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, Info } from 'lucide-react';

interface Notification {
  id: string;
  type: 'emergency' | 'alert' | 'info';
  message: string;
  timestamp: Date;
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-white"
      >
        <Bell className="h-6 w-6" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700">
          <div className="p-4 border-b dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map(notification => (
              <div key={notification.id} className="p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex items-start">
                  {notification.type === 'emergency' ? (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  ) : (
                    <Info className="h-5 w-5 text-blue-500" />
                  )}
                  <div className="ml-3">
                    <p className="text-sm text-gray-900 dark:text-white">{notification.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {notification.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 