import React, { useState, useContext, useEffect, forwardRef } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';

import { Header, ButtonGroup, Icon, Input, Tab, Overlay  } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ModalDropdown from 'react-native-modal-dropdown';
import { TextInput } from 'react-native-gesture-handler';
import dateTime from 'date-time';

export default TaskForm = (props) => {

  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  //const [remindMe, setRemindMe] = useState("");
  const [priority, setPriority] = useState(-1);
  const [description, setDescription] = useState("");
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState({show: false, message: ""});

  useEffect(() => {
    if (props.data) {
      setName(props.data.name);
      setDeadline(new Date(props.data.deadline));
      setPriority(props.data.priority);
      setDescription(props.data.description);
    }
  }, []);

  const handleProcessForm = async () => {
    if (name === "" || priority === -1) {
      setShowErrorMessage({show: true, message: "Please fill in all the required field."});
      return;
    }
    props.processForm(name, deadline.toISOString(), priority, description);
  }

  const cancel = async () => {
    props.navigation.goBack();
  }

  return (
    <View style={{ flex: 1 }}>

      <ScrollView contentInsetAdjustmentBehavior="automatic" >

        <View style={{marginTop: 20, paddingHorizontal: 15, paddingBottom: 100, flex: 1, fontSize: 20}}>
          <View style={{marginVertical: 10}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Task *</Text>
            <TextInput 
              placeholder='Name of the task...'
              value={name}
              onChangeText={value => setName(value)} 
              style={{fontSize: 18, paddingHorizontal: 0, paddingVertical: 5, borderBottomColor: "#555", borderBottomWidth: 1}}
            />
          </View>
          
          <View style={{marginVertical: 10}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Deadline *</Text>
            <TouchableOpacity onPress={() => setShowDateTimePicker(true)}>
              <TextInput
                editable={false}
                value={dateTime({date: deadline})}
                style={{color: "#000", fontSize: 18, paddingHorizontal: 0, paddingVertical: 5, borderBottomColor: "#555", borderBottomWidth: 1}}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={showDateTimePicker}
              mode="datetime"
              onConfirm={setDeadline}
              onCancel={() => setShowDateTimePicker(false)}
            />
          </View>

          <View style={{marginVertical: 10}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Priority *</Text>
            <ModalDropdown
              defaultValue={['Low', 'Medium', 'High'][priority]}
              options={['Low', 'Medium', 'High']}
              onSelect={(index, value) => {
                setPriority(index);
              }}
              isFullWidth={true}
              textStyle={{fontSize: 18}}
              dropdownTextStyle={{fontSize: 18}}
              style={{paddingHorizontal: 0, paddingVertical: 5, borderBottomColor: "#555", borderBottomWidth: 1}}
              
            />
          </View>

          <View style={{marginVertical: 10}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Description</Text>
            <TextInput 
              placeholder='Detail of the task...'
              multiline={true}
              numberOfLines={2}
              value={description}
              onChangeText={value => setDescription(value)}
              style={{fontSize: 18, paddingHorizontal: 0, paddingVertical: 5, borderBottomColor: "#555", borderBottomWidth: 1}}
            />
          </View>
        </View>

      </ScrollView>

      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#FAFAFA" }}>
        <Tab 
          disableIndicator={true} 
          onChange={(value) => value === 1 ? 
            handleProcessForm() : cancel() 
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

      <Overlay 
        isVisible={showErrorMessage.show} 
        onBackdropPress={() => {setShowErrorMessage({show: false, message: ""})}}
        overlayStyle={{paddingVertical: 50, paddingHorizontal: 30}}
      >
        <Text style={{fontSize: 18}}>{showErrorMessage.message}</Text>
      </Overlay>
    </View>
  );
};