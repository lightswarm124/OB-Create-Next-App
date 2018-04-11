import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import LoadingSpinner from 'components/common/LoadingSpinner';
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
          { repo.owner &&
            <div className="repositories__results__repo__owner">
              <img className="repositories__results__repo__owner__avatar" src={repo.owner.avatar_url} alt="Avatar" />
            </div>
          }
          <div className="repositories__results__repo__body">
            <div className="repositories__results__repo__body__label">
              <a href="" onClick={(e) => this.gotoPath('/repository/' + repo.id, e)}>
                {repo.full_name}
              </a>
            </div>
            <div className="repositories__results__repo__body__label">
              Watchers: { repo.watchers_count }
            </div>
            <div className="repositories__results__repo__body__label">
              Forks: { repo.forks_count }
            </div>
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
            <input className="repositories__search__input input" placeholder="Search Repositories"
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
