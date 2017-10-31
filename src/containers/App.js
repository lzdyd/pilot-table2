import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ExcelActions from '../actions/ExcelActions';
import { evaluatesDependence } from '../services/evalDependence';

// import Excel from '../components/Excel/index';
import Authentication from './Authentication';
import { DocList } from './DocList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invalid: false
    };
  }

  componentWillReceiveProps(nextProps) {
    nextProps.excel.forEach((node) => {
      if (node.state === 'calculated-field') node.value = evaluatesDependence(node);
    });
  }

  onClickHandler() {
    this.setState({
      invalid: !this.state.invalid
    });
  }

  // <Excel
  // data={ excel && excel }
  // fetching={ excel && excel.fetching }
  // getData={ getData }
  // updateStoreData={ updateStoreData }
  // />
  // {!this.state.invalid ?
  // <Authentication onClick={this.onClickHandler.bind(this)}/> :
  //
  // {!this.state.invalid ?
  // <Authentication onClick={this.onClickHandler.bind(this)}/> : <DocList /> }


  render() {
    // const excel = this.props.excel;
    // const getData = this.props.excelActions.getData;
    // const updateStoreData = this.props.excelActions.updateStoreData;

    return (
      <div className="main-app">
        <DocList />
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
