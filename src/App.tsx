import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import Camera from './screens/Camera'

export default function App() {
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="#fcba03" />
      <Camera />
    </SafeAreaView>
  );
}
