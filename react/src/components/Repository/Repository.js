import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRepository } from 'services/githubApi';
import Bounties from './components/Bounties';
import PullRequests from './components/PullRequests';
import './styles/repository.scss';

export default class Repository extends Component {

  constructor() {
    super();
    this.state = { repo: {}, selectedTab: 'bounties' };
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

  setTab(e, selectedTab) {
    e.preventDefault();
    this.setState({ selectedTab });
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
              <div className="repository__body__tabs">
                <div className="repository__body__tabs__header">
                  <div className={this.state.selectedTab === 'bounties'
                    ? 'repository__body__tabs__header__tab repository__body__tabs__header__tab--active'
                    : 'repository__body__tabs__header__tab'}>
                    <a href="" onClick={(e) => this.setTab(e, 'bounties')}>Bounties</a>
                  </div>
                  <div className={this.state.selectedTab === 'prs'
                    ? 'repository__body__tabs__header__tab repository__body__tabs__header__tab--active'
                    : 'repository__body__tabs__header__tab'}>
                    <a href="" onClick={(e) => this.setTab(e, 'prs')}>Pull Requests</a>
                  </div>
                </div>
                <div className="repository__body__tabs__body">
                  { this.state.selectedTab === 'bounties' &&
                    <Bounties repo={repo} account={this.props.account} />
                  }
                  { this.state.selectedTab === 'prs' &&
                    <PullRequests repo={repo} account={this.props.account} awardBounty={this.props.awardBounty} />
                  }
                </div>
              </div>
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
