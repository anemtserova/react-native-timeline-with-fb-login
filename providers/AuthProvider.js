import React, {useState, useContext} from 'react';

import auth from 'react-native-firebase/auth';

const AuthContext = useContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        fbLogin: async () => {},
        logout: async () => {
          try {
            await auth().signOut();
          } catch (err) {
            console.log(err);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
