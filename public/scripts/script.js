window.onload = async function () {
  const dishes = [];

  //get food names
  const response = await fetch("http://localhost:3500/food", { method: "GET" });// add "POST", "PUT"...
  const jsonData = await response.json();
  //console.log(jsonData);
  jsonData.forEach(data => dishes.push({ name: data.name, path: data._id }));
  console.log(dishes);
  // get array of img on page
  const images = [];
  for (let i = 1; i <= 12; i++) {
    const image = document.querySelector(`img[alt="Image ${i}"]`);
    if (image) {
      images.push(image);
      image.src = `img/front_img/${dishes[i - 1].path}.jpg`;
    }
  }

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
    currentFirst = currentFirst-12+dishes.length;
    currentFirst = currentFirst % dishes.length;

    for (let i = 0; i < 12; i++) {

      images[i].src = `img/front_img/${dishes[(currentFirst + i) % dishes.length].path}.jpg`;
      textBelowImages[i].innerHTML = dishes[(currentFirst + i) % dishes.length].name;

    }
  });

  //next button press event

  nextButton.addEventListener('click', function () {
    currentFirst = currentFirst+12;
    currentFirst = currentFirst % dishes.length;

    for (let i = 0; i < 12; i++) {

      images[i].src = `img/front_img/${dishes[(currentFirst + i) % dishes.length].path}.jpg`;
      textBelowImages[i].innerHTML = dishes[(currentFirst + i) % dishes.length].name;

    }
  });

};