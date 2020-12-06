let pattern = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let color = 1;

const show = () => {
  let board = document.getElementById("board");
  board.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.innerHTML =
        pattern[i][j] === 1 ? "⭕️" : pattern[i][j] === 2 ? "❌" : "";
      cell.addEventListener("click", () => move(j, i));
      board.append(cell);
    }
    const br = document.createElement("br");
    board.append(br);
  }
};

function move(x, y) {
  if (x === -1 && y === -1) {
    alert("双方和");
    return;
  }
  if (check(pattern, color)) {
    alert(color == 1 ? "⭕️ is winner!!" : color === 2 ? "❌ is winner!!" : "");
    return;
  }
  pattern[y][x] = color;
  color = 3 - color;
  show();
  if (willWin(pattern, color)) {
    console.log(
      color == 1 ? "⭕️ is winner!!" : color === 2 ? "❌ is winner!!" : ""
    );
  }
  color == 2 && move(...bestChoice(pattern, color).point);
}

function check(pattern, color) {
  for (let i = 0; i < 3; i++) {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (pattern[i][j] !== color) {
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
      if (pattern[j][i] !== color) {
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
      if (pattern[i][i] !== color) {
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
      if (pattern[i][2 - i] !== color) {
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
      if (pattern[i][j]) {
        continue;
      }
      let temp = clone(pattern);
      temp[i][j] = color;
      if (check(temp, color)) {
        return [j, i];
      }
    }
  }
  return null;
}
function clone(pattern) {
  return JSON.parse(JSON.stringify(pattern));
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
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (pattern[i][j]) {
        continue;
      }
      let temp = clone(pattern);
      temp[i][j] = color;
      let r = bestChoice(temp, 3 - color).result;
      if (-r > result) {
        result = -r;
        point = [j, i];
      }
    }
  }
  return {
    point: point || [-1, -1],
    result: point ? result : 0,
  };
}
show();
