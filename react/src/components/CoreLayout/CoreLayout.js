import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import './styles/coreLayout.scss';

export default class CoreLayout extends Component {

  componentDidMount() {
    this.props.loadAccounts().then((accounts) => {
      return this.props.loadAccount(accounts[0]);
    }).catch((error) => {
      console.log('Error loading accounts - is your web3 provider running?: ' + error);
    });
    this.props.loadRegisteredRepos().catch((error) => {
      console.log('Error loading registered repositories: ' + error);
    });
  }

  render () {
    return (
      <div className="core-container">
        <Header account={this.props.account} />
        <div className="core-container__body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

CoreLayout.propTypes = {
  children: PropTypes.element,
  account: PropTypes.object,
  loadAccounts: PropTypes.func,
  loadAccount: PropTypes.func,
  loadRegisteredRepos: PropTypes.func
};
