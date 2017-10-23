import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ExcelActions from '../actions/ExcelActions';
import { evaluatesDependence } from '../services/evalDependence';

import Excel from '../components/Excel/index';

class App extends Component {

    componentWillReceiveProps(nextProps) {
        nextProps.excel.forEach((node) => {
            if (node.state === 'calculated-field') {
                node.value = evaluatesDependence(node);
            }
        })
    }


    render() {
        const excel = this.props.excel;
        const getData = this.props.excelActions.getData;
        const updateStoreData = this.props.excelActions.updateStoreData;

        return (
          <div className="main-app">
            <Excel
                data={ excel && excel }
                fetching={ excel && excel.fetching }
                getData={ getData }
                updateStoreData={ updateStoreData }
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
