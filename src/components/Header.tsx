import  { useState } from 'react';
import { AlertTriangle, Bell, User, Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeContext';

export default function Header({ activeTab, setActiveTab }: {
  activeTab: 'allocation' | 'chat' | 'shelter';
  setActiveTab: (tab: 'allocation' | 'chat' | 'shelter') => void;
}) {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-500" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900 dark:text-white animate-fade-in">
              DisasterAid
            </h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            {['allocation', 'chat', 'shelter'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 transform hover:scale-105 ${
                  activeTab === tab
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                {tab === 'allocation' ? 'Resource Allocation' :
                 tab === 'chat' ? 'Emergency Chat' : 'Find Shelter'}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300">
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300">
              <User className="h-6 w-6" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['allocation', 'chat', 'shelter'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab as any);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md ${
                    activeTab === tab
                      ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  {tab === 'allocation' ? 'Resource Allocation' :
                   tab === 'chat' ? 'Emergency Chat' : 'Find Shelter'}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}