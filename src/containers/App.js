import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ExcelActions from '../actions/ExcelActions';

// import Authentication from './Authentication';
import { DocList } from './DocList';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invalid: false
    };
  }

  // onClickHandler() {
  //   this.setState({
  //     invalid: !this.state.invalid
  //   });
  // }

  // {!this.state.invalid ?
  // <Authentication onClick={this.onClickHandler.bind(this)}/> : <DocList /> }


  render() {
    const { getDocList } = this.props.excelActions;

    return (
      <div className="main-app">
        <DocList
          getdocList={getDocList}
          doclist={this.props.doclist}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    doclist: state.doclist.docs
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    excelActions: bindActionCreators(ExcelActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
