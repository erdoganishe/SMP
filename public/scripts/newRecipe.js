document.addEventListener("DOMContentLoaded", async function () {
    const accessToken = localStorage.getItem('accessToken');
    const name = localStorage.getItem('nameUser');
  
    if (!name || !accessToken) window.location.href = '/privatePage';
  
  
    const response = await fetch(`/api/user/${name}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    //console.log(response);
    const data = await response.json().catch(err => window.location.href = '/privatePage');
  
    if (response.ok) {
      //localStorage.setItem('accessToken', data.accessToken);
      //;
      //console.log(data);
    } else {
  
      alert(data.message ?? "Error. Try again later");
    }
  
    
  
    const userdataArray =
    {
      username: data.username,
      userrole: data.roles
    };
    if(!userdataArray.userrole.Editor) window.location.href = '/privatePage';

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

        const response = await fetch('/newRecipe', {
            method: 'POST',
            body: formData
        })
        const json = await response.json();
        const response2 = await fetch('/newRecipeArray', {
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
        console.log(inputArray);

        if (inputArray[2].value != "") {
            dataArray.name = (inputArray[1].value);
        } else {
            alert("Введіть назву блюда"); return;
        }

        const selectElement = document.querySelector('select');
        const selectedOptionText = selectElement.options[selectElement.selectedIndex].value;
        dataArray.difficulty = (selectedOptionText);

        if (inputArray[3].value != "") {
            dataArray.time = (inputArray[2].value);
        } else {
            alert("Введіть час приготування блюда"); return;
        }

        if (inputArray[4].value != "") {
            dataArray.history = (inputArray[3].value);
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
        for (let i = 5; i < inputArray.length - 1; i++) {
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