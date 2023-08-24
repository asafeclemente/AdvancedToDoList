import {
	Meteor
} from 'meteor/meteor';

Meteor.methods({
	'users.updateProfile'(userId, newProfile) {

		if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

		camposPermitidos = ['name', 'email', 'data', 'sexo', 'empresa']

		for (const campo in newProfile) {
			if (!camposPermitidos.includes(campo)) {
        throw new Meteor.Error('Not authorized, contains a disallowed field.');
			}
		}

    // Make sure the current user owns the profile being updated
    const user = Meteor.users.findOne(userId);
    if (!user || this.userId !== userId) {
      throw new Meteor.Error('Not authorized.');
    }

    // Getting the user's 'profile' object
    const userProfile = user.profile || {};

    // Updating the profile by merging the current 'profile' with 'newProfile'
    const updatedProfile = { ...userProfile, ...newProfile };

    // Update the user profile with the new 'profile' object.
    Meteor.users.update(userId, { $set: { profile: updatedProfile } });
	}
});

Meteor.methods({
	'users.updateProfileImage'(userId, newProfileImage) {

		if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    // Make sure the current user owns the profile being updated
    const user = Meteor.users.findOne(userId);
    if (!user || this.userId !== userId) {
      throw new Meteor.Error('Not authorized.');
    }

    // Getting the user's 'profile' object
    const userProfile = user.profile.profile || {};

    userProfile.profileImage = newProfileImage

    // Update the user profile with the new 'profile' object.
    Meteor.users.update(userId, { $set: { profile: userProfile } });
	}
});