import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';
 
Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const currentUser = Meteor.users.findOne(this.userId);

    TasksCollection.insert({
      text,
      createdAt: new Date,
      userId: this.userId,
      username: currentUser.username
    })
  },
});