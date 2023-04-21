window.onload = function() {

    const dishes = [
        "Борщ",
        "Мазурики",
        "Сало",
        "Судак по-київськи",
        "Капусняк запорізький",
        "Перекладенець",
        "Домашні ковбаси",
        "Вергуни",
        "Холодець",
        "Торт «Київський»",
        "Варя гуцульська",
        "Млинці по-чернігівськи",
        "Крученики м’ясні",
        "Пляцки львівські",
        "Полядвиця",
        "Пиріжки з калиною",
        "Деруни житомирські",
        "Котлети по-київськи",
        "Білі гриби по-гуцульськи",
        "Одеські биточки з бичків",
        "Печеня з грибами",
        "Юшка по-миколаївськи",
        "Банош",
        "Баклажани по-херсонськи і баклажанна ікра",
        "Полтавські галушки",
        "Дніпровський форшмак і фірмова уха",
        "Вареники",
        "Вінницький бігос і фляки",
        "Голубці",
        "М'ясний рулет по-луганськи"
      ];
      
    const images = [];
    for (let i = 1; i <= 12; i++) {
        const image = document.querySelector(`img[alt="Image ${i}"]`);
        if (image) {
            images.push(image.getAttribute("src"));
        }
    }
    const imageNumbers = images.map(image => Number(image.match(/\d+/)[0]));
    const textBelowImages = document.querySelectorAll('.text-below-image');
    for (let i = 0; i < textBelowImages.length; i++) {
      textBelowImages[i].innerHTML = dishes[imageNumbers[i] - 1];
    }

};