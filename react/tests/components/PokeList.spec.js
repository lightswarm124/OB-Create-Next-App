import React from 'react';
import PokeList from 'components/PokeList/PokeList';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe('(Component) PokeList', () => {
  let _wrapper;
  let username = 'Joe';
  let pokeList = [ { number: 0, name: 'bulbasaur' },
                   { number: 1, name: 'ivysaur' },
                   { number: 2, name: 'venusaur' } ];
  let loadPokemons = sinon.spy();

  beforeEach(() => {
    _wrapper = shallow(<PokeList username={username}
      pokeList={pokeList}
      loadPokemons={loadPokemons} />);
  });

  it('Renders Username', () => {
    let title = _wrapper.find('h3');
    expect(title).to.exist;
    expect(title.text()).to.match(/Joe's Pokemons/);
  });

  it('Renders List of Pokemons', () => {
    let ul = _wrapper.find('ul');
    expect(ul).to.exist;
    let items = ul.find('Link');
    expect(items).to.have.length(3);
  });

  it('Simulates click load more Pokemons', () => {
    _wrapper.find('button').simulate('click');
    expect(loadPokemons).to.have.property('callCount', 1);
  });
});
