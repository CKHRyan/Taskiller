import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  AsyncStorageStatic
} from 'react-native';

import { Header, Tab, Card, Button, Icon, SearchBar } from 'react-native-elements';

export default TaskBrowser = (props) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [search, setSearch] = useState("");

  return (
    <View style={{flex: 1, paddingBottom: 100}}>

      <Tab indicatorStyle={{ backgroundColor: "#1A1A1A" }}>
        <Tab.Item title="Tasks" titleStyle={{color: "#000", fontSize: 16}} />
        <Tab.Item title="Completed" titleStyle={{color: "#000", fontSize: 16}} />
      </Tab>
      
      <SearchBar
        placeholder="Search ..."
        onChangeText={(searchText) => {setSearch(searchText)}}
        value={search}
        containerStyle={{ marginTop: 5, backgroundColor: "transparent", borderBottomColor: 'transparent', borderTopColor: 'transparent' }}
        inputStyle={{ backgroundColor: "transparent", color: "black" }}
        inputContainerStyle={{ backgroundColor: "#ddd" }}
      />

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Card>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start"}}>
            <View><Card.Title style={{fontSize: 18}}>Task B</Card.Title></View>
            <View style={{ flexDirection: "row" }}>
              <Button
                icon={<Icon name="edit" size={30} color="black" /> }
                type="clear"
                buttonStyle={{ padding: 0, marginRight: 5 }}
              />
              <Button
                icon={<Icon name="done" size={30} color="black" /> }
                type="clear"
                buttonStyle={{ padding: 0 }}
              />
            </View>
          </View>
          <Card.Divider/>
          <Text style={{fontSize: 16}}>Deadline: 21/5/2021</Text>
          <Text style={{fontSize: 16, marginBottom: 10}}>
            Description:
            The idea with React ...
          </Text>
        </Card>
      </ScrollView>

      <View style={{ alignSelf: 'flex-end', position: "absolute", bottom: 0 }}>
        <TouchableOpacity
          style={{
              borderWidth:1,
              borderColor:'rgba(0,0,0,0.2)',
              alignItems:'center',
              justifyContent:'center',
              width:75,
              height:75,
              backgroundColor:'#1A1A1A',
              borderRadius:50,
              marginRight: 15,
              marginBottom: 15
            }}
          onPress={() => props.navigation.navigate('Create Task')}
        >
          <Icon name={"add"}  size={40} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};