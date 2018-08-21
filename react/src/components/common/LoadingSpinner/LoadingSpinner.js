import React, { PureComponent } from 'react';
import './styles/loadingSpinner.scss';

export default class LoadingSpinner extends PureComponent {

  render () {
    return (
      <div className="spinner">
        <div className="dot1" />
        <div className="dot2" />
      </div>
    );
  }
}
