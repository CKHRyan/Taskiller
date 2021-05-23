/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useRef } from 'react';
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
  TouchableOpacity
} from 'react-native';
import { Header } from 'react-native-elements';

import TaskBrowser from './pages/taskManager/taskBrowser';
import TaskAdder from './pages/taskManager/taskAdder';
import TaskEditor from './pages/taskManager/taskEditor';
import Setting from './pages/Setting/setting';
import About from './pages/Setting/about';
import { TaskContext } from './data/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { intialization, getAllTasks, sortTasks } from './service/taskManagement';

const Stack = createStackNavigator();

const App = (props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigationRef = useRef();

  const [routeName, setRouteName] = useState("Task Manager");
  const [taskList, setTaskList] = useState();
  const [search, setSearch] = useState("");

  useEffect(async () => {
    let tasks = await getAllTasks();
    if (tasks) {
      setTaskList(tasks);
    }
    else {
      await intialization();
    }
    console.log(tasks);
  }, []);

  const horizontalAnimation = {
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [-layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle='light-content' />
      <Header
        backgroundColor="#1A1A1A"
        leftComponent={!["Setting", "About"].includes(routeName) ? 
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
      <TaskContext.Provider value={{taskList, setTaskList}}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => setRouteName(navigationRef.current.getCurrentRoute().name)}
          onStateChange={async() => setRouteName(navigationRef.current.getCurrentRoute().name)}
        >
          <Stack.Navigator initialRouteName="Task Manager" headerMode="none">
            <Stack.Screen name="Task Manager" component={TaskBrowser} />
            <Stack.Screen name="Create Task" component={TaskAdder} />
            <Stack.Screen name="Edit Task" component={TaskEditor} />
            <Stack.Screen name="Setting" component={Setting} options={horizontalAnimation} />
            <Stack.Screen name="About" component={About} />
          </Stack.Navigator>
        </NavigationContainer>
      </TaskContext.Provider>
    </SafeAreaView>
  );
};

export default App;
