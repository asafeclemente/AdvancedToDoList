import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';
 
Meteor.methods({
  'tasks.insert'(name, description) {
    check(name, String);
    check(description, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const currentUser = Meteor.users.findOne(this.userId);

    TasksCollection.insert({
      createdAt: new Date,
      deleted: 0,
      userId: this.userId,
      username: currentUser.username,
      status: 0,
      history: [{
        name,
        description,
        modifiedIn: new Date,
      }]
    })
  },

  'tasks.remove'(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.remove(taskId);
  },

  'tasks.update'(taskId, name, description) {
    check(taskId, String);
    check(name, String);
    check(description, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.update(taskId, {
      $set: {
        name,
        description,
      },
      $push: {
        history: {
          name: task.name,
          description: task.description,
          modifiedIn: new Date(),
        },
      },
    });
  },
});
