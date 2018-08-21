import { connect } from 'react-redux';
import Repository from './Repository';
import { registerRepo, unregisterRepo } from 'reducers/registeredRepos';
import { awardBounty } from 'reducers/account';

const mapDispatchToProps = {
  registerRepo,
  unregisterRepo,
  awardBounty
};

const mapStateToProps = (state) => ({
  registeredRepos: state.registeredRepos,
  account: state.account
});

export default connect(mapStateToProps, mapDispatchToProps)(Repository);
