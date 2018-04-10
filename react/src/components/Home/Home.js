import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeroImg from './assets/hero-image.png';
import HeroTextImg from './assets/hero-text.png';
import './styles/home.scss';

export default class Home extends Component {

  render () {
    return (
      <div className="home">
        <div className="home__hero">
          <div className="home__hero__image-container">
            <img src={HeroImg} alt="OpenBounty"/>
            <img src={HeroTextImg} alt="Welcome to OpenBounty"/>
          </div>
          <div className="home__hero__caption">
            A decentralized network that connects people-to-projects and projects-to-people
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
};
