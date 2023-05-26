fetch('/courses')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector('#courseTable tbody');

    data.forEach(course => {
      const row = document.createElement('tr');
      const idCell = document.createElement('td');
      const titleCell = document.createElement('td');
      const authorCell = document.createElement('td');
      const actionCell = document.createElement('td');
      const deleteButton = document.createElement('button');

      idCell.textContent = course.id;
      titleCell.textContent = course.title;
      authorCell.textContent = course.author;
      deleteButton.textContent = 'Delete';

      deleteButton.addEventListener('click', function() {
        deleteCourse(course.id, row);
      });

      actionCell.appendChild(deleteButton);
      row.appendChild(idCell);
      row.appendChild(titleCell);
      row.appendChild(authorCell);
      row.appendChild(actionCell);

      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

fetch('/users')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector('#userTable tbody');

    data.forEach(user => {
      const row = document.createElement('tr');
      const usernameCell = document.createElement('td');
      const nameCell = document.createElement('td');
      const actionCell = document.createElement('td');
      const deleteButton = document.createElement('button');

      usernameCell.textContent = user.username;
      nameCell.textContent = user.name;
      deleteButton.textContent = 'Delete';

      deleteButton.addEventListener('click', function() {
        deleteUser(user.username, row);
      });

      actionCell.appendChild(deleteButton);
      row.appendChild(usernameCell);
      row.appendChild(nameCell);
      row.appendChild(actionCell);

      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

function deleteUser(username, row) {
  fetch(`/users/${username}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        row.remove();
        console.log('User deleted successfully!');
      } else {
        console.log('Error deleting user.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function deleteCourse(courseId, row) {
  fetch(`/courses/${courseId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        row.remove();
        console.log('Course deleted successfully!');
      } else {
        console.log('Error deleting course.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
