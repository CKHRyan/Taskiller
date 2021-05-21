import { saveItem, loadItem } from './storage';

const TaskListKey = "@taskList";
const SortPropsKey = "@sortProps";

export const intialization = async () => {
  await saveItem(TaskListKey, {todoItems: [], doneItems: [], latestID: 0});
  await saveItem({field: "id", order: "asc"});
}

export const getAllTasks = async () => {
  let tasks = await loadItem(TaskListKey);
  tasks = await organizeTasks(tasks);
  return tasks;
}

export const saveAllTasks = async (tasks) => {
  tasks = await organizeTasks(tasks);
  await saveItem(TaskListKey, tasks);
}

export const searchTasks = async (keyword) => {
  let tasks = await getAllTasks();
  const searchRegex = new RegExp(`.*${keyword}.*`);
  tasks.todoItems = tasks.todoItems.filter(item => searchRegex.test(item.name)),
  tasks.doneItems = tasks.doneItems.filter(item => searchRegex.test(item.name))
  return tasks;
}

export const organizeTasks = async(tasks) => {
  let sortProps = await getSortProps();
  let order = 0;
  if (sortProps.order === "asc") {
    order = 1;
  }
  else if (sortProps.order === "desc") {
    order = -1;
  }

  tasks.todoItems.sort((a, b) => {
    let a_field = a[sortProps.field];
    let b_field = b[sortProps.field];
    if (sortProps.field === "deadline") {
      a_field = (new Date(a_field)).getTime();
      b_field = (new Date(b_field)).getTime();
    }
    else if (typeof(a_field) === "string" && typeof(b_field) === "string") {
      a_field = a_field.toLowerCase();
      b_field = b_field.toLowerCase();
    }
    if (a_field < b_field) {
      return -1 * order;
    }
    else if (a_field > b_field) {
      return 1 * order;
    }
    else {
      return 0;
    }
  });
  for (let i = 0; i < tasks.todoItems.length; i++) {
    tasks.todoItems[i].orderId = i + 1;
  }
  for (let i = 0; i < tasks.doneItems.length; i++) {
    tasks.doneItems[i].orderId = i + 1;
  }

  console.log(`Tasks organized by ${sortProps.field} in ${sortProps.order} order`)
  return tasks;
}

export const sortTasks = async (field, order="asc", callback) => {
  const orderOptions = ["asc", "desc"];
  const sortOptions = ["id", "name", "deadline", "priority"];

  if (!(orderOptions.includes(order))) {
    throw new Error("Invalid sorting order");
  }
  
  let tasks = await getAllTasks();

  if (!((tasks.todoItems.length === 0 || Object.keys(tasks.todoItems[0]).includes(field)) && 
      (tasks.doneItems.length === 0 || Object.keys(tasks.doneItems[0]).includes(field)) && 
      sortOptions.includes(field))
  ) {
    throw new Error(`Field: ${field} not found in the task collection`);
  }

  await saveItem(SortPropsKey, { field, order });
  await saveAllTasks(tasks);
  console.log(`Tasks sorted by ${field} in ${order} order`)
  callback(tasks);
}

export const getSortProps = async () => {
  return await loadItem(SortPropsKey);
}

export const findTaskById = async (id) => {
  const tasks = await getAllTasks();
  for (let i = 0; i < tasks.todoItems.length; i++) {
    if (tasks.todoItems[i].id === id) {
      return tasks.todoItems[i];
    }
  }
  throw new Error(`Task (id: ${id}) is not found or is already completed`);
}

export const completeTask = async (id, callback) => {
  try {
    let tasks = await getAllTasks();
    for (let i = 0; i < tasks.todoItems.length; i++) {
      if (tasks.todoItems[i].id === id) {
        tasks.doneItems.push(tasks.todoItems.splice(i, 1)[0]);
        await saveAllTasks(tasks);
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
    let tasks = await getAllTasks();
    for (let i = 0; i < tasks.doneItems.length; i++) {
      if (tasks.doneItems[i].id === id) {
        tasks.todoItems.push(tasks.doneItems.splice(i, 1)[0]);
        await saveAllTasks(tasks);
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

export const createTask = async (id, name, deadline, priority, description, callback) => {
  try {
    let newItem = {
      id: id,
      name: name, 
      deadline: deadline, 
      priority: priority,
      description: description
    };

    let tasks = await getAllTasks();
    tasks.todoItems.push(newItem);
    tasks.latestID += 1;
    await saveAllTasks(tasks);
    callback(tasks);
  }
  catch(err) {
    console.log(err);
  }
}

export const editTask = async (id, name, deadline, priority, description, callback) => {
    try {
    let editedItem = {
      id: id,
      name: name, 
      deadline: deadline, 
      priority: priority,
      description: description
    };

    let tasks = await getAllTasks();
    for (let i = 0; i < tasks.todoItems.length; i++) {
      if (tasks.todoItems[i].id === id) {
        tasks.todoItems[i] = editedItem;
        await saveAllTasks(tasks);
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

export const removeTask = async (id, callback) => {
  try {
    let tasks = await getAllTasks();
    for (let i = 0; i < tasks.doneItems.length; i++) {
      if (tasks.doneItems[i].id === id) {
        tasks.doneItems.splice(i, 1);
        await saveAllTasks(tasks);
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