const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.get('^/$|index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/login(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/regpage', 'login.html'));
});

app.get('/registration(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/regpage', 'registration.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
