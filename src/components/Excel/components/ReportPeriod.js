import React from 'react';

import '../style.scss';
import axios from 'axios';
export default function ReportPeriod({
  isPeriod,
  maxLastYear,
  curYear,
  handlerPeriodIsChecked,
  handlerYearIsChecked,
  receiveOnClick,
  clientIsChecked,
  getdocList,
  createMapOfDocs_v3,
  docHeadersList,
  setDocsList
}) {

  const curPeriod = Math.ceil((new Date().getMonth() + 1) / 3);

  const perodItemsTemplate = Object.keys(isPeriod).map((item, i) => {
    return <option value={item} key={i}>{isPeriod[item]}</option>;
  });

  function getYear() {
    const periods = [];
    for (let i = +curYear; i >= maxLastYear; i--) {
      periods.push(<option value={i} key={i}>{i}</option>);
    }

    return periods;
  }

  function getDocs() {
    // createMapOfDocs_v3(docHeadersList);
    // setDocsList();
    receiveOnClick();
    getdocList();
  }


  return (
    <div className='report-period'>
      Отчетный период:
      <select
        className="select-periods"
        defaultValue={curPeriod}
        onChange={handlerPeriodIsChecked}
      >{ perodItemsTemplate }
      </select>
      <select
        defaultValue={curYear}
        onChange={handlerYearIsChecked}
      >{ getYear() }
      </select>
      <button onClick={getDocs}>применить ✔</button>
      <button>◄ назад</button>
      <button>вперед ►</button>
    </div>
  );
}

