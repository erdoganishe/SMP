window.onload = function () {

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

  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');


  prevButton.addEventListener('click', function () {
    for (let i = 0; i < 12; i++) {

      let match = images[i].match(/img\/front_img\/(\d+)\.jpg/);
      match = parseInt(match[1], 10);
      match += dishes.length - 12;
      match = match % dishes.length;
      if (match == 0) { match = dishes.length; }
      images[i] = `img/front_img/${match}.jpg`;
      const image = document.querySelector(`img[alt="Image ${i + 1}"]`);
      image.src = images[i];

    }
    const imageNumbers2 = images.map(image => Number(image.match(/\d+/)[0]));
    for (let i = 0; i < textBelowImages.length; i++) {
      textBelowImages[i].innerHTML = dishes[imageNumbers2[i] - 1];
    }


  });

  nextButton.addEventListener('click', function () {
    for (let i = 0; i < 12; i++) {

      let match = images[i].match(/img\/front_img\/(\d+)\.jpg/);
      match = parseInt(match[1], 10);
      match += 12;
      match = match % dishes.length;
      if (match == 0) { match = dishes.length; }
      images[i] = `img/front_img/${match}.jpg`;
      const image = document.querySelector(`img[alt="Image ${i + 1}"]`);
      image.src = images[i];

    }

    const imageNumbers2 = images.map(image => Number(image.match(/\d+/)[0]));
    for (let i = 0; i < textBelowImages.length; i++) {
      textBelowImages[i].innerHTML = dishes[imageNumbers2[i] - 1];
    }

  });

};