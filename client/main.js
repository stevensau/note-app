import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';

import {routes, onAuthChange } from '../imports/router/routs';
import { browserHistory } from 'react-router';
import '../imports/startup/simple-schema-config';


Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');
  onAuthChange(isAuthenticated, currentPagePrivacy);

});

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectNodeId');
  if (selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`)
  }

});


Meteor.startup (() => {
  Session.set('selectNodeId', undefined);
  ReactDOM.render(routes, document.getElementById('app'));
})
