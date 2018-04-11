import { connect } from 'react-redux';
import Repository from './Repository';
import { registerRepo, unregisterRepo } from 'reducers/registeredRepos';

const mapDispatchToProps = {
  registerRepo,
  unregisterRepo
};

const mapStateToProps = (state) => ({
  registeredRepos: state.registeredRepos
});

export default connect(mapStateToProps, mapDispatchToProps)(Repository);
