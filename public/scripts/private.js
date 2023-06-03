window.addEventListener('load', async function () {
  const accessToken = localStorage.getItem('accessToken');
  const name = localStorage.getItem('nameUser');

  if (!name || !accessToken) window.location.href = '/regpage/login';


  const response = await fetch(`/api/user/${name}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  //console.log(response);
  const data = await response.json().catch(err => window.location.href = '/regpage/login');

  if (response.ok) {
    //localStorage.setItem('accessToken', data.accessToken);
    //;
    //console.log(data);
  } else {

    alert(data.message ?? "Error. Try again later");
  }

  

  const dataArray =
  {
    username: data.username,
    userrole: data.roles
  };
  const username = document.querySelector('#username');
  const userrole = document.querySelector('#userrole');

  // Перевірка наявності елементів у DOM
  if (username && userrole) {
    // Встановлення інформації користувача
    username.innerHTML = dataArray.username;
    userrole.innerHTML = Object.keys(dataArray.userrole).join(', ');
  }

  const loginButton = document.getElementById('logout-btn');

  loginButton.addEventListener('click', async () => {
    const responseLogOut = await fetch(`/logout`);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('nameUser');

    window.location.href = '/regpage/login';
  });


  const nameInput = document.querySelector('.name-input');
  //console.log(data.profile.real_name);
  nameInput.value = data.profile?.real_name ?? "Noname";
  const editBtn = document.getElementById('edit-btn');
  const uploadForm = document.getElementById('uploadForm1');
  const uploadButton = document.getElementById('button-upload-avatar');

  function toggleFormVisibility() {
    uploadForm.style.display = uploadForm.style.display === 'none' ? 'block' : 'none';
    uploadButton.style.display = uploadButton.style.display === 'none' ? 'block' : 'none';
  }
  // Функція, яка заблоковує або дозволяє редагування інпуту
  function toggleInputEditability() {
    nameInput.disabled = !nameInput.disabled;
  }

  // Функція, яка змінює напис на кнопці
  async function toggleButtonText() {
    if (!nameInput.disabled) {
      editBtn.textContent = 'Зберігти зміни';
    } else {
      console.log(nameInput.value);
      const response1 = await fetch(`/api/user`, {
        method: 'PUT',
        body: JSON.stringify({
          "rena": nameInput.value

        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      //console.log(response);
      const data1 = await response1.json();
      this.location.reload();
      editBtn.textContent = 'Редагувати';
    }
  }
  toggleInputEditability();
  toggleFormVisibility();

  // Обробник події натискання на кнопку "Редагувати"
  editBtn.addEventListener('click', function () {
    toggleInputEditability();
    toggleButtonText();
    toggleFormVisibility();
  });
  const avatar = document.querySelector(".avatar-div img");
  avatar.src = `img/profiles/${data._id}/avatar.png`;

  const buttonUploadAvatar = document.getElementById("button-upload-avatar");

  buttonUploadAvatar.addEventListener("click", async () => {
    jsonData = { "uId": `${data._id}`, "isAvatar": true }
    const myFiles = document.getElementById('myFiles').files[0];

    const formData = new FormData();

    formData.append('file', myFiles);
    formData.append('jsonData', JSON.stringify(jsonData));
    const fileUpResponce = await fetch('/imgUpload', {
      method: 'POST',
      body: formData
    });
    const fileUpData = await fileUpResponce.json();
    console.log(fileUpData);
  });






});