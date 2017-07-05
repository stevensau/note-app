import { Meteor } from 'meteor/meteor'
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from '../api/notes';

import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';



export const NoteList = (props) => {


  return(

    <div>
      <NoteListHeader/>

      {props.notes.length === 0 ? <NoteListEmptyItem/> : undefined}

      {props.notes.map((notes) => {
          return <NoteListItem key={notes._id} note={notes}/>
        })
      }
      Note List {props.notes.length}
    </div>
  )
}

NoteList.propTypes = {
  notes: React.PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('notes')
  return {
    notes: Notes.find().fetch()
  }
},NoteList)
