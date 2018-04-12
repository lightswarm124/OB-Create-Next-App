import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/bounties.scss';

export default class Bounties extends Component {

  constructor() {
    super();
    this.state = {
      newBountyTitle: '',
      newBountyValue: 500,
      newBountyDescription: ''
    };
  }

  addBounty(e) {
    e.preventDefault();
    const newBounty = {
      title: this.state.newBountyTitle,
      value: this.state.newBountyValue,
      description: this.state.newBountyDescription
    };
    this.props.onAddBounty(newBounty);
    this.setState({ newBountyTitle: '', newBountyValue: 500, newBountyDescription: '' });
  }

  removeBounty(bounty) {
    this.props.onRemoveBounty(bounty);
  }

  renderBounties() {
    return this.props.bounties.map((bounty, i) => {
      return (
        <div key={'bounty' + i} className="bounties__bounty">
          <div className="bounties__bounty__header">
            <div className="bounties__bounty__header__title">{ bounty.title }</div>
            <div className="bounties__bounty__header__value">Tokens: { bounty.value }</div>
            <div className="bounties__bounty__header__remove">
              <button className="button-danger" onClick={() => this.removeBounty(bounty)}>Remove Bounty</button>
            </div>
          </div>
          <div className="bounties__bounty__body">
            { bounty.description }
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="bounties">
        { this.renderBounties() }
        <div className="bounties__new-bounty">
          <form onSubmit={(e) => this.addBounty(e)} className="bounties__new-bounty__form">
            <div className="bounties__new-bounty__form__header">
              <input className="input bounties__new-bounty__form__header__title"
                type="text" value={this.state.newBountyTitle} placeholder="Bounty Title" required
                onChange={(e) => this.setState({ newBountyTitle: e.target.value })} />
              <label>Tokens:</label>
              <input className="input bounties__new-bounty__form__header__value"
                type="number" value={this.state.newBountyValue} placeholder="Bounty Value" required
                onChange={(e) => this.setState({ newBountyValue: e.target.value })} />
            </div>
            <div className="bounties__new-bounty__form__body">
              <textarea className="input bounties__new-bounty__form__body__description"
                value={this.state.newBountyDescription} placeholder="Bounty Description" rows="5"
                required onChange={(e) => this.setState({ newBountyDescription: e.target.value })} />
            </div>
            <div className="bounties__new-bounty__form__submit">
              <input className="button" type="submit" value="Post Bounty" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Bounties.propTypes = {
  bounties: PropTypes.array,
  onAddBounty: PropTypes.func,
  onRemoveBounty: PropTypes.func
};
