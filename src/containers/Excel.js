import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ExcelActions from '../actions/ExcelActions';

import Excel from '../components/Excel/index';

class App extends Component {
  componentDidMount() {
    this.props.excelActions.getData();
  }

  onCellChange(id, value) {
    this.props.excelActions.updateStore(id, value);
  }

  render() {
    const { docType1, fetching, valuesHash } = this.props.excel;
    const updateStore = this.props.excelActions.updateStore;

    return (
      <div className="main-app">
        <Excel data={ docType1 } fetching={ fetching } valuesHash={ valuesHash }
               onCellChange={ ::this.onCellChange } />
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
