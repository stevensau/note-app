import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {

  describe('NoteListItem', function () {

    it('should render title and time stamp', function () {
      const title = 'my title here';
      const updatedAt = 1499109868944;
      const wrapper = mount(<NoteListItem note={{title, updatedAt}}/>)

      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe('7/03/17');

    });

    it('should set default title if now title is shown', function () {
      const title = '';
      const updatedAt = 1499109868944;
      const wrapper = mount(<NoteListItem note={{title, updatedAt}}/>)

      expect(wrapper.find('h5').text()).toBe('Untitled Note');
    })
  });

}
