document.addEventListener("DOMContentLoaded", function () {
  // Отримуємо input та лейбл за допомогою їхніх класів
  const coordinateInputs = document.querySelectorAll('.coordinate-input');
  const outputLabel = document.querySelector('.output');

  // Функція для перевірки правильності введених координат
  function isValidCoordinate(coordinate) {
    // Координати можуть бути в форматі "dd", "dd.dd", або "dd:mm:ss.ss" (де "d" - градуси, "m" - хвилини, "s" - секунди)
    // Регулярний вираз для перевірки формату координат: від -90.0 до 90.0 градусів
    const regex = /^-?([1-8]?[1-9]|[1-9]0)\.\d{1,6}$/;
    return regex.test(coordinate);
  }

  // Функція для переведення координат з градусів у радіани
  function toRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  // Функція для обчислення відстані між двома точками за їхніми координатами
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadiusKm = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const lat1Rad = toRadians(lat1);
    const lat2Rad = toRadians(lat2);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;
    return distance;
  }

  // Функція для обробки події введення координат в інпут
  function handleCoordinateInput() {
    const regex = /[.]/;
    const x1 = !regex.test(coordinateInputs[0].value) ? coordinateInputs[0].value + ".0" : coordinateInputs[0].value;
    const y1 = !regex.test(coordinateInputs[1].value) ? coordinateInputs[1].value + ".0" : coordinateInputs[1].value;
    const x2 = !regex.test(coordinateInputs[2].value) ? coordinateInputs[2].value + ".0" : coordinateInputs[2].value;
    const y2 = !regex.test(coordinateInputs[3].value) ? coordinateInputs[3].value + ".0" : coordinateInputs[3].value;

    // Перевіряємо, чи є введені координати правильними
    if (isValidCoordinate(x1) && isValidCoordinate(y1) && isValidCoordinate(x2) && isValidCoordinate(y2)) {
      // Переводимо координати в числовий формат та обчислюємо відстань
      const lat1 = parseFloat(x1);
      const lon1 = parseFloat(y1);
      const lat2 = parseFloat(x2);
      const lon2 = parseFloat(y2);
      const distance = calculateDistance(lat1, lon1, lat2, lon2);
      // Виводимо результат в innerHTML лейбла
      outputLabel.innerHTML = distance.toFixed(2) + ' км';
    }
    else {
      // Якщо хоча б одна з введених координат не є правильною, то виводимо повідомлення про помилку
      outputLabel.innerHTML = 'Некоректні координати';
    }
  }
  coordinateInputs.forEach(input => {
    input.addEventListener('input', handleCoordinateInput);
  });

  const colors = {
    black: '#000000',
    white: '#FFFFFF',
    red: '#FF0000',
    green: '#00FF00',
    blue: '#0000FF',
    yellow: '#FFFF00',
    pink: '#FFC0CB',
    purple: '#800080',
    orange: '#FFA500',
    teal: '#008080',
    navy: '#000080',
    gray: '#808080',
    silver: '#C0C0C0',
    gold: '#FFD700',
    maroon: '#800000',
    olive: '#808000',
    fuchsia: '#FF00FF',
    lime: '#00FF00',
    aqua: '#00FFFF',
    indigo: '#4B0082',
    chocolate: '#D2691E',
    // Додані кольори
    aliceblue: '#F0F8FF',
    antiquewhite: '#FAEBD7',
    aquamarine: '#7FFFD4',
    azure: '#F0FFFF',
    beige: '#F5F5DC',
    bisque: '#FFE4C4',
    blanchedalmond: '#FFEBCD',
    blueviolet: '#8A2BE2',
    brown: '#A52A2A',
    burlywood: '#DEB887',
    cadetblue: '#5F9EA0',
    chartreuse: '#7FFF00',
    coral: '#FF7F50',
    cornflowerblue: '#6495ED',
    cornsilk: '#FFF8DC',
    crimson: '#DC143C',
    cyan: '#00FFFF',
    darkblue: '#00008B',
    darkcyan: '#008B8B',
    darkgoldenrod: '#B8860B',
    darkgray: '#A9A9A9',
    darkgrey: '#A9A9A9',
    darkgreen: '#006400',
    darkkhaki: '#BDB76B',
    darkmagenta: '#8B008B',
    darkolivegreen: '#556B2F',
    darkorange: '#FF8C00',
    darkorchid: '#9932CC',
    darkred: '#8B0000',
    darksalmon: '#E9967A',
    darkseagreen: '#8FBC8F',
    darkslateblue: '#483D8B',
    darkslategray: '#2F4F4F',
    darkslategrey: '#2F4F4F',
    darkturquoise: '#00CED1',
    darkviolet: '#9400D3',
    deeppink: '#FF1493',
    deepskyblue: '#00BFFF',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1E90FF',
    firebrick: '#B22222',
    floralwhite: '#FFFAF0',
    forestgreen: '#228B22',
    gainsboro: '#DCDCDC',
    ghostwhite: '#F8F8FF',
    goldenrod: '#DAA520'
  };


  const input = document.querySelector('#color-input');
  const output = document.querySelector('#color-output');

  input.addEventListener('input', function () {
    const colorName = input.value.toLowerCase().trim();

    if (colorName in colors) {
      const colorCode = colors[colorName];
      output.textContent = colorCode;
      output.style.backgroundColor = colorCode;
    } else {
      output.textContent = 'Invalid color name';
      output.style.backgroundColor = '';
    }
  });


  const tinput = document.querySelector('#time-input');
  const toutput = document.querySelector('#time-output');

  tinput.addEventListener('input', () => {
    const value = parseInt(tinput.value);
    if (Number.isInteger(value) && value >= 0 && value <= 59) {
      toutput.textContent = Math.floor(value / 15) + 1;
    } else {
      toutput.textContent = 'Неправильні дані';
    }
  });
  const leftoutput = document.querySelector('#time-left-output');
  function displaySecondsLeft() {
    const now = new Date();
    const remainingSeconds = (60 - now.getMinutes() - 1) * 60 + (60 - now.getSeconds());
    leftoutput.innerHTML = remainingSeconds;
  }

  setInterval(displaySecondsLeft, 1000);



});
