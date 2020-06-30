import { connect } from "react-redux";
import { addTodo } from "../actions";

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.addTodo = this.addTodo.bind(this);
  }

  addTodo(e) {
    e.preventDefault();
    const { current } = this.textInput;
    if (current.value) {
      this.props.addTodo(current.value);
      current.value = "";
    }
  }

  render() {
    const { todos } = this.props;
    return (
      <div className="wrap">
        <h1>React-Redux TODO App</h1>
        <form onSubmit={this.addTodo}>
          <input placeholder="your item" ref={this.textInput} />
          <button type="submit">Add Item</button>
        </form>
        <ul className="toDolist">
          {todos.length ? (
            _.map(todos, (todo, key) => (
              <li className="toDolistItem" key={key}>
                {key + 1}){todo.text}
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
  addTodo: () => {}
};

AddTodo.propTypes = {
  addTodo: PropTypes.func,
  todos: PropTypes.arrayOf(PropTypes.object)
};

function mapStateToProps(state) {
  return { todos: state.ToDoItem };
}

export default connect(mapStateToProps, { addTodo })(AddTodo);
