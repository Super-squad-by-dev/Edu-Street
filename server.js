const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { createCanvas, loadImage } = require('canvas');
const jsPDF = require('jspdf');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/convert', async (req, res) => {
  const { html } = req.query;

  const dom = new JSDOM(html);
  const { document } = dom.window;

  const canvas = createCanvas(document.documentElement.scrollWidth, document.documentElement.scrollHeight);
  const context = canvas.getContext('2d');

  const svgData = new XMLSerializer().serializeToString(document);

  const image = await loadImage('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData));

  context.drawImage(image, 0, 0);

  const dataURL = canvas.toDataURL('image/png');

  const pdf = new jsPDF();
  pdf.addImage(dataURL, 'PNG', 0, 0);

  const pdfData = pdf.output();
  res.contentType('application/pdf');
  res.send(pdfData);
});

app.get('/courses', (req, res) => {
  const coursesPath = path.join(__dirname, 'public', 'courses.json');
  const coursesData = fs.readFileSync(coursesPath, 'utf8');
  const courses = JSON.parse(coursesData);
  res.json(courses);
});

app.delete('/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id);
  const coursesPath = path.join(__dirname, 'public', 'courses.json');
  const coursesData = fs.readFileSync(coursesPath, 'utf8');
  let courses = JSON.parse(coursesData);
  const updatedCourses = courses.filter(course => course.id !== courseId);
  fs.writeFileSync(coursesPath, JSON.stringify(updatedCourses, null, 2));
  res.sendStatus(200);
});

app.post('/register', (req, res) => {
  const usersPath = path.join(__dirname, 'public', 'users.json');
  const usersData = fs.readFileSync(usersPath, 'utf8');
  let users = JSON.parse(usersData);
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    name: req.body.name
  };
  users.push(newUser);
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  res.sendStatus(200);
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/register.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.js'));
});

app.get('/users', (req, res) => {
  const usersPath = path.join(__dirname, 'public', 'users.json');
  const usersData = fs.readFileSync(usersPath, 'utf8');
  const users = JSON.parse(usersData);
  res.json(users);
});

app.delete('/users/:username', (req, res) => {
  const username = req.params.username;
  const usersPath = path.join(__dirname, 'public', 'users.json');
  const usersData = fs.readFileSync(usersPath, 'utf8');
  let users = JSON.parse(usersData);
  const updatedUsers = users.filter(user => user.username !== username);
  fs.writeFileSync(usersPath, JSON.stringify(updatedUsers, null, 2));
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


