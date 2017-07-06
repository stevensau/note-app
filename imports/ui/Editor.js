import React from 'react';
import Metoer from 'meteor/meteor';
import { browserHistory } from 'react-router';

import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Notes } from '../api/notes'

export class Editor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      body: ''
    }
  }
  handleBodyChange(e){
    const body = e.target.value;
    this.setState({body});
    this.props.call('notes.update', this.props.note._id,{
      body
    });

  }
  handleTitleChange(e){
    const title = e.target.value;
    this.setState({title});
    this.props.call('notes.update', this.props.note._id,{
      title
    })
  }
  handleRemove(){
    this.props.call('notes.remove',this.props.note._id)
    this.props.browserHistory.push('/dashboard');
  }
  componentDidUpdate(prevProps, prevState){
    currentNoteId = this.props.note ? this.props.note._id : undefined;
    prevNoteId = prevProps.note ? prevProps.note._id : undefined;
    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      });
    }
  }

  render(){
    if (this.props.note) {
      return (
        <div className='editor'>
          <input value={this.state.title} placeholder='Your title Here' onChange={this.handleTitleChange.bind(this)}/>
          <textarea value={this.state.body} placeholder='Your note here' onChange={this.handleBodyChange.bind(this)}></textarea>
          <button onClick={this.handleRemove.bind(this)}>Delte Note</button>
        </div>
      )
    }else {
      return (
        <div className='editor'>
          <p>
            {this.props.selectedNoteId ? 'Note not found' : 'Pick or create a note to get started'}
          </p>
        </div>

      )
    }
  }
}



export default createContainer(() => {
  const selectedNoteId = Session.get('selectNodeId');
  return{
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    browserHistory
  };
}, Editor);


// export default createContainer (() => {
//
//
// }, Editor);
