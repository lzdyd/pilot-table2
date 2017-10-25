import React, { Component } from 'react';
import axios from 'axios';
import './style.css';


export default class Authentication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      isRemember: false
    };

    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRememberChange = this.handleRememberChange.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  handleRememberChange() {
    this.setState({ isRemember: !this.state.isRemember });
  }

  handleLoginChange(e) {
    this.setState({ login: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  signIn() {
    const userName = this.state.login;
    const password = this.state.password;

    if (userName === 'admin' && password === 'admin') {
      this.props.onClick();
    } else if (userName === 'jamik' && password === 'jamik') {
      this.props.onClick();
    } else {

    }
  }

  render() {
    return (
      <form className="form-signin">
        <h2 className="form-signin-heading"> Войти в систему </h2>
        <input
          type="text"
          id="inputText"
          className="form-control"
          placeholder="Логин"
          required="true"
          autoFocus="true"
          onChange={this.handleLoginChange}
        />
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Пароль"
          required="true"
          onChange={this.handlePasswordChange}
        />
        <label htmlFor="checkbox-field" className="checkbox">
          <input
            type="checkbox"
            id="checkbox-field"
            onChange={this.handleRememberChange}
          />
          Запомнить
        </label>
        <button
          className="btn btn-lg btn-primary btn-block"
          type="button"
          onClick={this.signIn}
        > Войти
        </button>
      </form>
    );
  }
}
