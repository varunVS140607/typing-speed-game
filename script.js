// =====================
// Game data / variables
// =====================

// Array of sample sentences that appear randomly for typing practice
const sentences = [
  "Practice makes you a better programmer.",
  "JavaScript controls the behavior of web pages.",
  "Typing quickly and accurately is a useful skill.",
  "Front end development uses HTML CSS and JavaScript.",
  "Keep calm and keep writing clean code."
];

// Game time settings
let timeLimit = 30;          // Total time per round (in seconds)
let timeLeft = timeLimit;    // Countdown timer (mutable)
let timerId = null;          // Reference to setInterval, used to stop the timer later

// Game state variables
let isGameActive = false;    // Tracks whether the game is currently active
let charsTyped = 0;          // Total number of characters typed so far
let mistakes = 0;            // Total incorrect characters
let currentSentence = "";    // The sentence currently displayed on screen

// =====================
// DOM elements
// =====================

// Screens / sections
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const resultScreen = document.getElementById("result-screen");

// Buttons
const startBtn = document.getElementById("start-btn");
const cancelBtn = document.getElementById("cancel-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const homeBtn = document.getElementById("home-btn");

// On-screen stats and text elements
const timeLeftSpan = document.getElementById("time-left");
const wpmSpan = document.getElementById("wpm");
const accuracySpan = document.getElementById("accuracy");

const quoteElement = document.getElementById("quote");
const inputArea = document.getElementById("input-area");
const statusText = document.getElementById("status-text");

// Final result screen elements
const finalWpmSpan = document.getElementById("final-wpm");
const finalAccuracySpan = document.getElementById("final-accuracy");
const finalCharsSpan = document.getElementById("final-chars");

// =====================
// Utility helpers
// =====================

// Switch between screens: "start", "game", or "result"
function switchScreen(name) {
  startScreen.classList.remove("active");
  gameScreen.classList.remove("active");
  resultScreen.classList.remove("active");

  if (name === "start") startScreen.classList.add("active");
  if (name === "game") gameScreen.classList.add("active");
  if (name === "result") resultScreen.classList.add("active");
}

// Pick a random sentence from the predefined array
function pickRandomSentence() {
  const index = Math.floor(Math.random() * sentences.length);
  return sentences[index];
}

// Display the current sentence character by character in separate <span> elements
function renderSentence(text) {
  quoteElement.innerHTML = "";
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span");
    span.textContent = text[i];
    quoteElement.appendChild(span);
  }
}

// =====================
// Core game functions
// =====================

// Called when user starts a new typing game
function startGame() {
  // Reset all game variables
  timeLeft = timeLimit;
  charsTyped = 0;
  mistakes = 0;
  isGameActive = true;

  // Reset display
  timeLeftSpan.textContent = timeLeft;
  wpmSpan.textContent = 0;
  accuracySpan.textContent = 0;
  statusText.textContent = "Timer started. Type the sentence below!";
  statusText.style.color = "#e5e7eb";

  // Choose and render a random sentence
  currentSentence = pickRandomSentence();
  renderSentence(currentSentence);

  // Reset input area
  inputArea.value = "";
  inputArea.disabled = false;
  inputArea.focus();

  // Switch to the game screen
  switchScreen("game");

  // Start countdown timer (updates every second)
  if (timerId) clearInterval(timerId);
  timerId = setInterval(updateTimer, 1000);
}

// Cancel an active game and return to start screen
function cancelGame() {
  isGameActive = false;
  clearInterval(timerId);
  inputArea.disabled = true;
  switchScreen("start");
}

// End the game when the timer runs out or player stops
function finishGame() {
  isGameActive = false;
  clearInterval(timerId);
  inputArea.disabled = true;

  // Compute accuracy and WPM results
  const { wpm, accuracy } = calculateResults();

  // Display final results
  finalWpmSpan.textContent = wpm;
  finalAccuracySpan.textContent = accuracy;
  finalCharsSpan.textContent = charsTyped;

  // Switch to results screen
  switchScreen("result");
}

// Timer logic — decreases time and ends game when 0
function updateTimer() {
  if (!isGameActive) return;

  timeLeft--;
  timeLeftSpan.textContent = timeLeft;

  if (timeLeft <= 0) {
    finishGame();
  }
}

// Compute WPM (words per minute) and accuracy percentage
function calculateResults() {
  // One word = 5 characters (standard WPM metric)
  const minutes = (timeLimit - timeLeft) / 60 || 1;
  const grossWpm = Math.round((charsTyped / 5) / minutes);

  // Calculate percentage of correct characters
  const correctChars = charsTyped - mistakes;
  const accuracy = charsTyped === 0
    ? 0
    : Math.round((correctChars / charsTyped) * 100);

  return { wpm: grossWpm, accuracy: accuracy };
}

// Handle typing input events while the game is active
function handleTyping() {
  if (!isGameActive) return;

  const enteredText = inputArea.value;
  charsTyped = enteredText.length;

  const sentenceChars = quoteElement.querySelectorAll("span");

  mistakes = 0;

  // Compare typed characters with the correct ones and update styles
  for (let i = 0; i < sentenceChars.length; i++) {
    const charSpan = sentenceChars[i];
    const typedChar = enteredText[i];

    if (typedChar == null) {
      charSpan.classList.remove("correct", "incorrect");
    } else if (typedChar === charSpan.textContent) {
      charSpan.classList.add("correct");
      charSpan.classList.remove("incorrect");
    } else {
      charSpan.classList.add("incorrect");
      charSpan.classList.remove("correct");
      mistakes++;
    }
  }

  // Update live WPM and accuracy values as user types
  const { wpm, accuracy } = calculateResults();
  wpmSpan.textContent = wpm;
  accuracySpan.textContent = accuracy;

  // Load a new random sentence automatically after finishing one
  if (enteredText === currentSentence) {
    statusText.textContent = "Great! New sentence loaded.";
    statusText.style.color = "#22c55e";

    // reset counters for next sentence
    charsTyped = 0;
    mistakes = 0;

    currentSentence = pickRandomSentence();
    renderSentence(currentSentence);
    inputArea.value = "";
  }
}

// =====================
// Event listeners
// =====================

// Buttons
startBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", startGame);
homeBtn.addEventListener("click", () => switchScreen("start"));
cancelBtn.addEventListener("click", cancelGame);

// Input typing listener
inputArea.addEventListener("input", handleTyping);
