import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getMarketBounties } from 'services/openBountyApi';
import LoadingSpinner from 'components/common/LoadingSpinner';
import Bounty from './components/Bounty';
import './styles/home.scss';

export default class Home extends Component {

  constructor() {
    super();
    this.state = { bounties: [], isLoading: false };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    getMarketBounties().then((bounties) => {
      this.setState({ bounties, isLoading: false });
    }).catch((err) => {
      this.setState({ isLoading: false });
      console.log('Error getting market bounties: ' + err);
    });
  }

  render () {
    return (
      <div className="container">
        { this.state.isLoading
          ? <LoadingSpinner />
          : <div className="home">
            { this.state.bounties.map((bounty, i) => {
              return (
                <Bounty key={'marketBounty' + i} bounty={bounty} />
              );
            })}
            <div className="home__filler" />
            <div className="home__filler" />
            <div className="home__filler" />
            <div className="home__filler" />
          </div>
        }
      </div>
    );
  }
}

Home.propTypes = {
};
