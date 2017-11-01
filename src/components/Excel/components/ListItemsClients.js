import React, { Component } from 'react';

import '../style.scss';

export default class ListItemsClients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: null
    };

    this.clickHandlerClientRemove = this.clickHandlerClientRemove.bind(this);
    this.getclientCurrent = this.getclientCurrent.bind(this);
    this.handleClientChecked = this.handleClientChecked.bind(this);
  }

  getclientCurrent({ target }) {
    this.setState({
      isChecked: target.id
    });
  }

  clickHandlerClientRemove() {
    this.props.handlerclientRemove();
    this.props.handlerOnClickHide();
  }

  handleClientChecked() {
    this.props.handlerclientIsChecked(this.state.isChecked);
    this.props.handlerOnClickHide();
  }

  render() {
    const { isChecked } = this.state;
    const {
      listClient,
      clientShow,
      handlerOnClickHide
      // clickHandlerClientRemove,
    } = this.props;

    const clientItems = Object.keys(listClient).map((item, i) => {
      return (
        <li
          className={`clients-list__item ${isChecked === item ?
            'is-checked-client' : ''}`}
          key={ i }
          id={item}
          onClick={this.getclientCurrent}
        >
          { listClient[item] }
        </li>
      );
    });

    return (
      <div className={`clients ${clientShow ? 'show' : ''}`}>
        <ul className="clients-list">
          { clientItems }
        </ul>
        <div className="clients-btn">
          <button
            className="receiveBtn"
            onClick={this.handleClientChecked}
            disabled={!isChecked}
          > Выбрать
          </button>
          <button onClick={this.clickHandlerClientRemove}>Очистить</button>
          <button onClick={handlerOnClickHide}>Отмена</button>
        </div>
      </div>
    );
  }
}
