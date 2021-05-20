import React, { useContext, useState, useEffect } from 'react';
import TaskForm from '../frame/taskForm';
import { TaskContext } from '../../data/context';
import { editTask, findTaskById } from '../../service/taskManagement';

export default TaskEditor = (props) => {
  const { taskList, setTaskList } = useContext(TaskContext);
  const [taskDetail, setTaskDetail] = useState();

  useEffect(async () => {
    setTaskDetail(await findTaskById(props.route.params.id));
  }, []);

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

  return (
    taskDetail
    ? <TaskForm processForm={ requestEditTask } navigation={props.navigation} data={ taskDetail } />
    : <></>
  );
};