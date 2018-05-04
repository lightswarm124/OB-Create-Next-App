import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import LogoImg from './assets/logo.png';
import MenuImg from './assets/ic_menu_black_24px.svg';
import NumberFormat from 'react-number-format';
import './styles/header.scss';

export default class Header extends Component {

  constructor() {
    super();
    this.state = { menuExpanded: false };
  }

  gotoPath(path, e) {
    e.preventDefault();
    this.setState({ menuExpanded: false });
    browserHistory.push(path);
  }

  toggleMenu() {
    this.setState({ menuExpanded: !this.state.menuExpanded });
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
            GitHub Repositories
          </a>
          <a className="header__nav__item" href="" onClick={(e) => this.gotoPath('/myrepositories', e)}>
            My Repositories
          </a>
          <a className="header__nav__item" href="" onClick={(e) => this.gotoPath('/account', e)}>
            <div className="header__nav__badge">
              <NumberFormat value={this.props.account.ownerTokenBalance} displayType={'text'} thousandSeparator /> Tokens
            </div>
          </a>
        </div>
        <div className="dropdown-item">
          <button className="dropdown-item__pic" onClick={() => this.toggleMenu()}>
            <img src={MenuImg} alt="Menu" />
          </button>
          { this.state.menuExpanded &&
            <div className="dropdown-item__dropdown">
              <a href="" onClick={(e) => this.gotoPath('/repositories', e)}>Repositories</a>
              <a href="" onClick={(e) => this.gotoPath('/myrepositories', e)}>My Repositories</a>
              <a href="" onClick={(e) => this.gotoPath('/account', e)}>Account</a>
            </div>
          }
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  account: PropTypes.object
};
