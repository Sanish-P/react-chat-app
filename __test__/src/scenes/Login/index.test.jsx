import React from 'react';
import { shallow } from 'enzyme';
import { Unwrapped as Login } from 'src/scenes/Login'

test('renders correctly', () => {
  const wrapper = shallow(<Login />);
  expect(wrapper).toMatchSnapshot();
})
