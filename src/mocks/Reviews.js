import faker from './Faker';

export default (orderList) => {
  const reviews = [];
  orderList.forEach((order) => {
    order.products.forEach((product) => {
      console.log(`${order.created_at}\n`);
      reviews.push({
        title: faker.lorem.text(),
        comment: faker.lorem.paragraph(),
        order: order._id,
        user: order.customer,
        product: product._id,
        rating: faker.random.number({ min: 1, max: 5 }) * 10,
        created_at: faker.date
          .between(new Date(Number(order.created_at)), new Date())
          .getTime(),
      });
    });
  });
  return reviews;
};
