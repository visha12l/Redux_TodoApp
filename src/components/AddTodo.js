import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

const _ = require('underscore');

class AddTodo extends React.Component {
  constructor() {
    super();
    this.textInput = React.createRef();
    this.addTodo = this.addTodo.bind(this);
  }

  addTodo(e) {
    e.preventDefault();
    const { current } = this.textInput;
    if (current.value) {
      this.props.addTodo(current.value);
      current.value = '';
    }
  }

  render() {
    const { todos } = this.props;
    return (
      <div>
        <form onSubmit={this.addTodo}>
          <input ref={this.textInput} />
          <button type="submit">
            Add Todo
          </button>
        </form>
        <ul>
          {todos && todos.length
             ? _.map(todos, (todo, key) => <li key={key}>{todo.text}</li>)
             : null
           }
        </ul>
      </div>
    );
  }
}

AddTodo.defaultProps = {
  todos: [],
  addTodo: undefined,
};

AddTodo.propTypes = {
  addTodo: PropTypes.func,
  todos: PropTypes.arrayOf,
};

function mapStateToProps(state) {
  return { todos: state.ToDoItem };
}

export default connect(mapStateToProps, { addTodo })(AddTodo);
