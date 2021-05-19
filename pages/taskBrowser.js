import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

import { Header, Tab, Card, Button, Icon, SearchBar } from 'react-native-elements';

import { TaskContext } from '../data/context';
import { completeTask, undoTask } from '../service/taskManagement';

export default TaskBrowser = (props) => {
  const { taskList, setTaskList } = useContext(TaskContext);
  const [tabValue, setTabValue] = useState(0);
  const [search, setSearch] = useState("");

  const requestCompleteTask = async (id) => {
    await completeTask(id, (tasks) => {
      setTaskList(tasks);
    });
  }

  const requestUndoTask = async (id) => {
    await undoTask(id, (tasks) => {
      setTaskList(tasks);
    })
  }

  return (
    <View style={{ flex: 1 }}>

      <Tab indicatorStyle={{ backgroundColor: "#1A1A1A" }} value={tabValue} onChange={(value) => setTabValue(value)}>
        <Tab.Item title="Tasks" titleStyle={{color: "#000", fontSize: 16}} containerStyle={{backgroundColor: '#fff'}} />
        <Tab.Item title="Completed" titleStyle={{color: "#000", fontSize: 16}} containerStyle={{backgroundColor: '#fff'}} />
      </Tab>
      
      <SearchBar
        placeholder="Search ..."
        onChangeText={(searchText) => {setSearch(searchText)}}
        value={search}
        containerStyle={{ marginTop: 5, marginHorizontal: 5, paddingVertical: 10, backgroundColor: 'transparent', borderBottomColor: 'transparent', borderTopColor: 'transparent' }}
        inputStyle={{ backgroundColor: "transparent", color: "black" }}
        inputContainerStyle={{ backgroundColor: "#ddd" }}
      />

      <ScrollView contentInsetAdjustmentBehavior="automatic" >
        <View style={{ paddingBottom: 100 }}>
          <TaskContext.Consumer>
            {context => {
              if (!context.taskList || !context.taskList.todoItems || !context.taskList.doneItems) {
                return <></>
              }
              let items;
              let buttons;
              if (tabValue === 0) {
                items = context.taskList.todoItems
                buttons = (id) => (
                <>
                  <Button
                    icon={<Icon name="edit" size={30} color="black" /> }
                    type="clear"
                    buttonStyle={{ padding: 0, marginRight: 5 }}
                    onPress={() => props.navigation.navigate('Edit Task', { id: id})}
                  />
                  <Button
                    icon={<Icon name="done" size={30} color="black" /> }
                    type="clear"
                    buttonStyle={{ padding: 0 }}
                    onPress={() => requestCompleteTask(id)}
                  />
                </>)
              }
              else {
                items = context.taskList.doneItems;
                buttons = (id) => (
                  <Button
                    icon={<Icon name="undo" size={30} color="black" /> }
                    type="clear"
                    buttonStyle={{ padding: 0, marginRight: 5 }}
                    onPress={() => requestUndoTask(id)}
                  />
                )
              }
              return (
                items.map((item, index) => (
                  <Card key={item.id} >
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <View><Card.Title style={{fontSize: 18}}>{item.name}</Card.Title></View>
                      <View style={{ flexDirection: "row" }}>
                        { buttons(item.id) }
                      </View>
                    </View>
                    <Card.Divider/>
                    <Text style={{fontSize: 16}}>
                      Deadline:&nbsp;
                      {(item.deadline !== undefined && item.deadline !== "") ?
                      item.deadline : "nil" }
                    </Text>
                    <Text style={{fontSize: 16, marginBottom: 10}}>
                      Description:&nbsp;
                      {(item.description !== undefined && item.description !== "") ?
                      item.description : "nil"}
                    </Text>
                  </Card>
                )
              )
            )}}
          </TaskContext.Consumer>
        </View>
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