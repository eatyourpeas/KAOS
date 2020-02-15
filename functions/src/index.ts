import * as functions from 'firebase-functions';
import * as md5 from 'crypto-md5';
import * as moment from 'moment';
import * as admin from 'firebase-admin';
const mailgun_apikey = functions.config().mailgun.key;

const mailgun = require('mailgun-js')({apiKey: mailgun_apikey, domain: "mail.kaos.team"});
admin.initializeApp(functions.config().firebase);
admin.firestore().settings({});

exports.onCreateNewTemporaryUser = functions.firestore.document('NewTempUsers/{uid}').onCreate(async (snap, context)=>{
  const new_user_details = snap.data();
  const temp_id = context.params.uid;

  const hash = md5(new_user_details.email.toLowerCase(), 'hex');
  const final_url = "https://gravatar.com/avatar/" + hash + "?d=mm";

  const email = new_user_details.email;

  //now create new user
  return admin.auth().createUser({
    email: email,
    password: "password"
  })
  .then(created_user => {
    return admin.firestore().collection("UserProfiles").doc(created_user.uid).set({
      email: email,
      centre: "Kings Denmark Hill",
      title: "",
      first_name: new_user_details.first_name,
      second_name: new_user_details.second_name,
      role: new_user_details.role,
      secondary_role: new_user_details.secondary_role,
      service: "",
      mobile: "",
      bio: "",
      admin: false,
      avatar: final_url,
      first_time: true,
      token: []
    }).then(() => {
      const message = "<body style='padding-top: 50px; text-align: center; font-family: monaco, monospace; background-color: #0cd1e8; background-size: cover;'><div class='content' style='margin: 80px;'> <h1 style='display: inline-block; color: white; font-size: 30px;'>Welcome to KAOS!</h1><br> <img src='https://firebasestorage.googleapis.com/v0/b/kaos-1514072349785.appspot.com/o/kaos_redthread.png?alt=media&token=4ece744b-9e04-47a9-ab14-5f244a18efdd'><br> <p style='color: white; text-align: left;'>You have volunteered to offer clinician support to our youth worker, Barney Dunn and join a team of over 40 clinicians from different disciplines and specialities across Kings College Hospital. Thank you for your support - this service would not work without your commitment and expertise.</p> <h2 style='display: inline-block; color: white; font-size: 20px;'>What is KAOS?</h2> <p style='color: white; text-align: left;'>Kings Adolescent Outreach Service. Over the last 2 years extensive qualitative and quantitative evaluation has shown that whilst young people and young adults (aged 16-19y) get excellent medical and surgical care, their age-specific needs are often overlooked. KAOS uses youth work and a structured assessment tool to evaluate their age-specific non-medical/surgical needs and support medical and surgical teams to put in place meaningful interventions. The KAOS team do not alter clinical management - this remains with the responsible consultant. KAOS identify and support age-specific issues.</p> <h2 style='display: inline-block; color: white; font-size: 20px;'>What is my Role?</h2> <p style='color: white; text-align: left;'>Your role is key. The KAOS clinician supports the KAOS youth worker by guiding them on all clinical issues and supporting them in their interactions with clinical teams.</p> <h2 style='display: inline-block; color: white; font-size: 20px;'>How does the service work?</h2> <p style='color: white; text-align: left;'>Your name has been added to the KAOS distribution list. Each day you will receive an EPR-generated email with a list of all young people and young adults &#40;&gt;16y and &lt;20y&#41; inpatient on adult wards. Each morning the KAOS youth worker has a telephone conversation with the KAOS clinician on for that day. Together they go through the cases and help the KAOS youth worker prioritise which to see. Across the day, the youth worker will then visit each young person to identify issues and offer support. Any questions the youth worker may have are discussed with the clinician on call. Occasionally the youth worker may need your support when talking to the managing clinical teams. Responsibility for management remains with the clinical team responsible for the young person&#39;s care. Any issues that you feel you would also like to discuss, the KAOS leads (see below) are available to ask. </p> <h2 style='display: inline-block; color: white; font-size: 20px;'>How often am I on call?</h2> <p style='color: white; text-align: left;'>KAOS does not operate out of hours (after 17:00 or over weekends or bank holidays). Most clinicians offer up to 7 days a year to be available on the phone to the KAOS youth worker. The feedback we have from them is that they find it rewarding and interesting work. You are not expected to see patients or perform clinical reviews. Advice from and assessments by the KAOS team are documented on EPR by the KAOS youth worker. </p> <h2 style='display: inline-block; color: white; font-size: 20px;'>How do I know when I am on call?</h2> <p style='color: white; text-align: left;'>The roster is released in January and covers until December. If you have any preferences (days you are unavailable, annual or study leave) please let us know. We are a big team and so are very flexible. The roster can be found <a href='https://drive.google.com/drive/folders/1Q2CdRPMseMC3zmenQ4OoyoVTxqA7j5ZG?usp=sharing' style='color: white;'>here</a>. It is also available on our KAOS App.</p> <p style='color: white; text-align: left;'>If you have other commitments and need to swap out of a shift at short notice, just let us know - or alternatively email our group on <a href='mailTo: kch-tr.kaos@nhs.net' style='color: white;'>kaos@nhs.net</a> asking for a swap. People will usually volunteer to cover. Any swaps that you have arranged please let the KAOS youth worker know so they can update the rota. </p> <h2 style='display: inline-block; color: white; font-size: 20px;'>KAOS App</h2> <p style='color: white; text-align: left;'>You have been automatically signed up with the KAOS App. This is a resource for all young people inpatient at KCH, offering them practical information and support while they are in hospital. There is also a clinician&#39;s area for the KAOS clinician which is password protected. </p> <p style='color: white; text-align: left;'>To download the app visit <a href='www.kaos.team' style='color: white;'>www.kaos.team</a> in your phone's browser. A pop up should offer you the opportunity to add the app to your home screen. To access the clinician&#39;s area, tap the 'hamburger' icon (&#9776;) on the top left of the screen to access the menu. <b>Clinician Sign In</b> can be found at the bottom of the menu bar. You already have an account. Log in using your nhs email as your username, and <i>password</i> [all lower case]. As this will be your first time logging in you will be taken through some walk-through screens. When you have completed these, you will be asked to update your profile and password. <i>Be aware the information you add will be viewable to all patients. Your mobile phone number and email can <b>only</b> be seen by other members of the KAOS team.</i> </p> <h2 style='display: inline-block; color: white; font-size: 20px;'>Further questions?</h2> <p style='color: white; text-align: left;'>If you have any questions contact any one of us below</p> <div class='list_block' style='display: inline-block; margin: 0 auto;'> <ul style='list-style-type: none; list-style-position: outside; margin: 0; padding: 0; text-align: left;'> <li><a href='mailTo:barney.dunn@nhs.net' style='color: white;'>barney.dunn@nhs.net</a></li> <li><a href='mailTo:barney.dunn@nhs.net' style='color: white;'>simon.chapman@nhs.net</a></li> <li><a href='mailTo:barney.dunn@nhs.net' style='color: white;'>hannahbaynes1@nhs.net</a></li> </ul> </div> <br> <h2 style='display: inline-block; color: white; font-size: 20px;'>Feedback</h2> <p style='color: white; text-align: left;'>We are a young service and still learning. If you have suggestions or ideas please let us know. We have a full governance structure with risk register for any issues that arise - please feedback to us anything you feel belongs in this domain.</p> <h2 style='display: inline-block; color: white; font-size: 20px;'>Finally..</h2> <p style='color: white; text-align: left;'>Please tell your department and your colleagues about your experiences working for KAOS. If you want us to come and talk to your team, let us know - we are very happy to do this. We are enormously grateful for your enthusiasm and support. We will send you an update of how the service is running every month with vignettes of some of the young people we have helped. We periodically organise evening social events for the KAOS team to meet colleagues and have fun. And of course, you can support us by following <a href='https://twitter.com/KAOS_Kings' style='color: white;'>@KAOS_Kings</a> on Twitter. </p> <p style='color: white; text-align: left;'>Warm wishes,</p> <p style='color: white; text-align: left;'>KAOS</p> <p style='color: white; text-align: left;'>Please note that this is an automated email and does not accept replies. If you have any questions do let us know on the emails above. </p></div></body>";


      /// now send confirmation email
      const data = {
        from: "noreply@mail.KAOS.team",
        subject: "Welcome!",
        html: message,
        "h:Reply-To": "admin@mail.kaos.team",
        to: email
      }

      return mailgun.messages().send(data, (error, body)=> {
        console.log(body)
        if(error){
          console.log(error.message);
        }
      });
    })
    .then(() => {
      return admin.firestore().collection("NewTempUsers").doc(temp_id).delete();
    })
    .catch(error => {
      return error;
    })
  })
  .catch(error =>{
    return error;
  });

});

