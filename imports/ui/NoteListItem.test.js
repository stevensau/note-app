import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';

import {notes} from '../fixtures/fixtures';
import {NoteListItem} from './NoteListItem';

if (Meteor.isClient) {

  describe('NoteListItem', function () {
    let Session;

    beforeEach(() => {
      Session = {
        set: expect.createSpy()
      };
    });

    it('should render title and time stamp', function () {

      const wrapper = mount(<NoteListItem note={notes[0]} Session={Session}/>)

      expect(wrapper.find('h5').text()).toBe(notes[0].title);
      expect(wrapper.find('p').text()).toBe('7/03/17');

    });

    it('should set default title if now title is shown', function () {
      const title = '';
      const updatedAt = 1499109868944;
      const wrapper = mount(<NoteListItem note={notes[01]} Session={Session}/>)

      expect(wrapper.find('h5').text()).toBe('Untitled Note');
    });

    it('should call set when clicked', function () {
      const wrapper = mount(<NoteListItem note={notes[0]} Session={Session}/>)
      wrapper.find('div').simulate('click');
      expect(Session.set).toHaveBeenCalledWith('selectNodeId', notes[0]._id);
    });
  });

}
