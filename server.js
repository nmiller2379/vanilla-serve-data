const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const People = require("./models/people");
require("dotenv").config();

// Connect to the database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = process.env.PORT || 8080;

// Serve static files from the 'public' directory
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// Also have them implement a request logger.
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// basic GET request to make sure server is wroking
app.get("/", (req, res) => {
  res.send("Hell world!");
});

// Route to serve the form
app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/submit", (req, res) => {
  // They don't really need to do this server-side validation, but they can. It's kind of what the user stories imply. They aslo don't need to send it back as JSON, but if they get done early, ask them to do this.
  const { firstName, lastName, age } = req.body;
  if (!firstName) {
    res.send("Missing first name");
  } else if (!lastName) {
    res.send("Missing last name");
  } else if (!age) {
    res.send("Missing age");
  } else {
    // If all fields are provided, POST the data to the database, and then send a message backing to the client indicating the data has been posted
    const person = new People({
      fname: firstName,
      lname: lastName,
      age: age,
    });
    person.save((err, data) => {
      if (err) {
        res.send("An error occurred");
      } else {
        console.log(data);
      }
    });
    res.send("Data posted to the server");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
