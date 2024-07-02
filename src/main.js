const gridBtn = document.querySelector('.grids');
const modeToggle = document.querySelector('.mode-toggle');
const board = document.querySelector('.board');
const colorPicker = document.querySelector('.color-picker');

const initialGrids = 10;

let drawState = true;
let num = 9;

const newElem = (tag, className) => {
  const elem = document.createElement(tag);
  elem.classList.add(className);

  return elem;
};

for(let i = 0; i < (initialGrids * initialGrids); i++) {
  const newSquare = newElem('div', 'square');
  board.appendChild(newSquare);
}

const getGridsValue = () => {
  const grids = prompt('ingrese la cantidad de grillas');

  const parse = (option) => {
    const numberOfGrids = parseInt(option);

    if(isNaN(numberOfGrids)) alert('ingrese un dato valido');

    if(numberOfGrids > 100 || numberOfGrids <= 0) {
      alert('ingrese un numero dentro del rango');
    } else {
      return numberOfGrids;
    }
  };

  return grids.length === 0 ? alert('ingrese un dato valido') : parse(grids);
};

const cleanBoard = () => {
  while(board.firstChild) board.removeChild(board.firstChild);
}

const appendGrids = () => {
  const grids = getGridsValue();

  if(grids) {
    cleanBoard();
    for(let i = 0; i < (grids * grids); i++) {
      const newSquare = newElem('div', 'square');
      newSquare.style.flexBasis = `calc(100%/${grids})`;
      board.appendChild(newSquare);
    }
  }
};

const getColor = () => {
  return colorPicker.value;
};

const color = () => {
  const grids = board.querySelectorAll('div');
  const currentColor = getColor();
  num--;

  grids.forEach((target) => {
    target.addEventListener('mouseover', () => {
      if(drawState) {
        target.style.backgroundColor = currentColor;
        target.style.opacity = `0.${num}`;
      } else {
        target.style.backgroundColor = '#bac2de';
      }
    });
  });

  if(num === 0) num = 9; 
}

const hanldleDraw = () => {
  drawState = !drawState;
  drawState ? modeToggle.textContent = 'ERASER' :  modeToggle.textContent = 'PAINT';
};

board.addEventListener('mouseover', color);
modeToggle.addEventListener('click', hanldleDraw);
gridBtn.addEventListener('click', appendGrids);