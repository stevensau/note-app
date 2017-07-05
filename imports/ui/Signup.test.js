import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import {Signup} from './Signup'


if (Meteor.isClient) {
  describe('Signup', function () {

    it('should show error messages', function () {
      const error = 'test error';

      const wrapper = mount(<Signup createUser={() => {}}/>)

      wrapper.setState({error});

      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({error: ''})
      expect(wrapper.find('p').length).toBe(0);

    });
    it ('should call creatUser with form data', function () {
      const email = 'test@test.com'
      const password = 'password1234'
      const spy = expect.createSpy();

      const wrapper = mount(<Signup createUser={spy}/>)

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;

      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({email, password});
    });

    it ('should call set error if short password', function () {
      const email = 'test@test.com'
      const password = '124  '
      const spy = expect.createSpy();

      const wrapper = mount(<Signup createUser={spy}/>)

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;

      wrapper.find('form').simulate('submit');

      expect(wrapper.state('error').length  ).toBeGreaterThan(0);
    });

    it('should ste creatUser callback errors', function () {
      const spy = expect.createSpy();
      const password = '1234password'
      const reason = 'this is a test fail'

      const wrapper = mount(<Signup createUser={spy}/>)
      
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[1]({reason});
      expect(wrapper.state('error')).toBe(reason);
      spy.calls[0].arguments[1]();
      expect(wrapper.state('error')).toBe('');
    });

  });
}
