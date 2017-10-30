import React, { Component } from 'react';
import ListItemsClients from './ListItemsClients';
import ReportPeriod from './ReportPeriod';
// import TableHeader from '../components/Excel/components/TableHeader';
import DocTable from './DocTable';

import './style.css';

const curPeriod = Math.ceil((new Date().getMonth() + 1) / 3);
export let data;

const clients = {
  '1-10KWGP': 'Эсти',
  '1-1PALWC': 'Весенний холм',
  '1-2DTA97': 'Брокинвестсервис',
  '1-2W1T5D': 'СК Октябрьский'
};

const period = {
  1: '1 квартал',
  2: '2 квартал',
  3: '3 квартал',
  4: '4 квартал'
};

const formsList = [
  {
    formType: 'INPUT',
    formid: 'FORM01',
    fullName: 'Бухгалтерский баланс'
    // perivCode:
  },
  {
    formType: 'INPUT',
    formid: 'FORM02',
    fullName: 'Отчет о финансовых результатах'
    // perivCode:
  }
];

const currentTime = new Date();
const month = currentTime.getMonth();
const day = currentTime.getDay();
const year = currentTime.getFullYear();
const formatDate = `${month}.${day}.${year}`;


const docHeadersList = [
  {
    id: 1,
    status: 0,
    version: '1',
    period: '1',
    year: '2017',
    client: 'Клиент 1',
    type: 'FORM01',
    creation_date: formatDate,
    modify_date: formatDate
  },
  {
    id: 2,
    status: 0,
    version: '1',
    period: '3',
    year: '2017',
    client: 'Клиент 6',
    type: 'FORM01',
    creation_date: formatDate,
    modify_date: formatDate
  },
  {
    id: 2,
    status: 7,
    version: '1',
    period: '2',
    year: '2016',
    client: 'Клиент 2',
    type: 'FORM02',
    creation_date: formatDate,
    modify_date: formatDate
  },
  {
    id: 6,
    status: 7,
    version: '1',
    period: '4',
    year: '2015',
    client: 'Клиент 2',
    type: 'FORM02',
    creation_date: formatDate,
    modify_date: formatDate
  },
  {
    id: 2,
    status: 7,
    version: '1',
    period: '2',
    year: '2017',
    client: 'Клиент 2',
    type: 'FORM01',
    creation_date: formatDate,
    modify_date: formatDate
  }
];


export class DocList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listClient: clients,
      isPeriod: period,
      curYear: currentTime.getFullYear(),
      curPeriod,
      maxLastYear: 1996,
      clientShow: false,
      clientIsChecked: null,
      periodIsChecked: null,
      yearIsChecked: null,
      dataPeriodAndYear: null,
      formsList,
      docHeadersList,
      docPeriods: null,
      docList: null
    };

    this.handlerOnClickShow = this.handlerOnClickShow.bind(this);
    this.handlerclientIsChecked = this.handlerclientIsChecked.bind(this);
    this.handlerPeriodIsChecked = this.handlerPeriodIsChecked.bind(this);
    this.handlerYearIsChecked = this.handlerYearIsChecked.bind(this);
    this.receiveOnClick = this.receiveOnClick.bind(this);
    this.handlerOnClickHide = this.handlerOnClickHide.bind(this);
    this.handlerclientRemove = this.handlerclientRemove.bind(this);
    this.setPeriods = this.setPeriods.bind(this);
  }


  createMapOfDocs_v3(data) {
    const listDocs = {};
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

      listDocs[key] = doclist;
    });

    this.setState({
      docList: listDocs
    });
  }


  componentDidMount() {
    // this.receiveOnClick();
    this.createMapOfDocs_v3(this.state.docHeadersList);
  }

  receiveOnClick() {
    const obj = {
      clients: this.state.clientIsChecked && this.state.clientIsChecked,
      year: this.state.yearIsChecked && this.state.yearIsChecked,
      period: this.state.periodIsChecked && this.state.periodIsChecked
    };

    this.setState({
      dataPeriodAndYear: obj
    });

    return obj;
  }

  setPeriods(period) {
    this.setState({
      docPeriods: period
    });
  }

  handlerOnClickShow() {
    this.setState({
      clientShow: true
    });
  }

  handlerclientRemove() {
    this.setState({
      clientIsChecked: null
    });
  }


  handlerOnClickHide() {
    this.setState({
      clientShow: false
    });
  }

  handlerclientIsChecked(id) {
    this.setState({
      clientIsChecked: id
    });
  }

  handlerPeriodIsChecked(e) {
    this.setState({
      periodIsChecked: e.target.value
    });
  }

  handlerYearIsChecked(e) {
    this.setState({
      yearIsChecked: e.target.value
    });
  }


  render() {
    const {
      listClient,
      clientShow,
      clientIsChecked,
      isPeriod,
      maxLastYear,
      curYear,
      periodIsChecked,
      yearIsChecked,
      dataPeriodAndYear,
      formsList,
      docList,
      curPeriod
    } = this.state;

    return (
      <div className="">
        Клиент:
        <button
          onClick={this.handlerOnClickShow}
          className='clients-items-btn'
        >{!this.state.clientIsChecked ?
          'Выберите клиента из справочника' : listClient[clientIsChecked]}
          ▼
        </button>
        <button disabled={!this.state.clientIsChecked && 'true'}>
          Сформировать аналитический отчет
        </button>
        <ReportPeriod
          receiveOnClick={this.receiveOnClick}
          handlerYearIsChecked={this.handlerYearIsChecked}
          handlerPeriodIsChecked={this.handlerPeriodIsChecked}
          isPeriod={isPeriod}
          maxLastYear={maxLastYear}
          curYear={curYear}
          clientIsChecked={clientIsChecked}
          curPeriod={curPeriod}
        />
        <ListItemsClients
          handlerclientRemove={this.handlerclientRemove}
          handlerOnClickHide={this.handlerOnClickHide}
          handlerclientIsChecked={this.handlerclientIsChecked}
          clientIsChecked={clientIsChecked}
          listClient={listClient}
          clientShow={clientShow}
        />
        <DocTable
          setPeriods={this.setPeriods}
          dataPeriodAndYear={dataPeriodAndYear}
          curYear={curYear}
          formsList={formsList}
          docHeadersList={docHeadersList}
          docList={docList}
          curPeriod={curPeriod}
        />
      </div>
    );
  }
}