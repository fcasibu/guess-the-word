let boxes = document.querySelectorAll('.box')
let boxIndex = 0
let wordEnd = 0
let userInput = []
let userInputJoin;
let words = ["apple", "array", "giant", "gator"]
let answer = []
let enterFlag = true
let buttons = document.querySelectorAll('button')

function randomWord() {
    let randomizedWord = words[Math.floor(Math.random() * words.length)]
    answer.push(randomizedWord)
}

randomWord()

window.addEventListener('keydown', (e) => {
    let key = document.querySelector(`button[data-key="${e.key}"]`)
    if (!key) return
    key.click();
})

buttons.forEach(button => button.addEventListener('click', () => {
    addLetterToBox(button);
    (button.textContent === 'enter') ? enterWord(): false;
    (button.textContent === 'del') ? deleteLetter(): false;
}))


function addLetterToBox(e) {
    if (e.classList.contains('letter')) {
        if (wordEnd === 5) {
            return
        } else {
            boxes[boxIndex].textContent += e.textContent
            boxes[boxIndex].classList.remove('remove')
            boxes[boxIndex].classList.add('active')
            userInput.push(e.textContent)
            boxIndex++
            wordEnd++
            userInputJoin = userInput.join("")
        }
    }

}

function enterWord() {
    wordEnd = 0
    if (answer.includes(userInputJoin)) {
        console.log("True")
    } else {
        userInput = []
        console.log("False")
    }
}

function deleteLetter() {
    if (enterFlag) {
        boxes[boxIndex - 1].classList.remove('active')
        boxes[boxIndex - 1].classList.add('remove')
        boxIndex--
        wordEnd--
        boxes[boxIndex].textContent = ''
    } else if (!enterFlag) {
        return
    }
}