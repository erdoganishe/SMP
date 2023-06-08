window.onload = async function () {
    //const numberOfFood = '645032f291c28a8ab5d7ddd7';
    //645032f291c28a8ab5d7ddd7
    //const numberOfRecipe = '645143264b759c5faf4eb1f3';
    // Отримуємо значення параметру id з URL
    const searchParams = new URLSearchParams(window.location.search);
    const numberOfFood = searchParams.get('id');
    const historyExt = searchParams.get('hisId');
    const stepExt = searchParams.get('stepId');
    const mainExt = searchParams.get('mainId');
    console.log(numberOfFood);
    console.log(historyExt);
    console.log(stepExt);
    console.log(mainExt);

    //console.log(id); // виведе значення параметру id

    // get data from db
    // const response = await fetch(`http://localhost:3500/api/recipe/${numberOfRecipe}`);// add "POST", "PUT"...
    // const jsonData = await response.json();
    const response2 = await fetch(`/api/food_recipe/${numberOfFood}`);// add "POST", "PUT"...
    const jsonData2 = await response2.json();
    console.log(jsonData2);
    
    const hardSpan = document.getElementById("hard-span");
    const timeSpan = document.getElementById("time-span");
    const paragraphs = document.getElementsByTagName("p");
    const images = document.getElementsByClassName("food-img");
    images[0].src = `img/receipt_db/${numberOfFood}/history${historyExt}`;

    // dont work(hm, why?)))) CHANGE IT !!!!!!!!!!
    images[1].src = `img/front_img/${numberOfFood}${mainExt}`;

    images[2].src = `img/receipt_db/${numberOfFood}/step${stepExt}`;

    // Задати внутрішній HTML для елементів з id
    hardSpan.innerHTML = jsonData2.difficulty;
    timeSpan.innerHTML = jsonData2.time;
    const h2 = document.querySelector('h2');
    h2.innerHTML = jsonData2.name;
    document.title = `Food dictionary - ${jsonData2.name}`;
    // Задати внутрішній HTML для елементів <p>
    for (let i = 0; i < jsonData2.steps.length; i++) {
        paragraphs[i].innerHTML = jsonData2.steps[i];
    }
};