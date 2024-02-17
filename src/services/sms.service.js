const config = require('../config/config');
const AWS = require('./../config/aws.config');
/**
 * Send an SMS
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendSMS = async (to, text) => {
  const msg = { to, text };
  var params = {
    Message: text,
    PhoneNumber: `+${to}`,
    MessageAttributes: {
      'AWS.SNS.SMS.SenderID': {
        DataType: 'String',
        StringValue: 'CARESY12',
      },
      'AWS.SNS.SMS.SMSType': {
        DataType: 'String',
        StringValue: 'Transactional',
      },
    },
  };
  var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

  publishTextPromise
    .then(function (data) {
      console.log(data);
    })
    .catch(function (err) {
      console.log(JSON.stringify({ Error: err }));
    });
};

// http://localhost:9000/v1/sms/sendsms/?text=[The Message]&to=[The Number]

module.exports = {
  sendSMS,
};
