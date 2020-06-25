/**
 * @format
 */

import 'react-native';
import React from 'react';
import Enterchat from "../src/component/chat/enterChat"

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<Enterchat/>).toJSON;
  expect(tree).toMatchSnapshot();
});
