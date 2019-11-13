import AuthentificationService from "../service/AuthenticationService";
import EmailService from "../service/EmailService";
import { UserModel } from "../models/User";

export default app => {
  app.post("/v1/auth", async (req, res) => {
    res.status(req.user ? 200 : 401);
  });

  app.post("/v1/login", async (req, res) => {
    const { email } = req.body;
    if (!(email && email.split("@").length === 2)) {
      return res.status(400).end();
    }
    const user = await UserModel.findOne({ email });

    if (user) {
      const token = await AuthentificationService.generate(user);
      console.log("User exists. Generating a new token.");
      EmailService.sendEmail(user, token);
      res.status(200).end();
    } else {
      const newUser = await UserModel.create({
        username: email.split("@")[0],
        email,
        role: "customer"
      });

      const token = await AuthentificationService.generate(newUser);
      console.log("Created a new user: ", newUser);
      EmailService.sendEmail(newUser, token);
      res.status(200).end();
    }
  });
};
