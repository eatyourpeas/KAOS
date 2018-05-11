'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var mailgun_apikey = functions.config().mailgun.apikey;
var mailgun = require('mailgun-js')({apiKey: mailgun_apikey, domain: "mail.kaos.team"});
var md5 = require('crypto-md5');

const db = admin.firestore();

exports.onCreateNewUser = functions.auth.user().onCreate((user) => {

      // access a particular field as you would any JS property
      const email = user.email;
      const KAOSWebAddress = "www.kaos.team";

      // have created user - now create a blank user profile

      let hash = md5(email.toLowerCase(), 'hex');
      let final_url = "https://gravatar.com/avatar/" + hash + "?d=mm";

      const newUserProfile = {
        uid: user.uid,
        email: email,
        centre: "Kings Denmark Hill",
        title: "",
        first_name: "",
        second_name: "",
        role: "",
        secondary_role: "",
        service: "",
        mobile: "",
        bio: "",
        admin: false,
        avatar: final_url,
        first_time: true,
        token: []
      };

      var message = "<H1>Welcome to the KAOS team!</H1><p>As a member of KAOS you have been been given private access to the Clinician area of the KAOS app.</p><H3>What is the KAOS app?</H3><p>The KAOS app has been developed for young people on the wards, to provide them with information they might need while they are at Kings, or to sign post them to services while they have time in hospital to think about their health. It is free to access at <a href=" + KAOSWebAddress + ">kaos.team</a></a></p><H3>What is in the Clinician's Area?</H3><p>There is a separate area for KAOS clinicians where you can view the KAOS clinician rota and request and approve automated swaps with your colleagues. Notifications of requests for swaps or approvals of swaps will be sent by email to " + email + ".</p><h3>How do I download the app?</h3><p>First you have to download it to your phone.</p><h4>If you have an android phone</h4><li>Visit <a href=" + KAOSWebAddress + ">www.kaos.team</a></li><li>Click on the 3 dots icon (&#8942;) in the top right-hand corner of the screen - select <b>Add to Home Screen</b>. KAOS app will be automatically added to your home screen.</li><h4>If you have an iPhone</h4><li>Visit <a href=" + KAOSWebAddress + ">www.kaos.team</a></li><li>Tap the share button from the middle of the bottom menu</li><li>Scroll over and choose <b>Add to Home Screen</b></li><li>Tap <b>Add</b> to save the new icon to the iPhone/iPod touch Home Screen.</li><li>Safari will minimize and you'll see the new icon next to all your other app icons.</li><h3>How do I get access to the clinician's area?</h3><li>Open the KAOS app from home screen</li><li>Tap the 'hamburger' icon (&#9776;) on the top left of the screen to access the menu</li><li>Tap <b>Clinician Sign In</b> on the bottom of the menu bar</li><li>You already have an account. Log in using <i>"+ email +"</i> email, using <b>password</b> [all lower case]</li><li>As this will be your first time logging in you will be taken through some walk-through screens</li><li>When you have completed these, you will be asked to update your profile. <i>Be aware the information you add will be viewable to all patients. Your mobile phone number and email can <b>only</b> be seen by other members of the KAOS team.</i></li><p>Any questions, please contact <a href=" + "mail:admin@mail.kaos.team" + ">admin@mail.kaos.team</a></p><h5>The KAOS development team</h5>";
      console.log(message);

        /// now send confirmation email
        var data = {
          from: "noreply@mail.KAOS.team",
          subject: "Welcome!",
          html: message,
          "h:Reply-To": "admin@mail.kaos.team",
          to: email
        }

        mailgun.messages().send(data, (error, body)=> {
          console.log(body)
          if(error){
            console.log(error.message);
          }
        })

        var db = admin.firestore().collection('UserProfiles').doc(user.uid);
        return db.set(newUserProfile);

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
    subject: "KAOS Swap Request",
    html: newValue.requester_name + " has requested that you work <b>" + newValue.swap_from_date + "</b> in exchange for <b>" + newValue.swap_to_date + "</b>. Please log in to approve the request.<br> Kind regards,<br> KAOS Admin."
  }

  var requesterBody = {
    to: newValue.requester_email,
    from: "noreply@mail.kaos.team",
    subject: "KAOS Swap Request",
    html: "You have requested that " + newValue.recipient_name + " work <b>" + newValue.swap_from_date + "</b> in exchange for <b>" + newValue.swap_to_date + "</b>. " + newValue.recipient_name + " has been notified by email and you will receive confirmation once they have approved your request.<br> Kind regards,<br> KAOS Admin"
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

  if (newValue.valid && newValue.consumed) {

    var recipientBody = {
      to: newValue.recipient_email,
      from: "noreply@mail.kaos.team",
      subject: "KAOS Swap Request",
      html: "You have agreed to work <b>" + newValue.swap_to_date + "</b> in exchange for "+ newValue.requester_name + "'s <b>" + newValue.swap_from_date + "</b>. The rota has been updated to reflect this.<br> Kind regards,<br> KAOS Admin."
    }

    var requesterBody = {
      to: newValue.requester_email,
      from: "noreply@mail.kaos.team",
      subject: "KAOS Swap Request",
      html: newValue.recipient_name + " has agreed to your request to work your <b>" + newValue.swap_to_date + "</b> in exchange for their <b>" + newValue.swap_from_date + "</b>. The rota has been updated to reflect the change.<br> Kind regards,<br> KAOS Admin"
    }

    mailgun.messages().send(requesterBody, (error, body)=>{

      if(error){
        console.log(error.message);
      }
    });

    mailgun.messages().send(recipientBody, (error, body)=>{

      if(error){
        console.log(error.message);
      }
    });

  }

  if (!newValue.valid){
    var recipientBody = {
      to: newValue.recipient_email,
      from: "noreply@mail.kaos.team",
      subject: "KAOS Swap Request",
      html: "You have declined to work <b>" + newValue.swap_to_date + "</b> in exchange for "+ newValue.requester_name + "'s <b>" + newValue.swap_from_date + "</b>. Existing rota arrangements stand.<br> Kind regards,<br> KAOS Admin."
    }

    var requesterBody = {
      to: newValue.requester_email,
      from: "noreply@mail.kaos.team",
      subject: "KAOS Swap Request",
      html: newValue.recipient_name + " has declined your request to work your <b>" + newValue.swap_to_date + "</b> in exchange for their <b>" + newValue.swap_from_date + "</b>. Existing rota arrangements stand. Please submit a new swap request.<br> Kind regards,<br> KAOS Admin"
    }

    mailgun.messages().send(requesterBody, (error, body)=>{

      if(error){
        console.log(error.message);
      }
    });

    mailgun.messages().send(recipientBody, (error, body)=>{

      if(error){
        console.log(error.message);
      }
    });
  }
});
