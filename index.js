const express = require("express");
const { getQuestion, isCorrectAnswer } = require("./utils/mathUtilities");

const app = express();
const port = 3000;

let streak = 0; // Store streak in memory
let currentQuestion = getQuestion(); // Store the current question
let leaderboards = []; // Store all streaks with timestamps

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static("public")); // To serve static files (e.g., CSS)

//Some routes required for full functionality are missing here. Only get routes should be required
// Home Route
app.get("/", (req, res) => {
  res.render("index", { streak });
});

// Quiz Route
app.get("/quiz", (req, res) => {
  res.render("quiz", { question: currentQuestion.question });
});

//Handles quiz submissions
app.post("/quiz", (req, res) => {
  const { answer } = req.body;

  if (isCorrectAnswer(currentQuestion.question, answer)) {
    streak++;
  } else {
    if (streak > 0) {
      // Save streak with timestamp if streak > 0
      leaderboards.push({
        streak,
        date: new Date().toLocaleString(),
      });
    }
    streak = 0; // Reset streak on incorrect answer
  }

  currentQuestion = getQuestion(); // Generate new question

  console.log(`Answer: ${answer}`);

  //answer will contain the value the user entered on the quiz page
  //Logic must be added here to check if the answer is correct, then track the streak and redirect properly
  //By default we'll just redirect to the homepage again.
  res.redirect("/quiz");
});

// Leaderboards Route
app.get("/leaderboards", (req, res) => {
  // Sort streaks in descending order and show the top 10
  const topStreaks = leaderboards
    .sort((a, b) => b.streak - a.streak)
    .slice(0, 10);

  res.render("leaderboards", { topStreaks });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
