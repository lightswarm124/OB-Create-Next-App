import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from 'components/common/LoadingSpinner';
import Repository from 'components/common/Repository';
import './styles/repositories.scss';
import { searchRepositories } from 'services/githubApi';

export default class Repositories extends Component {

  constructor() {
    super();
    this.state = { searchTerm: '', repositories: [], isLoading: false };
  }

  searchRepositories(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    searchRepositories(this.state.searchTerm).then((response) => {
      this.setState({ repositories: response.data.items, isLoading: false });
    }).catch((error) => {
      this.setState({ isLoading: false });
      console.log('Error searching for repositories: ' + error);
    });
  }

  renderRepositories() {
    return this.state.repositories.map((repo) => {
      return (
        <Repository key={repo.id} repo={repo} />
      );
    });
  }

  render () {
    return (
      <div className="repositories">
        <div className="container">
          <form className="repositories__search" onSubmit={(e) => this.searchRepositories(e)}>
            <input className="repositories__search__input input" placeholder="Search GitHub Repositories"
              value={this.state.searchTerm} onChange={(e) => this.setState({ searchTerm: e.target.value })} />
            <div className="repositories__search__button">
              <input type="submit" className="button" value="Search" />
            </div>
          </form>
        </div>
        <div className="repositories__results">
          <div className="container">
            { this.state.isLoading ? <LoadingSpinner /> : this.renderRepositories() }
          </div>
        </div>
      </div>
    );
  }
}

Repositories.propTypes = {
};
