/**
 * @format
 */

import 'react-native';
import React from 'react';
import Lecture from "../src/component/lecture/lecture"

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<Lecture/>).toJSON;
  expect(tree).toMatchSnapshot();
});
