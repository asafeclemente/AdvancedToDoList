import {
  Meteor
} from 'meteor/meteor';

Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find({
      _id: this.userId
    }, {
      fields: {
        username: 1,
        _id:1,
        "profile.name": 1,
        "profile.email": 1,
        "profile.sexo": 1,
        "profile.data": 1,
        "profile.empresa": 1
      }
    });
  } else {
    this.ready();
  }
});

Meteor.publish('userProfileImage', function () {
  if (this.userId) {
    return Meteor.users.find({
      _id: this.userId
    }, {
      fields: {
        'profile.profileImage': 1
      }
    });
  } else {
    this.ready();
  }
});