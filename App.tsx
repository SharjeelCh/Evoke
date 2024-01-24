import React from 'react';
import NavStack from './screens/NavStack';
import {StatusBar} from 'react-native';
import { UserProvider } from './screens/UserProvider';

const App = () => {
  return (
    <UserProvider>
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <NavStack />
    </>
    </UserProvider>
  );
};

export default App;
