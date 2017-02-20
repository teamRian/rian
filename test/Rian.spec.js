import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import Rian from '../src/containers/Rian';

describe('<Rian/>', function () {
  before('Start Testing <Rian/>', function(){
  	const wrapper = shallow(<Rian/>);
  })
  it('should have an image to display the gravatar', function () {
    expect(wrapper.find('img')).to.have.length(1);
  });

  // it('should have props for email and src', function () {
  //   expect(wrapper.props().email).to.be.defined;
  //   expect(wrapper.props().src).to.be.defined;
  // });
});