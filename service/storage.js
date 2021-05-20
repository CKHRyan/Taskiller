import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveItem = async (key, value) => {
  try {
    if (!(key && value)) {
      throw new Error("Missing key or value of the saved item");
    }
    if (value.constructor === Object) {
      value = JSON.stringify(value);
    }
    await AsyncStorage.setItem(key, value);
    return true;
  }
  catch(err) {
    throw new Error(err);
    return false;
  }
}

export const loadItem = async (key) => {
  try {
    let item = await AsyncStorage.getItem(key);
    try {
      return JSON.parse(item);
    }
    catch(err) {
      return item;
    }
  }
  catch(err) {
    console.log(err);
  }
}
