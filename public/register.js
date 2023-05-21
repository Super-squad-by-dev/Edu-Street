document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
  
    const user = {
      username: username,
      password: password,
      name: name
    };
  
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        if (response.ok) {
          alert('Registration successful!');
          window.location.href = '/index.html'; // Redirect to login page
        } else {
          alert('Registration failed!');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during registration!');
      });
  });
  