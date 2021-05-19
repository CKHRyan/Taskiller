import { saveItem, loadItem } from './storage';

const TaskListKey = "@taskList";

export const intializeTaskList = async () => {
  await saveItem({todoItems: [], doneItems: [], latestID: 0});
}

export const findTaskById = async (id) => {
  let tasks = await loadItem(TaskListKey);
  for (let i = 0; i < tasks.todoItems.length; i++) {
    if (tasks.todoItems[i].id === id) {
      return tasks.todoItems[i];
    }
  }
  throw new Error(`Task (id: ${id}) is not found or is already completed`);
}

export const completeTask = async (id, callback) => {
  try {
    let tasks = await loadItem(TaskListKey);
    for (let i = 0; i < tasks.todoItems.length; i++) {
      if (tasks.todoItems[i].id === id) {
        tasks.doneItems.push(tasks.todoItems.splice(i, 1)[0]);
        await saveItem(TaskListKey, tasks);
        callback(tasks);
        return;
      }
    }
    throw new Error(`Task (id: ${id}) is not found or is already completed`);
  }
  catch(err) {
    console.log(err);
  }
}

export const undoTask = async (id, callback) => {
  try {
    let tasks = await loadItem(TaskListKey);
    for (let i = 0; i < tasks.doneItems.length; i++) {
      if (tasks.doneItems[i].id === id) {
        tasks.todoItems.push(tasks.doneItems.splice(i, 1)[0]);
        await saveItem(TaskListKey, tasks);
        callback(tasks);
        return;
      }
    }
    throw new Error(`Task (id: ${id}) is not found or is uncompleted`);
  }
  catch(err) {
    console.log(err);
  }
}

export const createTask = async (id, name, deadline, description, callback) => {
  try {
    let newItem = {
      id: id,
      name: name, 
      deadline: deadline, 
      description: description
    };

    let tasks = await loadItem(TaskListKey);
    tasks.todoItems.push(newItem);
    tasks.latestID += 1;
    await saveItem(TaskListKey, tasks);
    callback(tasks);
  }
  catch(err) {
    console.log(err);
  }
}

export const editTask = async (id, name, deadline, description, callback) => {
    try {
    let editedItem = {
      id: id,
      name: name, 
      deadline: deadline, 
      description: description
    };

    let tasks = await loadItem(TaskListKey);
    for (let i = 0; i < tasks.todoItems.length; i++) {
      if (tasks.todoItems[i].id === id) {
        tasks.todoItems[i] = editedItem;
        await saveItem(TaskListKey, tasks);
        callback(tasks);
        return;
      }
    }
    throw new Error(`Task (id: ${id}) is not found or is already completed`);
  }
  catch(err) {
    console.log(err);
  }
}

export const deleteTask = async () => {

}