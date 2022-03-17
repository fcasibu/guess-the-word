import wordsObj from "./words";
import dom from "./dom";

const gameLogic = (() => {
  let targetWord;
  let userInput = "";
  let correctGuess = [];
  let wrongLocationGuess = [];
  let wrongGuess = [];

  const getRandomWord = () => {
    const { words } = wordsObj;
    const randomWord = words[Math.floor(Math.random() * words.length)];
    targetWord = randomWord.split("");
  };

  const getTargetWord = () => {
    return targetWord; // For testing
  };

  const setUserInput = (input) => {
    if (input === "") {
      const removeLetter = userInput.slice(0, userInput.length - 1);
      userInput = removeLetter;
      return;
    }
    if (userInput.length <= 5) {
      userInput += input;
    }
  };

  const setGuessArr = () => {
    correctGuess = [];
    wrongLocationGuess = [];
    wrongGuess = [];
  };

  const checkKeyboard = () => {
    const { keys } = dom;

    keys.forEach((key) => {
      if (correctGuess.includes(key.textContent)) {
        key.classList.add("correct");
      } else if (wrongLocationGuess.includes(key.textContent)) {
        key.classList.add("wrong-location");
      } else if (wrongGuess.includes(key.textContent)) {
        key.classList.add("wrong");
      }
    });
  };

  const addBoxState = (state, arr, element) => {
    element.classList.add(state);
    arr.push(element.textContent);
  };

  const checkBoxes = () => {
    const { boxes, getBoxRow } = dom;

    boxes.forEach((box) => {
      if (box.dataset.row === `${getBoxRow() - 1}`) {
        if (targetWord.includes(box.textContent)) {
          if (box.textContent === targetWord[+box.dataset.col - 1]) {
            addBoxState("correct", correctGuess, box);
          } else {
            addBoxState("wrong-location", wrongLocationGuess, box);
          }
        }
        addBoxState("wrong", wrongGuess, box);
      }
    });
  };

  const checkAllowedWord = () => {
    const { words, allowedWords } = wordsObj;

    if (words.includes(userInput) || allowedWords.includes(userInput)) {
      userInput = "";
      return true;
    }

    return false;
  };

  const pushBox = (boxes, getBoxRow) => {
    const boxArray = [];

    boxes.forEach((box) => {
      if (box.dataset.row === `${getBoxRow() - 1}`) {
        boxArray.push(box);
      }
    });

    return boxArray;
  };

  const checkGuess = () => {
    const { boxes, getBoxRow, showEndScreen } = dom;
    const boxArray = pushBox(boxes, getBoxRow);

    const isWin = boxArray.every((box) => box.classList.contains("correct"));

    if (isWin) {
      showEndScreen("guessed", "correctly :)");
      return true;
    }

    if (getBoxRow() === 7) {
      showEndScreen("didn't guess", "incorrectly :(", "Better luck next time!");
      return true;
    }

    return false;
  };

  return {
    setGuessArr,
    setUserInput,
    getRandomWord,
    getTargetWord,
    checkBoxes,
    checkKeyboard,
    checkGuess,
    checkAllowedWord,
  };
})();

export default gameLogic;
