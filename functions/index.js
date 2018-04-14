'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


admin.initializeApp(functions.config().firebase);

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

//google account credentials used to send email
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

/*-----------------
///private functions
---------------------*/

// Send email function
function sendEmail(email, body) {
  const mailOptions = {
    from: `<noreply@KAOS.team>`,
    to: email
  };
  // hmtl message constructions
  mailOptions.subject = 'KAOS Swap Request';
  mailOptions.html = `<p><b>Name: </b>${body.rsName}</p>
                      <p><b>Email: </b>${body.rsEmail}</p>
                      <p><b>Subject: </b>${body.rsSubject}</p>
                      <p><b>Message: </b>${body.rsMessage}</p><p> Warm wishes from the KAOS team</p>`;
  return mailTransport.sendMail(mailOptions);
}

/*-----------------
///public functions
---------------------*/

exports.swapSaved = functions.firestore
.document('SwapRequests/{id}')
.onCreate((snap, context) => {
  const newValue = snap.data();

  var recipientBody = {
    rsName: newValue.recipient_name,
    rsEmail: newValue.recipient_email,
    rsSubject: "KAOS Swap Request",
    rsMessage: newValue.requester_name + " has requested that you work " + newValue.swap_to_date + " in exchange for " + newValue.swap_from_date + ". Please log in to approve the request."
  }

  var requesterBody = {
    rsName: newValue.recipient_name,
    rsEmail: newValue.recipient_email,
    rsSubject: "KAOS Swap Request",
    rsMessage: "You have requested that " + newValue.recipient_name + " work " + newValue.swap_to_date + " in exchange for " + newValue.swap_from_date + ". " + + newValue.recipient_name + " has been notified by email and you will receive confirmation once they have approved your request."
  }

  //sendEmail(newValue.recipient_email, recipientBody);
  return "";//sendEmail(newValue.requester_email, requesterBody);
})
