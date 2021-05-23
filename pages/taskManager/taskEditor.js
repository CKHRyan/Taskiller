import React, { useContext, useState, useEffect } from 'react';
import { View } from 'react-native';
import TaskForm from '../frame/taskForm';
import { TaskContext } from '../../data/context';
import { editTask, findTaskById } from '../../service/taskManagement';
import Spinner from 'react-native-loading-spinner-overlay';

export default TaskEditor = (props) => {
  const { taskList, setTaskList } = useContext(TaskContext);
  const [taskDetail, setTaskDetail] = useState();
  const [loaded, setLoaded] = useState(undefined);

  useEffect(async () => {
    setTaskDetail(await findTaskById(props.route.params.id));
  }, []);

  useEffect(() => {
    if (loaded === undefined && taskDetail) {
      setLoaded(true);
    }
  }, [taskDetail]);

  const requestEditTask = async (name, deadline, priority, description) => {
    try {
      editTask(props.route.params.id, name, deadline, priority, description, (tasks) => {
        setTaskList(tasks);
      });
      props.navigation.popToTop();
    }
    catch(err) {
      console.log(err);
    }
  }

  if (!loaded) {
    return (
      <View style={{ flex: 1}}>
        <Spinner
          visible={true}
          textContent='Loading...'
          color="rgba(0, 0, 0, 0.5)"
          overlayColor="rgba(0, 0, 0, 0)"
          size="large"
        />
      </View>
    );
  }
  else {
    return (
      <TaskForm processForm={ requestEditTask } navigation={props.navigation} data={ taskDetail } />
    );
  }
};