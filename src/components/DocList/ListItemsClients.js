import React, { Component } from 'react';

// import '../components/Excel/components/style.scss';

export default class ListItemsClients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: null
    }
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
    } = this.props;

    const clientItems = Object.keys(listClient).map((item, i) => {
      return (
        <li
          className={`clients-list__item ${isChecked === item ?
            'is-checked-client' : ''}`}
          key={ i }
          id={item}
          onClick={::this.getclientCurrent}
        >
          { listClient[item] }
        </li>
      );
    });

    return (
      <div className={`clients ${clientShow ? 'show' : ''}`}>
        <label className="clients-search-label">
          Поиск
          <input type="text" className="clients-search" required/>
        </label>
        <ul className="clients-list">
          { clientItems }
        </ul>
        <div className="clients-btn">
          <button
            className="receiveBtn"
            onClick={::this.handleClientChecked}
            disabled={!isChecked}
          > Выбрать
          </button>
          <button onClick={::this.clickHandlerClientRemove}>Очистить</button>
          <button onClick={handlerOnClickHide}>Отмена</button>
        </div>
      </div>
    );
  }
}