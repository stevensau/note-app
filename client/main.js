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
  Session.set('isNavOpen', false);
  if (selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`)
  }

});

Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen');
  document.body.classList.toggle('is-nav-open', isNavOpen);
})


Meteor.startup (() => {
  Session.set('selectNodeId', undefined);
  Session.set('isNavOpen', false);
  ReactDOM.render(routes, document.getElementById('app'));
})
