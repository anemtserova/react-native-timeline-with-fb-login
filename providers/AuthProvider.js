import React, {useState, useContext} from 'react';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';

const AuthContext = useContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        fbLogin: async () => {
          try {
            const result = await LoginManager.logInWithPermissions([
              'public_profile',
              'email',
            ]);

            if (result.isCancelled) {
              throw 'User cancelled the login process';
            }

            // Once signed in, get the users AccesToken
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
              throw 'Something went wrong obtaining access token';
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(
              data.accessToken,
            );

            // Sign-in the user with the credential
            await auth().signInWithCredential(facebookCredential);
          } catch (err) {
            console.log(err);
          }
        },
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

export {AuthProvider, AuthContext};
