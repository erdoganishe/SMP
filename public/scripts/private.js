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

  const editBtn = document.getElementById('edit-btn');

  // Функція, яка заблоковує або дозволяє редагування інпуту
  function toggleInputEditability() {
    nameInput.disabled = !nameInput.disabled;
  }

  // Функція, яка змінює напис на кнопці
  function toggleButtonText() {
    if (!nameInput.disabled) {
      editBtn.textContent = 'Зберігти зміни';
    } else {
      editBtn.textContent = 'Редагувати';
    }
  }
  toggleInputEditability();

  // Обробник події натискання на кнопку "Редагувати"
  editBtn.addEventListener('click', function () {
    toggleInputEditability();
    toggleButtonText();
  });
});