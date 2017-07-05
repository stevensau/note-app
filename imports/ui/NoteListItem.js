import React from 'react';
import moment from 'moment';

const NoteListItem = (props) => {
  console.log('GO X2');
  return (
    <div>
      <h5>{props.note.title || 'Untitled Note' }</h5>
      <p>{moment(props.note.updatedAt).format('M/DD/YY')}</p>
    </div>
  );
}

NoteListItem.PropTypes = {
  note: React.PropTypes.object.isRequired
};

export default NoteListItem;
