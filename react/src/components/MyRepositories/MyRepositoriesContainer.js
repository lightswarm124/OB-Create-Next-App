import { connect } from 'react-redux';
import MyRepositories from './MyRepositories';

const mapDispatchToProps = {
};

const mapStateToProps = (state) => ({
  registeredRepos: state.registeredRepos
});

export default connect(mapStateToProps, mapDispatchToProps)(MyRepositories);
