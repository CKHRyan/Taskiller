/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useRef } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  AsyncStorageStatic
} from 'react-native';
import { Header } from 'react-native-elements';

import TaskBrowser from './pages/taskBrowser';
import TaskAdder from './pages/taskAdder';
import Setting from './pages/setting';

const Stack = createStackNavigator();

const App = (props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigationRef = useRef();

  const [routeName, setRouteName] = useState("Task Manager");
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header
        backgroundColor="#1A1A1A"
        leftComponent={routeName !== "Setting" ? 
          { icon: 'menu', color: '#fff', size: 30,
            onPress: () => { 
              navigationRef.current.navigate("Setting");
            },
          } :
          {
            icon: 'keyboard-arrow-left', color: '#fff', size: 30,
            onPress: () => { 
              navigationRef.current.canGoBack() && navigationRef.current.goBack();
            },
          }
        }
        centerComponent={{ text: routeName, style: { color: '#fff', fontSize: 22 } }}
        rightComponent={{ icon: 'home', color: '#fff', size: 30, 
          onPress: () => { 
            navigationRef.current.canGoBack() && navigationRef.current.dispatch(StackActions.popToTop()); 
          } 
        }}
        containerStyle={{paddingVertical: 20}}
      />
      <NavigationContainer
        ref={navigationRef}
        onReady={() => setRouteName(navigationRef.current.getCurrentRoute().name)}
        onStateChange={async() => setRouteName(navigationRef.current.getCurrentRoute().name)}
      >
        <Stack.Navigator initialRouteName="Task Manager" headerMode="none">
          <Stack.Screen name="Task Manager" component={TaskBrowser} />
          <Stack.Screen name="Create Task" component={TaskAdder} />
          <Stack.Screen name="Setting" component={Setting} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
