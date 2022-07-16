import { buffer } from "micro";
var admin = require("firebase-admin");
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

// Secure connection to firebase from Backend
const serviceAccount = require("../../permissions.json");
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

//  const app=  !apps initializeApp({
//     credential: cert(serviceAccount),
//   });

const db = getFirestore(app);

//Establish connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;


// Firebase write function
const fulfillOrder = async (session) => {
  const docRef = db
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id);

  try {
    const res = await docRef.set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: FieldValue.serverTimestamp(),
    });

    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default async function handler(req, res) {
  //console.log("req body is", req.body)
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    // Verify event posted came from stripe - https://stripe.com/docs/webhooks/signatures
    // https://stripe.com/docs/identity/handle-verification-outcomes
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.error(err.message);
      response.status(400).send(`Webhook Error: ${err.message}`);
    }

    //Handle the checkout session completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Fulfill the order- stripe session is timing out because of firebase delay. do res status first and firebase operation later.
      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};


//var admin = require("firebase-admin");
// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
