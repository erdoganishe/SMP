window.onload = async function () {
  const dishes = [];

  //get food names
  const response = await fetch("http://localhost:3500/api/food", { method: "GET" });// add "POST", "PUT"...
  const jsonData = await response.json();
  //console.log(jsonData);
  jsonData.forEach(data => dishes.push({ name: data.name, path: data._id }));
  //console.log(dishes);
  // get array of img on page
  const images = [];
  for (let i = 1; i <= 12; i++) {
    const image = document.querySelector(`img[alt="Image ${i}"]`);
    if (image) {
      images.push(image);
      image.src = `img/front_img/${dishes[i - 1].path}.jpg`;
    }
  }



  let results = dishes;
  //set default text
  const textBelowImages = document.querySelectorAll('.text-below-image');
  for (let i = 0; i < textBelowImages.length; i++) {
    textBelowImages[i].innerHTML = dishes[i].name;
  }

  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');

  let currentFirst = 0;

  //previous button press event

  prevButton.addEventListener('click', function () {
    currentFirst = currentFirst - 12 + results.length;
    currentFirst = currentFirst % results.length;

    for (let i = 0; i < 12; i++) {

      images[i].src = `img/front_img/${results[(currentFirst + i) % results.length].path}.jpg`;
      textBelowImages[i].innerHTML = results[(currentFirst + i) % results.length].name;

    }
  });

  //next button press event

  nextButton.addEventListener('click', function () {
    currentFirst = currentFirst + 12;
    currentFirst = currentFirst % results.length;

    for (let i = 0; i < 12; i++) {

      images[i].src = `img/front_img/${results[(currentFirst + i) % results.length].path}.jpg`;
      textBelowImages[i].innerHTML = results[(currentFirst + i) % results.length].name;

    }
  });


  const findInput = document.getElementById('find-input');

  findInput.addEventListener('input', () => {
    for (let i = 0; i < 12; i++) {
      textBelowImages[i].style.fontSize = '28px'
      images[i].style.display = 'inline';
    }
    const searchQuery = findInput.value.toLowerCase();
    results = dishes.filter(dish => dish.name.toLowerCase().includes(searchQuery));
    console.log(results.length ? results : 'hui');
    if (results.length == 0) {
      for (let i = results.length; i < 12; i++) {
        images[i].style.display = 'none';
        textBelowImages[i].style.fontSize = '0'
      }
      images[0].style.display = 'inline';
      images[0].src = `img/notfound.png`;
    }
    else {
      for (let i = 0; i < 12; i++) {
        images[i].src = `img/front_img/${results[(currentFirst + i) % results.length].path}.jpg`;
        textBelowImages[i].innerHTML = results[(currentFirst + i) % results.length].name;
      }
      if (results.length < 12) {
        for (let i = results.length; i < 12; i++) {
          images[i].style.display = 'none';
          textBelowImages[i].style.fontSize = '0'
        }
      }
    }
  });
  // Отримуємо всі картинки на сторінці
  // Додаємо обробник події "click" до кожної картинки
  images.forEach((image, i) => {
    image.addEventListener('click', () => {
      // Переходимо на нову сторінку та передаємо змінну dishes[i]._id у параметрі URL
      window.location.href = `recipe.html?id=${dishes[i+currentFirst].path}`;
    });
  });

};