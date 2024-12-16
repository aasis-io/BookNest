const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.assignAdminRole = functions.https.onRequest(async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).send("Please provide an email address.");
  }

  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, {role: "admin"});
    return res.status(200).send(`Admin role assigned to ${email}`);
  } catch (error) {
    console.error("Error assigning admin role:", error);
    return res.status(500).send("Error assigning admin role.");
  }
});

exports.assignUserRole = functions.auth.user().onCreate(async (user) => {
  try {
    await admin.auth().setCustomUserClaims(user.uid, {role: "user"});
    console.log(`User role assigned to ${user.email}`);
  } catch (error) {
    console.error("Error assigning user role:", error);
  }
});
