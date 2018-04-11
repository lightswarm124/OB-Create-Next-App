import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import LogoImg from './assets/logo.png';
import './styles/header.scss';

export default class Header extends Component {

  gotoPath(path, e) {
    e.preventDefault();
    browserHistory.push(path);
  }

  render () {
    return (
      <div className="header">
        <div className="header__logo">
          <a href="" onClick={(e) => this.gotoPath('/', e)}>
            <img src={LogoImg} alt="logo" />
          </a>
        </div>
        <div className="header__nav">
          <a className="header__nav__item" href="" onClick={(e) => this.gotoPath('/repositories', e)}>
            Repositories
          </a>
          <a className="header__nav__item" href="" onClick={(e) => this.gotoPath('/account', e)}>
            Account
          </a>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
};
