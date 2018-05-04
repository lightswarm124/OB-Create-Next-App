import React from 'react';
import App from 'components/App';
import { shallow } from 'enzyme';

describe('(Component) App', () => {
  let _wrapper;

  beforeEach(() => {
    _wrapper = shallow(<App />);
  });

  it('Renders Pokedex title', () => {
    const title = _wrapper.find('h1');
    expect(title).to.exist;
    expect(title.text()).to.match(/Pokedex/);
  });
});
