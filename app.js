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

let time = 60
let score = 0
let hintsAllowed = 5
let random

startBtn.addEventListener('click', () => {
  startGame()
  countDown()
  showHintsAllowed.innerHTML = hintsAllowed

  if (startBtn.innerHTML === 'play again') {
    score = 0
    hintsAllowed = 5
    time = 60
    showHintsAllowed.innerHTML = hintsAllowed
  }
})

// A function to create a random number
function randomNo() {
  random = Math.floor(Math.random() * shortcut.length)
}

function startGame() {
  randomNo()

  // To question the user
  action.innerText = shortcut[random].action

  //   To check if the user has typed in the correct shortcut
  window.addEventListener('keydown', (e) => {
    e.preventDefault()
    if (
      e.code === shortcut[random].code &&
      e.ctrlKey === shortcut[random].ctrlKey &&
      e.shiftKey === shortcut[random].shiftKey &&
      e.altKey === shortcut[random].altKey
    ) {
      score++
      startGame()
    }
  })
}

//   Function to show the hint in text and highlight the interactive keyboard
function hint() {
  answer.innerHTML = shortcut[random].hint
  keyboardBtns.forEach((btn) => {
    if (btn.dataset.code === shortcut[random].code) {
      btn.classList.add('activeBtn')

      setTimeout(() => {
        answer.innerHTML = ''
        btn.classList.remove('activeBtn')
      }, 1000)
    }
    if (shortcut[random].ctrlKey && btn.dataset.code === 'ControlLeft') {
      btn.classList.add('activeBtn')
      setTimeout(() => {
        answer.innerHTML = ''
        btn.classList.remove('activeBtn')
      }, 1000)
    }
    if (shortcut[random].shiftKey && btn.dataset.code === 'ShiftLeft') {
      btn.classList.add('activeBtn')
      setTimeout(() => {
        answer.innerHTML = ''
        btn.classList.remove('activeBtn')
      }, 1000)
    }
    if (shortcut[random].altKey && btn.dataset.code === 'AltLeft') {
      btn.classList.add('activeBtn')
      setTimeout(() => {
        answer.innerHTML = ''
        btn.classList.remove('activeBtn')
      }, 1000)
    }
  })
}

// Function to start a count down timer
function countDown() {
  setInterval(() => {
    if (time <= 0) {
      clearInterval((time = 0))
    }
    countDownTimer.innerHTML = time
    time -= 1

    if (time === 0) {
      action.innerHTML = 'play again'
      startBtn.innerHTML = 'play again'
      if (score <= 10) {
        scoreCard.innerHTML = `C'mon you can do better! You only answered ${score} questions correctly.`
      } else if (score >= 10 && score <= 20) {
        scoreCard.innerHTML = `Not bad, you answered ${score} questions correctly.`
      } else if (score > 20) {
        scoreCard.innerHTML = `Well done! You answered ${score} questions correctly.`
      }
    }
  }, 1000)
}

//   To show the hint when the hint button is pressed
hintBtn.addEventListener('click', () => {
  //   Only allow the user to get a hint if they have enough hints left
  if (hintsAllowed > 0) {
    hintsAllowed--
    showHintsAllowed.innerHTML = hintsAllowed
    hint()
  }
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
