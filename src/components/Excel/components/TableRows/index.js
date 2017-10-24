import React, { Component } from 'react';

import TableCell from '../TableCell/index';

import './style.scss';

export default class TableRows extends Component {
  render() {
    return (
      <div className="table-row">
        <div className={ `table-cell table-cell-label table-cell-${this.props.data.state}` }>
          { this.props.data.label + ` (formula - ${this.props.data.formula || ''})`}
        </div>
        <TableCell data={ this.props.data } value={ this.props.value } onCellChange={ this.props.onCellChange } />
      </div>
    );
  }
}
