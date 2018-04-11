import { connect } from 'react-redux';
import Account from './Account';
import { loadAccount, ethToken, tokenEth } from 'reducers/account';

const mapDispatchToProps = {
  loadAccount,
  ethToken,
  tokenEth
};

const mapStateToProps = (state) => ({
  accounts: state.accounts,
  account: state.account
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
