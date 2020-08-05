import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import JogoDaVelha from './jogo-da-velha';

const Drawer = createDrawerNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRoute="Jogo da velha">
          <Drawer.Screen name="Jogo da velha" component={JogoDaVelha} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;