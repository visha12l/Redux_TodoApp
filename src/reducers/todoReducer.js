import { ADD_TODO, EDIT_ITEM, DELETE_ITEM, SET_EDIT } from "../actions";

const initialState = [
  {
    text: "ss"
  }
];
const ToDoItem = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text
        }
      ];
    case SET_EDIT:
      return [...state].map((item, key) => {
        item.isEdit = key === action.editKey ? true : false;
        return item;
      });
    case EDIT_ITEM:
      return [...state].map((item, key) => {
        if (key === action.updatedItem.key) {
          item.text = action.updatedItem.text;
          item.isEdit = false;
        }
        return item;
      });
    case DELETE_ITEM:
      return [...state.filter((item, key) => key !== action.deleteKey)];
    default:
      return state;
  }
};

export default ToDoItem;
