import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Linking } from 'react-native';

export default About = (props) => {

  return (
    <View style={{ flex: 1 }}>

      <ScrollView contentInsetAdjustmentBehavior="automatic" >

        <View style={{marginTop: 20, paddingHorizontal: 15, flex: 1}}>
          <Text style={{fontSize: 30}}>Taskiller</Text>
          <Text style={{fontSize: 20, marginBottom: 20}}>by Ryan Chung</Text>
          <Text style={{fontSize: 20}}>
            Github:&nbsp;
            <Text 
              onPress={() => Linking.openURL('https://github.com/CKHRyan')}
              style={{color: "#2289dc"}}
            >
              @CKHRyan
            </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            Browse other projects:&nbsp;
            <Text 
              onPress={() => Linking.openURL('https://ckhryan.github.io/index.html#/')}
              style={{color: "#2289dc"}}
            >
              CKHRyan's Page
            </Text>
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}