import faker from './Faker';

export default (userList, productList) => {
  const orderList = [];

  for (let id = 0; id <= 200; id += 1) {
    const toDate = new Date();
    const fromDate = new Date(
      new Date().setFullYear(new Date().getFullYear() - 1),
    );

    const user = faker.random.arrayElement(userList);
    const products = faker.custom.randomSubArray(productList, true, 5).map((product) => ({
      ...product.toObject(),
      quantity: faker.random.number({ min: 1, max: 3 }),
    }));
    orderList.push({
      customer: user._id,
      created_at: faker.date.between(fromDate, toDate).getTime(),
      status: 'completed',
      paymentIntentId: faker.internet.password(),
      products,
      contact: {
        fullName: faker.fake('{{name.firstName}} {{name.lastName}}'),
        phoneNumber: faker.phone.phoneNumber('###-###-####'),
      },
      billingAddress: {
        country: faker.address.country(),
        city: faker.address.city(),
        province: faker.address.state(),
        addressLine1: faker.address.streetAddress(),
        addressLine2: faker.address.secondaryAddress(),
        postalCode: faker.address.zipCode(),
      },
    });
  }
  return orderList;
};
