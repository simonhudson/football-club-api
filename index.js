const express = require('express');
const players = require('./routes/players');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Server Listening on PORT:', PORT));

app.use('/players', players);

module.exports = app;

// index.js
// const express = require('express');

// const app = express();
// const PORT = 4000;

// app.listen(PORT, () => {
// 	console.log(`API listening on PORT ${PORT} `);
// });

// app.get('/', (req, res) => {
// 	res.send('Hey this is my API running 🥳');
// });

// app.get('/about', (req, res) => {
// 	res.send('This is my about route..... ');
// });

// // Export the Express API
// module.exports = app;
