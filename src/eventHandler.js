import dom from "./dom";
import gameLogic from "./gameLogic";

const eventHandler = (() => {
  const keydownHandler = () => {
    document.addEventListener("keydown", (e) => {
      const key = document.querySelector(`button[data-key="${e.key}"]`);
      if (e.repeat) return;
      if (!key) return;
      key.click();
    });
  };

  const clickHandler = () => {
    const { checkBoxes, checkKeyboard, checkGuess, checkAllowedWord } =
      gameLogic;
    const {
      removeTransition,
      setBoxCol,
      setBoxRow,
      changeLetterState,
      addBoxEffect,
      resetGame,
      showErrorModal,
    } = dom;

    let boxCol = 0;
    let boxRow = 1;
    let canType = true;

    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("letter")) {
        if (canType) {
          if (boxCol >= 5) {
            addBoxEffect("shake-boxes");
            return;
          }
          e.target.classList.add("add");
          removeTransition(e.target, "add");
          boxCol += 1;
          setBoxCol(boxCol);
          changeLetterState("add", e.target.textContent);
        }
      }

      if (e.target.classList.contains("enter")) {
        if (boxCol !== 5) {
          showErrorModal("Not enough letters");
          addBoxEffect("red-border");
          return;
        }
        if (!checkAllowedWord()) {
          showErrorModal("Word not found");
          addBoxEffect("shake-boxes");
          return;
        }
        boxRow += 1;
        setBoxRow(boxRow);
        setBoxCol((boxCol = 0));
        checkBoxes();
        checkKeyboard();

        if (checkGuess()) {
          canType = false;
        }
      }

      if (e.target.classList.contains("del")) {
        if (boxCol <= 0) {
          return;
        }
        setBoxCol(boxCol);
        boxCol -= 1;
        changeLetterState("remove");
      }

      if (e.target.classList.contains("play-again")) {
        resetGame();
        boxCol = 0;
        boxRow = 1;
        canType = true;
      }
    });
  };

  return { clickHandler, keydownHandler };
})();

export default eventHandler;
