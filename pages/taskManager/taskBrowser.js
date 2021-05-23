import React, { useState, useContext, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { Header, Tab, Card, Button, Icon, SearchBar, BottomSheet, ListItem, CheckBox } from 'react-native-elements';
import { TaskContext } from '../../data/context';
import { completeTask, undoTask, removeTask, searchTasks, sortTasks, getSortProps } from '../../service/taskManagement';
import Spinner from 'react-native-loading-spinner-overlay';
import dateTime from 'date-time';

export default TaskBrowser = (props) => {
  const { taskList, setTaskList } = useContext(TaskContext);
  const [tabValue, setTabValue] = useState(0);
  const [search, setSearch] = useState("");
  const [showSortTable, setShowSortTable] = useState(false);
  const [sortField, setSortField] = useState();
  const [sortOrder, setSortOrder] = useState();
  const [loaded, setLoaded] = useState(undefined);

  useEffect(async () => {
    const sortProps = await getSortProps();
    setSortField(sortProps.field);
    setSortOrder(sortProps.order);
    setLoaded(true);
  }, []);

  const handleTaskSort = async (field, order) => {
    setShowSortTable(false);
    setLoaded(false);
    await sortTasks(field, order, (tasks) => {
      setTaskList(tasks);
      setSortField(field);
      setLoaded(true);
    });
  }

  const sortTable = [
    { 
      title: 'ID', 
      onPress: async () => handleTaskSort("id", sortOrder), 
      containerStyle: { backgroundColor: (sortField && sortField === 'id') ? "#2289dc" : "#fff" },
      titleStyle: { color: (sortField && sortField === 'id') ? "#fff" : "#000" }
    },
    { 
      title: 'Name', 
      onPress: async () => handleTaskSort("name", sortOrder),
      containerStyle: { backgroundColor: (sortField && sortField === 'name') ? "#2289dc" : "#fff" },
      titleStyle: { color: (sortField && sortField === 'name') ? "#fff" : "#000" }
    },
    { 
      title: 'Deadline', 
      onPress: async () => handleTaskSort("deadline", sortOrder),
      containerStyle: { backgroundColor: (sortField && sortField === 'deadline') ? "#2289dc" : "#fff" },
      titleStyle: { color: (sortField && sortField === 'deadline') ? "#fff" : "#000" }
    },
    { 
      title: 'Priority', 
      onPress: async () => handleTaskSort("priority", sortOrder),
      containerStyle: { backgroundColor: (sortField && sortField === 'priority') ? "#2289dc" : "#fff" },
      titleStyle: { color: (sortField && sortField === 'priority') ? "#fff" : "#000" }
    },
    {
      title: 'Cancel',
      containerStyle: { backgroundColor: '#333' },
      titleStyle: { color: '#fff' },
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

  const requestRemoveTask = async (id) => {
    await removeTask(id, (tasks) => {
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

      { !loaded ? ( 
        <View>
          <Spinner
            visible={true}
            textContent='Loading...'
            color="rgba(0, 0, 0, 0.5)"
            overlayColor="rgba(0, 0, 0, 0)"
            size="large"
          />
        </View> 
      )
      : (
        <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{flexGrow: 1}}>
          <View style={{paddingBottom: 100, flex: 1}}>
            <TaskContext.Consumer>
              {context => {
                if (!context.taskList || !context.taskList.todoItems || !context.taskList.doneItems) {
                  return <></>
                }
                let items = tabValue === 0 ? context.taskList.todoItems : context.taskList.doneItems;
                if (items.length === 0) {
                  return (
                  <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 22}}>No Task Is Found</Text>
                  </View>
                  );
                }
                return (
                  items.map((item, index) => (
                    <TaskCard
                      key={item.id}
                      id={item.id} 
                      name={item.name} 
                      priority={item.priority} 
                      deadline={item.deadline} 
                      description={item.description}
                      done={tabValue === 0}
                      complete={requestCompleteTask}
                      undo={requestUndoTask}
                      remove={requestRemoveTask}
                      edit={(id) => props.navigation.navigate('Edit Task', { id })}
                    />
                  ))
                );
              }}
            </TaskContext.Consumer>
          </View>
        </ScrollView>
      )}

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


const TaskCard = (props) => {
  let buttons = props.done ? (
    <>
      <Button
        icon={<Icon name="edit" size={30} color="black" /> }
        type="clear"
        buttonStyle={{ padding: 0, marginRight: 5 }}
        onPress={() => props.edit(props.id)}
      />
      <Button
        icon={<Icon name="done" size={30} color="black" /> }
        type="clear"
        buttonStyle={{ padding: 0 }}
        onPress={() => props.complete(props.id)}
      />
    </>)
  : (
    <>
      <Button
        icon={<Icon name="undo" size={30} color="black" /> }
        type="clear"
        buttonStyle={{ padding: 0, marginRight: 5 }}
        onPress={() => props.undo(props.id)}
      />
        <Button
        icon={<Icon name="delete" size={30} color="black" /> }
        type="clear"
        buttonStyle={{ padding: 0 }}
        onPress={() => props.remove(props.id)}
      />
    </>
  );

  return(
    <Card>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <View><Card.Title style={{fontSize: 18}}>{props.name}</Card.Title></View>
        <View style={{ flexDirection: "row" }}>{buttons}</View>
      </View>
      <Card.Divider/>
      <Text style={{fontSize: 16}}>
        Priority:&nbsp;
        {(props.priority !== undefined && props.priority >= 0 && props.priority < 3) ?
        (props.priority === 2 ? "High" : (props.priority === 1 ? "Medium" : "Low")) : "nil" }
      </Text>
      <Text style={{fontSize: 16}}>
        Deadline:&nbsp;
        {(props.deadline !== undefined && props.deadline !== "") ?
        dateTime({date: new Date(props.deadline)}) : "nil" }
      </Text>
      <Text style={{fontSize: 16, marginBottom: 10}}>
        Description:&nbsp;
        {(props.description !== undefined && props.description !== "") ?
        props.description : "nil"}
      </Text>
    </Card>
  );
}