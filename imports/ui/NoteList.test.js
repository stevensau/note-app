import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';

import { notes } from '../fixtures/fixtures';
import { NoteList } from './NoteList';





if (Meteor.isClient) {
  describe('NoteList', function () {
    it('should render not list item for each note',function (){
      const wrapper = mount(<NoteList notes={notes}/>)

      expect(wrapper.find('NoteListItem').length).toBe(2);
      expect(wrapper.find('NoteListItemEmptyItem').length).toBe(0);

    });
    it('should render not list empty if 0 notes', function() {
      const wrapper = mount(<NoteList notes={[]}/>)

      expect(wrapper.find('NoteListItem').length).toBe(0);
      expect(wrapper.find('NoteListEmpltyItem').length).toBe(1);
    });
  })
}
