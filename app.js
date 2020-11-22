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
const hintBtn = document.getElementById('hint')
const scoreCard = document.getElementById('scoreCard')
const keyboardBtns = document.querySelectorAll('.keyboard--btns')
let time = 60
let score = 0

startBtn.addEventListener('click', () => {
  startGame()
  countDown()
})

const startGame = () => {
  const random = Math.floor(Math.random() * shortcut.length)

  // To question the user
  action.innerText = shortcut[0].action

  //   To check if the user has typed in the correct shortcut
  window.addEventListener('keydown', (e) => {
    e.preventDefault()
    if (
      e.code === shortcut[0].code &&
      e.ctrlKey === shortcut[0].ctrlKey &&
      e.shiftKey === shortcut[0].shiftKey &&
      e.altKey === shortcut[0].altKey
    ) {
      score++
      startGame()
    }
  })

  //   To show the hint when the hint button is pressed
  hintBtn.addEventListener('click', () => {
    hint()
  })

  //   Function to show the hint in text and highlight the interactive keyboard
  const hint = () => {
    answer.innerHTML = shortcut[0].hint
    // FIXME Clean up the code to higlight the keyboard
    keyboardBtns.forEach((btn) => {
      if (btn.dataset.code === shortcut[0].code) {
        btn.classList.add('activeBtn')
      }
      if (shortcut[0].ctrlKey && btn.dataset.code === 'ControlLeft') {
        btn.classList.add('activeBtn')
      }
    })
    setTimeout(() => {
      answer.innerHTML = ''
      keyboardBtns.forEach((btn) => {
        if (btn.dataset.code === shortcut[0].code) {
          btn.classList.remove('activeBtn')
        }
        if (shortcut[0].ctrlKey && btn.dataset.code === 'ControlLeft') {
          btn.classList.remove('activeBtn')
        }
      })
    }, 1000)
  }
}

function countDown() {
  setInterval(() => {
    if (time <= 0) {
      clearInterval((time = 0))
    }
    countDownTimer.innerHTML = time
    time -= 1

    if (time === 0) {
      action.innerHTML = 'hit start'
      scoreCard.innerHTML = `you completed ${score} questions`
    }
  }, 1000)
}

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
