import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Routes from './src/Routes';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#40C0E7',
    accent: '#ED6C30',
    background: '#FFF',
    placeholder: '#bdbdbd',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Routes/>
    </PaperProvider>
  );
}