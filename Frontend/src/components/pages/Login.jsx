import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

import styles from "../../css/Login.module.css";
import logo from "../../assets/imgs/logo.png";

const baseUrl = 'http://127.0.0.1:8000/api/login';
const cookies = new Cookies();


export default class Login extends Component {
  state = {
    form: {
      email: '',
      password: ''
    }
  }

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }


  signIn = async () => {
    console.log(this.state.form.email);
    await axios.post(baseUrl, { email: this.state.form.email, password: this.state.form.password })
      .then(response => {
        console.log(response.data);
        if (response.data === 'Email inválido' || response.data === 'Contraseña inválida') {
          alert(response.data)
        } else {
          localStorage.setItem('user_id', response.data.user_id);
          localStorage.setItem('full_name', response.data.full_name);
          cookies.set('token', response.data['token'])
          cookies.set('email', response.data['email'])
          window.location.href = './homepage';}
        return response.data;
      })
      .catch(err => {
        console.log(err);
      })
  }

  // componentDidMount() {
  //   if (cookies.get('token')) {
  //     window.location.href = './homepage';
  //   }
  // }

  render() {
    return (
      <div className={styles.container_login}>
        <div className={styles.login_box}>

          <img src={logo} alt="logotype" />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Enter your email address"
            autoComplete="on"
            name="email"
            id="email"
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            name="password"
            onChange={this.handleChange}
          />
          <div className={styles.btn_area}>
            <button className={styles.btn} onClick={() => this.signIn()}>Login</button>
          </div>
          <div className="d-flex justify-content-center links">
            Don't have an account?&nbsp;
            <Link to='/signup' href="#">Register</Link>
          </div>
        </div>
      </div>
    );
  }
}
