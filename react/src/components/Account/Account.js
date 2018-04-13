import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { getAccounts } from 'services/web3Api';
import './styles/account.scss';

export default class Account extends Component {

  constructor() {
    super();
    this.state = {
      selectedAccount: 0,
      ethWithdrawalAmount: 0,
      tokenWithdrawalAmount: 0
    };
  }

  loadAccount(selectedAccount) {
    // retreive details of the selected account
    this.setState({ selectedAccount });
    this.props.loadAccount(selectedAccount).catch((err) => {
      console.log('Error loading account: ' + err);
    });
  }

  changeAccount(selectedAccount) {
    this.loadAccount(selectedAccount);
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

  ethToToken(e) {
    e.preventDefault();
    this.props.ethToken(this.props.account, this.state.ethWithdrawalAmount).then(() => {
      this.setState({ ethWithdrawalAmount: 0 });
    }).catch((err) => {
      console.log('Error transferring ether to token: ' + err);
    });
  }

  tokenToEth(e) {
    e.preventDefault();
    this.props.tokenEth(this.props.account, this.state.tokenWithdrawalAmount).then(() => {
      this.setState({ tokenWithdrawalAmount: 0 });
    }).catch((err) => {
      console.log('Error transferring token to ether: ' + err);
    });
  }

  render () {
    return (
      <div className="container">
        <div className="account">
          <div className="account__header">
            <div className="account__header__title">My Account</div>
            <div className="account__header__selector">
              <select className="select"
                value={this.state.selectedAccount} onChange={(e) => this.changeAccount(e.target.value)}>
                {this.renderAccountOptions()}
              </select>
            </div>
          </div>
          <div className="account__body">
            <div className="account__body__sidebar">
              <div className="account__body__sidebar__title">Balances</div>
              <div>
                <div className="account__body__sidebar__label">ETH Balance</div>
                <div className="account__body__sidebar__value">
                  <NumberFormat value={this.props.account.ethBalance} displayType={'text'} thousandSeparator />
                </div>
                <div className="account__body__sidebar__label">OpenBounty Token Balance</div>
                <div className="account__body__sidebar__value">
                  <NumberFormat value={this.props.account.ownerTokenBalance} displayType={'text'} thousandSeparator />
                </div>
              </div>
            </div>
            <div className="account__body__content">
              <form onSubmit={(e) => this.ethToToken(e)}>
                <div className="account__body__content__form">
                  <label>Exchange Ether for OpenBounty Tokens</label>
                  <div className="account__body__content__form__input-group">
                    <input className="input" type="number"
                      value={this.state.ethWithdrawalAmount} onChange={(e) => this.setState({ ethWithdrawalAmount: e.target.value })} />
                    <input type="submit" className="button account__body__content__form__input-group__button"
                      value="Withdraw Ether" />
                  </div>
                </div>
              </form>
              <form onSubmit={(e) => this.tokenToEth(e)}>
                <div className="account__body__content__form">
                  <label>Exchange OpenBounty Tokens for Ether</label>
                  <div className="account__body__content__form__input-group">
                    <input className="input" type="number"
                      value={this.state.tokenWithdrawalAmount} onChange={(e) => this.setState({ tokenWithdrawalAmount: e.target.value })} />
                    <input type="submit" className="button account__body__content__form__input-group__button"
                      value="Withdraw Token" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Account.propTypes = {
  accounts: PropTypes.array,
  account: PropTypes.object,
  loadAccount: PropTypes.func,
  ethToken: PropTypes.func,
  tokenEth: PropTypes.func
};
