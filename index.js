const express = require('express');
const players = require('./routes/players');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use('/players', players);
app.listen(PORT, () => console.log('Server Listening on PORT:', PORT));

module.exports = app;
