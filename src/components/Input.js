class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.value
    };
  }
  render() {
    return (
      <input
        className="input"
        ref={this.props.refs}
        value={this.state.inputValue}
        onChange={e => {
          this.setState({
            inputValue: e.target.value
          });
        }}
      />
    );
  }
}
export default Input;
