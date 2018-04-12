import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getBounties, addBounty, removeBounty } from 'services/openBountyApi.js';
import './styles/bounties.scss';

export default class Bounties extends Component {

  constructor() {
    super();
    this.state = {
      bounties: [],
      newBountyTitle: '',
      newBountyValue: 500,
      newBountyDescription: '',
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    getBounties().then((bounties) => {
      this.setState({ bounties, isLoading: false });
    }).catch((err) => {
      this.setState({ isLoading: false });
      console.log('Error getting bounties: ' + err);
    });
  }

  addBounty(e) {
    e.preventDefault();
    const newBounty = {
      title: this.state.newBountyTitle,
      value: this.state.newBountyValue,
      description: this.state.newBountyDescription
    };
    this.setState({ isLoading: true });
    addBounty(this.props.repo, newBounty).then((bounty) => {
      this.setState({
        bounties: [...this.state.bounties, { ...bounty }],
        newBountyTitle: '',
        newBountyValue: 500,
        newBountyDescription: '',
        isLoading: false
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

  renderBounties() {
    return this.state.bounties.map((bounty, i) => {
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
                value={this.state.newBountyDescription} placeholder="Bounty Description" rows="3"
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
  repo: PropTypes.object
};
