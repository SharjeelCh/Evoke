import React from 'react';
import NavStack from './screens/NavStack';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <NavStack />
    </>
  );
};

export default App;
