document.addEventListener("DOMContentLoaded", function () {
    let dataArray = [];
    // Назва страви, складність, час, історія, інгрідієнти, степи, висновок 
    let imgReady = [false, false, false];
    const saveButton = document.querySelector('.save-button');

    //formImage 1
    const form = document.getElementById('uploadForm1')
    const sendFile1 = async (dataArray1) => {
        imgReady[0] = true;
        // Object 
        const myFiles = document.getElementById('myFiles').files
        const formData = new FormData()
        Object.keys(myFiles).forEach(key => {
            formData.append(myFiles.item(key).name, myFiles.item(key))
        })
        const response = await fetch('http://localhost:3500/newRecipe', {
            method: 'POST',
            body: formData
        })
        const json = await response.json();
        const response2 = await fetch('http://localhost:3500/newRecipeArray', {
            method: 'POST',
            body: formData
        })
    }
    
    // form.addEventListener('submit', (e) => {
    //     e.preventDefault()
    //     sendFiles()
    // })

    // const Images = document.querySelector('.food-img');
    // fileUploadbg1.addEventListener("change", (event) => {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => {
    //         //Тут дати новий src, я хз як ти це будеш робити 
    //         //Images[0].src ==
    //         imgReady[0] = true;
    //     };
    // });

    const buttonUploadBg2 = document.getElementById("button-upload-avatar-2");
    const fileUploadbg2 = document.getElementById("file-upload-2");

    buttonUploadBg2.addEventListener("click", () => {
        fileUploadbg2.click();
    });

    fileUploadbg2.addEventListener("change", (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            //Тут дати новий src, я хз як ти це будеш робити 
            //Images[0].src ==
            imgReady[1] = true;
        };
    });
    const buttonUploadBg3 = document.getElementById("button-upload-avatar-3");
    const fileUploadbg3 = document.getElementById("file-upload-3");

    buttonUploadBg3.addEventListener("click", () => {
        fileUploadbg3.click();
    });

    fileUploadbg3.addEventListener("change", (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            //Тут дати новий src, я хз як ти це будеш робити 
            //Images[0].src ==
            imgReady[2] = true;
        };
    });
    const inputArray = document.querySelectorAll('input');
    //console.log(inputArray);


    saveButton.addEventListener("click", function () {
        // for (let i = 0; i < 3; i++) {
        //     if (!imgReady[0]) {
        //         alert("Заповніть картинки!");
        //         return;
        //     }
        // }

        if (inputArray[1].value != "") { dataArray.push(inputArray[1].value); }
        else { alert("Введіть назву блюда"); return; }
        const selectElement = document.querySelector('select');
        const selectedOptionText = selectElement.options[selectElement.selectedIndex].value;
        dataArray.push(selectedOptionText);
        if (inputArray[2].value != "") { dataArray.push(inputArray[2].value); }
        else { alert("Введіть час приготування блюда"); return; }
        if (inputArray[3].value != "") { dataArray.push(inputArray[3].value); }
        else { alert("Введіть історію блюда"); return; }
        const textareas = document.querySelectorAll('.ingridient-input');
        let formattedString = '';
        textareas.forEach(textarea => {
            const lines = textarea.value.split('\n');
            const formattedLines = lines.join('<br>');
            formattedString += formattedLines + '<br>';
        });
        if (formattedString != "") { dataArray.push(formattedString); }
        else { alert("Введіть інгрідієнти блюда"); return; }

        for (let i = 6; i < inputArray.length - 1; i++) {
            if (inputArray[i].value != "") { dataArray.push(inputArray[i].value); }
        }
        if (inputArray[inputArray.length - 1].value != "") { dataArray.push(inputArray[inputArray.length - 1].value); }
        else { alert("Введіть висновок блюда"); return; }
        console.log(dataArray);

        sendFile1(dataArray);
    });
});