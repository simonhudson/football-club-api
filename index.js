const express = require('express');
const players = require('./api/players');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Server Listening on PORT:', PORT));

app.use('/players', players);

module.exports = app;
