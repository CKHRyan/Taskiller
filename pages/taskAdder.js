import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  AsyncStorageStatic
} from 'react-native';

import { Header, ButtonGroup, Icon, Input, Tab  } from 'react-native-elements';

export default TaskAdder = (props) => {
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [remindMe, setRemindMe] = useState("");
  const [description, setDescription] = useState("");

  return (
    <View style={{ flex: 1 }}>

      <ScrollView contentInsetAdjustmentBehavior="automatic" >

        <View style={{marginTop: 20, paddingHorizontal: 15, flex: 1}}>
          <Input
            placeholder='Task name'
            style={{ padding: 0 }}
            label="Task"
            labelStyle={{fontSize: 20, color: "#555"}}
          />

          <Input
            placeholder='DD/MM/YYYY'
            style={{ padding: 0 }}
            label="Deadline"
            labelStyle={{fontSize: 20, color: "#555"}}
          />

          <Input
            placeholder='Remind me'
            style={{ padding: 0 }}
            label="time/period"
            labelStyle={{fontSize: 20, color: "#555"}}
          />

          <Input
            placeholder='Description'
            style={{ padding: 0 }}
            label="Task details..."
            labelStyle={{fontSize: 20, color: "#555"}}
          />
        </View>

      </ScrollView>

      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <Tab disableIndicator={true} >
          <Tab.Item title="Cancel" titleStyle={{ color: "#000", fontSize: 16 }} containerStyle={{borderTopWidth: 1, borderRightWidth: 1, borderColor: "#555"}} />
          <Tab.Item title="Create" titleStyle={{ color: "#000", fontSize: 16 }} containerStyle={{borderTopWidth: 1, borderColor: "#555"}}/>
        </Tab>
      </View>
    </View>
  );
};