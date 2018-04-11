import { connect } from 'react-redux';
import Account from './Account';

const mapDispatchToProps = {
};

const mapStateToProps = (state) => ({
  accounts: state.accounts
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
