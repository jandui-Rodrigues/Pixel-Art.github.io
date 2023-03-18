const myLocation = {
  setItem: (chave, valor) => {
    if (chave === undefined) {
      return alert('Erro de dados');
    }
    return localStorage.setItem(chave, JSON.stringify(valor));
  },
  getItem: (chave) => JSON.parse(localStorage.getItem(chave)),
};
// GERADOR DE CORES
const genereteColor = () => {
  let color = '#';
  const lettes = '0123456789ABCDEF';
  for (let index = 0; index < 3; index += 1) {
    color += lettes[Math.floor(Math.random() * lettes.length)];
  }
  return color;
};
// CRIA LIS QUE GUARDAM AS CORES ALEATORIAS
function creatPalette() {
  const ColorPallete = document.getElementById('color-palette');
  for (let index = 0; index < 4; index += 1) {
    const liColor = document.createElement('li');
    liColor.classList.add('color');
    liColor.addEventListener('click', (event) => {
      const list = document.getElementsByClassName('color');
      const li = event.target;
      for (
        let colorSelected = 0;
        colorSelected < list.length;
        colorSelected += 1
      ) {
        const element = list[colorSelected];
        if (element.className.endsWith('selected')) {
          element.classList.remove('selected');
        }
      }
      li.classList.add('selected');
    });
    ColorPallete.appendChild(liColor);
  }
}
// RESPONDAVEL POR GUARDA LOCALMENTE AS CORES ALEATORIAS É VALORES FIXOS
function listPalette() {
  creatPalette();
  const list = document.getElementsByClassName('color');
  for (let index = 0; index < list.length; index += 1) {
    const liColor = list[index];
    if (index === 0) {
      liColor.classList.add('selected');
      liColor.style.background = 'black';
    }
    const color2 = (index === 1) && (liColor.style.background = 'red');
    const color3 = (index === 2) && (liColor.style.background = 'green');
    const color4 = (index === 3) && (liColor.style.background = 'blue');
  }
}
function listSavePalette() {
  creatPalette();
  const list = document.getElementsByClassName('color');
  const saveColor = myLocation.getItem('colorPalette');

  for (let index = 0; index < list.length; index += 1) {
    const liColor = list[index];
    if (index === 0) {
      liColor.classList.add('selected');
      liColor.style.background = saveColor[index];
    }
    const color2 = (index === 1) && (liColor.style.background = saveColor[index]);
    const color3 = (index === 2) && (liColor.style.background = saveColor[index]);
    const color4 = (index === 3) && (liColor.style.background = saveColor[index]);
  }
}
const VerificLocalStore = () => {
  if (myLocation.getItem('colorPalette') === null) {
    listPalette();
  } else {
    listSavePalette();
  }
}
// ADICIONA O QUADRO DE PIXEL PARA PINTAR
function addQuadro(n) {
  const squarePixel = myLocation.getItem('pixelBoard') || [];
  const pixelBoard = document.getElementById('pixel-board');
  pixelBoard.innerHTML = '';
  for (let linha = 0; linha < n * n; linha += 1) {
    const newUl = document.createElement('ul');
    if (linha === 0 || linha % n === 0) {
      for (let pixelId = 0; pixelId < n; pixelId += 1) {
        const newLi = document.createElement('li');
        newLi.classList.add('pixel');
        newLi.id = pixelId + linha;
        newLi.style.background = '#FFFFFF';
        newLi.addEventListener('click', (event) => {
          const selectedColor = document.getElementsByClassName('selected')[0];
          const color = selectedColor.style.background;
          const pixel = event.target;
          pixel.style.background = color;
          squarePixel.push([[pixel.id], [pixel.style.background]]);
          myLocation.setItem('pixelBoard', squarePixel);
        });
        pixelBoard.appendChild(newUl);
        newUl.appendChild(newLi);
      }
    }
  }
}
// AUMENTA E SALVA O NOVO VALOR DO BOARD
const inputValue = () => {
  const inputBoardSize = document.getElementById('board-size');
  const number = Number(inputBoardSize.value);
  if (number > 50) {
    const num = 50;
    addQuadro(num);
    myLocation.setItem('boardSize', num);
  } else if (number >= 5 && number <= 50) {
    addQuadro(number);
    myLocation.setItem('boardSize', number);
  } else {
    return alert('Board inválido!');
  }
  const valueSquare = myLocation.getItem('squareSize');
  return valueSquare;
};
// VERIFICA OS PIXELS SALVO LOCALMENTE E OS ADICIONA
const veridicQuadro = () => {
  const valueSquare = myLocation.getItem('boardSize') || 5;
  if (localStorage.getItem('pixelBoard') === null) {
    addQuadro(valueSquare);
  } else {
    addQuadro(valueSquare);
    const savePixel = myLocation.getItem('pixelBoard');
    for (let pixel = 0; pixel < savePixel.length; pixel += 1) {
      const colorId = savePixel[pixel][0][0];
      const colorSave = savePixel[pixel][1][0];
      // console.log(colorId);
      // console.log(colorSave);
      const liPixel = document.getElementById(colorId);
      liPixel.style.background = colorSave;
      // console.log(liPixel);
    }
  }
};
export default {
  colorGenerete: genereteColor,
  setItem: myLocation.setItem,
  getItem: myLocation.getItem,
  VerificLocalStore: VerificLocalStore,
  square: veridicQuadro,
  saveInput: inputValue,
};
