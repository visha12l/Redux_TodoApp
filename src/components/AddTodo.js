import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

class  AddTodo extends React.Component {

  addTodo (e) {
    e.preventDefault();
    if(this.refs.userInput.value) {
      this.props.addTodo(this.refs.userInput.value);
      this.refs.userInput.value = ""
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addTodo.bind(this)}>
          <input ref="userInput" />
          <button type="submit">
            Add Todo
          </button>
        </form>
        <ul>
          {this.props.todos && this.props.todos.map(todo =>
            <li key={todo.id}>{todo.text}</li>
          )}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { todos: state.ToDoItem }
}

export default connect(mapStateToProps, { addTodo: addTodo })(AddTodo)
