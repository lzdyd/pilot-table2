import React from 'react';

import './style.scss';

export default function({ data }) {
  const tableHeaders = data.map((item, i) => {
    return (
      <div className="table-cell table-cell-headers" key={ i }>
        { item }
      </div>
    );
  });

  return (
    <div className="table-row table-row-headers">
      { tableHeaders }
    </div>
  );
}
