import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/pullRequest.scss';

export default class PullRequest extends Component {

  constructor() {
    super();
    this.state = { selectedBounty: '' };
  }

  changeBounty(i) {
    this.setState({ selectedBounty: this.props.bounties[i] });
  }

  render() {
    const pr = this.props.pr;

    return (
      <div className="pr">
        <div className="pr__user">
          <img className="pr__user__avatar"
            src={pr.user.avatar_url} alt="User avatar" />
        </div>
        <div className="pr__body">
          <div className="pr__body__text">
            <div>{ pr.user.login }</div>
            <div className="pr__body__text__title">{ pr.title }</div>
          </div>
          <div className="pr__body__award">
            { pr.bountyAwarded
              ? <div className="pr__body__award__awarded">
                Bounty Awarded
              </div>
              : <div className="pr__body__award__selection">
                <select className="select"
                  value={this.props.bounties.indexOf(this.state.selectedBounty)} onChange={(e) => this.changeBounty(e.target.value)}>
                  <option value="">Select bounty to award</option>
                  { this.props.bounties.map((bounty, i) => {
                    return (
                      <option key={pr.id + 'bounty' + i} value={i}>{ bounty.title }</option>
                    );
                  })
                  }
                </select>
                { this.state.selectedBounty &&
                  <button className="button-sm pr__body__award__selection__button"
                    onClick={() => this.props.onAwardBounty(pr, this.state.selectedBounty)}>
                    Award Bounty { this.state.selectedBounty.value } Tokens
                  </button>
                }
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

PullRequest.propTypes = {
  pr: PropTypes.object,
  bounties: PropTypes.array,
  onAwardBounty: PropTypes.func
};
