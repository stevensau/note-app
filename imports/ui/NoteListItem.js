import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session'
import { createContainer } from 'meteor/react-meteor-data'

export const NoteListItem = (props) => {
  console.log('GO X2');
  return (
    <div onClick={()=>{
      props.Session.set('selectNodeId', props.note._id);
    }}>
      <h5>{props.note.title || 'Untitled Note' }</h5>
      <p>{moment(props.note.updatedAt).format('M/DD/YY')}</p>
    </div>
  );
}

NoteListItem.PropTypes = {
  note: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  return{
    Session
  }
}, NoteListItem)
