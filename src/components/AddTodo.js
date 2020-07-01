import { connect } from "react-redux";
import { addTodo, editItem, deleteItem, setEdit } from "../actions";
import Input from "./Input";
class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
    this.updatedInput = React.createRef();
  }

  addTodo = e => {
    e.preventDefault();
    const { inputValue } = this.state;
    if (inputValue) {
      this.props.addTodo(inputValue);
      this.setState({ inputValue: "" });
    }
  };

  editItem = key => {
    // action dipatcher on submit event
    const updatedItem = {
      key,
      text: this.updatedInput.current.value
    };
    this.props.editItem(updatedItem);
    this.props.setEdit();
  };

  render() {
    const { todos } = this.props;
    const { inputValue } = this.state;
    return (
      <div className="wrap">
        <h1>React-Redux TODO App</h1>
        {/* create seperate component for this part */}
        <form onSubmit={this.addTodo}>
          <input
            className="input"
            placeholder="Enter your task"
            onChange={e => {
              this.setState({
                inputValue: e.target.value
              });
            }}
            value={inputValue}
          />
          <button className="button" type="submit">
            Add Item
          </button>
        </form>
        <ul className="toDolist">
          {todos.length ? (
            _.map(todos, (todo, key) => (
              <li className="toDolistItem" key={key}>
                {todo.isEdit ? (
                  <div className="toDolistText">
                    <Input refs={this.updatedInput} value={todo.text} />
                    <button
                      className="button"
                      onClick={() => this.editItem(key)}
                    >
                      submit
                    </button>
                  </div>
                ) : (
                  <span className="toDolistText">
                    {key + 1}){todo.text}
                  </span>
                )}
                <button
                  onClick={() => this.props.setEdit(key)}
                  className="button editBtn"
                >
                  Edit
                </button>
                <button
                  onClick={() => this.props.deleteItem(key)}
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
  addTodo: () => {},
  editItem: () => {},
  deleteItem: () => {},
  setEdit: () => {}
};

AddTodo.propTypes = {
  addTodo: PropTypes.func,
  editItem: PropTypes.func,
  deleteItem: PropTypes.func,
  setEdit: PropTypes.func,
  todos: PropTypes.arrayOf(PropTypes.object)
};

function mapStateToProps(state) {
  return { todos: state.ToDoItem };
}

export default connect(mapStateToProps, {
  addTodo,
  editItem,
  deleteItem,
  setEdit
})(AddTodo);
