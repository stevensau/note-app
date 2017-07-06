import { Meteor } from 'meteor/meteor'
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session'

export const NoteListHeader = (props) => {

  return (
    <div>
      <button onClick={() => {
        props.meteorCall('notes.insert',(err,res) => {
          if (res) {
            props.Session.set('selectNodeId', res);
          }
        });
      }}>New Note</button>
    </div>
  );
};

export default createContainer(() => {
  return {
    meteorCall: Meteor.call,
    Session
  }
}, NoteListHeader)
