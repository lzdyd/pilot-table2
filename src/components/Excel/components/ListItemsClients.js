import React from 'react';

import '../style.scss';


export default function ListItemsClients({
  clientIsChecked,
  listClient,
  clientShow,
  handlerclientIsChecked,
  handlerOnClickHide,
  handlerclientRemove
}) {

  function clickHandler() {
    handlerOnClickHide();
  }

  function clickHandlerClientRemove() {
    handlerclientRemove();
    handlerOnClickHide();
  }

  const clientItems = Object.keys(listClient).map((item, i) => {
    return (
      <li
        className={`clients-list__item ${clientIsChecked === item ?
          'is-checked-client' : null}`}
        key={ i }
        id={item}
        onClick={handlerclientIsChecked}
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
          onClick={clickHandler}
          disabled={clientIsChecked ? false : true}
        > Выбрать
        </button>
        <button>Очистить</button>
        <button onClick={clickHandlerClientRemove}>Отмена</button>
      </div>
    </div>
  );
}

