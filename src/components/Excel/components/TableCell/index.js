import React, { Component } from 'react';

import './style.scss';

export default class TableCell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      editing: false
    };
  }

  /**
    Checks if cell is editable
   */
  componentDidMount() {
    if (this.props.data.state === 'input-field') {
      this.setState({
        editable: true
      })
    }
  }

  onFocus() {
    this.setState({ editing: true }, () => {
      this.refs.input.focus();
    });
  }

  onKeyDownHandler(e) {
      if (e.key === 'Enter') {
        this.onBlur();
      }
  }

  onBlur() {
    this.setState({
        editing: false
    });

    if (this.refs.input.value !== this.props.data.value) {
        const id = this.props.data.id;
        this.props.updateStoreData(id, this.refs.input.value)
    }
  }


  // evaluateJS(func) {
  //   //console.log(func);
  //   return 123;
  // }

     formatStr(str) {
        str = str.replace(/(\.(.*))/g, '');
        var arr = str.split('');
        var str_temp = '';
        if (str.length > 3) {
            for (var i = arr.length - 1, j = 1; i >= 0; i--, j++) {
                str_temp = arr[i] + str_temp;
                if (j % 3 == 0) {
                    str_temp = ' ' + str_temp;
                }
            }
            return str_temp;
        } else {
            return str;
        }
    }


  render() {
    if (this.state.editable) {
      return (
        <div className={ `table-cell table-cell-data table-cell-${this.props.data.state}` } onClick={ ::this.onFocus }>
          {
            this.state.editing ?
              <input
                  className="table-cell__input"
                  type="text"
                  ref="input"
                  onBlur={ ::this.onBlur }
                  onKeyDown={::this.onKeyDownHandler}
                  defaultValue={ this.props.data.value }
              /> :
              <span>{ ::this.formatStr(this.props.data.value)}</span>
          }
        </div>
      );
    }

    const jsFunc = this.props.data.formula;
    // console.log(new Function this.props.data.formula);
    return (
      <div className={ `table-cell table-cell-data table-cell-${this.props.data.state}` }>
        {/*<span>{ this.evaluateJS(jsFunc) }</span>*/}
        <span>{ this.formatStr(this.props.data.value + "") }</span>
      </div>
    )
  }
}
