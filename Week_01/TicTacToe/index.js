let pattern = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let color = 1;

const show = () => {
  let board = document.getElementById("board");
  board.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.innerHTML =
        pattern[i * 3 + j] === 1 ? "⭕️" : pattern[i * 3 + j] === 2 ? "❌" : "";
      cell.addEventListener("click", () => userMove(j, i));
      board.append(cell);
    }
    const br = document.createElement("br");
    board.append(br);
  }
};

function userMove(x, y) {
  pattern[y * 3 + x] = color;
  if (check(pattern, color)) {
    alert(color == 1 ? "⭕️ is winner!!" : color === 2 ? "❌ is winner!!" : "");
  }
  color = 3 - color;
  show();
  computerMove();
}

function computerMove() {
  let choice = bestChoice(pattern, color);
  if (choice.point) {
    pattern[choice.point[1] * 3 + choice.point[0]] = color;
  }
  if (check(pattern, color)) {
    alert(color == 1 ? "⭕️ is winner!!" : color === 2 ? "❌ is winner!!" : "");
  }
  color = 3 - color;
  show();
}

function check(pattern, color) {
  for (let i = 0; i < 3; i++) {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (pattern[i * 3 + j] !== color) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
  for (let i = 0; i < 3; i++) {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (pattern[j * 3 + i] !== color) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
  {
    let win = true;
    for (let i = 0; i < 3; i++) {
      if (pattern[i * 3 + 2 - i] !== color) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
  {
    let win = true;
    for (let i = 0; i < 3; i++) {
      if (pattern[i * 3 + i] !== color) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
}
function willWin(pattern, color) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (pattern[i * 3 + j]) {
        continue;
      }
      let temp = clone(pattern);
      temp[i * 3 + j] = color;
      if (check(temp, color)) {
        return [j, i];
      }
    }
  }
  return null;
}
function clone(pattern) {
  return Object.create(pattern);
}

function bestChoice(pattern, color) {
  let p;
  if ((p = willWin(pattern, color))) {
    return {
      point: p,
      result: 1,
    };
  }
  let result = -2;
  let point = null;
  outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (pattern[i * 3 + j] !== 0) {
        continue;
      }
      let temp = clone(pattern);
      temp[i * 3 + j] = color;
      let opp = bestChoice(temp, 3 - color);
      if (-opp.result >= result) {
        result = -opp.result;
        point = [j, i];
      }
      if (result === 1) {
        break outer;
      }
    }
  }
  return {
    point: point,
    result: point ? result : 0,
  };
}
show();
