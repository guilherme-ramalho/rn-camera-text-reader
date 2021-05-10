import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Camera from './screens/Camera';
import Result from './screens/Result';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="#fcba03" />
      {/* <Camera /> */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Camera" component={Camera} />
          <Stack.Screen name="Result" component={Result} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
