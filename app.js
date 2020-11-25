const action = document.getElementById('action')
const startBtn = document.getElementById('start')
const countDownTimer = document.getElementById('countDownTimer')
const answer = document.getElementById('answer')
const showHintsAllowed = document.getElementById('hintsAllowed')
const hintBtn = document.getElementById('hint')
const scoreCard = document.getElementById('scoreCard')
const keyboardBtns = document.querySelectorAll('.keyboard__btns')
const url =
  'https://gist.githubusercontent.com/jaygal0/d3619c250da85a7c0aeee6b33f07ad4d/raw/230539129389c89661216a583617bba7ecef3272/shortcut.json'

const hints = 3
const timeLimit = 30

let shortcut
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

async function shortcutList() {
  shortcut = await retrieve()
}

// To load the function when you enter the site
window.onload = () => {
  retrieve()
  shortcutList()
}

// To show the user the time allowed
countDownTimer.innerText = timeLimit

// EVENT LISTENERS //////////
// To start or restart the timer and start a game
startBtn.addEventListener('click', () => {
  if (startBtn.innerText === 'start') {
    game = new Shortcut(timeLimit, hints)
    game.countDown()
    game.startGame()
    startBtn.innerText = 'restart'
  } else {
    game.reset()
    game.startGame()
    startBtn.innerText = 'restart'
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
    if (this.hintsAllowed > 0) {
      this.hintsAllowed--
      showHintsAllowed.innerHTML = this.hintsAllowed
      this.hint()
    }
  }
  countDown() {
    setInterval(() => {
      if (this.timeLimit <= 0) {
        clearInterval((this.timeLimit = 0))
      }
      countDownTimer.innerHTML = this.timeLimit
      this.timeLimit -= 1

      if (this.timeLimit === 0) {
        action.innerHTML = 'hit restart to play again'
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
    this.timeLimit = timeLimit
    this.score = 0
    this.hintsAllowed = hints
    showHintsAllowed.innerHTML = this.hintsAllowed
  }
}
