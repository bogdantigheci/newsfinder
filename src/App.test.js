import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe('App component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });
  it('should render the component', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('renders', () => {
    expect(wrapper.exists('.container')).toBe(true);
    expect(wrapper.find('.bg-teal.p-2.rounded').exists()).toBe(true);
    expect(wrapper.find('.list-reset.leading-normal').exists()).toBe(true);
    expect(wrapper.find('.container').children().length).toBe(3);
    expect(wrapper.find('.bg-green .rounded m-1 p-2').children().length).toBe(
      0
    );
  });
  it('contains elements', () => {
    expect(
      wrapper.contains(
        <h1 className="text-grey-darkest font-bold text-center mb-2">
          Latest News
        </h1>
      )
    ).toBe(true);
  });
});
