const action = document.getElementById('action')
const startBtn = document.getElementById('start')
const answer = document.getElementById('answer')
const showHintsAllowed = document.getElementById('hintsAllowed')
const hintBtn = document.getElementById('hint')
const scoreCard = document.getElementById('scoreCard')
const keyboardBtns = document.querySelectorAll('.keyboard__btns')
const url =
  'https://gist.githubusercontent.com/jaygal0/d3619c250da85a7c0aeee6b33f07ad4d/raw/7d4cd8e5b9c77dbdb7c09152a44d7082d0c54f7f/shortcut.json'
const progressBar = document.getElementsByClassName('progress-bar')[0]

// To program the game difficulty
const hints = 5
const timeLimitSec = 30
const timeCalc = 100 / timeLimitSec

// For the timer
let countNer
// For the data
let shortcut
// To start a game
let game

// ON WINDOW LOAD ////////
// Function to retrieve the JSON data
function retrieve() {
  return fetch(url)
    .then((response) => response.json())
    .then((data) =>
      data.filter((item) => {
        return item
      })
    )
}

// To set shortcut to the JSON data
async function shortcutList() {
  shortcut = await retrieve()
}

// To load the above functions when you enter the site
window.onload = () => {
  retrieve()
  shortcutList()
}

// EVENT LISTENERS //////////
// To start or restart the timer and game when the button is clicked
startBtn.addEventListener('click', () => {
  if (startBtn.innerText === 'start') {
    game = new Shortcut(timeCalc, hints)
    game.startGame()
    game.startTimer()
    startBtn.innerHTML = '&#8634;'
  } else {
    clearInterval(countNer)
    progressBar.style.setProperty('--width', 100)
    game.startTimer()
    game.reset()
    game.startGame()
    scoreCard.innerText = ''
  }
})

// To show the keyboard hint when the hint button is pressed
hintBtn.addEventListener('click', () => {
  game.showHint()
})

// To show the user interacting with the keyboard
keyboardBtns.forEach((btn) => {
  window.addEventListener('keydown', (e) => {
    if (e.code == btn.dataset.code) {
      btn.classList.add('activeBtn')
    }
  })
  window.addEventListener('keyup', (e) => {
    if (e.code == btn.dataset.code) {
      btn.classList.remove('activeBtn')
    }
  })
})

// CLASS //////////
class Shortcut {
  constructor(time, hints) {
    this.timeLimit = time
    this.score = 0
    this.hintsAllowed = hints
    this.random
  }
  randomNo() {
    // To generate a random number
    this.random = Math.floor(Math.random() * shortcut.length)
  }
  startGame() {
    this.randomNo()

    action.innerText = shortcut[this.random].action
    showHintsAllowed.innerHTML = this.hintsAllowed

    window.addEventListener('keydown', (e) => {
      e.preventDefault()
      if (
        e.code === shortcut[this.random].code &&
        e.ctrlKey === shortcut[this.random].ctrlKey &&
        e.shiftKey === shortcut[this.random].shiftKey &&
        e.altKey === shortcut[this.random].altKey
      ) {
        this.score++
        this.startGame()
      }
    })
  }
  hint() {
    // To show the hint for a second
    answer.innerHTML = shortcut[this.random].hint

    keyboardBtns.forEach((btn) => {
      if (btn.dataset.code === shortcut[this.random].code) {
        btn.classList.add('activeBtn')

        setTimeout(() => {
          answer.innerHTML = ''
          btn.classList.remove('activeBtn')
        }, 1000)
      }
      if (shortcut[this.random].ctrlKey && btn.dataset.code === 'ControlLeft') {
        btn.classList.add('activeBtn')
        setTimeout(() => {
          answer.innerHTML = ''
          btn.classList.remove('activeBtn')
        }, 1000)
      }
      if (shortcut[this.random].shiftKey && btn.dataset.code === 'ShiftLeft') {
        btn.classList.add('activeBtn')
        setTimeout(() => {
          answer.innerHTML = ''
          btn.classList.remove('activeBtn')
        }, 1000)
      }
      if (shortcut[this.random].altKey && btn.dataset.code === 'AltLeft') {
        btn.classList.add('activeBtn')
        setTimeout(() => {
          answer.innerHTML = ''
          btn.classList.remove('activeBtn')
        }, 1000)
      }
    })
  }
  showHint() {
    // To only show the hint if they have enough hints allowed
    if (this.hintsAllowed > 0) {
      this.hintsAllowed--
      showHintsAllowed.innerHTML = this.hintsAllowed
      this.hint()
    }
  }
  startTimer() {
    // To start the visual countdown timer
    countNer = setInterval(() => {
      const computedStyle = getComputedStyle(progressBar)
      const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0
      progressBar.style.setProperty(
        '--width',
        Math.floor(width - this.timeLimit)
      )
      if (width <= 0) {
        clearInterval(countNer)
      }
      if (width === 0) {
        action.innerHTML = 'hit &#8634; to play again'
        if (this.score <= 10) {
          scoreCard.innerHTML = `C'mon you can do better! You only answered ${this.score} questions correctly.`
        } else if (this.score >= 10 && this.score <= 20) {
          scoreCard.innerHTML = `Not bad, you answered ${this.score} questions correctly.`
        } else if (this.score > 20) {
          scoreCard.innerHTML = `Well done! You answered ${this.score} questions correctly.`
        }
      }
    }, 1000)
  }
  reset() {
    // To reset the scores
    this.score = 0
    this.hintsAllowed = hints
    showHintsAllowed.innerHTML = this.hintsAllowed
  }
}
