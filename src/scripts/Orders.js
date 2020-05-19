import faker from './Faker';

export default (userList, productList) => {
  const orderList = [];

  for (let id = 0; id <= 10; id += 1) {
    const fromDate = new Date();
    const toDate = new Date(
      new Date().setFullYear(new Date().getFullYear() - 1),
    );

    const user = faker.random.arrayElement(userList);
    orderList.push({
      customer: user._id,
      created_at: faker.date.between(fromDate, toDate).getTime(),
      status: 'created',
      paymentIntentId: faker.internet.password(),
      products: faker.custom.randomSubArray(productList, true, 5),
      contact: {
        fullName: faker.fake('{{name.firstName}} {{name.lastName}}'),
        phoneNumber: faker.phone.phoneNumber('###-###-####'),
      },
      shippingAddress: {
        country: faker.address.country(),
        city: faker.address.city(),
        addressLine1: faker.address.streetAddress(),
        addressLine2: faker.address.secondaryAddress(),
        postalCode: faker.address.zipCode(),
      },
    });
  }
  return orderList;
};
