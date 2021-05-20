import React, { useContext } from 'react';
import TaskForm from '../frame/taskForm';
import { TaskContext } from '../../data/context';
import { createTask } from '../../service/taskManagement';

export default TaskAdder = (props) => {
  const { taskList, setTaskList } = useContext(TaskContext);

  const requestCreateTask = async (name, deadline, priority, description) => {
    try {
      createTask(taskList.latestID + 1, name, deadline, priority, description, (tasks) => {
        setTaskList(tasks);
      });
      props.navigation.popToTop();
    }
    catch(err) {
      console.log(err);
    }
  }

  return (
    <TaskForm processForm={requestCreateTask} navigation={props.navigation} />
  );
};