exports.onDeleteUserProfile = functions.firestore.document("UserProfiles/{profileId}").onDelete(async(snap, context)=>{
  const deleted_user_id = context.params.profileId;
  const email = snap.data().email;
  const message = "<H1>KAOS UPDATE!</H1><p>Your account has been deleted. If this is an error please contact your KAOS administrator</p><h5>The KAOS development team</h5>";


    /// now send confirmation email
    const data = {
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
    });
  return admin.auth().deleteUser(deleted_user_id);
})

exports.swapSaved = functions.firestore.document('SwapRequests/{id}').onCreate((snap, context) => {
    const newValue = snap.data();

    const recipientBody = {
      to: newValue.recipient_email,
      from: "noreply@mail.kaos.team",
      subject: "KAOS Swap Request",
      html: newValue.requester_name + " has requested that you work <b>" + newValue.swap_from_date + "</b> in exchange for <b>" + newValue.swap_to_date + "</b>. Please log in to approve the request.<br> Kind regards,<br> KAOS Admin."
    }

    const requesterBody = {
      to: newValue.requester_email,
      from: "noreply@mail.kaos.team",
      subject: "KAOS Swap Request",
      html: "You have requested that " + newValue.recipient_name + " work <b>" + newValue.swap_from_date + "</b> in exchange for <b>" + newValue.swap_to_date + "</b>. " + newValue.recipient_name + " has been notified by email and you will receive confirmation once they have approved your request.<br> Kind regards,<br> KAOS Admin"
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
});

exports.swapConfirmed = functions.firestore.document('SwapRequests/{id}').onUpdate((change, context)=>{
  const newValue = change.after.data();

  let recipientBody = {};
  let requesterBody = {};

  if (newValue.valid && newValue.consumed) {

    recipientBody = {
      to: newValue.recipient_email,
      from: "noreply@mail.kaos.team",
      subject: "KAOS Swap Request",
      html: "You have agreed to work <b>" + newValue.swap_to_date + "</b> in exchange for "+ newValue.requester_name + "'s <b>" + newValue.swap_from_date + "</b>. The rota has been updated to reflect this.<br> Kind regards,<br> KAOS Admin."
    }

    requesterBody = {
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
    recipientBody = {
      to: newValue.recipient_email,
      from: "noreply@mail.kaos.team",
      subject: "KAOS Swap Request",
      html: "You have declined to work <b>" + newValue.swap_to_date + "</b> in exchange for "+ newValue.requester_name + "'s <b>" + newValue.swap_from_date + "</b>. Existing rota arrangements stand.<br> Kind regards,<br> KAOS Admin."
    }

    requesterBody = {
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

exports.remindOnCallEmail = functions.https.onRequest(async (req, res)=>{

  //search for all clinicians on call over the next seven days and send them a reminder email

  const today = moment().startOf('day');
  const next_week = moment().startOf('day').add(1, "week");

  //get all dates between today and next next_week
  const these_dates = [];

  const all_dates = admin.firestore().collection("Dates").where("date", ">=", today.toDate()).where("date", "<=", next_week.toDate()).get();

  return all_dates.then(dates=>{
    dates.forEach(date=>{
      const uid = date.id;
      const this_date = date.data()["date"].toDate();
      let this_format = "";
      if (date.data()["format"]) {
        this_format = date.data()["format"];
      } else {
        this_format = moment(this_date).format('ddd Do MMM YYYY');
      }
      
      let user_id = "";
      if(date.data()["user"] !== ""){
        user_id = date.data()["user"];
        these_dates.push({uid, this_date, this_format, user_id});
      }
      return {uid, this_date, this_format, user_id};
    });
  }).then(()=>{
    return these_dates.filter(a=>{return a.user_id !== ""}).sort((a,b)=>{ return a.user_id === b.user_id ? 0 : a.user_id < b.user_id ? 1 : -1});
  }).then(filtered_dates=>{
    return filtered_dates;
  })
  .then(new_dates =>{
    new_dates.forEach((this_date) => {
      const user_id = this_date.user_id;
      return admin.firestore().collection('UserProfiles').doc(user_id).get().then(user => {
        const email = user.data()['email'];
        sendEmail(email, this_date.this_format);
      });
    });
    res.status(200).send();
  })
  .catch(error=>{
    console.log(error.stack);
    res.status(500).send('error');
  })
 
});

function sendEmail(email: string, format_date: string){
  const html_message="<body style='padding-top: 50px; text-align: center; font-family: monaco, monospace; background-color: #0cd1e8; background-size: cover;'><div class='content' style='margin: 80px;'><h1 style='display: inline-block; color: white; font-size: 30px;'>KAOS Reminder</h1><br><img src='https://firebasestorage.googleapis.com/v0/b/kaos-1514072349785.appspot.com/o/kaos_redthread.png?alt=media&token=4ece744b-9e04-47a9-ab14-5f244a18efdd'><br><p style='color: white; text-align: left;'>You have volunteered to offer clinician support to our youth workers, Barney Dunn and Chris Evans.</p><p style='color: white; text-align: left;'>You are currently rostered to work "+ format_date +"</p><p style='color: white; text-align: left;'>If you are for some reason nolonger able to cover this day, please could you let Barney, Chris, myself or Hannah know on the following email addresses.</p><div class='list_block' style='display: inline-block; margin: 0 auto;'><ul style='list-style-type: none; list-style-position: outside; margin: 0; padding: 0; text-align: left;'><a href='mailTo:barney.dunn@nhs.net' style='color: white;'>barney.dunn@nhs.net</a></ul><ul style='list-style-type: none; list-style-position: outside; margin: 0; padding: 0; text-align: left;'><a href='mailTo:c.evans@nhs.net' style='color: white;'>c.evans@nhs.net</a></ul><ul style='list-style-type: none; list-style-position: outside; margin: 0; padding: 0; text-align: left;'><a href='mailTo:simon.chapman@nhs.net' style='color: white;'>simon.chapman@nhs.net</a></ul><ul style='list-style-type: none; list-style-position: outside; margin: 0; padding: 0; text-align: left;'><a href='mailTo:hannahbaynes1@nhs.net' style='color: white;'>hannahbaynes1@nhs.net</a></ul></div><p style='color: white; text-align: left;'>Please note that this is an automated email and does not accept replies. If you have any questions do let us know.</p><p style='color: white; text-align: left;'>Warm wishes,</p><p style='color: white; text-align: left;'>KAOS</p></div></body>";
  const recipientBody = {
    to: email,
    cc: ["simon.chapman@nhs.net", "hannahbaynes1@nhs.net", "barney.dunn@nhs.net", "c.evans@nhs.net"],
    from: "noreply@mail.kaos.team",
    subject: "KAOS Reminder",
    html: html_message
  }

  return mailgun.messages().send(recipientBody, (error, body)=>{
    if(error){
      console.log(error.message);
    }
  });
}
