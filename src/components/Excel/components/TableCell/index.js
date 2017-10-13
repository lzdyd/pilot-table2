import React, { Component } from 'react';

import './style.scss';

export default class TableCell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      editing: false
    };
  }

  /**
    Checks if cell is editable
   */
  componentDidMount() {
    if (this.props.data.state === 'input-field') {
      this.setState({
        editable: true
      })
    }
  }

  onFocus() {
    this.setState({ editing: true }, () => {
      this.refs.input.focus();
    });
  }

  onBlur() {
    this.setState({
      editing: false
    });

    if (this.refs.input.value !== this.props.data.value) {
      const id = this.props.data.id;
      this.props.updateStoreData(id, this.refs.input.value)
    }
  }

  evaluateJS(func) {
    console.log(func);
    return 123;
  }

  render() {
    if (this.state.editable) {
      return (
        <div className={ `table-cell table-cell-data table-cell-${this.props.data.state}` } onClick={ ::this.onFocus }>
          {
            this.state.editing ?
              <input type="text" ref="input" onBlur={ ::this.onBlur } defaultValue={ this.props.data.value }/> :
              <span>{ this.props.data.value }</span>
          }
        </div>
      );
    }

    const jsFunc = this.props.data.formula;
    console.log(this.props);
    return (
      <div className={ `table-cell table-cell-data table-cell-${this.props.data.state}` }>
        <span>{ this.evaluateJS(jsFunc) }</span>
      </div>
    )
  }
}
