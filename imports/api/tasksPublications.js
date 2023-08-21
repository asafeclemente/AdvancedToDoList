import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';

// Meteor.publish('tasks', function publishTasks() {
//   return TasksCollection.find({ userId: this.userId });
// });

Meteor.publish('tasks', function () {

  let tasks = TasksCollection.find({ userId: this.userId }, {
    fields: {
      _id: 1,
      createdAt: 1,
      username: 1,
      userId: 1,
      status: 1,
      history: 1,
      name: 1,
      description: 1
    },
  });
  return tasks
});

// function moveLastOut(obj) {

//   if (obj.history && obj.history.length > 0) {
//     const ultimoHistorico = obj.history[obj.history.length - 1];
//     // Copiar as propriedades do último histórico para o objeto original
//     Object.assign(obj, ultimoHistorico);
//   }
  
//   return obj
// }

Meteor.publish('allTasks', function () {

  let tasks = TasksCollection.find({} , {
    fields: {
      _id: 1,
      createdAt: 1,
      username: 1,
      userId: 1,
      status: 1,
      name: 1,
      description: 1
    },
  });

  return tasks
});