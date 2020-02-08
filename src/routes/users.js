import { UserModel } from '../models/User';

export default (app) => {
  app.get('/', (req, res) => {
    res.send({ dateTime: new Date().toJSON() });
  });

  app.get('/v1/users', async (req, res) => {
    const users = (await UserModel.find()) || [];
    res.send(users);
  });

  app.get('/v1/users/:id', async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      console.log(user);
      if (user) {
        res.send(user);
      } else {
        res.status(400).end();
      }
    } catch (e) {
      res.status(404).end();
    }
  });

  app.post('/v1/users', (req, res) => {
    console.log(req.body);
    res.status(200).end();
  });

  app.put('/v1/users/:id', async (req, res) => {
    res.status(200).end();
  });

  app.delete('/v1/users/:id', (req, res) => {
    console.log(req.params.id);
    res.status(200).send();
  });
};
