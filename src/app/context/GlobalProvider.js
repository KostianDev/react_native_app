import React, { createContext, useContext, useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        initializing,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider;