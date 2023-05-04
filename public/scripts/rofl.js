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
        const x1 = coordinateInputs[0].value;
        const y1 = coordinateInputs[1].value;
        const x2 = coordinateInputs[2].value;
        const y2 = coordinateInputs[3].value;

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

    // Додаємо обробник події введення координат для кожного інпуту
    coordinateInputs.forEach(input => {
        input.addEventListener('input', handleCoordinateInput);
    });




});