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
    from: `<noreply@domain.com>`,
    to: email
  };
  // hmtl message constructions
  mailOptions.subject = 'contact form message';
  mailOptions.html = `<p><b>Name: </b>${body.rsName}</p>
                      <p><b>Email: </b>${body.rsEmail}</p>
                      <p><b>Subject: </b>${body.rsSubject}</p>
                      <p><b>Message: </b>${body.rsMessage}</p>`;
  return mailTransport.sendMail(mailOptions);
}

function dateForID(dateID){
  var datesRef = admin.firestore().collection('Dates').where("id", "==", dateID);
  datesRef.get()
  .then(querySnapshot => {
        return querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
        });
    })
    .catch(error => {
        console.log("Error getting documents: ", error);
    });
}

/*-----------------
///public functions
---------------------*/

exports.swapShifts = functions.https.onCall((data) => {


  const swapFromDateID = data.swapFromDateID;

  const swapToDateID = data.swapToDateID;
  const swapWithUserUID = data.swapWithUserUID;
  const swapWithUserEmail = data.swapWithUserEmail;
  const swapWithUserName = data.swapWithUserName;
  const swapRequestUID = data.swapRequestUID;
  const swapRequestEmail = data.swapRequestEmail;

  const swapFromDate = dateForID(swapToDateID);


  //
  //const swapToDate =

  //var response = swapRequestEmail + " has requested you work " + swapToDate + ' instead of ' + swapFromDate;

  return "response success ";

});

exports.swapSaved = functions.firestore
.document('SwapRequests/{id}')
.onCreate((snap, context) => {
  const newValue = snap.data();
  console.log("You have saved the swap "+ newValue.id);

})
