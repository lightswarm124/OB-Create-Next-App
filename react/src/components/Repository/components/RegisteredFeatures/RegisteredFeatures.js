import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bounties from './components/Bounties';
import PullRequests from './components/PullRequests';
import { getBounties, addBounty, removeBounty } from 'services/openBountyApi.js';

export default class RegisteredFeatures extends Component {

  constructor() {
    super();
    this.state = { bounties: [], selectedTab: 'bounties', isLoading: false };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    getBounties(this.props.repo, 'Open').then((bounties) => {
      this.setState({ bounties, isLoading: false });
    }).catch((err) => {
      this.setState({ isLoading: false });
      console.log('Error getting bounties: ' + err);
    });
  }

  setTab(e, selectedTab) {
    e.preventDefault();
    this.setState({ selectedTab });
  }

  addBounty(newBounty) {
    this.setState({ isLoading: true });
    addBounty(this.props.repo, newBounty).then((bounty) => {
      this.setState({
        bounties: [...this.state.bounties, { ...bounty }]
      });
    }).catch((err) => {
      this.setState({ isLoading: false });
      console.log('Error adding bounty: ' + err);
    });
  }

  removeBounty(bounty) {
    const bounties = this.state.bounties;
    const i = bounties.indexOf(bounty);
    this.setState({ bounties: [...bounties.slice(0, i), ...bounties.slice(i + 1, bounties.length)] });
  }

  render() {
    return (
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
            <Bounties bounties={this.state.bounties} onAddBounty={(newBounty) => this.addBounty(newBounty)}
              onRemoveBounty={(bounty) => this.removeBounty(bounty)} />
          }
          { this.state.selectedTab === 'prs' &&
            <PullRequests repo={this.props.repo} account={this.props.account}
              bounties={this.state.bounties} awardBounty={this.props.awardBounty} />
          }
        </div>
      </div>
    );
  }
}

RegisteredFeatures.propTypes = {
  repo: PropTypes.object,
  account: PropTypes.object,
  awardBounty: PropTypes.func
};
