const colorPalette = document.getElementById('color-palette');
const divPixel = document.getElementsByClassName('pixel');
const clear = document.getElementById('clear-board');
const pixel = document.getElementById('pixel-board');
const creatButton = document.getElementById('generate-board');
const creatPixel = document.getElementById('board-size');
const arrayPixel = [];
let size = 5;

// Cria cores aleatórias

function generateColors() {
  const chars = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 3; i += 1) {
    color += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return color;
}

// Evento do click para geras as cores aleatórias

function generatePalette() {
  const arrayCollor = [0];
  for (let i = 0; i < 3; i += 1) {
    const divColor = document.getElementById(`color-${i + 1}`);
    const color = generateColors();
    divColor.style.background = color;
    arrayCollor[i] = color;
    localStorage.setItem('colorPalette', JSON.stringify(arrayCollor));
  }
}
document
  .getElementById('button-random-color')
  .addEventListener('click', (event) => {
    event.preventDefault();
    generatePalette();
  });

// pega as cores armazenadas

function storageColor() {
  const colors = JSON.parse(localStorage.getItem('colorPalette'));
  if (colors !== null) {
    for (let i = 1; i < 4; i += 1) {
      const divColor = document.getElementById(`color-${i}`);
      divColor.style = `background-color : ${colors[i - 1]}`;
    }
  } else {
    generatePalette();
  }
}
storageColor();

// criação dos pixels

function pixels(tam) {
  for (let index = 0; index < tam; index += 1) {
    for (let index2 = 0; index2 < tam; index2 += 1) {
      const div = document.createElement('div');
      div.classList.add('pixel');
      div.style.backgroundColor = 'white';
      pixel.appendChild(div);
    }
  }
  pixel.style.maxWidth = ` ${tam * 40}px`;
}

// Eventos de click para pegar a cor

function selected() {
  colorPalette.addEventListener('click', (event) => {
    const selectedColor = document.querySelector('.selected');
    selectedColor.classList.remove('selected');
    event.target.classList.add('selected');
  });
}

// salva desenho

function saveDrawn() {
  arrayPixel.length = 0;
  for (let index = 0; index < divPixel.length; index += 1) {
    arrayPixel.push(divPixel[index].style.backgroundColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(arrayPixel));
}

// pintando os pixels

function paintingPixels() {
  for (let i = 0; i < divPixel.length; i += 1) {
    divPixel[i].addEventListener('click', () => {
      divPixel[i].style.backgroundColor = document.querySelector('.selected').style.backgroundColor;
      saveDrawn();
    });
  }
}

// reseta o desenho

function clearPixels() {
  clear.addEventListener('click', () => {
    for (let index = 0; index < divPixel.length; index += 1) {
      divPixel[index].style.backgroundColor = 'white';
    }
  });
}

// armazena desenho

function setPaint() {
  localStorage.setItem('board', JSON.stringify(arrayPixel));
  for (let index = 0; index < divPixel.length; index += 1) {
    arrayPixel.push(divPixel[index].style.backgroundColor);
  }
}

function getPaint() {
  const getArray = JSON.parse(localStorage.getItem('pixelBoard'));
  if (getArray !== null) {
    for (let index = 0; index < divPixel.length; index += 1) {
      divPixel[index].style.backgroundColor = getArray[index];
    }
  } else {
    setPaint();
  }
}
// remove os pixels anteriores

function reset() {
  pixel.innerHTML = '';
  paintingPixels();
}

// muda o tamanho dos pixels conforme valor do input

function changeBorder() {
  creatButton.addEventListener('click', () => {
    if (creatPixel.value === '') {
      window.alert('Board inválido!');
    } else if (creatPixel.value < 5) {
      reset();
      pixels(5);
    } else if (creatPixel.value > 50) {
      reset();
      pixels(50);
    } else {
      reset();
      pixels(creatPixel.value);
    }
    localStorage.setItem('boardSize', JSON.stringify(creatPixel.value));
  });
}
// Pega os o tamanho dos pixels salvos nos storages e retorna ao recarregar a página

function storagePosition() {
  const position = JSON.parse(localStorage.getItem('boardSize'));
  if (position !== null) {
    size = JSON.parse(localStorage.getItem('boardSize'));
  } else {
    changeBorder();
  }
}

storagePosition();
pixels(size);
paintingPixels();
selected();
clearPixels();
getPaint();
changeBorder();
