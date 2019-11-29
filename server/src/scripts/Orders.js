import faker from "faker";

export const Orders = ((productList,userList) => {
  const orderList = [];

  orderList.push({
    username: "admin",
    email: "admin@admin.com",
    role: "admin"
  });

  for (let id = 2; id <= 5; id += 1) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    orderList.push({
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      role: "customer"
    });
  }
  return orderList;
})();
