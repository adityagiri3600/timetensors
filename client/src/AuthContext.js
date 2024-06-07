import React, { createContext, useState, useEffect,useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ username: '', email: '' });

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setIsLoggedIn(true);
      setUserData(parsedUserData);
    }
  }, []);

  const login = (data) => {
    setIsLoggedIn(true);
    setUserData(data);
    localStorage.setItem('userData', JSON.stringify(data));
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('userData');
    setUserData({ });
  };

  const updateUserData = (data) => {
    setUserData((prevData) => ({ ...prevData, ...data }));
    localStorage.setItem('userData', JSON.stringify({ ...userData, ...data }));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, login, logout, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
