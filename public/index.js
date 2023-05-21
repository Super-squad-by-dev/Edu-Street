const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = loginForm.elements.username.value;
  const password = loginForm.elements.password.value;

  fetch('/users.json')
    .then(response => response.json())
    .then(users => {
      const user = users.find(user => user.username === username && user.password === password);
      if (user) {
        localStorage.setItem('username', username); // Store the username in localStorage
        window.location.replace('/home.html');
      } else {
        alert('Invalid username or password');
      }
    })
    .catch(error => console.error(error));
});
