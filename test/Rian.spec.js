import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import Rian from '../src/containers/Rian';

describe('<Rian/>', function () {

  const mockStore = configureMockStore();
  var initialState = {};
  const store = mockStore(initialState);
  const wrapper = mount(
    <Provider store={store}>
      <Rian/>
    </Provider>
  );  
  

  it('should have two childs', function () {    // console.log(wrapper.debug());
    expect(wrapper.children()).to.have.length(2);
  });

  it('should have className App', function(){
    expect(wrapper.find('.App')).to.have.length(1);

  })
  // it('should have props for email and src', function () {
  //   expect(wrapper.props().email).to.be.defined;
  //   expect(wrapper.props().src).to.be.defined;
  // });
});