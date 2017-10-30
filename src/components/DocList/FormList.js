import React, { Component } from 'react';

import { AllPeriods } from './TableHeader';

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

  return formsArray;
}


function renderFormList(data, docList_v2) {
  function docRender(key, isExist, docList_v2) {
    if (docList_v2.hasOwnProperty(key)) {
      isExist = true;
      const doc = docList_v2[key];
      return (
        <div
          className="doc"
          data-key={key}
        >
          <div className={`doc-status ${doc.status === 0 ? 'red-status' : 'green-status'}`}></div>
          <div className="doc-date">{doc.modify_date}</div>
          <div className="doc-version">вер.:{doc.version}</div>
        </div>
      );
    }
  }


  function setDocFromList(period, formId) {
    const arr = [];

    for (let i = 0; i < period.length; i++) {
      const key = `${formId}_${period[i].period}_${period[i].year}`;
      const isExist = false;

      arr.push(
        <span
          className="table-header__items table-rows__items"
          key={i}
          data-key={key}
          id={`${formId}_${i}`}
        >{docRender(key, isExist, docList_v2)}
        </span>
      );
    }

    return arr;
  }


  const rowsTemplate = data.map((item, i) => {
    if (item.type !== null && item.type === 'INPUT') {
      return (
        <div id={item.formid} key={i} className="table-rows-item">
          <span
            className="table-header__items  table-header__items-fix"
          >{item.fullName}
          </span>
          {setDocFromList(AllPeriods, item.formid)}
        </div>
      );
    }
  });

  return rowsTemplate;
}

function createDocList(data) {
  const mapOfDocs = {};
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
    mapOfDocs[key] = doclist;
  });

  return mapOfDocs;
}


export default class FormList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curDoc: null,
      curDocObj: null,
      popupIsShow: false
    };

    this.getcurDocData = this.getcurDocData.bind(this);
    this.setLabel = this.setLabel.bind(this);
    this.popupClose = this.popupClose.bind(this);
    this.keyDownClose = this.keyDownClose.bind(this);
  }


  getcurDocData({ target }) {
    const dataKey = target.dataset.key || target.parentNode.dataset.key;

    this.setState({
      curDoc: dataKey,
      curDocObj: this.getCurDoc(dataKey),
      popupIsShow: dataKey && true
    });
  }

  popupClose() {
    this.setState({
      popupIsShow: false
    });
  }

  keyDownClose(e) {
    if (e.keyCode === 27) {
      // this.popupClose();
      console.log(e);
    }
  }

  getCurDoc(id) {
    return this.props.docList[id];
  }

  setLabel(status) {
    switch (status) {
      case 0:
        return 'Документ \'Отчёт о финансовых результатах\' уже существует,  ' +
          'открыть документ на редактирование или открыть документ на просмотр?';

      case 7:
        return 'Документ \'Отчёт о финансовых результатах\' уже существует в статусе утверждён, ' +
          'создать новую версию документа или открыть документ на просмотр?';

      default:
        break;
    }
  }

  // generateTextLabel() {
  //
  // }

  setLabelDefault() {
    return 'Документ \'Отчёт о финансовых результатах\' отсутствует в выбранном периоде, ' +
      'создать новый документ ?';
  }

  getActionCurStatus(curDocObj, curDoc) {
    if (curDocObj.status === 0) {
      return <button onClick={this.EditDocs.bind(this, curDocObj, curDoc)}>Редактировать</button>;
    }
    return <button onClick={this.createDocs.bind(this, curDocObj, curDoc)}>Создать</button>;
  }


  lookDocs(curDocObj, curDoc) {
    console.log(curDocObj);
    console.log(curDoc);
  }

  EditDocs(curDocObj, curDoc) {
    console.log(curDocObj);
    console.log(curDoc);
  }

  createDocs(curDocObj, curDoc) {
    console.log(curDoc);
    console.log(curDocObj && curDocObj);
  }


  render() {
    const {
      curDoc,
      curDocObj,
      popupIsShow
    } = this.state;
    const { formsList, dataPeriodAndYear, docHeadersList } = this.props;
    const forms = generateFormList(formsList);
    const docList_v2 = createDocList(docHeadersList);

    return (
      <div
        onKeyPress={this.keyDownClose}
        className="TBL"
        onClick={this.getcurDocData}>
        {dataPeriodAndYear && renderFormList(forms, docList_v2)}
        <div className={`popup ${popupIsShow ? 'popup-show' : null}`}>
          <p className="popup-text">
            {popupIsShow && curDocObj && this.setLabel(curDocObj.status) || this.setLabelDefault()}
          </p>
          <div className="popup-btn">
            {popupIsShow && curDocObj && this.getActionCurStatus(curDocObj, curDoc)}
            <button
              onClick={this.createDocs.bind(this, curDoc)}
              className={`${popupIsShow && curDocObj && 'none'}`}>Создать
            </button>
            <button
              onClick={this.lookDocs.bind(this, curDocObj, curDoc)}
              className={`${!curDocObj ? 'none' : null}`}
            >Просмотреть
            </button>
            <button onClick={this.popupClose}>Отмена</button>
          </div>
        </div>
      </div>
    );
  }
}