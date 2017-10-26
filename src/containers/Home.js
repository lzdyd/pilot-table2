import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './styles.scss';


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: {
                user1: { password: "user1" },
                user2: { password: "user2" },
                user3: { password: "user3" }
            }
        }
    }

    onClick = (e) => {
        const users = this.state.users;
        const login = this.textInput.value;
        const pass = this.textPassword.value;


        if (!login.length > 0 && !password.length > 0) {
            e.preventDefault();
            console.log('Заполните все поля!');
        }


        if (!users[login]) {
            if (!users[login].password === pass) {
                console.log('Вы не зарегистрированы!');
                e.preventDefault();
            }
        }
    };

    render() {
        return (
            <div className='home-page'>
                <form className="form-signin">
                    <h2 className="form-signin-heading">Войти в систему</h2>
                    <input
                        ref={(input) => { this.textInput = input; }}
                        type="text"
                        className="form-control"
                        name="username"
                        placeholder="Логин"
                        required="true"
                        autoFocus="true"
                    />
                    <input
                        ref={(input) => { this.textPassword = input; }}
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Пароль"
                        required="true"
                    />
                    <div className="btn-input">
                        <label className="checkbox">
                            <input
                                type="checkbox"
                                value="remember-me"
                                id="rememberMe"
                                name="rememberMe"
                            /> Запомнить
                        </label>
                        <Link
                            onClick={this.onClick}
                            className="btn"
                            to="/App"
                            type="submit"
                        > Войти
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}
//
// function mapStateToProps (state)  {
//     return {
//
//     }
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//
//     }
// }

export default connect(
    null,
    null)(Home);