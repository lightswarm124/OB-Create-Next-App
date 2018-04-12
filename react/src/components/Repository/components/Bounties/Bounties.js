import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/bounties.scss';

export default class Bounties extends Component {

  constructor() {
    super();
    this.state = { bounties: [], isLoading: false };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        Bounties
      </div>
    );
  }
}

Bounties.propTypes = {
  repo: PropTypes.object,
  account: PropTypes.object
};
