import { connect } from 'react-redux';
import CoreLayout from './CoreLayout';
import { loadAccounts } from 'reducers/accounts';
import { loadRegisteredRepos } from 'reducers/registeredRepos';

const mapDispatchToProps = {
  loadAccounts,
  loadRegisteredRepos
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
