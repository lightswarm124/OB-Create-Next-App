import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import './styles/coreLayout.scss';

export default class CoreLayout extends Component {

  render () {
    return (
      <div className="core-container">
        <Header />
        <div className="core-container__body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

CoreLayout.propTypes = {
  children: PropTypes.element
};
