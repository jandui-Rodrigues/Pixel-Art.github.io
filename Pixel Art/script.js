import module from './module.js';

window.onload = () => {
  module.VerificLocalStore();
  module.square();
};
// BOTAO RESPONSAVEL POR MUDAR PALETA DE CORES
function changePalette() {
  const bnt = document.getElementById('button-random-color');
  bnt.addEventListener('click', () => {
    const listColor = document.getElementsByClassName('color');
    const guardColor = ['#000000'];
    for (let index = 1; index < listColor.length; index += 1) {
      const newColor = module.colorGenerete();
      const element = listColor[index];
      guardColor.push(newColor);
      element.style.background = newColor;
    }
    // localStorage.setItem('colorPalette',JSON.stringify(guardColor));
    module.setItem('colorPalette', guardColor);
  });
}
changePalette();
// BOTAO QUE LIMPA O QUADRO DE PIXEL
const clearBoard = () => {
  const bntClearBoard = document.getElementById('clear-board');
  bntClearBoard.addEventListener('click', () => {
    const pixels = document.getElementsByClassName('pixel');
    for (let index = 0; index < pixels.length; index += 1) {
      const element = pixels[index];
      localStorage.removeItem('pixelBoard');
      window.location.reload();
      element.style.background = '#FFFFFF';
    }
  });
};
clearBoard();
// BOTAO QUE GERA E GUARDA NOVO TAMANHO DO BOARD
const newSquare = () => {
  const bntNewSquare = document.getElementById('generate-board');
  bntNewSquare.addEventListener('click', () => {
    module.saveInput();
  });
};
newSquare();
