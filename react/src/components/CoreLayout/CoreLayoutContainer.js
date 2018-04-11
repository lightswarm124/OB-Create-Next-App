import { connect } from 'react-redux';
import CoreLayout from './CoreLayout';
import { loadAccounts } from 'reducers/accounts';

const mapDispatchToProps = {
  loadAccounts
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
