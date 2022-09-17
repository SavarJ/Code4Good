require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

// current clockins running
const clockins = [];
const availableTutors = [];
const currentTutoringSessions = [];

const finishedTutoringSessions = [];
const finishedClockins = [];
const User = require("./models/User");

app.post("/clockin", async (req, res) => {
  const tutorEmail = req.body.email;
  const tutor = await User.findOne({ email: tutorEmail });
  if (!tutor || !tutor.isTutor) {
    res.status(400).send("User is not a tutor");
    return;
  }
  clockins.push({
    userEmail,
    startTime: new Date(),
    endTime: null,
  });
  availableTutors.push({
    userEmail: tutorEmail,
    user: tutor,
    sessionStartTime: new Date(),
    sessionEndTime: null,
    zoom: tutor.zoom,
    available: True,
  });
  res.status(200).send(tutor.zoom);
});

app.post("/clockout", async (req, res) => {
  const tutorEmail = req.body.email;
  const tutor = availableTutors.find((tutor) => tutor.userEmail === tutorEmail);
  if (!tutor) {
    res.status(400).send("User is not a tutor");
    return;
  }

  tutor.available = False;
  tutor.sessionEndTime = new Date();
  clocked = clockins.find((clockin) => clockin.userEmail === tutorEmail);
  clocked.endTime = new Date();
  finishedClockins.push(clocked);
  clockins.splice(clockins.indexOf(clocked), 1);

  const tutorUser = await User.findOne({ email: tutorEmail });
  tutorUser.hours += (tutor.sessionEndTime - tutor.sessionStartTime) / 3600000;
  await tutorUser.save();
});

app.get("/available/tutors", (req, res) => {
  res
    .status(200)
    .send(
      availableTutors
        .filter((tutor) => tutor.available)
        .map((tutor) => tutor.user)
    );
});

app.post("/book", (req, res) => {
  const tutorEmail = req.body.tutorEmail;
  const tutor = availableTutors.find((tutor) => tutor.userEmail === tutorEmail);
  tutor.available = false;

  currentTutoringSessions.push({
    tutorEmail,
    startTime: new Date(),
    endTime: null,
    studentEmail: req.body.studentEmail,
  });
  return res.status(200).send(tutor.zoom);
});

app.post("/endsession", async (req, res) => {
  const tutorEmail = req.body.tutorEmail;
  const studentEmail = req.body.studentEmail;
  const rating = req.body.rating;

  currentTutoringSession = currentTutoringSessions.find(
    (session) =>
      session.tutorEmail === tutorEmail &&
      session.tutorEmail.studentEmail === studentEmail
  );
  currentTutoringSession.endTime = new Date();
  //   remove currenttutoringsession from the list
  currentTutoringSessions = currentTutoringSessions.filter(
    (session) =>
      session.tutorEmail !== tutorEmail &&
      session.tutorEmail.studentEmail !== studentEmail
  );
  finishedTutoringSessions.push(currentTutoringSession);

  const tutorUser = await User.findOne({ email: tutorEmail });
  tutorUser.rating.push(rating);
  tutorUser.points += Math.round(
    ((currentTutoringSession.endTime - currentTutoringSession.startTime) /
      3600000) *
      rating
  );

  return res.status(200).send("Session ended");
});

app.get("/leaderboard", async (req, res) => {
  let users = await User.find();
  users = users.filter((user) => user.isTutor);
  users.sort((a, b) => b.points - a.points);
  return res.status(200).send(users);
});

app.listen(5050, () => {
  console.log("Server started on port 5050");
});

// async function createNewUser() {
//   const newuser = new User({
//     email: "natu2002@gmail.com",
//     password: "123456",
//     fname: "Natu",
//     lname: "Berhane",
//     isTutor: true,
//     phone: "1010101010",
//     zoom: "https://zoom.us/j/10101010",
//     dob: "1990-01-01",
//   });

//   await newuser.save();
// }
