import React from 'react';
import Metoer from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Notes } from '../api/notes'

export class Editor extends React.Component {

  handleBodyChange(e){
    this.props.call('notes.update', this.props.note._id,{
      body: e.target.value
    });

  }
  handleTitleChange(e){
    this.props.call('notes.update', this.props.note._id,{
      title: e.target.value
    })
  }

  render(){
    if (this.props.note) {
      return (
        <div>
          <input value={this.props.note.title} placeholder='Your title Here' onChange={this.handleTitleChange.bind(this)}/>
          <textarea value={this.props.note.body} placeholder='Your note here' onChange={this.handleBodyChange.bind(this)}></textarea>
          <button>Delte Note</button>
        </div>
      )
    }else {
      return (
        <p>
          {this.props.selectedNoteId ? 'Note not found' : 'Pick or create a note to get started'}
        </p>
      )
    }
  }
}



export default createContainer(() => {
  const selectedNoteId = Session.get('selectNodeId');
  return{
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  };
}, Editor);


// export default createContainer (() => {
//
//
// }, Editor);
