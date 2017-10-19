import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { formatStr } from '../../../../services/api/formatstr'

import * as ExcelActions from '../../../../actions/ExcelActions';

import './style.scss';

class TableCell extends Component {
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

  onKeyDownHandler(e) {
      if (e.key === 'Enter') {
        this.onBlur();
      }
  }

  onBlur() {
    this.setState({
        editing: false
    });

    if (this.refs.input.value !== this.props.data.value) {
        const id = this.props.data.key;
        this.props.updateStoreData(id, this.refs.input.value)
    }
  }

  render() {
      // console.log(this.props.data.state);
    if (this.state.editable) {
      return (
        <div
            className={ `table-cell table-cell-data table-cell-${this.props.data.state}` }
            onClick={ ::this.onFocus }
        >
          {
            this.state.editing ?
              <input
                  className="table-cell__input"
                  type="text"
                  ref="input"
                  onBlur={ ::this.onBlur }
                  onKeyDown={::this.onKeyDownHandler}
                  defaultValue={ this.props.data.value }
              /> :
              <span>{ formatStr(this.props.data.value)}</span>
          }
        </div>
      );
    }

    return (
      <div className={ `table-cell table-cell-data table-cell-${this.props.data.state}` }>
        <span>{ formatStr(this.props.data.value + '') }</span>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        excel: state.excel
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        excelActions: bindActionCreators(ExcelActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableCell);

