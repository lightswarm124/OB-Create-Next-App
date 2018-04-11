import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRepository, getPullRequestsForRepository } from 'services/githubApi';
import './styles/repository.scss';

export default class Repository extends Component {

  constructor() {
    super();
    this.state = { repo: {}, prs: [] };
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

      if (this.isRepoRegistered(repoId)) {
        getPullRequestsForRepository(repoId, 'open').then((response) => {
          this.setState({ prs: response.data });
        });
      }
    }
  }

  registerRepo() {
    this.props.registerRepo(this.state.repo, this.props.account.accountId).then((response) => {
      return getPullRequestsForRepository(this.state.repo.id, 'open');
    }).then((response) => {
      this.setState({ prs: response.data });
    }).catch((error) => {
      console.log('Error registering repository: ' + error);
    });
  }

  unregisterRepo() {
    this.props.unregisterRepo(this.state.repo, this.props.account.accountId).then(() => {
      this.setState({ prs: [] });
    }).catch((err) => {
      console.log('Error unregistering repository: ' + error);
    });
  }

  awardBounty(pr, tokenAmount) {
    // TODO: pr.user.login should be replaced with the pr user's corresponding wallet ID
    this.props.awardBounty(this.props.account, pr.user.login, tokenAmount).then(() => {
      const prs = this.state.prs;
      const i = prs.indexOf(pr);
      this.setState({ prs: [...prs.slice(0, i), {...pr, bountyAwarded: true}, ...prs.slice(i+1, pr.length)] });
    }).catch((error) => {
      console.log('Error awarding bounty: ' + error);
    });
  }

  renderPrs() {
    return this.state.prs.map((pr) => {
      return (
        <div key={pr.id} className="repository__body__prs__pr">
          <div className="repository__body__prs__pr__user">
            <img className="repository__body__prs__pr__user__avatar"
              src={pr.user.avatar_url} alt="User avatar" />
          </div>
          <div className="repository__body__prs__pr__body">
            <div className="repository__body__prs__pr__body__text">
              <div>{ pr.user.login }</div>
              <div>{ pr.title }</div>
            </div>
            <div className="repository__body__prs__pr__body__award">
              { pr.bountyAwarded ?
                <div className="repository__body__prs__pr__body__award__awarded">
                  Bounty Awarded
                </div>:
                <button className="button" onClick={() => this.awardBounty(pr, 500)}>
                  Award Bounty: 500 tokens
                </button>
              }
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    const repo = this.state.repo;

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
              { this.isRepoRegistered(repo.id)
                ? <button className="button-danger" onClick={() => this.unregisterRepo()}>
                  Unregister Repository
                </button>
                : <button className="button" onClick={() => this.registerRepo()}>
                  Register Repository with OpenBounty
                </button>
              }
            </div>
            { this.state.prs && this.state.prs.length > 0 &&
              <div className="repository__body__prs">
                { this.renderPrs() }
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
