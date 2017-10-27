import React, { Component } from 'react';

import '../style.scss';

export let AllPeriods;

const curPeriod = Math.ceil((new Date().getMonth() + 1) / 3);

export class TableHeader extends Component {
  constructor() {
    super();

    this.generateHeaders = this.generateHeaders.bind(this);
    this.renderHeaders = this.renderHeaders.bind(this);
  }



  generateHeaders() {
    const periods = [];
    let p = +this.props.dataPeriodAndYear.period || curPeriod;
    let y = +this.props.dataPeriodAndYear.year || this.props.curYear;
    for (let i = 0; i < 10; i++) {
      periods.push({
        period: p,
        year: y
      });

      p -= 1;
      if (p === 0) {
        p = 4;
        y -= 1;
      }
    }

    return periods.reverse();
  }


  renderHeaders(data) {
    const templateHeaders = data.map((item, i) => {
      let text = '';
      switch (item.period) {
        case 1:
          text = 'I';
          break;
        case 2:
          text = 'II';
          break;
        case 3:
          text = 'III';
          break;
        case 4:
          text = 'IV';
          break;
      }
      return (
        <span key={i} className="table-header__items">
          {`${text} квартал ${item.year}` }
        </span>
      );
    });

    return templateHeaders;
  }

  render() {
    const { dataPeriodAndYear, curYear, curPeriod } = this.props;
    let Allperiod;

    return (
      <div className='table-header'>
        {dataPeriodAndYear && <span className="table-header__items table-header__items-fix">Документы</span>}
        {dataPeriodAndYear && (Allperiod = AllPeriods = this.generateHeaders()) && this.renderHeaders(Allperiod) }
      </div>
    );
  }
}

