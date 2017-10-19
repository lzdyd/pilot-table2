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
    console.log(this.events);
  }
}

class App extends Component {
  componentDidMount() {
    this.props.excelActions.getData();

    const emitter = new EventEmitter();

    emitter.subscribe('id1-cell-changed', (data) => {
      // Update hash table
      // console.log(data);
    });

    emitter.emit('id1-cell-changed', { id: '1', value: '100' });

    emitter.showEvents();
  }

  render() {
    const { data, fetching } = this.props.excel;

    return <Excel data={ data } fetching={ fetching } />;
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
