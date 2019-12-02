import faker from "./Faker";

export default (productList, userList) => {
  const orderList = [];

  for (let id = 2; id <= 5; id += 1) {
    const fromDate = new Date();
    const toDate = new Date(
      new Date().setFullYear(new Date().getFullYear() - 1)
    );

    const user = faker.random.arrayElement(userList);
    console.log(user);
    orderList.push({
      customer: user._id,
      timestamp: faker.date.between(fromDate, toDate).getTime(),
      products: faker.custom.randomSubArray(productList),
      contact: {
        fullName: faker.fake("{{name.firstName}} {{name.lastName}}"),
        phoneNumber: faker.phone.phoneNumber("###-###-####")
      },
      shippingAddress: {
        country: faker.address.country(),
        city: faker.address.city(),
        addressLine1: faker.address.streetAddress(),
        addressLine2: faker.address.secondaryAddress(),
        postalCode: faker.address.zipCode()
      }
    });
  }
  return orderList;
};
