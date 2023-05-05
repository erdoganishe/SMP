const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login-btn');

loginButton.addEventListener('click', async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  const response = await fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (response.ok) {
    document.cookie = `refreshToken=${data.refreshToken}; HttpOnly`;
    localStorage.setItem('accessToken', data.accessToken);
    window.location.href = '/protected-page.html';
  } else {
    console.error(data.error);
  }
});