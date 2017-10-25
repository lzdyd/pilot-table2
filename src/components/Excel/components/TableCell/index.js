import React, { Component } from 'react';

import numeral from 'numeral';

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
  componentWillMount() {
    if (this.props.data.state === 'input-field') {
      this.setState({
        editable: true
      });
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

    if (+this.refs.input.value !== this.props.value) {
      const id = this.props.data.id;
      this.props.onCellChange(id, +this.refs.input.value);
    }
  }

  render() {
    if (this.state.editable) {
      return (
        <div className={ `table-cell table-cell-data table-cell-${this.props.data.state}` }
             onClick={ ::this.onFocus }>
          {
            this.state.editing ?
              <input
                className="table-cell__input"
                type="text"
                ref="input"
                defaultValue={ this.props.value }
                onBlur={ ::this.onBlur }
              /> :
              <span>{ numeral(this.props.value).format('(0,0)') }</span>
          }
        </div>
      );
    }

    return (
      <div className={ `table-cell table-cell-data table-cell-${this.props.data.state}` }>
        {
          numeral(this.props.value).format('(0,0)')
        }
      </div>
    );
  }
}
