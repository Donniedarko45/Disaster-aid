interface User {
  id: string;
  name: string;
  role: 'admin' | 'coordinator' | 'responder';
  organization: string;
  permissions: string[];
}

export async function login(credentials: { email: string; password: string }) {
  // Implement login logic
}

export function useAuth() {
  // Custom hook for auth state and user info
} 