const question = document.getElementById('question')
const questionText = document.getElementById('questionText')
const questionNo = document.getElementById('questionNo')
const startBtn = document.getElementById('start')
const answer = document.getElementById('answer')
const showHintsAllowed = document.getElementById('hintsAllowed')
const hintBtn = document.getElementById('hint')
const keyboardBtns = document.querySelectorAll('.keyboard__btns')
const windowBindPara = document.getElementById('windowBindPara')
const darkMode = document.getElementById('darkMode')
const gameOver = document.getElementById('gameOver')
const music = document.getElementById('music')
const musicIcon = document.getElementById('musicIcon')
const noMusicIcon = document.getElementById('noMusicIcon')
const url =
  'https://gist.githubusercontent.com/jaygal0/d3619c250da85a7c0aeee6b33f07ad4d/raw/6f1bbf7947339ac8767cb5ab2e157f4854a2cb31/shortcut.json'
const progressBar = document.getElementsByClassName(
  'windowCountdown__progressbar'
)[0]

// To select the pseudo element from the countdown timer
var UID = {
  _current: 0,
  getNew: function () {
    this._current++
    return this._current
  },
}

HTMLElement.prototype.pseudoStyle = function (element, prop, value) {
  var _this = this
  var _sheetId = 'pseudoStyles'
  var _head = document.head || document.getElementsByTagName('head')[0]
  var _sheet =
    document.getElementById(_sheetId) || document.createElement('style')
  _sheet.id = _sheetId
  var className = 'pseudoStyle' + UID.getNew()

  _this.className += ' ' + className

  _sheet.innerHTML +=
    '\n.' + className + ':' + element + '{' + prop + ':' + value + '}'
  _head.appendChild(_sheet)
  return this
}

// To program the game difficulty
const hints = 5
const timeLimitSec = 90
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
    windowBindPara.innerText = 'type in your answer using your keyboard'
  } else {
    clearInterval(countNer)
    questionText.classList.remove('remove')
    gameOver.classList.add('remove')
    progressBar.style.setProperty('--top', 1)
    windowBindPara.innerText = 'type in your answer using your keyboard'
    game.startTimer()
    game.reset()
    game.startGame()
  }
})

// To show the keyboard hint when the hint button is pressed
hintBtn.addEventListener('click', () => {
  if (gameOver.classList.contains('remove')) {
    game.showHint()
  }
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

// To toggle the music icon
music.addEventListener('click', () => {
  musicIcon.classList.toggle('remove')
  noMusicIcon.classList.toggle('remove')
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
        e.altKey === shortcut[this.random].altKey &&
        gameOver.classList.contains('remove')
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
      console.log(width)
      if (width >= 93) {
        clearInterval(countNer)
      }
      if (width >= 93) {
        question.innerHTML = 'hit reset to play again'
        questionText.classList.add('remove')
        gameOver.classList.remove('remove')

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
      if (width >= 60) {
        const test = document.querySelector('.windowCountdown__progressbar')
        test.pseudoStyle('before', 'background-color', '#FD7B7B')
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

// For darkmode.js
const darkmode = new Darkmode()

darkMode.addEventListener('click', () => {
  darkmode.toggle()
})
