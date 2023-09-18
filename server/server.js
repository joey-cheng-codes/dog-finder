const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/', express.static(path.resolve(__dirname, '../build')));

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../build/output.css'));
// });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
});
