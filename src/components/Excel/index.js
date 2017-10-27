import React, { Component } from 'react';

import TableHeaders from './components/TableHeaders';
import TableRows from './components/TableRows';

import './style.scss';

export default class Excel extends Component {
  render() {

    console.log('test');
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
    if (this.props.data === undefined) {
      return <h1>Something went wrong</h1>;
    }

    const data = this.props.data;
    const valuesHash = this.props.valuesHash;

    // TODO: remove this code to reducer
    let periodType;

    switch (data.periodType) {
      case 'Q1':
        periodType = 'За 1 квартал (year)';
        break;

      case 'Q2':
        periodType = 'За 1 полугодие (year)';
        break;

      case 'Q3':
        periodType = 'За 9 месяцев (year)';
        break;

      case 'Q4':
        periodType = 'За год (year)';
        break;

      default:
        break;
    }

    console.log(this.props);

    return (
      <div className="excel">
        <h1>{ data.name }</h1>

        <p>Документ заполняется в тысячах рублей</p>

        <div className="excel-table">
          <TableHeaders data={ ['', '', periodType] }/>
          {
            data.attributes.map((item) => {
              return (
                <TableRows data={ item } value={ valuesHash[item.id].value } key={ item.id }
                           onCellChange={ this.props.onCellChange}/>
              );
            })
          }
        </div>
      </div>
    );
/*
    return (
      <div className="excel">
        <h1>{ data.title }</h1>

        <p>{ data.description }</p>

        <div className="excel-table">
          <TableHeaders data={ data.tableHeaders }/>
          {
            data.attributes.map((item) => {
              return (
                <TableRows data={ item } value={ valuesHash[`id${item.id}`].value } key={ item.id }
                           onCellChange={ this.props.onCellChange } />
              );
            })
          }
        </div>
      </div>
    );*/
  }
}
