import React from 'react';
import { NavLink } from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Nav from './Nav';

configure({adapter: new Adapter()});

describe('<Nav />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Nav />)
  })

  it('Deberia renderizar Tres <NavLink />', () => {
    expect(wrapper.find(NavLink)).toHaveLength(3);
  });
  it('El primer NavLink debe tener el texto "TODOS" y cambiar la ruta hacia "/dogs".', () => {
    //el orden donde declaran los Links es importante
    expect(wrapper.find(NavLink).at(0).prop('to')).toEqual('/dogs');
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(NavLink).at(0).text()).toEqual('Home');
  });
  it('El segundo NavLink debe tener el texto "Favoritos" y cambiar la ruta hacia "/favorites"', () => {
    expect(wrapper.find(NavLink).at(1).prop('to')).toEqual('/favorites');
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(NavLink).at(1).text()).toEqual('Favoritos');
  });
  it('El tercer NavLink debe tener el texto "Agregar una Raza " y cambiar la ruta hacia "/create_dog"', () => {
    expect(wrapper.find(NavLink).at(2).prop('to')).toEqual('/create_dog');
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(NavLink).at(2).text()).toEqual('Agregar Una Raza ');
  });
})