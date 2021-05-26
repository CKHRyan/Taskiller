import React, { useState, useContext } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Icon, ListItem  } from 'react-native-elements';
import { TaskContext } from '../../data/context';
import { reset } from '../../service/storage';

export default Setting = (props) => {
  const { taskList, setTaskList } = useContext(TaskContext);
  const list = {
    style: {
      title: {
        fontSize: 20
      },
      icon: {
        iconSize: 30
      }
    },
    items: [
      /*
      {
        title: 'Notification',
        icon: 'notifications'
      },
      */
      {
        title: 'About',
        icon: 'computer',
        onPress: () => {
          props.navigation.navigate("About");
        }
      },
      {
        title: 'Initialization',
        icon: 'wifi-protected-setup',
        onPress: async () => {
          await reset((tasks) => setTaskList(tasks));
          props.navigation.popToTop();
        }
      },
      /*
      {
        title: 'Share',
        icon: 'share'
      },
      {
        title: 'Logout',
        icon: 'logout'
      }
      */
    ]
  }

  return (
    <View style={{ flex: 1 }}>

      <ScrollView contentInsetAdjustmentBehavior="automatic" >

        <View style={{marginTop: 20, paddingHorizontal: 15, flex: 1}}>
        {
          list.items.map((item, i) => (
            <ListItem key={i} bottomDivider onPress={item.onPress}>
              <Icon name={item.icon} size={list.style.icon.iconSize} />
              <ListItem.Content>
                <ListItem.Title style={list.style.title}>{item.title}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))
        }
        </View>

      </ScrollView>
    </View>
  );
}