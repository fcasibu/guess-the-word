fetch("./words.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let wordleGrid = document.querySelector('.wordle-grid');
    let boxes = wordleGrid.children;
    let words = data.words
    let buttons = document.querySelectorAll('button');
    let wordEnd = 0;
    let row = 0;
    let col = 0;
    let userInput = [];
    let userInputJoin;
    let answer; // Randomized answer taken fromthe words variable
    let answerLetterArray; // Converts answer to letters and place them in an array

    function randomizeWord() {
      let randomizedWord = words[Math.floor(Math.random() * words.length)];
      answer = randomizedWord.concat("");
      answerLetterArray = answer.split("");
    }

    randomizeWord();

    // Detects keyboard press
    window.addEventListener('keydown', (e) => {
      let key = document.querySelector(`button[data-key="${e.key}"]`);
      if (!key) return;
      key.click();
    })

    // Detects mouse click
    buttons.forEach(button => button.addEventListener('click', () => {
      addLetterToBox(button);
      (button.textContent === 'enter') ? enterWord(): false;
      (button.textContent === 'del') ? deleteLetter(): false;

      button.classList.add('active');
      setTimeout(() => {
        button.classList.remove('active');
      }, 75)
    }));

    function addLetterToBox(e) {
      if (e.classList.contains('letter')) {
        if (wordEnd === 5) {
          return;
        } else {
          boxes[row].children[col].textContent = e.textContent;
          boxes[row].children[col].classList.remove('remove');
          setTimeout(() => {
            boxes[row].children[col - 1].classList.add('active');
          });
          userInput.push(e.textContent);
          col++;
          wordEnd++;
          userInputJoin = userInput.join("");
        }
      }
    }

    // Gets the user's input'and checks if it's equal to the answer or not
    // Otherwise the game continues
    function enterWord() {
      wordEnd = 0;

      // Checks if the user puts a 5 character word
      if (col < 5) {
        alert("You can only enter a 5 character word!!");
        for (let i = 0; i < 5; i++) {
          boxes[row].children[i].textContent = '';
        }
      } else {
        if (userInputJoin === answer) {
          console.log("YOU WIN !!!!");
          checkCorrectWord(row);
        } else {
          checkGreenBox(userInput, row);
          checkYellowBox(userInput, row);
          checkGrayBox(row);
          userInput = [];
        }
      }
      loadEndScreen();
      addRow();
      col = 0;
    }

    // Checks if the user input is all correct
    function checkCorrectWord(row) {
      for (let i = 0; i < 5; i++) {
        boxes[row].children[i].classList.add('green-box');
      }
    }

    // Checks if the user input contains the correct letter
    function checkGreenBox(arr1, row) {
      let box = boxes[row].children;
      for (let i = 0; i < 5; i++) {
        if (answerLetterArray[i] === arr1[i]) {
          box[i].classList.add('green-box');
        }
      }
    }

    // Checks if the user input contains the correct letter but wrong position
    function checkYellowBox(arr1, row) {
      let box = boxes[row].children;
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          if (answerLetterArray[i] === arr1[j]) {
            if (!(box[j].classList.contains('green-box'))) {
              box[j].classList.add('yellow-box');
            }
          }
        }
      }
    }

    // Checks if the user input contains wrong letters
    function checkGrayBox(row) {
      let box = boxes[row].children;
      for (let i = 0; i < 5; i++) {
        if (!(box[i].classList.contains('green-box') || box[i].classList.contains('yellow-box'))) {
          box[i].classList.add('gray-box');
        }
      }
    }

    function addRow() {
      (col === 5) ? row += 1: false;
    }

    // Deletes user input using backspace
    function deleteLetter() {
      boxes[row].children[col - 1].classList.add('remove');
      setTimeout(() => {
        boxes[row].children[col].classList.remove('active');
      }, 75);

      col--;
      wordEnd--;
      boxes[row].children[col].textContent = '';
      userInput.pop();
    }

    let endScreen = document.querySelector('.end-screen');
    let h1 = document.querySelector('h1');
    let buttonPlayAgain = document.querySelector('.button');

    function loadEndScreen() {
      if (userInputJoin === answer) {
        createEndScreen();
      } else if (userInputJoin !== answer && row === 5) {
        h1.textContent = "You didn't guess the word right!";
        createEndScreen();
      }
    }

    function createEndScreen() {
      endScreen.style.visibility = "visible";
      setTimeout(() => {
        endScreen.style.opacity = 1;
      }, 300);

      buttonPlayAgain.addEventListener('click', () => {
        window.location.reload();
      })
    }

  })
  .catch(err => console.error(err))