import express from "express";

const app = express();
const port = 8055 ; //process.env.PORT

app.get('/', (req, res) => {
  res.send({ dateTime: new Date().toJSON() });
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}! http://localhost:${port}`);
});
