window.onload = async function () {
    const numberOfFood = '645032f291c28a8ab5d7ddd7';
    const numberOfRecipe = '645143264b759c5faf4eb1f3';

    // get data from db
    const response = await fetch(`http://localhost:3500/api/recipe/${numberOfRecipe}`);// add "POST", "PUT"...
    const jsonData = await response.json();
    
    const hardSpan = document.getElementById("hard-span");
    const timeSpan = document.getElementById("time-span");
    const paragraphs = document.getElementsByTagName("p");
    const images = document.getElementsByClassName("food-img");
    images[0].src = `img/receipt_db/${numberOfRecipe}/history.png`;
    
    // dont work(hm, why?)))) CHANGE IT !!!!!!!!!!
    images[1].src = `img/front_img/${numberOfFood}.jpg`;

    images[2].src = `img/receipt_db/${numberOfRecipe}/step.png`;
    
    // Задати внутрішній HTML для елементів з id
    hardSpan.innerHTML = jsonData.difficulty;
    timeSpan.innerHTML = jsonData.time;

    // Задати внутрішній HTML для елементів <p>
    for (let i = 0; i < paragraphs.length; i++) {
        paragraphs[i].innerHTML = jsonData.steps[i];
    }
};