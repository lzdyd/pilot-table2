import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ExcelActions from '../actions/ExcelActions';

import Excel from '../components/Excel/index';

class App extends Component {
  render() {
      // const { , fetching } = this.props.excel;
      const getData = this.props.excelActions.getData;
      const updateStoreData = this.props.excelActions.updateStoreData;
      const updateEvaluates = this.props.excelActions.updateEvaluates;

          return (
              <div className="main-app">
                <Excel
                    data={ this.props.excel && this.props.excel }
                    fetching={ this.props.excel && this.props.excel.fetching }
                    getData={ getData }
                    updateStoreData={ updateStoreData }
                    updateEvaluates = {updateEvaluates}
                />
              </div>
          );
  }
}

const mapStateToProps = (state) => {
  return {
    excel: state.excel.nodes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    excelActions: bindActionCreators(ExcelActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
