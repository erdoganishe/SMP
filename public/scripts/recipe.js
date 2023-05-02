window.onload = async function () {
    const numberOfRecipe = '645143264b759c5faf4eb1f3';

    // get data from db
    const dataArray = [];
    const response = await fetch(`http://localhost:3500/api/recipe/${numberOfRecipe}`);// add "POST", "PUT"...
    const jsonData = await response.json();
    
    //push data to array CHANGE IT !!!!!!!!!!
    dataArray.push(jsonData.difficulty);
    dataArray.push(jsonData.time);
    jsonData.steps.forEach(step => dataArray.push(step));

    console.log(dataArray);

    const hardSpan = document.getElementById("hard-span");
    const timeSpan = document.getElementById("time-span");
    const paragraphs = document.getElementsByTagName("p");
    const images = document.getElementsByClassName("food-img");
    images[0].src = `img/receipt_db/${numberOfRecipe}/history.png`;
    
    // dont work(hm, why?)))) CHANGE IT !!!!!!!!!!
    images[1].src = `img/front_img/${numberOfRecipe}.jpg`;

    images[2].src = `img/receipt_db/${numberOfRecipe}/step.png`;
    
    // Задати внутрішній HTML для елементів з id
    hardSpan.innerHTML = dataArray[0];
    timeSpan.innerHTML = dataArray[1];

    // Задати внутрішній HTML для елементів <p>
    for (let i = 0; i < paragraphs.length; i++) {
        paragraphs[i].innerHTML = dataArray[i+2];
    }
};