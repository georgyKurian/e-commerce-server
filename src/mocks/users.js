import Usermodel from "../models/User";

const user1 = new Usermodel({
  id: 1,
  username: "geo",
  email: "geo@email.com",
  role: "admin"
});

const user2 = new Usermodel({
  id: 2,
  username: "geo2",
  email: "geo2@email.com",
  role: "user"
});

const users = [user1.getData(), user2.getData()];

export default users;
