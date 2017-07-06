import { Meteor } from 'meteor/meteor'
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from '../api/notes';
  import { Session } from 'meteor/session';

import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';



export const NoteList = (props) => {


  return(

    <div className='item-list'>
      <NoteListHeader/>

      {props.notes.length === 0 ? <NoteListEmptyItem/> : undefined}

      {props.notes.map((notes) => {
          return <NoteListItem key={notes._id} note={notes}/>
        })
      }

    </div>
  )
}

NoteList.propTypes = {
  notes: React.PropTypes.array.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectNodeId')
  Meteor.subscribe('notes')
  return {
    notes: Notes.find({},{sort:{updatedAt: -1}}).map((notes) => {
      return {
        ...notes,
        selected: notes._id === selectedNoteId
      }
    })
  }
},NoteList)
