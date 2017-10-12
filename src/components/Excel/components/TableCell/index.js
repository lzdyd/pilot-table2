import React, { Component } from 'react';

export default class TableCell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };
  }

  onFocus() {
    this.setState({ editing: true }, () => {
      this.refs.input.focus();
    });
  }

  onBlur() {
    this.setState({ editing: false });
  }

  render() {
    return (this.state.editing ?
      <input type="text" ref="input" defaultValue={ this.props.data } onBlur={ () => this.onBlur() }/> :
      <div className="table-cell" onClick={ () => this.onFocus() }>{ this.props.data }</div>);
  }
}
