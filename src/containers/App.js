import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ExcelActions from '../actions/ExcelActions';

import Excel from '../components/Excel/index';

class App extends Component {
  componentDidMount() {
    this.props.excelActions.getData();
  }

  render() {
    const { data, fetching } = this.props.excel;
    const updateStoreData = this.props.excelActions.updateStoreData;
    const updateStoreDataCompletely = this.props.excelActions.updateStoreDataCompletely;

    return (
      <div className="main-app">
        <Excel data={ data } fetching={ fetching } updateStoreData={ updateStoreData }
               updateStoreDataCompletely={ updateStoreDataCompletely }/>
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
