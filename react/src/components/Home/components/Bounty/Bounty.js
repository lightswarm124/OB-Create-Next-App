import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRepository } from 'services/githubApi';
import './styles/bounty.scss';

export default class Bounty extends Component {

  constructor() {
    super();
    this.state = { repo: {} };
  }

  componentDidMount() {
    getRepository(this.props.bounty.repoId).then((response) => {
      this.setState({ repo: response.data });
    }).catch((err) => {
      console.log('Error getting bounty repository: ' + err);
    });
  }

  render () {
    const bounty = this.props.bounty;

    return (
      <div className="bounty">
        <div className="bounty__header">
          { this.state.repo && this.state.repo.owner &&
            <img className="bounty__header__avatar"
              src={this.state.repo.owner.avatar_url} alt="Bounty Repo Avatar" />
          }
          <div className="bounty__header__details">
            <div className="bounty__header__details__label">Bounty Owner</div>
            <div className="bounty__header__details__value">{ bounty.owner }</div>
            <div className="bounty__header__details__label">Reward</div>
            <div className="bounty__header__details__value">{ bounty.value } Tokens</div>
          </div>
        </div>
        { this.state.repo &&
          <div className="bounty__repo-name">
            <a href={this.state.repo.html_url} target="_blank">{ this.state.repo.full_name}</a>
          </div>
        }
        <div className="bounty__title">
          { bounty.title }
        </div>
        <div className="bounty__description">
          { bounty.description }
        </div>
      </div>
    );
  }
}

Bounty.propTypes = {
  bounty: PropTypes.object
};
