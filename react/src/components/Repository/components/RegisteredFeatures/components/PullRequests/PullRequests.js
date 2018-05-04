import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getPullRequestsForRepository } from 'services/githubApi';
import PullRequest from './components/PullRequest';
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

  awardBounty(pr, bounty) {
    // TODO: pr.user.login should be replaced with the pr user's corresponding wallet ID
    this.props.awardBounty(this.props.account, pr.user.login, bounty.value).then(() => {
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
        <PullRequest key={pr.id} pr={pr} bounties={this.props.bounties}
          onAwardBounty={(pr, bounty) => this.awardBounty(pr, bounty)} />
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
  bounties: PropTypes.array,
  account: PropTypes.object,
  awardBounty: PropTypes.func
};
