import faker from "./Faker";

export default orderList => {
  const reviews = [];
  orderList.forEach(order => {
    order.products.forEach(product => {
      reviews.push({
        title: faker.lorem.sentences(),
        comment: faker.lorem.paragraph(),
        order: order._id,
        user: order.customer,
        product: product._id,
        rating: faker.random.number({ min: 0, max: 10 }) * 5,
        created_at: faker.date
          .between(new Date(product.created_at), new Date())
          .getTime()
      });
    });
  });
  return reviews;
};
