const config = require('../config/config');
const User = require('../models/user.model');
require('dotenv').config();

var admin = require("firebase-admin");
var serviceAccount = require("../../caresy-android-firebase-adminsdk-8j0gq-e1c8542b49.json");
​
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
​
async function sendNotification(title, body, members) {
  // Get the owners details

  const tokens = await User.find({
    id: {
      $in: members,
    },
  }).distinct("notificationToken");
  console.log(tokens);
  if (tokens.length > 0) {
    const message = {
      tokens: tokens,
      notification: {
        body,
        title,
      },
    };
​
​
    admin
      .messaging()
      .sendMulticast(message)
      .then((response) => {
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        console.log("Error sending message:", error);
      });
  } else {
    console.log("Please Provide Token");
  }
}
export default sendNotification;



