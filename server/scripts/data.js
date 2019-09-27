import faker from "faker";

export const users = (() => {
  const userList = [];

  userList.push({
    username: "admin",
    email: "admin@admin.com",
    role: "admin"
  });

  for (let id = 2; id <= 100; id += 1) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    userList.push({
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      role: "customer"
    });
  }
  return userList;
})();

export const products = (() => {
  const productList = [];

  for (let id = 1; id <= 30; id += 1) {
    productList.push({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      images: [faker.image.image(1280, 720, false)]
    });
  }
  return productList;
})();
