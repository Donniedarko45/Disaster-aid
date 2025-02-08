import { ThemeProvider } from './components/ThemeContext';
import Dashboard from './components/Dashboard';
import { useState } from 'react';

interface User {
  id: string;
  name: string;
  role: 'admin' | 'coordinator' | 'responder';
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  // Simple login form for demonstration
  if (!user) {
    return (
      <ThemeProvider>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              DisasterAid Login
            </h1>
            {/* Add login form */}
            <button
              onClick={() => setUser({
                id: '1',
                name: 'Demo User',
                role: 'coordinator'
              })}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Demo Login
            </button>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;