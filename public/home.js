const welcome = document.getElementById("welcome");

// Retrieve the username from localStorage
const username = localStorage.getItem('username');

if (username) {
  if (username=="Admin"){
    window.location.href='admin.html';
  }else{
    welcome.textContent = `Welcome, ${username}!`;
  }
  // Display welcome message to the user
  
} else {
  // Redirect the user to the login page if username is not found in localStorage
  window.location.replace('/login.html');
}

fetch("courses.json")
  .then(response => response.json())
  .then(courses => {
    const courseList = document.getElementById("course-list");
    courses.forEach(course => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const img = document.createElement("img");
      a.href = course.link;
      img.src = course.image;
      img.alt = course.title;

      if (course.availableFor && course.availableFor.includes(username)) { // Customize display for the logged-in user
        img.style.width = "300%";
        img.style.height = "auto";
      } else {
        img.style.width = "100%";
        img.style.height = "10%";
      }

      a.appendChild(img);
      li.appendChild(a);
      courseList.appendChild(li);
    });
  })
  .catch(error => console.error(error));


