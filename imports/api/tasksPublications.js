import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';

// Meteor.publish('tasks', function publishTasks() {
//   return TasksCollection.find({ userId: this.userId });
// });

Meteor.publish('tasks', function publishTasks() {
    return TasksCollection.find();
  });


Meteor.publish('taskPublication', function () {
  if (!this.userId) {
    return this.ready();
  }

  return TasksCollection.find({ userId: this.userId }, {
    fields: {
      _id: 1,
      createdAt: 1,
      username: 1,
      status: 1,
      'history.name': 1,
      'history.description': 1,
      'history.modifiedIn': 1,
    },
  });
});