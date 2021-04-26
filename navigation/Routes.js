import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
  import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';

import AuthStack from './AuthStack.android';
import AppStack from './AppStack';
import BottomNav from './BottomNav';




const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(true);
  const onAuthStateChanged = (user) => {
    setUser(user);
    setLoading(false);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <AppStack/> : <AuthStack/>}
      
      {/* {user ? <BottomNav/> : <AuthStack/>} */}
    </NavigationContainer>
  );
};

export default Routes;
