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
  }

  componentDidMount() {
    this.props.getData();
  }

  /**
   * Evaluates JavaScript function received via REST API and saves its result to component's state
   * @param { string } func - JS func to evaluate
   */
  // calculateSum(func) {
  //   const cellData = this.props.data.data;
  //
  //   const sum = eval('(' + func + ')');
  //
  //   this.state.sum.push({
  //     value: sum
  //   });
  //
  //   return sum;
  // }

  render() {

    /**
      If data was not received, inform user about it
    */
    if (!this.props.data) {
      return <h1>Something went wrong</h1>;
    }

    const data = this.props.data;
    const updateStoreData = this.props.updateStoreData;
    const updateEvaluates = this.props.updateEvaluates;


    return (
      <div className="excel">
        {/*<h1>{ data.title }</h1>*/}

        {/*<p>{ data.description }</p>*/}

        <div className="table employees-table">
          {/*<TableHeaders data={ data }/>*/}
          {
            data.map((item, i) => {
                return (
                    <TableRows
                        dataStore={data}
                        data={ item }
                        key={ i }
                        updateStoreData={ updateStoreData }
                    />
                )
            })
          }
        </div>

      </div>
    );
  }
}
