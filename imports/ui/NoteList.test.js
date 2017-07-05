import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';

import { NoteList } from './NoteList';

const notes = [
  {
    _id:"note1",
    title:"note1",
    body:"note1",
    userId:"user1",
    updatedAt:1499263832530
  },{
    _id:"note2",
    title:"note2",
    body:"note2",
    userId:"user1",
    updatedAt:1499263832530
  }
]



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
