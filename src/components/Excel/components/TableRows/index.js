import React, { Component } from 'react';

import TableCell from '../TableCell/index';

import './style.scss';

export default class TableRows extends Component {
  render() {
    return (
      <div className="table-row">
        <div className={ `table-cell table-cell-label ${this.props.data.formula ? 'table-cell-label-bold' : ''}` }>
          { this.props.data.label }
        </div>
        <div className={ `table-cell table-cell-label ${this.props.data.formula ? 'table-cell-label-bold' : ''}` }>
          { this.props.data.id }
        </div>
        <TableCell data={ this.props.data } value={ this.props.value } onCellChange={ this.props.onCellChange } />
      </div>
    );
  }
}
