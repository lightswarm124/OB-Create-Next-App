import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRepository } from 'services/githubApi';
import RegisteredFeatures from './components/RegisteredFeatures';
import './styles/repository.scss';

export default class Repository extends Component {

  constructor() {
    super();
    this.state = { repo: {} };
  }

  isRepoRegistered(repoId) {
    if (repoId) {
      return this.props.registeredRepos.indexOf(parseInt(repoId)) !== -1;
    }
    return false;
  }

  componentDidMount() {
    const repoId = this.props.params.id;
    if (repoId) {
      getRepository(repoId).then((response) => {
        this.setState({ repo: response.data });
      }).catch((error) => {
        console.log('Error getting repository details: ' + error);
      });
    }
  }

  registerRepo() {
    this.props.registerRepo(this.state.repo, this.props.account.accountId).catch((error) => {
      console.log('Error registering repository: ' + error);
    });
  }

  unregisterRepo() {
    this.props.unregisterRepo(this.state.repo, this.props.account.accountId).then(() => {
      this.setState({ prs: [] });
    }).catch((err) => {
      console.log('Error unregistering repository: ' + err);
    });
  }

  render() {
    const repo = this.state.repo;
    const isRepoRegistered = this.isRepoRegistered(repo.id);

    return (
      <div className="container">
        <div className="repository">
          <div className="repository__sidebar">
            { repo.owner &&
              <div className="repository__sidebar__owner">
                <img className="repository__sidebar__owner__avatar" src={repo.owner.avatar_url} alt="Owner Avatar" />
                <div className="repository__sidebar__owner__name">
                  { repo.owner.login }
                </div>
              </div>
            }
          </div>
          <div className="repository__body">
            <div className="repository__body__header">
              <div className="repository__body__header__title">
                { repo.full_name }
              </div>
              <div className="repository__body__header__stats">
                <div className="repository__body__header__stats__label">
                  Watchers: { repo.watchers_count }
                </div>
                <div className="repository__body__header__stats__label">
                  Subscribers: { repo.subscribers_count }
                </div>
              </div>
            </div>
            <div className="repository__body__description">{ repo.description }</div>
            <div className="repository__body__register">
              { isRepoRegistered
                ? <button className="button-danger" onClick={() => this.unregisterRepo()}>
                  Unregister Repository
                </button>
                : <button className="button" onClick={() => this.registerRepo()}>
                  Register Repository with OpenBounty
                </button>
              }
            </div>
            { isRepoRegistered &&
              <RegisteredFeatures repo={repo} account={this.props.account} awardBounty={this.props.awardBounty} />
            }
          </div>
        </div>
      </div>
    );
  }
}

Repository.propTypes = {
  params: PropTypes.object,
  account: PropTypes.object,
  registerRepo: PropTypes.func,
  unregisterRepo: PropTypes.func,
  awardBounty: PropTypes.func,
  registeredRepos: PropTypes.array
};
