import React, { createContext, useState } from 'react';

export const UserContext = createContext();

// Create a UserProvider which will hold our state and provide it to our components
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ isLoggedIn: false });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
