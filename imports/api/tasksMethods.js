import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';
 
Meteor.methods({
  'tasks.insert'(name, description, privateTask) {
    check(name, String);
    check(description, String);
    check(privateTask, Boolean);

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
      name,
      description,
      privateTask,
      history: []
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

  'tasks.update'(taskId, name, description, status) {
    check(taskId, String);
    check(name, String);
    check(description, String);
    check(status, Number);

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
        status
      },
      $push: {
        history: {
          name: task.name,
          description: task.description,
          modifiedIn: new Date(),
          status: task.status
        },
      },
    });
  },
  'tasks.updateStatus'(taskId, status) {
    check(taskId, String);
    check(status, Number);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.update(taskId, {
      $set: {
        status
      },
      $push: {
        history: {
          name: task.name,
          description: task.description,
          modifiedIn: new Date(),
          status: task.status
        },
      },
    });
  },
});
