import React, { Component } from 'react';

import { TableHeader } from '../components/Excel/components/TableHeader';
// import { periods } from '../components/Excel/components/TableHeader';
import FormList from './FormList';


export default class DocTable extends Component {
  render() {
    const {
      dataPeriodAndYear,
      curYear,
      formsList,
      // docHeadersList,
      // setPeriods,
      // docList,
      // curPeriod,
      doclist
    } = this.props;

    return (
      <div className="table">
        <TableHeader
          // setPeriods={setPeriods}
          dataPeriodAndYear={dataPeriodAndYear}
          curYear={curYear}
          // curPeriod={curPeriod}
        />
        {
          dataPeriodAndYear &&
            <FormList
              // docList={docList}
              formsList={formsList}
              dataPeriodAndYear={dataPeriodAndYear}
              // docHeadersList={docHeadersList}
              // curYear={curYear}
              doclist={doclist}
            />
        }
      </div>
    );
  }
}
