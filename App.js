import * as React from 'react';
import Providers from './navigation/index';
import { ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import SplashScreen from "react-native-lottie-splash-screen";

import  {LogBox} from 'react-native';



const ip = `192.168.10.3`
 LogBox.ignoreAllLogs()

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide(); // here
  }, []);
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
        <Providers />
    </ApplicationProvider>
    
  );
}


export default App;