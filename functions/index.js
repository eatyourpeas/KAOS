'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var mailgun_apikey = functions.config().mailgun.apikey;
var mailgun = require('mailgun-js')({apiKey: mailgun_apikey, domain: "mail.kaos.team"});

const db = admin.firestore();

exports.onCreateNewUser = functions.auth.user().onCreate((user) => {

      // access a particular field as you would any JS property
      const email = user.email;

      // perform desired operations ...
      var data = {
        from: 'noreply@mail.KAOS.team',
        subject: 'Welcome!',
        html: `<p>Welcome to the KAOS team!</p>`,
        'h:Reply-To': 'admin@mail.kaos.team',
        to: email
      }

      mailgun.messages().send(data, (error, body)=> {
        console.log(body)
        if(error){
          console.log(error.message);
        }
      })
  });

/*-----------------
///public functions
---------------------*/

exports.swapSaved = functions.firestore
.document('SwapRequests/{id}')
.onCreate((snap, context) => {
  const newValue = snap.data();

  var recipientBody = {
    to: newValue.recipient_email,
    from: "noreply@mail.kaos.team",
    rsSubject: "KAOS Swap Request",
    html: newValue.requester_name + " has requested that you work <b>" + newValue.swap_to_date + "</b> in exchange for " + newValue.swap_from_date + ". Please log in to approve the request.<br> Kind regards,<br> KAOS Admin."
  }

  var requesterBody = {
    to: newValue.requester_email,
    from: "noreply@mail.kaos.team",
    subject: "KAOS Swap Request",
    html: "You have requested that " + newValue.recipient_name + " work " + newValue.swap_to_date + " in exchange for " + newValue.swap_from_date + ". " + newValue.recipient_name + " has been notified by email and you will receive confirmation once they have approved your request.<br> Kind regards,<br> KAOS Admin"
  }

  mailgun.messages().send(requesterBody, (error, body)=>{
    log(body);
    if(error){
      console.log(error.message);
    }
  });

  mailgun.messages().send(recipientBody, (error, body)=>{
    log(body);
    if(error){
      console.log(error.message);
    }
  });
});

exports.swapConfirmed = functions.firestore
.document('SwapRequests/{id}')
.onUpdate((change, context)=>{
  const newValue = change.after.data();
  const oldValue = change.before.data();

  if (!oldValue.consumed && newValue.consumed) {

    var recipientBody = {
      to: newValue.recipient_email,
      from: "noreply@mail.kaos.team",
      rsSubject: "KAOS Swap Request",
      html: "You have agreed to work <b>" + newValue.swap_to_date + "</b> in exchange for "+ newValue.requester_name + "'s " + newValue.swap_from_date + ". The rota has been updated to reflect this.<br> Kind regards,<br> KAOS Admin."
    }

    var requesterBody = {
      to: newValue.requester_email,
      from: "noreply@mail.kaos.team",
      subject: "KAOS Swap Request",
      html: newValue.recipient_name + " has agreed to your request to work " + newValue.swap_to_date + " in exchange for " + newValue.swap_from_date + ". The rota has been updated to reflect the change.<br> Kind regards,<br> KAOS Admin"
    }

    mailgun.messages().send(requesterBody, (error, body)=>{
      log(body);
      if(error){
        console.log(error.message);
      }
    });

    mailgun.messages().send(recipientBody, (error, body)=>{
      log(body);
      if(error){
        console.log(error.message);
      }
    });

  }
});
