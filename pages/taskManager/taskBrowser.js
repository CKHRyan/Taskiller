import React, { useState, useContext, useEffect } from 'react';
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

import dateTime from 'date-time';

import { Header, Tab, Card, Button, Icon, SearchBar, BottomSheet, ListItem, CheckBox } from 'react-native-elements';

import { TaskContext } from '../../data/context';
import { completeTask, undoTask, searchTasks, sortTasks } from '../../service/taskManagement';

export default TaskBrowser = (props) => {
  const { taskList, setTaskList } = useContext(TaskContext);
  const [tabValue, setTabValue] = useState(0);
  const [search, setSearch] = useState("");
  const [showSortTable, setShowSortTable] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const handleTaskSort = async (field, order) => {
    await sortTasks(field, order, (tasks) => {
      setTaskList(tasks);
    });
    setShowSortTable(false);
  }
  const sortTable = [
    { title: 'ID', onPress: async () => handleTaskSort("id", sortOrder) },
    { title: 'Name', onPress: async () => handleTaskSort("name", sortOrder) },
    { title: 'Deadline', onPress: async () => handleTaskSort("deadline", sortOrder) },
    { title: 'Priority', onPress: async () => handleTaskSort("priority", sortOrder) },
    {
      title: 'Cancel',
      containerStyle: { backgroundColor: '#ddd' },
      onPress: () => setShowSortTable(false),
    },
  ];

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

  useEffect(async () => {
    setTaskList(await searchTasks(search));
  }, [search])

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
                      Priority:&nbsp;
                      {(item.priority !== undefined && item.priority >= 1 && item.priority <= 3) ?
                       (item.priority === 3 ? "High" : (item.priority === 2 ? "Medium" : "Low")) : "nil" }
                    </Text>
                    <Text style={{fontSize: 16}}>
                      Deadline:&nbsp;
                      {(item.deadline !== undefined && item.deadline !== "") ?
                      dateTime({date: new Date(item.deadline)}) : "nil" }
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

      <View style={{ flexDirection: 'row', alignSelf: 'flex-end', position: "absolute", bottom: 0 }}>
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
              marginRight: 5,
              marginBottom: 15
            }}
          onPress={() => setShowSortTable(true)}
        >
          <Icon name={"sort"}  size={40} color="#fff" />
        </TouchableOpacity>

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

      <BottomSheet
        isVisible={showSortTable}
        containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0)' }}
      >
        <View style={{flexDirection: 'row', justifyContent: 'center', backgroundColor: "#fff"}}>
          <CheckBox
            center
            title='Ascending'
            checked={sortOrder==="asc"}
            iconType='material'
            checkedIcon="check-box"
            uncheckedIcon="check-box-outline-blank"
            textStyle={{fontSize: 16}}
            containerStyle={{backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(0,0,0,0)'}}
            onIconPress={() => setSortOrder("asc")}
          />

          <CheckBox
            center
            title='Descending'
            checked={sortOrder==="desc"}
            iconType='material'
            checkedIcon="check-box"
            uncheckedIcon="check-box-outline-blank"
            textStyle={{fontSize: 16}}
            containerStyle={{backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(0,0,0,0)'}}
            onIconPress={() => setSortOrder("desc")}
          />
        </View>
        {sortTable.map((sortItem, index) => (
          <ListItem key={index} containerStyle={sortItem.containerStyle} onPress={sortItem.onPress}>
            <ListItem.Content>
              <ListItem.Title style={sortItem.titleStyle}>{sortItem.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </View>
  );
};