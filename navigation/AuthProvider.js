import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
            user,
            setUser,
            login: async (email, password) => {
            try {
                await auth().signInWithEmailAndPassword(email, password);
            } catch (e) {
                alert(e.message);
            }
            },
            googleLogin: async () => {
                try{
                    const { idToken } = await GoogleSignin.signIn();

                    // Create a Google credential with the token
                    
                    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

                    // Sign-in the user with the credential
                    console.log("Google credentials: " +  googleCredential.providerId);
                    return auth().signInWithCredential(googleCredential);
                }catch(e) {
                    alert(e.message);
                }
            },
            facebookLogin: async () => {
                try { 
                    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
                    
                    if (result.isCancelled) {
                        throw 'User cancelled the login process';
                    }

                    // Once signed in, get the users AccesToken
                    const data = await AccessToken.getCurrentAccessToken();

                    if (!data) {
                        throw 'Something went wrong obtaining access token';
                    }

                    // Create a Firebase credential with the AccessToken
                    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
                    console.log('Credentials from fb login:' + facebookCredentials);
                    // Sign-in the user with the credential
                    await auth().signInWithCredential(facebookCredential);
                }catch(e) {
                    alert(e.message);
                }
            },
            register: async (email, password) => {
            try {
                await auth().createUserWithEmailAndPassword(email, password);
            } catch (e) {
                alert(e.message);
            }
            },
            logout: async () => {
            try {
                await auth().signOut();
            } catch (e) {
                alert(e.message);
            }
            },
        }}>
      {children}
        </AuthContext.Provider>
    );
}