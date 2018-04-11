import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getAccounts } from 'services/web3Api';
import './styles/account.scss';

export default class Account extends Component {

  constructor() {
    super();
    this.state = {
      balance: 0,
      ethBalance: 0,
      projectowner: 0,
      ownerTokenBalance:0,
      tokenBalance: 0,
      totalSupply: 0,
      ethaddress: 0x0,
      selectedAccount: 0
    };
  }

  componentDidMount() {
    if (this.props.accounts) {
      this.setState({ selectedAccount: this.props.accounts[0] });
    }
  }

  changeAccount(selectedAccount) {
    this.setState({ selectedAccount });
  }

  renderAccountOptions() {
    return this.props.accounts.map((account) => {
      return (
        <option key={'account' + account} value={account}>
          {account}
        </option>
      );
    });
  }

  render () {
    return (
      <div className="container">
        <div className="account">
          <div className="account__card">
            <div className="account__card__header">
              <div className="account__card__header__title">My Account</div>
              <div className="account__card__header__selector">
                <select className="select"
                  value={this.state.selectedAccount} onChange={(e) => this.changeAccount(e.target.value)}>
                  {this.renderAccountOptions()}
                </select>
              </div>
            </div>
            <div className="account__card__body">
              <div className="account__card__body__group">
                <div className="account__card__body__group__title">Balances</div>
                <div>
                  <div className="account__card__body__group__label">Contract Balance</div>
                  <div className="account__card__body__group__value">{this.state.balance}</div>
                  <div className="account__card__body__group__label">ETH Balance</div>
                  <div className="account__card__body__group__value">{this.state.ethBalance}</div>
                  <div className="account__card__body__group__label">Token Balance</div>
                  <div className="account__card__body__group__value">{this.state.ownerTokenBalance}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Account.propTypes = {
  accounts: PropTypes.array
};
