import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {  } from 'react-native-elements';

export default About = (props) => {

  return (
    <View style={{ flex: 1 }}>

      <ScrollView contentInsetAdjustmentBehavior="automatic" >

        <View style={{marginTop: 20, paddingHorizontal: 15, flex: 1}}>
          <Text style={{fontSize: 26}}>Taskiller</Text>
          <Text style={{fontSize: 20}}>by Ryan Chung</Text>
          <Text style={{fontSize: 20}}>Github: @CKHRyan</Text>
        </View>

      </ScrollView>
    </View>
  );
}