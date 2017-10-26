import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><a href="/balance">Бухгалтерский баланс</a></li>
          <li><a href="/opu">Отчет о финансовых результатах</a></li>
        </ul>
      </div>
    );
  }
}
