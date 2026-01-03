# Typing Speed Test Game

## 1. Game Title & Team Members
- **Game Title:** Typing Speed Test
- **Course:** AMET | Frontend Web Development Basics – Lab
- **Team Members:**
  - Varun VS
  - Sanjay U S
  - Harish Domma

## 2. Game Description & How to Play

The Typing Speed Test is a browser-based mini game where the player types randomly selected sentences as quickly and accurately as possible within a fixed 30‑second time limit. The game shows live statistics such as remaining time, Words Per Minute (WPM), and accuracy while the player types.

### How to Play
1. Open `index.html` in any modern web browser.  
2. On the **Start Screen**, read the instructions and click **Start Test**.  
3. On the **Game Screen**, a sentence appears at the top; start typing it in the text area.  
4. Correct characters are highlighted in green and incorrect ones are underlined in red.  
5. When the timer reaches zero, the **Result Screen** displays your final WPM, accuracy percentage, and total characters typed.  
6. Click **Play Again** to restart the test or **Home** to return to the start screen.

## 3. Key Features

- Clear game flow with three states: **Start → Playing → Game Over**.  
- 30‑second countdown timer with live updates.  
- Random sentence selection from a predefined array for each test run.  
- Real-time visual feedback for correct and incorrect characters while typing.  
- Live WPM and accuracy calculation shown during the game, plus detailed summary at the end.  
- Responsive layout using simple CSS so the game works on both desktop and mobile screens.
## 4. Programming Concepts Used

- **Variables & Data Types**
  - Numbers: `timeLimit`, `timeLeft`, `charsTyped`, `mistakes`
  - Strings: `currentSentence`
  - Boolean: `isGameActive`
  - Array: `const sentences = [ ... ]`

- **Operators & Conditionals**
  - Arithmetic operators for timer, character count, and WPM calculation.
  - Relational/logical operators in statements like `if (timeLeft <= 0)` and `if (enteredText === currentSentence)`.

- **Loops & Functions**
  - `for` loop to create `<span>` elements for every character in the sentence.
  - Multiple user-defined functions, including:
    - `startGame()`
    - `finishGame()`
    - `updateTimer()`
    - `calculateResults()`
    - `handleTyping()`
    - `switchScreen()`
    - `pickRandomSentence()`
    - `renderSentence()`

- **Arrays / Objects**
  - `sentences[]` stores several sentences for random selection.
  - Result object from `calculateResults()` returns `{ wpm, accuracy }`.

- **DOM Manipulation**
  - Using `document.getElementById()` and `querySelectorAll()` to access elements.
  - Updating text and styles with `textContent`, `innerHTML`, and `classList` to show game state and feedback.

- **Event Handling & Timers**
  - `click` events on buttons for starting, replaying, going home, and cancelling.
  - `input` event on the text area to process typing in real time.
  - `setInterval()` and `clearInterval()` used to implement the countdown timer.

## 5. GitHub Repository URL

- GitHub Repository: `https://github.com/varunVS140607/typing-speed-game.git`


