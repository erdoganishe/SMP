window.onload = async function () {
  const dishes = [];
  const extensions = [".jpg", ".png", ".jpeg"]

  //get food names
  const response = await fetch("http://localhost:3500/api/food_recipe", { method: "GET" });// add "POST", "PUT"...
  const jsonData = await response.json();
  //console.log(jsonData);
  jsonData.forEach(data => {
    console.log(data.extImg.main);
    dishes.push({
      name: data._doc.name,
      path: data._doc._id,
      ext: {
        main: data.extImg.main === 'nothing' ? '.jpg' : data.extImg.main,
        history: data.extImg.history === 'nothing' ? '.jpg' : data.extImg.history,
        step: data.extImg.step === 'nothing' ? '.jpg' : data.extImg.step
    }
    });
  });
  //console.log(dishes);
  // get array of img on page

  // async function getImageSrcByName(name) {
  //   const extensions = [".jpg", ".png", ".jpeg"]; // valid extensions
  //   for (let i = 0; i < extensions.length; i++) {
  //     const url = `${name}${extensions[i]}`;
  //     const response = await fetch(url, { method: "HEAD" });
  //     if (response.ok && response.status !== 404) {
  //       return url;
  //     }
  //   }
  //   return null;
  // }

  const images = [];

  for (let i = 1; i <= 12; i++) {
    const image = document.querySelector(`img[alt="Image ${i}"]`);
    if (image) {
      images.push(image); // 
      image.src = `img/front_img/${dishes[i - 1].path}${dishes[i - 1].ext.main}`;
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

      images[i].src = `img/front_img/${results[(currentFirst + i) % results.length].path}${results[(currentFirst + i) % results.length].ext.main}`;
      textBelowImages[i].innerHTML = results[(currentFirst + i) % results.length].name;

    }
  });

  //next button press event

  nextButton.addEventListener('click', function () {
    currentFirst = currentFirst + 12;
    currentFirst = currentFirst % results.length;

    for (let i = 0; i < 12; i++) {

      images[i].src = `img/front_img/${results[(currentFirst + i) % results.length].path}${results[(currentFirst + i) % results.length].ext.main}`;
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
        images[i].src = `img/front_img/${results[(currentFirst + i) % results.length].path}${results[(currentFirst + i) % results.length].ext.main}`;
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
  for (let i = 0; i < 12; i++) {
    images[i].addEventListener('click', () => {
      window.location.href = `recipe.html?id=${results[(i + currentFirst) % results.length].path}&mainId=${results[(i + currentFirst) % results.length].ext.main}&hisId=${results[(i + currentFirst) % results.length].ext.history}&stepId=${results[(i + currentFirst) % results.length].ext.step}`;
    });
  }

};

