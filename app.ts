const express = require('express');
const app = express();
app.use(express.json());

const players = require('./routes/players');

const PORT = process.env.PORT || 3000;

app.use('/players', players);

app.listen(PORT, () => console.log('Server Listening on PORT:', PORT));
