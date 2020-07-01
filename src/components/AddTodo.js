import { connect } from "react-redux";
import { addTodo, editItem, deleteItem, setEdit } from "../actions";
import Input from "./Input";
import AddForm from "./AddForm";
class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.updatedInput = React.createRef();
  }

  render() {
    const { todos, editItem, setEdit, deleteItem } = this.props;
    return (
      <div className="wrap">
        <h1>React-Redux TODO App</h1>
        {/* create seperate component for this part */}
        <AddForm addItem={value => this.props.addItem(value)} />
        <ul className="toDolist">
          {todos.length ? (
            _.map(todos, (todo, key) => (
              <li className="toDolistItem" key={key}>
                {todo.isEdit ? (
                  <div className="toDolistText">
                    <Input refs={this.updatedInput} value={todo.text} />
                    <button
                      className="button"
                      onClick={() =>
                        editItem({
                          key: key,
                          text: this.updatedInput.current.value
                        })
                      }
                    >
                      submit
                    </button>
                  </div>
                ) : (
                  <span className="toDolistText">
                    {key + 1}){todo.text}
                  </span>
                )}
                <button onClick={() => setEdit(key)} className="button editBtn">
                  Edit
                </button>
                <button
                  onClick={() => deleteItem(key)}
                  className="button deleteBtn"
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p>no items added.</p>
          )}
        </ul>
      </div>
    );
  }
}

AddTodo.defaultProps = {
  todos: [],
  addItem: () => {},
  editItem: () => {},
  deleteItem: () => {},
  setEdit: () => {}
};

AddTodo.propTypes = {
  addItem: PropTypes.func,
  editItem: PropTypes.func,
  deleteItem: PropTypes.func,
  setEdit: PropTypes.func,
  todos: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = state => {
  return { todos: state.ToDoItem };
};

const mapDispatchToProps = dispatch => {
  return {
    addItem: text => {
      dispatch(addTodo(text));
    },
    editItem: updatedItem => {
      dispatch(editItem(updatedItem));
      dispatch(setEdit());
    },
    deleteItem: key => {
      dispatch(deleteItem(key));
    },
    setEdit: key => {
      dispatch(setEdit(key));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
