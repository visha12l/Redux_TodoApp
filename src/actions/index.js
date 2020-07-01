export const ADD_TODO = "ADD_TODO";
export const EDIT_ITEM = "EDIT_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const SET_EDIT = "SET_EDIT";

export function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  };
}

export function editItem(updatedItem) {
  return {
    type: EDIT_ITEM,
    updatedItem
  };
}

export function deleteItem(deleteKey) {
  return {
    type: DELETE_ITEM,
    deleteKey
  };
}

export function setEdit(editKey) {
  return {
    type: SET_EDIT,
    editKey
  };
}
