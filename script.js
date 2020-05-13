"use strict"

window.addEventListener('DOMContentLoaded', function(event) {

const rusAlphabet = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я', 'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я', '.', ',', ' ', '!', '?'];
const engAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '@', '#', '$', '%', '&', '*', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '?', '~', '^', '_', '-', '+', '=', '.', ',', ' ', '/', '|'];

const magicSquares = [
  [16, 3, 2, 13, 5, 10, 11, 8, 9, 6, 7, 12, 4, 15, 14, 1],
  [1, 8, 13, 12, 14, 11, 2, 7, 4, 5, 16, 9, 15, 10, 3, 6],
  [1, 8, 11, 14, 12, 13, 2, 7, 6, 3, 16, 9, 15, 10, 5, 4],
  [1, 12, 7, 14, 8, 13, 2, 11, 10, 3, 16, 5, 15, 6, 9, 4],
  [7, 12, 1, 14, 2, 13, 8, 11, 16, 3, 10, 5, 9, 6, 15, 4]
];

let alphabetLength = rusAlphabet.length;
let squareLength = magicSquares[0].length;

let squareValueCounter = function(message, square) {
  let messageLength = message.length;
  let multiplayer = 0;
  let squareValueList = [];

  for (let i = 0; i < messageLength; i++) {
    let si = i % squareLength;
    if (i > squareLength - 1 && 0 === i % squareLength) {
      multiplayer += squareLength;
    };
    let currentSquareValue = square[si] + multiplayer - 1;
    let rest = (messageLength % squareLength);
    if (i >= messageLength - rest) {
      currentSquareValue = i;
    };
    squareValueList.push(currentSquareValue);
  };

  return squareValueList;
};

let encryptor = function(message) {
  let messageArray = Array.from(message);
  let messageLength = messageArray.length;
  let encryptedSymbolList = [];
  let encryptedMessage = '';

  let squareNumber = (message.length % 5) - 1;
  if (squareNumber < 0) squareNumber += magicSquares.length;
  let currentSquare = magicSquares[squareNumber];

  console.log(squareNumber);

  let shiftStep = messageLength % 13;

  let squareValue = squareValueCounter(message, currentSquare);

  for (let i = 0; i < messageLength; i++) {
    let currentSquareValue = squareValue[i];
    let currentMessageValue = messageArray[currentSquareValue];
    encryptedSymbolList.push(currentMessageValue);
  };

  for (let j = 0; j < messageLength; j++) {
    let currentListValue = encryptedSymbolList[j];

    for (let k = 0; k < alphabetLength; k++) {
      let sk = k + shiftStep;
      if (sk >= alphabetLength) {
        sk -= alphabetLength;
      };
      if (currentListValue === rusAlphabet[k]) {
        encryptedMessage += engAlphabet[sk];
      };
    };
  };

  squareNumber = engAlphabet[squareNumber * 10];
  shiftStep = engAlphabet[shiftStep * 2];
  encryptedMessage += String(squareNumber) + String(shiftStep);

  return encryptedMessage;
};

let excryptor = function(message) {
  let shiftStep;
  let squareNumber;
  let excryptedSymbolList = [];
  let excryptedMessage = '';
  let messageLength = message.length;
  let stepIndex = messageLength - 1;
  let squareIndex = stepIndex - 1;

  for (let i = 0; i < alphabetLength; i++) {
    if (message[stepIndex] === engAlphabet[i]) {
      shiftStep = i / 2;
    };
    if (message[squareIndex] === engAlphabet[i]) {
      squareNumber = i / 10;
    };
  };

  let currentSquare = magicSquares[squareNumber];
  message = message.slice(0, -2);

  for (let j = 0; j < messageLength; j++) {
    let currentMessageValue = message[j];

    for (let k = 0; k < alphabetLength; k++) {
      let sk = k - shiftStep;
      if (sk < 0) {
        sk += alphabetLength;
      };
      if (currentMessageValue === engAlphabet[k]) {
        excryptedSymbolList.push(rusAlphabet[sk]);
      };
    };
  };

  let squareValue = squareValueCounter(message, currentSquare);

  for (let l = 0; l < messageLength - 2; l++) {
    let minSquareValue = squareValue[l];
    let minListValue = excryptedSymbolList[l]

    for (let m = l + 1; m < messageLength; m++) {
      if (squareValue[m] < minSquareValue) {
        minSquareValue = squareValue[m];
        minListValue = excryptedSymbolList[m];
        let squareSwap = squareValue[l];
        let listSwap = excryptedSymbolList[l];
        squareValue[l] = minSquareValue;
        excryptedSymbolList[l] = minListValue;
        squareValue[m] = squareSwap;
        excryptedSymbolList[m] = listSwap;
      };
    };

    excryptedMessage += excryptedSymbolList[l];
  };

  return excryptedMessage;
};

let container = document.querySelector(".JS-container");
let inputBox = container.querySelector('.JS-input');
let outputBox = container.querySelector('.JS-output');
let doButton = container.querySelector('.JS-encrypt-button');
let undoButton = container.querySelector('.JS-excrypt-button');

doButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  let toEncrypt = inputBox.value;
  navigator.clipboard.writeText(encryptor(toEncrypt));
  alert(encryptor(toEncrypt) + '\r\n\r\nТекст зашифрованного сообщения скопирован в буфер обмена.');
  inputBox.value = '';
});

undoButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  let toExcrypt = outputBox.value;
  alert(excryptor(toExcrypt));
  outputBox.value = '';
});

});
