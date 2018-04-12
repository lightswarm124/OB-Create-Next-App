import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getPullRequestsForRepository } from 'services/githubApi';
import LoadingSpinner from 'components/common/LoadingSpinner';
import './styles/pullRequests.scss';

export default class PullRequests extends Component {

  constructor() {
    super();
    this.state = { prs: [], isLoading: false };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    getPullRequestsForRepository(this.props.repo.id, 'open').then((response) => {
      this.setState({ prs: response.data, isLoading: false });
    }).catch((err) => {
      this.setState({ isLoading: false });
      console.log('Error getting pull requests for repository: ' + err);
    });
  }

  awardBounty(pr, tokenAmount) {
    // TODO: pr.user.login should be replaced with the pr user's corresponding wallet ID
    this.props.awardBounty(this.props.account, pr.user.login, tokenAmount).then(() => {
      const prs = this.state.prs;
      const i = prs.indexOf(pr);
      this.setState({ prs: [...prs.slice(0, i), { ...pr, bountyAwarded: true }, ...prs.slice(i + 1, pr.length)] });
    }).catch((error) => {
      console.log('Error awarding bounty: ' + error);
    });
  }

  renderPrs() {
    return this.state.prs.map((pr) => {
      return (
        <div key={pr.id} className="pull-requests__pr">
          <div className="pull-requests__pr__user">
            <img className="pull-requests__pr__user__avatar"
              src={pr.user.avatar_url} alt="User avatar" />
          </div>
          <div className="pull-requests__pr__body">
            <div className="pull-requests__pr__body__text">
              <div>{ pr.user.login }</div>
              <div className="pull-requests__pr__body__text__title">{ pr.title }</div>
            </div>
            <div className="pull-requests__pr__body__award">
              { pr.bountyAwarded
                ? <div className="pull-requests__pr__body__award__awarded">
                  Bounty Awarded
                </div>
                : <button className="button" onClick={() => this.awardBounty(pr, 500)}>
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
    return (
      <div className="pull-requests">
        { this.state.isLoading ? <LoadingSpinner /> : this.renderPrs() }
      </div>
    );
  }
}

PullRequests.propTypes = {
  repo: PropTypes.object,
  account: PropTypes.object,
  awardBounty: PropTypes.func
};
