import React, { useState, useContext, useEffect } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Header, ButtonGroup, Icon, Input, Tab  } from 'react-native-elements';

export default TaskForm = (props) => {

  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [remindMe, setRemindMe] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (props.data) {
      console.log("DATA", props.data);
      setName(props.data.name);
      setDeadline(props.data.deadline);
      setDescription(props.data.description);
    }
  }, []);

  const cancel = async () => {
    props.navigation.goBack();
  }

  return (
    <View style={{ flex: 1 }}>

      <ScrollView contentInsetAdjustmentBehavior="automatic" >

        <View style={{marginTop: 20, paddingHorizontal: 15, flex: 1}}>
          <Input
            placeholder='Task name'
            style={{ padding: 0 }}
            label="Task"
            labelStyle={{fontSize: 20, color: "#555"}}
            value={name}
            onChangeText={value => setName(value)}
          />

          <Input
            placeholder='DD/MM/YYYY'
            style={{ padding: 0 }}
            label="Deadline"
            labelStyle={{fontSize: 20, color: "#555"}}
            value={deadline}
            onChangeText={value => setDeadline(value)}
          />

          <Input
            placeholder='Remind me'
            style={{ padding: 0 }}
            label="time/period"
            labelStyle={{fontSize: 20, color: "#555"}}
            value={remindMe}
            onChangeText={value => setRemindMe(value)}
          />

          <Input
            placeholder='Description'
            style={{ padding: 0 }}
            label="Task details..."
            labelStyle={{fontSize: 20, color: "#555"}}
            value={description}
            onChangeText={value => setDescription(value)}
          />
        </View>

      </ScrollView>

      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <Tab 
          disableIndicator={true} 
          onChange={(value) => value === 1 ? 
            props.processForm(name, deadline, remindMe, description) : cancel() 
          }
        >
          <Tab.Item 
            title="Cancel" titleStyle={{ color: "#000", fontSize: 16 }} 
            containerStyle={{borderTopWidth: 1, borderRightWidth: 1, borderColor: "#555"}} 
          />
          <Tab.Item 
            title="Confirm" titleStyle={{ color: "#000", fontSize: 16 }}
            containerStyle={{borderTopWidth: 1, borderColor: "#555"}}
          />
        </Tab>
      </View>
    </View>
  );
};