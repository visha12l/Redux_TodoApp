export const ADD_TODO = "ADD_TODO";
export const EDIT_ITEM = "EDIT_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const SET_EDIT = "SET_EDIT";

const addTodo = text => {
  return {
    type: ADD_TODO,
    text
  };
};

const editItem = updatedItem => {
  return {
    type: EDIT_ITEM,
    updatedItem
  };
};

const deleteItem = deleteKey => {
  return {
    type: DELETE_ITEM,
    deleteKey
  };
};

const setEdit = editKey => {
  return {
    type: SET_EDIT,
    editKey
  };
};

export { addTodo, editItem, deleteItem, setEdit };
