import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ExcelActions from '../actions/ExcelActions';

import Excel from '../components/Excel/index';

class EventEmitter {
  constructor() {
    this.events = {};
  }

  emit(eventName, data) {
    const event = this.events[eventName];
    if (event) {
      event.forEach((fn) => {
        fn.call(null, data);
      });
    }
  }

  subscribe(eventName, fn) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(fn);
    return () => {
      this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
    };
  }

  showEvents() {
    // console.log(this.events);
  }
}

class App extends Component {
  componentDidMount() {
    this.props.excelActions.getData();
  }

  render() {
    const { data, fetching } = this.props.excel;
    const updateStoreData = this.props.excelActions.updateStoreData;

    return <Excel data={ data } fetching={ fetching } updateStoreData={ updateStoreData } />;
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
