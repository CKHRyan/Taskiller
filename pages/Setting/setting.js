import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Icon, ListItem  } from 'react-native-elements';

export default Setting = (props) => {
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
        navigate: () => {
          props.navigation.navigate("About");
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
            <ListItem key={i} bottomDivider onPress={item.navigate}>
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