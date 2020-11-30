const question = document.getElementById('question')
const questionText = document.getElementById('questionText')
const questionNo = document.getElementById('questionNo')
const startBtn = document.getElementById('start')
const answer = document.getElementById('answer')
const showHintsAllowed = document.getElementById('hintsAllowed')
const hintBtn = document.getElementById('hint')
const keyboardBtns = document.querySelectorAll('.keyboard__btns')
const windowBindPara = document.getElementById('windowBindPara')
const url =
  'https://gist.githubusercontent.com/jaygal0/d3619c250da85a7c0aeee6b33f07ad4d/raw/7d4cd8e5b9c77dbdb7c09152a44d7082d0c54f7f/shortcut.json'
const progressBar = document.getElementsByClassName(
  'windowCountdown__progressbar'
)[0]

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
  if (startBtn.innerText === 'START GAME') {
    game = new Shortcut(timeCalc, hints)
    game.startGame()
    game.startTimer()
    questionText.classList.remove('hidden')
    startBtn.innerHTML = 'reset'
  } else {
    clearInterval(countNer)
    progressBar.style.setProperty('--top', 1)
    windowBindPara.innerText = 'type in your answer using your keyboard'
    game.startTimer()
    game.reset()
    game.startGame()
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
    this.questionNo = 1
  }
  randomNo() {
    // To generate a random number
    this.random = Math.floor(Math.random() * shortcut.length)
  }
  startGame() {
    this.randomNo()

    question.innerText = shortcut[this.random].action
    questionNo.innerText = this.questionNo
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
        this.questionNo++
        questionNo.innerText = this.questionNo
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
      const width = parseFloat(computedStyle.getPropertyValue('--top')) || 0
      progressBar.style.setProperty('--top', Math.round(width + this.timeLimit))
      if (width >= 93) {
        clearInterval(countNer)
      }
      if (width >= 93) {
        question.innerHTML = 'hit reset to play again'
        if (this.score <= 10) {
          question.innerHTML = `You only answered ${this.score} questions correctly.`
          windowBindPara.innerText = 'better luck next time'
        } else if (this.score >= 10 && this.score <= 20) {
          question.innerHTML = `You answered ${this.score} questions correctly.`
          windowBindPara.innerText = 'Good job, but you can do better'
        } else if (this.score > 20) {
          question.innerHTML = `You answered ${this.score} questions correctly.`
          windowBindPara.innerText = 'well done!'
        }
      }
    }, 1000)
  }
  reset() {
    // To reset the scores
    this.questionNo = 1
    this.score = 0
    this.hintsAllowed = hints
    showHintsAllowed.innerHTML = this.hintsAllowed
  }
}
