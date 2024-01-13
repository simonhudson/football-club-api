import express from 'express';
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

import players from './routes/players';
app.get('/', (_, res) => res.send('Hello World!'));
app.use('/players', players);

app.listen(PORT, () => console.log('Server Listening on PORT:', PORT));

module.exports = app;
