import faker from "faker";

export default (() => {
  const userList = [];

  userList.push({
    username: "admin",
    email: "admin@admin.com",
    role: "admin"
  });

  for (let id = 2; id <= 5; id += 1) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    userList.push({
      name: {
        first: faker.name.firstName(),
        last: faker.name.lastName()
      },
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      role: "customer"
    });
  }
  return userList;
})();
