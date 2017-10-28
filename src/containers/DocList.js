import React, { Component } from 'react';
import ListItemsClients from '../components/Excel/components/ListItemsClients';
import ReportPeriod from '../components/Excel/components/ReportPeriod';
// import TableHeader from '../components/Excel/components/TableHeader';
import DocTable from './DocTable';
import './style.css';


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
    period: '2',
    year: '2017',
    client: 'Клиент 1',
    type: 'FORM01',
    creation_date: formatDate,
    modify_date: formatDate
  },
  {
    id: 3,
    status: 0,
    version: '1',
    period: '3',
    year: '2016',
    client: 'Клиент 6',
    type: 'FORM01',
    creation_date: formatDate,
    modify_date: formatDate
  },
  {
    id: 2,
    status: 7,
    version: '1',
    period: '3',
    year: '2017',
    client: 'Клиент 2',
    type: 'FORM02',
    creation_date: formatDate,
    modify_date: formatDate
  },
  {
    id: 6,
    status: 7,
    version: '1',
    period: '3',
    year: '2017',
    client: 'Клиент 2',
    type: 'FORM02',
    creation_date: formatDate,
    modify_date: formatDate
  },
  {
    id: 2,
    status: 7,
    version: '1',
    period: '3',
    year: '2017',
    client: 'Клиент 2',
    type: 'FORM01',
    creation_date: formatDate,
    modify_date: formatDate
  },
  {
    id: 2,
    status: 7,
    version: '1',
    period: '3',
    year: '2017',
    client: 'Клиент 2',
    type: 'FORM02',
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
      maxLastYear: 1996,
      clientShow: false,
      clientIsChecked: null,
      periodIsChecked: null,
      yearIsChecked: null,
      dataPeriodAndYear: null,
      formsList,
      docHeadersList,
      docPeriods: null
    };

    this.handlerOnClickShow = this.handlerOnClickShow.bind(this);
    this.handlerclientIsChecked = this.handlerclientIsChecked.bind(this);
    this.handlerPeriodIsChecked = this.handlerPeriodIsChecked.bind(this);
    this.handlerYearIsChecked = this.handlerYearIsChecked.bind(this);
    this.receiveOnClick = this.receiveOnClick.bind(this);
    this.handlerOnClickHide = this.handlerOnClickHide.bind(this);
    this.handlerclientRemove = this.handlerclientRemove.bind(this);
    this.setPeriods = this.setPeriods.bind(this);
    // this.incPeriod = this.incPeriod.bind(this);
    // this.decPeriod = this.decPeriod.bind(this);
  }

  // incPeriod() {
  //   if (this.state.periodIsChecked === 4) {
  //     return;
  //   }
  //   this.setState({
  //     periodIsChecked: ++this.state.periodIsChecked
  //   });
  // }
  //
  // decPeriod() {
  //   if (this.state.periodIsChecked === 1) {
  //     return;
  //   }
  //   this.setState({
  //     periodIsChecked: --this.state.periodIsChecked
  //   });
  // }

  componentDidMount() {
    this.receiveOnClick();
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

  handlerclientRemove(e) {
    this.setState({
      clientIsChecked: null
    });
  }


  handlerOnClickHide() {
    this.setState({
      clientShow: false
    });
  }

  handlerclientIsChecked(e) {
    this.setState({
      clientIsChecked: e.target.id
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
      formsList
    } = this.state;

    return (
      <div className="">
        <button
          onClick={this.handlerOnClickShow}
          className='clients-items-btn'
        >{!this.state.clientIsChecked ? 'Выберите клиента из справочника' : listClient[clientIsChecked]}
        </button>
        <ReportPeriod
          receiveOnClick={this.receiveOnClick}
          handlerYearIsChecked={this.handlerYearIsChecked}
          handlerPeriodIsChecked={this.handlerPeriodIsChecked}
          isPeriod={isPeriod}
          maxLastYear={maxLastYear}
          curYear={curYear}
          clientIsChecked={clientIsChecked}
          decPeriod={this.decPeriod}
          incPeriod={this.incPeriod}
        />
        <ListItemsClients
          handlerclientRemove={this.handlerclientRemove}
          handlerOnClickHide={this.handlerOnClickHide}
          clientIsChecked={clientIsChecked}
          listClient={listClient}
          clientShow={clientShow}
          handlerclientIsChecked={this.handlerclientIsChecked}
        />
        <DocTable
          setPeriods={this.setPeriods}
          dataPeriodAndYear={dataPeriodAndYear}
          curYear={curYear}
          formsList={formsList}
          docHeadersList={docHeadersList}
        />
      </div>
    );
  }
}
