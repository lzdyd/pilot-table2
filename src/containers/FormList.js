import React, { Component } from 'react';

import { AllPeriods } from '../components/Excel/components/TableHeader';
//
// let forms;
// let periodsList;

function generateFormList(data) {
  const formsArray = [];

  data.forEach((item) => {
    const type = item.formType;

    if (type !== null && type === 'INPUT') {
      const formObject = {
        formid: item.formid,
        fullName: item.fullName,
        type: item.formType,
        periv: null
      };

      formsArray.push(formObject);
    }
  });

  // console.log(formsArray);

  return formsArray;
}


function renderFormList(data) {
//   let newData = [];
//   let arrCommon = [];
//
// data.forEach((item1) => {
//   let arr = [];
//   arr.push(item1);
//   newData.push(arr);
// });
//
//
// rows.forEach((item2) => {
//   item2.forEach((innerItems) => {
//     data.push(innerItems);
//   });
// });
//
// arr.push(...innerarr);

  function setspan(period, formId) {
    // console.log(period);
    let lelPeriod = period.length - 1;
    let arr = [];
    for (let i = 0, len = period.length * data.length; i < len; i++) {
      let key = formId + '_' + len[lelPeriod].period + '_' + len[lelPeriod].year;
      arr.push(
        <span
          data-key={key}
          className="table-header__items table-rows__items"
          key={++i}
          id={formId + '_' + lelPeriod}
        >

        </span>
      );
      lelPeriod--;

    }

    return arr;
  }

  // console.log(AllPeriods);

// console.log(data);
  const rowsTemplate = data.map((item, i) => {
    if (item.type !== null && item.type === 'INPUT') {
      return (
        <div id={item.formid} key={i} className="table-rows-item">
          <span className="table-header__items  table-header__items-fix">{item.fullName}</span>
          {setspan(AllPeriods, item.formid)}
        </div>
      );
    }
  });


  // console.log(rows);

  return rowsTemplate;
}


function createMapOfDocs(data) {
  const mapOfDocs = [];
  let doclist;

  data.forEach((item) => {
    doclist = {
      id: item.id,
      status: item.status,
      version: item.version,
      period: item.period,
      year: item.year,
      client: item.client,
      type: item.type,
      creation_date: item.creation_date,
      modify_date: item.modify_date
    };

    const key = `${doclist.type}_${doclist.period}_${doclist.year}`;

    mapOfDocs.push({
      key,
      doc: doclist
    });
  });

  // console.log(mapOfDocs);

  return mapOfDocs;
}


export default class FormList extends Component {
  render() {
    const curPeriod = Math.ceil((new Date().getMonth() + 1) / 3);
    const { formsList, dataPeriodAndYear, docHeadersList, curYear } = this.props;
    const forms = generateFormList(formsList);
    const rows = createMapOfDocs(docHeadersList);


    return (
      <div className="TBL">
        {dataPeriodAndYear && renderFormList(forms)}
      </div>
    );
  }
}
