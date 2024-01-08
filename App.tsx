import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import MovieScreen from './Screens/MovieScreen';
import PersonScreen from './Screens/PersonScreen';
import SerachScreen from './Screens/SerachScreen';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown:false}} component={Home} />
        <Stack.Screen name="Movie" options={{headerShown:false}} component={MovieScreen} />
        <Stack.Screen name="PersonScreen" options={{headerShown:false}} component={PersonScreen} />
        <Stack.Screen name="SearchScreen" options={{headerShown:false}} component={SerachScreen} />
      </Stack.Navigator>
     
    </NavigationContainer>
  );
}

export default App;