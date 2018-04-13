import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { browserHistory } from 'react-router';
import './styles/repository.scss';

export default class Repository extends PureComponent {

  gotoPath(path, e) {
    if (e) {
      e.preventDefault();
    }
    browserHistory.push(path);
  }

  render () {
    const repo = this.props.repo;

    return (
      <div className="repo" onClick={() => this.gotoPath('/repository/' + repo.id)}>
        { repo.owner &&
          <div className="repo__owner">
            <img className="repo__owner__avatar" src={repo.owner.avatar_url} alt="Avatar" />
          </div>
        }
        <div className="repo__body">
          <div className="repo__body__header">
            <div className="repo__body__header__label">
              <a href="" onClick={(e) => this.gotoPath('/repository/' + repo.id, e)}>
                {repo.full_name}
              </a>
            </div>
            <div className="repo__body__header__label">
              Watchers: <NumberFormat value={repo.watchers_count} displayType={'text'} thousandSeparator />
            </div>
            <div className="repo__body__header__label">
              Forks: <NumberFormat value={repo.forks_count} displayType={'text'} thousandSeparator />
            </div>
          </div>
          <div className="repo__body__description">{repo.description}</div>
        </div>
      </div>
    );
  }
}

Repository.propTypes = {
  repo: PropTypes.object
};
