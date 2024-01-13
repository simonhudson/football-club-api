import express from 'express';
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

import players from './routes/players';

app.use('/players', players);

app.listen(PORT, () => console.log('Server Listening on PORT:', PORT));

module.exports = app;
