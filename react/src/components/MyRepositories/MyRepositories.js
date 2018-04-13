import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Repository from 'components/common/Repository';
import { getRepository } from 'services/githubApi';
import './styles/myRepositories.scss';

export default class MyRepositories extends Component {

  constructor() {
    super();
    this.state = { repositories: [] };
  }

  componentDidMount() {
    this.props.registeredRepos.forEach((registeredRepo) => {
      getRepository(registeredRepo).then((response) => {
        this.setState({ repositories: [...this.state.repositories, response.data] });
      }).catch((err) => {
        console.log('Error loading registered repository: ' + err);
      });
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
      <div className="container">
        <div className="my-repositories">
          { this.props.registeredRepos.length > 0 ? this.renderRepositories()
          : <div className="my-repositories__empty">
            <div>You have no repositories registered with OpenBounty</div>
            <div><Link to="/repositories">find your GitHub repositories</Link> and register them</div>
          </div>
          }
        </div>
      </div>
    );
  }
}

MyRepositories.propTypes = {
  registeredRepos: PropTypes.array
};
