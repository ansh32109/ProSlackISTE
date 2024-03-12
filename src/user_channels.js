import  db  from './firebase';
import firebase from 'firebase/compat/app'

// Function to get user channels from the database

const getUserChannels = async (userId) => {
  try {
    const userDocRef = db.collection('users').doc(userId);
    const userDoc = await userDocRef.get();

    if (userDoc.exists) {
      return userDoc.data().channels || [];
    } else {
      console.log('User document does not exist');
      return [];
    }
  } catch (error) {
    console.error('Error getting user channels: ', error);
    return [];
  }
};


// Function to add a channel to a user's list of channels
const addUserChannel = async (userId, channelId) => {
  try {
    const userDocRef = db.collection('users').doc(userId);
    await userDocRef.update({
      channels:  firebase.firestore.FieldValue.arrayUnion(channelId),
    });

    console.log('Channel added to user successfully!');
  } catch (error) {
    console.error('Error adding channel to user: ', error);
  }
};



export { getUserChannels, addUserChannel };
