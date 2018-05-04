import { connect } from 'react-redux';
import CoreLayout from './CoreLayout';
import { loadAccounts } from 'reducers/accounts';
import { loadAccount } from 'reducers/account';
import { loadRegisteredRepos } from 'reducers/registeredRepos';

const mapDispatchToProps = {
  loadAccounts,
  loadAccount,
  loadRegisteredRepos
};

const mapStateToProps = (state) => ({
  account: state.account
});

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
