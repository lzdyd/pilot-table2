import React, { Component } from 'react';

import TableHeaders from './components/TableHeaders/index';
import TableRows from './components/TableRows/index';

import './style.scss';

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
}


export default class Excel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sum: [],
      dataHash: {}
    };

    this.calculateData = this.calculateData.bind(this);
    this.createDataHash = this.createDataHash.bind(this);
    this.evalJSON = this.evalJSON.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.createDataHash(nextProps);

      // Костыль (ли?)
      setTimeout(() => {
        this.calculateData(nextProps);
      }, 0);
    }
  }

  /**
    @description Returns new object with calculated values
    TODO: try to find another solution, this sucks
   */
  calculateData(nextProps) {
    const calculatedData = nextProps.data.attributes.map((item) => {
      if (!item.value) {
        const currentItem = Object.assign({}, item);
        currentItem.value = this.evalJSON(currentItem.formula);

        return currentItem;
      }

      return item;
    });
  }

  /**
   Function-helper. Creates hash table, where key is id, value is id's value
   */
  createDataHash(nextProps) {
    const hash = {};

    nextProps.data.attributes.forEach((item) => {
      const id = item.id;
      const value = +item.value || null;

      hash[id] = value;
    });

    this.setState({ dataHash: hash });
  }

  /**
   * Evaluates JavaScript function received via REST API and returns its result
   * @param { string } func - JS function to evaluate
   */
  evalJSON(func) {
    if (func) {
      const idHash = this.state.dataHash;

      const restructuredFunc = func.replace(/id\d+/g, (str) => {
        return `idHash[${str.match(/\d+/)}]`;
      });

      return eval('(' + restructuredFunc + ')') || 'Ошибка вычислений';
    }

    return null;
  }

  test() {
    this.props.updateStoreData("3", "10000");
  }

  render() {
    /**
     * If data is being fetched, render "Loading spinner"
     */
    if (this.props.fetching) {
      return (
        <div className="loading">
          <div className="wBall" id="wBall_1">
            <div className="wInnerBall"></div>
          </div>
          <div className="wBall" id="wBall_2">
            <div className="wInnerBall"></div>
          </div>
          <div className="wBall" id="wBall_3">
            <div className="wInnerBall"></div>
          </div>
          <div className="wBall" id="wBall_4">
            <div className="wInnerBall"></div>
          </div>
          <div className="wBall" id="wBall_5">
            <div className="wInnerBall"></div>
          </div>
        </div>
      );
    }

    /**
     If data was not received, inform user about it
     */
    if (!this.props.data) {
      return <h1>Something went wrong</h1>;
    }

    const data = this.props.data;

    const updateStoreData = this.props.updateStoreData;

    return (
      <div className="excel">
        <h1>{ data.title }</h1>

        <p>{ data.description }</p>

        <button onClick={ ::this.test }>test</button>

        <div className="excel-table">
          <TableHeaders data={ data.tableHeaders }/>
          {
            data.attributes.map((item) => {
              return (
                <TableRows data={ item } key={ item.id } updateStoreData={ updateStoreData } />
              );
            })
          }
        </div>
      </div>
    );
  }
}
