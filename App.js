import * as React from 'react';
import Providers from './navigation/index';
import { ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
        <Providers />
    </ApplicationProvider>
    
  );
}

export default App;