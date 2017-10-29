import React from 'react';

import '../style.scss';

export default function ReportPeriod({
  isPeriod,
  maxLastYear,
  curYear,
  handlerPeriodIsChecked,
  handlerYearIsChecked,
  receiveOnClick,
  clientIsChecked,
  incPeriod,
  decPeriod
}) {
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

  function onclickHandlerDec() {
    receiveOnClick();
    decPeriod();
  }

  function onclickHandlerInc() {
    receiveOnClick();
    decPeriod();
  }

  return (
    <div className='report-period'>
      Отчетный период:
      <select onChange={handlerPeriodIsChecked}>
        { perodItemsTemplate }
      </select>
      <select onChange={handlerYearIsChecked}>
        { getYear() }
      </select>
      <button onClick={receiveOnClick}>применить ✔</button>
      <button onClick={onclickHandlerDec}>◄ назад</button>
      <button onClick={onclickHandlerInc}>вперед ►</button>
    </div>
  );
}

