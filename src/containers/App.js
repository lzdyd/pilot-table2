import React, { Component } from 'react';

// import Authentication from './Authentication';
import { DocList } from '../components/DocList';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invalid: false
    };
  }

  componentWillReceiveProps(nextProps) {
    nextProps.excel.forEach((node) => {
      if (node.state === 'calculated-field') node.value = evaluatesDependence(node);
    });
  }

  onClickHandler() {
    this.setState({
      invalid: !this.state.invalid
    });
  }

  render() {
    return (
      <div className="main-app">
        <DocList />
        <div>
          <ul>
            <li><a href="/balance">Бухгалтерский баланс</a></li>
            <li><a href="/opu">Отчет о финансовых результатах</a></li>
          </ul>
        </div>
      </div>
    );
  }
}
