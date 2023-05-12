document.addEventListener("DOMContentLoaded", function () {
    let dataArray = {};
    // Назва страви, складність, час, історія, інгрідієнти, степи, висновок 
    const saveButton = document.querySelector('.save-button');

    //formImage 1
    const form = document.getElementById('uploadForm1')
    const sendFile1 = async (dataArray1) => {
        //  imgReady[0] = true;
        // Object 
        const myFiles = document.getElementById('myFiles').files
        const formData = new FormData()

        const tmp = [];
        Object.keys(myFiles).forEach(key => {
            formData.append(myFiles.item(key).name, myFiles.item(key));
            tmp.push(myFiles.item(key).name);
        })

        dataArray1.pathNames = tmp;

        const response = await fetch('http://localhost:3500/newRecipe', {
            method: 'POST',
            body: formData
        })
        const json = await response.json();
        const response2 = await fetch('http://localhost:3500/newRecipeArray', {
            method: 'POST',
            body: JSON.stringify(dataArray1),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json2 = await response2.json();
    }




    const inputArray = document.querySelectorAll('input');



    saveButton.addEventListener("click", function () {
        //console.log(inputArray);

        if (inputArray[1].value != "") {
            dataArray.name = (inputArray[0].value);
        } else {
            alert("Введіть назву блюда"); return;
        }

        const selectElement = document.querySelector('select');
        const selectedOptionText = selectElement.options[selectElement.selectedIndex].value;
        dataArray.difficulty = (selectedOptionText);

        if (inputArray[2].value != "") {
            dataArray.time = (inputArray[1].value);
        } else {
            alert("Введіть час приготування блюда"); return;
        }

        if (inputArray[3].value != "") {
            dataArray.history = (inputArray[2].value);
        } else {
            alert("Введіть історію блюда"); return;
        }

        const textareas = document.querySelectorAll('.ingridient-input');
        let formattedString = '';
        textareas.forEach(textarea => {
            const lines = textarea.value.split('\n');
            const formattedLines = lines.join('<br>');
            formattedString += formattedLines + '<br>';
        });

        if (formattedString != "") {
            dataArray.ingridients = (formattedString);
        } else {
            alert("Введіть інгрідієнти блюда"); return;
        }

        dataArray.steps = [];
        for (let i = 4; i < inputArray.length - 1; i++) {
            if (inputArray[i].value != "") { dataArray.steps.push(inputArray[i].value); }
        }

        if (inputArray[inputArray.length - 1].value != "") {
            dataArray.conclusion = (inputArray[inputArray.length - 1].value);
        } else {
            alert("Введіть висновок блюда"); return;
        }

        console.log(dataArray);

        sendFile1(dataArray);
    });
});