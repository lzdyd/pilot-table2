import React, { Component } from 'react';

import TableCell from './components/TableCell/index';
import Diagram from './components/Diagram/index';

import './style.scss';

export default class Excel extends Component {
  /**
   *@description State for Recharts
   * @property { Array } sum - Data for creating column diagram
   */
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      sum: []
    };
  }

  componentDidMount() {
    this.props.getData();
  }

  /**
   * Evaluates JavaScript function received via REST API and saves its result to component's state
   * @param { string } func - JS func to evaluate
   */
  calculateSum(func) {
    const cellData = this.props.data.data;

    const sum = eval('(' + func + ')');

    this.state.sum.push({
      value: sum
    });

    return sum;
  }

  render() {
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

    if (!this.props.data) {
      return <h1>Something went wrong</h1>;
    }

    const tableData = this.props.data.data.map((item, i) => {
      const itemValues = Object.values(item);

      return (
        <div
          className={ 'table-row' }
          key={ i }>
          {
            itemValues.map((cellData, key) => {
/*              return (
                <div className="table-cell" key={ key }>{ cellData }</div>
              );*/
              return (
                <TableCell data={ cellData } key={ key }/>
              );
            })
          }
        </div>
      );
    });

    return (
      <div className="excel">
        <div className="table employees-table">
          { tableData }
        </div>

        <div className="sum-field">String 1 sum:
          <span> { ::this.calculateSum(this.props.data.mathFunctions.string1_sum) }</span>
        </div>

        <div className="sum-field">String 2 sum:
          <span> { ::this.calculateSum(this.props.data.mathFunctions.string2_sum) }</span>
        </div>

        <div className="sum-field">String 3 sum:
          <span> { ::this.calculateSum(this.props.data.mathFunctions.string3_sum) }</span>
        </div>

        <Diagram data={ this.state.sum }/>

      </div>
    );
  }
}
