function addBoxes() {
  const wordleGrid = document.querySelector(".wordle-grid");
  const j = 1;
  let a = 1;
  let b = 1;
  let c = 1;
  let d = 1;
  let e = 1;
  for (let i = 1; i < 31; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    wordleGrid.appendChild(box);
    box.dataset.row = j;
    box.dataset.col = i;
    if (i > 5 && i <= 10) {
      box.dataset.row = j + 1;
      box.dataset.col = a;
      a += 1;
    } else if (i > 10 && i <= 15) {
      box.dataset.row = j + 2;
      box.dataset.col = b;
      b += 1;
    } else if (i > 15 && i <= 20) {
      box.dataset.row = j + 3;
      box.dataset.col = c;
      c += 1;
    } else if (i > 20 && i <= 25) {
      box.dataset.row = j + 4;
      box.dataset.col = d;
      d += 1;
    } else if (i > 25 && i <= 30) {
      box.dataset.row = j + 5;
      box.dataset.col = e;
      e += 1;
    }
  }
}

export default addBoxes;
