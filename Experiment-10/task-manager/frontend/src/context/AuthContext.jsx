import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // Initialize usersDB from localStorage
  const [usersDB, setUsersDB] = useState(() => {
    const stored = localStorage.getItem('usersDB');
    return stored ? JSON.parse(stored) : [];
  });

  const register = (name, email, password) => {
    const newUser = { id: Date.now(), name, email, password };
    const updatedUsers = [...usersDB, newUser];
    
    // Update both state and localStorage
    setUsersDB(updatedUsers);
    localStorage.setItem('usersDB', JSON.stringify(updatedUsers));
    
    setUser(newUser);
    localStorage.setItem('token', 'mock-token');
    return true;
  };

  const login = (email, password) => {
    // Always read from localStorage to get latest data
    const currentUsers = JSON.parse(localStorage.getItem('usersDB')) || [];
    const user = currentUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      setUser(user);
      localStorage.setItem('token', 'mock-token');
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};