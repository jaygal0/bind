const shortcut = [
  {
    code: 'KeyA',
    altKey: false,
    ctrlKey: true,
    shiftKey: false,
    action: 'Select all content.',
    shortcut: 'essential',
    hint: 'Ctrl + A',
  },
  {
    code: 'KeyC',
    altKey: false,
    ctrlKey: true,
    shiftKey: false,
    action: 'Copy selected items to clipboard.',
    shortcut: 'essential',
    hint: 'Ctrl + C',
  },
  {
    code: 'KeyX',
    altKey: false,
    ctrlKey: true,
    shiftKey: false,
    action: 'Cut selected items to clipboard.',
    shortcut: 'essential',
    hint: 'Ctrl + X',
  },
  {
    code: 'KeyV',
    altKey: false,
    ctrlKey: true,
    shiftKey: false,
    action: 'Paste content from clipboard.',
    shortcut: 'essential',
    hint: 'Ctrl + V',
  },
  {
    code: 'KeyZ',
    altKey: false,
    ctrlKey: true,
    shiftKey: false,
    action: 'Undo an action, including undelete files (limited).',
    shortcut: 'essential',
    hint: 'Ctrl + Z',
  },
  {
    code: 'KeyZ',
    altKey: false,
    ctrlKey: true,
    shiftKey: true,
    action: 'Redo an action.',
    shortcut: 'essential',
    hint: 'Ctrl + Shift + Z',
  },
  {
    code: 'KeyN',
    altKey: false,
    ctrlKey: true,
    shiftKey: true,
    action: 'Create new folder on desktop or File Explorer.',
    shortcut: 'essential',
    hint: 'Ctrl + Shift + N',
  },
  {
    code: 'KeyD',
    altKey: false,
    ctrlKey: true,
    shiftKey: false,
    action: 'Delete selected item to the Recycle Bin.',
    shortcut: 'essential',
    hint: 'Ctrl + D',
  },
  {
    code: 'F2',
    altKey: false,
    ctrlKey: false,
    shiftKey: false,
    action: 'Rename selected item.',
    shortcut: 'essential',
    hint: 'F2',
  },
  {
    code: 'Escape',
    altKey: false,
    ctrlKey: false,
    shiftKey: false,
    action: 'Close current task.',
    shortcut: 'essential',
    hint: 'ESC',
  },
]

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
const timeLimit = 10
let game

// EVENT LISTENERS //////////
startBtn.addEventListener('click', () => {
  if (startBtn.innerText === 'start') {
    game = new Shortcut(timeLimit, hints)
    game.startGame()
    game.countDown()
    startBtn.innerText = 'reset'
  } else {
    game.reset()
    game.startGame()
    game.countDown()
  }
})

//   To show the hint when the hint button is pressed
hintBtn.addEventListener('click', () => {
  //   Only allow the user to get a hint if they have enough hints left
  game.showHint()
})

// Figuring out the keyboard interaction
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
        action.innerHTML = 'play again'
        startBtn.innerHTML = 'play again'
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
    clearInterval(countDown)
  }
}
