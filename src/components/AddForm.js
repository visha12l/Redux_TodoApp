class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.addItem(this.state.inputValue);
    this.setState({ inputValue: "" });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
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
    );
  }
}
export default AddForm;
