import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import Calendar from '../src/containers/Calendar/Calendar';

describe('<Rian/>', function () {
  const mockStore = configureMockStore();
  var initialState = {Calendar:{hey:"FOO"}};
  const store = mockStore(initialState);
  const wrapper = shallow(
    <Provider store={store}>
      <Calendar day={initialState}/>
    </Provider>
  );  

  it('IT SHOULD RECEIVE PROPS',()=>{   
   expect(wrapper.props().day).to.be.defined;
  });

  });
