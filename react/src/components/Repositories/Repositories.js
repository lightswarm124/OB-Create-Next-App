import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import './styles/repositories.scss';
import { searchRepositories } from 'services/githubApi';

export default class Repositories extends Component {

  constructor() {
    super();
    this.state = { searchTerm: '', repositories: [] };
  }

  searchRepositories(e) {
    e.preventDefault();
    searchRepositories(this.state.searchTerm).then((response) => {
      console.log(response.data.items);
      this.setState({ repositories: response.data.items });
    }).catch((error) => {
      console.log('Error searching for repositories: ' + error);
    });
  }

  gotoPath(path, e) {
    if (e) {
      e.preventDefault();
    }
    browserHistory.push(path);
  }

  renderRepositories() {
    return this.state.repositories.map((repo) => {
      return (
        <div key={repo.id} className="repositories__results__repo">
          <div className="repositories__results__repo__owner">
            <img className="repositories__results__repo__owner__avatar" src={repo.owner.avatar_url} alt="Avatar" />
          </div>
          <div className="repositories__results__repo__body">
            <a href="" onClick={(e) => this.gotoPath('repository/' + repo.id, e)}>
              {repo.full_name}
            </a>
          </div>
        </div>
      );
    });
  }

  render () {
    return (
      <div className="repositories">
        <div className="container">
          <form className="repositories__search" onSubmit={(e) => this.searchRepositories(e)}>
            <input className="input" placeholder="Search Repositories"
              value={this.state.searchTerm} onChange={(e) => this.setState({ searchTerm: e.target.value })} />
            <div className="repositories__search__button">
              <input type="submit" className="button" value="Search" />
            </div>
          </form>
        </div>
        <div className="repositories__results">
          <div className="container">
            { this.renderRepositories() }
          </div>
        </div>
      </div>
    );
  }
}

Repositories.propTypes = {
};
