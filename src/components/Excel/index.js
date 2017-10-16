import React, { Component } from 'react';

import TableHeaders from './components/TableHeaders/index';
import TableRows from './components/TableRows/index';
// import Diagram from './components/Diagram/index';

import './style.scss';

export default class Excel extends Component {
  /**
   *@description State for Recharts
   * @property { Array } sum - Data for creating column diagram
   */
  constructor(props) {
    super(props);

    this.state = {
      sum: []
    };

    this.evalJSON = this.evalJSON.bind(this);
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

  evalJSON(func) {
    if (func) {
      const idHash = {};
      const requiredIdSet = func.match(/\d+/g);

      // TODO: rewrite it using normal algorithm (current - O(n^2))
      console.log(this.props.data.attributes);
      this.props.data.attributes.filter((item) => {
        for (let i = 0; i < requiredIdSet.length; i++) {
          if (item.id === requiredIdSet[i]) idHash[requiredIdSet[i]] = +item.value;
        }
      });

      let restructuredFunc = func.replace(/id\d+/g, (str) => {
        return `idHash[${str.match(/\d+/)}]`;
      });

      return eval('(' + restructuredFunc + ')');
    }
  }

  render() {
    /**
     * If data is being fetched, render "loading spinner"
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

        <div className="table employees-table">
          <TableHeaders data={ data.tableHeaders }/>
          {
            data.attributes.map((item) => {
              return (
                <TableRows data={ item } key={ item.id } updateStoreData={ updateStoreData }
                           evalJSON={ this.evalJSON }/>
              )
            })
          }
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

        {/*<Diagram data={ this.state.sum }/>*/}

      </div>
    );
  }
}
