const express = require('express');

const app = express();

let count = 0;

app.get('/', (req, res) => {
  count++;

  res.send(`Number of visits: ${count}`);
});

const port = 3000; 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
