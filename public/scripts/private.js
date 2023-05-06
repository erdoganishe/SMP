window.addEventListener('load', function() {

    const dataArray = [
        {
          username: 'user1',
          userrole: 'Reader'
        }
      ];
    const username = document.querySelector('#username');
    const userrole = document.querySelector('#userrole');
  
    // Перевірка наявності елементів у DOM
    if (username && userrole) {
      // Встановлення інформації користувача
      username.innerHTML = dataArray[0].username;
      userrole.innerHTML = dataArray[0].userrole;
    }
  });
  