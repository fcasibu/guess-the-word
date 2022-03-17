import gameLogic from "./gameLogic";
import addBoxes from "./board";

const dom = (() => {
  addBoxes();
  const boxes = document.querySelectorAll(".box");
  const keys = document.querySelectorAll(".letter");
  const endScreen = document.querySelector(".end-screen");
  const errorModal = document.querySelector(".error-modal");
  let boxCol = 0;
  let boxRow = 1;

  const getBoxRow = () => {
    return boxRow;
  };

  const setBoxCol = (value) => {
    boxCol = value;
  };

  const setBoxRow = (value) => {
    boxRow = value;
  };

  const removeTransition = (e, transition, time = 75) => {
    setTimeout(() => {
      e.classList.remove(`${transition}`);
    }, time);
  };

  const removeBoxesText = () => {
    // eslint-disable-next-line no-return-assign
    boxes.forEach((box) => (box.textContent = ""));
  };

  const changeLetterState = (state, e = "") => {
    boxes.forEach((box) => {
      if (box.dataset.row === `${boxRow}`) {
        if (box.dataset.col === `${boxCol}`) {
          box.textContent = e;
          box.classList.add(`${state}`);
          gameLogic.setUserInput(e);
          removeTransition(box, `${state}`);
        }
      }
    });
  };

  const getText = () => {
    switch (boxRow - 1) {
      case 1:
        return "You're a god!";
      case 6:
        return "That was scary!";
      default:
        return "Good job!";
    }
  };

  const showEndScreen = (guess, text, text1 = getText()) => {
    const targetWord = gameLogic.getTargetWord().join("");

    endScreen.classList.add("show-end-screen");
    endScreen.innerHTML = `
    <h1>You guessed the word ${text}</h1>
    <p>The word is <strong>${targetWord}</strong></p>
    <p>You ${guess} the word in ${boxRow - 1} ${
      boxRow - 1 === 1 ? "try" : "tries"
    }. ${text1}</p>
    <div class="play-again">Play again!</div>`;
  };

  const generateErrorModal = (errorMessage) => {
    const error = document.createElement("div");
    error.classList.add("error-message");
    error.textContent = errorMessage;
    errorModal.prepend(error);
    return error;
  };

  const showErrorModal = (errorMessage) => {
    const error = generateErrorModal(errorMessage);
    setTimeout(() => {
      error.classList.add("show-error");
      error.addEventListener("transitionend", error.remove);
    }, 500);
  };

  const addBoxEffect = (className) => {
    boxes.forEach((box) => {
      if (box.dataset.row === `${boxRow}`) {
        box.classList.add(`${className}`);
        removeTransition(box, `${className}`);
      }
    });
  };

  const clearVariables = () => {
    removeBoxesText();
    setBoxCol(0);
    setBoxRow(1);
    gameLogic.setGuessArr();
  };

  const removeClassLists = (element) => {
    endScreen.classList.remove("show-end-screen");
    element.forEach((el) => {
      el.classList.remove("correct");
      el.classList.remove("wrong-location");
      el.classList.remove("wrong");
    });
  };

  const resetGame = () => {
    gameLogic.getRandomWord();
    clearVariables();
    removeClassLists(dom.keys);
    removeClassLists(dom.boxes);
  };

  return {
    boxes,
    keys,
    getBoxRow,
    setBoxCol,
    setBoxRow,
    removeTransition,
    removeBoxesText,
    addBoxEffect,
    changeLetterState,
    resetGame,
    showEndScreen,
    showErrorModal,
  };
})();

export default dom;
