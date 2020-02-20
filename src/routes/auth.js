import AuthentificationService from '../service/AuthenticationService';
import EmailService from '../service/EmailService';
import { UserModel } from '../models/User';

export default (app) => {
  app.post('/v1/auth', async (req, res) => {
    if (req.user) {
      res.send(req.user.data).end();
    } else {
      res.status(401).end();
    }
  });

  app.post('/v1/login', async (req, res) => {
    const { email } = req.body;
    if (!(email && email.split('@').length === 2)) {
      res.status(400).end();
    }
    UserModel.findOne({ email }, async (err, user) => {
      if (err) throw err;
      if (!user) {
        UserModel.create({
          username: email.split('@')[0],
          email,
          role: 'customer',
        }).then((newUser) => {
          AuthentificationService.generate(newUser).then((token) => {
            console.log('Created a new user: ', newUser);
            EmailService.sendEmail(newUser, token);
            res.send({ token }).end();
          });
        });
      } else {
        AuthentificationService.generate(user).then((token) => {
          console.log('Created a new user: ', user);
          EmailService.sendEmail(user, token);
          res.send({ token }).end();
        });
      }
    });
  });
};
