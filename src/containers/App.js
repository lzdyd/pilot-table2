import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ExcelActions from '../actions/ExcelActions';

import Excel from '../components/Excel/index';

class App extends Component {
  render() {
    const { data, fetching } = this.props.excel;
    const getData = this.props.excelActions.getData;
    const updateStoreData = this.props.excelActions.updateStoreData;

    return (
      <div className="main-app">
        <Excel
          data={ data }
          fetching={ fetching }
          getData={ getData }
          updateStoreData={ updateStoreData }
        />
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
